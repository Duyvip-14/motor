import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CONTENT = {
  faq: {
    title: 'Hỏi đáp - FAQs',
    intro: 'Các câu hỏi thường gặp khi mua xe và phụ kiện tại Motorbike.',
    sections: [
      { q: 'Tôi có thể đổi xe sau khi mua không?', a: 'Trong vòng 60 ngày kể từ ngày nhận xe, bạn có quyền đổi sang mẫu khác nếu xe chưa qua đăng ký và không có hư hỏng từ phía người dùng.' },
      { q: 'Bảo hành xe trong bao lâu?', a: 'Tất cả xe nguyên chiếc tại Motorbike đều được bảo hành chính hãng từ 12 đến 24 tháng tùy mẫu.' },
      { q: 'Phụ kiện có được bảo hành không?', a: 'Phụ kiện chính hãng được bảo hành 6 tháng cho lỗi nhà sản xuất.' },
      { q: 'Tôi có thể trả góp không?', a: 'Có. Chúng tôi hỗ trợ trả góp 0% lãi suất qua nhiều ngân hàng đối tác trong 6-24 tháng.' },
      { q: 'Có giao hàng tận nơi không?', a: 'Áp dụng giao tận nơi miễn phí với phụ kiện trên 500.000đ. Xe nguyên chiếc giao tại showroom hoặc bàn giao tại địa chỉ tùy khu vực.' },
    ],
  },
  policy: {
    title: 'Chính sách của Motorbike',
    intro: 'Toàn bộ chính sách áp dụng cho khách hàng mua xe và phụ kiện tại hệ thống Motorbike.',
    sections: [
      { q: 'Chính sách đổi trả 60 ngày', a: 'Đổi trả miễn phí trong 60 ngày với phụ kiện chưa sử dụng còn nguyên tem mác. Xe nguyên chiếc đổi mẫu trong 7 ngày khi chưa đăng ký biển số.' },
      { q: 'Chính sách vận chuyển', a: 'Miễn phí vận chuyển toàn quốc cho phụ kiện trên 500.000đ. Đơn dưới 500.000đ phụ thu 30.000đ - 50.000đ tùy khu vực.' },
      { q: 'Chính sách bảo mật thông tin', a: 'Mọi thông tin khách hàng được mã hóa và chỉ sử dụng cho mục đích xử lý đơn hàng. Không chia sẻ với bên thứ ba khi chưa có sự đồng ý.' },
      { q: 'Chính sách bảo mật thanh toán', a: 'Thanh toán qua VNPay được mã hóa SSL 256-bit. Thẻ tín dụng được xử lý qua cổng thanh toán đạt chuẩn PCI-DSS.' },
    ],
  },
  contact: {
    title: 'Liên hệ hỗ trợ',
    intro: 'Đội ngũ tư vấn của Motorbike luôn sẵn sàng hỗ trợ 24/7.',
    sections: [
      { q: 'Hotline', a: '1900 27 27 37 - hỗ trợ từ 8:30 đến 22:00 mỗi ngày.' },
      { q: 'Email', a: 'support@motostore.vn - phản hồi trong 24 giờ làm việc.' },
      { q: 'Showroom Hà Nội', a: 'Số 103, Đường Vạn Phúc, Phường Vạn Phúc, Quận Hà Đông, TP. Hà Nội.' },
      { q: 'Showroom Tp HCM', a: 'Lầu 1, Số 163 Trần Trọng Cung, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh.' },
      { q: 'Mạng xã hội', a: 'Theo dõi Motorbike trên Facebook, Instagram, YouTube để cập nhật khuyến mãi và sự kiện cộng đồng.' },
    ],
  },
  baoduong: {
    title: 'Dịch vụ bảo dưỡng xe',
    intro: 'Đội ngũ kỹ thuật chính hãng được đào tạo bởi nhà sản xuất, đảm bảo xe của bạn luôn vận hành ở trạng thái tốt nhất.',
    sections: [
      { q: 'Bảo dưỡng định kỳ', a: 'Kiểm tra dầu nhớt, lọc gió, bugi, hệ thống phanh, lốp xe và đèn báo. Khuyến nghị mỗi 3.000 km hoặc 3 tháng.' },
      { q: 'Sửa chữa chuyên sâu', a: 'Đại tu động cơ, hộp số, hệ thống điện và phun xăng điện tử bằng máy chẩn đoán chính hãng.' },
      { q: 'Phụ tùng chính hãng', a: 'Cam kết 100% phụ tùng có nguồn gốc rõ ràng từ nhà sản xuất, kèm tem chống giả.' },
      { q: 'Đặt lịch trực tuyến', a: 'Liên hệ hotline hoặc đến showroom gần nhất để đặt lịch ưu tiên, không phải xếp hàng chờ.' },
    ],
  },
  uudai: {
    title: 'Ưu đãi dành cho biker',
    intro: 'Chương trình thành viên Motorbike Club với nhiều đặc quyền cho biker.',
    sections: [
      { q: 'Thẻ thành viên', a: 'Tích lũy điểm khi mua xe và phụ kiện. Đạt 100 điểm để lên hạng Silver, 500 điểm lên Gold, 2000 điểm lên Platinum.' },
      { q: 'Sinh nhật biker', a: 'Tặng voucher 500.000đ và ưu đãi miễn phí công bảo dưỡng trong tháng sinh nhật.' },
      { q: 'Sự kiện cộng đồng', a: 'Tham gia các tour phượt, off-road, track day và buổi gặp mặt biker được tổ chức hàng tháng.' },
      { q: 'Khuyến mãi đặc biệt', a: 'Giảm 10-30% phụ kiện vào dịp lễ lớn, săn xe trưng bày giảm sâu cuối năm.' },
    ],
  },
  dangkyxe: {
    title: 'Hướng dẫn đăng ký xe',
    intro: 'Quy trình đăng ký biển số cho xe mô tô mới.',
    sections: [
      { q: 'Bước 1: Chuẩn bị giấy tờ', a: 'CCCD/CMND, sổ hộ khẩu (nếu cần), hóa đơn mua xe, phiếu kiểm tra chất lượng xuất xưởng.' },
      { q: 'Bước 2: Nộp lệ phí trước bạ', a: 'Đến chi cục thuế nơi đăng ký thường trú để nộp phí trước bạ (khoảng 5% giá trị xe).' },
      { q: 'Bước 3: Đăng ký biển số', a: 'Đến phòng CSGT mang theo toàn bộ giấy tờ + biên lai trước bạ. Thời gian xử lý 5-7 ngày làm việc.' },
      { q: 'Bước 4: Nhận đăng ký xe', a: 'Quay lại nhận giấy đăng ký xe sau khi cấp biển. Bảo quản kỹ để sử dụng lưu thông.' },
    ],
  },
  tuyendung: {
    title: 'Tuyển dụng tại Motorbike',
    intro: 'Cùng xây dựng cộng đồng biker Việt Nam lớn mạnh nhất.',
    sections: [
      { q: 'Tư vấn bán hàng', a: 'Yêu cầu yêu thích xe mô tô, kỹ năng giao tiếp tốt. Lương cứng 8-12 triệu + hoa hồng theo doanh số.' },
      { q: 'Kỹ thuật viên', a: 'Tốt nghiệp trung cấp/cao đẳng cơ khí. Được đào tạo nâng cao bởi chuyên gia của hãng. Lương 10-18 triệu.' },
      { q: 'Marketing & Content', a: 'Sáng tạo nội dung về xe và cộng đồng biker. Lương thỏa thuận theo năng lực, có hoa hồng KPI.' },
      { q: 'Quản lý showroom', a: 'Yêu cầu kinh nghiệm 3+ năm trong ngành xe. Thu nhập 20-35 triệu + thưởng quý.' },
      { q: 'Cách ứng tuyển', a: 'Gửi CV về email tuyendung@motostore.vn hoặc trực tiếp tại showroom gần nhất.' },
    ],
  },
  community: {
    title: 'Cộng đồng biker',
    intro: 'Hành trình của bạn trên mỗi cung đường, có Motorbike đồng hành.',
    sections: [
      { q: 'Câu lạc bộ riêng', a: 'Hội Sport Bike, Hội Touring, Hội Café Racer, Hội Adventure - tham gia tự do dựa trên dòng xe yêu thích.' },
      { q: 'Sự kiện thường niên', a: 'Motorbike Day, Track Day Đại Nam, Bikers Festival, Đại hội cuối năm - quy tụ hàng ngàn biker.' },
      { q: 'Các tour phượt', a: 'Hàng tháng tổ chức tour 2N1Đ hoặc 3N2Đ qua các cung đường đẹp: Hà Giang, Tà Xùa, Đà Lạt, Bảo Lộc.' },
      { q: 'Thiện nguyện', a: 'Care&Share - chương trình quyên góp giúp đỡ trẻ em vùng cao do cộng đồng biker chung tay.' },
    ],
  },
  huongdan: {
    title: 'Hướng dẫn chọn xe',
    intro: 'Kim chỉ nam giúp bạn chọn được chiếc mô tô phù hợp nhất với mục đích sử dụng.',
    sections: [
      { q: 'Theo phân khối', a: 'Dưới 250cc cho người mới. 250-650cc cho biker có kinh nghiệm. Trên 1000cc cho rider chuyên nghiệp.' },
      { q: 'Theo dòng xe', a: 'Sport: tốc độ + cảm giác đường đua. Naked: linh hoạt phố thị. Touring: thoải mái đường dài. Adventure: đa địa hình.' },
      { q: 'Theo ngân sách', a: 'Phổ thông 100-300tr (Honda CBR, Kawasaki Ninja 400). Trung 300-700tr (Yamaha R1, Ducati). Cao cấp 700tr+ (BMW S1000RR, Kawasaki H2).' },
      { q: 'Theo chiều cao', a: 'Dưới 1m65: chọn xe có chiều cao yên dưới 800mm. 1m65-1m75: hầu hết các dòng phù hợp. Trên 1m80: ưu tiên touring/adventure.' },
    ],
  },
  blog: {
    title: 'Blog về mô tô',
    intro: 'Cẩm nang, đánh giá, kinh nghiệm cho biker từ đội ngũ chuyên gia.',
    sections: [
      { q: 'Mẹo chăm sóc xe', a: 'Lau xích đúng cách mỗi 500 km. Kiểm tra áp suất lốp hàng tuần. Thay nhớt đúng chu kỳ ghi trong sổ bảo hành.' },
      { q: 'Kỹ thuật lái an toàn', a: 'Học cách phanh ABS, vào cua, vượt xe đúng kỹ thuật để giảm rủi ro 80%.' },
      { q: 'Đánh giá xe mới', a: 'Cập nhật review chi tiết những mẫu xe vừa ra mắt: cảm nhận thực tế, ưu nhược điểm, so sánh đối thủ.' },
      { q: 'Cẩm nang phượt', a: 'Chuẩn bị đồ bảo hộ, hành lý, kế hoạch đường đi, các điểm nghỉ tốt nhất trên các tuyến nổi tiếng.' },
    ],
  },
};

export default function InfoPage() {
  const { topic } = useParams();
  const data = CONTENT[topic] || CONTENT.faq;

  return (
    <div className="info-page" style={{ width: '100%', maxWidth: 900, margin: '40px auto', padding: '90px 20px 60px' }}>
      <div style={{ marginBottom: 24 }}>
        <Link to="/" style={{ color: '#2F5ACF', fontSize: 14 }}>
          <i className="fa-solid fa-arrow-left" style={{ marginRight: 6 }}></i>
          Về trang chủ
        </Link>
      </div>

      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: '#000' }}>
        {data.title}
      </h1>
      <p style={{ fontSize: 16, color: '#555', marginBottom: 32, lineHeight: 1.6 }}>
        {data.intro}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.sections.map((sec, idx) => (
          <div
            key={idx}
            style={{
              background: '#fff',
              border: '1px solid #e1e1e1',
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <h3 style={{ fontSize: 17, fontWeight: 600, color: '#000', marginBottom: 8 }}>
              {sec.q}
            </h3>
            <p style={{ fontSize: 15, color: '#444', lineHeight: 1.6, margin: 0 }}>
              {sec.a}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, padding: 24, background: '#f7f9fc', borderRadius: 12, textAlign: 'center' }}>
        <p style={{ marginBottom: 12, color: '#333' }}>Cần hỗ trợ thêm?</p>
        <Link to="/info/contact" style={{
          display: 'inline-block',
          background: '#000',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 24,
          fontSize: 14,
          fontWeight: 600,
        }}>
          Liên hệ với chúng tôi
        </Link>
      </div>
    </div>
  );
}
