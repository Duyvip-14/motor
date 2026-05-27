import axios from 'axios';
import React, { useEffect, useState } from 'react';

const COLORS = {
  primary: '#4e73df',
  success: '#1cc88a',
  warning: '#f6c23e',
  danger: '#e74a3b',
  info: '#36b9cc',
  text: '#5a5c69',
  border: '#e3e6f0',
};

const formatVND = (n) => (Number(n) || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
const formatNumber = (n) => (Number(n) || 0).toLocaleString('vi-VN');

const STATUS_MAP = {
  1: { label: 'Chưa duyệt', color: COLORS.warning },
  2: { label: 'Đã duyệt', color: COLORS.info },
  3: { label: 'Đang giao', color: COLORS.primary },
  4: { label: 'Đã giao', color: COLORS.success },
};

export default function Thongke() {
  const [stats, setStats] = useState({
    tongKH: 0,
    chuaXuLy: 0,
    doanhThuNam: 0,
    doanhThuThang: 0,
    tongSP: 0,
    tongDH: 0,
  });
  const [donHangByMonth, setDonHangByMonth] = useState(Array(12).fill(0));
  const [trangThaiCount, setTrangThaiCount] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const loadAll = async () => {
    try {
      const [khRes, dhRes, spRes, topRes] = await Promise.all([
        axios.get('http://localhost:5000/api/getallkh'),
        axios.get('http://localhost:5000/api/getalldonhang'),
        axios.get('http://localhost:5000/api/getallsp'),
        axios.get('http://localhost:5000/api/top5products').catch(() => ({ data: [] })),
      ]);

      const allOrders = dhRes.data || [];
      const now = new Date();
      const curYear = now.getFullYear();
      const curMonth = now.getMonth();

      const monthArr = Array(12).fill(0);
      const ttCount = { 1: 0, 2: 0, 3: 0, 4: 0 };
      let nam = 0, thang = 0;

      allOrders.forEach((o) => {
        const d = new Date(o.ngay_dat_hang);
        if (d.getFullYear() === curYear) {
          monthArr[d.getMonth()] += 1;
          if (parseInt(o.trang_thai) === 4 || parseInt(o.trang_thai) === 2) {
            nam += Number(o.tong_tien) || 0;
            if (d.getMonth() === curMonth) thang += Number(o.tong_tien) || 0;
          }
        }
        if (ttCount[o.trang_thai] !== undefined) ttCount[o.trang_thai] += 1;
      });

      setStats({
        tongKH: (khRes.data || []).length,
        chuaXuLy: ttCount[1],
        doanhThuNam: nam,
        doanhThuThang: thang,
        tongSP: (spRes.data || []).length,
        tongDH: allOrders.length,
      });
      setDonHangByMonth(monthArr);
      setTrangThaiCount(ttCount);
      setTopProducts((topRes.data || []).slice(0, 5));
      setRecentOrders(
        allOrders
          .slice()
          .sort((a, b) => new Date(b.ngay_dat_hang) - new Date(a.ngay_dat_hang))
          .slice(0, 5)
      );
    } catch (e) {
      console.error('Lỗi tải thống kê:', e);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const maxMonth = Math.max(...donHangByMonth, 1);
  const totalStatus = Object.values(trangThaiCount).reduce((s, v) => s + v, 0) || 1;

  const StatCard = ({ color, label, value, icon }) => (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className={`card border-left-${color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>{label}</div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
            </div>
            <div className="col-auto"><i className={`fas ${icon} fa-2x text-gray-300`}></i></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Thống kê tổng quan</h1>
        <button onClick={loadAll} className="btn btn-sm btn-primary shadow-sm">
          <i className="fas fa-sync fa-sm text-white-50 mr-1"></i> Làm mới
        </button>
      </div>

      <div className="row">
        <StatCard color="primary" label="Doanh thu tháng này" value={formatVND(stats.doanhThuThang)} icon="fa-calendar" />
        <StatCard color="success" label="Doanh thu năm" value={formatVND(stats.doanhThuNam)} icon="fa-dollar-sign" />
        <StatCard color="warning" label="Đơn chưa xử lý" value={formatNumber(stats.chuaXuLy)} icon="fa-comments" />
        <StatCard color="info" label="Tổng khách hàng" value={formatNumber(stats.tongKH)} icon="fa-users" />
      </div>

      <div className="row">
        <StatCard color="primary" label="Tổng sản phẩm" value={formatNumber(stats.tongSP)} icon="fa-motorcycle" />
        <StatCard color="success" label="Tổng đơn hàng" value={formatNumber(stats.tongDH)} icon="fa-shopping-cart" />
        <StatCard color="info" label="Đơn đang giao" value={formatNumber(trangThaiCount[3])} icon="fa-truck" />
        <StatCard color="success" label="Đơn đã giao" value={formatNumber(trangThaiCount[4])} icon="fa-check-circle" />
      </div>

      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Đơn hàng theo tháng (năm {new Date().getFullYear()})</h6>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 260, padding: '8px 0' }}>
                {donHangByMonth.map((v, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ fontSize: 16, color: '#888', marginBottom: 4 }}>{v}</div>
                    <div
                      style={{
                        background: `linear-gradient(180deg, ${COLORS.primary} 0%, #6e8af0 100%)`,
                        height: `${(v / maxMonth) * 90}%`,
                        minHeight: v > 0 ? 4 : 0,
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.4s',
                      }}
                    />
                    <div style={{ fontSize: 16, color: '#666', marginTop: 6, fontWeight: 600 }}>T{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3"><h6 className="m-0 font-weight-bold text-primary">Tỉ lệ trạng thái đơn</h6></div>
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <DonutChart data={trangThaiCount} total={totalStatus} />
              </div>
              {Object.entries(STATUS_MAP).map(([k, v]) => {
                const count = trangThaiCount[k] || 0;
                const pct = ((count / totalStatus) * 100).toFixed(1);
                return (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 12, height: 12, borderRadius: 3, background: v.color }} />
                      {v.label}
                    </span>
                    <span style={{ fontWeight: 600 }}>{count} ({pct}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3"><h6 className="m-0 font-weight-bold text-primary">Top 5 sản phẩm bán chạy</h6></div>
            <div className="card-body">
              {topProducts.length === 0 ? (
                <p className="text-center text-muted my-4">Chưa có dữ liệu</p>
              ) : (
                topProducts.map((p, i) => (
                  <div key={p.ma_san_pham || i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < topProducts.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: COLORS.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                    <img src={p.anh_sanpham} alt="" style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 20, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.ten_san_pham}</div>
                      <div style={{ fontSize: 18, color: '#888' }}>{formatVND(p.gia)}</div>
                    </div>
                    <div style={{ background: '#eef3ff', color: COLORS.primary, padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>x{p.total_quantity}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3"><h6 className="m-0 font-weight-bold text-primary">Đơn hàng gần đây</h6></div>
            <div className="card-body" style={{ padding: 0 }}>
              {recentOrders.length === 0 ? (
                <p className="text-center text-muted my-4">Chưa có đơn hàng</p>
              ) : (
                <table className="table table-sm mb-0">
                  <thead>
                    <tr style={{ fontSize: 12 }}>
                      <th>#</th><th>Khách</th><th>Ngày</th><th>Tổng</th><th>TT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => {
                      const st = STATUS_MAP[o.trang_thai] || { label: 'N/A', color: '#888' };
                      return (
                        <tr key={o.ma_don_hang} style={{ fontSize: 20 }}>
                          <td>#{o.ma_don_hang}</td>
                          <td>{o.ten_khach}</td>
                          <td>{(o.ngay_dat_hang || '').slice(0, 10)}</td>
                          <td style={{ fontWeight: 600 }}>{formatVND(o.tong_tien)}</td>
                          <td><span style={{ background: st.color, color: '#fff', padding: '3px 8px', borderRadius: 12, fontSize: 18 }}>{st.label}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DonutChart({ data, total }) {
  const radius = 60;
  const stroke = 22;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width={160} height={160} viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={80} cy={80} r={radius} fill="none" stroke={COLORS.border} strokeWidth={stroke} />
      {Object.entries(STATUS_MAP).map(([k, v]) => {
        const count = data[k] || 0;
        if (count === 0) return null;
        const len = (count / total) * circumference;
        const dash = `${len} ${circumference - len}`;
        const el = (
          <circle key={k} cx={80} cy={80} r={radius} fill="none" stroke={v.color} strokeWidth={stroke} strokeDasharray={dash} strokeDashoffset={-offset} />
        );
        offset += len;
        return el;
      })}
      <text x={80} y={86} textAnchor="middle" fontSize={20} fontWeight={700} fill={COLORS.text} style={{ transform: 'rotate(90deg)', transformOrigin: '80px 80px' }}>
        {total}
      </text>
    </svg>
  );
}
