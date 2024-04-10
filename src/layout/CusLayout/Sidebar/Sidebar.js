import React from "react";
import { NavLink } from "react-router-dom";

export const userMenu = [
  {
    title: "Thông tin tài khoản",
    to: "/account",
  },
  {
    title: "Sổ địa chỉ",
    to: "/account/address",
  },
  {
    title: "Đơn hàng của tôi",
    to: "/account/orders",
  },
  {
    title: "Sản phẩm yêu thích",
    to: "/account/favorite",
  },
];
function Sidebar() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <ul className=" w-full text-sm text-gray-700 dark:text-gray-200">
        <li className=" flex border-b pl-4 block text-left text-2xl w-full font-medium py-2 text-gray-600 ">
          TÀI KHOẢN
        </li>
        {userMenu.map((item, index) => (
          <li
            key={index}
            className="border-b py-4 flex hover:scale-115 transition duration-400 ease-in-out pl-4 block text-left w-full font-medium py-2 text-gray-600 hover:bg-[#FFD16B] hover:rounded-lg dark:hover:bg-gray-600 hover:text-white"
          >
            <NavLink to={item.to}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
