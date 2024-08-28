const recipeModel = require("../model/recipe.model");
const uploadOnCloudinary = require("../utils/cloudinary.utils");

const createRecipe = async (req, res) => {
  const { title, description, ingredients, instructions, category } = req.body;
  const chefName = req.user?.name;

  if (!chefName) {
    return res.status(400).json({
      success: false,
      message: "Chef name is required",
    });
  }

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
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      category: JSON.parse(category),
      chef: chefName,
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

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }
    res.status(200).json({
      success: true,
      message: recipe,
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

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions, category, chef } =
      req.body;

    const updatedFields = {
      title,
      description,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      category: JSON.parse(category),
      chef,
    };

    if (req.file) {
      const cloudinaryResult = await uploadOnCloudinary(
        req.file.path,
        "recipe"
      );
      if (!cloudinaryResult) {
        updatedFields.recipeImage = cloudinaryResult.secure_url;
      } else {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }
    }

    const recipe = await recipeModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeModel.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRecipe,
  getAllRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
