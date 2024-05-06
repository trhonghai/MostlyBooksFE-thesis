import axios from "axios";

function useShippingRate() {
  const getAllShippingRates = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/shipping-rate/get-all"
    );
    return response.data;
  };
  const getAShippingRate = async (id) => {
    const response = await axios.get(
      `http://localhost:8080/api/shipping-rate/${id}`
    );
    return response.data;
  };
  const deleteShippingRate = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/shipping-rate/${id}`
    );
    return response.data;
  };
  const updateShippingRate = async (id, data) => {
    const response = await axios.put(
      `http://localhost:8080/api/shipping-rate/${id}`,
      data
    );
    return response.data;
  };

  const createShippingRate = async (data) => {
    const response = await axios.post(
      "http://localhost:8080/api/shipping-rate/add",
      data
    );
    return response.data;
  };

  return {
    getAllShippingRates,
    getAShippingRate,
    deleteShippingRate,
    updateShippingRate,
    createShippingRate
  };
}

export default useShippingRate;
