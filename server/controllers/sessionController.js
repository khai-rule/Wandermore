const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const sessions = express.Router();

//! Check if logged in
sessions.get("/:id", (req, res) => {
  const { id } = req.params;
  if (req.session.userid !== id) {
    res.status(401).json({ msg: "Cannot see" });
    console.log("asda", req.session);
  } else {
    res.json({ msg: "Need more milo" });
  }
});

sessions.post("/", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) {
    return res.status(401).json({ msg: "Email not valid, please sign up." });
  }
  const passwordNotMatched = !bcrypt.compareSync(password, foundUser.password);
  if (passwordNotMatched) {
    return res
      .status(401)
      .json({ msg: "Password not valid, please try again." });
  }
  req.session.authenticated = true;
  req.session.currentUser = foundUser._id;
  req.session.msg = "Logged in";
  res.status(202).json(req.session);
});

//! Log out
sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.json({ msg: "Logout success" });
  });
});

module.exports = sessions;
