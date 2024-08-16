const { createRecipe, getAllRecipe } = require("../controller/recipe.controller");
const { createUser, getAllUsers } = require("../controller/user.controller");
const { logInUser } = require("../controller/login.controller");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware");

router.get('/api/recipes', getAllRecipe);
router.get('/api/register', getAllUsers);
router.post("/api/addrecipe",  upload.single('recipeImage'), createRecipe);
router.post("/api/register", createUser),
router.post("/api/login", logInUser);
 
module.exports = router;