const express = require("express");
const AboutYou = require("../models/AboutYou");
const seed = require("./seeds/aboutYouSeed");

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

//! Create new aboutYou
router.post("/", async (req, res) => {
    try {
      const aboutYou = await AboutYou.create(req.body);
      res.status(201).json(aboutYou);
    } catch (error) {
      res.status(500).json({ error });
    }
});

router.put("/", async (req, res) => {
  try {
    const aboutyou = await AboutYou(req.body, {
      new: true,
    });
    res.json(aboutyou);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;