import {Router} from 'express';
import {Order} from '../models/order';
import {Oil} from '../models/oil';

export const order = Router();

// Basic get all route
order.get('/', (req, res, next) => {
  Order
        .findAll()
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => {
            console.log(err);
            return err;
        })  
})

order.get('/:id', async (req, res, next) => {
    try {
      const currency = await Order.scope(req.query['scope']).findById(req.params['id']);
      res.json(currency);
    } catch (e) {
      next(e);
    }
  });

// post
order.post('/', async (req, res, next) => {
    try {
      console.log('sari order');
      console.log(req.body);

      const response = await Order.create(req.body);
      Oil.find({ where: { id: req.body.oilId } })
  .then(function (oil) {
    if (oil) {
      oil.update({
        availableQuantity: oil.availableQuantity - req.body.orderQuantity
      })
        .then(function () {
          res.status(201).json(response);
        });
    } else {
      res.status(400).json({ 'message': 'error while adding order to cart' });
    }
  });
    } catch (e) {
      next(e);
    }
  });
// update api/id
order.put('/:id', async (req, res, next) => {
    try {
      await Order.update<Order>(req.body, {where: {id: req.params['id']}});
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  });
// delete api/id
