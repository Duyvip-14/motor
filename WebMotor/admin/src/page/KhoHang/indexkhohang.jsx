import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';
import Pagination from '../../components/Pagination/Pagination';

export default function Indexkhohang() {

    const [data ,setData] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage, setItemsPerPage] = useState(5);
        const [previewImg, setPreviewImg] = useState(null);
    
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(data.length / itemsPerPage);

    
    const loadData =  async() =>{
        const response = await axios.get("http://localhost:5000/api/getallkhohang");
        setData(response.data);
        };

        useEffect(()=>{
            loadData();
        },[]);

        const handleSearch = async (e) => {
            const searchTerm = e.target.value;
            if (!searchTerm) {
                loadData();
            } else {
                try {
                    const response = await axios.get(`http://localhost:5000/api/searchkhohang/${searchTerm}`);
                    setData(response.data);
                } catch (error) {
                    console.error("Error searching data", error);
                }
            }
        };
        

        const deleteKH = (ma_kho_hang) =>{
            if(window.confirm("Bạn có muốn xóa sản phẩm này không ?")){
                axios.delete(`http://localhost:5000/api/deletekhohang/${ma_kho_hang}`);
                toast.success('Xóa sản phẩm thành công !', {
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
                setTimeout(()=>loadData(),500);
            }
        }

    // Xử lý URL ảnh: nếu đã là URL MinIO thì dùng nguyên, nếu là path local thì trỏ về backend
    const getImageUrl = (url) => {
        if (!url) return '/Images/default.jpg';
        if (url.startsWith('http')) return url; // URL MinIO hoặc URL đầy đủ
        return `http://localhost:5000${url}`; // Path local cũ
    };

  return (
    <>
    <div>
      <div class="card shadow mb-4">
        <div class="d-flex align-items-center justify-content-between card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Dữ Liệu Kho Hàng</h6>
            <Link to="/Createkhohang" class="btn btn-primary">Thêm kho hàng</Link>
        </div>
        <div className="d-flex align-items-center  card-header ">
            <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <label htmlFor="">Tìm kiếm :</label>
                        <input style={{marginLeft:'5px'}}type="text" onChange={handleSearch} className="form-control form-control-sm" placeholder="nhập dữ liệu tìm kiếm" aria-label="Search" aria-describedby="basic-addon2"/>
                    </div>
                </form>
            </div>
        <div class="card-body">
            <div class="table-responsive">
                                                    <div>
                        <label className="mr-2">Số bản ghi/trang:</label>
                        <select
                        className="form-control form-control-sm d-inline-block"
                        style={{ width: "80px" }}
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(parseInt(e.target.value));
                            setCurrentPage(1); // reset về trang đầu
                        }}
                        >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        </select>
                    </div>
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ảnh sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Ngày sản xuất</th>
                            <th>Số lượng</th>
                            <th>Chi tiết</th>
                            <th>Sửa</th>
                            <th>Xóa</th>

                        </tr>
                    </thead>

                    <tbody>
                        {currentItems.map((item,index)=>{
                            return( 
                            <tr key={item.ma_kho_hang}>
                                <td>{index+1}</td>
                                <td>
                                    <img
                                        style={{borderRadius: '5px', cursor: 'pointer'}}
                                        src={getImageUrl(item.anh_sanpham)}
                                        width='60' height='60'
                                        className="img img-responsive"
                                        onClick={() => setPreviewImg(getImageUrl(item.anh_sanpham))}
                                    />
                                </td>
                                <td>{item.ten_san_pham}</td>
                                <td>{item.ngay_san_xuat.slice(0, 10)}</td>
                                <td>{item.so_luong}</td>
                                <td><Link to={`/Viewkhohang/${item.ma_kho_hang}`} type="button" class="btn btn-primary">Chi Tiết</Link></td>
                                <td><Link to={`/Updatekhohang/${item.ma_kho_hang}`} class="btn btn-warning">Sửa</Link></td>
                                <td>
                                        <button type='submit' onClick={() => deleteKH(item.ma_kho_hang)} class='btn btn-danger'>Xóa</button>
                                </td>
                            </tr>)
                        })}
                       
                    </tbody>
                </table>

                                                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    </div>
    </div>

    {/* Modal xem ảnh lớn */}
    {previewImg && (
        <div onClick={() => setPreviewImg(null)} style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
            alignItems: 'center', zIndex: 9999, cursor: 'pointer'
        }}>
            <img src={previewImg} alt="Preview" style={{
                maxWidth: '80%', maxHeight: '80%', borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }} />
        </div>
    )}
    </>
  )
}
