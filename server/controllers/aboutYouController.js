const express = require("express");
const AboutYou = require("../models/AboutYou");
const seed = require("./aboutYou/seed");

const router = express.Router();

router.get("/seed", seed);

router.get("/", async (req, res) => {

  try {
    const aboutYou = await AboutYou.find().exec();
    res.json(aboutYou);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
    try {
      const aboutYou = await AboutYou.create(req.body);
      res.status(201).json(aboutYou);
    } catch (error) {
      res.status(500).json({ error });
    }
});

module.exports = router;