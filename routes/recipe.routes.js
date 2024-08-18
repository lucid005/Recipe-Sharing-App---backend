const express = require("express");
const router = express.Router();
const { createRecipe, getAllRecipe } = require("../controller/recipe.controller");
const upload = require("../middleware/multer.middleware");

router.get('/allRecipes', getAllRecipe);
router.post("/addRecipe",  upload.single('recipeImage'), createRecipe);
 
module.exports = router;