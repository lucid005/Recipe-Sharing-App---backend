const express = require("express");
const router = express.Router();
const { logInUser } = require("../controller/login.controller");

router.post("/login", logInUser);

module.exports = router;
