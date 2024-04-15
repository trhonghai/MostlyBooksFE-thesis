import axios from "axios";

function useReview() {
  const getAllReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reviews");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const getReview = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return { getAllReviews, getReview };
}

export default useReview;
