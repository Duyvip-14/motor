-- ============================================
-- WebMotor Database Schema
-- ============================================

USE motor;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS chi_tiet_hoa_don_nhap;
DROP TABLE IF EXISTS hoa_don_nhap;
DROP TABLE IF EXISTS bao_hanh;
DROP TABLE IF EXISTS chi_tiet_don_hang;
DROP TABLE IF EXISTS don_hang;
DROP TABLE IF EXISTS kho_hang;
DROP TABLE IF EXISTS san_pham;
DROP TABLE IF EXISTS danh_muc_san_pham;
DROP TABLE IF EXISTS khach_hang;
DROP TABLE IF EXISTS nhan_vien;
DROP TABLE IF EXISTS tai_khoan;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- danh_muc_san_pham
-- ============================================
CREATE TABLE danh_muc_san_pham (
    ma_danh_muc INT AUTO_INCREMENT PRIMARY KEY,
    ten_danh_muc VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- san_pham
-- ============================================
CREATE TABLE san_pham (
    ma_san_pham INT AUTO_INCREMENT PRIMARY KEY,
    ten_san_pham VARCHAR(255) NOT NULL,
    gia BIGINT DEFAULT 0,
    size VARCHAR(100),
    mau_sac VARCHAR(100),
    anh_sanpham VARCHAR(500),
    anhhover1 VARCHAR(500),
    anhhover2 VARCHAR(500),
    ma_danh_muc INT,
    soluong INT DEFAULT 0,
    mo_ta TEXT,
    sale VARCHAR(100),
    thongbao VARCHAR(255),
    dong_co VARCHAR(255),
    dung_tich VARCHAR(100),
    duong_kinh_hanh_trinh_piston VARCHAR(255),
    ti_so_nen VARCHAR(100),
    cong_suat_cuc_dai VARCHAR(255),
    mo_men_xoan_cuc_dai VARCHAR(255),
    bo_ly_hop VARCHAR(255),
    he_thong_danh_lua VARCHAR(255),
    he_thong_khoi_dong VARCHAR(255),
    hop_so VARCHAR(255),
    he_thong_truyen_dong VARCHAR(255),
    tieu_thu_nhien_lieu VARCHAR(255),
    khi_thai VARCHAR(255),
    he_thong_phun_xang VARCHAR(255),
    FOREIGN KEY (ma_danh_muc) REFERENCES danh_muc_san_pham(ma_danh_muc) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- khach_hang
-- ============================================
CREATE TABLE khach_hang (
    ma_khach_hang INT AUTO_INCREMENT PRIMARY KEY,
    ten_khach_hang VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    so_dien_thoai VARCHAR(20),
    dia_chi VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- nhan_vien
-- ============================================
CREATE TABLE nhan_vien (
    ma_nhan_vien INT AUTO_INCREMENT PRIMARY KEY,
    ten_nhan_vien VARCHAR(255) NOT NULL,
    gioi_tinh VARCHAR(20),
    dia_chi VARCHAR(500),
    ngay_sinh DATE,
    sdt VARCHAR(20),
    cmnd VARCHAR(50),
    anh_nhanvien VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- tai_khoan
-- ============================================
CREATE TABLE tai_khoan (
    id_tai_khoan INT AUTO_INCREMENT PRIMARY KEY,
    ten_nguoi_dung VARCHAR(255),
    mat_khau VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    anh_nguoi_dung VARCHAR(500),
    sdt VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- kho_hang
-- ============================================
CREATE TABLE kho_hang (
    ma_kho_hang INT AUTO_INCREMENT PRIMARY KEY,
    ma_san_pham INT,
    ten_san_pham VARCHAR(255),
    ngay_san_xuat DATE,
    so_luong INT DEFAULT 0,
    mau_sac VARCHAR(100),
    kich_co VARCHAR(100),
    anh_sanpham VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- don_hang
-- ============================================
CREATE TABLE don_hang (
    ma_don_hang INT AUTO_INCREMENT PRIMARY KEY,
    ma_khach_hang INT,
    ngay_dat_hang DATE,
    tong_tien BIGINT DEFAULT 0,
    trang_thai INT DEFAULT 1,
    ten_khach VARCHAR(255),
    dia_chi VARCHAR(500),
    ghi_chu TEXT,
    sdt VARCHAR(20),
    ma_nhan_vien INT NULL,
    loai_thanh_toan VARCHAR(50) DEFAULT 'BuyLate',
    trang_thai_thanh_toan INT DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- chi_tiet_don_hang
-- ============================================
CREATE TABLE chi_tiet_don_hang (
    ma_chi_tiet_don_hang INT AUTO_INCREMENT PRIMARY KEY,
    ma_don_hang INT,
    ma_san_pham INT,
    ten_san_pham VARCHAR(255),
    so_luong INT,
    gia BIGINT,
    kich_co VARCHAR(100),
    mau_sac VARCHAR(100),
    anh_sanpham VARCHAR(500),
    FOREIGN KEY (ma_don_hang) REFERENCES don_hang(ma_don_hang) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- bao_hanh
-- ============================================
CREATE TABLE bao_hanh (
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
    FOREIGN KEY (ma_don_hang) REFERENCES don_hang(ma_don_hang) ON DELETE SET NULL,
    FOREIGN KEY (ma_san_pham) REFERENCES san_pham(ma_san_pham) ON DELETE CASCADE,
    FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang) ON DELETE SET NULL,
    FOREIGN KEY (ma_nhan_vien) REFERENCES nhan_vien(ma_nhan_vien) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- hoa_don_nhap
-- ============================================
CREATE TABLE hoa_don_nhap (
    ma_hoa_don INT AUTO_INCREMENT PRIMARY KEY,
    ngay_nhap DATE,
    tong_tien BIGINT DEFAULT 0,
    ten_ncc VARCHAR(255),
    sdt VARCHAR(20),
    ma_nhan_vien INT,
    email VARCHAR(255),
    dia_chi VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- chi_tiet_hoa_don_nhap
-- ============================================
CREATE TABLE chi_tiet_hoa_don_nhap (
    ma_chi_tiet INT AUTO_INCREMENT PRIMARY KEY,
    ma_hoa_don INT,
    ma_san_pham INT,
    ten_san_pham VARCHAR(255),
    so_luong INT,
    don_gia BIGINT,
    kich_co VARCHAR(100),
    mau_sac VARCHAR(100),
    anh_san_pham VARCHAR(500),
    FOREIGN KEY (ma_hoa_don) REFERENCES hoa_don_nhap(ma_hoa_don) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
