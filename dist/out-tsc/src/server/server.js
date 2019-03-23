"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database_1 = require("./database");
const currencyRouter_1 = require("./routes/currencyRouter");
const personRouter_1 = require("./routes/personRouter");
const oilRouter_1 = require("./routes/oilRouter");
const orderRouter_1 = require("./routes/orderRouter");
const bodyParser = require('body-parser');
const hostname = 'localhost';
const port = 3001;
const server = express();
server.use(bodyParser.urlencoded({ 'extended': true })); // parse application/x-www-form-urlencoded
server.use(bodyParser.json()); // parse application/json
server.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
server.get('/api/', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World1');
});
server.post('/api/sari', (req, res, next) => {
    console.log('response' + JSON.stringify(req.body));
    res.end('sari1');
});
// allow access from client server
server.use(function (req, res, next) {
    console.log('response1' + JSON.stringify(req.body));
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);
    // Pass to next layer of middleware
    next();
});
// initiate connection to db
const mysequelize = database_1.sequelize;
// add currencies route
server.use('/api/currencies', currencyRouter_1.currencies);
server.use('/api/people', personRouter_1.people);
server.use('/api/oil', oilRouter_1.oil);
server.use('/api/order', orderRouter_1.order);
server.listen(port, hostname, () => {
    // connect to the DB
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=server.js.map