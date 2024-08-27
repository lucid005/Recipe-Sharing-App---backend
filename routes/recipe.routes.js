const express = require("express");
const router = express.Router();
const { createRecipe, getAllRecipe, getRecipeById, updateRecipe, deleteRecipe } = require("../controller/recipe.controller");
const upload = require("../middleware/multer.middleware");
const { authenticate } = require("../middleware/auth.middleware");

router.get('/allRecipes', getAllRecipe );
router.get('/allRecipes/:id', getRecipeById );
router.put('/updateRecipe/:id', updateRecipe);
router.delete('/deleteRecipe/:id', deleteRecipe);
router.post("/addRecipe",  upload.single('recipeImage'), createRecipe);
 
module.exports = router;