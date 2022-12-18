const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: Number, required: true },
    duration: { type: Number, required: true },
    location: { type: String, required: true },
    photo1: String,
    photo2: String,
    description: String,
  },
  { timestamps: true }
);


const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
