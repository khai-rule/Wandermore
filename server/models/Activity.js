const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: Number, required: true },
    duration: { type: Number, required: true },
    location: { type: String, required: true },
    photo: String,
    description: String,
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip"},
  },
  { timestamps: true }
);


const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
