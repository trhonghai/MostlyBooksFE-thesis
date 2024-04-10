import { Box, Modal } from "@mui/material";
import { useState } from "react";

function DiscountForm({
  open,
  onClose,
  mode,
  discountCurrent,
  fecthDiscounts,
}) {
  const [data, setData] = useState({
    name: "",
  });
  const [dataUpdate, setDataUpdate] = useState({
    name: "",
  });
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
                {mode === "add" ? "Thêm khuyến mãi" : "Cập nhật khuyến mãi"}
              </h2>
              <form>
                <div className="grid gap-6 sm:grid-cols-1 sm:gap-6">
                  <div>
                    <lable>Tên khuyến mãi</lable>
                    <input
                      type="text"
                      name="name"
                      value={
                        mode === "edit" && discountCurrent
                          ? dataUpdate.name
                          : data.name
                      }
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Tên khuyến mãi"
                      // onChange={handleChange}
                    />
                  </div>
                  <div>
                    <lable>Chiết khấu</lable>
                    <input
                      type="text"
                      name="name"
                      value={
                        mode === "edit" && discountCurrent
                          ? dataUpdate.name
                          : data.name
                      }
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Chiết khấu"
                      // onChange={handleChange}
                    />
                  </div>
                  <div>
                    <lable>Ngày bắt đầu</lable>
                    <input
                      type="date"
                      name="name"
                      value={
                        mode === "edit" && discountCurrent
                          ? dataUpdate.name
                          : data.name
                      }
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Chiết khấu"
                      // onChange={handleChange}
                    />
                  </div>
                  <div>
                    <lable>Ngày kết thúc</lable>
                    <input
                      type="date"
                      name="name"
                      value={
                        mode === "edit" && discountCurrent
                          ? dataUpdate.name
                          : data.name
                      }
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Chiết khấu"
                      // onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="inline-flex w-48 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#FFD16B] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    {mode === "add" ? "Thêm" : "Cập nhật"}
                  </button>
                  <button
                    onClick={onClose}
                    className="inline-flex ml-4 w-48 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#FFD16B] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    Hủy
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

export default DiscountForm;
