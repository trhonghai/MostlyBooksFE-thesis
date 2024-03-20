import axios from "axios";

function useCustomer() {
  const id = localStorage.getItem("userId");
  const Customer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user-infor/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Lấy thông tin khách hàng thất bại:", error.message);
    }
  };

  const updateCustomer = (dataToSend) => {
    try {
      console.log("dataToSend:", dataToSend);
      const response = axios.put(
        `http://localhost:8080/user-infor/update-customer/${id}`,
        dataToSend
      );
      console.log(response);
      return {
        success: true,
        message: "Cập nhật thông tin khách hàng thành công",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Cập nhật thông tin khách hàng thất bại",
        data: null,
      };
    }
  };
  return { Customer, updateCustomer };
}

export default useCustomer;
