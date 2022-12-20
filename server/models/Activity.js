const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    photo1: String,
    photo2: String,
    description: String,
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip"},
  },
  { timestamps: true }
);


const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
