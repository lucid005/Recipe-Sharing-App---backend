const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, fullname: user.fullname },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ sucess: true, message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

module.exports = { logInUser };
