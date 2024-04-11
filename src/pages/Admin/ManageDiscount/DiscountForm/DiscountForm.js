import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useBook, useDiscount } from "~/hooks";
import { Select, Tag } from "antd";
import toast from "react-hot-toast";

function DiscountForm({
  open,
  onClose,
  mode,
  discountCurrent,
  fetchDiscounts,
}) {
  const [data, setData] = useState({
    discountName: "",
    discountCode: "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
    bookIds: [],
  });
  const [dataUpdate, setDataUpdate] = useState({
    discountName: "",
    discountCode: "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
    bookIds: [],
  });

  const [books, setBooks] = useState([]);
  const { getAllBook } = useBook();
  const { updateDiscount, createDiscount, deleteDiscount } = useDiscount();

  useEffect(() => {
    fetchAllBooks();
  }, []);

  useEffect(() => {
    if (discountCurrent) {
      setDataUpdate({
        ...discountCurrent,
        bookIds: [discountCurrent.book.id],
      });
    }
  }, [discountCurrent]);

  const fetchAllBooks = async () => {
    try {
      const result = await getAllBook();
      setBooks(result.map((item) => ({ value: item.id, label: item.name })));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSelectChange = (value) => {
    setDataUpdate({ ...dataUpdate, bookIds: value });
    setData({ ...data, bookIds: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "add") {
      try {
        await createDiscount(data);
        setData({
          discountName: "",
          discountCode: "",
          discountPercentage: "",
          startDate: "",
          endDate: "",
          bookIds: [],
        });
        fetchDiscounts();
        toast.success("Thêm khuyến mãi thành công");
      } catch (error) {
        toast.error("Thêm khuyến mãi thất bại!");
      }
      onClose();
    } else if (mode === "edit") {
      try {
        await updateDiscount(dataUpdate, discountCurrent.id);
        setDataUpdate({
          discountName: "",
          discountCode: "",
          discountPercentage: "",
          startDate: "",
          endDate: "",
          bookIds: [],
        });
        fetchDiscounts();
        toast.success("Cập nhật khuyến mãi thành công");
      } catch (error) {
        toast.error("Cập nhật khuyến mãi thất bại!");
      }
      onClose();
    } else {
      try {
        await deleteDiscount(discountCurrent.id);
        fetchDiscounts();
        toast.success("Xóa khuyến mãi thành công");
      } catch (error) {
        toast.error("Xóa khuyến mãi thất bại!");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setDataUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                {mode === "add" ? "Thêm khuyến mãi" : "Cập nhật khuyến mãi"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-1 sm:gap-6">
                  <div>
                    <label>Tên khuyến mãi</label>
                    <input
                      type="text"
                      name="discountName"
                      value={
                        discountCurrent
                          ? dataUpdate.discountName
                          : data.discountName
                      }
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Tên khuyến mãi"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-1 sm:gap-6">
                    <div>
                      <label>Mã khuyến mãi</label>
                      <input
                        type="text"
                        name="discountCode"
                        value={
                          discountCurrent
                            ? dataUpdate.discountCode
                            : data.discountCode
                        }
                        className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                        placeholder="Mã khuyến mãi"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label>Chiết khấu</label>
                    <input
                      type="text"
                      name="discountPercentage"
                      value={
                        discountCurrent
                          ? dataUpdate.discountPercentage
                          : data.discountPercentage
                      }
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Chiết khấu"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Sách được giảm</label>
                    <Select
                      mode="multiple"
                      allowClear
                      name="bookIds"
                      placeholder="Please select"
                      style={{ width: "100%" }}
                      value={
                        discountCurrent ? dataUpdate.bookIds : data.bookIds
                      }
                      onChange={handleSelectChange}
                      dropdownStyle={{ zIndex: 9999 }}
                      showSearch // Cho phép tìm kiếm
                    >
                      {books?.map((book) => (
                        <Select.Option
                          style={{ zIndex: 9999 }}
                          key={book.value}
                          value={book.value}
                        >
                          {book.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label>Ngày bắt đầu</label>
                    <input
                      type="datetime"
                      name="startDate"
                      value={
                        discountCurrent ? dataUpdate.startDate : data.startDate
                      }
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Ngày bắt đầu"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Ngày kết thúc</label>
                    <input
                      type="datetime"
                      name="endDate"
                      value={
                        discountCurrent ? dataUpdate.endDate : data.endDate
                      }
                      className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      placeholder="Ngày kết thúc"
                      onChange={handleChange}
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
