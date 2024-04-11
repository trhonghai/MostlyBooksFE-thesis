import axios from "axios";
import { useContext } from "react";
import AuthContext from "~/context/AuthProvider";

function useOrder() {
  const { userCurrent } = useContext(AuthContext);
  console.log(userCurrent);

  const Orders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/customer/order/${userCurrent}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const OrderDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/customer/order/order-details/${orderId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const getAllOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/customer/order/all`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const CaptureOrder = async (orderCode) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/paypal/orders/${orderCode}/capture`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const fetchOrderByStatus = async (status) => {
    console.log(status);
    try {
      const response = await axios.get(
        `http://localhost:8080/customer/order/filterStatus?status=${status}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const Cancelled = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/paypal/orders/${orderId}/cancelled`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const Refunded = async (captureId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/paypal/orders/${captureId}/refund`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const deleteOrderById = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/customer/order/delete/${orderId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const shipped = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/payment/delivery/${orderId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  return {
    Orders,
    OrderDetails,
    getAllOrders,
    CaptureOrder,
    fetchOrderByStatus,
    Cancelled,
    Refunded,
    deleteOrderById,
    shipped,
  };
}

export default useOrder;
