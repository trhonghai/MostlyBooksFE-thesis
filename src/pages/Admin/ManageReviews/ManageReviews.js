import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useReview } from "~/hooks";
import ReviewDetailForm from "./ReviewDetailForm";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Box, Modal, Pagination } from "@mui/material";

function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [reviewCurrent, setReviewCurrent] = useState({});
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const { getAllReviews, getReview, deleteReview } = useReview();

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

  const openDeleteModal = (id) => {
    setIsModalDeleteOpen(true);
    setDeleteItemId(id);
  };

  const closeDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };
  const handleDelete = async () => {
    try {
      await deleteReview(deleteItemId);
      fetchReviews();
      closeDeleteModal();
      toast.success("Xóa danh mục thành công");
    } catch (error) {
      toast.error("Xóa danh mục thất bại");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(reviews?.length / PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const currentReviews = reviews?.slice(startIndex, endIndex);
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
                  {currentReviews.map((review) => (
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
                      <td className="px-2 py-4">
                        {review.rating}{" "}
                        <FontAwesomeIcon
                          className="text-[#FFD16B]"
                          icon={faStar}
                        />
                      </td>
                      <td className="px-2 py-4">{review.date}</td>
                      <td className="px-2 py-4">
                        <button
                          onClick={() => openModalDetail(review?.id)}
                          className="px-4 py-2 font-medium text-white bg-[#FFD16B] rounded-md hover:bg-[#FBA31A] focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button onClick={() => openDeleteModal(review?.id)}>
                          <Link className="text-[#FFD16B] ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
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
            <Modal
              open={isModalDeleteOpen}
              onClose={closeDeleteModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                  &#8203;
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h2
                        id="modal-modal-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Xác nhận
                      </h2>
                      <div className="mt-3 sm:mt-0  sm:text-left">
                        <p
                          id="modal-modal-description"
                          className="text-sm text-gray-500"
                        >
                          Bạn có chắc chắn muốn xóa đánh giá này không?
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        onClick={() => handleDelete()}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={closeDeleteModal}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
      <ReviewDetailForm
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        reviewCurrent={reviewCurrent}
      />
      <div className="flex items-center justify-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-center">
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          size="large"
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default ManageReviews;
