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
  if (req.body.userid === "") {
    return res.status(400).json({ error: "userid cannot be blank" });
  } else if (req.body.password === "") {
    return res.status(400).json({ error: "password cannot be blank" });
  }
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

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).exec();
  if (user === null) {
    return res.status(404).json({ error: "User not found" });
  }
  try {
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = userRouter;