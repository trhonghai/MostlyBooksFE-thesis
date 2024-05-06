import React, { useContext, useEffect } from "react";

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
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import CategoryNav from "./CategoryNav";
import images from "~/assets/images";
import { useState } from "react";
import { useLogout } from "~/hooks";
import axios from "axios";
import BookOnSearch from "~/components/BookOnSearch";
import toast from "react-hot-toast";
import { shoppingCartIcon } from "~/components/icons";
import AuthContext from "~/context/AuthProvider";
import { set } from "date-fns";

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
    to: "/account/address",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const { userCurrent } = useContext(AuthContext);
  const [userInfor, setUserInfor] = useState({});
  console.log(totalCartItems);

  const handleSearch = async () => {
    try {
      // setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/books/search?query=${searchQuery}`
      );
      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      // setLoading(false);
    }
  };
  const handleChange = (event) => {
    setSearchQuery(event.target.value); // Cập nhật query tìm kiếm mỗi khi người dùng thay đổi
    if (event.target.value.trim() !== "") {
      // Kiểm tra xem có nội dung tìm kiếm không trống
      handleSearch(); // Nếu có, gọi hàm tìm kiếm
    } else {
      setSearchResults([]); // Nếu không, xóa kết quả tìm kiếm
    }
  };

  // console.log(userCurrent);

  const handleLogout = async () => {
    await logout();

    navigate("/");
    toast.success("Đăng xuất thành công");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };
  useEffect(() => {
    getTotalCartItem();
    getInforCus();
  }, []);

  const getInforCus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user-infor/${userCurrent}`
      );
      setUserInfor(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const getTotalCartItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user-cart/get-total-cart?cart=${localStorage.getItem(
          "cartId"
        )}`
      );
      setTotalCartItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
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
        <div className="relative">
          <div className="w-full hidden lg:inline-flex lg:w-[600px] h-10 text-base text-primeColor border-[2px] border-[#FFD16B] items-center gap-2 justify-between px-6 rounded-md">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="flex-1 h-full outline-none bg-transparent placeholder:text-gray-600"
              onChange={handleChange}
              value={searchQuery}
            />
            {searchResults.length > 0 && (
              <IoCloseOutline
                onClick={handleClearSearch}
                className="w-5 h-5 hover:text-red-500 duration-200 hover:cursor-pointer"
              />
            )}
            <FaSearch
              onClick={handleSearch}
              className="w-5 h-5 hover:cursor-pointer "
              color="#FFD16B"
            />
            {searchResults.length > 0 && (
              <div className="absolute flex flex-wrap top-full z-10 bg-white border-[2px] border-[#FFD16B] w-full left-0 mt-2 p-2 rounded-md overflow-auto max-h-80">
                <ul className="grid grid-cols-2 gap-4">
                  {searchResults.map((result) => (
                    <Link to={`/books/${result.id}`}>
                      <li
                        key={result.id}
                        className="w-full p-2 cursor-pointer transition duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1 hover:scale-105"
                      >
                        <BookOnSearch data={result} />
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:inline-flex  gap-2">
          {userCurrent ? (
            <>
              <Tippy
                interactive
                placement="bottom-end"
                render={(attrs) => (
                  <div
                    className="w-64 h-auto bg-white shadow-md shadow-gray-400   rounded-md  z-999"
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
                            {userInfor.firstName} {userInfor.lastName}
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
                          // to="/logout"
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
                  <div className="flex w-full h-10 border-2 border-[#FFD16B] rounded-lg items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-[#FFD16B] w-12 h-5  cursor-pointer hover:text-[#FFD16B] duration-200"
                    />
                  </div>
                  {/* <span className="text-xs text-gray-500">Truong Hong Hai</span> */}
                </div>
              </Tippy>
            </>
          ) : (
            <div className="flex items-center justify-center">
              {navBarList.map((item) => (
                <NavLink
                  to={item?.link}
                  key={item?.link}
                  className="flex font-medium text-lg text-black w-32 h-6 justify-center items-center pl-3 pr-6 text-gray-600  underline-offset-4 decoration-[1px] hover:text-[#FFD16B] md:border-r-[2px] border-r-[#FFD16B] duration-200 last:border-r-0"
                >
                  {item?.title}
                </NavLink>
              ))}
            </div>
          )}

          <NavLink
            to="/cartItem"
            className="pl-4 pr-28 h-10  flex items-center text-gray-500 hover:text-[#FFD16B] transition-colors duration-300 relative"
          >
            <div className="flex items-center justify-center w-full h-10 border-2 border-[#FFD16B] rounded-lg items-center justify-center">
              <div className="flex items-center font-bold justify-center text-[#FFD16B] w-12  h-5 ">
                {" "}
                {shoppingCartIcon("#FFD16B")}
              </div>
            </div>
            {totalCartItems > 0 && (
              <span className="absolute -top-2 right-28 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {totalCartItems}
              </span>
            )}
          </NavLink>
        </div>
        <HiMenuAlt2 className="inline-flex md:hidden cursor-pointer" />
      </div>
      <CategoryNav />
    </div>
  );
}

export default Header;
