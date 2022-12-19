// const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/User");
const userSeed = require("./seeds/userSeed");
const userRouter = express.Router();
const ObjectId = require("mongodb").ObjectId;

userRouter.get("/seed", userSeed);

//! View all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find()
    .populate("aboutYou")
    .populate({
      path: "trips",
      populate: {
        path: "activities"
      },
    });
  res.status(200).send(users);
} catch (err) {
  res.status(500).send({ err });
}
});


// For LoginMaint page
userRouter.get("/database/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userInfo = await User.findById(id, {
      email: 1,
      firstName: 1,
      lastName: 1,
      _id: 0,
    }).exec();
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

userRouter.post("/", async (req, res) => {
  if (req.body.any === "") {
    return res.status(400).json({ error: "Inputs cannot be blank" });
  }
  // else if (req.body.password === "") {
  //   return res.status(400).json({ error: "password cannot be blank" });
  // } else if (req.body.firstName === "") {
  //   return res.status(400).json({ error: "First Name cannot be blank" });
  // } else if (req.body.lastName === "") {
  //   return res.status(400).json({ error: "Last Name cannot be blank" });
  // }
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userUpdate = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(userUpdate);
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Updating new aboutYou id to user
userRouter.put("/setaboutyou/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userUpdate = await User.findByIdAndUpdate(
      id,
      { aboutYou: req.body._id },
      {
        new: true,
      }
    );
    res.json(userUpdate);
  } catch (error) {
    res.status(500).json({ error });
  }
});
// Updating new newTrip id to user
userRouter.put("/setnewtrip/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userUpdate = await User.findByIdAndUpdate(
      id,
      { $push: { trips: req.body._id } },
      {
        new: true,
      }
    );
    res.json(userUpdate);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// router.get("/see", async (req, res) => {
//   const user = await AboutYou.find({}).populate({ path: "User", model: "User" })
// });

// userRouter.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id).exec();
//   if (user === null) {
//     return res.status(404).json({ error: "User not found" });
//   }
//   try {
//     res.json(user);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

//! View Single User
//TODO catch if cant find
// userRouter.get("/:email", async (req, res) => {
//   const { email } = req.params;
//   const user = await User.findOne({ email: email }).exec();
//   if (user === null) {
//     return res.status(404).json({ msg: "User not found" }); //? Nothing there so 404
//   }
//   return res.json(user);
// });

// //! Update - find by email - Add aboutYou ID
// //TODO catch if cant find
// userRouter.put("/:email", async (req, res) => {
//   const { email } = req.params;
//   const data = req.body;

//   const user = await User.findOneAndUpdate({ email: email }, data, {
//     new: true,
//   });

//   return res.json(user);
// });


// userRouter.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const userInfo = await User.findById(id).exec();
//     res.json(userInfo);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

//! View a single user all data
userRouter.get("/:id", async (req, res) => {
  try {
    // const usersData = await User.find({ email: "johntan@gmail.com" })
    const { id } = req.params;
    const userInfo = await User.findById(id)
      .populate("aboutYou")
      .populate({
        path: "trips",
        populate: {
          path: "activities"
        },
      });
    res.status(200).send(userInfo);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = userRouter;
