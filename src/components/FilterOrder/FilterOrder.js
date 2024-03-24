import { all } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "~/config";
import AuthContext from "~/context/AuthProvider";

function FilterOrder({
  handleFilterChange,
  selectedFilter,
  Orders,
  orderCounts,
}) {
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    // fetchOrders();
    console.log(orderCounts);
  }, [Orders]);
  console.log(Orders);

  // const fetchOrders = async () => {
  //   try {
  //     const counts = {
  //       all: Orders.length,
  //       PENDING: Orders.filter(
  //         (order) => order.orderStatus?.status === "PENDING"
  //       ).length,
  //       CAPTURED: Orders.filter(
  //         (order) => order.orderStatus?.status === "CAPTURED"
  //       ).length,
  //       DELIVERED: Orders.filter(
  //         (order) => order.orderStatus?.status === "DELIVERED"
  //       ).length,
  //       CANCELLED: Orders.filter(
  //         (order) => order.orderStatus?.status === "CANCELLED"
  //       ).length,
  //       REFUNDED: Orders.filter(
  //         (order) => order.orderStatus?.status === "REFUNDED"
  //       ).length,
  //     };
  //     setOrderCounts(counts);
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //   }
  // };

  const filterOrderStatus = [
    {
      status: "all",
      name: "Tất cả",
    },
    {
      status: "PENDING",
      name: "Chờ xác nhận",
    },
    {
      status: "CAPTURED",
      name: "Giao hàng",
    },
    {
      status: "DELIVERED",
      name: "Đã giao hàng",
    },
    {
      status: "CANCELLED",
      name: "Đã hủy",
    },
    {
      status: "REFUNDED",
      name: "Trả hàng/Hoàn tiền",
    },
  ];

  return (
    <div className="flex justify-around my-4 space-x-4 border-b pb-2">
      {filterOrderStatus.map((status, index) => (
        <Link
          key={index}
          to={isAdmin ? config.routes.adminOrders : config.routes.order}
        >
          <button
            onClick={() => handleFilterChange(status.status)}
            className={`relative ${
              selectedFilter === status.status
                ? "text-gray-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {status.name} ({orderCounts[status.status] || 0})
            {selectedFilter === status.status && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD16B]"></span>
            )}
          </button>
        </Link>
      ))}
    </div>
  );
}

export default FilterOrder;
