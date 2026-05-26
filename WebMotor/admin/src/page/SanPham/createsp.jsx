import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import BackButton from '../../components/BackButton/BackButton';

const initiaState = {
    ten_san_pham: "",
    gia: "",
    size: "",
    mau_sac: "",
    anh_sanpham: "",
    ma_danh_muc: "",
    soluong: "",
    mo_ta: "",
    dong_co: "",
    dung_tich: "",
    duong_kinh_hanh_trinh_piston: "",
    ti_so_nen: "",
    cong_suat_cuc_dai: "",
    mo_men_xoan_cuc_dai: "",
    bo_ly_hop: "",
    he_thong_danh_lua: "",
    he_thong_khoi_dong: "",
    hop_so: "",
    he_thong_truyen_dong: "",
    tieu_thu_nhien_lieu: "",
    khi_thai: "",
    he_thong_phun_xang: "",
    anhhover1: "",
    anhhover2: ""
};

export default function Createsp() {

    const [state , setState] = useState(initiaState);
    const [danhmucList, setdanhmucList] = useState([]);  // state lưu danh sách 

  const { ten_san_pham, gia, size, mau_sac, anh_sanpham, ma_danh_muc, soluong, mo_ta, dong_co, dung_tich, duong_kinh_hanh_trinh_piston, ti_so_nen, cong_suat_cuc_dai, mo_men_xoan_cuc_dai, bo_ly_hop, he_thong_danh_lua, he_thong_khoi_dong, hop_so, he_thong_truyen_dong, tieu_thu_nhien_lieu, khi_thai, he_thong_phun_xang } = state;


    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API để lấy danh sách các khoa
        axios.get("http://localhost:5000/api/getalldm")
            .then((response) => {
                setdanhmucList(response.data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Lỗi khi lấy danh sách khoa");
            });
    }, []);

const handleSubmit = (e) => {
    e.preventDefault();


    // Kiểm tra thiếu trường nào thì báo lỗi
    if (
        !ten_san_pham || !gia || !size || !mau_sac || !anh_sanpham || !ma_danh_muc || !soluong || !mo_ta ||
        !dong_co || !dung_tich || !duong_kinh_hanh_trinh_piston || !ti_so_nen || !cong_suat_cuc_dai ||
        !mo_men_xoan_cuc_dai || !bo_ly_hop || !he_thong_danh_lua || !he_thong_khoi_dong || !hop_so ||
        !he_thong_truyen_dong || !tieu_thu_nhien_lieu || !khi_thai || !he_thong_phun_xang
    ) {
        toast.error("Vui lòng nhập đầy đủ tất cả thông tin sản phẩm.");
    } else {
        axios.post("http://localhost:5000/api/createsp", state)
            .then(() => {
                setState({
                    ten_san_pham: "", gia: "", size: "", mau_sac: "", anh_sanpham: "", ma_danh_muc: "",
                    soluong: "", mo_ta: "", dong_co: "", dung_tich: "", duong_kinh_hanh_trinh_piston: "",
                    ti_so_nen: "", cong_suat_cuc_dai: "", mo_men_xoan_cuc_dai: "", bo_ly_hop: "",
                    he_thong_danh_lua: "", he_thong_khoi_dong: "", hop_so: "", he_thong_truyen_dong: "",
                    tieu_thu_nhien_lieu: "", khi_thai: "", he_thong_phun_xang: ""
                });
                toast.success("Thêm sản phẩm thành công!");
                setTimeout(() => navigate("/Indexsp"), 500);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Đã xảy ra lỗi khi thêm sản phẩm.");
            });
    }
};



    const handleInputChange = (e) =>{
        const{name,value} = e.target;
        setState({...state,[name]:value});
    }

    
  return (
    <div>
    <BackButton />
    <h3 className="mb-0">Thêm sản phẩm</h3>
    <hr />
    <form onSubmit={handleSubmit} enctype="multipart/form-data">
      
        <div className="row mb-3">
            <div className="col">
                <input type="text" name="ten_san_pham" onChange={handleInputChange} value={ten_san_pham} className="form-control" placeholder="Tên sản phẩm "/>
            </div>
            <div className="col">
                <input type="text" name="gia" onChange={handleInputChange} value={gia} className="form-control" placeholder="Giá"/>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col">
                <input type="text" name="size" onChange={handleInputChange} value={size} className="form-control" placeholder="Kích cỡ phân khối"/>
            </div>
            <div className="col">
                <input type="text" name="mau_sac" onChange={handleInputChange} value={mau_sac} className="form-control" placeholder="Màu sắc"/>
            </div>

        </div>
        <div className="row mb-3">
            <div className="col-4">
                <ImageUploader
                    label="Ảnh chính"
                    name="anh_sanpham"
                    value={anh_sanpham}
                    onUploaded={(url) => setState({...state, anh_sanpham: url})}
                />
            </div>
            <div className="col-4">
                <ImageUploader
                    label="Ảnh hover 1"
                    name="anhhover1"
                    value={state.anhhover1}
                    onUploaded={(url) => setState({...state, anhhover1: url})}
                />
            </div>
            <div className="col-4">
                <ImageUploader
                    label="Ảnh hover 2"
                    name="anhhover2"
                    value={state.anhhover2}
                    onUploaded={(url) => setState({...state, anhhover2: url})}
                />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col">
                        <select
                            name="ma_danh_muc"
                            value={ma_danh_muc}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Chọn danh mục</option>
                            {danhmucList.map((danh_muc) => (
                                <option key={danh_muc.ma_danh_muc} value={danh_muc.ma_danh_muc}>
                                    {danh_muc.ten_danh_muc}
                                </option>
                            ))}
                        </select>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col">
                <input type="text" onChange={handleInputChange} value={soluong} name="soluong" className="form-control" placeholder="Số lượng"/>
            </div>
            <div className="col">
            <textarea name="mo_ta"onChange={handleInputChange} value={mo_ta}  className="form-control" placeholder="Mô tả"></textarea>
            </div>
            
        </div>
        <div className="row mb-3">
            <div className="col">
                <input type="text" name="dong_co" onChange={handleInputChange} value={state.dong_co} className="form-control" placeholder="Động cơ" />
            </div>
            <div className="col">
                <input type="text" name="dung_tich" onChange={handleInputChange} value={state.dung_tich} className="form-control" placeholder="Dung tích" />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col">
                <input type="text" name="duong_kinh_hanh_trinh_piston" onChange={handleInputChange} value={state.duong_kinh_hanh_trinh_piston} className="form-control" placeholder="Đường kính x hành trình piston" />
            </div>
            <div className="col">
                <input type="text" name="ti_so_nen" onChange={handleInputChange} value={state.ti_so_nen} className="form-control" placeholder="Tỉ số nén" />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col">
                <input type="text" name="cong_suat_cuc_dai" onChange={handleInputChange} value={state.cong_suat_cuc_dai} className="form-control" placeholder="Công suất cực đại" />
            </div>
            <div className="col">
                <input type="text" name="mo_men_xoan_cuc_dai" onChange={handleInputChange} value={state.mo_men_xoan_cuc_dai} className="form-control" placeholder="Mô men xoắn cực đại" />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col">
                <input type="text" name="bo_ly_hop" onChange={handleInputChange} value={state.bo_ly_hop} className="form-control" placeholder="Bộ ly hợp" />
            </div>
            <div className="col">
                <input type="text" name="he_thong_danh_lua" onChange={handleInputChange} value={state.he_thong_danh_lua} className="form-control" placeholder="Hệ thống đánh lửa" />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col">
                <input type="text" name="he_thong_khoi_dong" onChange={handleInputChange} value={state.he_thong_khoi_dong} className="form-control" placeholder="Hệ thống khởi động" />
            </div>
            <div className="col">
                <input type="text" name="hop_so" onChange={handleInputChange} value={state.hop_so} className="form-control" placeholder="Hộp số" />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col">
                <input type="text" name="he_thong_truyen_dong" onChange={handleInputChange} value={state.he_thong_truyen_dong} className="form-control" placeholder="Hệ thống truyền động" />
            </div>
            <div className="col">
                <input type="text" name="tieu_thu_nhien_lieu" onChange={handleInputChange} value={state.tieu_thu_nhien_lieu} className="form-control" placeholder="Tiêu thụ nhiên liệu" />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col">
                <input type="text" name="khi_thai" onChange={handleInputChange} value={state.khi_thai} className="form-control" placeholder="Khí thải" />
            </div>
            <div className="col">
                <input type="text" name="he_thong_phun_xang" onChange={handleInputChange} value={state.he_thong_phun_xang} className="form-control" placeholder="Hệ thống phun xăng" />
            </div>
        </div>


        <div className="row">
            <div className="d-grid">
                <button style={{marginLeft: '10px'}} type="submit" className="btn btn-primary">Thêm</button>
            </div>
        </div>
    </form>
  </div>
  )
}
