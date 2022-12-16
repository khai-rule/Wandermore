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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const aboutYou = await AboutYou.findOne(
      { user: id },
      { _id: 0, __v: 0, user: 0 }
    ).exec();
    res.json(aboutYou);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  // const newAboutYou = ...req.body,
  try {
    const aboutYou = await AboutYou.create(req.body);
    res.status(201).json(aboutYou);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
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

module.exports = router;
