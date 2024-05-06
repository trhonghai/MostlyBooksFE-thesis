import { Box, Modal } from "@mui/material";
import { Select } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAddress } from "~/hooks";
import useShippingRate from "~/hooks/useShippingRate";

function ShippingRateForm({
  isOpen,
  onClose,
  shippingRate,
  mode,
  fetchShippingRates,
}) {
  const [data, setData] = useState({
    price: "",
    day: "",
    provinceCode: "",
  });
  const [dataUpdate, setDataUpdate] = useState({
    price: "",
    day: "",
    provinceCode: "",
  });
  useEffect(() => {
    if (mode === "edit" && shippingRate) {
      setDataUpdate({
        price: shippingRate.price,
        day: shippingRate.day,
        provinceCode: shippingRate.province?.code,
      });
    }
  }, [mode, shippingRate]);
  const { getAllProvinces } = useAddress();
  const [provinces, setProvinces] = useState([]);
  const { createShippingRate, updateShippingRate, deleteShippingRate } =
    useShippingRate();
  useEffect(() => {
    const fetchProvinces = async () => {
      const result = await getAllProvinces();
      setProvinces(result);
    };
    fetchProvinces();
  }, []);
  console.log(provinces);

  console.log(provinces);
  const handleSelectChange = (value) => {
    setDataUpdate({ ...dataUpdate, provinceCode: value });
    setData({ ...data, provinceCode: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "add") {
      try {
        await createShippingRate(data);
        setData({
          price: "",
          day: "",
          provinceCode: "",
        });

        fetchShippingRates();
        toast.success("Thêm phí vận chuyển thành công");
      } catch (error) {
        toast.error("Thêm phí vận chuyển thất bại!");
      }
      onClose();
    } else if (mode === "edit") {
      try {
        console.log(shippingRate.id, dataUpdate);
        await updateShippingRate(shippingRate.id, dataUpdate);
        fetchShippingRates();
        setDataUpdate({
          price: "",
          day: "",
          provinceCode: "",
        });
        toast.success("Cập nhật phí vận chuyển thành công");
      } catch (error) {
        toast.error("Cập nhật phí vận chuyển thất bại!");
      }
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
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
                {mode === "add"
                  ? "Thêm nhà phí vận chuyển"
                  : "Cập nhật phí vận chuyển"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="w-full">
                  <label
                    for="price"
                    className="block text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Tĩnh/Thành Phố
                  </label>

                  <Select
                    // mode="multiple"
                    allowClear
                    name="provinceCode"
                    placeholder="Please select"
                    style={{ width: "100%" }}
                    value={
                      shippingRate ? dataUpdate.provinceCode : data.provinceCode
                    }
                    onChange={handleSelectChange}
                    dropdownStyle={{ zIndex: 9999 }}
                    showSearch // Cho phép tìm kiếm
                  >
                    {provinces?.map((province) => (
                      <Select.Option
                        style={{ zIndex: 9999 }}
                        key={province.value}
                        value={province.code}
                      >
                        {province?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="w-full">
                  <label
                    for="price"
                    className="block text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Phí vận chuyển
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={
                      mode === "edit" && shippingRate
                        ? dataUpdate.price
                        : data.price
                    }
                    className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    placeholder="Phí vận chuyển"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <label
                    for="price"
                    className="block text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Số ngày vận chuyển
                  </label>
                  <input
                    type="text"
                    name="day"
                    value={
                      mode === "edit" && shippingRate
                        ? dataUpdate.day
                        : data.day
                    }
                    className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    placeholder="Phí vận chuyển"
                    onChange={handleChange}
                  />
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

export default ShippingRateForm;
