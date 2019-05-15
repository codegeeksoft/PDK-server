import { Sequelize } from 'sequelize-typescript';
import { dbconfig } from './config';
import { Currency } from './models/currencymodel';
import { Person } from './models/person.model';
import { Oil } from './models/oil';
import { Order } from './models/order';
import { Item } from './models/item';
import { User } from './models/user';
import { Retailer } from './models/retailer';
import { Tank } from './models/tank';
import { Employee } from './models/employee';
import { Module } from './models/module';
import { Function } from './models/function';
import { UserFunction } from './models/userFunction';

// Check example at https://github.com/CarlosRodrigues/Sequelize-typescript-example
// and https://github.com/suksant/sequelize-typescript-examples
// with help here https://github.com/RobinBuschmann/st-366

export const sequelize = new Sequelize({
  operatorsAliases: false,
  database: dbconfig.database,
  dialect: dbconfig.dialect,
  username: dbconfig.username,
  password: dbconfig.password,
  host: dbconfig.host,
  port: dbconfig.port
});

sequelize.addModels([
  Currency,
  Person,
  Oil,
  Item,
  Order,
  Employee,
  Function,
  User,
  UserFunction,
  Tank,
  Retailer,
  Module,
  UserFunction
]);

console.log('initializeDatabase');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to DB before');
      initializeDatabase();
    // populateData();
    console.log('Connected to DB');
  })
  .catch(err => {
    console.log(err);
  });

// Force Initialization of the models and wipe all data ///
function initializeDatabase() {
  console.log('inside initializeDatabase');
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log('Connection synced');
      return;
    })
    .catch(err => {
      console.log('err' + err);
    });
}

// Adding new currencies to the DB ///
function populateData() {
  const mycurrency = new Currency({ country: 'Cambodia', exchangerate: 3700 });
  mycurrency
    .save()
    .then(() => {
      console.log('City ' + mycurrency.country + 'added to DB');
    })
    .catch(err => {
      console.log(err);
    });
}
