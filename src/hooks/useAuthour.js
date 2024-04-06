import { data } from "autoprefixer";
import axios from "axios";

function useAuthour() {
  const getAllAuthours = async () => {
    try {
      const result = await axios.get("http://localhost:8080/authour");
      return result.data;
    } catch (error) {
      console.error("Error fetching authours:", error);
    }
  };

  const getAAuthours = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/authour/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching authours:", error);
    }
  };

  const createAuthour = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/authour/new`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching authours:", error);
    }
  };

  const updateAuthour = async (data, id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/authour/update/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching authours:", error);
    }
  };

  const deleteAuthour = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/authour/delete/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching authours:", error);
    }
  };
  return {
    getAllAuthours,
    getAAuthours,
    createAuthour,
    updateAuthour,
    deleteAuthour,
  };
}

export default useAuthour;
