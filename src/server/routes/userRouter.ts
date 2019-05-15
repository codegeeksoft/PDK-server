import { Router } from 'express';
import { User } from '../models/user';
import { generate, verify, isHashed } from 'password-hash';
import { async } from '@angular/core/testing';
import { Employee } from '../models/employee';
import { Retailer } from '../models/retailer';
import { retailer } from './retailerRouter';
import { Tank } from '../models/tank';
import { Op } from 'sequelize';
import { Function } from '../models/function';
import { UserFunction } from '../models/userFunction';

export const user = Router();

// Basic get all route
user.get('/', (req, res, next) => {
  User.findAll({
    include: [{ model: Function }]
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
user.post('/', async (req, res, next) => {
  try {
    req.body.userId = 'User' + Math.floor(100000 + Math.random() * 900000);
    req.body.emailVerified = false;
    req.body.mobileVerified = false;
    req.body.status = 'NEW';
    if (req.body.password) {
      req.body.password = generate(req.body.password, { algorithm: 'sha256' });
    }
    const response = await User.create(req.body);
    res.json(response);
  } catch (e) {
    next(e);
  }
});

// associate user with n numner functions
// Tank.bulkCreate(req.body.tanks).then(t => {
user.post('/addFunctionsToUser/:id', async (req, res, next) => {
  const functionIds = req.body.functionIds;
  const UserFunctions = [];
  functionIds.forEach(element => {
    const userFunction = {
      userId: req.params.id,
      functionId: element
    };
    UserFunctions.push(userFunction);
  });
  UserFunction.bulkCreate(UserFunctions).then(response => {
    const result = {
      status: true,
      message: 'Functions added successfully tp user'
    };
    res.json(result);
  });
});

// update api/id
user.put('/:id', async (req, res, next) => {
  try {
    if (req.body.emailVerify) {
      req.body.emailVerified = true;
    }
    if (req.body.mobileVerify) {
      req.body.mobileVerified = true;
    }
    await User.update<User>(req.body, { where: { userId: req.params['id'] } });
    res.sendStatus(200);
  } catch (e) {
    // next(e);
  }
});

user.get('/getBusinessByUserId/:id', async (req, res, next) => {
  Employee.findAll({
    where: { userId: req.params.id }
  }).then(response => {
    const businessIds = [];
    response.forEach(element => {
      businessIds.push(element.retailerId);
    });
    Retailer.findAll({
      where: {
        retailerId: { [Op.in]: businessIds }
      },
      include: [
        {
          model: Tank
        }
      ]
    }).then(retailerResponse => {
      res.json(retailerResponse);
    });
  });
});

user.get('/:id', async (req, res, next) => {
  User.findOne({
    where: { userId: req.params.id },
    include: [{ model: Function }]
  }).then(response => {
    res.json(response);
  });
});

user.post('/login', async (req, res, next) => {
  const result: any = {
    status: false
  };
  const username = req.body.username;
  const userType = req.body.userType;
  const password = req.body.password;
  if (!userType) {
    result.message = 'type missing in the request';
    return res.json(result);
  }
  const query: any = {};

  if (userType === 'email') {
    query.email = username;
  } else if (userType === 'mobile') {
    query.mobile = username;
  }
  console.log('response'+JSON.stringify(query));
  User.findOne({
    where: query,
    include: [{ model: Function }]
  }).then(response => {
    console.log('response'+JSON.stringify(response));
    if (response) {
      if (!verify(password, response.password)) {
        result.message = 'Username/password combination not found';
        return res.json(result);
      }
      if (userType) {
        if (userType === 'email') {
          if (!response.emailVerified) {
            result.message =
              'Email not verified.Please verify your email to continue the business';
            return res.json(result);
          }
        } else if (userType === 'mobile') {
          if (!response.mobileVerified) {
            result.message =
              'Mobile not verified.Please verify your mobile to continue the business';
            return res.json(result);
          }
        }
      }
      if (response.status) {
        if (response.status === 'New') {
          result.message = 'User not verified. Please cantact support team!';
          return res.json(result);
        } else if (response.status === 'Inactive') {
          result.message = 'User is inactive. Please cantact support team!';
          return res.json(result);
        } else if (response.status === 'Active') {
          result.status = true;
          result.response = response;
          return res.json(result);
        } else {
          result.message =
            'User status not found. Please cantact support team!';
          return res.json(result);
        }
      }
    } else {
      result.message = 'user not found';
      return res.json(result);
    }
  });
});

// delete api/id
// for all password methods
// https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/password-hash
