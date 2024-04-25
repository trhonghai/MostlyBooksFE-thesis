import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Modal, Pagination } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthour } from "~/hooks";
import AuthourForm from "./AuthourForm";

function ManageAuthours() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [authours, setAuthours] = useState();
  const [authourCurrent, setAuthourCurrent] = useState();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { getAllAuthours, getAAuthours, deleteAuthour } = useAuthour();
  const openModal = (mode) => {
    setIsModalOpen(true);
    setMode(mode);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  const openModalEdit = (itemId, mode) => {
    getAuthour(itemId);
    setIsModalEditOpen(true);
    setMode(mode);
  };

  useEffect(() => {
    fetchAuthours();
  }, []);

  const fetchAuthours = async () => {
    const result = await getAllAuthours();
    setAuthours(result);
  };
  const getAuthour = async (id) => {
    const result = await getAAuthours(id);
    setAuthourCurrent(result);
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
      await deleteAuthour(deleteItemId);
      fetchAuthours();
      closeDeleteModal();
      toast.success("Xóa danh mục thành công");
    } catch (error) {
      toast.error("Xóa danh mục thất bại");
    }
  };

  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(authours?.length / PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const currentAuthours = authours?.slice(startIndex, endIndex);

  return (
    <div className="bg-white w-full shadow-lg overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-xl">
        <div className=" rounded-lg mx-4 ">
          <div className="flex items-center justify-between py-5 ">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              QUẢN LÝ TÁC GIẢ
            </h3>
            <button
              onClick={() => openModal("add")}
              className=" ml-4 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#FBA31A] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#faaf00]"
            >
              Thêm tác giả
            </button>
            <AuthourForm
              open={isModalOpen}
              onClose={closeModal}
              mode={mode}
              authourCurrent={authourCurrent}
              fetchAuthours={fetchAuthours}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-2 py-3">Mã tác giã</th>
                  <th className="px-2 py-3">Tên tác giã</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentAuthours?.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-100 border-b border-gray-200 py-10 text-left"
                  >
                    <td className="px-2 py-4">{item.id}</td>
                    <td className="px-2 py-4">{item.name}</td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => openModalEdit(item.id, "edit")}
                        className="px-4 py-2 font-medium text-white bg-[#FFD16B] rounded-md hover:bg-[#FBA31A] focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <button onClick={() => openDeleteModal(item.id)}>
                        <Link className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                          <FontAwesomeIcon icon={faTrash} />
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
                <AuthourForm
                  open={isModalEditOpen}
                  onClose={closeModalEdit}
                  mode={mode}
                  authourCurrent={authourCurrent}
                  fetchAuthours={fetchAuthours}
                />
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
                              Bạn có chắc chắn muốn xóa danh mục này không?
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
              </tbody>
            </table>
          </div>
        </div>
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
    </div>
  );
}

export default ManageAuthours;
