const router = require("express").Router();
const userRoute = require("./users.routes");
const recipeRoute = require("./recipe.routes");

router.use("/user", userRoute);
router.use("/recipe", recipeRoute);

module.exports = router;