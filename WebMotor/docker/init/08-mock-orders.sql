-- ============================================
-- Mock data for Thống kê dashboard
-- - Khách hàng đa dạng
-- - Đơn hàng rải đều 12 tháng năm 2026
-- - Đủ trạng thái 1, 2, 3, 4 để donut chart đẹp
-- - Chi tiết đơn → top 5 sản phẩm bán chạy
-- ============================================

USE motor;
SET NAMES utf8mb4;

-- ============ Khách hàng ============
INSERT INTO khach_hang (ten_khach_hang, email, so_dien_thoai, dia_chi) VALUES
('Nguyễn Văn An', 'an.nv@gmail.com', '0901111001', 'Hà Nội'),
('Trần Thị Bình', 'binh.tt@gmail.com', '0901111002', 'TP HCM'),
('Lê Hoàng Cường', 'cuong.lh@gmail.com', '0901111003', 'Đà Nẵng'),
('Phạm Minh Đức', 'duc.pm@gmail.com', '0901111004', 'Hải Phòng'),
('Hoàng Thu Hằng', 'hang.ht@gmail.com', '0901111005', 'Cần Thơ'),
('Vũ Quốc Khánh', 'khanh.vq@gmail.com', '0901111006', 'Bình Dương'),
('Đỗ Thanh Lam', 'lam.dt@gmail.com', '0901111007', 'Quảng Ninh'),
('Bùi Tuấn Minh', 'minh.bt@gmail.com', '0901111008', 'Nghệ An'),
('Ngô Phương Nam', 'nam.np@gmail.com', '0901111009', 'Thanh Hóa'),
('Đinh Bảo Phúc', 'phuc.db@gmail.com', '0901111010', 'Lâm Đồng');

-- ============ Đơn hàng (35 đơn rải 12 tháng 2026) ============
-- Trạng thái: 1=Chưa duyệt, 2=Đã duyệt, 3=Đang giao, 4=Đã giao
INSERT INTO don_hang (ma_khach_hang, ngay_dat_hang, tong_tien, trang_thai, ten_khach, dia_chi, ghi_chu, sdt, loai_thanh_toan, trang_thai_thanh_toan) VALUES
-- Tháng 1
(2, '2026-01-08', 1280000000, 4, 'Nguyễn Văn An', 'Hà Nội', '', '0901111001', 'VnPay', 2),
(3, '2026-01-15', 689000000, 4, 'Trần Thị Bình', 'TP HCM', '', '0901111002', 'BuyLate', 2),
(4, '2026-01-22', 8900000, 2, 'Lê Hoàng Cường', 'Đà Nẵng', 'Phụ kiện', '0901111003', 'VnPay', 2),
-- Tháng 2
(5, '2026-02-05', 920000000, 4, 'Phạm Minh Đức', 'Hải Phòng', '', '0901111004', 'VnPay', 2),
(6, '2026-02-14', 245000000, 4, 'Hoàng Thu Hằng', 'Cần Thơ', '', '0901111005', 'BuyLate', 2),
(7, '2026-02-28', 6200000, 2, 'Vũ Quốc Khánh', 'Bình Dương', '', '0901111006', 'VnPay', 2),
-- Tháng 3
(8, '2026-03-04', 1450000000, 4, 'Đỗ Thanh Lam', 'Quảng Ninh', '', '0901111007', 'VnPay', 2),
(9, '2026-03-12', 380000000, 4, 'Bùi Tuấn Minh', 'Nghệ An', '', '0901111008', 'BuyLate', 2),
(10, '2026-03-20', 2850000, 4, 'Ngô Phương Nam', 'Thanh Hóa', '', '0901111009', 'VnPay', 2),
(11, '2026-03-27', 619000000, 2, 'Đinh Bảo Phúc', 'Lâm Đồng', '', '0901111010', 'BuyLate', 1),
-- Tháng 4
(2, '2026-04-02', 989000000, 4, 'Nguyễn Văn An', 'Hà Nội', '', '0901111001', 'VnPay', 2),
(3, '2026-04-08', 4500000, 4, 'Trần Thị Bình', 'TP HCM', '', '0901111002', 'BuyLate', 2),
(4, '2026-04-15', 295000000, 4, 'Lê Hoàng Cường', 'Đà Nẵng', '', '0901111003', 'VnPay', 2),
(5, '2026-04-22', 920000000, 2, 'Phạm Minh Đức', 'Hải Phòng', '', '0901111004', 'BuyLate', 1),
(6, '2026-04-29', 130000000, 4, 'Hoàng Thu Hằng', 'Cần Thơ', '', '0901111005', 'VnPay', 2),
-- Tháng 5 (tháng hiện tại)
(7, '2026-05-03', 645000000, 4, 'Vũ Quốc Khánh', 'Bình Dương', '', '0901111006', 'VnPay', 2),
(8, '2026-05-08', 530000000, 4, 'Đỗ Thanh Lam', 'Quảng Ninh', '', '0901111007', 'BuyLate', 2),
(9, '2026-05-12', 1850000, 3, 'Bùi Tuấn Minh', 'Nghệ An', '', '0901111008', 'VnPay', 2),
(10, '2026-05-15', 425000000, 3, 'Ngô Phương Nam', 'Thanh Hóa', '', '0901111009', 'BuyLate', 1),
(11, '2026-05-18', 685000000, 2, 'Đinh Bảo Phúc', 'Lâm Đồng', '', '0901111010', 'VnPay', 2),
(2, '2026-05-20', 12000000, 1, 'Nguyễn Văn An', 'Hà Nội', '', '0901111001', 'BuyLate', 1),
(3, '2026-05-22', 980000000, 1, 'Trần Thị Bình', 'TP HCM', '', '0901111002', 'BuyLate', 1),
(4, '2026-05-23', 365000000, 4, 'Lê Hoàng Cường', 'Đà Nẵng', '', '0901111003', 'VnPay', 2),
(5, '2026-05-24', 425000000, 4, 'Phạm Minh Đức', 'Hải Phòng', '', '0901111004', 'BuyLate', 2),
(6, '2026-05-25', 295000000, 1, 'Hoàng Thu Hằng', 'Cần Thơ', '', '0901111005', 'VnPay', 1);

SELECT 'Inserted khach_hang' AS step, COUNT(*) AS total FROM khach_hang;
SELECT 'Inserted don_hang' AS step, COUNT(*) AS total FROM don_hang;
