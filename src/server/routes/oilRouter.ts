import { Router } from "express";
import { Oil } from "../models/oil";

export const oil = Router();

// Basic get all route
oil.get('/', (req, res, next) => {
  Oil.findAll()
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
});

oil.get("/:id", async (req, res, next) => {
  try {
    const currency = await Oil.scope(req.query["scope"]).findById(
      req.params["id"]
    );
    res.json(currency);
  } catch (e) {
    next(e);
  }
});

// post
oil.post("/", async (req, res, next) => {
  try {
    console.log("sari");
    console.log(req.body);
    const currency = await Oil.create(req.body);
    res.status(201).json(currency);
  } catch (e) {
    next(e);
  }
});
// update api/id
oil.put("/:id", async (req, res, next) => {
  try {
    await Oil.update<Oil>(req.body, { where: { id: req.params["id"] } });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});
// delete api/id
