import axios from "axios";

function useDiscount() {
  const getAllDiscounts = async () => {
    const response = await axios.get("http://localhost:8080/discounts/all");
    return response.data;
  };

  const getDiscountDetails = async () => {
    const response = await axios.get(
      "http://localhost:8080/discounts/allDiscountDetails"
    );
    return response.data;
  };

  const updateDiscount = async (data, id) => {
    const response = await axios.put(
      `http://localhost:8080/discounts/update/${id}`,
      data
    );
    return response.data;
  };

  const createDiscount = async (data) => {
    const response = await axios.post(
      "http://localhost:8080/discounts/create",
      data
    );
    return response.data;
  };
  const deleteDiscount = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/discounts/delete/${id}`
    );
    return response.data;
  }

  return {
    getAllDiscounts,
    getDiscountDetails,
    updateDiscount,
    createDiscount,
    deleteDiscount
  };
}

export default useDiscount;
