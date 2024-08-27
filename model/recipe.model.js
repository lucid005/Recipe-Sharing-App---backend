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
    tags: [
      {
        type: String,
        required: [true, "Recipe tags are required"],
      },
    ],
    chef: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
