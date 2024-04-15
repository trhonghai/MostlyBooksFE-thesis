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
  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/reviews/${id}`);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  const getReviewsByBookId = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/reviews/books/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return { getAllReviews, getReview, deleteReview, getReviewsByBookId };
}

export default useReview;
