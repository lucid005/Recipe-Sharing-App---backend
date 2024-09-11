const express = require('express');
const router = express.Router();
const { createCook, getAllCook, getCookById, updateCook, deleteCook } = require('../controller/cook.controller');
const upload = require('../middleware/multer.middleware');

router.get('/getCook', getAllCook);
router.get('/getCook/:id', getCookById);
router.post('/cookRegister', createCook);
router.patch('/updateCook/:id', upload.single('profileImage'), updateCook);
router.delete('/deleteCook/:id', deleteCook);

module.exports = router;