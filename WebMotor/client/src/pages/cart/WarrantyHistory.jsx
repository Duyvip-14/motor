import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../../until/userContext';

export default function WarrantyHistory() {
    const { user } = useUser();
    const [warranties, setWarranties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const formatDate = (date) => date ? new Date(date).toLocaleDateString('vi-VN') : 'Chưa có';
    const formatCurrency = (number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number || 0);

    useEffect(() => {
        const customerId = user?.customerId || user?.id;

        if (!customerId) {
            setError('Vui lòng đăng nhập để xem bảo hành');
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:5000/api/getbaohanhbyuser/${customerId}`)
            .then((response) => {
                setWarranties(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Không tải được dữ liệu bảo hành');
                setLoading(false);
            });
    }, [user]);

    const getStatusStyle = (status) => {
        if (status === 'Hoàn thành') return { background: '#e6fff2', color: '#1f7a4c' };
        if (status === 'Từ chối bảo hành') return { background: '#fff0f0', color: '#b42318' };
        if (status === 'Đang chờ linh kiện') return { background: '#fff7e6', color: '#9a5b00' };
        return { background: '#eef4ff', color: '#2457a6' };
    };

    return (
        <Fragment>
            <div className="container-cart">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
                    <div>
                        <h2>Lịch sử bảo hành</h2>
                        <p style={{ color: '#666', margin: '8px 0 0' }}>Theo dõi các lần bảo hành sản phẩm của bạn.</p>
                    </div>
                    <Link to="/donhang" style={{ color: '#111', fontWeight: 700 }}>Xem đơn hàng</Link>
                </div>

                {loading ? (
                    <div className="loading"><p>Đang tải dữ liệu bảo hành...</p></div>
                ) : error ? (
                    <div className="error"><p style={{ color: 'red' }}>{error}</p></div>
                ) : warranties.length === 0 ? (
                    <div className="no-orders"><p>Hiện chưa có lịch sử bảo hành nào.</p></div>
                ) : (
                    <div className="layout-order">
                        {warranties.map((item) => (
                            <div key={item.ma_bao_hanh} className="order-section">
                                <div className="address-details">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                                        <h3><i className="fas fa-tools"></i> Bảo hành #{item.ma_bao_hanh}</h3>
                                        <span style={{ ...getStatusStyle(item.trang_thai), padding: '6px 12px', borderRadius: 999, fontWeight: 700, fontSize: 13 }}>
                                            {item.trang_thai}
                                        </span>
                                    </div>
                                    <div className="address-item">
                                        <label>Sản phẩm:</label>
                                        <span>{item.ten_san_pham || item.ma_san_pham}</span>
                                    </div>
                                    <div className="address-item">
                                        <label>Lần bảo hành:</label>
                                        <span>Lần {item.lan_bao_hanh}</span>
                                    </div>
                                    <div className="address-item">
                                        <label>Ngày bảo hành:</label>
                                        <span>{formatDate(item.ngay_bao_hanh)}</span>
                                    </div>
                                    <div className="address-item">
                                        <label>Hạn bảo hành:</label>
                                        <span>{formatDate(item.han_bao_hanh)}</span>
                                    </div>
                                    <div className="address-item">
                                        <label>Nhân viên bảo hành:</label>
                                        <span>{item.ten_nhan_vien || 'Chưa phân công'}</span>
                                    </div>
                                    <div className="address-item">
                                        <label>Chi phí:</label>
                                        <span>{formatCurrency(item.chi_phi)}</span>
                                    </div>
                                </div>

                                <div className="product-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Ảnh</th>
                                                <th>Tình trạng</th>
                                                <th>Nội dung bảo hành</th>
                                                <th>Ghi chú</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src={item.anh_sanpham} className="product-image" alt={item.ten_san_pham || 'Sản phẩm'} loading="lazy" />
                                                </td>
                                                <td>{item.tinh_trang || 'Chưa cập nhật'}</td>
                                                <td>{item.noi_dung}</td>
                                                <td>{item.ghi_chu || 'Không có'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    );
}
