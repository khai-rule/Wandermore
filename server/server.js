// Dependencies
require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');

const aboutYouController = require("./controllers/aboutYouController");
const tripController = require("./controllers/tripController");
const activityController = require("./controllers/activityController");
const userController = require("./controllers/userController");
const User = require("./models/User");


// Configuration
const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI;

const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: {},
};

console.log("Mongo_URI", MONGO_URI);
mongoose.set("debug", true);
mongoose.set("runValidators", true);
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("../client/dist"));
app.use(cookieParser());

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess));

app.use("/api/aboutyou", aboutYouController);
app.use("/api/trips", tripController);
app.use("/api/activities", activityController);
app.use("/api/user", userController);

app.get("/api", (req, res) => {
  res.json({ msg: "Hello World!" });
});

//! Login
app.post("/api/sessions", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (user === null) {
    return res.status(401).json({ msg: "Email not valid, please sign up." });
  }
  if (password !== user.password) {
    return res
      .status(401)
      .json({ msg: "Password not valid, please try again." });
  }
  const session = req.session;
  session.userid = user._id;
  console.log(req.session)
  res.status(202).json({ msg: "Logged in", id: user._id });
});

//! Check if logged in

app.get("/api/secret", (req, res) => {
  if (req.session.userid !== "639b381b0324bdef02951996") {
    res.status(401).json({ msg: "Cannot see" });
    console.log("asda", req.session)
  } else {
    res.json({ msg: "Need more milo" });
  }
});

//! Log out
app.delete("/api/secret", (req, res) => {
  req.session.destroy(() => {
    res.json({ msg: "Logout success" });
  });
  res.redirect('/');
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});

mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
