const db = require('../config/config');

const Warehouse = {
    getAll: (callback) => {
        const sqlGet = `
            SELECT kh.*, sp.ten_san_pham AS ten_sp_chinh, sp.gia
            FROM kho_hang kh
            LEFT JOIN san_pham sp ON kh.ma_san_pham = sp.ma_san_pham
            ORDER BY kh.ma_kho_hang DESC
        `;
        db.query(sqlGet, (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },
    getById: (ma_kho_hang, callback) => {
        const sqlGet = "SELECT * FROM kho_hang WHERE ma_kho_hang = ?";
        db.query(sqlGet, ma_kho_hang, (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },
    create: (warehouseData, callback) => {
        const { ma_san_pham, ten_san_pham, ngay_san_xuat, so_luong, mau_sac, kich_co, anh_sanpham } = warehouseData;
        const sqlInsert = "INSERT INTO kho_hang (ma_san_pham, ten_san_pham, ngay_san_xuat, so_luong, mau_sac, kich_co, anh_sanpham) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(sqlInsert, [ma_san_pham, ten_san_pham, ngay_san_xuat, so_luong, mau_sac, kich_co, anh_sanpham], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    update: (ma_kho_hang, warehouseData, callback) => {
        const { ten_san_pham, ngay_san_xuat, so_luong, mau_sac, kich_co, anh_sanpham } = warehouseData;
        const sqlUpdate = "UPDATE kho_hang SET ten_san_pham = ?, ngay_san_xuat = ?, so_luong = ?, mau_sac = ?, kich_co = ?, anh_sanpham = ? WHERE ma_kho_hang = ?";
        db.query(sqlUpdate, [ten_san_pham, ngay_san_xuat, so_luong, mau_sac, kich_co, anh_sanpham, ma_kho_hang], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    delete: (ma_kho_hang, callback) => {
        const sqlDelete = "DELETE FROM kho_hang WHERE ma_kho_hang = ?";
        db.query(sqlDelete, ma_kho_hang, (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT kh.*, sp.gia FROM kho_hang kh LEFT JOIN san_pham sp ON kh.ma_san_pham = sp.ma_san_pham WHERE kh.ten_san_pham LIKE ? OR kh.mau_sac LIKE ? OR kh.kich_co LIKE ? ORDER BY kh.ma_kho_hang DESC";
        const term = `%${searchTerm}%`;
        db.query(sqlSearch, [term, term, term], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    }
};

module.exports = Warehouse;
