  const mongoose = require("mongoose");

  const recipeSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Recipe title is required"],
      },

      description: {
        type: String,
        required: [true, "Recipe overview is required"],
      },

      recipeImage: {
        type: String,
        required: [true, "Recipe image is required"],
      },

      ingredients: [
        {
          type: String,
          required: [true, "Recipe ingridents are required"],
        },
      ],

      instructions: [
        {
          type: String,
          required: [true, "Recipe instructions are required"],
        },
      ],

      category: {
        cuisine: {
          type: String,
          required: [ true, "Cuisine is required" ],
          enum: ["Nepalese", "American", "Indian", "Italian", "Japanese", "Chinese", "Others"],
        },
        meal: {
          type: String,
          required: [ true, "Meal type is required" ],
          enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Others"],
        },
      },

      chef: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model("Recipe", recipeSchema);
