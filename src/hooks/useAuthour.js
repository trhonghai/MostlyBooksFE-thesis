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
  return { getAllAuthours };
}

export default useAuthour;
