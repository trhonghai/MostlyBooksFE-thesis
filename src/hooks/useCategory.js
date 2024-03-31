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

  const getACategory = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/categories/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const addCategory = async (category) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/categories/new",
        category
      );
      return response.data;
    } catch (error) {
      console.error("Thêm danh mục thất bại:", error.message);
    }
  };
  const updateCategory = async (category, categoryId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/categories/update/${categoryId}`,
        category
      );
      return response.data;
    } catch (error) {
      console.error("Cập nhật danh mục thất bại:", error.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/categories/delete/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Xóa danh mục thất bại:", error.message);
    }
  };

  return {
    category,
    getACategory,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}

export default UseCategory;
