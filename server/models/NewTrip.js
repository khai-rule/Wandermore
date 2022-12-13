const mongoose = require("mongoose");

const newTripSchema = mongoose.Schema(
  {
    departureDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    country: { type: String, required: true },
    activityPreference: String,
    accomodationPreference: String,
    pax: { type: Number, min: 1 },
    paxInfo: String,
    otherInfo: String,
  },
  { timestamps: true }
);

const NewTrip = mongoose.model("New Trip", newTripSchema);

module.exports = NewTrip;
