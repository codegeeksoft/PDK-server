import { Router } from 'express';
import { Module } from '../models/module';
import { Function } from '../models/function';

export const module = Router();

// Basic get all route
module.get('/', (req, res, next) => {
  Module.findAll({
    include: [
      {
        model: Function
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

module.get('/:id', (req, res, next) => {
  Module.findOne({
    where: { moduleId: req.params.id },
    include: [
      {
        model: Function
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
module.post('/', async (req, res, next) => {
  try {
    req.body.moduleId = 'Module' + Math.floor(100000 + Math.random() * 900000);
    req.body.status = 'NEW';
    await Module.create(req.body).then(function(response) {
      if (response) {
        for (let i = 0; i < req.body.functions.length; i++) {
          req.body.functions[i].moduleId = req.body.moduleId;
          req.body.functions[i].functionId =
            'Function' + Math.floor(100000 + Math.random() * 900000);
          req.body.functions[i].status = 'LIVE';
        }
        Function.bulkCreate(req.body.functions).then(functionResponse => {
          response.functions = functionResponse;
          console.log(functionResponse);
          res.json(response);
        });
      }
    });
  } catch (e) {
    next(e);
  }
});
// update api/id
module.put('/:id', async (req, res, next) => {
  try {
    await Module.update<Module>(req.body, {
      where: { id: req.params['id'] }
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

// delete api/id
