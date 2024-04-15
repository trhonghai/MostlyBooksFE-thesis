import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useReview } from "~/hooks";
import ReviewDetailForm from "./ReviewDetailForm";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [reviewCurrent, setReviewCurrent] = useState({});

  const { getAllReviews, getReview } = useReview();

  const openModalDetail = async (id) => {
    await fetchAReview(id);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const fetchReviews = async () => {
    const result = await getAllReviews();
    setReviews(result);
  };

  const fetchAReview = async (id) => {
    const result = await getReview(id);
    setReviewCurrent(result);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="bg-white w-full shadow-lg overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-xl">
        <div className="rounded-lg mx-4">
          <div className="flex items-center justify-between py-5">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              QUẢN LÝ ĐÁNH GIÁ
            </h3>
          </div>
          <div className="overflow-x-auto">
            {reviews.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-2 py-3">Mã đánh giá</th>
                    <th className="px-2 py-3">Sản phẩm</th>
                    <th className="px-2 py-3">Khách hàng</th>
                    <th className="px-2 py-3">Rating</th>
                    <th className="px-2 py-3">Thời gian đánh giá</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="px-2 py-4">{review.id}</td>
                      <td className="px-2 py-4">
                        <div className="flex items-center">
                          <img
                            className="object-cover w-24"
                            src={review.book?.img}
                            alt={review.book?.name}
                          />
                          <span className="ml-4">
                            {review.book?.name?.length > 3
                              ? review.book.name.substring(0, 10) + "..."
                              : review.book.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-4">
                        {review.customer?.firstName} {review.customer?.lastName}
                      </td>
                      <td className="px-2 py-4">{review.rating}</td>
                      <td className="px-2 py-4">{review.date}</td>
                      <td className="px-2 py-4">
                        <button
                          onClick={() => openModalDetail(review?.id)}
                          className="px-4 py-2 font-medium text-white bg-[#FFD16B] rounded-md hover:bg-[#FBA31A] focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                        // onClick={() => openDeleteModal(item.id)}
                        >
                          <Link className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faTrash} />
                          </Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không có đánh giá nào.</p>
            )}
          </div>
        </div>
      </div>
      <ReviewDetailForm
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        reviewCurrent={reviewCurrent}
      />
    </div>
  );
}

export default ManageReviews;
