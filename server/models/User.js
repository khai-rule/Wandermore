const mongoose = require("mongoose");

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    firstName: { type: String, require: true, trim: true },
    lastName: { type: String, require: true, trim: true },
    password: {
      type: String,
      minLength: 6,
      require: true,
      match: passwordRules,
    },
    aboutYou: { type: mongoose.Schema.Types.ObjectId, ref: "AboutYou" },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
