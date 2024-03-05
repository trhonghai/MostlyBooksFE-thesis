import React from "react";

import { FaSearch } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import config from "~/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faArrowRightFromBracket,
  faBagShopping,
  faCartShopping,
  faDolly,
  faDollyBox,
  faReceipt,
  faShoppingBasket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import CategoryNav from "./CategoryNav";
import images from "~/assets/images";
import { useState } from "react";
import { useLogout } from "~/hooks";

export const userMenu = [
  {
    title: "Thông tin tài khoản",
    icon: faUser,
    to: "/account",
  },
  {
    title: "Đơn hàng của tôi",
    icon: faReceipt,
    to: "/account/orders",
  },
  {
    title: "Sản phẩm yêu thích",
    icon: faHeart,
    to: "/account/favorite",
  },
  {
    title: "Sổ địa chỉ",
    icon: faAddressBook,
    to: "/account/favorite",
  },
];

function Header() {
  const navBarList = [
    {
      title: "Đăng nhập",
      link: config.routes.login,
    },
    {
      title: "Đăng ký",
      link: config.routes.register,
    },
  ];
  const { logout } = useLogout();
  const navigate = useNavigate();

  const currentUser = localStorage.getItem("refresh_token");

  // console.log(currentUser);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="w-full h-full  bg-white border-b-[1px]  sticky top-0 z-10">
      <div>
        <img src={images.HeaderBanner} className="object-cover h-12 w-full" />
      </div>
      <div className="h-full  max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-2">
        <NavLink to={"/"}>
          <img
            src={images.Logo}
            className="h-14 w-48 cursor-pointer object-cover"
          />
        </NavLink>
        <div className="relative w-full hidden lg:inline-flex lg:w-[600px] h-10 text-base text-primeColor border-[2px] border-[#FFD16B] items-center gap-2 justify-between px-6 rounded-md">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className="flex-1 h-full outline-none bg-transparent placeholder:text-gray-600"
            // onChange={(e) => setSearchQuery(e.target.value)}
            // value={searchQuery}
          />
          {/* {searchQuery ? ( */}
          <IoCloseOutline
            // onClick={() => setSearchQuery("")}
            className="w-5 h-5 hover:text-red-500 duration-200 hover:cursor-pointer"
          />
          {/* ) : ( */}
          <FaSearch className="w-5 h-5 hover:cursor-pointer " color="#FFD16B" />
          {/* )} */}
        </div>
        <div className="hidden md:inline-flex  gap-2">
          {currentUser ? (
            <>
              <Tippy
                interactive
                // visible
                // disabled={false}
                placement="bottom-end"
                render={(attrs) => (
                  <div
                    className="w-60 h-auto bg-white border rounded-lg  z-999"
                    tabIndex="-1"
                    {...attrs}
                  >
                    <ul className=" w-full text-sm text-gray-700 dark:text-gray-200">
                      <li className=" flex hover:scale-105 transition duration-400 ease-in-out pl-4 block text-left w-full font-medium py-2 text-gray-600 hover:bg-[#FFD16B] hover:rounded-lg dark:hover:bg-gray-600 hover:text-white">
                        <div className=" flex w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwr8JOGWLBh31dNoWlGXqynbrZRyFTTvV8wg&usqp=CAU"
                            alt="Customer Avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="grid">
                          <span className="ml-2 text-gray-700 dark:text-gray-200">
                            Trương Hồng Hải
                          </span>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-200">
                            Thành viên
                          </span>
                        </div>
                      </li>
                      {userMenu.map((item, index) => (
                        <li className="hover:scale-105 transition duration-400 ease-in-out pl-4 block text-left w-full font-medium py-2 text-gray-600 hover:bg-[#FFD16B] hover:rounded-lg dark:hover:bg-gray-600 hover:text-white">
                          <Link key={index} to={item.to} className="">
                            <FontAwesomeIcon icon={item.icon} size="xl" />
                            <span className="ml-2">{item.title}</span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        {" "}
                        <Link
                          to="/logout"
                          onClick={handleLogout}
                          className=" pl-4 block text-left w-full font-medium py-2 text-gray-500 hover:bg-[#FFD16B] hover:rounded-lg dark:hover:bg-gray-600 hover:text-white"
                        >
                          <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            size="xl"
                          />
                          <span className="ml-2">Đăng xuất</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              >
                <div className="grid ">
                  <div className="flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-gray-500 w-12 h-5  cursor-pointer hover:text-[#FFD16B] duration-200"
                    />
                  </div>
                  <span className="text-xs text-gray-500">Truong Hong Hai</span>
                </div>
              </Tippy>
            </>
          ) : (
            <>
              {navBarList.map((item) => (
                <NavLink
                  to={item?.link}
                  key={item?.link}
                  className="flex font-medium text-lg text-black w-32 h-6 justify-center items-center pl-3 pr-6 text-gray-600  underline-offset-4 decoration-[1px] hover:text-[#FFD16B] md:border-r-[2px] border-r-[#FFD16B] duration-200 last:border-r-0"
                >
                  {item?.title}
                </NavLink>
              ))}
            </>
          )}

          <NavLink
            to="/cartItem"
            className="pl-8 pr-28 flex items-center text-gray-500 hover:text-[#FFD16B] transition-colors duration-300"
          >
            <div className="grid">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-gray-500 w-12 h-5 cursor-pointer hover:text-[#FFD16B] duration-200"
              />
              <span className="text-xs text-gray-500">Giỏ hàng</span>
            </div>
          </NavLink>
        </div>
        <HiMenuAlt2 className="inline-flex md:hidden cursor-pointer" />
      </div>
      <CategoryNav />
    </div>
  );
}

export default Header;
