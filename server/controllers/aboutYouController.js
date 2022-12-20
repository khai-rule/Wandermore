const express = require("express");
const checkLogin = require("../middleware/loginMiddleware");
const AboutYou = require("../models/AboutYou");

const seed = require("./seeds/aboutYouSeed");

const aboutYouRouter = express.Router();

aboutYouRouter.get("/seed", seed);

aboutYouRouter.get("/", async (req, res) => {
  try {
    const aboutYou = await AboutYou.find().exec();
    res.json(aboutYou);
  } catch (error) {
    res.status(500).json({ error });
  }
});
// get all details by id
aboutYouRouter.get("/:id", [checkLogin], async (req, res) => {
  const { id } = req.params;
  try {
    const aboutYou = await AboutYou.findOne({ user: { _id: id } })
      // .populate("user", "firstName") //? if you want to populate user object in fetch data and show firstName to be used in front end
      .exec();
    res.json(aboutYou);
  } catch (error) {
    res.status(500).json({ error });
  }
});
// get only _id details by id
aboutYouRouter.get("/getid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const aboutYouID = await AboutYou.findOne({ user: { _id: id } }, { _id: 1 })
      // .populate("user", "firstName") //? if you want to populate user object in fetch data and show firstName to be used in front end
      .exec();
    res.json(aboutYouID);
  } catch (error) {
    res.status(500).json({ error });
  }
});

aboutYouRouter.post("/", async (req, res) => {
  // const newAboutYou = ...req.body,
  try {
    const aboutYou = await AboutYou.create(req.body);
    res.status(201).json(aboutYou);
  } catch (error) {
    res.status(500).json({ error });
  }
});

aboutYouRouter.put("/:id", async (req, res) => {
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
