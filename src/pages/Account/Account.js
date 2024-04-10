import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useCustomer from "~/hooks/useCustomer";
const Sex = {
  male: 0,
  female: 1,
};
function Account() {
  const { Customer, updateCustomer } = useCustomer();
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    sex: Sex.male,
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    sex: "",
  });

  useEffect(() => {
    fetchCustomer();
    console.log(customerData);
  }, []);

  const fetchCustomer = async () => {
    const result = await Customer();
    const { firstName, lastName, email, phone, dateOfBirth, sex } = result;
    console.log(result);
    const birthDate = new Date(dateOfBirth);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const birthdayString = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    setCustomerData({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth: birthdayString,
      sex,
    });
  };

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "sex") {
      value = Number(value);
    }

    setError((prev) => ({ ...prev, [name]: "" }));
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...customerData,
      dateOfBirth: customerData.dateOfBirth
        ? new Date(customerData.dateOfBirth).toISOString()
        : "",
    };
    console.log(dataToSend);
    const result = await updateCustomer(dataToSend);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    console.log(result.message);
  };

  return (
    <div className="bg-white max-w-4xl shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          THÔNG TIN TÀI KHOẢN
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Họ</dt>
            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="firstName"
                value={customerData.firstName}
                required
                onChange={handleChange}
                className="w-full font-semibold h-8 border-gray-200 border-solid border-2 rounded-md pl-4  focus:outline-none focus:border-blue-300 focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tên</dt>
            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="lastName"
                value={customerData.lastName}
                required
                onChange={handleChange}
                className="w-full font-semibold h-8 border-gray-200 border-solid border-2 rounded-md pl-4  focus:outline-none focus:border-blue-300 focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Số điện thoại</dt>
            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="phone"
                value={customerData.phone}
                onChange={handleChange}
                className="w-full font-semibold h-8 border-gray-200 border-solid border-2 rounded-md pl-4  focus:outline-none focus:border-blue-300 focus:ring-blue-300"
              />
            </div>
          </div>
          <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="email"
                value={customerData.email}
                onChange={handleChange}
                className="w-full font-semibold h-8 border-gray-200 border-solid border-2 rounded-md pl-4  focus:outline-none focus:border-blue-300 focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Giới tính</dt>
            <div className="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 text-left">
              <input
                spellCheck={false}
                type="radio"
                id="gender_male"
                name="sex"
                value={Sex.male}
                checked={customerData.sex == Sex.male}
                onChange={handleChange}
                className="items-center mr-1 form-radio text-blue-500 h-4 w-4"
              />
              <label for="gender_male" className=" mr-8 text-sm text-gray-700">
                Nam
              </label>

              <input
                spellCheck={false}
                type="radio"
                id="gender_female"
                name="sex"
                value={Sex.female}
                checked={customerData.sex == Sex.female}
                onChange={handleChange}
                className=" mr-1 form-radio text-pink-500 h-4 w-4"
              />
              <label for="gender_female" className="text-sm text-gray-700">
                Nữ
              </label>
            </div>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Ngày sinh</dt>
            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="date"
                value={customerData.dateOfBirth}
                name="dateOfBirth"
                required
                onChange={handleChange}
                className="w-full font-semibold h-8 border-gray-200 border-solid border-2 rounded-md pl-4  focus:outline-none focus:border-blue-300 focus:ring-blue-300"
              />
            </div>
          </div>
          <div className=" flex justify-center bg-gray-50 px-4 py-5 sm:grid  sm:gap-4 sm:px-6">
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#FFD16B] hover:bg-[#] text-white font-bold py-2 px-4 rounded"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
