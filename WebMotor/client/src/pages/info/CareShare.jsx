import React from 'react';
import { Link } from 'react-router-dom';

export default function CareShare() {
  const COLORS = {
    primary: '#2F5ACF',
    accent: '#f5d042',
    text: '#1a1a1a',
    border: '#e5e7eb',
    soft: '#f7f9fc',
  };

  const programs = [
    {
      icon: 'fa-school',
      title: 'Em đến trường',
      desc: 'Tài trợ học bổng và xây dựng điểm trường cho trẻ em vùng cao Hà Giang, Sơn La, Lào Cai.',
      stat: '1.200+ em được hỗ trợ',
    },
    {
      icon: 'fa-bowl-rice',
      title: 'Bữa cơm có thịt',
      desc: 'Cung cấp bữa trưa miễn phí cho học sinh vùng khó khăn, kéo dài 9 tháng/năm học.',
      stat: '350.000+ bữa ăn',
    },
    {
      icon: 'fa-shirt',
      title: 'Mùa đông ấm áp',
      desc: 'Tặng áo ấm, chăn và đồ dùng học tập trong những đợt rét đậm tại các tỉnh miền núi phía Bắc.',
      stat: '80+ điểm trường',
    },
    {
      icon: 'fa-house-medical',
      title: 'Sức khỏe vùng cao',
      desc: 'Khám bệnh miễn phí, phát thuốc và tư vấn dinh dưỡng cho trẻ em và bà con dân tộc.',
      stat: '5.000+ lượt khám',
    },
  ];

  const milestones = [
    { year: '2019', text: 'Khởi động chương trình Care&Share đầu tiên cùng cộng đồng biker.' },
    { year: '2021', text: 'Mở rộng đến 12 tỉnh thành, tổ chức tour thiện nguyện hàng tháng.' },
    { year: '2023', text: 'Hợp tác với Quỹ Trò Nghèo Vùng Cao xây dựng 5 điểm trường mới.' },
    { year: '2025', text: 'Trao 2.000 suất học bổng và 100.000 bữa cơm miễn phí.' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 1280, margin: '120px auto 60px', padding: '0 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <Link to="/" style={{ color: COLORS.primary, fontSize: 14, textDecoration: 'none' }}>
          <i className="fa-solid fa-arrow-left" style={{ marginRight: 6 }}></i>
          Về trang chủ
        </Link>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #1a3b8c 0%, #2F5ACF 60%, #5b87f0 100%)',
        borderRadius: 24,
        padding: '56px 40px',
        color: '#fff',
        marginBottom: 60,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 32px rgba(47, 90, 207, 0.25)',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 240, height: 240, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />

        <div style={{ position: 'relative', maxWidth: 720 }}>
          <p style={{
            fontSize: 14, fontWeight: 600, letterSpacing: 2,
            textTransform: 'uppercase', opacity: 0.9, marginBottom: 16,
          }}>
            <i className="fa-solid fa-quote-left" style={{ marginRight: 8 }}></i>
            Trách nhiệm xã hội
          </p>
          <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
            Care&amp;Share
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.95, marginBottom: 24 }}>
            Góp phần mang lại cuộc sống tươi đẹp hơn cho tụi nhỏ vùng cao. Mỗi đơn hàng tại Motorbike, một phần lợi nhuận được trích để xây dựng tương lai cho các em.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#programs" style={{
              background: COLORS.accent, color: '#1a1a1a',
              padding: '12px 28px', borderRadius: 100,
              fontSize: 14, fontWeight: 700,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <i className="fa-solid fa-heart"></i>
              Tìm hiểu chương trình
            </a>
            <a href="#donate" style={{
              background: 'rgba(255,255,255,0.15)', color: '#fff',
              padding: '12px 28px', borderRadius: 100,
              fontSize: 14, fontWeight: 600,
              textDecoration: 'none', border: '1px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(8px)',
            }}>
              Đồng hành cùng chúng tôi
            </a>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 20, marginBottom: 60,
      }}>
        {[
          { num: '6+', label: 'Năm hoạt động' },
          { num: '12', label: 'Tỉnh thành' },
          { num: '2.000+', label: 'Học bổng đã trao' },
          { num: '100K+', label: 'Bữa cơm miễn phí' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', border: `1px solid ${COLORS.border}`,
            borderRadius: 16, padding: 24, textAlign: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.primary, marginBottom: 6 }}>
              {s.num}
            </div>
            <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div id="programs">
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12, color: COLORS.text }}>
          Các chương trình đang triển khai
        </h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: 16, marginBottom: 40 }}>
          Mỗi chương trình là một câu chuyện ấm áp được viết bằng sự đồng lòng của cộng đồng
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24, marginBottom: 60,
        }}>
          {programs.map((p, i) => (
            <div key={i} style={{
              background: '#fff', border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: 28,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: '#fef7d6', color: '#c9961a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, marginBottom: 16,
              }}>
                <i className={`fa-solid ${p.icon}`}></i>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: COLORS.text }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>
                {p.desc}
              </p>
              <div style={{
                display: 'inline-block', padding: '6px 14px',
                background: '#eef3ff', color: COLORS.primary,
                borderRadius: 100, fontSize: 12, fontWeight: 700,
              }}>
                {p.stat}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12, color: COLORS.text }}>
          Hành trình của chúng tôi
        </h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: 16, marginBottom: 40 }}>
          Những cột mốc đáng nhớ trên hành trình lan tỏa yêu thương
        </p>

        <div style={{ position: 'relative', paddingLeft: 32 }}>
          <div style={{
            position: 'absolute', left: 12, top: 8, bottom: 8,
            width: 2, background: COLORS.border,
          }} />
          {milestones.map((m, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 24, paddingLeft: 24 }}>
              <div style={{
                position: 'absolute', left: -24, top: 4,
                width: 16, height: 16, borderRadius: '50%',
                background: COLORS.primary, border: '3px solid #fff',
                boxShadow: '0 0 0 2px ' + COLORS.primary,
              }} />
              <div style={{
                background: '#fff', border: `1px solid ${COLORS.border}`,
                borderRadius: 12, padding: 16,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary, marginBottom: 4 }}>
                  {m.year}
                </div>
                <div style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="donate" style={{
        background: COLORS.soft, borderRadius: 24,
        padding: 48, textAlign: 'center',
      }}>
        <i className="fa-solid fa-hands-holding-heart" style={{ fontSize: 48, color: COLORS.primary, marginBottom: 16 }}></i>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: COLORS.text }}>
          Cùng Motorbike viết tiếp những câu chuyện đẹp
        </h2>
        <p style={{ color: '#666', marginBottom: 24, fontSize: 15, maxWidth: 600, margin: '0 auto 24px' }}>
          Mỗi đơn hàng của bạn là một viên gạch xây nên trường học. Mỗi phụ kiện bạn mua là một bữa cơm cho các em.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/product" style={{
            background: COLORS.primary, color: '#fff',
            padding: '12px 28px', borderRadius: 100,
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
          }}>
            Mua sắm ngay
          </Link>
          <Link to="/info/community" style={{
            background: '#fff', color: COLORS.primary,
            padding: '12px 28px', borderRadius: 100,
            fontSize: 14, fontWeight: 600,
            border: `2px solid ${COLORS.primary}`, textDecoration: 'none',
          }}>
            Tham gia cộng đồng
          </Link>
        </div>
      </div>
    </div>
  );
}
