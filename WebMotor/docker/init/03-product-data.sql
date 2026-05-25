-- ============================================
-- WebMotor Extended Product Data
-- 40 xe (10 Sport + 10 Touring + 10 Adventure + 10 Classic) + 10 Phụ kiện
-- Tên xe chứa keyword tiếng Việt để search hoạt động đúng
-- ============================================

USE motor;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Xóa data sản phẩm cũ (nếu cần reset)
DELETE FROM chi_tiet_don_hang;
DELETE FROM chi_tiet_hoa_don_nhap;
DELETE FROM kho_hang WHERE ma_san_pham IS NOT NULL;
DELETE FROM san_pham;
ALTER TABLE san_pham AUTO_INCREMENT = 1;

-- Cập nhật danh mục
DELETE FROM danh_muc_san_pham;
INSERT INTO danh_muc_san_pham (ma_danh_muc, ten_danh_muc) VALUES
(1, 'BMW'),
(2, 'DUCATI'),
(3, 'HONDA'),
(4, 'KAWASAKI'),
(5, 'YAMAHA'),
(6, 'KTM'),
(7, 'Phụ kiện'),
(8, 'MOTOR R1');

-- ============================================
-- 10 XE THỂ THAO (Sport)
-- Tên chứa "Sport" để search keyword=sport
-- ============================================
INSERT INTO san_pham
(ten_san_pham, gia, size, mau_sac, anh_sanpham, anhhover1, ma_danh_muc, soluong, mo_ta,
 dong_co, dung_tich, duong_kinh_hanh_trinh_piston, ti_so_nen,
 cong_suat_cuc_dai, mo_men_xoan_cuc_dai, bo_ly_hop,
 he_thong_danh_lua, he_thong_khoi_dong, hop_so,
 he_thong_truyen_dong, tieu_thu_nhien_lieu, khi_thai, he_thong_phun_xang)
VALUES
('Kawasaki Ninja H2R Sport', 1280000000, '1000', 'Đen mờ', '/Images/kawasaki1.jpg', '/Images/kawasaki1-1.jpg', 4, 5,
 'Siêu mô tô đường đua Sport hiệu năng cực cao, được trang bị siêu nạp tăng áp đầu tiên trên xe sản xuất hàng loạt.',
 '4 xy-lanh thẳng hàng siêu nạp', '998cc', '76.0 x 55.0 mm', '8.5:1',
 '310 HP', '165 Nm', 'Đa đĩa ướt chống trượt', 'Kỹ thuật số TCBI', 'Khởi động điện', '6 cấp',
 'Xích', '6.5 lít/100km', 'Euro 5', 'DFI điện tử'),

('Yamaha YZF-R1 Sport', 689000000, '1000', 'Xanh Yamaha', '/Images/Motor5.jpg', '/Images/Motor6.jpg', 5, 8,
 'Siêu mô tô Sport đỉnh cao của Yamaha với động cơ CP4 crossplane, công nghệ chuyển từ MotoGP.',
 'CP4 4 xy-lanh crossplane', '998cc', '79.0 x 50.9 mm', '13.0:1',
 '200 HP', '112.4 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '6.1 lít/100km', 'Euro 5', 'YCC-T điện tử'),

('Honda CBR1000RR-R Fireblade Sport', 920000000, '1000', 'Trắng đỏ HRC', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 3, 6,
 'Sport bike flagship của Honda, được phát triển bởi đội đua HRC dành cho đường đua chuyên nghiệp.',
 '4 xy-lanh thẳng hàng', '999cc', '81.0 x 48.5 mm', '13.0:1',
 '215 HP', '113 Nm', 'Đa đĩa ướt slipper', 'PGM-DSFI', 'Khởi động điện', '6 cấp',
 'Xích', '6.4 lít/100km', 'Euro 5', 'PGM-FI'),

('BMW S1000RR Sport', 989000000, '1000', 'Trắng xanh M', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 1, 7,
 'Sport bike flagship của BMW Motorrad với hệ thống ShiftCam, công nghệ điện tử hàng đầu.',
 '4 xy-lanh thẳng hàng ShiftCam', '999cc', '80.0 x 49.7 mm', '13.3:1',
 '210 HP', '113 Nm', 'Đa đĩa ướt chống trượt', 'BMS-O kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '6.4 lít/100km', 'Euro 5', 'BMS-O'),

('Ducati Panigale V4 S Sport', 1450000000, '1100', 'Đỏ Ducati', '/Images/ducati1.jpg', '/Images/ducati1.jpg', 2, 4,
 'Đỉnh cao Sport bike của Ducati với động cơ Desmosedici Stradale 4 xy-lanh chữ V.',
 'Desmosedici Stradale V4', '1103cc', '81.0 x 53.5 mm', '14.0:1',
 '214 HP', '124 Nm', 'Đa đĩa ướt slipper', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '6.8 lít/100km', 'Euro 5', 'EFI điện tử'),

('Kawasaki Ninja ZX-10R Sport', 645000000, '1000', 'Xanh Kawasaki', '/Images/kawasaki2.jpg', '/Images/kawasaki2-2.jpg', 4, 9,
 'Sport bike đường đua từ Kawasaki, từng vô địch Superbike thế giới nhiều lần.',
 '4 xy-lanh thẳng hàng', '998cc', '76.0 x 55.0 mm', '13.0:1',
 '203 HP', '114.9 Nm', 'Đa đĩa ướt slipper', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '6.0 lít/100km', 'Euro 5', 'DFI điện tử'),

('Suzuki GSX-R1000R Sport', 530000000, '1000', 'Xanh trắng', '/Images/kawasaki3.jpg', '/Images/kawasaki3-3.jpg', 4, 7,
 'Sport bike huyền thoại GSX-R với công nghệ Variable Valve Timing từ MotoGP.',
 '4 xy-lanh thẳng hàng', '999cc', '76.0 x 55.1 mm', '13.2:1',
 '202 HP', '117 Nm', 'Đa đĩa ướt SCAS', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '6.3 lít/100km', 'Euro 5', 'EFI điện tử'),

('Aprilia RSV4 Factory Sport', 980000000, '1100', 'Đen vàng', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 8, 5,
 'Sport bike Ý đẳng cấp thế giới với động cơ V4 65 độ độc đáo và bộ khung nhôm tinh xảo.',
 'V4 65 độ', '1099cc', '81.0 x 53.3 mm', '13.6:1',
 '217 HP', '125 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '6.5 lít/100km', 'Euro 5', 'Ride-by-Wire'),

('Honda CBR600RR Sport', 380000000, '600', 'Đỏ trắng', '/Images/Motor5.jpg', '/Images/Motor6.jpg', 3, 12,
 'Middleweight Sport bike kinh điển, hộp số 6 cấp êm ái phù hợp cho biker đường phố lẫn track day.',
 '4 xy-lanh thẳng hàng', '599cc', '67.0 x 42.5 mm', '12.2:1',
 '118 HP', '64 Nm', 'Đa đĩa ướt', 'PGM-DSFI', 'Khởi động điện', '6 cấp',
 'Xích', '5.4 lít/100km', 'Euro 5', 'PGM-FI'),

('Yamaha R6 Sport', 295000000, '600', 'Xanh đen', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 5, 10,
 'Sport bike 600cc nổi tiếng với độ chính xác và khả năng vào cua tuyệt vời cho đường đua.',
 '4 xy-lanh thẳng hàng', '599cc', '67.0 x 42.5 mm', '13.1:1',
 '117 HP', '61.7 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.5 lít/100km', 'Euro 5', 'YCC-T');

SELECT 'Sport bikes inserted' AS status, COUNT(*) AS total FROM san_pham WHERE ten_san_pham LIKE '%Sport%';
