const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const adminModel = require("../model/admin.model");
const cookModel = require("../model/cook.model");
const bcrypt = require("bcrypt");

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await adminModel.findOne({ email });
    if (user) {
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.fullname, role: 'admin' },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        token,
      });
    }

    user = await cookModel.findOne({ email });
    if(user) {
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.fullname, role: 'cook' },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Cook logged in successfully",
        token,
      });
    }

    user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.fullname, role: 'user' },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { logInUser };
