import React, { Fragment, useEffect, useState } from 'react'
import Silde from '../../components/slider/silde';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import AddProduct from '../../until/cart';
import { useUser } from '../../until/userContext';
export default function Home() {
    AddProduct();
    const [data,setData] = useState([]);
    const [homeSearch, setHomeSearch] = useState('');
    const navigate = useNavigate();

    const {user} = useUser();

    const handleHomeSearch = (e) => {
        e.preventDefault();
        const keyword = homeSearch.trim();
        if (!keyword) return;
        navigate(`/product?keyword=${encodeURIComponent(keyword)}`);
    };

    const handleQuickSearch = (keyword) => {
        navigate(`/product?keyword=${encodeURIComponent(keyword)}`);
    };

   const coupons = [
    {
        coupon_name: "XE150K",
        discount_amount: 1500,
        remaining_count: 30,
        description: "Giảm ngay 1.500.000đ khi mua xe motor mới từ ngày 15-06",
        value: 1500000,
        expiry_date: "10-06-2025"
    },
    {
        coupon_name: "PK150K",
        discount_amount: 150,
        remaining_count: 0,
        description: "Ưu đãi 150.000đ cho đơn hàng phụ kiện từ 2 triệu (không áp dụng combo)",
        value: 150000,
        expiry_date: "20-06-2025"
    },
    {
        coupon_name: "MBH100K",
        discount_amount: 100,
        remaining_count: 60,
        description: "Giảm 100.000đ khi mua phụ kiện từ 500.000đ",
        value: 100000,
        expiry_date: "19-06-2025"
    },
    {
        coupon_name: "AO50K",
        discount_amount: 50,
        remaining_count: 25,
        description: "Ưu đãi 500.000đ khi mua áo khoác hoặc găng tay từ 3.000.000đ",
        value: 500000,
        expiry_date: "25-06-2025"
    },
    ];

      
      const handleSaveCoupon = (coupon) => {
        console.log('đã click')
        if(!user){
            console.log('ko lưu đk')
            toast.error(`Hãy đăng nhập để lưu mã giảm giá!`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{ 
            if(coupon.remaining_count === 0){
                 toast.error(`Mã giảm giá này đã hết số lượng!`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
            }
            const savedCoupons = JSON.parse(localStorage.getItem("coupons")) || [];
            savedCoupons.push({ ...coupon, id_user:user.id });
            localStorage.setItem("coupons", JSON.stringify(savedCoupons));
            toast.success(`Mã giảm giá "${coupon.coupon_name}" đã được lưu!`, {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        
      };

    const loadData = async() =>{
        const response = await axios.get("http://localhost:5000/api/top5products");
        setData(response.data);
    };

    useEffect(()=>{
        loadData();
    },[]);

    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };  

    const accessoriesData = [
        {
          id: '89',
          name: 'Gương xe máy cao cấp',
          priceNew: 120000,
          priceOld: 150000,
          discountPercent: '-20%',
          mau_sac:'Đen',
          description: 'Gương lớn, nhìn rõ, xoay 360 độ',
          image: '/Images/guong.jpg',
          sizes: ['S', 'M', 'L']
        },
        {
          id: '90',
          name: 'Pô độ thể thao',
          priceNew: 890000,
          priceOld: 1100000,
          discountPercent: '-19%',
          mau_sac:'Đen',
          description: 'Tiếng pô trầm ấm, không bị hú',
          image: '/Images/poxe.jpg',
          sizes: ['S', 'XL', '2XL']
        },
        {
          id: '91',
          name: 'Tay côn CNC',
          priceNew: 260000,
          priceOld: 320000,
          discountPercent: '-19%',
          mau_sac:'Đen đỏ',
          description: 'Hợp kim nhôm chắc chắn',
          image: '/Images/taycon.jpg',
          sizes: ['15', '17', '19', '21', '23']
        },
        {
          id: '92',
          name: 'Tay phanh RCB',
          priceNew: 370000,
          priceOld: 450000,
          discountPercent: '-18%',
          mau_sac:'Đỏ',
          description: 'Thắng êm, tăng chỉnh đa nấc',
          image: '/Images/tayphanh.jpg',
          sizes: ['15', '17', '19', '21', '23']
        },
        {
          id: '93',
          name: 'Thùng xe + Baga',
          priceNew: 650000,
          priceOld: 800000,
          discountPercent: '-19%',
          mau_sac:'Đen',
          description: 'Chở đồ tiện lợi, khung sắt bền chắc',
          image: '/Images/thungxe1.jpg',
          sizes: ['4x4', '5x5', '4,5x5']
        }
      ];
  return (
        <Fragment>
            <div className="main">
                <Silde/>
                <section id="section-discounts">
                    <div className="container">
                    <div className="section-discounts-wrapper">
                    <div className="homepage-coupon-card">
                        {coupons.map((coupon, index) => (
                        <div key={index} className="coupon-card-item">
                        <div className="coupon-card-item-top">
                            <div className="description-amount">
                            <div className="coupon-card-limit">(Còn {coupon.remaining_count} lượt)</div>
                            <p>Giảm {coupon.discount_amount}K</p>
                            </div>
                            <div className="description-info">
                            <p>{coupon.description}</p>
                            <p style={{ display: "none" }}>{coupon.value}</p>
                            </div>
                        </div>
                        <div className="coupon-card-item-bottom">
                            <span className="coupon-card-coupon">{coupon.coupon_name}</span>
                            <span
                            className="btn btnluuma"
                            onClick={() => handleSaveCoupon(coupon)}
                            style={{ cursor: "pointer" }}
                            >
                            Lưu mã
                            </span>
                        </div>
                        </div>
                    ))}

                    </div>
                    </div>
                </div>
                </section>
                <section className="homepage-search">
                    <div className="container-medium">
                        <div className="homepage-search-wrapper">
                            <h2 className="homepage-search-heading"> Bạn tìm gì hôm nay? </h2>
                            <div className="homepage-search-inner">
                                <form onSubmit={handleHomeSearch}>
                                    <input
                                        type="text"
                                        name="keyword"
                                        placeholder="Hãy thử bắt đầu với H2R xem sao ?"
                                        className="homepage-search-control"
                                        value={homeSearch}
                                        onChange={(e) => setHomeSearch(e.target.value)}
                                    />
                                    <button type="submit" className="homepage-search-submit">
                                        <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
                                    </button>
                                </form>
                            </div>
                            <div className="homepage-search-content">
                                <p className="home-search-description"> Từ khóa nổi bật ngày hôm nay</p>
                                <div className="homepage-search-buttons">
                                    <a onClick={() => handleQuickSearch('Phụ kiện')} className="homepage-search-button" style={{ cursor: 'pointer' }}>Phụ kiện xe</a>
                                    <a onClick={() => handleQuickSearch('Áo giáp')} className="homepage-search-button" style={{ cursor: 'pointer' }}>Áo giáp</a>
                                    <a onClick={() => handleQuickSearch('Ninja')} className="homepage-search-button" style={{ cursor: 'pointer' }}>Ninja H2R</a>
                                    <a onClick={() => handleQuickSearch('CBR')} className="homepage-search-button" style={{ cursor: 'pointer' }}>CBR 650</a>
                                    <a onClick={() => handleQuickSearch('R1')} className="homepage-search-button" style={{ cursor: 'pointer' }}>R1</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                <div className="container1">
                <div className="homepage-product__heading"> Motorbike Supper Day</div>
                    <div className="product-type">
                        <div className="row">
                            {/* Sản phẩm mẫu */}
                            

                            {/* Render sản phẩm từ dữ liệu */}
                            {data.map((item) => (
                                <div key={item.ma_san_pham} className="col p-2-4">
                                    <div id={`${item.ma_san_pham}`} className="product">
                                        <div className="product-img-wrap" style={{ marginBottom: '8px' }}>
                                            <Link to={`/detail/${item.ma_san_pham}`} className="product-img product-img--small">
                                                <img className="product-img-1" src={item.anh_sanpham} alt="" />
                                                <img className="product-img-2" src={item.anhhover1} alt="" />
                                            </Link>
                                            <div className="product-size">
                                                <p>Thêm nhanh vào giỏ hàng +</p>
                                                <p>( Chọn phân khối của xe )</p>
                                                <div className="btn btn--size">150</div>
                                                    <div className="btn btn--size">250</div>
                                                    <div className="btn btn--size">650</div>
                                                    <div className="btn btn--size">1000</div>
                                            </div>
                                        </div>
                                        <div className='product-grid__reviews'>
                                            <div className='reviews-rating'>
                                                <div className='reviews-rating__vote'>5.0</div>
                                                <div className='reviews-rating__star'></div>
                                                <div className='reviews-rating__number'>({item.total_quantity})</div>
                                            </div>
                                        </div>
                                        <div className="product-content">
                                            <div style={{ display: 'none' }} className="product-content__option ">
                                                <div className="product-content__option-item-wrap active">
                                                    <span data={item.mau_sac}></span>
                                                </div>
                                            </div>
                                            <a className="product-name">{item.ten_san_pham}</a>
                                            <div className="product-price-wrap">
                                                <div className="product-price">{formatCurrency(item.gia)}</div>
                                            </div>
                                            {item.thongbao && (
                                                <div className="product-discount">
                                                    {item.thongbao}
                                                </div>
                                            )}
                                            {item.sale && (
                                                <div className="sale-tag product-tag">{item.sale}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
                </section>

                <section className="homepage-product">
                    <div className="container">
                        <div className="homepage-product__heading">Phụ kiện giá tốt</div>
                        <div className="bestseller__content active">
                        <div className="row">
                        {accessoriesData.map((item) => (
                            <div key={item.id} className="col p-2-4">
                            <div id={`${item.id}`} className="product">
                                <div className="product-img-wrap" style={{ marginBottom: '8px' }}>
                                <Link to={`/detail/${item.id}`} className="product-img product-img--small">
                                    <img className="product-img-1" src={item.image} alt="" />
                                    <img className="product-img-2" src={item.image} alt="" />
                                </Link>
                                <div className="product-size">
                                    <p>Thêm nhanh vào giỏ hàng +</p>
                                    {item.sizes.map((size, index) => (
                                    <div
                                        key={index}
                                        className="btn btn--size"
                                    >
                                        {size}
                                    </div>
                                    ))}
                                </div>
                                </div>
                                <div className="product-content">
                                <div style={{ display: 'none' }} className="product-content__option ">
                                                <div className="product-content__option-item-wrap active">
                                                    <span data={item.mau_sac}></span>
                                                </div>
                                </div>
                                <Link to={`/detail/${item.id}`} className="product-name">{item.name}</Link>
                                <div className="product-price-wrap">
                                    <div className="product-price-new">{item.priceNew.toLocaleString()}đ</div>
                                    <div className="product-price">{item.priceOld.toLocaleString()}đ</div>
                                    <div className="product-percent">{item.discountPercent}</div>
                                </div>
                                <div className="product-discount">{item.description}</div>
                                </div>
                            </div>
                            </div>
                        ))}
                </div>

                        </div>

                    </div>
                </section>

                <section className="homepage-product">
                <div className="container">
                <div className="homepage-product__heading">Running Biker</div>
                <div className="bestseller__content active">
                    <div className="row">
                        {/* Sản phẩm 1 */}
                        <div className="col p-2-4">
                            <div  className="product">
                                <div className="product-img-wrap" style={{ marginBottom: '8px' }}>
                                    <Link to="/detail/1" className="product-img product-img--small">
                                        <img className="product-img-1" src="/Images/kawasaki1.jpg" alt="Kawasaki H2R" />
                                        <img className="product-img-2" src="/Images/kawasaki1-1.jpg" alt="Kawasaki H2R" />
                                    </Link>
                                    <div className="product-size">
                                        <p>Thêm nhanh vào giỏ hàng +</p>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <Link to="/detail/1" className="product-name">Kawasaki H2R</Link>
                                    <div className="product-price-wrap">
                                        <div className="product-price-new">380,200,000đ</div>
                                        <div className="product-price">390,800,000đ</div>
                                        <div className="product-percent">-16%</div>
                                    </div>
                                    <div className="product-discount">Mua ngay để nhận ưu đãi đặc biệt!</div>
                                </div>
                            </div>
                        </div>

                        {/* Sản phẩm 2 */}
                        <div className="col p-2-4">
                            <div className="product">
                                <div className="product-img-wrap" style={{ marginBottom: '8px' }}>
                                    <Link to="/detail/2" className="product-img product-img--small">
                                        <img className="product-img-1" src="/Images/kawasaki2.jpg" alt="Kawasaki Ninja 400" />
                                        <img className="product-img-2" src="/Images/kawasaki2-2.jpg" alt="Kawasaki Ninja 400" />
                                    </Link>
                                    <div className="product-size">
                                        <p>Thêm nhanh vào giỏ hàng +</p>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <Link to="/detail/2" className="product-name">Kawasaki Ninja 400</Link>
                                    <div className="product-price-wrap">
                                        <div className="product-price-new">200,700,000đ</div>
                                        <div className="product-price">220,200,000đ</div>
                                        <div className="product-percent">-15%</div>
                                    </div>
                                    <div className="product-discount">Giảm thêm 5% khi mua phụ kiện đôi!</div>
                                </div>
                            </div>
                        </div>

                        {/* Sản phẩm 3 */}
                        <div className="col p-2-4">
                            <div className="product">
                                <div className="product-img-wrap" style={{ marginBottom: '8px' }}>
                                    <Link to="/detail/3" className="product-img product-img--small">
                                        <img className="product-img-1" src="/Images/kawasaki3.jpg" alt="Kawasaki Versys 1000" />
                                        <img className="product-img-2" src="/Images/kawasaki3-3.jpg" alt="Kawasaki Versys 1000" />
                                    </Link>
                                    <div className="product-size">
                                        <p>Thêm nhanh vào giỏ hàng +</p>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <Link to="/detail/3" className="product-name">Kawasaki Versys 1000</Link>
                                    <div className="product-price-wrap">
                                        <div className="product-price-new">94,500,000đ</div>
                                        <div className="product-price">105,200,000đ</div>
                                        <div className="product-percent">-13%</div>
                                    </div>
                                    <div className="product-discount">Tặng kèm tất Nike hôm nay!</div>
                                </div>
                            </div>
                        </div>

                        {/* Sản phẩm 4 */}
                        <div className="col p-2-4">
                            <div className="product">
                                <div className="product-img-wrap" style={{ marginBottom: '8px' }}>
                                    <Link to="/detail/4" className="product-img product-img--small">
                                        <img className="product-img-1" src="/Images/ducati1.jpg" alt="Ducati Streetfighter V2" />
                                        <img className="product-img-2" src="/Images/ducati1.jpg" alt="Ducati Streetfighter V2" />
                                    </Link>
                                    <div className="product-size">
                                        <p>Thêm nhanh vào giỏ hàng +</p>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <Link to="/detail/4" className="product-name">Ducati Streetfighter V2</Link>
                                    <div className="product-price-wrap">
                                        <div className="product-price-new">103,800,000đ</div>
                                        <div className="product-price">124,200,000đ</div>
                                        <div className="product-percent">-10%</div>
                                    </div>
                                    <div className="product-discount">Mua ngay để nhận quà tặng!</div>
                                </div>
                            </div>
                        </div>

                        {/* Sản phẩm 5 */}
                        <div className="col p-2-4">
                            <div className="product">
                                <div className="product-img-wrap" style={{ marginBottom: '8px' }}>
                                    <Link to="/detail/5" className="product-img product-img--small">
                                        <img className="product-img-1" src="/Images/ducati2.jpg" alt="Ducati DesertX" />
                                        <img className="product-img-2" src="/Images/ducati2.jpg" alt="Ducati DesertX" />
                                    </Link>
                                    <div className="product-size">
                                        <p>Thêm nhanh vào giỏ hàng +</p>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <Link to="/detail/5" className="product-name">Ducati DesertX</Link>
                                    <div className="product-price-wrap">
                                        <div className="product-price-new">92,500,000đ</div>
                                        <div className="product-price">103,000,000đ</div>
                                        <div className="product-percent">-17%</div>
                                    </div>
                                    <div className="product-discount">Giảm thêm 10% thanh toán online!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                </section>
                
                <section className="homepage-basic">
                    <div className="homepage-basic__wrapper">
                        <div className="homepage-basic__content">
                            <h2>
                                Du xuân cùng Biker
                            </h2>
                            <p>
                                Nhập
                                <span style={{fontWeight: 'bold'}}>TatXin </span>
                                - Tặng tất chất liệu giầy giặn thoải mái
                            </p>
                            <a href="#" className="btn-primary"> Mua ngay</a>
                        </div>
                        <div className="homepage-basic__image">
                            <a href="#">
                                <picture style={{width: '100%'}}>
                                    <img  style={{width: '100%'}} src="../Images/dulich.jpg" alt=""/>
                                </picture>
                            </a>
                        </div>
                    </div>
                </section>
                <section style={{marginBottom: '100px'}} className="homepage-brands">
                    <div className="container--full">
                        <div className="homepage-brands__wrapper">
                        <div className="homepage-banner__item homepage-banner__item--cm24">
                                <div className="homepage-brands__image">
                                    <img style={{width: '90%'}} src="../Images/kawasakitet.jpg" alt=""/>
                                </div>
                                <div className="homepage-brands__content" style={{color: 'red'}}>
                                    <h2> 84RISING*</h2>
                                    <p>
                                        Xe đẹp dành cho giới trẻ
                                        <br className="mobile--hidden"/>
                                        <b style={{fontSize: '130%'}}>Xe đẹp đón tết </b>
                                    </p>
                                    <a href="#" className="btn-brands"> Mua ngay</a>
                                </div>
                            </div>
                            <div className="homepage-banner__item homepage-banner__item--cm24">
                                <div className="homepage-brands__image">
                                    <img src="../Images/bwmtet.jpg" alt=""/>
                                </div>
                                <div className="homepage-brands__content" style={{color: 'red'}}>
                                    <h2> CM24</h2>
                                    <p>
                                        Tết du xuân cùng biker đi mọi nơi
                                        <br className="mobile--hidden"/>
                                        <b style={{fontSize: '130%'}}>Xe chất đón tết </b>
                                    </p>
                                    <a href="#" className="btn-brands"> Mua ngay</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="homepage-care-and-share">
                    <div className="container--full">
                        <div className="homepage-care-and-share__inner">
                            <Link to="/care-and-share">
                                <div className="homepage-care-and-share__image">
                                    <picture>
                                        <img src="../Images/care and share.png" alt=""/>
                                    </picture>
                                </div>
                                <div className="homepage-care-and-share__content">
                                    <picture>
                                        <img src="https://mcdn.coolmate.me/image/March2023/mceclip8.png" alt=""/>
                                    </picture>
                                    <h2>
                                        Góp phần mang lại <br/> cuộc sống tươi đẹp
                                        <br className="mobile--hidden"/>
                                        hơn cho tụi nhỏ
                                    </h2>
                                    <div className="btn--primary"> Tìm hiểu thêm về Care&Share</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                </section>
                <section className="homepage-hashtag">
                    <div className="container--full">
                        <div className="homepage-hashtag__inner">
                            <p className="homepage-hashtag__left">
                                Các mẫu xe mô tô chính hãng, chất lượng cao, đáp ứng mọi nhu cầu từ đường phố đến địa hình!
                                <br/>
                                Hơn 5 triệu biker đã tin dùng và yêu thích!
                            </p>
                            <p className="homepage-hashtag__title">#Motorbike</p>
                            <p className="homepage-hashtag__right">
                                Giải pháp di chuyển mạnh mẽ  
                                <br/>
                                Dành cho những tay lái đam mê tốc độ và khám phá
                            </p>
                        </div>
                    </div>
                </section>


                <section className="homepage-service">
                    <div className="container--full">
                        <div className="homepage-service__grid">
                            <div className="homepage-service__item">
                                <div className="infomation-card">
                                    <Link to="/about" className="infomation-card">
                                        <div className="infomation-card__thumbnail">
                                            <img src="../Images/Motor1.jpg" alt=""/>
                                        </div>
                                        <div className="infomation-card__buttons">
                                            <span className="infomation-card__title">Câu chuyện Motor </span>
                                            <span className="infomation-card__button">
                                                <i className="fa-solid fa-arrow-up fa-rotate-45"></i>
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="homepage-service__item">
                                <div className="infomation-card">
                                    <Link to="/service" className="infomation-card">
                                        <div className="infomation-card__thumbnail">
                                            <img src="../Images/dichvuhailong100.png" alt=""/>
                                        </div>
                                        <div className="infomation-card__buttons">
                                            <span className="infomation-card__title">Dịch vụ hài lòng 100% </span>
                                            <span className="infomation-card__button">
                                                <i className="fa-solid fa-arrow-up fa-rotate-45"></i>
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="homepage-service__list">
                                <div className="homepage-service__card">
                                    <p className="homepage-service__text">
                                        Miễn phí vận chuyển  
                                        <br />
                                        cho phụ kiện xe trên 500k
                                    </p>
                                </div>
                                <div className="homepage-service__card">
                                    <p className="homepage-service__text">
                                        Bảo hành chính hãng  
                                        <br />
                                        lên đến 24 tháng
                                    </p>
                                </div>
                                <div className="homepage-service__card">
                                    <p className="homepage-service__text">
                                        Hỗ trợ sửa chữa  
                                        <br />
                                        tận nơi nhanh chóng
                                    </p>
                                </div>
                                <div className="homepage-service__card">
                                    <p className="homepage-service__text">
                                        Tự hào cung cấp  
                                        <br />
                                        xe & phụ kiện chính hãng
                                    </p>
                                </div>
                            </div>

                        
                    </div>
                </section>
                
            </div>
        </Fragment>
  );
}
