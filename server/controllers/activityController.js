const express = require("express");
const Activity = require("../models/Activity");
const seed = require("./seeds/activitySeed");

const router = express.Router();

router.get("/seed", seed);

router.get("/", async (req, res) => {
  try {
    const activity = await Activity.find().exec();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findById(id).exec();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//! get multiple _id details by id - for ARRAY
router.get("/getid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const newActivityID = await Activity.find({ trip: { _id: id } }, { _id: 1 })
      .exec();
    res.json(newActivityID);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
