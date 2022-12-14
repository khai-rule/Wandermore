const express = require("express");
const NewTrip = require("../models/NewTrip");
const newTripSeed = require("../controllers/aboutYou/newTripSeed");

const router = express.Router();

router.get("/seed", newTripSeed);

router.get("/", async (req, res) => {
  try {
    const newTrip = await NewTrip.find().exec();
    res.json(newTrip);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTrip = await NewTrip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
