import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../../components/BackButton/BackButton';

const initialState = {
    ngay_nhap: '',
    ten_ncc: '',
    sdt: '',
    ma_nhan_vien: '',
    email: '',
    dia_chi: ''
};

export default function Edithoadonnhap() {
    const [state, setState] = useState(initialState);
    const [employees, setEmployees] = useState([]);
    const { ma_hoa_don } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/getallnv').then(res => setEmployees(res.data || []));
        axios.get(`http://localhost:5000/api/gethdn/${ma_hoa_don}`)
            .then(res => {
                const bill = res.data?.[0];
                if (!bill) return;
                setState({
                    ngay_nhap: bill.ngay_nhap ? bill.ngay_nhap.slice(0, 10) : '',
                    ten_ncc: bill.ten_ncc || '',
                    sdt: bill.sdt || '',
                    ma_nhan_vien: bill.ma_nhan_vien || '',
                    email: bill.email || '',
                    dia_chi: bill.dia_chi || ''
                });
            })
            .catch(() => toast.error('Không lấy được thông tin hóa đơn nhập'));
    }, [ma_hoa_don]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state.ngay_nhap || !state.ten_ncc || !state.sdt || !state.email || !state.dia_chi) {
            toast.error('Vui lòng nhập đầy đủ thông tin hóa đơn nhập');
            return;
        }

        axios.put(`http://localhost:5000/api/updatehdn/${ma_hoa_don}`, state)
            .then(() => {
                toast.success('Cập nhật hóa đơn nhập thành công!');
                setTimeout(() => navigate('/Indexhdn'), 500);
            })
            .catch(err => toast.error(err.response?.data?.message || 'Cập nhật thất bại'));
    };

    return (
        <div>
            <BackButton />
            <h3 className="mb-3">Cập nhật hóa đơn nhập HDN{ma_hoa_don}</h3>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Thông tin nhà cung cấp</h6>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Mã hóa đơn</label>
                                <input type="text" className="form-control" value={`HDN${ma_hoa_don}`} readOnly />
                            </div>
                            <div className="col">
                                <label className="form-label">Ngày nhập</label>
                                <input type="date" name="ngay_nhap" onChange={handleInputChange} value={state.ngay_nhap} className="form-control" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Tên nhà cung cấp</label>
                                <input type="text" name="ten_ncc" onChange={handleInputChange} value={state.ten_ncc} className="form-control" />
                            </div>
                            <div className="col">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" onChange={handleInputChange} value={state.email} className="form-control" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Số điện thoại</label>
                                <input type="text" name="sdt" onChange={handleInputChange} value={state.sdt} className="form-control" />
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
                                <label className="form-label">Địa chỉ</label>
                                <input type="text" name="dia_chi" onChange={handleInputChange} value={state.dia_chi} className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <button type="button" onClick={() => navigate('/Indexhdn')} className="btn btn-secondary mr-2">Hủy</button>
                    <button type="submit" className="btn btn-primary">Cập nhật</button>
                </div>
            </form>
        </div>
    )
}
