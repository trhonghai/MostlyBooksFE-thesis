import { Rating } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "~/utils/formatPrice";

function Book({ data }) {
  const [discount, setDiscount] = useState([]);
  console.log(data);

  useEffect(() => {
    const getDiscountByBook = async (bookId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/discounts/${bookId}`
        );
        console.log(response.data);
        setDiscount(response.data);
      } catch (error) {
        console.error("Error getting discount:", error);
      }
    };
    getDiscountByBook(data.id);
  }, []);
  const maxLength = 22; // Độ dài tối đa cho tên sách
  let truncatedName =
    data.name.length > maxLength
      ? data.name.substring(0, maxLength - 3) + "..."
      : data.name;

  return (
    <Link to={`/books/${data.id}`}>
      <div key={data.id} className="relative w-full p-4  h-full">
        <div className="group md:p-4 hover:border bg-white rounded-lg hover:shadow-lg h-full">
          <div className="overflow-hidden aspect-w-1 aspect-h-1">
            <img
              className="object-cover h-40 md:h-48 transition-all duration-300 group-hover:scale-105"
              src={data.img}
              alt=""
            />
          </div>

          <div className="flex flex-col  mt-2 space-y-1">
            <p className="text-xs text-left font-sans sm:text-sm md:text-base">
              <a href="#" title="">
                {truncatedName}
                <span className="absolute inset-0" aria-hidden="true"></span>
              </a>
            </p>

            <div className="flex items-center space-x-1 px-2 py-1">
              <p className="text-xs font-sans sm:text-sm md:text-base">
                {formatPrice(data.price)}
              </p>
              {discount.length > 0 && (
                <div className="bg-red-400 text-white px-1 rounded-lg">
                  {discount.map((item) => {
                    const currentDate = new Date();
                    const startDate = new Date(item?.startDate);
                    const endDate = new Date(item?.endDate);

                    // Kiểm tra xem thời hạn ưu đãi đã hết hạn chưa
                    if (currentDate >= startDate && currentDate <= endDate) {
                      return (
                        <span key={item.id}>-{item.discountPercentage}%</span>
                      );
                    } else {
                      return null; // Không hiển thị nếu ưu đãi đã hết hạn
                    }
                  })}
                </div>
              )}
            </div>

            <del className="text-xs text-left font-bold text-gray-500">
              {formatPrice(data.price)}
            </del>

            <div className="flex items-center space-x-1">
              <Rating
                name="simple-controlled"
                value={data.rating}
                size="small"
                // onChange={handleRatingChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Book;
