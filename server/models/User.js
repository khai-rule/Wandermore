const mongoose = require("mongoose");

const userSchema = new mongoose.Schema (
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    firstName: { type: String, require: true, trim: true },
    lastName: { type: String, require: true, trim: true },
    password: { type: String, minLength: 6 },
    aboutYou: { type: mongoose.Schema.Types.ObjectId, ref: "AboutYou" },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);


module.exports = User;
