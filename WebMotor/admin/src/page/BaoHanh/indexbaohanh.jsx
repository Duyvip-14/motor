import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast, Flip } from 'react-toastify';
import Pagination from '../../components/Pagination/Pagination';

export default function Indexbaohanh() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const formatDate = (date) => date ? new Date(date).toLocaleDateString('vi-VN') : '';

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getallbaohanh");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSearch = async (e) => {
        const searchTerm = e.target.value;
        if (!searchTerm) {
            loadData();
        } else {
            const response = await axios.get(`http://localhost:5000/api/searchbaohanh/${searchTerm}`);
            setData(response.data);
        }
    };

    const deleteWarranty = (ma_bao_hanh) => {
        if (window.confirm("Bạn có muốn xóa lịch sử bảo hành này không ?")) {
            axios.delete(`http://localhost:5000/api/deletebaohanh/${ma_bao_hanh}`);
            toast.success('Xóa bảo hành thành công !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
            setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div className="card shadow mb-4">
            <div className="d-flex align-items-center justify-content-between card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Dữ Liệu Bảo Hành</h6>
                <Link to="/Createbaohanh" className="btn btn-primary">Thêm bảo hành</Link>
            </div>
            <div className="d-flex align-items-center card-header">
                <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <label htmlFor="">Tìm kiếm :</label>
                        <input style={{ marginLeft: '5px' }} type="text" onChange={handleSearch} className="form-control form-control-sm" placeholder="sản phẩm, khách hàng, nhân viên, trạng thái" />
                    </div>
                </form>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <div>
                        <label className="mr-2">Số bản ghi/trang:</label>
                        <select className="form-control form-control-sm d-inline-block" style={{ width: "80px" }} value={itemsPerPage} onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã BH</th>
                                <th>Sản phẩm</th>
                                <th>Khách hàng</th>
                                <th>Lần</th>
                                <th>Ngày BH</th>
                                <th>Hạn BH</th>
                                <th>Nhân viên</th>
                                <th>Trạng thái</th>
                                <th>Chi tiết</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={item.ma_bao_hanh}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{item.ma_bao_hanh}</td>
                                    <td>{item.ten_san_pham || item.ma_san_pham}</td>
                                    <td>{item.ten_khach_hang || item.ma_khach_hang || 'Khách lẻ'}</td>
                                    <td>{item.lan_bao_hanh}</td>
                                    <td>{formatDate(item.ngay_bao_hanh)}</td>
                                    <td>{formatDate(item.han_bao_hanh)}</td>
                                    <td>{item.ten_nhan_vien || 'Chưa phân công'}</td>
                                    <td>{item.trang_thai}</td>
                                    <td><Link to={`/Viewbaohanh/${item.ma_bao_hanh}`} type="button" className="btn btn-primary">Chi Tiết</Link></td>
                                    <td><Link to={`/Updatebaohanh/${item.ma_bao_hanh}`} className="btn btn-warning">Sửa</Link></td>
                                    <td><button type='button' onClick={() => deleteWarranty(item.ma_bao_hanh)} className='btn btn-danger'>Xóa</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            </div>
        </div>
    )
}
