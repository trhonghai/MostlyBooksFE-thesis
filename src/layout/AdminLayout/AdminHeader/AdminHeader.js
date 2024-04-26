import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "~/context/AuthProvider";
import { useLogout } from "~/hooks";

function AdminHeader({ hanldeSidebar }) {
  const [dropDownOpen, setDropDownOpen] = useState(false); // Sử dụng useState để quản lý trạng thái của dropdown menu
  const { userCurrent } = useContext(AuthContext);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleDropDownToggle = () => {
    setDropDownOpen(!dropDownOpen); // Toggle trạng thái của dropdown menu
  };
  const handleLogout = async () => {
    await logout();

    navigate("/adminLogin");
    toast.success("Đăng xuất thành công");
  };

  useEffect(() => {
    // Close dropdown menu when click outside
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userCurrent}`
        );
        setUser(response.data);
      } catch (error) {
        console.log("Failed to fetch user: ", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="sticky top-0 z-40">
      <div className="w-full h-20 px-6 bg-gray-100 border-b flex items-center justify-between">
        {/* left navbar */}
        <div className="flex">
          {/* mobile hamburger */}

          {/* search bar */}
          {/*<div className="relative text-gray-600">
            <input
              type="search"
              name="search"
              placeholder="Search products..."
              className="bg-white h-10 w-full xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>*/}
        </div>
        {/* right navbar */}

        <div className="hidden md:inline-flex  gap-2">
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
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-200">
                        Thành viên
                      </span>
                    </div>
                  </li>
                  <li className="hover:scale-105 transition duration-400 ease-in-out pl-4 block text-left w-full font-medium py-2 text-gray-600 hover:bg-[#FFD16B] hover:rounded-lg dark:hover:bg-gray-600 hover:text-white">
                    <Link className="">
                      <FontAwesomeIcon icon={faUser} size="xl" />
                      <span className="ml-2">Thông tin tài khoản</span>
                    </Link>
                  </li>

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
            <div className="flex items-center relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwr8JOGWLBh31dNoWlGXqynbrZRyFTTvV8wg&usqp=CAU"
                className="w-12 h-12 rounded-full shadow-lg"
              />
            </div>
          </Tippy>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
