const router = require("express").Router();
const userRoute = require("./users.routes");
const recipeRoute = require("./recipe.routes");
const cookRoute = require("./cook.routes");
const adminRoute = require("./admin.routes");
const registerRoute = require("./registration.routes");

router.use("/user", userRoute);
router.use("/cook", cookRoute);
router.use("/recipe", recipeRoute);
router.use("/admin", adminRoute);
router.use("/register", registerRoute);

module.exports = router;