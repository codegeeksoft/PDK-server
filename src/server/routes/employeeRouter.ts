import { Router } from 'express';
import { Employee } from '../models/employee';
import { async } from '@angular/core/testing';
import { Retailer } from '../models/retailer';

export const employee = Router();

// post
employee.post('/addEmployeeToBusiness', async (req, res, next) => {
  try {
    req.body.employeeId = 'EMP' + Math.floor(100000 + Math.random() * 900000);
    await Employee.create(req.body).then(function(response) {
      if (response) {
        res.json(response);
      }
    });
  } catch (e) {
    next(e);
  }
});

// post
employee.delete('/deleteEmployeeToBusiness', async (req, res, next) => {
  try {
    const retailerId = req.body.retailerId;
    Employee.destroy({
      where: { id: req.body.id, retailerId: req.body.retailerId }
    }).then(response => {
      res.json(response);
    });
  } catch (e) {
    next(e);
  }
});

employee.get('/', async (req, res, next) => {
  try {
    Employee.findAll().then(response => {
      res.json(response);
    });
  } catch (e) {
    next(e);
  }
});
