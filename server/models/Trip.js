const mongoose = require("mongoose");

const tripSchema = mongoose.Schema (
  {
    departureDate: { type: String, required: true },
    returnDate: { type: String, required: true },
    country: { type: String, required: true },
    activityPreference: String,
    accomodationPreference: String,
    pax: { type: Number, min: 1 },
    paxInfo: String,
    otherInfo: String,
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
