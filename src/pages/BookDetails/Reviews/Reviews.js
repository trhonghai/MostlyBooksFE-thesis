import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Rating from "@mui/material/Rating/Rating.js";

function Reviews({ data }) {
  useEffect(() => {
    console.log(data?.reviews);
  }, []);
  return (
    <div>
      <div class="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-5  lg:gap-2">
        <div class="mt-4 lg:col-span-3 lg:row-end-1">
          <div class="flex w-full flex-col">
            <div class="flex flex-col sm:flex-row">
              <h1 class="max-w-sm text-xl font-bold ">Đánh giá sản phẩm</h1>
            </div>
            <div class=" text-gray-700">
              <div class="flex h-16 items-center text-4xl font-bold ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {data?.rating}
                <p className="text-2xl">/5</p>
              </div>
              <ul class="mb-6 mt-2 ml-10 space-y-2">
                <li class="flex items-center text-sm font-medium">
                  <span class="w-3">5</span>
                  <span class="mr-4 text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                    <div class="h-full w-10/12 bg-yellow-400"></div>
                  </div>
                  <span class="w-3">56</span>
                </li>
                <li class="flex items-center text-sm font-medium">
                  <span class="w-3">4</span>
                  <span class="mr-4 text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                    <div class="h-full w-8/12 bg-yellow-400"></div>
                  </div>
                  <span class="w-3">12</span>
                </li>
                <li class="flex items-center text-sm font-medium">
                  <span class="w-3">3</span>
                  <span class="mr-4 text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                    <div class="h-full w-1/12 bg-yellow-400"></div>
                  </div>
                  <span class="w-3">4</span>
                </li>
                <li class="flex items-center text-sm font-medium">
                  <span class="w-3">2</span>
                  <span class="mr-4 text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                    <div class="h-full w-0 bg-yellow-400"></div>
                  </div>
                  <span class="w-3">0</span>
                </li>
                <li class="flex items-center text-sm font-medium">
                  <span class="w-3">1</span>
                  <span class="mr-4 text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                    <div class="h-full w-1/12 bg-yellow-400"></div>
                  </div>
                  <span class="w-3">5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 lg:row-end-1 flex items-center">
          <button class="max-w-xl w-96 rounded-full border py-3  font-medium">
            Write a review
          </button>
        </div>
      </div>
      <div className="">
        <ul class="">
          {data?.reviews.map((review) => (
            <li
              key={review.id}
              class="py-8 text-left border-t border-gray-400 px-4 m-2"
            >
              <div class="flex items-start">
                <div className="w-48">
                  <p class="mt-5 text-sm font-bold text-gray-900">
                    {review?.customer?.firstName} {review?.customer?.lastName}
                  </p>
                  <p class="mt-1 text-sm text-gray-600">{review.date}</p>
                </div>
                <div class="ml-4">
                  <Rating
                    name="simple-controlled"
                    value={review.rating}
                    // onChange={handleRatingChange}
                  />
                  <div class="mt-5 text-base text-gray-900">
                    {review.comment}
                  </div>
                  <FontAwesomeIcon icon={faHeart} />
                  12
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reviews;
