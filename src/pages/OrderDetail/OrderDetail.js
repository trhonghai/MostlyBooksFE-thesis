import {
  faArrowLeft,
  faCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useOrder } from "~/hooks";
import { formatPrice } from "~/utils/formatPrice";

function OrderDetail() {
  const location = useLocation();
  const order = location.state ? location.state.dataOrder : null;
  const { OrderDetails, Cancelled } = useOrder();
  const [orderDetails, setOrderDetails] = useState([]);
  const [isCancelled, setIsCancelled] = useState(false);
  console.log("order", order);
  useEffect(() => {
    if (order) {
      fetchOrderDetail();
      console.log(orderDetails);
    }
  }, [order]);

  const fetchOrderDetail = async () => {
    const result = await OrderDetails(order.id);
    setOrderDetails(result);
  };

  const CancelledOrder = async (orderId) => {
    try {
      await Cancelled(orderId);
      setIsCancelled(true);
      // fetchOrdersByStatus(selectedFilter);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    await fetchOrderDetail();
  };

  return (
    <div className="bg-white max-w-4xl shadow overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-lg">
        <div className="overflow-y-hidden rounded-lg ">
          <div className="px-4 py-4 sm:px-6">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              <Link to="/account/orders">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="mr-10"
                  color="#FFD16B"
                />
              </Link>
              CHI TIẾT ĐƠN HÀNG
            </h3>
          </div>
          <div class="px-4 py-2 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div class="flex flex-col justify-start items-start w-full space-y-2 md:space-y-2 xl:space-y-8">
              {orderDetails.map((orderDetail) => (
                <div class="flex flex-col justify-start items-start dark:bg-gray-900 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <div class=" md:mt-2 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div class="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        class="w-full hidden md:block"
                        src={orderDetail?.book.img}
                        alt="dress"
                      />
                      <img
                        class="w-full md:hidden"
                        src={orderDetail?.book.img}
                        alt="dress"
                      />
                    </div>
                    <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div class="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 class="text-xl text-left dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          {orderDetail?.book.name}
                        </h3>
                        <div class="flex justify-start items-start flex-col space-y-2">
                          <p class="text-sm dark:text-white leading-none text-gray-800">
                            <span class="dark:text-gray-900 stext-gray-300">
                              Số lượng:{" "}
                            </span>{" "}
                            {orderDetail?.quantity}
                          </p>
                        </div>
                      </div>
                      <div class="flex justify-between space-x-8 items-start w-full">
                        <p class="text-base dark:text-white xl:text-lg leading-6">
                          {formatPrice(orderDetail?.price)}
                          {/* <span class="text-red-300 line-through"> 125000</span> */}
                        </p>
                        <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                          {orderDetail?.quantity}
                        </p>
                        <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                          {formatPrice(
                            orderDetail?.price * orderDetail?.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div class="flex flex-col px-2 py-2 md:p-6 xl:p-4 w-full bg-gray-50 dark:bg-gray-800 space-y-4">
                  <h3 class="text-xl text-left dark:text-white font-semibold leading-5 text-gray-800">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="mr-2"
                      color="#FFD16B"
                    />
                    Địa chỉ nhận hàng
                  </h3>
                  <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div class="justify-between w-full">
                      <p class=" text-left text-base dark:text-white leading-4 text-gray-800">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p class="mt-2 text-left text-base dark:text-white leading-4 text-gray-800">
                        {order.address.phoneNumber}
                      </p>

                      <p class="mt-2 text-left text-base dark:text-white leading-4 text-gray-800">
                        {order.address.address} - {order.address.ward} -{" "}
                        {order.address.district} - {order.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full  md:space-y-0 md:space-x-6 xl:space-x-8">
                <div class="flex flex-col  md:p-6 xl:p-4 w-full bg-gray-50 dark:bg-gray-800 space-y-4">
                  <h3 class="text-xl text-left dark:text-white font-semibold leading-5 text-gray-800">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="mr-2"
                      color="#FFD16B"
                    />
                    Phương thức thanh toán
                  </h3>
                  <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div class="justify-between w-full">
                      {order.payment.paymentMethod === "paypal" ? (
                        <p class=" text-left    text-base dark:text-white leading-4 text-gray-800">
                          Thanh toán qua Paypal
                        </p>
                      ) : (
                        <p class=" text-left text-base dark:text-white leading-4 text-gray-800">
                          Thanh toán khi nhận hàng
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div class="flex justify-between w-full">
                      <p class="text-base dark:text-white leading-4 text-gray-800">
                        Thành tiền
                      </p>
                      <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {formatPrice(order.amount)}
                      </p>
                    </div>

                    <div class="flex justify-between items-center w-full">
                      <p class="text-base dark:text-white leading-4 text-gray-800">
                        Phí vận chuyển
                      </p>
                      <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {formatPrice(order.shipping)}
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center w-full">
                    <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
                      Tổng cộng
                    </p>
                    <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                      {formatPrice(order.amount + order.shipping)}
                    </p>
                  </div>
                </div>
                <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <div class="w-full justify-center items-center">
                    {order.orderStatus.status === "PENDING" ? (
                      <button
                        onClick={() => CancelledOrder(order.id)}
                        className="transition duration-300 ease-in-out mb-4 hover:bg-red-500 hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-red-600 text-base font-medium leading-4 text-white"
                      >
                        Hủy đơn hàng
                      </button>
                    ) : isCancelled ? (
                      <button
                        // onClick={() => PaymentAgain(order.id)}
                        className="transition duration-300 ease-in-out mb-4 hover:bg-[#FBA31A] dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-[#FFD16B] text-base font-medium leading-4 text-white"
                      >
                        Thanh toán lại
                      </button>
                    ) : (
                      <button
                        disabled
                        className="transition duration-300 ease-in-out hover:bg-[#FBA31A] dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-[#FFD16B] text-base font-medium leading-4 text-white"
                      >
                        Đã thanh toán
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
