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
      const response = axios.put(
        `http://localhost:8080/user-infor/update-customer/${id}`,
        dataToSend 
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Cập nhật thông tin khách hàng thất bại:", error.message);
    }
  };
  return { Customer, updateCustomer };
}

export default useCustomer;
