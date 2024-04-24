import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import config from "~/config";

function PaymentSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowConfetti(false); // Tắt hiệu ứng pháo bông sau một khoảng thời gian
    }, 5000); // Thời gian hiển thị pháo bông (ms)
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="container md:w-4/5 p-10 mx-auto px-4 bg-white">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Thanh toán thành công!
          </h3>
          <p className="text-gray-600 my-2">
            Cảm ơn bạn đã tin tưởng và mua hàng của chúng tôi.
          </p>
          <p> Chúc bạn một ngày tốt lành. </p>
          <Link to={config.routes.home}>
            <button className="bg-[#FFD16B] text-white py-2 px-4 rounded-lg mt-4 w-46">
              Tiếp tục mua sắm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
