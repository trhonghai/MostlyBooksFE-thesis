import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDiscount } from "~/hooks";
import DiscountForm from "./DiscountForm/DiscountForm";

function ManageDiscount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [discounts, setDiscounts] = useState();
  const [discountDetails, setDiscountDetails] = useState([]);
  const [discountCurrent, setDiscountCurrent] = useState();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { getAllDiscounts, getADiscount, deleteDiscount, getDiscountDetails } =
    useDiscount();

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

  const fetchDiscounts = async () => {
    const result = await getAllDiscounts();
    setDiscounts(result);
  };

  const openModalEdit = (itemId, mode) => {
    getADiscount(itemId);
    setIsModalEditOpen(true);
    setMode(mode);
  };

  // const openDeleteModal = (id) => {
  //   setIsModalDeleteOpen(true);
  //   setDeleteItemId(id);
  // };

  const fetchDiscountDetails = async (id) => {
    const result = await getDiscountDetails(id);
    setDiscountDetails(result);
  };

  useEffect(() => {
    fetchDiscounts();
    console.log(discounts);
    // fetchDiscountDetails();
  }, []);

  return (
    <div className="bg-white w-full shadow-lg overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-xl">
        <div className=" rounded-lg mx-4 ">
          <div className="flex items-center justify-between py-5 ">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              QUẢN LÝ KHUYẾN MÃI
            </h3>
            <button
              onClick={() => openModal("add")}
              class=" ml-4 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#FBA31A] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#faaf00]"
            >
              Thêm khuyến mãi
            </button>
            <DiscountForm
              open={isModalOpen}
              onClose={closeModal}
              mode={mode}
              fetchDiscounts={fetchDiscounts}
              discountCurrent={discountCurrent}
              discountDetails={discountDetails}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-2 py-3">Mã khuyến mãi</th>
                  <th className="px-2 py-3">Tên khuyến mãi</th>
                  <th className="px-2 py-3">Ngày bắt đầu</th>
                  <th className="px-2 py-3">Ngày kết thúc</th>
                  <th className="px-2 py-3">Phần trăm giảm </th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {discounts?.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-100 border-b border-gray-200 py-10 text-left"
                  >
                    <td className="px-2 py-4">{item.discountCode}</td>
                    <td className="px-2 py-4">{item.discountName}</td>
                    <td className="px-2 py-4">{item.startDate}</td>
                    <td className="px-2 py-4">{item.endDate}</td>
                    <td className="px-2 py-4">{item.discountPercentage}</td>
                    {/* {discountDetails?.map((detail) => (
                      <>
                        <td className="px-2 py-4">{detail.startDate}</td>
                        <td className="px-2 py-4">{detail.endDate}</td>
                        <td className="px-2 py-4">
                          {detail.discountPercentage}
                        </td>
                      </>
                    ))} */}
                    <td className="px-2 py-4">
                      <button
                        onClick={() => openModalEdit(item.id, "edit")}
                        className="px-4 py-2 font-medium text-white bg-[#FFD16B] rounded-md hover:bg-[#FBA31A] focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <button>
                        <Link className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                          <FontAwesomeIcon icon={faTrash} />
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
                <DiscountForm
                  open={isModalEditOpen}
                  onClose={closeModalEdit}
                  mode={mode}
                  discountCurrent={discountCurrent}
                  fetchDiscounts={fetchDiscounts}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageDiscount;
