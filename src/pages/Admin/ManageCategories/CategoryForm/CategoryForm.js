import { Box, Modal } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import UseCategory from "~/hooks/useCategory";

function CategoryForm({
  open,
  onClose,
  categoryCurrent,
  mode,
  fetchCategories,
}) {
  const [data, setData] = useState({
    name: "",
  });

  const [dataUpdate, setDataUpdate] = useState({ name: "" });
  const { addCategory, updateCategory, deleteCategory } = UseCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "add") {
      await addCategory(data);
      setData({ name: " " });
      fetchCategories();
      toast.success("Thêm danh mục thành công");
      onClose();
    } else if (mode === "edit") {
      await updateCategory(data, categoryCurrent.id);
      setDataUpdate({ name: " " });
      fetchCategories();
      toast.success("Cập nhật danh mục thành công");
      onClose();
    } else {
      await deleteCategory(categoryCurrent.id);
      fetchCategories();
      toast.success("Xóa danh mục thành công");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setDataUpdate({ ...dataUpdate, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (categoryCurrent) {
      setDataUpdate(categoryCurrent);
    }
  }, [categoryCurrent]);

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
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {mode === "add" ? "Thêm danh mục" : "Cập nhật danh mục"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div class="grid gap-6 sm:grid-cols-1 sm:gap-6">
                  <input
                    type="text"
                    name="name"
                    value={
                      mode === "edit" && categoryCurrent
                        ? dataUpdate.name
                        : data.name
                    }
                    class="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    placeholder="Tên danh mục"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    class="inline-flex w-48 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#FFD16B] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    {mode === "add" ? "Thêm" : "Cập nhật"}
                  </button>
                  <button
                    onClick={onClose}
                    class="inline-flex ml-4 w-48 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#FFD16B] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
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

export default CategoryForm;
