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
const oil_1 = require("../models/oil");
exports.oil = express_1.Router();
// Basic get all route
exports.oil.get('/', (req, res, next) => {
    oil_1.Oil
        .findAll()
        .then((data) => {
        return res.json(data);
    })
        .catch((err) => {
        console.log(err);
        return err;
    });
});
exports.oil.get('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const currency = yield oil_1.Oil.scope(req.query['scope']).findById(req.params['id']);
        res.json(currency);
    }
    catch (e) {
        next(e);
    }
}));
// post
exports.oil.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log('sari');
        console.log(req.body);
        const currency = yield oil_1.Oil.create(req.body);
        res.status(201).json(currency);
    }
    catch (e) {
        next(e);
    }
}));
// update api/id
exports.oil.put('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield oil_1.Oil.update(req.body, { where: { id: req.params['id'] } });
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
}));
// delete api/id
//# sourceMappingURL=oilRouter.js.map