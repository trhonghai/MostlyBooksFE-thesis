import { Box, Modal, Rating } from "@mui/material";
import { useContext, useState } from "react";
import { format, set } from "date-fns";
import AuthContext from "~/context/AuthProvider";
import { useReview } from "~/hooks";
import toast from "react-hot-toast";

function ReviewForm({ bookId, open, onClose }) {
  const [ratingValue, setRatingValue] = useState(3);
  const { userCurrent } = useContext(AuthContext);
  const [reviewRequest, setReviewRequest] = useState({
    rating: ratingValue,
    date: format(new Date().toISOString(), "yyyy-MM-dd HH:mm:ss"),
    comment: "",
    customer: {
      id: userCurrent,
    },
  });
  const { createReview } = useReview();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewRequest({ ...reviewRequest, [name]: value });
  };

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
    setReviewRequest({ ...reviewRequest, rating: newValue });
  };

  const handleReviewSubmit = async () => {
    try {
      console.log(reviewRequest, bookId);
      await createReview(bookId, reviewRequest);
      toast.success("Đánh giá sách thành công!");
      // fetchData();

      onClose();
      setReviewRequest({
        rating: ratingValue,
        date: format(new Date().toISOString(), "yyyy-MM-dd HH:mm:ss"),
        comment: "",
        customer: {
          id: userCurrent,
        },
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Đánh giá sách thất bại!");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                VIẾT ĐÁNH GIÁ SẢN PHẨM
              </h2>
              <div className="grid gap-6 sm:grid-cols-1 sm:gap-6">
                <div className="sm:col-span-1">
                  <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2018/REVIEW-1263x80-446ae7.jpg" />
                </div>
                <div className="flex items-center justify-center">
                  <Rating
                    name="simple-controlled"
                    value={ratingValue}
                    size="large"
                    onChange={handleRatingChange}
                  />
                </div>
                <textarea
                  id="comment"
                  name="comment"
                  rows="8"
                  value={reviewRequest.comment}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nhập nhận xét của bạn về sản phẩm!"
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleReviewSubmit}
                  className="inline-flex w-48 justify-center items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#FFD16B] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Thêm
                </button>
                <button
                  onClick={onClose}
                  className="inline-flex justify-center ml-4 w-48 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#FFD16B] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ReviewForm;
