import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faBook,
  faHome,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import config from "~/config";

function Sidebar({ isSidebarOpen }) {
  return (
    <div
      className={`w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-gray-100 border-r z-30 ${
        isSidebarOpen ? "" : "hidden"
      }`}
      id="main-nav"
    >
      <div className="w-full flex items-center justify-center h-36 border-b flex px-4 items-center mb-8">
        <img className="w-52 h-36" src={images.Logo} />
      </div>
      <div className="mb-4 px-4">
        <div className="w-full flex items-center text-[#FFD16B] h-10 pl-4  hover:bg-white rounded-lg cursor-pointer">
          <FontAwesomeIcon icon={faHome} className="mr-4" />
          <span className="text-gray-700">Dashboard</span>
        </div>
        <Link to={config.routes.adminUsers}>
          <div className="w-full mt-2 flex items-center text-[#FFD16B] h-10 pl-4  hover:bg-white rounded-lg cursor-pointer">
            <FontAwesomeIcon icon={faUserAlt} className="mr-4" />

            <span className="text-gray-700">Người dùng</span>
          </div>
        </Link>
        <Link to={config.routes.adminOrders}>
          <div className="w-full mt-2 flex items-center text-[#FFD16B] h-10 pl-4  hover:bg-white rounded-lg cursor-pointer">
            <FontAwesomeIcon icon={faBagShopping} className="mr-4" />
            <span className="text-gray-700">Đơn hàng</span>
          </div>
        </Link>
        <Link to={config.routes.adminBooks}>
          <div className="w-full mt-2 flex items-center text-[#FFD16B] h-10 pl-4  hover:bg-white rounded-lg cursor-pointer">
            <FontAwesomeIcon icon={faBook} className="mr-4" />
            <span className="text-gray-700">Sách</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
