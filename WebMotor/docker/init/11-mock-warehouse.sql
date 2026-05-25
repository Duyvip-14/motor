-- ============================================
-- Mock data cho Kho hàng (kho_hang)
-- Tracking các lô hàng đã sản xuất theo màu/size/ngày
-- ============================================

USE motor;
SET NAMES utf8mb4;

INSERT INTO kho_hang (ma_san_pham, ten_san_pham, ngay_san_xuat, so_luong, mau_sac, kich_co, anh_sanpham) VALUES
-- Sport bikes
(1, 'Kawasaki Ninja H2R Sport', '2025-12-10', 5, 'Đen mờ', '1000', '/Images/kawasaki1.jpg'),
(2, 'Yamaha YZF-R1 Sport', '2025-12-15', 8, 'Xanh Yamaha', '1000', '/Images/Motor5.jpg'),
(3, 'Honda CBR1000RR-R Fireblade Sport', '2026-01-05', 6, 'Trắng đỏ HRC', '1000', '/Images/Motor3.jpg'),
(4, 'BMW S1000RR Sport', '2026-01-12', 7, 'Trắng xanh M', '1000', '/Images/Motor1.jpg'),
(5, 'Ducati Panigale V4 S Sport', '2026-01-20', 4, 'Đỏ Ducati', '1100', '/Images/ducati1.jpg'),
(6, 'Kawasaki Ninja ZX-10R Sport', '2026-02-08', 9, 'Xanh Kawasaki', '1000', '/Images/kawasaki2.jpg'),
(9, 'Honda CBR600RR Sport', '2026-02-18', 12, 'Đỏ trắng', '600', '/Images/Motor5.jpg'),
(10, 'Yamaha R6 Sport', '2026-02-25', 10, 'Xanh đen', '600', '/Images/Motor1.jpg'),

-- Touring
(11, 'Kawasaki Versys 1000 Touring', '2026-03-02', 7, 'Xanh Kawasaki', '1000', '/Images/kawasaki3.jpg'),
(12, 'BMW K1600 GTL Touring', '2026-03-08', 3, 'Xanh đen', '1600', '/Images/Motor1.jpg'),
(13, 'Honda Gold Wing Touring', '2026-03-15', 4, 'Đỏ rượu vang', '1800', '/Images/Motor3.jpg'),
(16, 'Ducati Multistrada V4 Touring', '2026-03-22', 5, 'Đỏ Ducati', '1200', '/Images/ducati2.jpg'),

-- Adventure / Địa hình
(22, 'Ducati DesertX địa hình', '2026-04-03', 5, 'Trắng đỏ', '950', '/Images/ducati2.jpg'),
(23, 'BMW R1250 GS Adventure địa hình', '2026-04-10', 6, 'Xanh dương trắng', '1250', '/Images/Motor1.jpg'),
(24, 'KTM 1290 Super Adventure địa hình', '2026-04-15', 5, 'Cam đen', '1300', '/Images/Motor3.jpg'),
(25, 'Honda Africa Twin địa hình', '2026-04-22', 8, 'Đỏ trắng', '1100', '/Images/Motor5.jpg'),
(30, 'KTM 890 Adventure R địa hình', '2026-04-28', 7, 'Cam trắng', '890', '/Images/Motor3.jpg'),

-- Classic
(32, 'Triumph Bonneville T120 Classic', '2026-05-02', 6, 'Xanh Triumph', '1200', '/Images/Motor1.jpg'),
(33, 'Royal Enfield Classic 350', '2026-05-05', 15, 'Xanh quân đội', '350', '/Images/Motor3.jpg'),
(34, 'Kawasaki W800 Classic', '2026-05-08', 7, 'Đen ánh kim', '800', '/Images/kawasaki2.jpg'),

-- Phụ kiện
(42, 'Phụ kiện Gương xe máy cao cấp', '2026-05-10', 100, 'Đen', 'M', '/Images/guong.jpg'),
(43, 'Phụ kiện Pô độ thể thao Akrapovic', '2026-05-12', 30, 'Đen carbon', 'L', '/Images/poxe.jpg'),
(46, 'Phụ kiện Áo giáp bảo hộ Komine', '2026-05-15', 50, 'Đen đỏ', 'L', '/Images/dobaoho.jpg'),
(47, 'Phụ kiện Mũ bảo hiểm AGK Fullface', '2026-05-18', 60, 'Trắng đỏ', 'M', '/Images/dobaoho.jpg'),
(48, 'Phụ kiện Găng tay biker Alpinestars', '2026-05-20', 80, 'Đen', 'L', '/Images/dobaoho.jpg');

SELECT 'Kho hàng' AS type, COUNT(*) AS total FROM kho_hang;
