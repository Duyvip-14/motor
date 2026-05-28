const zalopayService = require('../model/zalopay');
const Order = require('../model/dathang');
const moment = require('moment');
const config = require('config');

exports.createPaymentUrl = async (req, res) => {
  try {
    const amount = req.body.amount;
    const redirectUrl = req.body.redirectUrl || config.get('zalopay_redirect_url');
    console.log('[ZaloPay] Amount nhận được:', amount);
    const orderId = moment().format('DDHHmmss');
    const payment = await zalopayService.createPaymentUrl(amount, orderId, 'motor_user', redirectUrl);
    console.log('[ZaloPay] Payment trả về:', payment);
    return res.status(200).json({
      url: payment.order_url,
      app_trans_id: payment.app_trans_id,
      zp_trans_token: payment.zp_trans_token,
      order_token: payment.order_token,
      qr_code: payment.qr_code,
    });
  } catch (error) {
    console.error('[ZaloPay] Lỗi:', error.message);
    return res.status(500).json({ error: 'Lỗi tạo URL thanh toán ZaloPay' });
  }
};

exports.handleCallback = (req, res) => {
  try {
    const { data: dataStr, mac: reqMac } = req.body;

    if (!dataStr || !reqMac) {
      return res.json({ return_code: -1, return_message: 'Missing data' });
    }

    const isValid = zalopayService.verifyCallback(dataStr, reqMac);
    if (!isValid) {
      return res.json({ return_code: -1, return_message: 'mac not equal' });
    }

    const parsed = zalopayService.parseCallbackData(dataStr);
    console.log('ZaloPay IPN received:', JSON.stringify(parsed));

    return res.json({ return_code: 1, return_message: 'success' });
  } catch (error) {
    console.error('ZaloPay callback error:', error);
    return res.json({ return_code: 0, return_message: 'Server error' });
  }
};

exports.verifyAndAddOrder = (req, res) => {
  try {
    const { app_trans_id, orderData } = req.body;

    if (!app_trans_id) {
      return res.json({ success: false, message: 'Thiếu mã giao dịch ZaloPay' });
    }

    if (!orderData) {
      return res.json({ success: false, message: 'Thiếu dữ liệu đơn hàng' });
    }

    zalopayService.queryPaymentStatus(app_trans_id).then((paymentStatus) => {
      if (paymentStatus.return_code !== 1) {
        return res.json({
          success: false,
          message: paymentStatus.return_message || 'Giao dịch ZaloPay chưa thanh toán thành công',
        });
      }

      Order.addOrder(orderData, (err) => {
        if (err) return res.json({ success: false, message: 'Lưu đơn hàng thất bại' });
        return res.json({ success: true });
      });
    }).catch((err) => {
      console.error('ZaloPay query error:', err.message);
      return res.status(500).json({ success: false, message: 'Không xác minh được giao dịch ZaloPay' });
    });
  } catch (err) {
    console.error('ZaloPay verify error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi hệ thống' });
  }
};

exports.redirectReturn = (req, res) => {
  const redirectUrl = new URL(config.get('zalopay_redirect_url'));
  Object.entries(req.query).forEach(([key, value]) => {
    redirectUrl.searchParams.set(key, value);
  });
  return res.redirect(redirectUrl.toString());
};
