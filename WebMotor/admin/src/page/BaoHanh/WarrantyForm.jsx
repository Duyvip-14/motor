import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../../components/BackButton/BackButton';

const initialState = {
    ma_don_hang: "",
    ma_san_pham: "",
    ma_khach_hang: "",
    ma_nhan_vien: "",
    lan_bao_hanh: 1,
    ngay_bao_hanh: new Date().toISOString().slice(0, 10),
    han_bao_hanh: "",
    noi_dung: "",
    tinh_trang: "",
    trang_thai: "Đang xử lý",
    chi_phi: 0,
    ghi_chu: "",
};

export default function WarrantyForm({ mode }) {
    const [state, setState] = useState(initialState);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const { ma_bao_hanh } = useParams();
    const navigate = useNavigate();
    const isEdit = mode === 'edit';

    useEffect(() => {
        axios.get("http://localhost:5000/api/getallsp").then((res) => setProducts(res.data));
        axios.get("http://localhost:5000/api/getallkh").then((res) => setCustomers(res.data));
        axios.get("http://localhost:5000/api/getallnv").then((res) => setEmployees(res.data));

        if (isEdit && ma_bao_hanh) {
            axios.get(`http://localhost:5000/api/getbaohanh/${ma_bao_hanh}`).then((res) => {
                const warranty = res.data[0];
                if (!warranty) return;
                setState({
                    ma_don_hang: warranty.ma_don_hang || "",
                    ma_san_pham: warranty.ma_san_pham || "",
                    ma_khach_hang: warranty.ma_khach_hang || "",
                    ma_nhan_vien: warranty.ma_nhan_vien || "",
                    lan_bao_hanh: warranty.lan_bao_hanh || 1,
                    ngay_bao_hanh: warranty.ngay_bao_hanh ? warranty.ngay_bao_hanh.slice(0, 10) : "",
                    han_bao_hanh: warranty.han_bao_hanh ? warranty.han_bao_hanh.slice(0, 10) : "",
                    noi_dung: warranty.noi_dung || "",
                    tinh_trang: warranty.tinh_trang || "",
                    trang_thai: warranty.trang_thai || "Đang xử lý",
                    chi_phi: warranty.chi_phi || 0,
                    ghi_chu: warranty.ghi_chu || "",
                });
            });
        }
    }, [isEdit, ma_bao_hanh]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state.ma_san_pham || !state.ngay_bao_hanh || !state.noi_dung) {
            toast.error("Vui lòng nhập sản phẩm, ngày bảo hành và nội dung bảo hành");
            return;
        }

        const request = isEdit
            ? axios.put(`http://localhost:5000/api/updatebaohanh/${ma_bao_hanh}`, state)
            : axios.post("http://localhost:5000/api/createbaohanh", state);

        request.then(() => {
            toast.success(isEdit ? "Cập nhật bảo hành thành công !" : "Thêm bảo hành thành công !");
            setTimeout(() => navigate("/Indexbaohanh"), 500);
        }).catch((err) => toast.error(err.response?.data?.message || "Lỗi lưu bảo hành"));
    };

    return (
        <div>
            <BackButton />
            <h3 className="mb-0">{isEdit ? 'Cập nhật bảo hành' : 'Thêm bảo hành'}</h3>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Sản phẩm bảo hành</label>
                        <select name="ma_san_pham" onChange={handleInputChange} value={state.ma_san_pham} className="form-control">
                            <option value="">Chọn sản phẩm</option>
                            {products.map((product) => <option key={product.ma_san_pham} value={product.ma_san_pham}>{product.ten_san_pham}</option>)}
                        </select>
                    </div>
                    <div className="col">
                        <label className="form-label">Khách hàng</label>
                        <select name="ma_khach_hang" onChange={handleInputChange} value={state.ma_khach_hang} className="form-control">
                            <option value="">Khách lẻ / Không rõ</option>
                            {customers.map((customer) => <option key={customer.ma_khach_hang} value={customer.ma_khach_hang}>{customer.ten_khach_hang}</option>)}
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Mã đơn hàng</label>
                        <input type="number" name="ma_don_hang" onChange={handleInputChange} value={state.ma_don_hang} className="form-control" placeholder="Mã đơn hàng nếu có" />
                    </div>
                    <div className="col">
                        <label className="form-label">Lần bảo hành</label>
                        <input type="number" min="1" name="lan_bao_hanh" onChange={handleInputChange} value={state.lan_bao_hanh} className="form-control" />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Ngày bảo hành</label>
                        <input type="date" name="ngay_bao_hanh" onChange={handleInputChange} value={state.ngay_bao_hanh} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Hạn bảo hành</label>
                        <input type="date" name="han_bao_hanh" onChange={handleInputChange} value={state.han_bao_hanh} className="form-control" />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Nhân viên bảo hành</label>
                        <select name="ma_nhan_vien" onChange={handleInputChange} value={state.ma_nhan_vien} className="form-control">
                            <option value="">Chưa phân công</option>
                            {employees.map((employee) => <option key={employee.ma_nhan_vien} value={employee.ma_nhan_vien}>{employee.ten_nhan_vien}</option>)}
                        </select>
                    </div>
                    <div className="col">
                        <label className="form-label">Trạng thái</label>
                        <select name="trang_thai" onChange={handleInputChange} value={state.trang_thai} className="form-control">
                            <option value="Đang xử lý">Đang xử lý</option>
                            <option value="Đang chờ linh kiện">Đang chờ linh kiện</option>
                            <option value="Hoàn thành">Hoàn thành</option>
                            <option value="Từ chối bảo hành">Từ chối bảo hành</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Tình trạng sản phẩm</label>
                        <input type="text" name="tinh_trang" onChange={handleInputChange} value={state.tinh_trang} className="form-control" placeholder="Ví dụ: lỗi đề, chảy dầu, lỗi điện" />
                    </div>
                    <div className="col">
                        <label className="form-label">Chi phí</label>
                        <input type="number" min="0" name="chi_phi" onChange={handleInputChange} value={state.chi_phi} className="form-control" />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Nội dung bảo hành</label>
                        <textarea name="noi_dung" onChange={handleInputChange} value={state.noi_dung} className="form-control" rows="4" placeholder="Mô tả nội dung kiểm tra/sửa chữa/bảo hành"></textarea>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Ghi chú</label>
                        <textarea name="ghi_chu" onChange={handleInputChange} value={state.ghi_chu} className="form-control" rows="3" placeholder="Ghi chú thêm"></textarea>
                    </div>
                </div>

                <div className="row">
                    <div className="d-grid">
                        <button style={{ marginLeft: '10px' }} type="submit" className="btn btn-primary">{isEdit ? 'Cập nhật' : 'Thêm'}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
