const cookModel = require("../model/cook.model");
const bcrypt = require("bcrypt");

const createCook = async (req, res) => {
  const { fullname, gender, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCook = await cookModel.create({
      fullname,
      gender,
      email,
      password: hashedPassword,
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
    const { fullname, gender, email, password } = req.body;
    const updatedFields = { fullname, gender, email };

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
