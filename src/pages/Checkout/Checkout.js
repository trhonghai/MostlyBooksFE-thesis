import {
  faCirclePlus,
  faEdit,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocale } from "antd/es/locale";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import images from "~/assets/images";
import AddressList from "~/components/AddressList/AddressList";
import { useAddress } from "~/hooks";
import { formatPrice } from "~/utils/formatPrice";

function Checkout() {
  const location = useLocation();
  const { data, total_price } = location.state;
  const [allAddress, setAllAddress] = useState([]);
  const [addressChecked, setAddressChecked] = useState("");

  const { Address } = useAddress();

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    const result = await Address();
    setAllAddress(result);
    setAddressChecked(result.find((item) => item.defaultForShopping).id || "");
    console.log(addressChecked);
    console.log(allAddress);
  };

  console.log(data, total_price);
  const calculateTotalPrice = () => {
    const subtotal = total_price;
    const shippingFee = 31000; // Đây là ví dụ, bạn có thể thay đổi phí vận chuyển theo yêu cầu của mình

    return subtotal + shippingFee;
  };
  return (
    <section class="pt-2  justify-center bg-gray-100">
      <div className="container  md:w-10/12 mx-auto px-4">
        {/* <div className="container md:w-10/12 mx-auto px-4 bg-white mb-4 rounded-lg"> */}
        <div class="container w-10/12 mx-auto px-4 bg-white rounded-lg">
          <div class="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div class="lg:col-span-4 lg:row-end-1 mt-4 mb-4">
              <AddressList
                data={allAddress}
                addressChecked={addressChecked}
                setAddressChecked={setAddressChecked}
              />
            </div>
          </div>
        </div>
        <div class="container w-10/12 mx-auto px-4 bg-white rounded-lg">
          <div class="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div class="lg:col-span-4 lg:row-end-1 mt-4 mb-4">
              <h2 className="text-left text-lg border-b-2 border-gray-200 pb-2">
                PHƯƠNG THỨC VẬN CHUYỂN
              </h2>
              <div class="flex items-center justify-between mt-4">
                <div class="flex">
                  <input
                    type="radio"
                    class="form-radio h-5 w-5 text-indigo-600"
                    checked
                  ></input>
                  <label
                    class="ml-2 block
                                text-gray-700 "
                    for="account-option-0"
                  >
                    Giao hàng tiêu chuẩn: 31.000đ
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container w-10/12 mx-auto px-4 bg-white rounded-lg">
          <div class="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div class="lg:col-span-4 lg:row-end-1 mt-4 mb-4">
              <h2 className="text-left text-lg border-b-2 border-gray-200 pb-2">
                PHƯƠNG THỨC THANH TOÁN
              </h2>
              <div class=" items-center justify-between mt-4">
                <div class="flex items-center">
                  <input
                    type="radio"
                    class="form-radio h-5 w-5 text-indigo-600"
                    checked
                  ></input>
                  <img className="h-14 w-14" src={images.Paypal} />
                  <span>Paypal</span>
                </div>
                <div class="flex items-center">
                  <input
                    type="radio"
                    class="form-radio h-5 w-5 text-indigo-600"
                  ></input>
                  <img className="ml-2 h-10 w-10" src={images.Money} />
                  <span className="ml-2">
                    Thánh toán bằng tiền mặt khi nhận hàng
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container w-10/12 mx-auto px-4 bg-white rounded-lg">
          <div class="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div class="lg:col-span-4 lg:row-end-1 mt-4 mb-4">
              <h2 className="text-left text-lg border-b-2 border-gray-200 pb-2">
                KIỂM TRA LẠI ĐƠN HÀNG
              </h2>
              <div class=" items-center justify-between mt-4">
                <table class="w-full">
                  <thead>
                    <tr>
                      <th class="text-left font-semibold"></th>
                      <th class="text-center font-semibold"></th>
                      <th class="text-center font-semibold"></th>
                      <th class="text-center font-semibold"></th>
                      <th class="text-center font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr>
                        <td class="py-4">
                          <div class="flex items-center">
                            <img
                              class="h-32 w-32 mr-4"
                              src={item.book.img}
                              alt="Product image"
                            />
                            <span class="font-semibold">
                              Cây cam ngọt của tôi
                            </span>
                          </div>
                        </td>
                        <td class="text-left">{item.price}</td>
                        <td class="py-4">
                          <div class="flex ml-10 h-8 items-stretch text-gray-600">
                            <div class="flex  items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                              {item.quantity}
                            </div>
                          </div>
                        </td>
                        <td class="text-left">{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="container w-10/12 mx-auto px-4 bg-white rounded-lg">
          <div class="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div class="lg:col-span-4 lg:row-end-1 mt-4 mb-4">
              <h2 class="text-lg font-semibold mb-4">Summary</h2>
              <div class=" items-center justify-between mt-4">
                <div class="flex justify-between mb-2">
                  <span>Thành tiền</span>
                  <span>{formatPrice(total_price)}</span>
                </div>

                <div class="flex justify-between mb-2">
                  <span>Vận chuyển</span>
                  <span>{formatPrice(31000)}</span>
                </div>
                <div class="flex justify-between mb-2 border-1 border-b pb-2">
                  <span class="font-semibold text-xl">Tổng số tiền</span>
                  <span class="font-semibold">
                    {formatPrice(calculateTotalPrice())}
                  </span>
                </div>
                <button class="bg-[#FFD16B] text-white py-2 mb-2 rounded-lg mt-2 w-full">
                  Xác nhận thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
