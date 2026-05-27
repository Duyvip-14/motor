const db = require('../config/config');

const Order = {
    addOrder: (orderData, callback) => {
        const {
            ma_khach_hang,
            ngay_dat_hang,
            tong_tien,
            trang_thai,
            ten_khach,
            dia_chi,
            ghi_chu,
            sdt,
            loai_thanh_toan,
            trang_thai_thanh_toan,
            chi_tiet_don_hang
        } = orderData;

        if (!Array.isArray(chi_tiet_don_hang) || chi_tiet_don_hang.length === 0) {
            return callback({ message: 'Đơn hàng không có sản phẩm' });
        }

        db.getConnection((err, connection) => {
            if (err) return callback({ message: 'Lỗi kết nối database', error: err });

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callback({ message: 'Không thể bắt đầu transaction', error: err });
                }

                // Bước 1: kiểm tra tồn kho (lock row bằng FOR UPDATE)
                const productIds = chi_tiet_don_hang.map(it => Number(it.ma_san_pham));
                const placeholders = productIds.map(() => '?').join(',');
                const sqlCheck = `SELECT ma_san_pham, ten_san_pham, soluong FROM san_pham WHERE ma_san_pham IN (${placeholders}) FOR UPDATE`;

                connection.query(sqlCheck, productIds, (err, stockRows) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            callback({ message: 'Lỗi kiểm tra tồn kho', error: err });
                        });
                    }

                    const stockMap = {};
                    stockRows.forEach(r => { stockMap[r.ma_san_pham] = r; });

                    const issues = [];
                    for (const item of chi_tiet_don_hang) {
                        const id = Number(item.ma_san_pham);
                        const stock = stockMap[id];
                        if (!stock) {
                            issues.push({ ma_san_pham: id, ten: item.ten_san_pham, ly_do: 'Sản phẩm không tồn tại' });
                            continue;
                        }
                        const available = parseInt(stock.soluong) || 0;
                        if (available <= 0) {
                            issues.push({ ma_san_pham: id, ten: stock.ten_san_pham, ly_do: 'Đã hết hàng', available: 0, requested: item.so_luong });
                        } else if (available < item.so_luong) {
                            issues.push({ ma_san_pham: id, ten: stock.ten_san_pham, ly_do: `Chỉ còn ${available} sản phẩm`, available, requested: item.so_luong });
                        }
                    }

                    if (issues.length > 0) {
                        return connection.rollback(() => {
                            connection.release();
                            callback({
                                message: 'Sản phẩm không đủ tồn kho',
                                stock_issues: issues
                            });
                        });
                    }

                    // Bước 2: insert đơn hàng
                    const insertOrderQuery = `
                        INSERT INTO don_hang
                        (ma_khach_hang, ngay_dat_hang, tong_tien, trang_thai,
                         ten_khach, dia_chi, ghi_chu, sdt,
                         loai_thanh_toan, trang_thai_thanh_toan)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;

                    connection.query(
                        insertOrderQuery,
                        [ma_khach_hang, ngay_dat_hang, tong_tien, trang_thai, ten_khach, dia_chi, ghi_chu, sdt, loai_thanh_toan, trang_thai_thanh_toan],
                        (err, result) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    callback({ message: 'Lỗi khi thêm đơn hàng', error: err });
                                });
                            }

                            const ma_don_hang = result.insertId;

                            // Bước 3: insert chi tiết
                            const insertOrderDetailsQuery = `
                                INSERT INTO chi_tiet_don_hang
                                (ma_don_hang, ma_san_pham, ten_san_pham,
                                 so_luong, gia, kich_co, mau_sac, anh_sanpham)
                                VALUES ?
                            `;

                            const orderDetailsValues = chi_tiet_don_hang.map(item => [
                                ma_don_hang,
                                item.ma_san_pham,
                                item.ten_san_pham,
                                item.so_luong,
                                item.gia,
                                item.kich_co,
                                item.mau_sac,
                                item.anh_sanpham
                            ]);

                            connection.query(insertOrderDetailsQuery, [orderDetailsValues], (err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        callback({ message: 'Lỗi khi thêm chi tiết đơn hàng', error: err });
                                    });
                                }

                                // Bước 4: trừ tồn kho san_pham từng item
                                const stockUpdates = chi_tiet_don_hang.map(item => new Promise((resolve, reject) => {
                                    const sqlUpdate = `UPDATE san_pham SET soluong = soluong - ? WHERE ma_san_pham = ? AND soluong >= ?`;
                                    connection.query(sqlUpdate, [item.so_luong, item.ma_san_pham, item.so_luong], (err, res) => {
                                        if (err) return reject(err);
                                        if (res.affectedRows === 0) return reject(new Error(`Không trừ được tồn kho sp ${item.ma_san_pham}`));
                                        resolve();
                                    });
                                }));

                                Promise.all(stockUpdates)
                                    .then(() => {
                                        // Bước 5: trừ tồn kho kho_hang (FIFO - trừ từ kho cũ nhất)
                                        const warehouseUpdates = chi_tiet_don_hang.map(item => new Promise((resolve, reject) => {
                                            let remaining = parseInt(item.so_luong);
                                            const sqlGetKho = `SELECT ma_kho_hang, so_luong FROM kho_hang WHERE ma_san_pham = ? AND so_luong > 0 ORDER BY ma_kho_hang ASC`;
                                            connection.query(sqlGetKho, [item.ma_san_pham], (err, khoRows) => {
                                                if (err) return reject(err);
                                                if (!khoRows || khoRows.length === 0) return resolve(); // Không có kho thì bỏ qua

                                                const khoUpdates = [];
                                                for (const kho of khoRows) {
                                                    if (remaining <= 0) break;
                                                    const deduct = Math.min(remaining, kho.so_luong);
                                                    khoUpdates.push(new Promise((res, rej) => {
                                                        connection.query(
                                                            `UPDATE kho_hang SET so_luong = so_luong - ? WHERE ma_kho_hang = ?`,
                                                            [deduct, kho.ma_kho_hang],
                                                            (err) => err ? rej(err) : res()
                                                        );
                                                    }));
                                                    remaining -= deduct;
                                                }
                                                Promise.all(khoUpdates).then(() => resolve()).catch(reject);
                                            });
                                        }));

                                        return Promise.all(warehouseUpdates);
                                    })
                                    .then(() => {
                                        connection.commit((err) => {
                                            if (err) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    callback({ message: 'Lỗi commit dữ liệu', error: err });
                                                });
                                            }
                                            connection.release();
                                            callback(null, { message: 'Đặt hàng thành công', ma_don_hang });
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
        });
    }
};

module.exports = Order;
