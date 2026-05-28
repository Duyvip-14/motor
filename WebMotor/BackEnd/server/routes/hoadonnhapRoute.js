const express = require('express');
const router = express.Router();
const billinputController = require('../controllers/hoadonnhapController');

router.get('/api/getallhdn', billinputController.getAllBillIP);
router.get('/api/gethdn/:ma_hoa_don', billinputController.getBillInfoById);
router.get('/api/getcthdn/:ma_hoa_don', billinputController.getBillById);
router.get('/api/searchhdn/:searchTerm', billinputController.searchBillIP);
router.post('/api/createhdn', billinputController.createBillIP);
router.put('/api/updatehdn/:ma_hoa_don', billinputController.updateBillInfo);
router.delete('/api/deletehdn/:ma_hoa_don', billinputController.deleteBillIP);

module.exports = router;
