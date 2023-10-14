const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    email: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 1024,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userScheme);

module.exports = userModel;
