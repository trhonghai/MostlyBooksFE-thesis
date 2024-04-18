import axios from "axios";
import { useContext } from "react";
import AuthContext from "~/context/AuthProvider";
import { customerId } from "~/utils/localStorage";

function useAddress() {
  const { userCurrent } = useContext(AuthContext);

  const Address = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/provinces/address/${userCurrent}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateAddress = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/provinces/updateAddress/${data.id}`,
        data
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createAddress = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/provinces/newAddress/${customerId}`,
        data
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProvinces = async () => {
    try {
      const response = await axios.get("http://localhost:8080/provinces");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getDistricts = async (provinceId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/provinces/districts?provinceCode=${provinceId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getWards = async (districtId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/provinces/wards?districtCode=${districtId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/provinces/deleteAddress/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateDefaultAddress = async (addressId, customerId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/provinces/${addressId}/setDefaultForShopping?customerId=${customerId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getShippingRate = async (provinceName) => {
    console.log(provinceName);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/shipping-rate/get?provinceName=${provinceName}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    Address,
    updateAddress,
    createAddress,
    getAllProvinces,
    getDistricts,
    getWards,
    deleteAddress,
    updateDefaultAddress,
    getShippingRate,
  };
}

export default useAddress;
