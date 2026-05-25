-- ============================================
-- 10 XE TOURING (Touring)
-- Tên chứa "touring" để search hoạt động
-- ============================================

USE motor;
SET NAMES utf8mb4;

INSERT INTO san_pham
(ten_san_pham, gia, size, mau_sac, anh_sanpham, anhhover1, ma_danh_muc, soluong, mo_ta,
 dong_co, dung_tich, duong_kinh_hanh_trinh_piston, ti_so_nen,
 cong_suat_cuc_dai, mo_men_xoan_cuc_dai, bo_ly_hop,
 he_thong_danh_lua, he_thong_khoi_dong, hop_so,
 he_thong_truyen_dong, tieu_thu_nhien_lieu, khi_thai, he_thong_phun_xang)
VALUES
('Kawasaki Versys 1000 Touring', 389000000, '1000', 'Xanh Kawasaki', '/Images/kawasaki3.jpg', '/Images/kawasaki3-3.jpg', 4, 7,
 'Touring đa dụng đường trường, thoải mái cho hành trình dài, trang bị đầy đủ tiện nghi.',
 '4 xy-lanh thẳng hàng', '1043cc', '77.0 x 56.0 mm', '10.3:1',
 '120 HP', '102 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.5 lít/100km', 'Euro 5', 'DFI điện tử'),

('BMW K1600 GTL Touring', 1850000000, '1600', 'Xanh đen', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 1, 3,
 'Grand Touring flagship của BMW với động cơ 6 xy-lanh thẳng hàng êm ái, full option.',
 '6 xy-lanh thẳng hàng', '1649cc', '72.0 x 67.5 mm', '12.2:1',
 '160 HP', '180 Nm', 'Đa đĩa ướt', 'Kỹ thuật số BMS-X', 'Khởi động điện', '6 cấp',
 'Trục các-đăng', '5.7 lít/100km', 'Euro 5', 'BMS-X'),

('Honda Gold Wing Touring', 1620000000, '1800', 'Đỏ rượu vang', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 3, 4,
 'Đỉnh cao Touring của Honda với động cơ 6 xy-lanh boxer, hộp số tự động DCT 7 cấp.',
 '6 xy-lanh boxer', '1833cc', '73.0 x 73.0 mm', '10.5:1',
 '125 HP', '170 Nm', 'DCT 7 cấp tự động', 'PGM-FI', 'Khởi động điện', '7 cấp DCT',
 'Trục các-đăng', '5.6 lít/100km', 'Euro 5', 'PGM-FI'),

('Yamaha FJR1300 Touring', 720000000, '1300', 'Xanh xám', '/Images/Motor5.jpg', '/Images/Motor6.jpg', 5, 6,
 'Sport-Touring kinh điển với động cơ 4 xy-lanh êm ái, kính chắn gió điều chỉnh điện.',
 '4 xy-lanh thẳng hàng', '1298cc', '79.0 x 66.2 mm', '10.8:1',
 '146 HP', '138 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Trục các-đăng', '6.5 lít/100km', 'Euro 5', 'YCC-T'),

('Kawasaki Concours 14 Touring', 580000000, '1400', 'Đen ánh kim', '/Images/kawasaki1.jpg', '/Images/kawasaki1-1.jpg', 4, 5,
 'Sport Touring 1400cc với KTRC, ABS, công suất mạnh mẽ phù hợp đường dài.',
 '4 xy-lanh thẳng hàng', '1352cc', '84.0 x 61.0 mm', '10.7:1',
 '155 HP', '136 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Trục các-đăng', '6.3 lít/100km', 'Euro 5', 'DFI'),

('Ducati Multistrada V4 Touring', 985000000, '1200', 'Đỏ Ducati', '/Images/ducati2.jpg', '/Images/ducati2.jpg', 2, 5,
 'Touring V4 đa năng với radar adaptive cruise control đầu tiên trên xe mô tô sản xuất.',
 'V4 Granturismo', '1158cc', '83.0 x 53.5 mm', '14.0:1',
 '170 HP', '125 Nm', 'Đa đĩa ướt slipper', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.7 lít/100km', 'Euro 5', 'EFI điện tử'),

('BMW R1250 RT Touring', 940000000, '1250', 'Xanh lam', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 1, 4,
 'Touring boxer biểu tượng của BMW với hệ thống ShiftCam, kính chắn gió điều chỉnh điện.',
 '2 xy-lanh boxer ShiftCam', '1254cc', '102.5 x 76.0 mm', '12.5:1',
 '136 HP', '143 Nm', 'Đa đĩa khô', 'BMS-O', 'Khởi động điện', '6 cấp',
 'Trục các-đăng', '5.5 lít/100km', 'Euro 5', 'BMS-O'),

('Triumph Trophy 1200 Touring', 720000000, '1200', 'Xanh navy', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 8, 4,
 'Touring 3 xy-lanh đặc trưng của Triumph với âm thanh và mô-men xoắn ấn tượng.',
 '3 xy-lanh thẳng hàng', '1215cc', '85.0 x 71.4 mm', '11.0:1',
 '134 HP', '120 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Trục các-đăng', '6.0 lít/100km', 'Euro 5', 'EFI điện tử'),

('Harley Davidson Road Glide Touring', 980000000, '1900', 'Đen tuyền', '/Images/Motor5.jpg', '/Images/Motor6.jpg', 8, 3,
 'Touring biểu tượng của Harley với động cơ Milwaukee-Eight, kính chắn gió cánh dơi.',
 'Milwaukee-Eight V-Twin', '1868cc', '100.0 x 119.0 mm', '10.0:1',
 '93 HP', '163 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Đai răng', '5.9 lít/100km', 'Euro 5', 'ESPFI'),

('Indian Roadmaster Touring', 1280000000, '1900', 'Đỏ ngà', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 8, 2,
 'Touring sang trọng đậm chất Mỹ với động cơ Thunderstroke 116, full tiện nghi cao cấp.',
 'Thunderstroke 116 V-Twin', '1890cc', '103.2 x 113.0 mm', '11.0:1',
 '124 HP', '171 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Đai răng', '6.2 lít/100km', 'Euro 5', 'EFI'),

('Honda NT1100 Touring', 485000000, '1100', 'Xanh xám', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 3, 8,
 'Sport Touring đa năng giá hợp lý với động cơ Africa Twin, hộp số DCT tùy chọn.',
 '2 xy-lanh thẳng hàng', '1084cc', '92.0 x 81.5 mm', '10.1:1',
 '101 HP', '104 Nm', 'Đa đĩa ướt slipper', 'PGM-FI', 'Khởi động điện', '6 cấp',
 'Xích', '4.6 lít/100km', 'Euro 5', 'PGM-FI');

SELECT 'Touring bikes inserted' AS status, COUNT(*) AS total FROM san_pham WHERE ten_san_pham LIKE '%Touring%';
