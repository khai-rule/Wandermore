const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
  {
    name: { type: Date, required: true },
    date: { type: Date, required: true },
    time: { type: Number, required: true },
    duration: { type: Number, required: true },
    location: { type: String, required: true },
    photos: [String],
    description: String,
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
