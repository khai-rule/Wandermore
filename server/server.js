// Dependencies
require("dotenv").config();
const path = require("path")
const express = require("express");
const mongoose = require("mongoose")
const morgan = require("morgan")

// Configuration
const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log("Mongo_URI", MONGO_URI);
mongoose.set("debug", true);
mongoose.set("runValidators", true);
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("../client/dist"));

app.get("/", (req, res) => {
    res.json({ msg: "Hello World!" });
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