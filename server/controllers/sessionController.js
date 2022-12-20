const express = require("express");
const User = require("../models/User");
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
  //   if (user === null) {
  if (!foundUser) {
    return res.status(401).json({ msg: "Email not valid, please sign up." });
  }
  if (password !== foundUser.password) {
    return res
      .status(401)
      .json({ msg: "Password not valid, please try again." });
  }
  //   const session = req.session;
  //   session.userid = user._id;
  req.session.authenticated = true;
  req.session.currentUser = foundUser._id;
  req.session.msg = "Logged in";
  //   res.status(202).json({ msg: "Logged in", id: foundUser._id });
  res.status(202).json(req.session);
});

//! Log out
sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.json({ msg: "Logout success" });
    res.redirect("/");
  });
});

module.exports = sessions;
