-- ============================================
-- 10 PHỤ KIỆN
-- Tên chứa "Phụ kiện" để search hoạt động
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
('Phụ kiện Gương xe máy cao cấp', 120000, 'M', 'Đen', '/Images/guong.jpg', '/Images/guong.jpg', 7, 50,
 'Gương lớn cao cấp, nhìn rõ phía sau, xoay 360 độ chống chói nắng.',
 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'),

('Phụ kiện Pô độ thể thao Akrapovic', 8900000, 'L', 'Đen carbon', '/Images/poxe.jpg', '/Images/poxe.jpg', 7, 30,
 'Pô độ thể thao Akrapovic chính hãng, tiếng pô trầm ấm, không bị hú, hiệu suất cao.',
 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'),

('Phụ kiện Tay côn CNC chính hãng', 2600000, '17', 'Đen đỏ', '/Images/taycon.jpg', '/Images/taycon.jpg', 7, 40,
 'Tay côn gia công CNC từ hợp kim nhôm chắc chắn, bo góc tinh xảo, tăng chỉnh đa nấc.',
 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'),

('Phụ kiện Tay phanh RCB', 3700000, '17', 'Đỏ', '/Images/tayphanh.jpg', '/Images/tayphanh.jpg', 7, 35,
 'Tay phanh RCB cao cấp, thắng êm, tăng chỉnh đa nấc, hợp kim cứng cáp.',
 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'),

('Phụ kiện Thùng xe + Baga GIVI', 6500000, '5x5', 'Đen', '/Images/thungxe1.jpg', '/Images/thungxe1.jpg', 7, 20,
 'Thùng xe GIVI dung tích lớn kèm baga, chở đồ tiện lợi, khung sắt sơn tĩnh điện bền chắc.',
 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'),

('Phụ kiện Áo giáp bảo hộ Komine', 2850000, 'L', 'Đen đỏ', '/Images/dobaoho.jpg', '/Images/dobaoho.jpg', 7, 25,
 'Áo giáp bảo hộ Komine với protector CE level 2 ở vai/khuỷu/lưng, chất liệu Cordura chống mài mòn.',
 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'),

('Phụ kiện Mũ bảo hiểm AGK Fullface', 4500000, 'M', 'Trắng đỏ', '/Images/dobaoho.jpg', '/Images/dobaoho.jpg', 7, 30,
 'Mũ bảo hiểm fullface AGK đạt chuẩn ECE 22.06, kính chống tia UV, lót có thể tháo giặt.',
 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'),

('Phụ kiện Găng tay biker Alpinestars', 1850000, 'L', 'Đen', '/Images/dobaoho.jpg', '/Images/dobaoho.jpg', 7, 40,
 'Găng tay biker Alpinestars da kangaroo cao cấp, có protector ngón tay và lòng bàn tay.',
 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'),

('Phụ kiện Giày biker Sidi cao cổ', 6200000, '42', 'Đen', '/Images/dobaoho.jpg', '/Images/dobaoho.jpg', 7, 18,
 'Giày biker Sidi cao cổ chuyên nghiệp, bảo vệ mắt cá chân, đế chống trượt, chống nước.',
 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'),

('Phụ kiện Đèn LED tăng sáng pha', 1200000, 'L', 'Trắng vàng', '/Images/guong.jpg', '/Images/guong.jpg', 7, 60,
 'Bộ đèn LED tăng sáng pha chính hãng, công suất 30W, ánh sáng trắng vàng kép tùy chọn.',
 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A');

SELECT 'Phụ kiện inserted' AS status, COUNT(*) AS total FROM san_pham WHERE ten_san_pham LIKE '%Phụ kiện%';
SELECT 'TOTAL products' AS status, COUNT(*) AS total FROM san_pham;
