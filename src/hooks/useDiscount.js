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
  return { getAllDiscounts, getDiscountDetails };
}

export default useDiscount;
