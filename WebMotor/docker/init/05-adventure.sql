-- ============================================
-- 10 XE ĐỊA HÌNH (Adventure)
-- Tên chứa "địa hình" để search hoạt động
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
('Ducati DesertX địa hình', 619000000, '950', 'Trắng đỏ', '/Images/ducati2.jpg', '/Images/ducati2.jpg', 2, 5,
 'Adventure bike địa hình chuyên nghiệp với khả năng off-road đỉnh cao, thiết kế lấy cảm hứng từ Cagiva Elefant.',
 'L-Twin Testastretta', '937cc', '94.0 x 67.5 mm', '13.3:1',
 '110 HP', '92 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.6 lít/100km', 'Euro 5', 'EFI điện tử'),

('BMW R1250 GS Adventure địa hình', 920000000, '1250', 'Xanh dương trắng', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 1, 6,
 'GS Adventure huyền thoại với khả năng vượt mọi địa hình, biểu tượng của xe phượt thế giới.',
 '2 xy-lanh boxer ShiftCam', '1254cc', '102.5 x 76.0 mm', '12.5:1',
 '136 HP', '143 Nm', 'Đa đĩa khô chống trượt', 'BMS-O', 'Khởi động điện', '6 cấp',
 'Trục các-đăng', '5.5 lít/100km', 'Euro 5', 'BMS-O'),

('KTM 1290 Super Adventure địa hình', 685000000, '1300', 'Cam đen', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 6, 5,
 'Adventure bike địa hình mạnh mẽ với động cơ V-Twin LC8 và hệ thống điện tử tinh vi.',
 'V-Twin LC8 75 độ', '1301cc', '108.0 x 71.0 mm', '13.1:1',
 '160 HP', '138 Nm', 'PASC chống trượt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.8 lít/100km', 'Euro 5', 'EFI Keihin'),

('Honda Africa Twin địa hình', 525000000, '1100', 'Đỏ trắng', '/Images/Motor5.jpg', '/Images/Motor6.jpg', 3, 8,
 'Adventure huyền thoại Africa Twin với khả năng off-road thực thụ, hộp số DCT tùy chọn.',
 '2 xy-lanh thẳng hàng', '1084cc', '92.0 x 81.5 mm', '10.1:1',
 '101 HP', '105 Nm', 'Đa đĩa ướt slipper', 'PGM-FI', 'Khởi động điện', '6 cấp',
 'Xích', '4.9 lít/100km', 'Euro 5', 'PGM-FI'),

('Triumph Tiger 1200 Rally địa hình', 780000000, '1200', 'Xanh navy', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 8, 4,
 'Adventure 3 xy-lanh đẳng cấp với khả năng địa hình vượt trội và công nghệ T-Plane.',
 '3 xy-lanh thẳng hàng T-Plane', '1160cc', '90.0 x 60.7 mm', '13.2:1',
 '150 HP', '130 Nm', 'Đa đĩa ướt slipper', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.4 lít/100km', 'Euro 5', 'EFI điện tử'),

('Yamaha Tenere 700 địa hình', 365000000, '700', 'Xanh trắng', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 5, 9,
 'Adventure 700cc địa hình thuần chất với khung thép tubular, lý tưởng cho off-road.',
 '2 xy-lanh CP2', '689cc', '80.0 x 68.6 mm', '11.5:1',
 '73 HP', '68 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '4.3 lít/100km', 'Euro 5', 'YCC-T'),

('Kawasaki Versys-X 300 địa hình', 165000000, '300', 'Xanh đen', '/Images/kawasaki2.jpg', '/Images/kawasaki2-2.jpg', 4, 12,
 'Adventure entry-level địa hình nhẹ nhàng, dễ điều khiển cho biker mới khám phá off-road.',
 '2 xy-lanh thẳng hàng', '296cc', '62.0 x 49.0 mm', '10.6:1',
 '40 HP', '26 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '3.5 lít/100km', 'Euro 5', 'DFI điện tử'),

('Suzuki V-Strom 1050 địa hình', 425000000, '1050', 'Vàng đen', '/Images/Motor5.jpg', '/Images/Motor6.jpg', 8, 6,
 'Adventure V-Twin Suzuki với khả năng địa hình tốt, kính chắn gió điều chỉnh được.',
 'V-Twin 90 độ', '1037cc', '100.0 x 66.0 mm', '11.5:1',
 '107 HP', '100 Nm', 'Đa đĩa ướt SCAS', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.7 lít/100km', 'Euro 5', 'EFI điện tử'),

('KTM 890 Adventure R địa hình', 425000000, '890', 'Cam trắng', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 6, 7,
 'Mid-size Adventure địa hình thuần chất với hệ thống treo WP, hành trình dài cho off-road.',
 '2 xy-lanh LC8c', '889cc', '90.7 x 68.8 mm', '13.5:1',
 '105 HP', '100 Nm', 'PASC chống trượt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '4.8 lít/100km', 'Euro 5', 'EFI Keihin'),

('BMW F850 GS địa hình', 475000000, '850', 'Đỏ trắng đen', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 1, 8,
 'Adventure mid-size BMW với động cơ 2 xy-lanh thẳng hàng, cân bằng giữa đường nhựa và địa hình.',
 '2 xy-lanh thẳng hàng', '853cc', '84.0 x 77.0 mm', '12.7:1',
 '95 HP', '92 Nm', 'Đa đĩa ướt', 'BMS-X', 'Khởi động điện', '6 cấp',
 'Xích', '4.5 lít/100km', 'Euro 5', 'BMS-X');

SELECT 'Adventure bikes inserted' AS status, COUNT(*) AS total FROM san_pham WHERE ten_san_pham LIKE '%địa hình%';
