import { faHeart as regularFaHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faPen,
  faHeart as solidFaHeart,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Rating from "@mui/material/Rating/Rating.js";
import { useReview } from "~/hooks";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "~/context/AuthProvider";
import toast from "react-hot-toast";
import ReviewForm from "./ReviewForm";

function Reviews({ data, fetchBook }) {
  console.log(data);
  const { userCurrent } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const { getReviewsByBookId, likeReview, unlikeReview, checkLiked } =
    useReview();
  const [liked, setLiked] = useState(false);
  const [likedReviews, setLikedReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getReviews = async () => {
    const result = await getReviewsByBookId(data?.id);
    setReviews(result);
  };
  const isLiked = async (reviewId, customerId) => {
    const result = await checkLiked(reviewId, customerId);
    console.log(result);
    return result; // Trả về kết quả của việc kiểm tra like
  };

  useEffect(() => {
    fetchData();
  }, [data?.id]);

  const fetchData = async () => {
    const result = await getReviewsByBookId(data?.id);
    setReviews(result || []); // Kiểm tra và gán mảng rỗng nếu `result` là undefined
    const likedReviews = await Promise.all(
      (result || []).map(async (review) => {
        const isLiked = await checkLiked(review.id, userCurrent);
        return { reviewId: review.id, isLiked };
      })
    );
    setLikedReviews(likedReviews);
  };

  const totalReviews = reviews?.length;

  const ratingsCount = {};
  reviews?.forEach((review) => {
    ratingsCount[review.rating] = (ratingsCount[review.rating] || 0) + 1;
  });

  const handleLike = async (id) => {
    try {
      const alreadyLiked = await isLiked(id, userCurrent);
      console.log(alreadyLiked);
      if (!alreadyLiked) {
        await likeReview({ reviewId: id, customerId: userCurrent });

        setLiked(true);
        getReviews();
      } else {
        await unlikeReview(id);
        setLiked(false);
        getReviews();
      }
      getReviews();
      setLikedReviews((prevLikedReviews) =>
        prevLikedReviews.map((likedReview) =>
          likedReview.reviewId === id
            ? { ...likedReview, isLiked: !likedReview.isLiked }
            : likedReview
        )
      );
    } catch (error) {
      console.error("Error handling like:", error);
      toast.error("Đã xảy ra lỗi khi xử lý like");
    }
  };

  return (
    <div>
      <div className="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-2">
        <div className="mt-4 lg:col-span-3 lg:row-end-1">
          <div className="flex w-full flex-col">
            <div className="flex flex-col sm:flex-row">
              <h1 className="max-w-sm text-xl font-bold ">
                Đánh giá sản phẩm ( {totalReviews} đánh giá)
              </h1>
            </div>
            <div className="text-gray-700">
              <div className="flex h-16 items-center text-4xl font-bold ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {data?.rating}
                <p className="text-2xl">/5</p>
              </div>
              <ul className="mb-6 mt-2 ml-10 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <li
                    key={rating}
                    className="flex items-center text-sm font-medium"
                  >
                    <span className="w-3">{rating}</span>
                    <span className="mr-4 text-yellow-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                    <div className="relative pt-1 w-96">
                      <div className="mr-4 h-2 overflow-hidden rounded-full bg-gray-300">
                        {ratingsCount[rating] > 0 && (
                          <div
                            className="h-full bg-yellow-400"
                            style={{
                              width: `${
                                (ratingsCount[rating] / totalReviews) * 100
                              }%`,
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                    <span>{ratingsCount[rating]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="lg:col-span-2 lg:row-end-1 text-[#f7941e] flex items-center">
          <button
            onClick={openModal}
            className="max-w-xl w-96 rounded-full border py-3  font-medium"
          >
            <FontAwesomeIcon icon={faPen} className="mr-2" />
            Viết đánh giá
          </button>
          <ReviewForm
            // fetchData={fetchData}
            bookId={data?.id}
            open={isModalOpen}
            onClose={closeModal}
          />
        </div> */}
      </div>
      <div className="">
        <ul className="">
          {reviews?.map((review) => (
            <li
              key={review.id}
              className="py-8 text-left border-t border-gray-400 px-4 m-2"
            >
              <div className="flex items-start">
                <div className="w-48">
                  <p className="mt-5 text-sm font-bold text-gray-900">
                    {review?.customer?.firstName} {review?.customer?.lastName}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{review.date}</p>
                </div>
                <div className="ml-4">
                  <Rating name="simple-controlled" value={review.rating} />
                  <div className="mt-5 text-base text-gray-900">
                    {review.comment}
                  </div>
                  <button onClick={() => handleLike(review.id)}>
                    <FontAwesomeIcon
                      className="text-red-500"
                      icon={
                        likedReviews.find(
                          (likedReview) => likedReview.reviewId === review.id
                        )?.isLiked
                          ? solidFaHeart
                          : regularFaHeart
                      }
                    />
                    <span className="ml-2">{review.liked}</span>
                  </button>
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
