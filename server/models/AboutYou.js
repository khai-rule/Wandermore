const mongoose = require("mongoose");

const aboutYouSchema = mongoose.Schema(
  {
    dateOfBirth: { type: Date },
    hobbies: { type: String, trim: true },
    countryOfResidence: { type: String },
    dietaryRestrictions: { type: String, trim: true },
    accessibility: { type: String, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const AboutYou = mongoose.model("AboutYou", aboutYouSchema);

module.exports = AboutYou;
