const express = require("express");
const Trip = require("../models/Trip");
const tripSeed = require("./seeds/tripSeed");

const router = express.Router();

router.get("/seed", tripSeed);

router.get("/", async (req, res) => {
  try {
    const trip = await Trip.find().exec();
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
