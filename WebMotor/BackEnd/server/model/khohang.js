const db = require('../config/config');

const Warehouse = {
    // Hàm đồng bộ: cập nhật san_pham.soluong = tổng kho_hang.so_luong cho sản phẩm đó
    syncProductStock: (ma_san_pham, callback) => {
        if (!ma_san_pham) return callback(null);
        const sqlSync = `
            UPDATE san_pham 
            SET soluong = COALESCE((
                SELECT SUM(so_luong) FROM kho_hang WHERE ma_san_pham = ?
            ), 0)
            WHERE ma_san_pham = ?
        `;
        db.query(sqlSync, [ma_san_pham, ma_san_pham], (error) => {
            if (error) {
                console.error('[Sync] Lỗi đồng bộ tồn kho sản phẩm:', error.message);
            }
            callback(null);
        });
    },

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
            // Đồng bộ số lượng sản phẩm sau khi thêm kho
            Warehouse.syncProductStock(ma_san_pham, () => {
                callback(null, result);
            });
        });
    },

    update: (ma_kho_hang, warehouseData, callback) => {
        const { ten_san_pham, ngay_san_xuat, so_luong, mau_sac, kich_co, anh_sanpham } = warehouseData;

        // Bước 1: Lấy ma_san_pham của bản ghi kho này
        db.query("SELECT ma_san_pham FROM kho_hang WHERE ma_kho_hang = ?", [ma_kho_hang], (error, rows) => {
            if (error) return callback(error);
            if (rows.length === 0) return callback(new Error('Không tìm thấy kho hàng'));

            const ma_san_pham = rows[0].ma_san_pham;

            // Bước 2: Cập nhật kho hàng
            const sqlUpdate = "UPDATE kho_hang SET ten_san_pham = ?, ngay_san_xuat = ?, so_luong = ?, mau_sac = ?, kich_co = ?, anh_sanpham = ? WHERE ma_kho_hang = ?";
            db.query(sqlUpdate, [ten_san_pham, ngay_san_xuat, so_luong, mau_sac, kich_co, anh_sanpham, ma_kho_hang], (error, result) => {
                if (error) return callback(error);
                // Bước 3: Đồng bộ san_pham.soluong
                Warehouse.syncProductStock(ma_san_pham, () => {
                    callback(null, result);
                });
            });
        });
    },

    delete: (ma_kho_hang, callback) => {
        // Bước 1: Lấy ma_san_pham trước khi xóa
        db.query("SELECT ma_san_pham FROM kho_hang WHERE ma_kho_hang = ?", [ma_kho_hang], (error, rows) => {
            if (error) return callback(error);

            const ma_san_pham = rows.length > 0 ? rows[0].ma_san_pham : null;

            // Bước 2: Xóa bản ghi kho
            const sqlDelete = "DELETE FROM kho_hang WHERE ma_kho_hang = ?";
            db.query(sqlDelete, ma_kho_hang, (error, result) => {
                if (error) return callback(error);
                // Bước 3: Đồng bộ san_pham.soluong
                Warehouse.syncProductStock(ma_san_pham, () => {
                    callback(null, result);
                });
            });
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
