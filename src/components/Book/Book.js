import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { formatPrice } from "~/utils/formatPrice";

function Book({ data }) {
  return (
    <Link to={`/books/${data.id}`}>
      <div key={data.id} className="relative w-full  h-full">
        <div className="group  md:p-4 hover:border hover:rounded-lg hover:shadow-lg h-full">
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
                {data.name}
                <span className="absolute inset-0" aria-hidden="true"></span>
              </a>
            </p>

            <div className="flex items-center space-x-1">
              <p className="text-xs font-sans sm:text-sm md:text-base">
                {formatPrice(data.price)}
              </p>
              <div className="bg-red-500 text-white px-2 py-1 rounded-lg">
                -20%
              </div>
            </div>

            <del className="text-xs font-bold text-gray-500">129.000đ</del>

            <div className="flex items-center space-x-1">
              <Rating
                name="simple-controlled"
                value="3"
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
