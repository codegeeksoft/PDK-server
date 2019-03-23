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
const currencymodel_1 = require("../models/currencymodel");
// From https://github.com/RobinBuschmann/sequelize-typescript-example/blob/master/lib/routes/movies.ts
exports.currencies = express_1.Router();
// Basic get all route
exports.currencies.get('/', (req, res, next) => {
    currencymodel_1.Currency
        .findAll()
        .then((data) => {
        return res.json(data);
    })
        .catch((err) => {
        console.log(err);
        return err;
    });
});
exports.currencies.get('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const currency = yield currencymodel_1.Currency.scope(req.query['scope']).findById(req.params['id']);
        res.json(currency);
    }
    catch (e) {
        next(e);
    }
}));
// post
exports.currencies.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log('sari');
        console.log(req.body);
        const currency = yield currencymodel_1.Currency.create(req.body);
        res.status(201).json(currency);
    }
    catch (e) {
        next(e);
    }
}));
// update api/id
exports.currencies.put('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield currencymodel_1.Currency.update(req.body, { where: { id: req.params['id'] } });
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
}));
// delete api/id
//# sourceMappingURL=currencyRouter.js.map