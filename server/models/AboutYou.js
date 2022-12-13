const mongoose = require("mongoose");

const aboutYouSchema = mongoose.Schema (
    {
        dateOfBirth: {type: Date, required: true},
        hobbies: {type: [String], trim: true},
        countryOfResidence : {type: String, required: true},
        dietaryRestrictions: {type: [String], trim: true},
        accessibility: {type: [String], trim: true}
    },
    { timestamps: true }
);

const AboutYou = mongoose.model("AboutYou", aboutYouSchema);

module.exports = AboutYou;