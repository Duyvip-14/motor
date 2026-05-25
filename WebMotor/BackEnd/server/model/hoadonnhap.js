const db = require('../config/config');

const BillInput = {

    getAll: (callback) => {
        const sqlGet = `
            SELECT hdn.*, nv.ten_nhan_vien
            FROM hoa_don_nhap hdn
            LEFT JOIN nhan_vien nv ON hdn.ma_nhan_vien = nv.ma_nhan_vien
            ORDER BY hdn.ma_hoa_don DESC
        `;
        db.query(sqlGet, (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    getDetailById: (ma_hoa_don, callback) => {
        const sqlGet = "SELECT * FROM chi_tiet_hoa_don_nhap WHERE ma_hoa_don = ?";
        db.query(sqlGet, [ma_hoa_don], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    searchByNCC: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM hoa_don_nhap WHERE ten_ncc LIKE ? OR sdt LIKE ? ORDER BY ma_hoa_don DESC";
        const term = `%${searchTerm}%`;
        db.query(sqlSearch, [term, term], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

    delete: (ma_hoa_don, callback) => {
        db.getConnection((err, connection) => {
            if (err) return callback({ message: 'Lỗi kết nối DB', error: err });

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callback({ message: 'Lỗi transaction', error: err });
                }

                // Lấy chi tiết để trừ ngược tồn kho (vì đã cộng khi tạo)
                connection.query(
                    'SELECT ma_san_pham, so_luong FROM chi_tiet_hoa_don_nhap WHERE ma_hoa_don = ?',
                    [ma_hoa_don],
                    (err, details) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                callback({ message: 'Lỗi đọc chi tiết', error: err });
                            });
                        }

                        const updates = details.map(d => new Promise((resolve, reject) => {
                            connection.query(
                                'UPDATE san_pham SET soluong = GREATEST(soluong - ?, 0) WHERE ma_san_pham = ?',
                                [d.so_luong, d.ma_san_pham],
                                (e) => e ? reject(e) : resolve()
                            );
                        }));

                        Promise.all(updates)
                            .then(() => {
                                connection.query(
                                    'DELETE FROM hoa_don_nhap WHERE ma_hoa_don = ?',
                                    [ma_hoa_don],
                                    (err, result) => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                callback({ message: 'Lỗi xóa hóa đơn', error: err });
                                            });
                                        }
                                        connection.commit((err) => {
                                            if (err) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    callback({ message: 'Lỗi commit', error: err });
                                                });
                                            }
                                            connection.release();
                                            callback(null, result);
                                        });
                                    }
                                );
                            })
                            .catch(err => {
                                connection.rollback(() => {
                                    connection.release();
                                    callback({ message: 'Lỗi rollback tồn kho', error: err.message });
                                });
                            });
                    }
                );
            });
        });
    },

    create: (data, callback) => {
        const {
            ngay_nhap, ten_ncc, sdt, ma_nhan_vien, email, dia_chi,
            chi_tiet
        } = data;

        if (!Array.isArray(chi_tiet) || chi_tiet.length === 0) {
            return callback({ message: 'Hóa đơn nhập cần có ít nhất 1 sản phẩm' });
        }

        const tong_tien = chi_tiet.reduce((sum, it) => sum + (Number(it.don_gia) || 0) * (Number(it.so_luong) || 0), 0);

        db.getConnection((err, connection) => {
            if (err) return callback({ message: 'Lỗi kết nối DB', error: err });

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callback({ message: 'Lỗi transaction', error: err });
                }

                const sqlInsertHDN = `
                    INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;

                connection.query(
                    sqlInsertHDN,
                    [ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien || null, email, dia_chi],
                    (err, result) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                callback({ message: 'Lỗi thêm hóa đơn nhập', error: err });
                            });
                        }

                        const ma_hoa_don = result.insertId;

                        const detailValues = chi_tiet.map(it => [
                            ma_hoa_don,
                            it.ma_san_pham,
                            it.ten_san_pham,
                            it.so_luong,
                            it.don_gia,
                            it.kich_co || '',
                            it.mau_sac || '',
                            it.anh_san_pham || ''
                        ]);

                        const sqlInsertCT = `
                            INSERT INTO chi_tiet_hoa_don_nhap
                            (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham)
                            VALUES ?
                        `;

                        connection.query(sqlInsertCT, [detailValues], (err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    callback({ message: 'Lỗi thêm chi tiết', error: err });
                                });
                            }

                            // Cộng tồn kho
                            const stockUpdates = chi_tiet.map(it => new Promise((resolve, reject) => {
                                connection.query(
                                    'UPDATE san_pham SET soluong = soluong + ? WHERE ma_san_pham = ?',
                                    [it.so_luong, it.ma_san_pham],
                                    (e) => e ? reject(e) : resolve()
                                );
                            }));

                            Promise.all(stockUpdates)
                                .then(() => {
                                    connection.commit((err) => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                callback({ message: 'Lỗi commit', error: err });
                                            });
                                        }
                                        connection.release();
                                        callback(null, { message: 'Thêm hóa đơn nhập thành công', ma_hoa_don, tong_tien });
                                    });
                                })
                                .catch(err => {
                                    connection.rollback(() => {
                                        connection.release();
                                        callback({ message: 'Lỗi cập nhật tồn kho', error: err.message });
                                    });
                                });
                        });
                    }
                );
            });
        });
    }
};

module.exports = BillInput;
