import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useAddress } from "~/hooks";

function AddressList({ data, addressChecked, setAddressChecked }) {
  const {
    Address,
    updateAddress,
    createAddress,
    getDistricts,
    getAllProvinces,
    getWards,
    deleteAddress,
  } = useAddress();

  const [mode, setMode] = useState("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    phoneNumber: "",
    defaultForShopping: false,
  });
  // const fetchAddress = async () => {
  //   const result = await Address();
  //   setAllAddress(result);
  //   console.log(allAddress);
  // };
  useEffect(() => {
    // fetchAddress();
    fetchProvinces();
    console.log(data);
  }, []);
  const handleShowModal = (mode) => {
    setIsModalOpen(true);
    setMode(mode);
    console.log(isModalOpen);
  };
  const handleClickEditAddress = (item) => {
    setMode("edit");
    setAddressData(item);
    setIsModalOpen(true);
  };
  const handleClickDeleteAddress = (item) => {
    setMode("delete");
    setAddressData(item);
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const handleCheckAddress = (address_id) => {
    setAddressChecked(address_id);
  };
  const fetchWards = async (districtId) => {
    const result = await getWards(districtId);
    console.log(result);
    setWards(result);
  };
  const fetchProvinces = async () => {
    const result = await getAllProvinces();
    console.log(result);
    setProvinces(result);
  };

  const fetchDistricts = async (provinceId) => {
    const result = await getDistricts(provinceId);
    console.log(result);
    setDistricts(result);
  };

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    console.log(name, value);
    if (name === "sex") {
      value = Number(value);
    }
    if (name === "defaultForShopping") {
      value = e.target.checked;
    }

    setAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    const selectedCity = provinces.find((province) => province.name === value);
    console.log(selectedCity);
    const selectedCityId = selectedCity ? selectedCity.code : null;

    if (selectedCityId) {
      fetchDistricts(selectedCityId);
    }
    const selectedDistrict = districts.find(
      (district) => district.name === value
    );
    console.log(selectedCity);
    const selectedDistrictId = selectedDistrict ? selectedDistrict.code : null;
    if (selectedDistrictId) {
      fetchWards(selectedDistrictId);
    }
  };
  const handleCancel = () => {
    setAddressData({
      firstName: "",
      lastName: "",
      address: "",
      ward: "",
      district: "",
      city: "",
      phoneNumber: "",
      defaultForShopping: false,
    });
    setIsModalOpen(false);
  };
  const handleSubmit = async () => {
    let result = {};
    if (mode === "add") {
      result = await createAddress(addressData);
    } else if (mode === "edit") {
      result = await updateAddress(addressData);
    } else {
      result = await deleteAddress(addressData.id);
    }
    // await fetchAddress();
    setAddressData({
      firstName: "",
      lastName: "",
      address: "",
      ward: "",
      district: "",
      city: "",
      phoneNumber: "",
      defaultForShopping: false,
    });
  };
  return (
    <>
      <h2 className="text-left text-lg border-b-2 border-gray-200 pb-2">
        ĐỊA CHỈ GIAO HÀNG
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2"></th>
              <th class="px-4 py-2"></th>
              <th class="px-4 py-2"></th>
              <th class="px-4 py-2"></th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => {
                // Đặt địa chỉ mặc định lên đầu tiên
                if (
                  a.defaultForShopping === true &&
                  b.defaultForShopping === false
                ) {
                  return -1; // a sẽ được đưa lên trước b
                } else if (
                  a.defaultForShopping === false &&
                  b.defaultForShopping === true
                ) {
                  return 1; // b sẽ được đưa lên trước a
                } else {
                  return 0; // Giữ nguyên vị trí nếu cả hai đều có hoặc không có defaultForShopping
                }
              })
              .map((item, index) => (
                <tr key={index} class="border-b border-gray-200">
                  <td class="px-4 py-2 text-left">
                    <input
                      type="radio"
                      class="form-radio h-5 w-5 text-indigo-600"
                      checked={addressChecked === item.id}
                      onClick={() => handleCheckAddress(item.id)}
                    />
                  </td>
                  <td class="px-4 py-2 text-left">
                    <label class="block text-gray-700">
                      {item.lastName} {item.firstName}
                    </label>
                  </td>
                  <td class="px-4 py-2 text-left">
                    <label class="block text-gray-700">
                      {item.address}, {item.ward}, {item.district}, {item.city}
                    </label>
                  </td>
                  <td class="px-4 py-2 text-left">
                    <label class="block text-gray-700">
                      {item.phoneNumber}
                    </label>
                  </td>
                  <td class="px-4 py-2 text-left">
                    <div class="flex">
                      <button
                        onClick={() => handleClickEditAddress(item)}
                        class="mr-4"
                      >
                        <FontAwesomeIcon icon={faEdit} color="blue" size="lg" />
                      </button>
                      {item.defaultForShopping === false && (
                        <button onClick={() => handleClickDeleteAddress(item)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            color="blue"
                            size="lg"
                          />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {mode !== "delete" ? (
          <div class="min-h-screen p-6 flex items-center justify-center ">
            <div class="container max-w-xl  ">
              <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                  <div class="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                          <h2 className="text-xl mb-4 ">
                            {mode === "add"
                              ? "Thêm địa chỉ"
                              : "Cập nhật địa chỉ"}
                          </h2>
                          <label for="full_name">Họ</label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.firstName}
                            onChange={handleChange}
                          />
                        </div>

                        <div class="md:col-span-5">
                          <label for="email">Tên</label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.lastName}
                            onChange={handleChange}
                          />
                        </div>

                        <div class="md:col-span-5">
                          <label for="email">Số điện thoại</label>
                          <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.phoneNumber}
                            onChange={handleChange}
                          />
                        </div>

                        <div class="md:col-span-3">
                          <label for="address">Địa chỉ cụ thể</label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.address}
                            placeholder=""
                            onChange={handleChange}
                          />
                        </div>

                        <div class="md:col-span-2">
                          <label for="city">Thành phố</label>
                          <select
                            name="city"
                            id="city"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.city}
                            onChange={handleChange}
                          >
                            {addressData.city === "" ? (
                              <option value="">Chọn Tỉnh/Thành</option>
                            ) : (
                              <option value={addressData.city}>
                                {addressData.city}
                              </option>
                            )}
                            {provinces?.map((province) => (
                              <option key={province.code} value={province.name}>
                                {province.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div class="md:col-span-2">
                          <label for="country">Quận/Huyện</label>

                          <select
                            name="district"
                            id="district"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.district}
                            onChange={handleChange}
                          >
                            {addressData.district === "" ? (
                              <option value="">Chọn Quận/Huyện</option>
                            ) : (
                              <option value={addressData.district}>
                                {addressData.district}
                              </option>
                            )}
                            {districts.map((district) => (
                              <option key={district.code} value={district.name}>
                                {district.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div class="md:col-span-2">
                          <label for="state">Phường/Xã</label>
                          <select
                            name="ward"
                            id="ward"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.ward}
                            onChange={handleChange}
                          >
                            {addressData.ward === "" ? (
                              <option value="">Chọn Phường/Xã</option>
                            ) : (
                              <option value={addressData.ward}>
                                {addressData.ward}
                              </option>
                            )}
                            <option value={addressData.ward}>
                              {addressData.ward}
                            </option>
                            {wards?.map((ward) => (
                              <option key={ward.code} value={ward.name}>
                                {ward.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="flex items-center md:col-span-2">
                          <input
                            className="w-4 h-4 "
                            name="defaultForShopping"
                            checked={addressData.defaultForShopping === true}
                            value={addressData.defaultForShopping}
                            type="checkbox"
                            onChange={handleChange}
                          />
                          <span className="ml-2">Đặt làm mặc định</span>
                        </div>

                        <div class="md:col-span-5 flex mt-2 items-center justify-center">
                          <div class="inline-flex items-end">
                            <button
                              type="submit"
                              class="mr-2 bg-[#FFD16B] hover:transition text-white font-bold py-2 px-4 rounded"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={handleCancel}
                              class="bg-[#FFD16B] hover:transition text-white font-bold py-2 px-4 rounded"
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="min-h-screen p-6 flex items-center justify-center ">
            <div class="container max-w-xl  ">
              <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                  <div class="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                          <h2 className="text-xl mb-4 ">
                            Bạn có chắc chắn muốn xóa địa chỉ này không?
                          </h2>
                        </div>
                        <div class="md:col-span-5 flex mt-2 items-center justify-center">
                          <div class="inline-flex items-end">
                            <button
                              type="submit"
                              class="mr-2 bg-[#FFD16B] hover:transition text-white font-bold py-2 px-4 rounded"
                            >
                              Xóa
                            </button>
                            <button
                              onClick={handleCancel}
                              class="bg-[#FFD16B] hover:transition text-white font-bold py-2 px-4 rounded"
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <div className="text-left mt-2 ml-4">
        <button onClick={() => handleShowModal("add")}>
          <FontAwesomeIcon icon={faCirclePlus} color="blue" size="lg" />
          <span class="ml-2 text-gray-700 ">Giao hàng đến địa chỉ khác</span>
        </button>
      </div>
    </>
  );
}

export default AddressList;
