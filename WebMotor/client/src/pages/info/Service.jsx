import React from 'react';
import { Link } from 'react-router-dom';

export default function Service() {
  const COLORS = {
    primary: '#2F5ACF',
    text: '#1a1a1a',
    border: '#e5e7eb',
    soft: '#f7f9fc',
  };

  const features = [
    { icon: 'fa-rotate-left', title: 'Đổi trả 60 ngày', desc: 'Đổi trả miễn phí trong vòng 60 ngày kể từ ngày nhận hàng nếu sản phẩm không vừa ý.' },
    { icon: 'fa-truck-fast', title: 'Giao hàng siêu tốc', desc: 'Giao hàng trong 2-5 ngày trên toàn quốc, miễn phí cho đơn hàng phụ kiện trên 500.000đ.' },
    { icon: 'fa-shield-halved', title: 'Bảo hành chính hãng', desc: 'Bảo hành chính hãng 12-24 tháng với đội ngũ kỹ thuật được đào tạo bởi nhà sản xuất.' },
    { icon: 'fa-headset', title: 'Hỗ trợ 24/7', desc: 'Hotline 1900 27 27 37 hoạt động từ 8:30 - 22:00 mỗi ngày, hỗ trợ tư vấn chuyên sâu.' },
    { icon: 'fa-medal', title: 'Sản phẩm chính hãng', desc: 'Cam kết 100% sản phẩm có nguồn gốc rõ ràng từ nhà sản xuất, kèm tem chống giả.' },
    { icon: 'fa-handshake', title: 'Cộng đồng biker', desc: 'Tham gia câu lạc bộ Motorbike Club với hơn 5 triệu biker trên toàn quốc.' },
  ];

  const stats = [
    { number: '5M+', label: 'Khách hàng tin dùng' },
    { number: '99%', label: 'Khách hàng hài lòng' },
    { number: '24/7', label: 'Hỗ trợ liên tục' },
    { number: '60', label: 'Ngày đổi trả' },
  ];

  const reviews = [
    { name: 'Anh Tuấn', role: 'Biker phượt', star: 5, content: 'Mua xe Kawasaki tại Motorbike, được tư vấn rất kỹ. Sau 1 năm dùng vẫn rất hài lòng, bảo dưỡng định kỳ luôn được nhắc lịch.' },
    { name: 'Chị Hà', role: 'Khách hàng VIP', star: 5, content: 'Dịch vụ giao hàng cực nhanh, đặt phụ kiện hôm trước hôm sau đã có. Nhân viên nhiệt tình tư vấn từng món một.' },
    { name: 'Anh Minh', role: 'Thành viên Club', star: 5, content: 'Tham gia Motorbike Club được trải nghiệm nhiều tour phượt thú vị, kết nối với cộng đồng biker rất chất lượng.' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 1280, margin: '120px auto 60px', padding: '0 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <Link to="/" style={{ color: COLORS.primary, fontSize: 14 }}>
          <i className="fa-solid fa-arrow-left" style={{ marginRight: 6 }}></i>
          Về trang chủ
        </Link>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #2F5ACF 0%, #6e8af0 100%)',
        borderRadius: 24,
        padding: '60px 40px',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 60,
        boxShadow: '0 12px 32px rgba(47, 90, 207, 0.25)',
      }}>
        <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          Dịch vụ hài lòng 100%
        </h1>
        <p style={{ fontSize: 18, opacity: 0.95, maxWidth: 720, margin: '0 auto', lineHeight: 1.6 }}>
          Cam kết của Motorbike: đặt sự hài lòng của khách hàng làm trung tâm trong mọi sản phẩm và dịch vụ.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 24,
        marginBottom: 60,
      }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{
            background: '#fff',
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: 32,
            textAlign: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: COLORS.primary, marginBottom: 8 }}>
              {stat.number}
            </div>
            <div style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12, color: COLORS.text }}>
        Vì sao khách hàng tin chọn chúng tôi?
      </h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: 16, marginBottom: 40 }}>
        6 cam kết vàng tạo nên uy tín của Motorbike
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24,
        marginBottom: 60,
      }}>
        {features.map((f, idx) => (
          <div key={idx} style={{
            background: '#fff',
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: 28,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            transition: 'transform 0.2s',
          }}>
            <div style={{
              width: 56, height: 56,
              borderRadius: 14,
              background: '#eef3ff',
              color: COLORS.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              marginBottom: 16,
            }}>
              <i className={`fa-solid ${f.icon}`}></i>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: COLORS.text }}>
              {f.title}
            </h3>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: 0 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12, color: COLORS.text }}>
        Khách hàng nói gì?
      </h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: 16, marginBottom: 40 }}>
        Phản hồi thực tế từ cộng đồng biker
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        marginBottom: 60,
      }}>
        {reviews.map((r, idx) => (
          <div key={idx} style={{
            background: COLORS.soft,
            borderRadius: 16,
            padding: 28,
            position: 'relative',
          }}>
            <div style={{ marginBottom: 12, color: '#f5b400' }}>
              {Array(r.star).fill(0).map((_, i) => (
                <i key={i} className="fa-solid fa-star" style={{ marginRight: 2 }}></i>
              ))}
            </div>
            <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
              "{r.content}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44,
                borderRadius: '50%',
                background: COLORS.primary,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 16,
              }}>
                {r.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.text }}>{r.name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: '#fff',
        border: `1px solid ${COLORS.border}`,
        borderRadius: 24,
        padding: 48,
        textAlign: 'center',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: COLORS.text }}>
          Bạn cần hỗ trợ thêm?
        </h2>
        <p style={{ color: '#666', marginBottom: 24, fontSize: 15 }}>
          Đội ngũ tư vấn của Motorbike luôn sẵn sàng hỗ trợ 24/7.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/info/contact" style={{
            background: COLORS.primary,
            color: '#fff',
            padding: '12px 28px',
            borderRadius: 24,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            Liên hệ ngay
          </Link>
          <Link to="/info/faq" style={{
            background: '#fff',
            color: COLORS.primary,
            padding: '12px 28px',
            borderRadius: 24,
            fontSize: 14,
            fontWeight: 600,
            border: `2px solid ${COLORS.primary}`,
            textDecoration: 'none',
          }}>
            Xem FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
