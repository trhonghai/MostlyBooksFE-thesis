import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { formatPrice } from "~/utils/formatPrice";

function Book({ data }) {
  return (
    <Link to={`/books/${data.id}`}>
      <div key={data.id} className="relative w-full p-5 h-full ">
        <div class="group p-5  hover:border hover:rounded-lg  hover:shadow-lg h-full ">
          <div class="overflow-hidden  aspect-w-1 aspect-h-1">
            <img
              class="object-cover h-64 transition-all duration-300 group-hover:scale-125"
              src={data.img}
              alt=""
            />
          </div>

          <div class=" items-start  space-x-4">
            <div>
              <p class="text-xs text-left font-sans  sm:text-sm md:text-base">
                <a href="#" title="">
                  {data.name}
                  <span class="absolute inset-0" aria-hidden="true"></span>
                </a>
              </p>
            </div>

            <div className="text-left ">
              <div className="flex">
                <p class="text-xs mr-2 font-sans  sm:text-sm md:text-base">
                  {formatPrice(data.price)}
                </p>
                <div class=" bg-red-500 texts-white px-2  rounded-lg">-20%</div>
              </div>
              <del class="mt-0.5 text-xs sm:text-sm font-bold text-gray-500">
                {" "}
                129.000đ{" "}
              </del>
            </div>

            <div class="flex items-center mt-1 space-x-px">
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
