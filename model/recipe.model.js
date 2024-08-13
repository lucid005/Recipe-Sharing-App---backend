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

    image: {
      type: String,
      required: [true, "Recipe image is required"],
    },

    ingridents: [
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
    chef: {
      type: String,
      required: [true, "Recipe chief is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
