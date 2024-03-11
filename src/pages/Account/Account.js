import { useState } from "react";
import { useEffect } from "react";
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
    console.log(result);

    // if (!result.success) {
    //     setError(result.errors)
    //     return
    // }

    // toast.success(result.message);
  };

  return (
    <div class="bg-white max-w-4xl shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          THÔNG TIN TÀI KHOẢN
        </h3>
      </div>
      <div class="border-t border-gray-200">
        <form onSubmit={handleSubmit}>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Họ</dt>
            <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Tên</dt>
            <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Số điện thoại</dt>
            <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="phone"
                value={customerData.phone}
                onChange={handleChange}
                className="w-full font-semibold h-8 border-gray-200 border-solid border-2 rounded-md pl-4  focus:outline-none focus:border-blue-300 focus:ring-blue-300"
              />
            </div>
          </div>
          <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email</dt>
            <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="email"
                value={customerData.email}
                onChange={handleChange}
                className="w-full font-semibold h-8 border-gray-200 border-solid border-2 rounded-md pl-4  focus:outline-none focus:border-blue-300 focus:ring-blue-300"
              />
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Giới tính</dt>
            <div class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 text-left">
              <input
                spellCheck={false}
                type="radio"
                id="gender_male"
                name="sex"
                value={Sex.male}
                checked={customerData.sex == Sex.male}
                onChange={handleChange}
                class="items-center mr-1 form-radio text-blue-500 h-4 w-4"
              />
              <label for="gender_male" class=" mr-8 text-sm text-gray-700">
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
                class=" mr-1 form-radio text-pink-500 h-4 w-4"
              />
              <label for="gender_female" class="text-sm text-gray-700">
                Nữ
              </label>
            </div>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Ngày sinh</dt>
            <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
          <div class=" flex justify-center bg-gray-50 px-4 py-5 sm:grid  sm:gap-4 sm:px-6">
            <div class="flex items-center justify-center">
              <button
                type="submit"
                class="bg-[#FFD16B] hover:bg-[#] text-white font-bold py-2 px-4 rounded"
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
