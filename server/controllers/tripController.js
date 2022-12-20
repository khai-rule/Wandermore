const express = require("express");
const Trip = require("../models/Trip");
const tripSeed = require("./seeds/tripSeed");
const tripRouter = express.Router();

tripRouter.get("/seed", tripSeed);

//! All trips, show user
tripRouter.get("/", async (req, res) => {
  try {
    const trip = await Trip.find().populate("user");
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// //! get all details by id
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const trip = await Trip.find({ user: { _id: id } })
//       // .populate("user", "firstName") //? if you want to populate user object in fetch data and show firstName to be used in front end
//       .exec();
//     res.json(trip);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

//! get all details by id
tripRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findById(id).populate("activities").exec();
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//! get multiple _id details by id - for ARRAY
tripRouter.get("/getid/:id/:id2", async (req, res) => {
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

//! Add new activity id to trip
tripRouter.put("/setnewactivity/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateTrip = await Trip.findByIdAndUpdate(
      id,
      { $push: { activities: req.body._id } },
      {
        new: true,
      }
    );
    res.json(updateTrip);
  } catch (error) {
    res.status(500).json({ error });
  }
});

tripRouter.post("/", async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error });
  }
});

tripRouter.get("/data", async (req, res) => {
  try {
    const trip = await Trip.find({}).populate({ path: "activities" });
    res.status(200).send(trip);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//! Delete by ID
tripRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findByIdAndDelete(id).exec();
    return res.json(trip);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = tripRouter;
