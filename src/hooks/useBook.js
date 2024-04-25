import axios from "axios";
import { useContext } from "react";
import AuthContext from "~/context/AuthProvider";

function useBook() {
  const getAllBook = async () => {
    const response = await axios.get("http://localhost:8080/books");
    return response.data;
  };
  const createBook = async (newBook, file) => {
    try {
      const formData = new FormData();
      formData.append("book", JSON.stringify(newBook));
      formData.append("image", file);
      console.log(newBook, file);

      const response = await axios.post(
        "http://localhost:8080/books/new",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };
  const getAbook = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:8080/books/${bookId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting book:", error);
    }
  };

  const updateBook = async (updateData, file, id) => {
    try {
      const fromData = new FormData();
      fromData.append("bookUpdate", JSON.stringify(updateData));
      fromData.append("image", file);
      console.log(updateData, file, id);
      console.log(updateData, file, id);
      const response = await axios.put(
        `http://localhost:8080/books/update/${id}`,
        fromData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const filterBooks = async (
    minPrice,
    maxPrice,
    categoryName,
    publisherName,
    issue
  ) => {
    console.log(minPrice, maxPrice, categoryName, publisherName, issue);
    try {
      let url = `http://localhost:8080/books/filter?`;

      if (minPrice !== null) {
        url += `minPrice=${minPrice}&`;
      }

      if (maxPrice !== null) {
        url += `maxPrice=${maxPrice}&`;
      }
      if (categoryName !== null) {
        url += `categoryName=${categoryName}&`;
      }

      if (publisherName !== null) {
        url += `publisherName=${publisherName}&`;
      }
      if (issue !== null) {
        url += `issue=${issue}&`;
      }
      console.log(url);
      const response = await axios.get(url.slice(0, -1)); // Loại bỏ dấu '&' cuối cùng
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error filtering books:", error);
    }
  };

  const getDiscountByBookId = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/discounts/${bookId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting discount:", error);
    }
  };

  const getBookByCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/books/get-book-by-category/${categoryId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting book by category:", error);
    }
  };

  const getNewBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/books/new-books");

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getFavoriteBooks = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/favorite/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting favorite books:", error);
    }
  };

  const { userCurrent } = useContext(AuthContext);
  const addFavoriteBook = async (bookId) => {
    try {
      const data = {
        customer: {
          id: userCurrent,
        },
        book: {
          id: bookId,
        },
      };
      const response = await axios.post(
        `http://localhost:8080/api/favorite/new`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error adding favorite book:", error);
    }
  };

  const checkLikedBook = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/favorite/check?customerId=${userCurrent}&bookId=${bookId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error checking liked book:", error);
    }
  };

  const deleteFavoriteBook = async (id, bookId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/favorite/delete?Id=${id}&bookId=${bookId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting favorite book:", error);
    }
  };

  return {
    getAllBook,
    createBook,
    getAbook,
    updateBook,
    filterBooks,
    getDiscountByBookId,
    getBookByCategory,
    getNewBooks,
    getFavoriteBooks,
    addFavoriteBook,
    checkLikedBook,
    deleteFavoriteBook,
  };
}

export default useBook;
