const bcrypt = require("bcrypt");
const express = require("express");
const checkLogin = require("../middleware/loginMiddleware");
const User = require("../models/User");
const userSeed = require("./seeds/userSeed");

const userRouter = express.Router();

//TODO Seed request - to remove when live
userRouter.get("/seed", userSeed);

//! View all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .populate("aboutYou")
      .populate({
        path: "trips",
        populate: {
          path: "activities",
        },
      });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//! Read by ID and return only email, firstName and LastName
userRouter.get("/fetch/:id", [checkLogin], async (req, res) => {
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

//! Create
userRouter.post("/", async (req, res) => {
  if (req.body.any === "") {
    return res.status(400).json({ error: "Inputs cannot be blank" });
  }
  try {
    const saltRounds = 10;
    const { email, firstName, lastName, password } = req.body;
    const hashed = bcrypt.hashSync(password, saltRounds);
    const user = await User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashed,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! Update for change password component
userRouter.put("/:id", [checkLogin], async (req, res) => {
  const { id } = req.params;
  const { passwordOld, password } = req.body;
  if (passwordOld === password) {
    return res
      .status(403)
      .json({ msg: "Old and New Password cannot be the same" });
  }
  try {
    const currentUser = await User.findById(id).exec();
    const passwordMatched = bcrypt.compareSync(
      passwordOld,
      currentUser.password
    );
    if (passwordMatched) {
      const saltRounds = 10;
      const hashed = bcrypt.hashSync(password, saltRounds);
      const userUpdate = await User.findByIdAndUpdate(
        id,
        { password: hashed },
        {
          new: true,
        }
      );
      return res.status(202).json({ msg: "Password changed" });
    }
    return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//! Update new aboutYou id to user
userRouter.put("/setaboutyou/:id", [checkLogin], async (req, res) => {
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
          path: "activities",
        },
      });
    res.status(200).send(userInfo);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = userRouter;
