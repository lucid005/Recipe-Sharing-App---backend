const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
