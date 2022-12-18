const mongoose = require("mongoose");

const tripSchema = mongoose.Schema(
  {
    departureDate: { type: Date, required: true, min: new Date() },
    returnDate: { type: Date, required: true },
    country: { type: String, required: true },
    activityPreference: { type: String, required: true },
    accomodationPreference: { type: String, required: true },
    pax: { type: Number, min: 1 },
    paxInfo: { type: String, trim: true },
    otherInfo: { type: String, trim: true },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
