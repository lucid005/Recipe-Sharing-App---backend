const mongoose = require("mongoose");

const cookSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
  },

  gender: {
    type: String,
    required: [true, "Gender is required"],
  },

  phone: {
    type: Number,
    required: [true, "Phone number is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  profileImage: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    enum: ["cook"],
    default: "cook",
  },
});

module.exports = mongoose.model("Cook", cookSchema);
