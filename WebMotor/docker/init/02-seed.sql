-- ============================================
-- WebMotor Seed Data + Stored Procedures
-- ============================================

USE motor;

-- Stored procedure for paginated products (called from sanpham.js)
DROP PROCEDURE IF EXISTS GetProductsByPage;

DELIMITER $$
CREATE PROCEDURE GetProductsByPage(IN p_page INT, IN p_pageSize INT)
BEGIN
    DECLARE p_offset INT;
    DECLARE p_total INT;

    IF p_page IS NULL OR p_page < 1 THEN SET p_page = 1; END IF;
    IF p_pageSize IS NULL OR p_pageSize < 1 THEN SET p_pageSize = 10; END IF;

    SET p_offset = (p_page - 1) * p_pageSize;
    SELECT COUNT(*) INTO p_total FROM san_pham;

    SELECT sp.*, p_total AS totalproduct
    FROM san_pham sp
    ORDER BY sp.ma_san_pham DESC
    LIMIT p_pageSize OFFSET p_offset;
END$$
DELIMITER ;

-- ============================================
-- Seed data
-- ============================================
INSERT INTO danh_muc_san_pham (ma_danh_muc, ten_danh_muc) VALUES
(1, 'BMW'),
(2, 'DUCATI'),
(3, 'HONDA'),
(4, 'KAWASAKI'),
(5, 'YAMAHA'),
(6, 'KTM'),
(7, 'Phụ kiện'),
(8, 'MOTOR R1');

INSERT INTO san_pham
(ten_san_pham, gia, size, mau_sac, anh_sanpham, anhhover1, ma_danh_muc, soluong, mo_ta,
 dong_co, dung_tich, duong_kinh_hanh_trinh_piston, ti_so_nen,
 cong_suat_cuc_dai, mo_men_xoan_cuc_dai, bo_ly_hop,
 he_thong_danh_lua, he_thong_khoi_dong, hop_so,
 he_thong_truyen_dong, tieu_thu_nhien_lieu, khi_thai, he_thong_phun_xang)
VALUES
('Kawasaki Ninja H2R', 1280000000, '1000', 'Đen', '/Images/kawasaki1.jpg', '/Images/kawasaki1-1.jpg', 4, 5,
 'Siêu mô tô đường đua hiệu năng cực cao',
 '4 xy-lanh thẳng hàng', '998cc', '76.0 x 55.0 mm', '8.5:1',
 '310 HP', '165 Nm', 'Đa đĩa ướt',
 'Kỹ thuật số TCBI', 'Khởi động điện', '6 cấp',
 'Xích', '6.5 lít/100km', 'Euro 5', 'DFI'),

('Kawasaki Ninja 400', 142900000, '400', 'Xanh lục', '/Images/kawasaki2.jpg', '/Images/kawasaki2-2.jpg', 4, 10,
 'Sportbike phổ thông cho biker mới',
 '2 xy-lanh thẳng hàng', '399cc', '70.0 x 51.8 mm', '11.5:1',
 '49 HP', '38 Nm', 'Đa đĩa ướt',
 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '4.0 lít/100km', 'Euro 5', 'DFI'),

('Kawasaki Versys 1000', 389000000, '1000', 'Xanh', '/Images/kawasaki3.jpg', '/Images/kawasaki3-3.jpg', 4, 7,
 'Touring đa dụng đường trường',
 '4 xy-lanh thẳng hàng', '1043cc', '77.0 x 56.0 mm', '10.3:1',
 '120 HP', '102 Nm', 'Đa đĩa ướt',
 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.5 lít/100km', 'Euro 5', 'DFI'),

('Ducati Streetfighter V2', 524000000, '950', 'Đỏ', '/Images/ducati1.jpg', '/Images/ducati1.jpg', 2, 4,
 'Naked bike cao cấp từ Ducati',
 'L-Twin', '955cc', '100.0 x 60.8 mm', '12.5:1',
 '153 HP', '101 Nm', 'Đa đĩa ướt',
 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '6.0 lít/100km', 'Euro 5', 'DFI'),

('Ducati DesertX', 619000000, '950', 'Trắng', '/Images/ducati2.jpg', '/Images/ducati2.jpg', 2, 3,
 'Adventure bike địa hình',
 'L-Twin Testastretta', '937cc', '94.0 x 67.5 mm', '13.3:1',
 '110 HP', '92 Nm', 'Đa đĩa ướt',
 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.6 lít/100km', 'Euro 5', 'DFI'),

('BMW S1000RR', 989000000, '1000', 'Trắng-Xanh', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 1, 6,
 'Siêu mô tô flagship của BMW',
 '4 xy-lanh thẳng hàng', '999cc', '80.0 x 49.7 mm', '13.3:1',
 '210 HP', '113 Nm', 'Đa đĩa ướt chống trượt',
 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '6.4 lít/100km', 'Euro 5', 'BMS-O'),

('Honda CBR 650R', 246000000, '650', 'Đỏ', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 3, 8,
 'Sportbike 4 xy-lanh dáng siêu',
 '4 xy-lanh thẳng hàng', '649cc', '67.0 x 46.0 mm', '11.6:1',
 '94 HP', '63 Nm', 'Đa đĩa ướt',
 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '4.9 lít/100km', 'Euro 5', 'PGM-FI'),

('Yamaha YZF R1', 689000000, '1000', 'Xanh', '/Images/Motor5.jpg', '/Images/Motor6.jpg', 8, 5,
 'Siêu mô tô đỉnh cao của Yamaha',
 'CP4 4 xy-lanh', '998cc', '79.0 x 50.9 mm', '13.0:1',
 '200 HP', '112.4 Nm', 'Đa đĩa ướt',
 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '6.1 lít/100km', 'Euro 5', 'YCC-T');

-- Sample employee
INSERT INTO nhan_vien (ten_nhan_vien, gioi_tinh, dia_chi, ngay_sinh, sdt, cmnd, anh_nhanvien) VALUES
('Nguyễn Văn A', 'Nam', 'Hà Nội', '1995-05-10', '0901234567', '012345678901', '/images/nv1.jpg'),
('Trần Thị B', 'Nữ', 'TP HCM', '1996-08-15', '0901234568', '012345678902', '/images/nv2.jpg');

-- Sample customer
INSERT INTO khach_hang (ten_khach_hang, email, so_dien_thoai, dia_chi) VALUES
('Khách Demo', 'demo@example.com', '0900000000', 'Demo Address');

-- Sample account (password: 123456 - bcrypt hash)
INSERT INTO tai_khoan (ten_nguoi_dung, mat_khau, email, sdt) VALUES
('Demo User', '$2b$10$8bMHQ6FhSXjZbXCpY0H.ueGxVqGfHd0Jt7YjJN.sNpvVQNc8w8YyW', 'demo@gmail.com', '0900000000');
