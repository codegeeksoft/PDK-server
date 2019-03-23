"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../models/order");
const oil_1 = require("../models/oil");
exports.order = express_1.Router();
// Basic get all route
exports.order.get('/', (req, res, next) => {
    order_1.Order
        .findAll()
        .then((data) => {
        return res.json(data);
    })
        .catch((err) => {
        console.log(err);
        return err;
    });
});
exports.order.get('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const currency = yield order_1.Order.scope(req.query['scope']).findById(req.params['id']);
        res.json(currency);
    }
    catch (e) {
        next(e);
    }
}));
// post
exports.order.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log('sari order');
        console.log(req.body);
        const response = yield order_1.Order.create(req.body);
        oil_1.Oil.find({ where: { id: req.body.oilId } })
            .then(function (oil) {
            if (oil) {
                oil.update({
                    availableQuantity: oil.availableQuantity - req.body.orderQuantity
                })
                    .then(function () {
                    res.status(201).json(response);
                });
            }
            else {
                res.status(400).json({ 'message': 'error while adding order to cart' });
            }
        });
    }
    catch (e) {
        next(e);
    }
}));
// update api/id
exports.order.put('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield order_1.Order.update(req.body, { where: { id: req.params['id'] } });
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
}));
// delete api/id
//# sourceMappingURL=orderRouter.js.map