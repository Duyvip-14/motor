const db = require('../config/config');

const Warranty = {
    getAll: (callback) => {
        const sqlGet = `
            SELECT bh.*, sp.ten_san_pham, sp.anh_sanpham, kh.ten_khach_hang, nv.ten_nhan_vien
            FROM bao_hanh bh
            LEFT JOIN san_pham sp ON bh.ma_san_pham = sp.ma_san_pham
            LEFT JOIN khach_hang kh ON bh.ma_khach_hang = kh.ma_khach_hang
            LEFT JOIN nhan_vien nv ON bh.ma_nhan_vien = nv.ma_nhan_vien
            ORDER BY bh.ngay_bao_hanh DESC, bh.ma_bao_hanh DESC
        `;
        db.query(sqlGet, (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    getById: (ma_bao_hanh, callback) => {
        const sqlGet = `
            SELECT bh.*, sp.ten_san_pham, sp.anh_sanpham, kh.ten_khach_hang, nv.ten_nhan_vien
            FROM bao_hanh bh
            LEFT JOIN san_pham sp ON bh.ma_san_pham = sp.ma_san_pham
            LEFT JOIN khach_hang kh ON bh.ma_khach_hang = kh.ma_khach_hang
            LEFT JOIN nhan_vien nv ON bh.ma_nhan_vien = nv.ma_nhan_vien
            WHERE bh.ma_bao_hanh = ?
        `;
        db.query(sqlGet, [ma_bao_hanh], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    getByCustomerId: (ma_khach_hang, callback) => {
        const sqlGet = `
            SELECT bh.*, sp.ten_san_pham, sp.anh_sanpham, kh.ten_khach_hang, nv.ten_nhan_vien
            FROM bao_hanh bh
            LEFT JOIN san_pham sp ON bh.ma_san_pham = sp.ma_san_pham
            LEFT JOIN khach_hang kh ON bh.ma_khach_hang = kh.ma_khach_hang
            LEFT JOIN nhan_vien nv ON bh.ma_nhan_vien = nv.ma_nhan_vien
            WHERE bh.ma_khach_hang = ?
            ORDER BY bh.ngay_bao_hanh DESC, bh.ma_bao_hanh DESC
        `;
        db.query(sqlGet, [ma_khach_hang], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    create: (warrantyData, callback) => {
        const {
            ma_don_hang,
            ma_san_pham,
            ma_khach_hang,
            ma_nhan_vien,
            lan_bao_hanh,
            ngay_bao_hanh,
            han_bao_hanh,
            noi_dung,
            tinh_trang,
            trang_thai,
            chi_phi,
            ghi_chu
        } = warrantyData;
        const sqlInsert = `
            INSERT INTO bao_hanh
            (ma_don_hang, ma_san_pham, ma_khach_hang, ma_nhan_vien, lan_bao_hanh,
             ngay_bao_hanh, han_bao_hanh, noi_dung, tinh_trang, trang_thai, chi_phi, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(sqlInsert, [
            ma_don_hang || null,
            ma_san_pham,
            ma_khach_hang || null,
            ma_nhan_vien || null,
            lan_bao_hanh || 1,
            ngay_bao_hanh,
            han_bao_hanh || null,
            noi_dung,
            tinh_trang || null,
            trang_thai || 'Đang xử lý',
            chi_phi || 0,
            ghi_chu || null
        ], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    update: (ma_bao_hanh, warrantyData, callback) => {
        const {
            ma_don_hang,
            ma_san_pham,
            ma_khach_hang,
            ma_nhan_vien,
            lan_bao_hanh,
            ngay_bao_hanh,
            han_bao_hanh,
            noi_dung,
            tinh_trang,
            trang_thai,
            chi_phi,
            ghi_chu
        } = warrantyData;
        const sqlUpdate = `
            UPDATE bao_hanh SET
                ma_don_hang = ?, ma_san_pham = ?, ma_khach_hang = ?, ma_nhan_vien = ?,
                lan_bao_hanh = ?, ngay_bao_hanh = ?, han_bao_hanh = ?, noi_dung = ?,
                tinh_trang = ?, trang_thai = ?, chi_phi = ?, ghi_chu = ?
            WHERE ma_bao_hanh = ?
        `;
        db.query(sqlUpdate, [
            ma_don_hang || null,
            ma_san_pham,
            ma_khach_hang || null,
            ma_nhan_vien || null,
            lan_bao_hanh || 1,
            ngay_bao_hanh,
            han_bao_hanh || null,
            noi_dung,
            tinh_trang || null,
            trang_thai || 'Đang xử lý',
            chi_phi || 0,
            ghi_chu || null,
            ma_bao_hanh
        ], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    delete: (ma_bao_hanh, callback) => {
        const sqlDelete = "DELETE FROM bao_hanh WHERE ma_bao_hanh = ?";
        db.query(sqlDelete, [ma_bao_hanh], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    search: (searchTerm, callback) => {
        const sqlSearch = `
            SELECT bh.*, sp.ten_san_pham, sp.anh_sanpham, kh.ten_khach_hang, nv.ten_nhan_vien
            FROM bao_hanh bh
            LEFT JOIN san_pham sp ON bh.ma_san_pham = sp.ma_san_pham
            LEFT JOIN khach_hang kh ON bh.ma_khach_hang = kh.ma_khach_hang
            LEFT JOIN nhan_vien nv ON bh.ma_nhan_vien = nv.ma_nhan_vien
            WHERE sp.ten_san_pham LIKE ?
               OR kh.ten_khach_hang LIKE ?
               OR nv.ten_nhan_vien LIKE ?
               OR bh.noi_dung LIKE ?
               OR bh.trang_thai LIKE ?
            ORDER BY bh.ngay_bao_hanh DESC, bh.ma_bao_hanh DESC
        `;
        const formattedSearchTerm = `%${searchTerm}%`;
        db.query(sqlSearch, [formattedSearchTerm, formattedSearchTerm, formattedSearchTerm, formattedSearchTerm, formattedSearchTerm], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },
};

module.exports = Warranty;
