import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';

const initialState = {
    ngay_nhap: new Date().toISOString().slice(0, 10),
    ten_ncc: '',
    sdt: '',
    ma_nhan_vien: '',
    email: '',
    dia_chi: ''
};

const initialItem = {
    ma_san_pham: '',
    ten_san_pham: '',
    so_luong: 1,
    don_gia: 0,
    kich_co: '',
    mau_sac: '',
    anh_san_pham: ''
};

export default function Createhdn() {
    const [state, setState] = useState(initialState);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/getallsp').then(res => setProducts(res.data || []));
        axios.get('http://localhost:5000/api/getallnv').then(res => setEmployees(res.data || []));
    }, []);

    const formatVND = (n) => (Number(n) || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const addItem = () => setItems([...items, { ...initialItem }]);

    const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

    const updateItem = (idx, field, value) => {
        const newItems = [...items];
        newItems[idx][field] = value;

        // Auto-fill từ sản phẩm
        if (field === 'ma_san_pham') {
            const sp = products.find(p => String(p.ma_san_pham) === String(value));
            if (sp) {
                newItems[idx].ten_san_pham = sp.ten_san_pham;
                newItems[idx].don_gia = sp.gia;
                newItems[idx].mau_sac = sp.mau_sac || '';
                newItems[idx].kich_co = sp.size || '';
                newItems[idx].anh_san_pham = sp.anh_sanpham || '';
            }
        }
        setItems(newItems);
    };

    const tongTien = items.reduce((sum, it) => sum + (Number(it.don_gia) || 0) * (Number(it.so_luong) || 0), 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!state.ten_ncc || !state.sdt || !state.ma_nhan_vien || !state.email || !state.dia_chi) {
            toast.error('Vui lòng nhập đầy đủ thông tin nhà cung cấp');
            return;
        }
        if (items.length === 0) {
            toast.error('Vui lòng thêm ít nhất 1 sản phẩm');
            return;
        }
        for (const it of items) {
            if (!it.ma_san_pham || !it.so_luong || it.so_luong <= 0 || !it.don_gia) {
                toast.error('Vui lòng nhập đầy đủ thông tin các sản phẩm');
                return;
            }
        }

        axios.post('http://localhost:5000/api/createhdn', { ...state, chi_tiet: items })
            .then(() => {
                toast.success('Thêm hóa đơn nhập thành công!');
                setTimeout(() => navigate('/Indexhdn'), 500);
            })
            .catch(err => {
                toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
            });
    };

    return (
        <div>
            <BackButton />
            <h3 className="mb-3">Tạo hóa đơn nhập</h3>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Thông tin nhà cung cấp</h6>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Tên nhà cung cấp</label>
                                <input type="text" name="ten_ncc" onChange={handleInputChange} value={state.ten_ncc} className="form-control" placeholder="Tên nhà cung cấp" />
                            </div>
                            <div className="col">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" onChange={handleInputChange} value={state.email} className="form-control" placeholder="email@ncc.com" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Số điện thoại</label>
                                <input type="text" name="sdt" onChange={handleInputChange} value={state.sdt} className="form-control" placeholder="0901xxxxxx" />
                            </div>
                            <div className="col">
                                <label className="form-label">Nhân viên nhập</label>
                                <select name="ma_nhan_vien" onChange={handleInputChange} value={state.ma_nhan_vien} className="form-control">
                                    <option value="">-- Chọn nhân viên --</option>
                                    {employees.map(nv => (
                                        <option key={nv.ma_nhan_vien} value={nv.ma_nhan_vien}>{nv.ten_nhan_vien}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Ngày nhập</label>
                                <input type="date" name="ngay_nhap" onChange={handleInputChange} value={state.ngay_nhap} className="form-control" />
                            </div>
                            <div className="col">
                                <label className="form-label">Địa chỉ</label>
                                <input type="text" name="dia_chi" onChange={handleInputChange} value={state.dia_chi} className="form-control" placeholder="Địa chỉ NCC" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-primary">Sản phẩm nhập kho</h6>
                        <button type="button" onClick={addItem} className="btn btn-sm btn-primary">
                            <i className="fas fa-plus mr-1"></i> Thêm sản phẩm
                        </button>
                    </div>
                    <div className="card-body">
                        {items.length === 0 ? (
                            <p className="text-center text-muted my-3">Chưa có sản phẩm nào. Bấm "Thêm sản phẩm" để bắt đầu.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: 50 }}>#</th>
                                            <th style={{ width: 280 }}>Sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Thành tiền</th>
                                            <th style={{ width: 80 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((it, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    <select
                                                        value={it.ma_san_pham}
                                                        onChange={(e) => updateItem(idx, 'ma_san_pham', e.target.value)}
                                                        className="form-control form-control-sm"
                                                    >
                                                        <option value="">-- Chọn --</option>
                                                        {products.map(p => (
                                                            <option key={p.ma_san_pham} value={p.ma_san_pham}>{p.ten_san_pham}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={it.so_luong}
                                                        onChange={(e) => updateItem(idx, 'so_luong', parseInt(e.target.value) || 0)}
                                                        className="form-control form-control-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={it.don_gia}
                                                        onChange={(e) => updateItem(idx, 'don_gia', parseInt(e.target.value) || 0)}
                                                        className="form-control form-control-sm"
                                                    />
                                                </td>
                                                <td className="font-weight-bold text-primary">
                                                    {formatVND(it.so_luong * it.don_gia)}
                                                </td>
                                                <td>
                                                    <button type="button" onClick={() => removeItem(idx)} className="btn btn-sm btn-danger">
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="4" className="text-right font-weight-bold">Tổng cộng:</td>
                                            <td colSpan="2" className="font-weight-bold text-danger" style={{ fontSize: 16 }}>
                                                {formatVND(tongTien)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <button type="button" onClick={() => navigate('/Indexhdn')} className="btn btn-secondary mr-2">Hủy</button>
                    <button type="submit" className="btn btn-primary">Tạo hóa đơn nhập</button>
                </div>
            </form>
        </div>
    );
}
