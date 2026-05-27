import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import BackButton from '../../components/BackButton/BackButton';
const initiaState = {
    ten_san_pham: "",
    ngay_san_xuat: "",
    so_luong :"",
    mau_sac :"",
    kich_co:"",
    anh_sanpham:""
}
export default function Editkhohang() {
    const [state, setState] = useState(initiaState);

  
    const{ten_san_pham,ngay_san_xuat,so_luong,mau_sac,kich_co,anh_sanpham } = state;
  
    const {ma_kho_hang} = useParams();
  
    const navigate = useNavigate();
  
    useEffect(()=>{
      axios.get(`http://localhost:5000/api/getkhohang/${ma_kho_hang}`)
      .then((resp) => {
        const data = resp.data[0];
        // Format ngày về yyyy-mm-dd cho input type="date"
        if (data.ngay_san_xuat) {
          data.ngay_san_xuat = data.ngay_san_xuat.slice(0, 10);
        }
        setState({...data});
      });
    },[ma_kho_hang]);
    
    const handleInputChange = (e) =>{
      const{name, value} = e.target;
      setState(prev => ({...prev,[name]:value}));
    }


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!ten_san_pham || !ngay_san_xuat || !so_luong || !mau_sac){
            toast.error("Vui lòng nhập đủ thông tin ")
        } else{
            if(window.confirm("Bạn có muốn cập nhật thông tin  ?")){
                try {
                    await axios.put(`http://localhost:5000/api/updatekhohang/${ma_kho_hang}`,{
                        ten_san_pham,ngay_san_xuat,so_luong,mau_sac,kich_co,anh_sanpham
                    });
                    toast.success("Sửa sản phẩm thành công !");
                    navigate("/Indexkhohang");
                } catch (err) {
                    console.error("Lỗi cập nhật kho hàng:", err);
                    toast.error(err.response?.data || "Lỗi khi cập nhật!");
                }
            }
        }
    }
  return (
    <div>
      <BackButton />
      <h1 class="mb-0">Cập nhật kho hàng</h1>
    <hr />
    <form onSubmit={handleSubmit}  enctype="multipart/form-data" >
        <div class="row">
            <div class="col mb-3">
                <label class="form-label">Tên sản phẩm</label>
                <input type="text" name="ten_san_pham" class="form-control" placeholder="Tên sản phẩm" onChange={handleInputChange} value={ten_san_pham || "" } />
            </div>
            <div class="col mb-3">
                <label class="form-label">Ngày nhập kho</label>
                <input type="date" name="ngay_san_xuat" class="form-control" placeholder="Ngày nhập kho" onChange={handleInputChange} value={ngay_san_xuat || "" } />
            </div>
        </div>
        <div class="row">
            <div class="col mb-3">
                <label class="form-label">Số lượng</label>
                <input type="text" name="so_luong" class="form-control" placeholder="Màu sắc" onChange={handleInputChange} value={so_luong || "" } />
            </div>
            <div class="col mb-3">
                <label class="form-label">Màu sắc</label>
                <input type="text" name="mau_sac" class="form-control" placeholder="Màu sắc" onChange={handleInputChange} value={mau_sac || "" } />
            </div>

        </div>
        <div class="row">
            <div class="col mb-3">
                <label class="form-label">Kích cỡ</label>
                <input type="text" name="kich_co" class="form-control" placeholder="Màu sắc" onChange={handleInputChange} value={kich_co || "" } />
            </div>
        </div>
        <div class="row">
              <div class="col mb-3">
                <ImageUploader
                    label="Ảnh sản phẩm"
                    name="anh_sanpham"
                    value={anh_sanpham}
                    onUploaded={(url) => setState(prev => ({...prev, anh_sanpham: url}))}
                />
              </div>
              
              
          </div>
        
        <div class="row">
            <div class="d-grid">
                <button style={{marginLeft: '10px', marginTop: '30px'}} class="btn btn-warning">Cập nhật</button>
            </div>
        </div>
    </form>
    </div>
  )
}
