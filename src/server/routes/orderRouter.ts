import { Router } from 'express';
import { Order } from '../models/order';
import { Oil } from '../models/oil';
import { Item } from '../models/item';

export const order = Router();

// Basic get all route
order.get('/', (req, res, next) => {
  Order.findAll({
    where: { status: 'NEW' },
    include: [
      {
        model: Item
      }
    ]
  })
    .then(data => {
      if(data.length>0){
        return res.json(data);
      }else{
        const dummyData = [{
          orderId: '',
          retailer: 'retailer1',
          depot: 'depot1',
          transport: 'transport1',
          supplier: 'supplier1',
          quantity: 0,
          amount: 0,
          totalAmount: 0,
          status: 'NEW',
          userId: 'PDK123',
          items: []
        }];
        return res.json(dummyData);
      }
     
    })
    .catch(err => {
      console.log(err);
      return err;
    });
});

order.get('/history', (req, res, next) => {
  Order.findAll({
    where: { status: 'IN_PROCESS' },
    include: [
      {
        model: Item
      }
    ]
  })
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
});

order.get('/:id', async (req, res, next) => {
  try {
    Order.findAll({
      include: [
        {
          model: Item,
          where: { orderId: req.params['id'] }
        }
      ]
    }).then(orderResponse => {
      if (orderResponse && orderResponse.length > 0) {
        res.json(orderResponse);
      } else {
        res.status(401);
        res.json({ errorCode: 1000, message: 'no order found' });
      }
    });
  } catch (e) {
    next(e);
  }
});

order.get('/status/:status/userId/:userId', async (req, res, next) => {
  try {
    Order.findAll({
      where: { status: req.params['status'], userId: req.params['userId'] }
    }).then(orderResponse => {
      if (orderResponse && orderResponse.length > 0) {
        res.status(200);
        res.json(orderResponse);
      } else {
        res.status(401);
        res.json({ errorCode: 1001, message: 'no order found for this user' });
      }
    });
  } catch (e) {
    next(e);
  }
});

order.delete('/', async (req, res, next) => {
  try {
    Item.destroy({
      where: { orderId: req.body.orderId, oilCode: req.body.oilCode }
    }).then(itemResponse => {
      if (itemResponse && itemResponse !== 0) {
        try {
          Order.findAll({
            include: [
              {
                model: Item,
                where: { orderId: req.body.orderId }
              }
            ]
          }).then(orderResponse => {
            if (orderResponse && orderResponse.length > 0) {
              res.json(orderResponse);
            } else {
              res.status(401);
              res.json({
                errorCode: 1003,
                message: 'All items in the cart are deleted'
              });
            }
          });
        } catch (e) {
          next(e);
        }
      } else {
        res.status(401);
        res.json({
          errorCode: 1003,
          message: 'All items in the cart are deleted'
        });
      }
    });
  } catch (e) {
    next(e);
  }
});

// post
order.post('/', async (req, res, next) => {
  try {
    const orderEntity = await Order.findById(req.body.orderId);
    if (orderEntity) {
      try {
        Order.update<Order>(req.body, {
          where: { orderId: req.body.orderId }
        }).then(function(updateResponse) {
          if (updateResponse) {
            if (req.body.items) {
              for (let i = 0, len = req.body.items.length; i < len; i++) {
                const element = req.body.items[i];
                element.orderId = req.body.orderId;
                const itemEntity = Item.findOne({
                  where: {
                    orderId: req.body.orderId,
                    oilType: element.oilType,
                    oilCode: element.oilCode
                  }
                }).then(function(data) {
                  if (data) {
                    Item.update<Item>(element, {
                      where: {
                        orderId: req.body.orderId,
                        oilType: element.oilType,
                        oilCode: element.oilCode
                      }
                    });
                  } else {
                    const itemsResponse = Item.create(element);
                  }
                });
                // Below code excutes when user click on place order button and to update quantity
                if (req.body.status && req.body.status === 'IN_PROCESS') {
                  Oil.find({ where: { oilCode: element.oilCode, oilType: element.oilType } })
                    .then(function (oil) {
                      if (oil) {
                        oil.update({
                          availableQuantity: oil.availableQuantity - element.quantity
                        }).then(function () { });
                      }
                    });
            }
              }
            }
            res.sendStatus(200);
          } else {
            res.sendStatus(400);
          }
        });
      } catch (e) {
        next(e);
      }
    } else {
      req.body.orderId = 'PDK' + Math.floor(100000 + Math.random() * 900000);
      const response = await Order.create(req.body);
      if (req.body.items) {
        req.body.items.forEach(element => {
          element.orderId = req.body.orderId;
          const itemsResponse = Item.create(element);
        });
      }
      res.status(201).json(response);
    }

  } catch (e) {
    next(e);
  }
});
// update api/id
order.put('/:id', async (req, res, next) => {
  try {
    await Order.update<Order>(req.body, { where: { id: req.params['id'] } });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});
