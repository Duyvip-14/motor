import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';

export default function Viewbaohanh() {
    const [warranty, setWarranty] = useState({});
    const { ma_bao_hanh } = useParams();

    const formatDate = (date) => date ? new Date(date).toLocaleDateString('vi-VN') : '';
    const formatCurrency = (number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number || 0);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/getbaohanh/${ma_bao_hanh}`)
            .then((resp) => setWarranty(resp.data[0] || {}))
            .catch((error) => console.error(error));
    }, [ma_bao_hanh]);

    return (
        <div>
            <BackButton />
            <div className="card shadow mb-4">
                <div className="d-flex align-items-center justify-content-between card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Chi tiết bảo hành #{warranty.ma_bao_hanh}</h6>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Sản phẩm bảo hành</label>
                            <input type="text" className="form-control" value={warranty.ten_san_pham || warranty.ma_san_pham || ''} readOnly />
                        </div>
                        <div className="col">
                            <label className="form-label">Khách hàng</label>
                            <input type="text" className="form-control" value={warranty.ten_khach_hang || warranty.ma_khach_hang || 'Khách lẻ'} readOnly />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Mã đơn hàng</label>
                            <input type="text" className="form-control" value={warranty.ma_don_hang || ''} readOnly />
                        </div>
                        <div className="col">
                            <label className="form-label">Lần bảo hành</label>
                            <input type="text" className="form-control" value={warranty.lan_bao_hanh || ''} readOnly />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Ngày bảo hành</label>
                            <input type="text" className="form-control" value={formatDate(warranty.ngay_bao_hanh)} readOnly />
                        </div>
                        <div className="col">
                            <label className="form-label">Hạn bảo hành</label>
                            <input type="text" className="form-control" value={formatDate(warranty.han_bao_hanh)} readOnly />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Nhân viên bảo hành</label>
                            <input type="text" className="form-control" value={warranty.ten_nhan_vien || 'Chưa phân công'} readOnly />
                        </div>
                        <div className="col">
                            <label className="form-label">Trạng thái</label>
                            <input type="text" className="form-control" value={warranty.trang_thai || ''} readOnly />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Tình trạng sản phẩm</label>
                            <input type="text" className="form-control" value={warranty.tinh_trang || ''} readOnly />
                        </div>
                        <div className="col">
                            <label className="form-label">Chi phí</label>
                            <input type="text" className="form-control" value={formatCurrency(warranty.chi_phi)} readOnly />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Nội dung bảo hành</label>
                            <textarea className="form-control" value={warranty.noi_dung || ''} rows="4" readOnly></textarea>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Ghi chú</label>
                            <textarea className="form-control" value={warranty.ghi_chu || ''} rows="3" readOnly></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
