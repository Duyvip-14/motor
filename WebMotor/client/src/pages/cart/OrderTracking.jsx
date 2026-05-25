import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../../until/userContext';

const COLORS = {
  primary: '#2F5ACF',
  text: '#1a1a1a',
  border: '#e5e7eb',
  soft: '#f7f9fc',
  muted: '#6b7280',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#3b82f6',
  danger: '#ef4444',
};

const STATUS_CONFIG = {
  1: { label: 'Chờ xác nhận', color: COLORS.warning, icon: 'fa-clock', step: 1 },
  2: { label: 'Đã duyệt', color: COLORS.info, icon: 'fa-check', step: 2 },
  3: { label: 'Đang giao', color: COLORS.primary, icon: 'fa-truck', step: 3 },
  4: { label: 'Đã giao', color: COLORS.success, icon: 'fa-circle-check', step: 4 },
};

const TABS = [
  { value: 'all', label: 'Tất cả', icon: 'fa-list' },
  { value: '1', label: 'Chờ xác nhận', icon: 'fa-clock' },
  { value: '2', label: 'Đã duyệt', icon: 'fa-check' },
  { value: '3', label: 'Đang giao', icon: 'fa-truck' },
  { value: '4', label: 'Đã giao', icon: 'fa-circle-check' },
];

const TIMELINE_STEPS = [
  { step: 1, label: 'Đặt hàng', icon: 'fa-cart-shopping' },
  { step: 2, label: 'Đã xác nhận', icon: 'fa-check' },
  { step: 3, label: 'Đang giao', icon: 'fa-truck' },
  { step: 4, label: 'Đã giao', icon: 'fa-circle-check' },
];

const formatVND = (n) => (Number(n) || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export default function OrderTracking() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const loadData = async () => {
    if (!user?.id) {
      setError('Vui lòng đăng nhập để xem đơn hàng');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/orderDetailsByCustomer/${user.id}`);
      setOrders(res.data || []);
      setError('');
    } catch (e) {
      setError(e.response?.status === 404 ? 'Bạn chưa có đơn hàng nào' : 'Không thể tải đơn hàng');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [user]);

  const filteredOrders = orders.filter(o => {
    const matchTab = activeTab === 'all' || String(o.trang_thai) === activeTab;
    const term = searchTerm.trim().toLowerCase();
    const matchSearch = !term || String(o.ma_don_hang).includes(term) || (o.ten_khach || '').toLowerCase().includes(term);
    return matchTab && matchSearch;
  });

  const counts = {
    all: orders.length,
    1: orders.filter(o => String(o.trang_thai) === '1').length,
    2: orders.filter(o => String(o.trang_thai) === '2').length,
    3: orders.filter(o => String(o.trang_thai) === '3').length,
    4: orders.filter(o => String(o.trang_thai) === '4').length,
  };

  return (
    <div style={{ width: '100%', maxWidth: 1180, margin: '120px auto 60px', padding: '0 24px' }}>
      <div style={{ marginBottom: 24 }}>
        <Link to="/" style={{ color: COLORS.primary, fontSize: 14, textDecoration: 'none' }}>
          <i className="fa-solid fa-arrow-left" style={{ marginRight: 6 }} />
          Về trang chủ
        </Link>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: COLORS.text }}>
          Theo dõi đơn hàng
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 15 }}>
          Quản lý và theo dõi tiến trình các đơn hàng của bạn
        </p>
      </div>

      <div style={{
        background: '#fff',
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: 6,
        marginBottom: 20,
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        {TABS.map(tab => {
          const active = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              style={{
                flex: 1,
                minWidth: 140,
                padding: '10px 16px',
                background: active ? COLORS.primary : 'transparent',
                color: active ? '#fff' : COLORS.text,
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: active ? 600 : 500,
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <i className={`fa-solid ${tab.icon}`} />
              {tab.label}
              <span style={{
                background: active ? 'rgba(255,255,255,0.25)' : COLORS.soft,
                color: active ? '#fff' : COLORS.muted,
                padding: '2px 10px',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 600,
              }}>
                {counts[tab.value]}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ marginBottom: 24, position: 'relative' }}>
        <i className="fa-solid fa-magnifying-glass" style={{
          position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
          color: COLORS.muted, fontSize: 14,
        }} />
        <input
          type="text"
          placeholder="Tìm theo mã đơn hoặc tên người nhận..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 18px 14px 46px',
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            fontSize: 14,
            outline: 'none',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        />
      </div>

      {loading ? (
        <EmptyState icon="fa-spinner fa-spin" title="Đang tải đơn hàng..." />
      ) : error ? (
        <EmptyState icon="fa-circle-exclamation" title={error} subtitle="Hãy mua sắm để có đơn hàng đầu tiên" actionLabel="Mua sắm ngay" actionTo="/product" />
      ) : filteredOrders.length === 0 ? (
        <EmptyState
          icon="fa-box-open"
          title="Không có đơn hàng nào"
          subtitle={searchTerm ? `Không tìm thấy đơn nào khớp với "${searchTerm}"` : 'Hãy thử chuyển tab khác hoặc mua sắm thêm'}
          actionLabel="Tiếp tục mua sắm"
          actionTo="/product"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredOrders.map(order => (
            <OrderCard
              key={order.ma_don_hang}
              order={order}
              expanded={expandedOrder === order.ma_don_hang}
              onToggle={() => setExpandedOrder(expandedOrder === order.ma_don_hang ? null : order.ma_don_hang)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ icon, title, subtitle, actionLabel, actionTo }) {
  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${COLORS.border}`,
      borderRadius: 16,
      padding: '60px 24px',
      textAlign: 'center',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      <i className={`fa-solid ${icon}`} style={{ fontSize: 48, color: COLORS.muted, marginBottom: 16 }} />
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: COLORS.text }}>{title}</h3>
      {subtitle && <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 20 }}>{subtitle}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} style={{
          display: 'inline-block',
          background: COLORS.primary,
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 24,
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'none',
        }}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

function OrderCard({ order, expanded, onToggle }) {
  const status = STATUS_CONFIG[order.trang_thai] || STATUS_CONFIG[1];
  const totalQty = (order.orderDetails || []).reduce((sum, it) => sum + Number(it.so_luong || 0), 0);
  const totalPrice = (order.orderDetails || []).reduce((sum, it) => sum + Number(it.gia || 0) * Number(it.so_luong || 0), 0);
  const previewItems = (order.orderDetails || []).slice(0, 3);

  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${COLORS.border}`,
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      transition: 'box-shadow 0.2s',
    }}>
      <div style={{
        padding: 20,
        borderBottom: `1px solid ${COLORS.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: COLORS.soft,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: '#fff',
            color: COLORS.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            border: `1px solid ${COLORS.border}`,
          }}>
            <i className="fa-solid fa-receipt" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>
              Đơn hàng #{order.ma_don_hang}
            </div>
            <div style={{ fontSize: 13, color: COLORS.muted }}>
              {totalQty} sản phẩm
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            background: status.color + '20',
            color: status.color,
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <i className={`fa-solid ${status.icon}`} />
            {status.label}
          </span>
          <button
            onClick={onToggle}
            style={{
              background: '#fff',
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: '8px 14px',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.text,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {expanded ? 'Thu gọn' : 'Chi tiết'}
            <i className={`fa-solid fa-chevron-${expanded ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
          </button>
        </div>
      </div>

      <Timeline currentStep={status.step} />

      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, overflowX: 'auto' }}>
          {previewItems.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: 8,
              background: COLORS.soft,
              borderRadius: 10,
              minWidth: 240,
              flex: '0 0 auto',
            }}>
              <img
                src={item.anh_sanpham}
                alt={item.ten_san_pham}
                style={{ width: 48, height: 48, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.ten_san_pham}
                </div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>
                  x{item.so_luong} · {formatVND(item.gia)}
                </div>
              </div>
            </div>
          ))}
          {order.orderDetails && order.orderDetails.length > 3 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 14px',
              background: COLORS.soft,
              borderRadius: 10,
              fontSize: 13,
              color: COLORS.muted,
              fontWeight: 600,
              flex: '0 0 auto',
            }}>
              +{order.orderDetails.length - 3} sản phẩm
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 13, color: COLORS.muted }}>
            <i className="fa-solid fa-location-dot" style={{ marginRight: 6 }} />
            {order.dia_chi}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.danger }}>
            {formatVND(totalPrice)}
          </div>
        </div>
      </div>

      {expanded && <ExpandedDetails order={order} />}
    </div>
  );
}

function Timeline({ currentStep }) {
  return (
    <div style={{ padding: '24px 20px', borderBottom: `1px solid ${COLORS.border}`, background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        {TIMELINE_STEPS.map((step, idx) => {
          const isCompleted = currentStep >= step.step;
          const isActive = currentStep === step.step;
          return (
            <React.Fragment key={step.step}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                position: 'relative',
                zIndex: 2,
                flex: '0 0 auto',
                minWidth: 80,
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: isCompleted ? COLORS.primary : '#fff',
                  border: `2px solid ${isCompleted ? COLORS.primary : COLORS.border}`,
                  color: isCompleted ? '#fff' : COLORS.muted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  boxShadow: isActive ? `0 0 0 6px ${COLORS.primary}25` : 'none',
                  transition: 'all 0.3s',
                }}>
                  <i className={`fa-solid ${step.icon}`} />
                </div>
                <div style={{
                  fontSize: 12,
                  fontWeight: isCompleted ? 600 : 500,
                  color: isCompleted ? COLORS.text : COLORS.muted,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}>
                  {step.label}
                </div>
              </div>
              {idx < TIMELINE_STEPS.length - 1 && (
                <div style={{
                  flex: 1,
                  height: 2,
                  background: currentStep > step.step ? COLORS.primary : COLORS.border,
                  marginBottom: 28,
                  transition: 'background 0.3s',
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ExpandedDetails({ order }) {
  const totalPrice = (order.orderDetails || []).reduce((sum, it) => sum + Number(it.gia || 0) * Number(it.so_luong || 0), 0);

  return (
    <div style={{ padding: 20, borderTop: `1px solid ${COLORS.border}`, background: COLORS.soft }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
        <InfoBox icon="fa-user" title="Người nhận" value={order.ten_khach} />
        <InfoBox icon="fa-phone" title="Số điện thoại" value={order.sdt} />
        <InfoBox icon="fa-location-dot" title="Địa chỉ" value={order.dia_chi} />
      </div>

      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: `1px solid ${COLORS.border}`,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '12px 16px',
          background: COLORS.soft,
          borderBottom: `1px solid ${COLORS.border}`,
          fontSize: 14,
          fontWeight: 700,
          color: COLORS.text,
        }}>
          Chi tiết sản phẩm
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fff', fontSize: 12, color: COLORS.muted, textTransform: 'uppercase' }}>
              <th style={{ padding: 12, textAlign: 'left', fontWeight: 600 }}>Sản phẩm</th>
              <th style={{ padding: 12, textAlign: 'center', fontWeight: 600 }}>Size</th>
              <th style={{ padding: 12, textAlign: 'center', fontWeight: 600 }}>Màu</th>
              <th style={{ padding: 12, textAlign: 'center', fontWeight: 600 }}>SL</th>
              <th style={{ padding: 12, textAlign: 'right', fontWeight: 600 }}>Giá</th>
              <th style={{ padding: 12, textAlign: 'right', fontWeight: 600 }}>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {(order.orderDetails || []).map((it, idx) => (
              <tr key={idx} style={{ borderTop: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src={it.anh_sanpham}
                      alt=""
                      style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{it.ten_san_pham}</span>
                  </div>
                </td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 13 }}>{it.kich_co || '-'}</td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 13 }}>{it.mau_sac || '-'}</td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{it.so_luong}</td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 13 }}>{formatVND(it.gia)}</td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 700, color: COLORS.danger }}>
                  {formatVND(it.gia * it.so_luong)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: `2px solid ${COLORS.border}`, background: COLORS.soft }}>
              <td colSpan={5} style={{ padding: 14, textAlign: 'right', fontSize: 14, fontWeight: 600 }}>Tổng cộng</td>
              <td style={{ padding: 14, textAlign: 'right', fontSize: 16, fontWeight: 700, color: COLORS.danger }}>
                {formatVND(totalPrice)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function InfoBox({ icon, title, value }) {
  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${COLORS.border}`,
      borderRadius: 10,
      padding: 14,
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        background: COLORS.primary + '15',
        color: COLORS.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        flexShrink: 0,
      }}>
        <i className={`fa-solid ${icon}`} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, wordBreak: 'break-word' }}>{value || '-'}</div>
      </div>
    </div>
  );
}
