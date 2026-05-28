const express = require('express');
const router = express.Router();
const warrantyController = require('../controllers/baohanhController');

router.get('/api/getallbaohanh', warrantyController.getAllWarranties);
router.get('/api/getbaohanh/:ma_bao_hanh', warrantyController.getWarrantyById);
router.get('/api/getbaohanhbyuser/:ma_khach_hang', warrantyController.getWarrantiesByCustomerId);
router.post('/api/createbaohanh', warrantyController.createWarranty);
router.put('/api/updatebaohanh/:ma_bao_hanh', warrantyController.updateWarranty);
router.delete('/api/deletebaohanh/:ma_bao_hanh', warrantyController.deleteWarranty);
router.get('/api/searchbaohanh/:searchTerm', warrantyController.searchWarranties);

module.exports = router;
