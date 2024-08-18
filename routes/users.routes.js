const express = require("express");
const router = express.Router();
const { createUser, getAllUsers } = require("../controller/user.controller");
const { logInUser } = require("../controller/login.controller");

router.get('/getUser', getAllUsers);
router.post("/register", createUser),
router.post("/login", logInUser);

module.exports = router;
