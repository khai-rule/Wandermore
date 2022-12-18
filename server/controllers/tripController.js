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
// get all details by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const newTrip = await Trip.find({ user: { _id: id } })
      // .populate("user", "firstName") //? if you want to populate user object in fetch data and show firstName to be used in front end
      .exec();
    res.json(newTrip);
  } catch (error) {
    res.status(500).json({ error });
  }
});
// get multiple _id details by id - for ARRAY
router.get("/getid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const newTripID = await Trip.find({ user: { _id: id } }, { _id: 1 })
      // .populate("user", "firstName") //? if you want to populate user object in fetch data and show firstName to be used in front end
      .exec();
    res.json(newTripID);
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

router.get("/data", async (req, res) => {
  try {
    const trip = await Trip.find({}).populate({ path: "activities" });
    res.status(200).send(trip);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
