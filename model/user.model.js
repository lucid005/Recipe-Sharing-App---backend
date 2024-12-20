const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
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
    enum: ["user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
