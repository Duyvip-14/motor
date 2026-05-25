import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../until/userContext';
import { LoadData } from '../../until/cartactive';

export default function Navbar() {
    const { user, logoutUser } = useUser();
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        logoutUser();
        navigate('/');
        var list = JSON.parse(localStorage.getItem("cart")) || [];
        list = [];
            localStorage.setItem("cart", JSON.stringify(list));
            LoadData();
      };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const keyword = searchTerm.trim();
        if (!keyword) return;
        navigate(`/product?keyword=${encodeURIComponent(keyword)}`);
        setSearchOpen(false);
        setSearchTerm('');
    };
  return (

      <Fragment>
      <header className="site-header">
        
        <div className="topbar" style={{display: 'block'}}>
            <a href="">Ưu đãi năm mới giảm giá lên đến 30% cho sản phẩm xe Motor  </a>
            <a href="Allsanpham.html"> " Mua ngay "</a>

        </div>
        <div className="header">
            <div className="header-inner">

                <div className="header__logo">
                    <Link to="/">
                        <img src="../Images/logo.png" alt="logo-coolmate"/>
                    </Link>

                </div>
                <div className="header__navbar hide-on-mobile-tablet">

                    <ul className="header__navbar-list">
                        <li className="header__navbar-product">
                            <Link to="/product" className="header__navbar-link">
                                Sản phẩm Motor
                            </Link>

                        </li>

                        <li className="header__navbar-item navbar-item--about-coolmate">
                            <Link to="/about" className="header__navbar-link">Về Motorbike</Link>
                            <div className="navbar-item--about-coolmate__menu-wrap">
                                <div className="about-coolmate__menu-inner">
                                    <a href="index.html">Motorbike</a>
                                    <div className="row">
                                        <div className="col p-3">
                                            <a href="" className="about-motorbike__menu-inner-item">
                                                <img className="about-motorbike__menu-item-img" src="./Images/congnghe.jpg" alt=""/>
                                                <p className="about-motorbike__menu-item-name">Công Nghệ</p>
                                                <p className="about-motorbike__menu-item-content">Khám phá các công nghệ động cơ và hệ thống treo hiện đại trên xe phân khối lớn</p>
                                            </a>
                                        </div>
                                        <div className="col p-3">
                                            <a href="" className="about-motorbike__menu-inner-item">
                                                <img className="about-motorbike__menu-item-img" src="./Images/doben.jpg" alt=""/>
                                                <p className="about-motorbike__menu-item-name">Độ Bền</p>
                                                <p className="about-motorbike__menu-item-content">Tìm hiểu cách các hãng xe tối ưu thiết kế để nâng cao tuổi thọ và hiệu suất</p>
                                            </a>
                                        </div>
                                        <div className="col p-3">
                                            <a href="" className="about-motorbike__menu-inner-item">
                                                <img className="about-motorbike__menu-item-img" src="./Images/congdong.jpg" alt=""/>
                                                <p className="about-motorbike__menu-item-name">Cộng Đồng Biker</p>
                                                <p className="about-motorbike__menu-item-content">Kết nối với cộng đồng đam mê mô tô, chia sẻ kinh nghiệm và tổ chức những chuyến đi</p>
                                            </a>
                                        </div>
                                        <div className="col p-3">
                                            <a href="" className="about-motorbike__menu-inner-item">
                                                <img className="about-motorbike__menu-item-img" src="./Images/lichsu.jpg" alt=""/>
                                                <p className="about-motorbike__menu-item-name">Lịch Sử</p>
                                                <p className="about-motorbike__menu-item-content">Những mẫu xe huyền thoại và hành trình phát triển của các thương hiệu nổi tiếng</p>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </li>

                        <li className="header__navbar-item">
                            <Link to="chonsize" className="header__navbar-link">Chọn Size Đồ Bảo Hộ</Link>
                        </li>

                        <li className="header__navbar-item">
                            <Link to="/chatai" className="header__navbar-link">AI Chat</Link>
                        </li>
                    </ul>

                </div>

                <div className="header__actions">
                    <div className="header__actions-search" style={{ position: 'relative' }}>
                        <a
                            className="header__actions-link"
                            onClick={() => setSearchOpen(prev => !prev)}
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                        </a>
                        {searchOpen && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 12px)',
                                    right: 0,
                                    width: '320px',
                                    background: '#fff',
                                    border: '1px solid #e1e1e1',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    padding: '10px',
                                    zIndex: 1000
                                }}
                            >
                                <form
                                    onSubmit={handleSearchSubmit}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm sản phẩm..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        autoFocus
                                        style={{
                                            flex: 1,
                                            border: '1px solid #e1e1e1',
                                            borderRadius: '8px',
                                            padding: '8px 12px',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            background: '#000',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '8px 12px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        aria-label="Tìm kiếm"
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                    <div className="header__actions-account">
                    <Link to="/DangNhap" className="header__actions-link">
                        <i className="fa-solid fa-user fa-xl"></i>
                    </Link>
                    <div className="dropdown-menu">
                        {/* Hiển thị thông tin người dùng hoặc "Tên tài khoản" nếu không có người dùng */}
                        {user ? (
                            <>
                                <a href="" className="dropdown-item">
                                    <i className="fas fa-user"></i> {' '}
                                    {user.name}
                                </a>
                                <Link to="/donhang" className="dropdown-item">
                                    <i className="fas fa-shopping-bag"></i> Đơn hàng
                                </Link>
                                <a href="" className="dropdown-item" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i> Đăng xuất
                                </a>
                            </>
                        ) : (
                            <>
                                <Link to="/DangNhap" className="dropdown-item">
                                    <i className="fas fa-sign-in-alt"></i> Đăng nhập
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                    <div className="header__actions-cart-icon">
                        <span className="header__actions-cart-notify">0</span>
                        <Link to="/cart" className="header__actions-link">
                            <i className="fa-solid fa-bag-shopping fa-xl"></i>
                        </Link>
                        <div className="mini-cart-wrap">
                            <div className="mini-cart">
                                <div className="mini-cart-head">
                                    <span><span className="added-product"></span>  sản phẩm</span>
                                    <Link to="/cart">Xem tất cả</Link>
                                </div>
                                <ul className="mini-cart__list">
                                    
                                </ul>
                            </div>
                        </div>
                        

                    </div>

                </div>
            </div>
        </div>

    </header>
      </Fragment>
  )
}
