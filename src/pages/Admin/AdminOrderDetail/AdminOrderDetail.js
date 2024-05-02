import {
  faArrowLeft,
  faCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Modal } from "@mui/material";
import { useContext, useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import config from "~/config";
import AuthContext from "~/context/AuthProvider";
import { useOrder } from "~/hooks";
import { formatPrice } from "~/utils/formatPrice";
import Invoice from "./Invoice";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function AdminOrderDetail() {
  const location = useLocation();
  const order = location.state ? location.state.dataOrder : null;
  const {
    OrderDetails,
    CaptureOrder,
    Refunded,
    deleteOrderById,
    shipped,
    delivered,
    captureOrdercash,
    Cancelled,
    cancleOrderCash,
  } = useOrder();
  const [orderDetails, setOrderDetails] = useState([]);
  const { userRole } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowInvoice, setIsShowInvoice] = useState(false);
  const invoiceRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Hóa đơn thanh toán - Đơn hàng: ${order.id}`,
  });

  const closeShowInvoiceModal = () => {
    setIsShowInvoice(false);
  };

  useEffect(() => {
    if (order) {
      fetchOrderDetail();
    }
  }, [order]);
  console.log(orderDetails);
  console.log(order);

  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const openModalCancle = () => {
    setIsModalCancelOpen(true);
  };

  const closeModalCancle = () => {
    setIsModalCancelOpen(false);
  };

  const fetchOrderDetail = async () => {
    const result = await OrderDetails(order.id);
    setOrderDetails(result);
  };
  console.log(order);

  const CaptureOrderHandler = async (orderCode) => {
    try {
      if (order.payment.paymentMethod === "cash-on-delivery") {
        await captureOrdercash(order.id);
      } else {
        await CaptureOrder(orderCode);
      }
      await fetchOrderDetail();
      toast.success("Xác nhận đơn hàng thành công");
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Xác nhận đơn hàng thất bại");
    }
  };

  const deleteOrder = async (orderId) => {
    console.log(orderId);
    try {
      await deleteOrderById(orderId);
      toast.success("Xóa đơn hàng thành công");
      closeModal();
      await fetchOrderDetail();
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Xóa đơn hàng thất bại");
    }
  };

  const RefundOrderHandler = async (captureId) => {
    try {
      if (order.payment.paymentMethod === "cash-on-delivery") {
        await cancleOrderCash(order.id);
      } else {
        await Refunded(captureId);
      }

      await fetchOrderDetail();
      toast.success("Hủy/Hoàn tiền đơn hàng thành công");
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Hủy/Hoàn tiền đơn hàng thất bại");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ShipOrderHandler = async (orderId) => {
    try {
      await shipped(orderId);
      await fetchOrderDetail();
      toast.success("Vận chuyển đơn hàng thành công");
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Vận chuyển đơn hàng thất bại");
    }
  };

  const deliveredHandler = async (orderId) => {
    try {
      await delivered(orderId);
      await fetchOrderDetail();
      toast.success("Giao hàng thành công");
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Giao hàng thất bại");
    }
  };

  const CancelledOrder = async (orderId) => {
    try {
      if (order.payment.paymentMethod === "cash-on-delivery") {
        await cancleOrderCash(order.id);
      } else {
        await Cancelled(orderId);
      }
      closeModalCancle();
      toast.success("Hủy đơn hàng thành công");
      await fetchOrderDetail();
      // fetchOrdersByStatus(selectedFilter);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Hủy đơn hàng thất bại");
    }
    await fetchOrderDetail();
  };

  return (
    <div className="bg-white w-full shadow overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-xl">
        <div className="overflow-y-hidden rounded-lg ">
          <div className="px-4 py-4 sm:px-6">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              <Link to={config.routes.adminOrders}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="mr-10"
                  color="#FFD16B"
                />
              </Link>
              CHI TIẾT ĐƠN HÀNG
            </h3>
          </div>
          <div className="flex justify-center items-center w-full space-x-4">
            {[
              "PENDING",
              "CAPTURED",
              "SHIPPED",
              "DELIVERED",
              "REFUNDED",
              "CANCELLED",
            ].map((status) => (
              <div
                key={status}
                className={`flex items-center space-x-1 ${
                  order?.orderStatus?.status === status
                    ? "bg-yellow-400"
                    : order?.orderStatus?.status === "PENDING" &&
                      status === "CAPTURED"
                    ? "bg-gray-200"
                    : order?.orderStatus?.status === "PENDING" &&
                      status === "SHIPPED"
                    ? "bg-gray-200"
                    : order?.orderStatus?.status === "PENDING" &&
                      status === "DELIVERED"
                    ? "bg-gray-200"
                    : order?.orderStatus?.status === "PENDING" &&
                      status === "REFUNDED"
                    ? "bg-gray-200"
                    : order?.orderStatus?.status === "PENDING" &&
                      status === "CANCELLED"
                    ? "bg-gray-200"
                    : ""
                } p-2 rounded-full`}
              >
                <div
                  className={`h-3 w-3 rounded-full ${
                    order?.orderStatus?.status === status
                      ? "bg-yellow-600"
                      : order?.orderStatus?.status === "PENDING" &&
                        status === "CAPTURED"
                      ? "bg-gray-600"
                      : order?.orderStatus?.status === "PENDING" &&
                        status === "SHIPPED"
                      ? "bg-gray-600"
                      : order?.orderStatus?.status === "PENDING" &&
                        status === "DELIVERED"
                      ? "bg-gray-600"
                      : order?.orderStatus?.status === "PENDING" &&
                        status === "REFUNDED"
                      ? "bg-gray-600"
                      : order?.orderStatus?.status === "PENDING" &&
                        status === "CANCELLED"
                      ? "bg-gray-600"
                      : ""
                  }`}
                ></div>
                <p className="text-sm font-semibold">
                  {status === "PENDING"
                    ? "Đang chờ xử lý"
                    : status === "CAPTURED"
                    ? "Đã xác nhận"
                    : status === "SHIPPED"
                    ? "Đang giao hàng"
                    : status === "DELIVERED"
                    ? "Đã giao hàng"
                    : status === "REFUNDED"
                    ? "Đã hoàn tiền"
                    : status === "CANCELLED"
                    ? "Đã hủy"
                    : ""}
                </p>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-2 md:space-y-2 xl:space-y-8">
              {orderDetails?.map((orderDetail) => (
                <div
                  key={orderDetail?.id}
                  className="flex flex-col justify-start items-start dark:bg-gray-900 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"
                >
                  <div className=" md:mt-2 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src={orderDetail?.book.img}
                        alt="dress"
                      />
                      <img
                        className="w-full md:hidden"
                        src={orderDetail?.book.img}
                        alt="dress"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl text-left dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          {orderDetail?.book.name}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-900 stext-gray-300">
                              Số lượng:{" "}
                            </span>{" "}
                            {orderDetail?.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base dark:text-white xl:text-lg leading-6">
                          {formatPrice(orderDetail?.price)}
                          {/* <span className="text-red-300 line-through"> 125000</span> */}
                        </p>
                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                          {orderDetail?.quantity}
                        </p>
                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                          {formatPrice(
                            orderDetail?.price * orderDetail?.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-2 py-2 md:p-6 xl:p-4 w-full bg-gray-50 dark:bg-gray-800 space-y-4">
                  <h3 className="text-xl text-left dark:text-white font-semibold leading-5 text-gray-800">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="mr-2"
                      color="#FFD16B"
                    />
                    Địa chỉ nhận hàng
                  </h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="justify-between w-full">
                      <p className=" text-left text-base dark:text-white leading-4 text-gray-800">
                        {order?.address.firstName} {order?.address.lastName}
                      </p>
                      <p className="mt-2 text-left text-base dark:text-white leading-4 text-gray-800">
                        {order?.address.phoneNumber}
                      </p>

                      <p className="mt-2 text-left text-base dark:text-white leading-4 text-gray-800">
                        {order?.address.address} - {order?.address.ward} -{" "}
                        {order?.address.district} - {order?.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full  md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col  md:p-6 xl:p-4 w-full bg-gray-50 dark:bg-gray-800 space-y-4">
                  <h3 className="text-xl text-left dark:text-white font-semibold leading-5 text-gray-800">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="mr-2"
                      color="#FFD16B"
                    />
                    Phương thức thanh toán
                  </h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="justify-between w-full">
                      {order.payment.paymentMethod === "paypal" ? (
                        <p className=" text-left    text-base dark:text-white leading-4 text-gray-800">
                          Thanh toán qua Paypal
                        </p>
                      ) : (
                        <p className=" text-left text-base dark:text-white leading-4 text-gray-800">
                          Thanh toán khi nhận hàng
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Thành tiền
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {formatPrice(order.amount)}
                      </p>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Phí vận chuyển
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        {formatPrice(order.shipping)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                      Tổng cộng
                    </p>
                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                      {formatPrice(order.amount + order.shipping)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <div className="w-full justify-center items-center">
                    {userRole &&
                      userRole.includes("Admin") &&
                      order.orderStatus.status === "PENDING" && (
                        <div>
                          <button
                            onClick={() => CaptureOrderHandler(order.orderCode)}
                            className="transition duration-300 ease-in-out mb-4 hover:bg-[#FFD16B] hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-[#FFD16B] text-base font-medium leading-4 text-white"
                          >
                            Xác nhận đơn hàng
                          </button>
                          <button
                            onClick={openModalCancle}
                            className="transition duration-300 ease-in-out mb-4 hover:bg-red-500 hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-red-600 text-base font-medium leading-4 text-white"
                          >
                            Hủy đơn hàng
                          </button>
                          <Modal
                            open={isModalCancelOpen}
                            onClose={closeModalCancle}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box className="fixed z-10 inset-0 overflow-y-auto">
                              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity">
                                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                                &#8203;
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h2
                                      id="modal-modal-title"
                                      className="text-lg font-medium text-gray-900"
                                    >
                                      Xác nhận
                                    </h2>
                                    <div className="mt-3 sm:mt-0  sm:text-left">
                                      <p
                                        id="modal-modal-description"
                                        className="text-sm text-gray-500"
                                      >
                                        Bạn có chắc chắn muốn hủy đơn hàng này
                                        không?
                                      </p>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                      onClick={() =>
                                        CancelledOrder(order.orderCode)
                                      }
                                      type="button"
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Hủy đơn hàng
                                    </button>
                                    <button
                                      onClick={closeModalCancle}
                                      type="button"
                                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                      Hủy
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Box>
                          </Modal>
                        </div>
                      )}

                    {userRole &&
                      userRole.includes("Admin") &&
                      order.orderStatus.status === "SHIPPED" && (
                        <button
                          onClick={() => deliveredHandler(order.id)}
                          className="transition duration-300 ease-in-out mb-4 hover:bg-[#FFD16B] hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-[#FFD16B] text-base font-medium leading-4 text-white"
                        >
                          Giao hàng thành công
                        </button>
                      )}

                    {userRole &&
                      userRole.includes("Admin") &&
                      order.orderStatus.status === "DELIVERED" && (
                        <button
                          // onClick={() => deliveredHandler(order.id)}
                          className="transition duration-300 ease-in-out mb-4 hover:bg-[#FFD16B] hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-[#FFD16B] text-base font-medium leading-4 text-white"
                        >
                          Đã hoàn thành đơn hàng
                        </button>
                      )}

                    {userRole &&
                      userRole.includes("Admin") &&
                      order.orderStatus.status === "CAPTURED" && (
                        <div>
                          <div className="flex">
                            <button
                              onClick={() => setIsShowInvoice(true)}
                              className="transition duration-300 ease-in-out mb-4 hover:bg-[#FFD16B] hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-[#FFD16B] text-base font-medium leading-4 text-white"
                            >
                              Xem hóa đơn
                            </button>
                          </div>
                          <button
                            onClick={() => ShipOrderHandler(order.id)}
                            className="transition duration-300 ease-in-out mb-4 hover:bg-[#FFD16B] hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-[#FFD16B] text-base font-medium leading-4 text-white"
                          >
                            Vận chuyển đơn hàng
                          </button>
                          <button
                            onClick={() => RefundOrderHandler(order.captureId)}
                            className="transition duration-300 ease-in-out mb-4 hover:bg-red-500 hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-red-600 text-base font-medium leading-4 text-white"
                          >
                            Hủy đơn hàng / Hoàn tiền
                          </button>
                          <Modal
                            open={isShowInvoice}
                            onClose={() => setIsShowInvoice(false)}
                          >
                            <Invoice
                              orderDetails={orderDetails}
                              order={order}
                              close={closeShowInvoiceModal}
                            />
                          </Modal>
                        </div>
                      )}

                    {userRole &&
                      userRole.includes("Admin") &&
                      order.orderStatus.status === "REFUNDED" && (
                        <div>
                          <button className="transition duration-300 ease-in-out mb-4 hover:bg-[#FFD16B] hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-[#FFD16B] text-base font-medium leading-4 text-white">
                            Đã hoàn tiền
                          </button>
                          <button
                            onClick={openModal}
                            className="transition duration-300 ease-in-out mb-4 hover:bg-red-500 hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-red-600 text-base font-medium leading-4 text-white"
                          >
                            Xóa đơn hàng
                          </button>
                        </div>
                      )}
                    <Modal
                      open={isModalOpen}
                      onClose={closeModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                          </div>
                          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                          &#8203;
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <h2
                                id="modal-modal-title"
                                className="text-lg font-medium text-gray-900"
                              >
                                Xác nhận
                              </h2>
                              <div className="mt-3 sm:mt-0  sm:text-left">
                                <p
                                  id="modal-modal-description"
                                  className="text-sm text-gray-500"
                                >
                                  Bạn có chắc chắn muốn xóa đơn hàng không?
                                </p>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button
                                onClick={() => deleteOrder(order.id)}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Xóa
                              </button>
                              <button
                                onClick={closeModal}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                    {userRole &&
                      userRole.includes("Admin") &&
                      order.orderStatus.status === "CANCELLED" && (
                        <div>
                          <button
                            onClick={openModal}
                            className="transition duration-300 ease-in-out mb-4 hover:bg-red-500 hover:text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-red-600 text-base font-medium leading-4 text-white"
                          >
                            Xóa đơn hàng
                          </button>
                        </div>
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

export default AdminOrderDetail;
