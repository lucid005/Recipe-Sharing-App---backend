const cookModel = require("../model/cook.model");
const bcrypt = require("bcrypt");
const uploadOnCloudinary = require("../utils/cloudinary.utils");

const createCook = async (req, res) => {
  const { fullname, gender, phone, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCook = await cookModel.create({
      fullname,
      gender,
      phone,
      email,
      password: hashedPassword,
      profileImage: `https://avatar.iran.liara.run/username?username=${fullname}`,
    });
    await newCook.save();

    res.status(200).json({
      success: true,
      message: "Cook created successfully",
      newCook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCook = async (req, res) => {
  try {
    const cook = await cookModel.find();
    res.status(200).json({
      success: true,
      message: cook,
      totalCount: cook.length,
      cook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCookById = async (req, res) => {
  try {
    const { id } = req.params;
    const cook = await cookModel.findById(id);
    if (!cook) {
      return res.status(404).json({
        success: false,
        message: "Cook not found",
      });
    }
    res.status(200).json({
      success: true,
      message: cook,
      cook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCook = async (req, res) => {
  try {
    const { id } = req.params;
    let profileImage;

    if (req.file) {
      const cloudinaryResult = await uploadOnCloudinary(req.file?.path);

      if (!cloudinaryResult) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }

      profileImage = cloudinaryResult.secure_url;
    }

    const cook = await cookModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...(profileImage && { profileImage }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!cook) {
      return res.status(404).json({
        success: false,
        message: "Cook not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cook updated successfully",
      cook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCook = async (req, res) => {
  try {
    const { id } = req.params;
    const cook = await cookModel.findByIdAndDelete(id);

    if (!cook) {
      return res.status(404).json({
        success: false,
        message: "Cook not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cook deleted successfully",
      cook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCook,
  getAllCook,
  getCookById,
  updateCook,
  deleteCook,
};
