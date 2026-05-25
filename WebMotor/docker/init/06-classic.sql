-- ============================================
-- 10 XE CLASSIC
-- Tên chứa "classic" để search hoạt động
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
('Triumph Bonneville T120 Classic', 425000000, '1200', 'Xanh Triumph', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 8, 6,
 'Classic bike biểu tượng của Triumph với thiết kế retro 60s, động cơ song song hiện đại.',
 '2 xy-lanh song song', '1200cc', '97.6 x 80.0 mm', '10.0:1',
 '79 HP', '105 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '4.7 lít/100km', 'Euro 5', 'EFI điện tử'),

('Royal Enfield Classic 350', 130000000, '350', 'Xanh quân đội', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 8, 15,
 'Classic bike Ấn Độ với phong cách retro thuần chất, âm thanh xe độc đáo.',
 '1 xy-lanh', '349cc', '72.0 x 85.8 mm', '8.5:1',
 '20 HP', '27 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '5 cấp',
 'Xích', '3.0 lít/100km', 'Euro 5', 'EFI'),

('Kawasaki W800 Classic', 285000000, '800', 'Đen ánh kim', '/Images/kawasaki2.jpg', '/Images/kawasaki2-2.jpg', 4, 7,
 'Classic Café Racer style của Kawasaki với động cơ song song trục cam đôi cảm hứng từ W1 1965.',
 '2 xy-lanh song song', '773cc', '77.0 x 83.0 mm', '8.4:1',
 '52 HP', '63 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '5 cấp',
 'Xích', '4.5 lít/100km', 'Euro 5', 'DFI điện tử'),

('Honda CB1100 RS Classic', 380000000, '1100', 'Xám bạc', '/Images/Motor5.jpg', '/Images/Motor6.jpg', 3, 5,
 'Classic 4 xy-lanh thẳng hàng cảm hứng từ CB750 Four huyền thoại, máy làm mát bằng gió.',
 '4 xy-lanh thẳng hàng', '1140cc', '73.5 x 67.2 mm', '9.5:1',
 '90 HP', '93 Nm', 'Đa đĩa ướt', 'PGM-FI', 'Khởi động điện', '6 cấp',
 'Xích', '5.4 lít/100km', 'Euro 5', 'PGM-FI'),

('Yamaha XSR900 Classic', 350000000, '900', 'Vàng bạc', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 5, 8,
 'Sport Heritage Classic Yamaha với động cơ CP3 3 xy-lanh, thiết kế tối giản đậm chất retro.',
 '3 xy-lanh CP3', '890cc', '78.0 x 62.1 mm', '11.5:1',
 '119 HP', '93 Nm', 'Đa đĩa ướt slipper', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.0 lít/100km', 'Euro 5', 'YCC-T'),

('Ducati Scrambler 1100 Classic', 365000000, '1100', 'Vàng đen', '/Images/ducati1.jpg', '/Images/ducati1.jpg', 2, 6,
 'Scrambler Classic L-Twin Ducati với phong cách bụi bặm hoài cổ, dễ thương phù hợp đường phố.',
 'L-Twin Desmodromic', '1079cc', '98.0 x 71.5 mm', '11.0:1',
 '86 HP', '88 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '5.5 lít/100km', 'Euro 5', 'EFI điện tử'),

('BMW R nineT Pure Classic', 480000000, '1170', 'Đen mờ', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 1, 5,
 'Heritage Classic của BMW với động cơ boxer khí lực mạnh mẽ, thiết kế tối giản tinh tế.',
 '2 xy-lanh boxer khí', '1170cc', '101.0 x 73.0 mm', '12.0:1',
 '109 HP', '116 Nm', 'Đa đĩa khô', 'BMS-O', 'Khởi động điện', '6 cấp',
 'Trục các-đăng', '5.5 lít/100km', 'Euro 5', 'BMS-O'),

('Triumph Speed Twin 1200 Classic', 420000000, '1200', 'Đỏ ngà', '/Images/Motor5.jpg', '/Images/Motor6.jpg', 8, 5,
 'Modern Classic Speed Twin với hiệu năng đường phố ấn tượng, thiết kế retro sang trọng.',
 '2 xy-lanh song song', '1200cc', '97.6 x 80.0 mm', '12.1:1',
 '99 HP', '112 Nm', 'Đa đĩa ướt', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Xích', '4.9 lít/100km', 'Euro 5', 'EFI điện tử'),

('Honda CB1000R Black Edition Classic', 430000000, '1000', 'Đen tuyền', '/Images/Motor1.jpg', '/Images/Motor2.jpg', 3, 6,
 'Neo Sports Café Classic với động cơ Fireblade tinh chỉnh, thiết kế tối giản hiện đại.',
 '4 xy-lanh thẳng hàng', '998cc', '75.0 x 56.5 mm', '11.6:1',
 '143 HP', '104 Nm', 'Đa đĩa ướt slipper', 'PGM-FI', 'Khởi động điện', '6 cấp',
 'Xích', '5.5 lít/100km', 'Euro 5', 'PGM-FI'),

('Moto Guzzi V7 Classic', 295000000, '850', 'Đỏ ngà', '/Images/Motor3.jpg', '/Images/Motor4.jpg', 8, 4,
 'Classic Ý truyền thống với động cơ V-Twin ngang đặc trưng, di sản hơn 50 năm của Moto Guzzi.',
 'V-Twin 90 độ ngang', '853cc', '84.0 x 77.0 mm', '10.5:1',
 '65 HP', '73 Nm', 'Đĩa khô đơn', 'Kỹ thuật số', 'Khởi động điện', '6 cấp',
 'Trục các-đăng', '5.0 lít/100km', 'Euro 5', 'EFI điện tử');

SELECT 'Classic bikes inserted' AS status, COUNT(*) AS total FROM san_pham WHERE ten_san_pham LIKE '%Classic%';
