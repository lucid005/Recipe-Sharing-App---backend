const express = require('express');
const router = express.Router();
const { registerAdmin, getAdmin } = require('../controller/admin.controller');

router.get('/getAdmin', getAdmin);
router.post('/register', registerAdmin);

module.exports = router;