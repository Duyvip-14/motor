import React from 'react';

export default function StockAlertModal({ open, onClose, items = [], type = 'unavailable' }) {
  if (!open) return null;

  const isOutOfStock = type === 'out_of_stock';
  const isInsufficient = type === 'insufficient';

  const titleMap = {
    out_of_stock: 'Sản phẩm đã hết hàng',
    insufficient: 'Số lượng tồn kho không đủ',
    unavailable: 'Sản phẩm không khả dụng',
  };

  const iconMap = {
    out_of_stock: 'fa-circle-exclamation',
    insufficient: 'fa-triangle-exclamation',
    unavailable: 'fa-ban',
  };

  const colorMap = {
    out_of_stock: '#dc2626',
    insufficient: '#f59e0b',
    unavailable: '#dc2626',
  };

  const color = colorMap[type] || '#dc2626';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 20,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 16,
          maxWidth: 480,
          width: '100%',
          maxHeight: '85vh',
          overflow: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          animation: 'modalFadeIn 0.2s ease-out',
        }}
      >
        <div style={{ padding: '32px 28px 16px', textAlign: 'center' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: color + '15',
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              margin: '0 auto 16px',
            }}
          >
            <i className={`fa-solid ${iconMap[type] || 'fa-circle-exclamation'}`} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: '#1a1a1a' }}>
            {titleMap[type] || titleMap.unavailable}
          </h2>
          <p style={{ fontSize: 14, color: '#666', margin: 0, lineHeight: 1.6 }}>
            {isOutOfStock && 'Một hoặc nhiều sản phẩm trong giỏ hàng đã hết hàng. Vui lòng cập nhật giỏ hàng trước khi thanh toán.'}
            {isInsufficient && 'Một số sản phẩm có số lượng tồn kho không đủ với số lượng bạn đặt. Vui lòng giảm số lượng hoặc bỏ khỏi giỏ.'}
            {!isOutOfStock && !isInsufficient && 'Vui lòng kiểm tra lại sản phẩm trong giỏ hàng.'}
          </p>
        </div>

        {items.length > 0 && (
          <div style={{ padding: '0 24px 16px' }}>
            <div
              style={{
                background: '#fef7f2',
                border: '1px solid #fed7c2',
                borderRadius: 12,
                padding: 12,
                maxHeight: 240,
                overflowY: 'auto',
              }}
            >
              {items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 8,
                    borderBottom: idx < items.length - 1 ? '1px solid #fde0cc' : 'none',
                  }}
                >
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: 48,
                        height: 48,
                        objectFit: 'cover',
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#1a1a1a',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#dc2626', marginTop: 2 }}>
                      {item.message ||
                        (item.available === 0
                          ? 'Đã hết hàng'
                          : `Chỉ còn ${item.available} sản phẩm (đặt ${item.requested})`)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            padding: '12px 24px 24px',
            display: 'flex',
            gap: 10,
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: color,
              color: '#fff',
              border: 'none',
              padding: '10px 28px',
              borderRadius: 24,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Đã hiểu
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
