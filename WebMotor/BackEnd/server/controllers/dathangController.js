const Order = require('../model/dathang');

exports.addOrder = (req, res) => {
    const orderData = req.body;

    Order.addOrder(orderData, (err, result) => {
        if (err) {
            // Lỗi tồn kho — trả 409 + danh sách sản phẩm có vấn đề
            if (err.stock_issues) {
                return res.status(409).json({
                    success: false,
                    message: err.message,
                    stock_issues: err.stock_issues
                });
            }
            return res.status(500).json({ success: false, message: err.message || 'Lỗi đặt hàng' });
        }
        res.status(200).json({ success: true, ...result });
    });
};