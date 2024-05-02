import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AspectRatio } from "@material-ui/icons";
import { Modal } from "@mui/material";

import { useState } from "react";
import { useEffect } from "react";
import { useAddress } from "~/hooks";

function Address() {
  const [allAddress, setAllAddress] = useState([]);
  const [addressData, setAddressData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    phoneNumber: "",
    defaultForShopping: false,
  });
  const [mode, setMode] = useState("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const {
    Address,
    updateAddress,
    createAddress,
    getDistricts,
    getAllProvinces,
    getWards,
    deleteAddress,
  } = useAddress();

  useEffect(() => {
    fetchAddress();
    fetchProvinces();
    console.log(addressData);
  }, []);

  const fetchAddress = async () => {
    const result = await Address();
    setAllAddress(result);
    console.log(allAddress);
    console.log(allAddress);
  };

  const handleClickEditAddress = (item) => {
    setMode("edit");
    setAddressData(item);
    console.log(addressData);
    setIsModalOpen(true);
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
    await fetchAddress();
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

  const handleChange = async (e) => {
    const { name } = e.target;
    let { value } = e.target;
    console.log(name, value);
    if (name === "sex") {
      value = Number(value);
    }
    if (name === "defaultForShopping") {
      value = e.target.checked;
    }

    const selectedCity = provinces.find((province) => province.name === value);
    console.log(selectedCity);
    const selectedCityId = selectedCity ? selectedCity.code : null;

    if (selectedCityId) {
      await fetchDistricts(selectedCityId);
    }
    const selectedDistrict = districts.find(
      (district) => district.name === value
    );
    console.log(selectedCity);
    const selectedDistrictId = selectedDistrict ? selectedDistrict.code : null;
    if (selectedDistrictId) {
      await fetchWards(selectedDistrictId);
    }
    setAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchWards = async (districtId) => {
    const result = await getWards(districtId);
    console.log(result);
    setWards(result);
  };

  const fetchDistricts = async (provinceId) => {
    const result = await getDistricts(provinceId);
    console.log(result);
    setDistricts(result);
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

  const handleShowModal = (mode) => {
    setIsModalOpen(true);
    setMode(mode);
    console.log(isModalOpen);
  };

  const fetchProvinces = async () => {
    const result = await getAllProvinces();
    console.log(result);
    setProvinces(result);
  };
  const handleClickDeleteAddress = (item) => {
    setMode("delete");
    setAddressData(item);
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  return (
    <div className="bg-white max-w-4xl shadow overflow-hidden sm:rounded-lg">
      <div className=" flex justify-between items-center px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          SỔ ĐỊA CHỈ
        </h3>
        <button
          onClick={() => handleShowModal("add")}
          className="bg-[#FFD16B] hover:bg-[#] text-white font-bold py-2 px-4 rounded"
        >
          THÊM ĐỊA CHỈ
        </button>
      </div>
      <div className="grid m:grid sm:grid-cols-1 sm:grid-rows-1 mb-4 ml-4 mr-4 sm:gap-2  border-t border-gray-200">
        {allAddress.length > 0 ? (
          allAddress
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
            ?.map((item) => (
              <div className="flex border rounded-lg mt-4 text-left px-4 py-5 justify-between">
                <div>
                  <ul className="">
                    <li className="text-sm mt-2">
                      {item.firstName} {item.lastName}
                    </li>
                    <li className="text-sm mt-2 ">{item.address}</li>
                    <li className="text-sm mt-2">
                      {item.ward}, {item.district}, {item.city}
                    </li>
                    <li className="text-sm mt-2">tel: {item.phoneNumber}</li>
                  </ul>
                </div>
                <div>
                  <div className="text-end">
                    <button
                      className="mr-4"
                      onClick={() => handleClickEditAddress(item)}
                    >
                      {/* <span className="mr-2">Cập nhật</span> */}
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="mr-4"
                      onClick={() => handleClickDeleteAddress(item)}
                    >
                      {/* <span className="mr-2">Xóa</span> */}
                      <FontAwesomeIcon icon={faTrash} color="red" />
                    </button>
                  </div>
                  <div>
                    {item.defaultForShopping === true ? (
                      <button className=" border text-sm rounded-lg hover:bg-[#FFD16B] hover:text-white hover:transition-transform ease-in-out hover:scale-105 duration-500 p-1 mt-2">
                        {" "}
                        Mặc định
                      </button>
                    ) : (
                      <button className="border text-sm rounded-lg hover:bg-[#FFD16B] hover:text-white hover:transition-transform ease-in-out hover:scale-105 duration-500 p-1 mt-2">
                        Thiết lập mặc định
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center mt-4">Bạn chưa có địa chỉ nào</div>
        )}
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {mode !== "delete" ? (
          <div className="min-h-screen p-6 flex items-center justify-center ">
            <div className="container max-w-xl  ">
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                  <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                          <h2 className="text-xl mb-4 ">
                            {mode === "add"
                              ? "Thêm địa chỉ"
                              : "Cập nhật địa chỉ"}
                          </h2>
                          <label for="full_name">Họ</label>
                          <input
                            required
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.firstName}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="md:col-span-5">
                          <label for="email">Tên</label>
                          <input
                            required
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.lastName}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="md:col-span-5">
                          <label for="email">Số điện thoại</label>
                          <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.phoneNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label for="address">Địa chỉ cụ thể</label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.address}
                            placeholder=""
                            required
                            onChange={handleChange}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label for="city">Thành phố</label>
                          <select
                            name="city"
                            id="city"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.city}
                            required
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

                        <div className="md:col-span-2">
                          <label for="district">Quận/Huyện</label>
                          <select
                            name="district"
                            id="district"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.district}
                            required
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

                        <div className="md:col-span-2">
                          <label for="ward">Phường/Xã</label>
                          <select
                            name="ward"
                            id="ward"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={addressData.ward}
                            required
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
                        <div className="flex items-center md:col-span-2">
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
          <div className="min-h-screen p-6 flex items-center justify-center ">
            <div className="container max-w-xl  ">
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                  <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                          <h2 className="text-xl mb-4 ">
                            Bạn có chắc chắn muốn xóa địa chỉ này không?
                          </h2>
                        </div>
                        <div className="md:col-span-5 flex mt-2 items-center justify-center">
                          <div className="inline-flex items-end">
                            <button
                              type="submit"
                              className="mr-2 bg-[#FFD16B] hover:transition text-white font-bold py-2 px-4 rounded"
                            >
                              Xóa
                            </button>
                            <button
                              onClick={handleCancel}
                              className="bg-[#FFD16B] hover:transition text-white font-bold py-2 px-4 rounded"
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
    </div>
  );
}

export default Address;
