import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { formatPrice } from "~/utils/formatPrice";

function CartItem() {
  const [cartItem, setCartItem] = useState([]);
  const [selectAllItems, setSelectAllItems] = useState(false);
 

  const cartId = localStorage.getItem("cartId");

  useEffect(() => {
    fetchCartItem();
  }, []);

  const fetchCartItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user-cart?cart=${cartId}`
      );
      console.log(response.data);
      const updatedCartItem = response.data.map((item) => ({
        ...item,
        isChecked:
          cartItem.find((cartItem) => cartItem.id === item.id)?.isChecked ||
          false,
      }));
      setCartItem(updatedCartItem);
      // setCartItem(response.data);
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const deleteCartItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/user-cart/delete-item?cart=${cartId}&item=${id}`
      );
      console.log(response);
      await fetchCartItem();
    } catch (error) {
      console.error("Xóa sản phẩm thất bại:", error.message);
    }
  };

  const updateQuantity = async (id, method) => {
    try {
      // const isCheckedTemp = cartItem.find((item) => item.id === id)?.isChecked;
      const response = await axios.put(
        `http://localhost:8080/user-cart/update-quantity?cart=${cartId}&item=${id}&method=${method}`
      );
      console.log(response);
      await fetchCartItem();
    } catch (error) {
      console.error("Cập nhật số lượng thất bại:", error.message);
    }
  };

  // Hàm xử lý khi chọn hoặc bỏ chọn một mục cụ thể
  const handleSelectChange = (id) => {
    const index = cartItem.findIndex((item) => item.id === id);
    const newCartItem = [...cartItem];
    newCartItem[index].isChecked = !newCartItem[index].isChecked;
    setCartItem(newCartItem);
    const updatedSelectedItems = newCartItem.filter((item) => item.isChecked);
    localStorage.setItem("dataCheckOut", JSON.stringify(updatedSelectedItems));
    // setDataCheckOut(updatedSelectedItems);
    // console.log(dataCheckOut);
  };

  // Hàm xử lý chọn tất cả hoặc bỏ chọn tất cả
  const selectAllToCheckout = () => {
    const updatedCartItem = cartItem.map((item) => ({
      ...item,
      isChecked: !selectAllItems,
    }));
    setCartItem(updatedCartItem);
    setSelectAllItems(!selectAllItems);
    const updatedSelectedItems = updatedCartItem.filter(
      (item) => item.isChecked
    );
    localStorage.setItem("dataCheckOut", JSON.stringify(updatedSelectedItems));
    // setDataCheckOut(updatedSelectedItems);
    // console.log(dataCheckOut);
  };

  const calculateSubtotal = () => {
    let totalPrice = 0;
    cartItem.forEach((item) => {
      if (item.isChecked) {
        totalPrice += item.book.price * item.quantity;
      }
    });
    return totalPrice;
  };

  return (
    <div class="bg-gray-100 min-h-screen py-8">
      <div class="container md:w-4/5 mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-4 ">
          <div class="md:w-2/3">
            <div class="bg-white rounded-lg shadow-md p-6 mb-4">
              <table class="w-full">
                <thead>
                  <tr className=" border-1 border-b pb-4">
                    <th class="text-left font-semibold">
                      <input
                        type="checkbox"
                        id="select-all-checkbox"
                        checked={selectAllItems}
                        onChange={selectAllToCheckout}
                      />
                    </th>

                    <th class=" ml-2 text-left font-semibold">
                      {" "}
                      Chọn tất cả sản phẩm
                    </th>
                    <th class="text-left font-semibold">Price</th>
                    <th class="text-center font-semibold">Quantity</th>
                    <th class="text-center font-semibold">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItem.map((item) => (
                    <tr className={item.isChecked ? "" : "opacity-50 "}>
                      <td className="h-4 w-4">
                        <input
                          type="checkbox"
                          id={`item-checkbox-${item.id}`}
                          checked={item.isChecked || false}
                          onChange={() => handleSelectChange(item.id)}
                        />
                      </td>
                      <td class="py-4">
                        <div class="flex items-center">
                          <img
                            class="h-32 w-32 mr-4"
                            src={item.book.img}
                            alt="Product image"
                          />
                          <span class="font-semibold">{item.book.name}</span>
                        </div>
                      </td>
                      <td class="text-left">{formatPrice(item.book.price)}</td>
                      <td class="py-4">
                        <div class="flex ml-10 h-8 items-stretch text-gray-600">
                          <button
                            onClick={() => updateQuantity(item.id, "decrease")}
                            class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                          >
                            -
                          </button>
                          <div class="flex  items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => updateQuantity(item.id, "increase")}
                            class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td class="">
                        <button
                          className="cusor-pointer"
                          onClick={() => deleteCartItem(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div class="md:w-1/3">
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex justify-between mb-2">
                <span>Thành tiền</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>

              {/* <div class="flex justify-between mb-2">
                <span>Vận chuyển</span>
                <span>{formatPrice(5000)}</span>
              </div> */}
              <div class="flex justify-between mb-2 border-1 border-b pb-2">
                <span class="font-semibold text-xl">Tổng số tiền</span>
                <span class="font-semibold">
                  {formatPrice(calculateSubtotal())}
                </span>
              </div>
              <Link
                to="/checkout"
               
              >
                <button class="bg-[#FFD16B] text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Thanh toán
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
