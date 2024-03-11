import axios from "axios";
import { customerId } from "~/utils/localStorage";

function useOrder() {
  const Orders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/customer/order/${customerId}`
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

  return { Orders, OrderDetails };
}

export default useOrder;
