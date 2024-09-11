const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const uploadOnCloudinary = require("../utils/cloudinary.utils");

const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      profileImage: `https://avatar.iran.liara.run/username?username=${fullname}`,
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
    const users = await userModel.find();
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
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: user,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let profileImage;

    if (req.file) {
      const cloudinaryResult = await uploadOnCloudinary(req.file?.path);

      if(!cloudinaryResult) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }

      profileImage = cloudinaryResult.secure_url;
    }

    const user = await userModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...(profileImage && { profileImage }),
      },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
