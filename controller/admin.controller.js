const adminModel = require("../model/admin.model");
const bcrypt = require("bcrypt");

const registerAdmin = async (req, res) => {
  try {
    const adminCount = await adminModel.countDocuments({ role: "admin" });
    if (adminCount >= 1) {
      return res.status(400).json({
        success: false,
        message: "Only one admin account is allowed",
      });
    }

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await adminModel.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdmin = async (req, res) => {
    try {
        const admin = await adminModel.findOne({ role: "admin" });
        if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found",
        });
        }
        res.status(200).json({
        success: true,
        message: admin,
        admin,
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
}

module.exports = { registerAdmin, getAdmin };
