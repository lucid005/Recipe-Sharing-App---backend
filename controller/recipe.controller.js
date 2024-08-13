const recipeModel = require("../model/recipe.model");

const createRecipe = async (req, res) => {
  const { title, description, image, ingridents, instructions, chef } = req.body;

  try {
    const newRecipe = await recipeModel.create({
      title,
      description,
      image,
      ingridents,
      instructions,
      chef,
    });
    await newRecipe.save();
    res.status(201).json({
      sucess: true,
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

module.exports = { 
    createRecipe, 
    getAllRecipe 
};
