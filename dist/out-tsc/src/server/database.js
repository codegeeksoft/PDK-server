"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("./config");
const currencymodel_1 = require("./models/currencymodel");
const person_model_1 = require("./models/person.model");
const oil_1 = require("./models/oil");
const order_1 = require("./models/order");
// Check example at https://github.com/CarlosRodrigues/Sequelize-typescript-example
// and https://github.com/suksant/sequelize-typescript-examples
// with help here https://github.com/RobinBuschmann/st-366 
exports.sequelize = new sequelize_typescript_1.Sequelize({
    operatorsAliases: false,
    database: config_1.dbconfig.database,
    dialect: config_1.dbconfig.dialect,
    username: config_1.dbconfig.username,
    password: config_1.dbconfig.password,
    host: config_1.dbconfig.host,
    port: config_1.dbconfig.port
});
exports.sequelize.addModels([currencymodel_1.Currency]);
exports.sequelize.addModels([person_model_1.Person]);
exports.sequelize.addModels([oil_1.Oil]);
exports.sequelize.addModels([order_1.Order]);
console.log('initializeDatabase');
exports.sequelize.authenticate().then(() => {
    console.log("Connected to DB before");
    initializeDatabase();
    populateData();
    console.log("Connected to DB");
})
    .catch((err) => {
    console.log(err);
});
// Force Initialization of the models and wipe all data ///
function initializeDatabase() {
    console.log('inside initializeDatabase');
    exports.sequelize
        .sync({ force: true })
        .then(() => {
        console.log('Connection synced');
        return;
    })
        .catch(err => {
        console.log('err');
    });
}
// Adding new currencies to the DB ///
function populateData() {
    const mycurrency = new currencymodel_1.Currency({ country: 'Cambodia', exchangerate: 3700 });
    mycurrency.save()
        .then(() => {
        console.log("City " + mycurrency.country + " added to DB");
    })
        .catch((err) => {
        console.log(err);
    });
}
//# sourceMappingURL=database.js.map