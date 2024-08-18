const recipeModel = require("../model/recipe.model");
const uploadOnCloudinary = require("../utils/cloudinary.utils");
const fs = require("fs");
const path = require("path");

const createRecipe = async (req, res) => {
  const { title, description, ingredients, instructions, chef } = req.body;
  console.log(req.file);

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const cloudinaryResult = await uploadOnCloudinary(req.file.path, "recipe");

    if (!cloudinaryResult) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const newRecipe = await recipeModel.create({
      title,
      description,
      recipeImage: cloudinaryResult.secure_url, 
      ingredients, 
      instructions, 
      chef,
    });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      newRecipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

const getAllRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.find();
    res.status(200).json({
      success: true,
      message: recipe,
      totalCount: recipe.length,
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

const getRecipeByID = async (req, res) => {
  const { id } = req.params;
}

module.exports = {
  createRecipe,
  getAllRecipe,
};
