-- ============================================
-- Mock data cho hóa đơn nhập (10 hóa đơn từ 5 NCC)
-- Mỗi hóa đơn 2-3 sản phẩm
-- ============================================

USE motor;
SET NAMES utf8mb4;

-- Lưu offset auto increment trước khi insert
SET @start = (SELECT IFNULL(MAX(ma_hoa_don), 0) FROM hoa_don_nhap);

-- ============ Hóa đơn 1: Kawasaki ============
INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
VALUES ('2026-01-10', 1969000000, 'Kawasaki Việt Nam', '02838221234', 1, 'kawasaki.vn@gmail.com', '12 Nguyễn Văn Linh, Q.7, TP HCM');

INSERT INTO chi_tiet_hoa_don_nhap (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham) VALUES
(@start + 1, 1, 'Kawasaki Ninja H2R Sport', 1, 1280000000, '1000', 'Đen mờ', '/Images/kawasaki1.jpg'),
(@start + 1, 6, 'Kawasaki Ninja ZX-10R Sport', 1, 645000000, '1000', 'Xanh Kawasaki', '/Images/kawasaki2.jpg'),
(@start + 1, 11, 'Kawasaki Versys 1000 Touring', 1, 389000000, '1000', 'Xanh Kawasaki', '/Images/kawasaki3.jpg');

-- ============ Hóa đơn 2: Yamaha ============
INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
VALUES ('2026-01-25', 1689000000, 'Yamaha Motor Việt Nam', '02437558888', 2, 'yamaha.vn@gmail.com', 'Số 32 Đại lộ Thăng Long, Hà Nội');

INSERT INTO chi_tiet_hoa_don_nhap (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham) VALUES
(@start + 2, 2, 'Yamaha YZF-R1 Sport', 2, 689000000, '1000', 'Xanh Yamaha', '/Images/Motor5.jpg'),
(@start + 2, 10, 'Yamaha R6 Sport', 1, 295000000, '600', 'Xanh đen', '/Images/Motor1.jpg');

-- ============ Hóa đơn 3: Honda ============
INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
VALUES ('2026-02-08', 1300000000, 'Honda Việt Nam', '02438765432', 1, 'honda.vn@gmail.com', '396 Lê Thanh Nghị, Hà Nội');

INSERT INTO chi_tiet_hoa_don_nhap (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham) VALUES
(@start + 3, 3, 'Honda CBR1000RR-R Fireblade Sport', 1, 920000000, '1000', 'Trắng đỏ HRC', '/Images/Motor3.jpg'),
(@start + 3, 9, 'Honda CBR600RR Sport', 1, 380000000, '600', 'Đỏ trắng', '/Images/Motor5.jpg');

-- ============ Hóa đơn 4: BMW ============
INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
VALUES ('2026-02-22', 1909000000, 'BMW Motorrad', '02873000099', 2, 'bmw.motorrad@gmail.com', '23 Lê Duẩn, Q.1, TP HCM');

INSERT INTO chi_tiet_hoa_don_nhap (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham) VALUES
(@start + 4, 4, 'BMW S1000RR Sport', 1, 989000000, '1000', 'Trắng xanh M', '/Images/Motor1.jpg'),
(@start + 4, 23, 'BMW R1250 GS Adventure địa hình', 1, 920000000, '1250', 'Xanh dương trắng', '/Images/Motor1.jpg');

-- ============ Hóa đơn 5: Ducati ============
INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
VALUES ('2026-03-12', 2069000000, 'Ducati Việt Nam', '02838800077', 1, 'ducati.vn@gmail.com', '88 Nguyễn Hữu Cảnh, Bình Thạnh, TP HCM');

INSERT INTO chi_tiet_hoa_don_nhap (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham) VALUES
(@start + 5, 5, 'Ducati Panigale V4 S Sport', 1, 1450000000, '1100', 'Đỏ Ducati', '/Images/ducati1.jpg'),
(@start + 5, 22, 'Ducati DesertX địa hình', 1, 619000000, '950', 'Trắng đỏ', '/Images/ducati2.jpg');

-- ============ Hóa đơn 6: Phụ kiện Akrapovic ============
INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
VALUES ('2026-03-28', 178000000, 'Akrapovic Vietnam', '02873446655', 2, 'akrapovic.vn@gmail.com', 'Lô 12 KCN Tân Bình, TP HCM');

INSERT INTO chi_tiet_hoa_don_nhap (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham) VALUES
(@start + 6, 43, 'Phụ kiện Pô độ thể thao Akrapovic', 20, 8900000, 'L', 'Đen carbon', '/Images/poxe.jpg');

-- ============ Hóa đơn 7: KTM ============
INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
VALUES ('2026-04-05', 1535000000, 'KTM Việt Nam', '02473007799', 1, 'ktm.vn@gmail.com', '156 Phạm Văn Đồng, Hà Nội');

INSERT INTO chi_tiet_hoa_don_nhap (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham) VALUES
(@start + 7, 24, 'KTM 1290 Super Adventure địa hình', 1, 685000000, '1300', 'Cam đen', '/Images/Motor3.jpg'),
(@start + 7, 30, 'KTM 890 Adventure R địa hình', 2, 425000000, '890', 'Cam trắng', '/Images/Motor3.jpg');

-- ============ Hóa đơn 8: Phụ kiện đồ bảo hộ ============
INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
VALUES ('2026-04-20', 357500000, 'Komine - Alpinestars Distributor', '02838111222', 2, 'protect.gear@gmail.com', '45 Hoàng Văn Thụ, Phú Nhuận, TP HCM');

INSERT INTO chi_tiet_hoa_don_nhap (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham) VALUES
(@start + 8, 46, 'Phụ kiện Áo giáp bảo hộ Komine', 50, 2850000, 'L', 'Đen đỏ', '/Images/dobaoho.jpg'),
(@start + 8, 47, 'Phụ kiện Mũ bảo hiểm AGK Fullface', 30, 4500000, 'M', 'Trắng đỏ', '/Images/dobaoho.jpg'),
(@start + 8, 48, 'Phụ kiện Găng tay biker Alpinestars', 50, 1850000, 'L', 'Đen', '/Images/dobaoho.jpg');

-- ============ Hóa đơn 9: Triumph + Royal Enfield ============
INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
VALUES ('2026-05-02', 555000000, 'British Bikes Distributor', '02873999000', 1, 'british.bikes@gmail.com', '88 Cách Mạng Tháng 8, Q.10, TP HCM');

INSERT INTO chi_tiet_hoa_don_nhap (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham) VALUES
(@start + 9, 32, 'Triumph Bonneville T120 Classic', 1, 425000000, '1200', 'Xanh Triumph', '/Images/Motor1.jpg'),
(@start + 9, 33, 'Royal Enfield Classic 350', 1, 130000000, '350', 'Xanh quân đội', '/Images/Motor3.jpg');

-- ============ Hóa đơn 10: Phụ kiện đa dạng ============
INSERT INTO hoa_don_nhap (ngay_nhap, tong_tien, ten_ncc, sdt, ma_nhan_vien, email, dia_chi)
VALUES ('2026-05-18', 89000000, 'TopBike Accessories', '02437112233', 2, 'topbike.acc@gmail.com', '56 Cầu Giấy, Hà Nội');

INSERT INTO chi_tiet_hoa_don_nhap (ma_hoa_don, ma_san_pham, ten_san_pham, so_luong, don_gia, kich_co, mau_sac, anh_san_pham) VALUES
(@start + 10, 42, 'Phụ kiện Gương xe máy cao cấp', 100, 120000, 'M', 'Đen', '/Images/guong.jpg'),
(@start + 10, 44, 'Phụ kiện Tay côn CNC chính hãng', 20, 2600000, '17', 'Đen đỏ', '/Images/taycon.jpg'),
(@start + 10, 45, 'Phụ kiện Tay phanh RCB', 15, 3700000, '17', 'Đỏ', '/Images/tayphanh.jpg'),
(@start + 10, 50, 'Phụ kiện Đèn LED tăng sáng pha', 12, 1200000, 'L', 'Trắng vàng', '/Images/guong.jpg');

-- ============ Báo cáo ============
SELECT 'Hóa đơn nhập' AS type, COUNT(*) AS total FROM hoa_don_nhap
UNION ALL
SELECT 'Chi tiết HDN', COUNT(*) FROM chi_tiet_hoa_don_nhap;
