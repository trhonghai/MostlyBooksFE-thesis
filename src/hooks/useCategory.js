import axios from "axios";

function UseCategory() {
  const category = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  return { category };
}

export default UseCategory;
