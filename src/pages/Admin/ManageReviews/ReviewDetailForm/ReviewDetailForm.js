import { Box, Modal } from "@mui/material";

function ReviewDetailForm({ open, onClose, reviewCurrent, fetchRevirews }) {
  console.log(typeof onClose);

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
                Chi tiết đánh giá
              </h2>
              <form onSubmit={{}}>
                <div className="grid mb-4 gap-6 sm:grid-cols-1 sm:gap-6">
                  <div>
                    <label className="text-gray-700" htmlFor="name">
                      Tên sách
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={reviewCurrent?.book?.name}
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Tên tác giả"
                      // onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid mb-4 gap-6 sm:grid-cols-1 sm:gap-6">
                  <div>
                    <label className="text-gray-700" htmlFor="name">
                      Khách hàng
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={`${reviewCurrent.customer?.firstName} ${reviewCurrent.customer?.lastName}`}
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Tên tác giả"
                      // onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-4  sm:grid-cols-1 sm:gap-6">
                  <div>
                    <label className="text-gray-700" htmlFor="name">
                      Rating
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={reviewCurrent.rating}
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Tên tác giả"
                      // onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-4 sm:grid-cols-1 sm:gap-6">
                  <div>
                    <label className="text-gray-700" htmlFor="name">
                      Thời gian đánh giá
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={reviewCurrent.date}
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Tên tác giả"
                      // onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-1 sm:gap-6">
                  <div>
                    <label className="text-gray-700" htmlFor="name">
                      Đánh giá
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={reviewCurrent.comment}
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Tên tác giả"
                      // onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="inline-flex ml-4 w-18 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#FFD16B] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    Đóng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ReviewDetailForm;
