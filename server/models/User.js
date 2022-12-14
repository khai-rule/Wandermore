const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    firstName: { type: String, require: true, trim: true },
    lastName: { type: String, require: true, trim: true },
    password: { type: String, minLength: 6 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
