"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const person_model_1 = require("../models/person.model");
// From https://github.com/RobinBuschmann/sequelize-typescript-example/blob/master/lib/routes/movies.ts
exports.people = express_1.Router();
// Basic get all route
exports.people.get('/', (req, res, next) => {
    person_model_1.Person
        .findAll()
        .then((data) => {
        return res.json(data);
    })
        .catch((err) => {
        console.log(err);
        return err;
    });
});
//# sourceMappingURL=personRouter.js.map