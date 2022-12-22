const express = require("express");
const Activity = require("../models/Activity");
// const seed = require("./seeds/activitySeed");

const activityRouter = express.Router();

// activityRouter.get("/seed", seed);

activityRouter.get("/", async (req, res) => {
  try {
    const activity = await Activity.find().exec();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error });
  }
});

activityRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findById(id).exec();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error });
  }
});

activityRouter.post("/", async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//! get multiple _id details by id - for ARRAY
activityRouter.get("/getid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const newActivityID = await Activity.findOne(
      { trip: { _id: id } },
      { _id: 1 }
    ).exec();
    res.json(newActivityID);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//! Delete by ID
activityRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findByIdAndDelete(id).exec();
    return res.json(activity);
  } catch (err) {
    res.status(500).send({ err });
  }
});

activityRouter.put("/:id", async (req, res) => {
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

module.exports = activityRouter;
