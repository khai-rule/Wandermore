const express = require("express");
const checkLogin = require("../middleware/loginMiddleware");
const AboutYou = require("../models/AboutYou");
const seed = require("./seeds/aboutYouSeed");

const aboutYouRouter = express.Router();

//TODO Seed request - to remove when live
aboutYouRouter.get("/seed", seed);

//! READ by ID
aboutYouRouter.get("/:id", [checkLogin], async (req, res) => {
  const { id } = req.params;
  try {
    const aboutYou = await AboutYou.findOne({ user: { _id: id } }).exec();
    res.json(aboutYou);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//! Create
aboutYouRouter.post("/", [checkLogin], async (req, res) => {
  try {
    const aboutYou = await AboutYou.create(req.body);
    res.status(201).json(aboutYou);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//! Update
aboutYouRouter.put("/:id", [checkLogin], async (req, res) => {
  const { id } = req.params;
  try {
    const aboutyou = await AboutYou.findOneAndUpdate({ user: id }, req.body, {
      new: true,
    });
    res.json(aboutyou);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = aboutYouRouter;
