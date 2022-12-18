const mongoose = require("mongoose");

const aboutYouSchema = mongoose.Schema(
  {
    dateOfBirth: { type: String },
    hobbies: { type: String, trim: true },
    countryOfResidence: { type: String },
    dietaryRestrictions: { type: String, trim: true },
    accessibility: { type: String, trim: true },
    user: String,
  },
  { timestamps: true }
);

const AboutYou = mongoose.model("AboutYou", aboutYouSchema);

module.exports = AboutYou;
