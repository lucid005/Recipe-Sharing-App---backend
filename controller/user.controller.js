const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: error.message,
    });
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    res.status(200).json({
      success: true,
      message: users,
      totalCount: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { createUser, getAllUsers };    