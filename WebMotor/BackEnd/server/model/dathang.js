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

        const insertOrderQuery = `
            INSERT INTO don_hang 
            (ma_khach_hang, ngay_dat_hang, tong_tien, trang_thai, 
            ten_khach, dia_chi, ghi_chu, sdt,
            loai_thanh_toan,trang_thai_thanh_toan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.getConnection((err, connection) => {
            if (err) {
                console.error("Lỗi kết nối DB:", err);
                return callback({
                    message: "Lỗi kết nối database",
                    error: err
                });
            }

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    console.error("Lỗi beginTransaction:", err);

                    return callback({
                        message: "Không thể bắt đầu transaction",
                        error: err
                    });
                }

                connection.query(
                    insertOrderQuery,
                    [
                        ma_khach_hang, 
                        ngay_dat_hang, 
                        tong_tien, 
                        trang_thai, 
                        ten_khach, 
                        dia_chi, 
                        ghi_chu, 
                        sdt,
                        loai_thanh_toan,
                        trang_thai_thanh_toan
                    ],
                    (err, result) => {

                        if (err) {
                            console.error("Lỗi insert đơn hàng:", err);

                            return connection.rollback(() => {
                                connection.release();

                                callback({
                                    message: "Lỗi khi thêm đơn hàng",
                                    error: err
                                });
                            });
                        }

                        const ma_don_hang = result.insertId;

                        const insertOrderDetailsQuery = `
                            INSERT INTO chi_tiet_don_hang 
                            (ma_don_hang, ma_san_pham, ten_san_pham, 
                            so_luong, gia, kich_co, mau_sac ,anh_sanpham)
                            VALUES ?
                        `;

                        console.log("Chi tiết đơn hàng:", chi_tiet_don_hang);

                        const orderDetailsValues = chi_tiet_don_hang?.map((item) => [
                            ma_don_hang,
                            item.ma_san_pham,
                            item.ten_san_pham,
                            item.so_luong,
                            item.gia,
                            item.kich_co,
                            item.mau_sac,
                            item.anh_sanpham
                        ]);

                        connection.query(
                            insertOrderDetailsQuery,
                            [orderDetailsValues],
                            (err) => {

                                if (err) {
                                    console.error("Lỗi insert chi tiết đơn:", err);

                                    return connection.rollback(() => {
                                        connection.release();

                                        callback({
                                            message: "Lỗi khi thêm chi tiết đơn hàng",
                                            error: err
                                        });
                                    });
                                }

                                connection.commit((err) => {

                                    if (err) {
                                        console.error("Lỗi commit:", err);

                                        return connection.rollback(() => {
                                            connection.release();

                                            callback({
                                                message: "Lỗi commit dữ liệu",
                                                error: err
                                            });
                                        });
                                    }

                                    connection.release();

                                    callback(null, {
                                        message: "Thêm đơn hàng thành công",
                                        ma_don_hang
                                    });
                                });
                            }
                        );
                    }
                );
            });
        });
    }
};

module.exports = Order;