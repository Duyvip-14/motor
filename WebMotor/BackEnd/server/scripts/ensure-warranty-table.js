const db = require('../config/config');

const sql = `
CREATE TABLE IF NOT EXISTS bao_hanh (
    ma_bao_hanh INT AUTO_INCREMENT PRIMARY KEY,
    ma_don_hang INT NULL,
    ma_san_pham INT NOT NULL,
    ma_khach_hang INT NULL,
    ma_nhan_vien INT NULL,
    lan_bao_hanh INT DEFAULT 1,
    ngay_bao_hanh DATE NOT NULL,
    han_bao_hanh DATE NULL,
    noi_dung TEXT NOT NULL,
    tinh_trang TEXT,
    trang_thai VARCHAR(100) DEFAULT 'Đang xử lý',
    chi_phi BIGINT DEFAULT 0,
    ghi_chu TEXT,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bao_hanh_don_hang FOREIGN KEY (ma_don_hang) REFERENCES don_hang(ma_don_hang) ON DELETE SET NULL,
    CONSTRAINT fk_bao_hanh_san_pham FOREIGN KEY (ma_san_pham) REFERENCES san_pham(ma_san_pham) ON DELETE CASCADE,
    CONSTRAINT fk_bao_hanh_khach_hang FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang) ON DELETE SET NULL,
    CONSTRAINT fk_bao_hanh_nhan_vien FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

db.query(sql, (error) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }

    console.log('Created or verified bao_hanh table.');
    db.end();
});
