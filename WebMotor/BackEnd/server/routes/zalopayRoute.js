const express = require('express');
const router = express.Router();
const zalopayController = require('../controllers/zalopayController');

router.post('/api/zalopay_create_payment_url', zalopayController.createPaymentUrl);
router.post('/api/zalopay_callback', zalopayController.handleCallback);
router.post('/api/zalopay_verify_and_add_order', zalopayController.verifyAndAddOrder);
router.get('/zalopay-return', zalopayController.redirectReturn);

module.exports = router;
