import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import Book from "~/components/Book";
import { responsive } from "~/utils/responsiveBook";

function BestSellerProductS() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/books/api/bestseller"
        );
        setBooks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" w-full mt-10 flex justify-center items-center">
      <div className="container w-10/12 rounded-lg overflow-hidden bg-white">
        <div className="flex p-2 items-center bg-red-200">
          <img className="w-10" src={images.BestSeller} />
          <div>
            <span class="text-xl pl-2 mt-4 text-left font-bold sm:text-xl">
              Sản phẩm bán chạy tháng này
            </span>
          </div>
        </div>
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
