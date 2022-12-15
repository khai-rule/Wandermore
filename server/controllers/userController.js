// const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/User");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
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

userRouter.get("/seed", async (req, res) => {
  //   const saltRounds = 10;
  const users = [
    {
      email: "johntan@gmail.com",
      firstName: "John",
      lastName: "Tan",
      password: "jt1234",
      aboutYou: "639b300d62f32bb86b69ee46",
      trips: "639b375b3521f91ab2e7a387",
      //   password: bcrypt.hashSync("1q2w3e4r", saltRounds),
    },
    {
      email: "bobbylee@hotmail.com",
      firstName: "Bobby",
      lastName: "Lee",
      password: "bl4321",
      //   password: bcrypt.hashSync("qawsedrf", saltRounds),
    },
    {
      email: "janegoh@msn.com",
      firstName: "Jane",
      lastName: "Goh",
      password: "jg1111",
      //   password: bcrypt.hashSync("azsxdcfv", saltRounds),
    },
  ];
  try {
    await User.deleteMany({});
    const newUser = await User.create(users);
    res.json(newUser);
  } catch (error) {
    res.status(500).json(error);
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

userRouter.get("/data", async (req, res) => {
  try {
    const usersData = await User.find({ email: "johntan@gmail.com" })
      .populate("aboutYou")
      .populate({
        path: "trips",
        populate: {
          path: "activities",
        },
      });
    res.status(200).send(usersData);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = userRouter;
