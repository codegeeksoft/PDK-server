import { Router } from 'express';
import { Retailer } from '../models/retailer';
import { Tank } from '../models/tank';
import { Employee } from '../models/employee';

export const retailer = Router();

// Basic get all route
retailer.get('/', (req, res, next) => {
  Retailer.findAll({
    include: [
      {
        model: Tank
      },
      {
        model: Employee
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

retailer.get('/:id', (req, res, next) => {
  Retailer.findOne({
    where: { retailerId: req.params.id },
    include: [
      {
        model: Tank
      },
      {
        model: Employee
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

// post
retailer.post('/', async (req, res, next) => {
  try {
    req.body.retailerId =
      'Retailer' + Math.floor(100000 + Math.random() * 900000);
    req.body.status = 'NEW';
    await Retailer.create(req.body).then(function(response) {
      if (response) {
        for (let i = 0; i < req.body.tanks.length; i++) {
          req.body.tanks[i].retailerId = req.body.retailerId;
        }
        Tank.bulkCreate(req.body.tanks).then(t => {
          console.log(t);
          res.json(response);
        });
      }
    });
  } catch (e) {
    next(e);
  }
});
// update api/id
retailer.put('/:id', async (req, res, next) => {
  try {
    await Retailer.update<Retailer>(req.body, {
      where: { id: req.params['id'] }
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});
// delete api/id
