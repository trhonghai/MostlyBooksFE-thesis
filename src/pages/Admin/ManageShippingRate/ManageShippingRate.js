import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useShippingRate from "~/hooks/useShippingRate";
import ShippingRateForm from "./ShippingRateForm";
import toast from "react-hot-toast";
import { Modal } from "@mui/material";

function ManageShippingRate() {
  const [shippingRates, setShippingRates] = useState([]);
  const { getAllShippingRates, getAShippingRate, deleteShippingRate } =
    useShippingRate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [shippingRateCurrent, setShippingRateCurrent] = useState({});
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [mode, setMode] = useState("add");
  const openModal = (mode) => {
    setIsModalOpen(true);
    setMode(mode);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalDetail = async (id) => {
    await fetchAShippingRate(id);
    setMode("edit");
    setIsModalDetailOpen(true);
  };
  const fetchAShippingRate = async (id) => {
    const result = await getAShippingRate(id);
    setShippingRateCurrent(result);
  };
  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
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
      await deleteShippingRate(deleteItemId);
      fetchShippingRates();
      closeDeleteModal();
      toast.success("Xóa danh mục thành công");
    } catch (error) {
      toast.error("Xóa danh mục thất bại");
    }
  };
  const fetchShippingRates = async () => {
    try {
      const result = await getAllShippingRates();
      setShippingRates(result);
    } catch (error) {
      console.log("Failed to fetch shipping rates: ", error);
    }
  };

  useEffect(() => {
    fetchShippingRates();
  }, []);

  return (
    <div className="bg-white w-full shadow-lg overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-xl">
        <div className="rounded-lg mx-4">
          <div className="flex items-center justify-between py-5">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              QUẢN LÝ PHÍ VẬN CHUYỂN
            </h3>
            <button
              onClick={() => openModal("add")}
              className="ml-4 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#FBA31A] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#faaf00]"
            >
              Thêm phí vận chuyển
            </button>
            <ShippingRateForm
              isOpen={isModalOpen}
              onClose={closeModal}
              mode={mode}
              fetchShippingRates={fetchShippingRates}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-2 py-3">Mã phí vận chuyển</th>
                  <th className="px-2 py-3">Giá</th>
                  <th className="px-2 py-3">Số ngày vận chuyển</th>
                  <th className="px-2 py-3">Tĩnh/Thành Phố</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {shippingRates.map((shippingRate) => (
                  <tr
                    key={shippingRate.id}
                    className="border-b border-gray-200"
                  >
                    <td className="px-2 py-4">{shippingRate.id}</td>
                    <td className="px-2 py-4">{shippingRate.price}</td>
                    <td className="px-2 py-4">{shippingRate.day}</td>
                    <td className="px-2 py-4">{shippingRate.province?.name}</td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => openModalDetail(shippingRate?.id)}
                        className="px-4 py-2 font-medium text-white bg-[#FFD16B] rounded-md hover:bg-[#FBA31A] focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button onClick={() => openDeleteModal(shippingRate?.id)}>
                        <Link className="text-[#FFD16B] ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                          <FontAwesomeIcon icon={faTrash} />
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ShippingRateForm
              isOpen={isModalDetailOpen}
              onClose={closeModalDetail}
              shippingRate={shippingRateCurrent}
              mode={mode}
              fetchShippingRates={fetchShippingRates}
            />
          </div>
        </div>
        <Modal
          open={isModalDeleteOpen}
          onClose={closeDeleteModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h2
                    id="modal-modal-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    Xác nhận
                  </h2>
                  <div className="mt-3 sm:mt-0 sm:text-left">
                    <p
                      id="modal-modal-description"
                      className="text-sm text-gray-500"
                    >
                      Bạn có chắc chắn muốn xóa vận chuyển này không?
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
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ManageShippingRate;
