import React, { Fragment, useEffect, useState } from 'react'
import Payment from '../../until/detail';
import AddProduct from '../../until/cart';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Details() {
    Payment();
    AddProduct();

    const [sanpham ,setData] = useState({});
    const [allsanPhamSoSanh, setallSanPhamSoSanh] = useState(null);
    const [sanPhamSoSanh, setSanPhamSoSanh] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    console.log(sanPhamSoSanh)


    const{ma_san_pham} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/getsp/${ma_san_pham}`)
        .then((resp) => setData({...resp.data[0]}));
    },[ma_san_pham]);

    const loadData = async() =>{
        const response = await axios.get("http://localhost:5000/api/getallsp");
        setallSanPhamSoSanh(response.data);
    };

    useEffect(()=>{
        loadData();
    },[]);


    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };  

  return (
    <Fragment>
        <main>
            <div class="container1">
            <div class="container-product-single">
                    <div class="imgs">
                        <div class="link-page">
                            <a href="./index.html" class="link-page__homepage">Trang chủ</a>
                            <span>/</span>
                            <a href="./product-detail.html" class="link-page__currentPage">Xe máy Motor</a>
                        </div>
                        <div class="index-img">
                            <div class="index-img__item active"></div>
                            <div class="index-img__item"></div>
                            <div class="index-img__item"></div>
                        </div>
                        <div class="product-single-img">
                            <img class="product-img__main" src={sanpham.anh_sanpham} alt=""/>
                            <div class="product-img__option">
                                <div  class="product-img__option-item active">
                                    <img src={sanpham.anh_sanpham} alt=""/>
                                </div>
                                <div  class="product-img__option-item active">
                                    <img src={sanpham.anhhover1} alt=""/>
                                </div>
                                <div class="product-img__option-item">
                                    <img src={sanpham.anhhover2} alt=""/>
    
                                </div>                                                   
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <h1 class="content__heading">{sanpham.ten_san_pham}</h1>
                        <div class="review-rating">
                            <p class="review-label">
                                Đã bán(web): 15
                            </p>  
                                              
                        </div>
                        <div class="review-rating">
                            <p class="review-label">
                                Số lượng còn: <span class="product-quantity">{sanpham.soluong}</span> sản phẩm
                            </p>  
                        </div>

                        <p class="content__price">{formatCurrency(sanpham.gia)}</p>
                        <div class="content__discount">{sanpham.thongbao}</div>
                        <div class="content__color">
                            <p class="content__color-heading">Màu sắc: <b>Đen</b></p>
                            <div class="content__color-option">
                                <div class="content__color-item active" title='{"color":"Hồng Nhạt","disabled":["36","40","42"]}' >
                                    <div style={{backgroundImage: 'url(https://media3.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/January2024/mau23CMAW.AT003.8_31.jpg)'}}></div>
                                </div>
                                <div class="content__color-item active" title='{"color":"Trắng","disabled":["36","43","44"]}' >
                                <div   div style={{backgroundImage: 'url(https://media3.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/October2023/promaxs3_trangg_8.jpg)'}}></div>
                                </div>
                                <div class="content__color-item active" title='{"color":"Xanh Rêu","disabled":["36,40,42"]}' >
                                    <div style={{backgroundImage: 'url(https://media3.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/January2024/mau23CMAW.AT003.17_62.jpg)'}}></div>
                                </div>
                                <div class="content__color-item active" title='{"color":"Đen","disabled":["36,40,42"]}' >
                                    <div style={{backgroundImage: 'url(https://media3.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/January2024/mau23CMAW.AT003.23.jpg)'}}></div>
                                </div>
                                <div class="content__color-item active" title='{"color":"Xanh","disabled":["36,40,42"]}' >
                                    <div style={{backgroundImage: 'url(https://media3.coolmate.me/cdn-cgi/image/width=160,height=160,quality=80,format=auto/uploads/March2024/promax_aqua.jpg)'}}></div>
                                </div>
                            </div>
                        </div>
                        <div class="content__size">
                            <div class="content__size-header">
                                <span>Kích thước phân khối:(cc)</span>
                            </div>
                            <div class="content__size-option">
                                <div class="btn-size size-36">150</div>
                                <div class="btn-size size-37">350</div>
                                <div class="btn-size size-38">650</div>
                                <div class="btn-size size-43 is-disabled">1000</div>
                                <div class="btn-size size-44 is-disabled">1250</div>
                                </div>

                            <div class="product-single__actions">
                                <div class="quantity">

                                    <button class="btn-decrease" disabled={parseInt(sanpham.soluong) <= 0}>-</button>
                                    <span>1</span>
                                    <button class="btn-increase" disabled={parseInt(sanpham.soluong) <= 0}>+</button>
                                </div>
                                {parseInt(sanpham.soluong) <= 0 ? (
                                    <div
                                        className="btn btn-addCart"
                                        style={{
                                            background: '#9ca3af',
                                            color: '#fff',
                                            cursor: 'not-allowed',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <i className="fa-solid fa-ban" style={{ marginRight: 8 }}></i>
                                        Hết hàng - Tạm hết
                                    </div>
                                ) : (
                                    <div class="btn btn-addCart">
                                        Chọn màu sắc và phân khối xe
                                    </div>
                                )}
                            </div>
                        </div>
                        <div class="product-single__policy">
                            <div class="product-policy__item">
                                <div class="product-policy__icon">
                                    <img src="https://www.coolmate.me/images/icons/icon3.svg" alt=""/>
                                </div>
                                <p>Đổi trả cực dễ chỉ cần số điện thoại</p>
                            </div>
                            <div class="product-policy__item">
                                <div class="product-policy__icon">
                                    <img src="https://www.coolmate.me/images/icons/icon4.svg" alt=""/>
                                </div>
                                <p>Miễn phí vận chuyển cho đơn hàng trên 200k</p>
                            </div>
                            <div class="product-policy__item">
                                <div class="product-policy__icon">
                                    <img src="https://www.coolmate.me/images/icons/icon5.svg" alt=""/>
                                </div>
                                <p>60 ngày đổi trả vì bất kỳ lý do gì</p>
                            </div>
                            <div class="product-policy__item">
                                <div class="product-policy__icon">
                                    <img src="https://www.coolmate.me/images/icons/icon2.svg" alt=""/>
                                </div>
                                <p>Hotline 1900.27.27.37 hỗ trợ từ 8h30 - 22h mỗi ngày</p>
                            </div>
                            <div class="product-policy__item">
                                <div class="product-policy__icon">
                                    <img src="https://www.coolmate.me/images/icons/icon1.svg" alt=""/>
                                </div>
                                <p>Đến tận nơi nhận hàng trả, hoàn tiền trong 24h</p>
                            </div>
                            <div class="product-policy__item">
                                <div class="product-policy__icon">
                                    <img src="https://www.coolmate.me/images/icons/icon6.svg" alt=""/>
                                </div>
                                <p>Giao hàng 2-5 ngày(có thể lâu hơn do Covid19)</p>
                            </div>
                        </div>

                    </div>                    
                </div>

                <div className="detail-wrap">
                <div className="compare-container">
                    <div className="detail">
                         <div className="detail__header-row">
                            <h2 className="detail__heading">Chi tiết sản phẩm</h2>
                            <h2  className="detail__heading"  onClick={() => setModalOpen(true)} style={{ cursor: 'pointer',left:'20px' }}>
                            Thêm sản phẩm so sánh <FontAwesomeIcon icon={faPlus} className="icon-plus" />
                            </h2>

                         </div>
                            <div className="product-header">
                                <img
                                src={sanpham.anh_sanpham} // Thay bằng đường dẫn ảnh từ server hoặc local
                                alt="Ảnh xe Yamaha MT-10 SP"
                                className="product-image"
                                style={{width:"100px",height:"70px"}}
                                />
                                <div className="product-info">
                                <h2 className="product-name">{sanpham.ten_san_pham}</h2>
                                <p className="product-price">Giá: {formatCurrency(sanpham.gia)}</p>
                                </div>
                            </div>
                            <div className="dongco-wrapper">
                                <div className="dongco-title">
                                    <span>Động cơ</span>
                                    <div className="dongco-line"></div>
                                </div>
                                <table className="dongco-table">
                                    <tbody>
                                    <tr><td>Động cơ</td><td>{sanpham.dong_co}</td></tr>
                                    <tr><td>Dung tích</td><td>{sanpham.dung_tich}</td></tr>
                                    <tr><td>Đường kính x hành trình piston</td><td>{sanpham.duong_kinh_hanh_trinh_piston}</td></tr>
                                    <tr><td>Tỉ số nén</td><td>{sanpham.ti_so_nen}</td></tr>
                                    <tr><td>Công suất cực đại</td><td>{sanpham.cong_suat_cuc_dai}</td></tr>
                                    <tr><td>Mô men xoắn cực đại</td><td>{sanpham.mo_men_xoan_cuc_dai}</td></tr>
                                    <tr><td>Bộ ly hợp</td><td>{sanpham.bo_ly_hop}</td></tr>
                                    <tr><td>Hệ thống đánh lửa</td><td>{sanpham.he_thong_danh_lua}</td></tr>
                                    <tr><td>Hệ thống khởi động</td><td>{sanpham.he_thong_khoi_dong}</td></tr>
                                    <tr><td>Hộp số</td><td>{sanpham.hop_so}</td></tr>
                                    <tr><td>Hệ thống truyền động</td><td>{sanpham.he_thong_truyen_dong}</td></tr>
                                    <tr><td>Tiêu thụ nhiên liệu</td><td>{sanpham.tieu_thu_nhien_lieu}</td></tr>
                                    <tr><td>Khí thải</td><td>{sanpham.khi_thai}</td></tr>
                                    <tr><td>Hệ thống phun xăng</td><td>{sanpham.he_thong_phun_xang}</td></tr>
                                    </tbody>
                                </table>
                        </div>

                        {modalOpen && (
                        <div className="compare-modal">
                            <div className="compare-modal__content">
                            <h3>Chọn xe để so sánh</h3>
                            <ul className="compare-modal__list">
                                {allsanPhamSoSanh.map((xe, index) => (
                                <li key={index} onClick={() => { setSanPhamSoSanh(xe); setModalOpen(false); }}>
                                    <img src={xe.anh_sanpham} alt={xe.ten_san_pham} className="compare-modal__image" />
                                    <div>
                                    <p>{xe.ten_san_pham}</p>
                                    <p>{formatCurrency(xe.gia)}</p>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            <button onClick={() => setModalOpen(false)} className="compare-modal__close">Đóng</button>
                            </div>
                        </div>
                        )}



                    </div>
                    {sanPhamSoSanh && (
                        <div className="detail-2">
                        <div className="product-header">
                            <img
                            src={sanPhamSoSanh.anh_sanpham}
                            alt={`Ảnh xe ${sanPhamSoSanh.ten_san_pham}`}
                            className="product-image"
                            style={{ width: "100px", height: "70px" }}
                            />
                            <div className="product-info">
                            <h2 className="product-name">{sanPhamSoSanh.ten_san_pham}</h2>
                            <p className="product-price">Giá: {formatCurrency(sanPhamSoSanh.gia)}</p>
                            </div>
                        </div>

                        <div className="dongco-wrapper">
                            <div className="dongco-title">
                            <span>Động cơ</span>
                            <div className="dongco-line"></div>
                            </div>
                            <table className="dongco-table">
                            <tbody>
                                <tr><td>Động cơ</td><td>{sanPhamSoSanh.dong_co}</td></tr>
                                <tr><td>Dung tích</td><td>{sanPhamSoSanh.dung_tich}</td></tr>
                                <tr><td>Đường kính x hành trình piston</td><td>{sanPhamSoSanh.duong_kinh_hanh_trinh_piston}</td></tr>
                                <tr><td>Tỉ số nén</td><td>{sanPhamSoSanh.ti_so_nen}</td></tr>
                                <tr><td>Công suất cực đại</td><td>{sanPhamSoSanh.cong_suat_cuc_dai}</td></tr>
                                <tr><td>Mô men xoắn cực đại</td><td>{sanPhamSoSanh.mo_men_xoan_cuc_dai}</td></tr>
                                <tr><td>Bộ ly hợp</td><td>{sanPhamSoSanh.bo_ly_hop}</td></tr>
                                <tr><td>Hệ thống đánh lửa</td><td>{sanPhamSoSanh.he_thong_danh_lua}</td></tr>
                                <tr><td>Hệ thống khởi động</td><td>{sanPhamSoSanh.he_thong_khoi_dong}</td></tr>
                                <tr><td>Hộp số</td><td>{sanPhamSoSanh.hop_so}</td></tr>
                                <tr><td>Hệ thống truyền động</td><td>{sanPhamSoSanh.he_thong_truyen_dong}</td></tr>
                                <tr><td>Tiêu thụ nhiên liệu</td><td>{sanPhamSoSanh.tieu_thu_nhien_lieu}</td></tr>
                                <tr><td>Khí thải</td><td>{sanPhamSoSanh.khi_thai}</td></tr>
                                <tr><td>Hệ thống phun xăng</td><td>{sanPhamSoSanh.he_thong_phun_xang}</td></tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    )}
                </div>

                    </div>

                    <div class="feedback">
                        <div class="review-title">
                            <p class="quantity-review">966 Đánh giá</p>
                            <div class="quantity-star">
                            <span>4.8 / 5</span>
                            <i class="fa-solid fa-star"></i>
                            </div>
                        </div>

                        <div class="review-fillter">
                            <div class="review-fillter__rating">
                            <select name="" id="">
                                <option value="">Đánh giá</option>
                                <option value="1">1 sao</option>
                                <option value="2">2 sao</option>
                                <option value="3">3 sao</option>
                                <option value="4">4 sao</option>
                                <option value="5">5 sao</option>
                            </select>
                            </div>
                            <div class="review-filter__image">
                            <select name="" id="">
                                <option value="">Ảnh</option>
                                <option value="true">Có ảnh</option>
                                <option value="false">Không ảnh</option>
                            </select>
                            </div>
                            <div class="review-filter__replied">
                            <select name="" id="">
                                <option value="">Phản hồi</option>
                                <option value="true">Đã phản hồi</option>
                                <option value="false">Chưa phản hồi</option>
                            </select>
                            </div>
                        </div>

                        <div class="feedback-content">
                            <div class="row no-gutters">
                            <div class="col p-6">
                                <div class="feedback-item">
                                <div class="feedback-item__rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star disabled"></i>
                                </div>
                                <div class="feedback-item__body">
                                    <b class="feedback-userName">Trần Minh Quân</b>
                                    <i class="feedback-product-type">RSX 150 / Phiên bản Đặc biệt</i>
                                    <p class="feedback-of-custom">Xe chạy êm, máy khỏe, đi đường trường rất ổn định. Thiết kế lại đẹp nữa!</p>
                                    <p class="feedback-time">08.05.2023</p>
                                </div>
                                </div>
                            </div>

                            <div class="col p-6">
                                <div class="feedback-item">
                                <div class="feedback-item__rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <div class="feedback-item__body">
                                    <b class="feedback-userName">Nguyễn Văn Thắng</b>
                                    <i class="feedback-product-type">RSX 150 / Phiên bản Tiêu chuẩn</i>
                                    <p class="feedback-of-custom">Xe rất tiết kiệm xăng, đi phố hay đi làm đều tiện. Hài lòng với giá tiền.</p>
                                    <p class="feedback-time">08.05.2023</p>
                                </div>
                                </div>
                            </div>

                            <div class="col p-6">
                                <div class="feedback-item">
                                <div class="feedback-item__rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star disabled"></i>
                                </div>
                                <div class="feedback-item__body">
                                    <b class="feedback-userName">Phạm Ngọc Hà</b>
                                    <i class="feedback-product-type">RSX 150 / Màu Đen nhám</i>
                                    <p class="feedback-of-custom">Thiết kế ngầu, chạy ổn. Hơi tiếc là yên hơi cứng với mình, phải lót thêm đệm.</p>
                                    <p class="feedback-time">08.05.2023</p>
                                </div>
                                </div>
                            </div>

                            <div class="col p-6">
                                <div class="feedback-item">
                                <div class="feedback-item__rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <div class="feedback-item__body">
                                    <b class="feedback-userName">Lê Nhật Tân</b>
                                    <i class="feedback-product-type">RSX 150 / Màu Xanh thể thao</i>
                                    <p class="feedback-of-custom">Xe ổn định, đề pa mạnh, âm thanh động cơ nghe phê. Đáng mua trong tầm giá.</p>
                                    <p class="feedback-time">08.05.2023</p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="feedback-page">
                            <i class="fa-solid fa-angle-left btn-page-left"></i>
                            <span>1/19</span>
                            <i class="fa-solid fa-angle-right btn-page-right"></i>
                        </div>
                        </div>
            </div>
        </main>
    </Fragment>
  );
}
