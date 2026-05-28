import React, { useState } from "react";

const PRODUCT_TYPES = [
    { value: 'quanao', label: 'Quần Áo bảo hộ', image: '/Images/dobaoho.jpg', sizeType: 'apparel' },
];

const BODY_TYPES = [
    { value: 'thin', label: 'Gầy', icon: 'fa-user-large-slash' },
    { value: 'normal', label: 'Bình thường', icon: 'fa-user' },
    { value: 'fat', label: 'Đậm', icon: 'fa-user-large' },
];

export default function Chonsize() {
    const [canNang, setCanNang] = useState(60);
    const [chieuCao, setChieuCao] = useState(170);
    const [bodyType, setBodyType] = useState('normal');
    const [productType, setProductType] = useState(PRODUCT_TYPES[0].value);

    const currentProduct = PRODUCT_TYPES.find(p => p.value === productType) || PRODUCT_TYPES[0];

    const tuVanSize = () => {
        const adj = bodyType === 'fat' ? 1 : bodyType === 'thin' ? -1 : 0;
        const sizes = ['S', 'M', 'L', 'XL', '2XL'];
        let idx = 1;
        if (canNang < 55 && chieuCao < 165) idx = 0;
        else if (canNang < 70 && chieuCao < 175) idx = 1;
        else if (canNang < 85 && chieuCao < 185) idx = 2;
        else if (canNang < 95 && chieuCao < 190) idx = 3;
        else idx = 4;
        idx = Math.max(0, Math.min(sizes.length - 1, idx + adj));
        return sizes[idx];
    };

    const COLORS = {
        primary: '#2F5ACF',
        text: '#1a1a1a',
        border: '#e5e7eb',
        soft: '#f7f9fc',
    };

    const headingStyle = { textAlign: 'center', fontWeight: 700, fontSize: 14, marginBottom: 16, color: '#666', textTransform: 'uppercase', letterSpacing: 1 };
    const cardStyle = { background: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' };

    return (
        <div style={{ width: '100%', maxWidth: 1280, margin: '120px auto 60px', padding: '0 24px' }}>
            <h2 style={{ textAlign: 'center', margin: '20px 0 8px', fontWeight: 700, fontSize: 32, color: COLORS.text }}>
                Hướng dẫn chọn size chuẩn
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: 40, fontSize: 15 }}>
                Chỉ vài bước đơn giản để tìm ra size phù hợp nhất với bạn
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60, marginBottom: 40 }}>
                {[1, 2, 3].map((step, idx) => (
                    <React.Fragment key={step}>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: COLORS.primary, color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: 16,
                        }}>{step}</div>
                        {idx < 2 && <div style={{ flex: '0 0 80px', height: 2, background: COLORS.border }} />}
                    </React.Fragment>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24, alignItems: 'start' }}>

                <div style={cardStyle}>
                    <p style={headingStyle}>1. Loại sản phẩm</p>
                    <div style={{ position: 'relative', marginBottom: 20 }}>
                        <select
                            value={productType}
                            disabled
                            style={{
                                width: '100%', padding: '12px 40px 12px 16px',
                                borderRadius: 12, border: `1px solid ${COLORS.border}`,
                                fontSize: 14, fontWeight: 500, background: '#f5f5f5',
                                cursor: 'not-allowed', appearance: 'none', outline: 'none',
                                color: '#666'
                            }}
                        >
                            {PRODUCT_TYPES.map(p => (
                                <option key={p.value} value={p.value}>{p.label}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ background: COLORS.soft, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                        <img
                            src={currentProduct.image}
                            alt={currentProduct.label}
                            style={{ maxWidth: '100%', height: 'auto', maxHeight: 360, borderRadius: 8 }}
                        />
                    </div>
                </div>

                <div style={cardStyle}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>

                        <div>
                            <p style={headingStyle}>2. Thông số cơ thể</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                                {BODY_TYPES.map(b => {
                                    const active = bodyType === b.value;
                                    return (
                                        <button
                                            key={b.value}
                                            type="button"
                                            onClick={() => setBodyType(b.value)}
                                            style={{
                                                padding: '16px 8px',
                                                borderRadius: 12,
                                                border: `2px solid ${active ? COLORS.primary : COLORS.border}`,
                                                background: active ? '#eef3ff' : '#fff',
                                                color: active ? COLORS.primary : '#444',
                                                cursor: 'pointer',
                                                display: 'flex', flexDirection: 'column',
                                                alignItems: 'center', gap: 8,
                                                transition: 'all 0.15s',
                                            }}
                                        >
                                            <i className={`fa-solid ${b.icon}`} style={{ fontSize: 24 }}></i>
                                            <span style={{ fontSize: 13, fontWeight: 600 }}>{b.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                                    <span>Chiều cao</span>
                                    <span style={{ color: COLORS.primary }}>{chieuCao} cm</span>
                                </div>
                                <input
                                    type="range" min="150" max="200" step="1"
                                    value={chieuCao}
                                    onChange={(e) => setChieuCao(parseInt(e.target.value))}
                                    style={{ width: '100%', accentColor: COLORS.primary }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#999', marginTop: 4 }}>
                                    <span>150cm</span><span>200cm</span>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                                    <span>Cân nặng</span>
                                    <span style={{ color: COLORS.primary }}>{canNang} kg</span>
                                </div>
                                <input
                                    type="range" min="40" max="120" step="1"
                                    value={canNang}
                                    onChange={(e) => setCanNang(parseInt(e.target.value))}
                                    style={{ width: '100%', accentColor: COLORS.primary }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#999', marginTop: 4 }}>
                                    <span>40kg</span><span>120kg</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p style={headingStyle}>3. Shop gợi ý</p>
                            <div style={{
                                background: 'linear-gradient(135deg, #2F5ACF 0%, #6e8af0 100%)',
                                borderRadius: 16,
                                padding: '40px 20px',
                                textAlign: 'center',
                                color: '#fff',
                                boxShadow: '0 8px 24px rgba(47, 90, 207, 0.25)',
                            }}>
                                <p style={{ margin: 0, fontSize: 14, opacity: 0.9, marginBottom: 12 }}>
                                    Size phù hợp cho bạn
                                </p>
                                <div style={{
                                    fontSize: 72, fontWeight: 800, lineHeight: 1,
                                    margin: '12px 0',
                                    textShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                }}>
                                    {tuVanSize()}
                                </div>
                                <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>
                                    Dựa trên {chieuCao}cm / {canNang}kg
                                </p>
                            </div>

                            <div style={{ marginTop: 16, padding: 16, background: COLORS.soft, borderRadius: 12, fontSize: 13, color: '#555', lineHeight: 1.6 }}>
                                <i className="fa-solid fa-circle-info" style={{ color: COLORS.primary, marginRight: 8 }}></i>
                                Gợi ý chỉ mang tính tham khảo. Bạn nên đến showroom để thử trực tiếp.
                            </div>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: `1px solid ${COLORS.border}`, margin: '32px 0 24px' }} />

                    <h3 style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, marginBottom: 20, color: COLORS.text }}>
                        Bảng size chi tiết
                    </h3>
                    <div style={{ overflowX: 'auto' }}>
                        <img
                            src="/Images/thongso.jpg"
                            alt="Size chart"
                            style={{ width: '100%', height: 'auto', borderRadius: 12, border: `1px solid ${COLORS.border}` }}
                        />
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .chonsize-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
