const express = require("express");
const router = express.Router();
const { createRecipe, getAllRecipe, getRecipeById, updateRecipe, deleteRecipe, filterRecipes, getRecipeByCook } = require("../controller/recipe.controller");
const upload = require("../middleware/multer.middleware");
const { authenticate } = require("../middleware/auth.middleware");

router.get('/allRecipes', getAllRecipe );
router.get('/allRecipes/filter', filterRecipes);
router.get('/allRecipes/filterCook', getRecipeByCook);
router.get('/allRecipes/:id', getRecipeById );
router.post("/addRecipe", authenticate, upload.single('recipeImage'), createRecipe);
router.put('/updateRecipe/:id', authenticate, upload.single('recipeImage'), updateRecipe);
router.delete('/deleteRecipe/:id', authenticate, deleteRecipe);
 
module.exports = router;