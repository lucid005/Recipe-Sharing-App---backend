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
      cookImage: `https://avatar.iran.liara.run/username?username=${fullname}`
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
    const { fullname, gender, phone, email, password } = req.body;
    const updatedFields = { fullname, gender, phone, email };

    if (req.file) {
      const cloudinaryResult = await uploadOnCloudinary(req.file.path, "cook");
      if (cloudinaryResult) {
        updatedFields.cookImage = cloudinaryResult.secure_url;
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image",
        });
      }
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const cook = await cookModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

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
