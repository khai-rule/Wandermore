// Dependencies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan")

// Configuration
const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(morgan("dev"));
app.use(express.static("../client/dist"));

app.get("/", (req, res) => {
    res.json({ msg: "Hello World!" });
});
  
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});