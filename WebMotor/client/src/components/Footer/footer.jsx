import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Fragment>
   <footer className="site-footer">
    <div className="container">
        <div className="footer-top">
            <div className="footer-top-left">
                <ul>
                    <li className="footer-top-left__heading"><Link to="/product">Khám phá Thế Giới Mô Tô</Link></li>
                    <li><Link to="/product?keyword=sport">Xe mô tô thể thao</Link></li>
                    <li><Link to="/product?keyword=touring">Xe mô tô touring</Link></li>
                    <li><Link to="/product?keyword=địa hình">Xe mô tô địa hình</Link></li>
                    <li><Link to="/product?keyword=classic">Xe mô tô classic</Link></li>
                    <li><Link to="/product?keyword=Phụ kiện">Phụ kiện mô tô</Link></li>
                    <li><Link to="/chonsize">Trang phục bảo hộ</Link></li>
                    <li><Link to="/info/baoduong">Dịch vụ bảo dưỡng</Link></li>
                    <li><Link to="/info/community">Cộng đồng biker</Link></li>
                </ul>
                <ul>
                    <li className="footer-top-left__heading"><Link to="/info/contact">Dịch vụ khách hàng</Link></li>
                    <li><Link to="/info/faq">Hỏi đáp - FAQs</Link></li>
                    <li><Link to="/info/policy">Chính sách đổi trả 60 ngày</Link></li>
                    <li><Link to="/info/contact">Liên hệ hỗ trợ</Link></li>
                    <li><Link to="/info/baoduong">Dịch vụ bảo dưỡng xe</Link></li>
                    <li><Link to="/info/uudai">Ưu đãi dành cho biker</Link></li>
                    <li><Link to="/info/policy">Chính sách vận chuyển</Link></li>
                    <li><Link to="/info/policy">Chính sách bảo mật</Link></li>
                    <li><Link to="/info/policy">Chính sách bảo mật thanh toán</Link></li>
                    <li className="footer-top-left__heading mg-top30"><Link to="/info/huongdan">Kiến thức mô tô</Link></li>
                    <li><Link to="/info/huongdan">Hướng dẫn chọn xe</Link></li>
                    <li><Link to="/info/blog">Blog về mô tô</Link></li>
                    <li><Link to="/info/community">Cộng đồng yêu thích mô tô</Link></li>
                </ul>
                <ul>
                    <li className="footer-top-left__heading"><Link to="/info/dangkyxe">Tài liệu - Tuyển dụng</Link></li>
                    <li><Link to="/info/dangkyxe">Hướng dẫn đăng ký xe</Link></li>
                    <li><Link to="/info/tuyendung">Tuyển dụng</Link></li>
                    <li className="footer-top-left__heading mg-top30"><Link to="/about">Về Chúng Tôi</Link></li>
                    <li><Link to="/about">Câu chuyện thương hiệu</Link></li>
                    <li><Link to="/info/tuyendung">Gia nhập đội ngũ chúng tôi</Link></li>
                    <li><Link to="/info/community">Hỗ trợ cộng đồng biker</Link></li>
                    <li><Link to="/about">Nhà máy lắp ráp</Link></li>
                </ul>
                <ul>
                    <li className="footer-top-left__heading"><Link to="/info/contact">Địa chỉ liên hệ</Link></li>
                    <li><Link to="/info/contact">Showroom Hà Nội: Số 103, Đường</Link></li>
                    <li><Link to="/info/contact">Vạn Phúc, Phường Vạn Phúc,</Link></li>
                    <li><Link to="/info/contact">Quận Hà Đông, TP. Hà Nội</Link></li>
                    <li><Link to="/info/contact">Showroom Tp HCM: Lầu 1, Số 163</Link></li>
                    <li><Link to="/info/contact">Trần Trọng Cung, Phường</Link></li>
                    <li><Link to="/info/contact">Tân Thuận Đông, Quận 7, Tp.</Link></li>
                    <li><Link to="/info/contact">Hồ Chí Minh</Link></li>
                </ul>
            </div>

            <div className="footer-top-right">
                <h3 className="footer-top-right__heading">Chúng tôi luôn lắng nghe bạn!</h3>
                <p className="footer-top-right__content">
                    Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.
                </p>
                <div className="btn btn--feedback">Gửi Ý Kiến</div>
                <div className="footer-contact">
                    <div className="footer-contact__icon">
                        <img src="../Images/icon-hotline.svg" alt=""/>
                    </div>
                    <a href="">
                        <p className="footer-conttact__body">
                            Hotline: 0343493518
                        </p>
                    </a>                           
                </div>
                <div className="footer-contact">
                    <div className="footer-contact__icon">
                        <img src="../Images/icon-email.svg" alt=""/>
                    </div>
                    <a href="">
                        <p className="footer-conttact__body">
                            Email: support@motostore.vn
                        </p>
                    </a>                                                  
                </div>
                <div className="footer-society">
                    <a href=""><img src="../Images/icon-facebook.svg" alt=""/></a>
                    <a href=""><img src="../Images/icon-instar.svg" alt=""/></a>
                    <a href=""><img src="../Images/icon-youtube.svg" alt=""/></a>
                </div>
            </div>
        </div>

        <div className="footer-bottom">
            <p>
                @ CÔNG TY TNHH MOTO STORE VIỆT NAM  
                Mã số doanh nghiệp: 0108617038. Giấy chứng nhận đăng ký doanh nghiệp do Sở Kế hoạch và Đầu tư TP Hà Nội cấp lần đầu ngày 20/02/2019.
            </p>
            <div className="footer-certificate">
                <a href="">
                    <img className="footer-certificate__img" src="../Images/handle_cert.png" alt=""/>
                </a>
                <a href="">
                    <img className="footer-certificate__img" src="../Images/dmca_protected_15_120.png" alt=""/>
                </a>
                <a href="">
                    <img className="footer-certificate__img" src="../Images/moto-info.png" alt=""/>
                </a>
                <a href="">
                    <img className="footer-certificate__img" src="../Images/logoSaleNoti.png" alt=""/>
                </a>
            </div>
        </div>
    </div>
</footer>

    </Fragment>
  );
}
