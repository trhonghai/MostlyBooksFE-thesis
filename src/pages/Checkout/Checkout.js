import { data } from "autoprefixer";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import images from "~/assets/images";
import AddressList from "~/components/AddressList/AddressList";
import AuthContext from "~/context/AuthProvider";
import { useAddress, useOrder } from "~/hooks";
import { formatPrice } from "~/utils/formatPrice";

function Checkout() {
  const [allAddress, setAllAddress] = useState([]);
  const [addressChecked, setAddressChecked] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [shippingRate, setShippingRate] = useState(0);

  const { deleteOrderById } = useOrder();
  const location = useLocation();
  const orderData = location.state && location.state.orderData;

  const orderId = location.state && location.state.orderId;
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("dataCheckOut")) || orderData || []
  );
  console.log(items);

  const { cartId, userCurrent } = useContext(AuthContext);

  const orderDetailsId = items.map((item) => item.id);

  const DeleteItemsFromCart = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user-cart/checkout-items?cart=${cartId}`,
        orderDetailsId
      );
      console.log(response);
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  const [paymentRequest, setPaymentRequest] = useState({
    amount: 0,
    currency: "USD",
    description: "Payment description",
    customerId: userCurrent,
    orderDetailsId: orderDetailsId,
    shippingFee: shippingRate,
  });

  const { Address, getShippingRate } = useAddress();

  useEffect(() => {
    fetchAddress();
  }, [addressChecked]);

  const fetchAddress = async () => {
    const result = await Address();
    setAllAddress(result);
    setAddressChecked(result.find((item) => item.defaultForShopping)?.id || "");
    const selectedAddress = result.find((item) => item.defaultForShopping);
    if (selectedAddress) {
      const province = selectedAddress.city; // Giả sử province là một đối tượng Province
      const shippingRate = await fetchShippingRate(province); // Sử dụng đối tượng Province để truy vấn giá ship
      setShippingRate(shippingRate.price); // Cập nhật giá ship vào state hoặc hiển thị trực tiếp trên giao diện
    }
  };

  const fetchShippingRate = async (province) => {
    try {
      const response = await getShippingRate(province);
      return response;
    } catch (error) {
      console.error("Error fetching shipping rate:", error);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    const shippingCost = 30000; // Giá tiền ship
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    total += shippingCost; // Cộng thêm giá tiền ship vào tổng giá tiền
    return total;
  };
  const calculateTotalPriceInUSD = () => {
    const exchangeRate = 25000; // Tỷ giá USD/VND
    const totalInCurrency = calculateTotalPrice(); // Gọi hàm tính tổng giá tiền
    const totalInUSD = totalInCurrency / exchangeRate; // Chuyển đổi sang USD
    return totalInUSD;
  };
  useEffect(() => {
    const total = calculateTotalPriceInUSD();
    setPaymentRequest((prevPaymentRequest) => ({
      ...prevPaymentRequest,
      amount: total,
      shippingFee: shippingRate,
    }));
  }, [paymentMethod, shippingRate, items]);

  const createPayment = async () => {
    try {
      if (paymentMethod === "paypal") {
        console.log(paymentRequest);
        const response = await axios.post(
          "http://localhost:8080/api/paypal/orders/create",
          paymentRequest
        );
        if (orderData) {
          await deleteOrderById(orderId);
        }
        localStorage.removeItem("dataCheckOut");
        window.location.href = response.data.links
          .map((link) => {
            if (link.rel === "approve") return link.href;
          })
          .filter((item) => {
            return item !== undefined;
          })
          .join("");
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/payment/cash-on-delivery",
          paymentRequest
        );
        console.log("Call API for cash on delivery");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    }
    await DeleteItemsFromCart();
  };

  return (
    <section className="pt-2  justify-center bg-gray-100">
      <div className="container  md:w-10/12 mx-auto px-4">
        {/* <div className="container md:w-10/12 mx-auto px-4 bg-white mb-4 rounded-lg"> */}
        <div className="container w-10/12 mx-auto px-4 bg-white rounded-lg">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div className="lg:col-span-4 lg:row-end-1 mt-4 mb-4">
              <AddressList
                data={allAddress}
                addressChecked={addressChecked}
                setAddressChecked={setAddressChecked}
              />
            </div>
          </div>
        </div>
        <div className="container w-10/12 mx-auto px-4 bg-white rounded-lg">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div className="lg:col-span-4 lg:row-end-1 mt-4 mb-4">
              <h2 className="text-left text-lg border-b-2 border-gray-200 pb-2">
                PHƯƠNG THỨC VẬN CHUYỂN
              </h2>
              <div className="flex items-center justify-between mt-4">
                <div className="flex">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    checked
                  ></input>
                  <label
                    className="ml-2 block
                                text-gray-700 "
                    for="account-option-0"
                  >
                    Giao hàng tiêu chuẩn: {formatPrice(shippingRate)}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container w-10/12 mx-auto px-4 bg-white rounded-lg">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div className="lg:col-span-4 lg:row-end-1 mt-4 mb-4">
              <h2 className="text-left text-lg border-b-2 border-gray-200 pb-2">
                PHƯƠNG THỨC THANH TOÁN
              </h2>
              <div className=" items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                  ></input>
                  <img className="h-14 w-14" src={images.Paypal} />
                  <span>Paypal</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    checked={paymentMethod === "cash_on_delivery"}
                    onChange={() => setPaymentMethod("cash_on_delivery")}
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
        <div className="container w-10/12 mx-auto px-4 bg-white rounded-lg">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div className="lg:col-span-4 lg:row-end-1 mt-4 mb-4">
              <h2 className="text-left text-lg border-b-2 border-gray-200 pb-2">
                KIỂM TRA LẠI ĐƠN HÀNG
              </h2>
              <div className=" items-center justify-between mt-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold"></th>
                      <th className="text-center font-semibold"></th>
                      <th className="text-center font-semibold"></th>
                      <th className="text-center font-semibold"></th>
                      <th className="text-center font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((item) => (
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              className="h-32 w-32 mr-4"
                              src={item.book.img}
                              alt="Product image"
                            />
                            <span className="font-semibold">
                              Cây cam ngọt của tôi
                            </span>
                          </div>
                        </td>
                        <td className="text-left">{formatPrice(item.price)}</td>
                        <td className="py-4">
                          <div className="flex ml-10 h-8 items-stretch text-gray-600">
                            <div className="flex  items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                              {item.quantity}
                            </div>
                          </div>
                        </td>
                        <td className="text-left">
                          {formatPrice(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="container w-10/12 mx-auto px-4 bg-white rounded-lg">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-4 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            <div className="lg:col-span-4 lg:row-end-1 mt-4 mb-4">
              <div className=" items-center justify-between mt-4">
                <div className="flex justify-between mb-2">
                  <span>Thành tiền</span>
                  <span>{formatPrice(calculateTotalPrice())}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Vận chuyển</span>
                  <span>{formatPrice(shippingRate)}</span>
                </div>
                <div className="flex justify-between mb-2 border-1 border-b pb-2">
                  <span className="font-semibold text-xl">Tổng số tiền</span>
                  <span className="font-semibold">
                    {formatPrice(calculateTotalPrice() + shippingRate)}
                  </span>
                </div>
                <button
                  onClick={createPayment}
                  className="bg-[#FFD16B] text-white py-2 mb-2 rounded-lg mt-2 w-full"
                >
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
