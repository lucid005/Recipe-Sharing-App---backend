const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controller/user.controller");
const upload = require("../middleware/multer.middleware");

router.get('/getUser', getAllUsers);
router.get('/getUser/:id', getUserById);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.post("/register", upload.single('userImage'), createUser);

module.exports = router;
 