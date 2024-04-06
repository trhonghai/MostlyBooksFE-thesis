import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePublisher } from "~/hooks";

function PubForm({ open, onClose, mode, publisherCurrent, fetchPubs }) {
  const [data, setData] = useState({
    name: "",

    email: "",
    phone: "",
    photos: "",
    address: "",
  });
  const [dataUpdate, setDataUpdate] = useState({
    name: "",
    email: "",
    phone: "",
    photos: "",
    address: "",
  });
  const { updatePub, deletePub, createPub } = usePublisher();
  const [fileSizeError, setFileSizeError] = useState(null);
  const [thumbnailSrc, setThumbnailSrc] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "add") {
      try {
        await createPub(data, file);
        setData({ name: " " });
        fetchPubs();
        toast.success("Thêm tác giả thành công");
      } catch (error) {
        toast.error("Thêm tác giả thất bại!");
      }
      onClose();
    } else if (mode === "edit") {
      try {
        console.log(dataUpdate, publisherCurrent.id, file);
        await updatePub(dataUpdate, publisherCurrent.id, file);
        setDataUpdate({ name: " " });
        fetchPubs();
        toast.success("Cập nhật tác giả thành công");
      } catch (error) {
        toast.error("Cập nhật tác giả thất bại!");
      }
      onClose();
    } else {
      try {
        await deletePub(publisherCurrent.id);
        fetchPubs();
        toast.success("Xóa tác giả thành công");
      } catch (error) {
        toast.error("Xóa tác giả thất bại!");
      }
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setDataUpdate({ ...dataUpdate, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (publisherCurrent) {
      setDataUpdate(publisherCurrent);
      setThumbnailSrc(publisherCurrent.photos);
    }
  }, [publisherCurrent]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileSize = selectedFile.size;
      if (fileSize > 1048576) {
        setFileSizeError("You must choose an image less than 1MB!");
        setFile(null);
      } else {
        setFileSizeError(null);
        setFile(selectedFile);
        showImageThumbnail(selectedFile);
      }
    }
  };
  const showImageThumbnail = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const thumbnailSrc = e.target.result;
      setThumbnailSrc(thumbnailSrc);
    };

    reader.readAsDataURL(file);
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
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {mode === "add" ? "Thêm nhà xuất bản" : "Cập nhật nhà xuất bản"}
              </h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div class="w-full">
                  <label
                    for="price"
                    class="block text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Tên nhà xuất bản
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={
                      mode === "edit" && publisherCurrent
                        ? dataUpdate.name
                        : data.name
                    }
                    class="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    placeholder="Tên nhà xuất bản"
                    onChange={handleChange}
                  />
                </div>
                <div class="w-full mt-2">
                  <label
                    for="price"
                    class="block text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={
                      mode === "edit" && publisherCurrent
                        ? dataUpdate.email
                        : data.email
                    }
                    class="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div class="w-full mt-2">
                  <label
                    for="price"
                    class="block text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={
                      mode === "edit" && publisherCurrent
                        ? dataUpdate.phone
                        : data.phone
                    }
                    class="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    placeholder="Số điện thoại"
                    onChange={handleChange}
                  />
                </div>
                <div class="w-full mt-2">
                  <label
                    for="price"
                    class="block text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={
                      mode === "edit" && publisherCurrent
                        ? dataUpdate.address
                        : data.address
                    }
                    class="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    placeholder="Địa chỉ"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full text-left">
                  <label
                    for="cover"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Hình ảnh
                  </label>
                  <div className="flex items-center justify-center border border-gray-300 border-dashed rounded-lg p-4">
                    <input
                      type="file"
                      name="image"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                    />
                    {fileSizeError && (
                      <p style={{ color: "red" }}>{fileSizeError}</p>
                    )}
                    {thumbnailSrc && (
                      <img
                        src={thumbnailSrc}
                        alt="Thumbnail"
                        className="max-w-100 max-h-48"
                      />
                    )}
                  </div>
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

export default PubForm;
