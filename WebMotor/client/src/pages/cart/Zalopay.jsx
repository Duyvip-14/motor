import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Zalopay.css';

export default function ZalopayReturn() {
  const [searchParams] = useSearchParams();
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const appTransId = searchParams.get('apptransid') || localStorage.getItem("zalopay_app_trans_id");
    const orderData = JSON.parse(localStorage.getItem("pending_order"));

    if (!orderData || !appTransId) {
      setLoadingDone(true);
      setTimeout(() => { window.location.href = "/cart"; }, 1500);
      return;
    }

    setTimeout(() => {
      axios.post("http://localhost:5000/api/zalopay_verify_and_add_order", {
        app_trans_id: appTransId,
        orderData
      })
      .then(res => {
        if (res.data.success) {
          localStorage.removeItem("pending_order");
          localStorage.removeItem("zalopay_app_trans_id");
          localStorage.setItem("cart", JSON.stringify([]));
          localStorage.setItem("coupons", JSON.stringify([]));
          localStorage.setItem("voucher_sale", JSON.stringify({ coupon_name: "novoucher", value: 0 }));
          toast.success("Dịch vụ đã được đặt!", {
            autoClose: 4500,
            position: "right",
            theme: "light",
            toastStyle: {
                background: "#e6fff2",
                color: "#1f7a4c",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderLeft: "6px solid #2ecc71",
                zIndex: 10000
            }
          });
        } else {
          toast.error("Giao dịch thất bại: " + res.data.message);
        }

        setLoadingDone(true);
        setTimeout(() => {
          window.location.href = "/cart";
        }, 1500);
      })
      .catch(() => {
        toast.error("Lỗi khi xác minh giao dịch ZaloPay");
        setLoadingDone(true);
        setTimeout(() => {
          window.location.href = "/cart";
        }, 1500);
      });
    }, 3000);
  }, []);

  return (
    <div className="zalopay-overlay">
      <div className="zalopay-loader">
        <div className="spinner"></div>
        <p className="loading-text">Đang xác minh giao dịch ZaloPay...</p>
      </div>
    </div>
  );
}
