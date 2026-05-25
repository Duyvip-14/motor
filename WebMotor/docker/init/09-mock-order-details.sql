-- ============================================
-- Mock data: chi tiết đơn hàng cho 25 đơn ở file 08
-- Tạo data cho top 5 sản phẩm bán chạy + view chi tiết đơn
-- Note: AUTO_INCREMENT của don_hang bắt đầu từ 1 nếu DB sạch
-- ============================================

USE motor;
SET NAMES utf8mb4;

-- Lấy ma_don_hang theo thứ tự auto_increment (đơn đầu tiên = MIN)
SET @offset = (SELECT IFNULL(MIN(ma_don_hang) - 1, 0) FROM don_hang);

-- ============ Tháng 1 ============
-- Đơn 1: Kawasaki Ninja H2R Sport (1.28 tỉ)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 1, 1, 'Kawasaki Ninja H2R Sport', 1, 1280000000, '1000', 'Đen mờ', '/Images/kawasaki1.jpg');

-- Đơn 2: Yamaha YZF-R1 Sport (689tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 2, 2, 'Yamaha YZF-R1 Sport', 1, 689000000, '1000', 'Xanh Yamaha', '/Images/Motor5.jpg');

-- Đơn 3: Phụ kiện Pô Akrapovic (8.9tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 3, 43, 'Phụ kiện Pô độ thể thao Akrapovic', 1, 8900000, 'L', 'Đen carbon', '/Images/poxe.jpg');

-- ============ Tháng 2 ============
-- Đơn 4: Honda CBR1000RR-R Fireblade (920tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 4, 3, 'Honda CBR1000RR-R Fireblade Sport', 1, 920000000, '1000', 'Trắng đỏ HRC', '/Images/Motor3.jpg');

-- Đơn 5: phụ kiện combo (245tr ~ 50 cái mũ + găng)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 5, 47, 'Phụ kiện Mũ bảo hiểm AGK Fullface', 30, 4500000, 'M', 'Trắng đỏ', '/Images/dobaoho.jpg'),
(@offset + 5, 48, 'Phụ kiện Găng tay biker Alpinestars', 50, 1850000, 'L', 'Đen', '/Images/dobaoho.jpg'),
(@offset + 5, 50, 'Phụ kiện Đèn LED tăng sáng pha', 14, 1200000, 'L', 'Trắng vàng', '/Images/guong.jpg');

-- Đơn 6: Phụ kiện Giày biker Sidi
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 6, 49, 'Phụ kiện Giày biker Sidi cao cổ', 1, 6200000, '42', 'Đen', '/Images/dobaoho.jpg');

-- ============ Tháng 3 ============
-- Đơn 7: Ducati Panigale V4 S (1.45 tỉ)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 7, 5, 'Ducati Panigale V4 S Sport', 1, 1450000000, '1100', 'Đỏ Ducati', '/Images/ducati1.jpg');

-- Đơn 8: Honda CBR600RR (380tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 8, 9, 'Honda CBR600RR Sport', 1, 380000000, '600', 'Đỏ trắng', '/Images/Motor5.jpg');

-- Đơn 9: Phụ kiện Áo giáp (2.85tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 9, 46, 'Phụ kiện Áo giáp bảo hộ Komine', 1, 2850000, 'L', 'Đen đỏ', '/Images/dobaoho.jpg');

-- Đơn 10: Ducati DesertX địa hình (619tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 10, 22, 'Ducati DesertX địa hình', 1, 619000000, '950', 'Trắng đỏ', '/Images/ducati2.jpg');

-- ============ Tháng 4 ============
-- Đơn 11: BMW S1000RR Sport (989tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 11, 4, 'BMW S1000RR Sport', 1, 989000000, '1000', 'Trắng xanh M', '/Images/Motor1.jpg');

-- Đơn 12: Phụ kiện Mũ AGK
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 12, 47, 'Phụ kiện Mũ bảo hiểm AGK Fullface', 1, 4500000, 'M', 'Trắng đỏ', '/Images/dobaoho.jpg');

-- Đơn 13: Yamaha R6 Sport (295tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 13, 10, 'Yamaha R6 Sport', 1, 295000000, '600', 'Xanh đen', '/Images/Motor1.jpg');

-- Đơn 14: Honda CBR1000RR-R (920tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 14, 3, 'Honda CBR1000RR-R Fireblade Sport', 1, 920000000, '1000', 'Trắng đỏ HRC', '/Images/Motor3.jpg');

-- Đơn 15: Royal Enfield Classic (130tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 15, 33, 'Royal Enfield Classic 350', 1, 130000000, '350', 'Xanh quân đội', '/Images/Motor3.jpg');

-- ============ Tháng 5 (hiện tại) ============
-- Đơn 16: Kawasaki ZX-10R (645tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 16, 6, 'Kawasaki Ninja ZX-10R Sport', 1, 645000000, '1000', 'Xanh Kawasaki', '/Images/kawasaki2.jpg');

-- Đơn 17: Suzuki GSX-R1000R (530tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 17, 7, 'Suzuki GSX-R1000R Sport', 1, 530000000, '1000', 'Xanh trắng', '/Images/kawasaki3.jpg');

-- Đơn 18: Phụ kiện Găng Alpinestars (1.85tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 18, 48, 'Phụ kiện Găng tay biker Alpinestars', 1, 1850000, 'L', 'Đen', '/Images/dobaoho.jpg');

-- Đơn 19: KTM 890 Adventure R địa hình (425tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 19, 30, 'KTM 890 Adventure R địa hình', 1, 425000000, '890', 'Cam trắng', '/Images/Motor3.jpg');

-- Đơn 20: KTM 1290 Super Adventure (685tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 20, 24, 'KTM 1290 Super Adventure địa hình', 1, 685000000, '1300', 'Cam đen', '/Images/Motor3.jpg');

-- Đơn 21: Combo phụ kiện (12tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 21, 50, 'Phụ kiện Đèn LED tăng sáng pha', 5, 1200000, 'L', 'Trắng vàng', '/Images/guong.jpg'),
(@offset + 21, 44, 'Phụ kiện Tay côn CNC chính hãng', 1, 2600000, '17', 'Đen đỏ', '/Images/taycon.jpg'),
(@offset + 21, 45, 'Phụ kiện Tay phanh RCB', 1, 3700000, '17', 'Đỏ', '/Images/tayphanh.jpg');

-- Đơn 22: Aprilia RSV4 Factory (980tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 22, 8, 'Aprilia RSV4 Factory Sport', 1, 980000000, '1100', 'Đen vàng', '/Images/Motor3.jpg');

-- Đơn 23: Ducati Scrambler 1100 Classic (365tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 23, 37, 'Ducati Scrambler 1100 Classic', 1, 365000000, '1100', 'Vàng đen', '/Images/ducati1.jpg');

-- Đơn 24: KTM 890 Adventure R địa hình (425tr - x2)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 24, 30, 'KTM 890 Adventure R địa hình', 1, 425000000, '890', 'Cam trắng', '/Images/Motor3.jpg');

-- Đơn 25: Yamaha R6 Sport (295tr)
INSERT INTO chi_tiet_don_hang (ma_don_hang, ma_san_pham, ten_san_pham, so_luong, gia, kich_co, mau_sac, anh_sanpham) VALUES
(@offset + 25, 10, 'Yamaha R6 Sport', 1, 295000000, '600', 'Xanh đen', '/Images/Motor1.jpg');

-- ============ Báo cáo ============
SELECT 'Inserted chi_tiet_don_hang' AS step, COUNT(*) AS total FROM chi_tiet_don_hang;

SELECT
  sp.ma_san_pham,
  sp.ten_san_pham,
  SUM(ctdh.so_luong) AS so_luong_da_ban
FROM chi_tiet_don_hang ctdh
JOIN san_pham sp ON ctdh.ma_san_pham = sp.ma_san_pham
GROUP BY sp.ma_san_pham, sp.ten_san_pham
ORDER BY so_luong_da_ban DESC
LIMIT 5;
