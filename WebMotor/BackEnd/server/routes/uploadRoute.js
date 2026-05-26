const express = require('express');
const router = express.Router();
const { upload, uploadSingle, uploadMultiple } = require('../controllers/uploadController');

// Upload 1 ảnh
router.post('/api/upload', upload.single('image'), uploadSingle);

// Upload nhiều ảnh (tối đa 5)
router.post('/api/upload-multiple', upload.array('images', 5), uploadMultiple);

module.exports = router;
