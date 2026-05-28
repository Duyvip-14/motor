const BillInput = require('../model/hoadonnhap');

exports.getAllBillIP = (req, res) => {
    BillInput.getAll((err, result) => {
        if (err) return res.status(500).json({ message: err.message || 'Lỗi lấy danh sách hóa đơn nhập' });
        res.json(result);
    });
};

exports.getBillById = (req, res) => {
    const { ma_hoa_don } = req.params;
    BillInput.getDetailById(ma_hoa_don, (err, result) => {
        if (err) return res.status(500).json({ message: 'Lỗi lấy chi tiết hóa đơn nhập' });
        res.json(result);
    });
};

exports.getBillInfoById = (req, res) => {
    const { ma_hoa_don } = req.params;
    BillInput.getById(ma_hoa_don, (err, result) => {
        if (err) return res.status(500).json({ message: 'Lỗi lấy hóa đơn nhập' });
        res.json(result);
    });
};

exports.createBillIP = (req, res) => {
    BillInput.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ message: err.message || 'Lỗi tạo hóa đơn nhập' });
        res.status(201).json(result);
    });
};

exports.searchBillIP = (req, res) => {
    const { searchTerm } = req.params;
    BillInput.searchByNCC(searchTerm, (err, result) => {
        if (err) return res.status(500).json({ message: 'Lỗi tìm kiếm' });
        res.json(result);
    });
};

exports.deleteBillIP = (req, res) => {
    const { ma_hoa_don } = req.params;
    BillInput.delete(ma_hoa_don, (err, result) => {
        if (err) return res.status(500).json({ message: err.message || 'Lỗi xóa hóa đơn nhập' });
        res.json({ message: 'Xóa hóa đơn nhập thành công' });
    });
};

exports.updateBillInfo = (req, res) => {
    const { ma_hoa_don } = req.params;
    BillInput.updateInfo(ma_hoa_don, req.body, (err, result) => {
        if (err) return res.status(500).json({ message: err.message || 'Lỗi cập nhật hóa đơn nhập' });
        res.json({ message: 'Cập nhật hóa đơn nhập thành công', result });
    });
};
