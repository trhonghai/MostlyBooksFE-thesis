import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Book from "~/components/Book";

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

  const fetchBookRecommendated = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/recommendations/${bookId}`
      );
      return response.data.recommendations.map((book) => book.id);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const listId = await fetchBookRecommendated();
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
  }, [bookId]);

  return (
    <div className="w-full mt-10 flex justify-center items-center">
      <div className="container w-10/12 rounded-lg overflow-hidden bg-white">
        <h2 className="text-xl pl-10 mt-4 text-left font-bold sm:text-2xl">
          Sản phẩm có thể bạn thích
        </h2>
        <Carousel responsive={responsive}>
          {books.map((book) => (
            <Book key={book.id} data={book} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default RelateProduct;
