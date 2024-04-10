import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faBook,
  faHome,
  faList,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import config from "~/config";

function Sidebar({ isSidebarOpen }) {
  const barMenu = [
    {
      icon: faHome,
      title: "Dashboard",
      link: config.routes.adminDashboard,
    },
    {
      icon: faUserAlt,
      title: "Người dùng",
      link: config.routes.adminUsers,
    },
    {
      icon: faBagShopping,
      title: "Đơn hàng",
      link: config.routes.adminOrders,
    },
    {
      icon: faBook,
      title: "Sách",
      link: config.routes.adminBooks,
    },
    {
      icon: faList,
      title: "Danh mục",
      link: config.routes.adminCategories,
    },
    {
      icon: faUser,
      title: "Tác giả",
      link: config.routes.adminAuthors,
    },
    {
      icon: faUser,
      title: "Nhà xuất bản",
      link: config.routes.adminPublishers,
    },
    {
      icon: faUser,
      title: "Khuyến mãi",
      link: config.routes.adminDiscounts,
    },
  ];
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
        {barMenu.map((item, index) => (
          <Link key={index} to={item.link}>
            <div className="w-full mt-2 flex items-center text-[#FFD16B] h-10 pl-4  hover:bg-white rounded-lg cursor-pointer">
              <FontAwesomeIcon icon={item.icon} className="mr-4" />

              <span className="text-gray-700">{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
