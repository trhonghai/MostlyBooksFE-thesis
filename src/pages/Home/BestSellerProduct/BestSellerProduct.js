import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Book from "~/components/Book";

function BestSellerProductS() {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/books");
        setBooks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" w-full  mt-10 flex justify-center items-center">
      <div className="container w-10/12 rounded-lg overflow-hidden bg-white">
        <h2 class="text-xl pl-10 text-left font-sans hover:text-[#FFD16B] sm:text-3xl">
          Sản phẩm bán chạy tháng này
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

export default BestSellerProductS;
