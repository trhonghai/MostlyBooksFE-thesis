import { useState, useEffect } from "react";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import Book from "~/components/Book";
import Carousel from "react-multi-carousel";

function RelateProduct({ bookId }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [books, setBooks] = useState([]);
  const [diversity, setDiversity] = useState(false);

  const fetchBookRecommendated = async (diversity) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/recommendations/${bookId}?diversity=${diversity}`
      );
      return response.data.recommendations.map((book) => book.id);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const toggleDiversity = () => {
    setDiversity(!diversity); // Đảo ngược giá trị diversity
  };

  useEffect(() => {
    const fetchData = async () => {
      const listId = await fetchBookRecommendated(diversity); // Sử dụng giá trị diversity hiện tại khi gọi hàm fetchBookRecommendated
      console.log(listId);
      try {
        const response = await axios.get(
          `http://localhost:8080/books/api/books/recommendations/${listId}`
        );
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [bookId, diversity]); // Đảm bảo useEffect được gọi lại khi bookId hoặc diversity thay đổi

  return (
    <div className="w-full mt-10 flex justify-center items-center">
      <div className="container w-10/12 rounded-lg overflow-hidden bg-white">
        <div className="flex items-center justify-between mt-4">
          <h2 className="items-center text-xl pl-10 mr-4  text-left font-bold sm:text-2xl">
            Sản phẩm có thể bạn thích
          </h2>
          <label className="flex items-center  cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={diversity}
              onChange={toggleDiversity}
            />
            <div
              className={`relative w-11 h-6 ${
                diversity ? "bg-blue-600" : "bg-gray-200"
              } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700`}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md ${
                  diversity
                    ? "transform translate-x-full"
                    : "transform translate-x-0"
                } transition-transform duration-300`}
              />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Đa dạng hơn
            </span>
          </label>
        </div>
        <Carousel responsive={responsive}>
          {books.map((book) => (
            <Book key={book?.id} data={book} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default RelateProduct;
