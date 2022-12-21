// Dependencies
require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const morgan = require("morgan");

const aboutYouController = require("./controllers/aboutYouController");
const tripController = require("./controllers/tripController");
const activityController = require("./controllers/activityController");
const userController = require("./controllers/userController");
const sessionController = require("./controllers/sessionController");

// Configuration
const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI;

const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true, //set to false to prevent cookie from being generated until login
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

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess));

app.use("/api/aboutyou", aboutYouController);
app.use("/api/trips", tripController);
app.use("/api/activities", activityController);
app.use("/api/user", userController);
app.use("/api/sessions", sessionController);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});

mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
