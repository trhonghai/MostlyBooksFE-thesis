import React from "react";
import { Link } from "react-router-dom";
import config from "~/config";

function FilterOrder({ handleFilterChange, selectedFilter }) {
  const filterOrderStatus = [
    {
      status: "all",
      name: "Tất cả",
    },
    {
      status: "pending",
      name: "Chờ xác nhận",
    },
    {
      status: "shipping",
      name: "Vận chuyển",
    },
    {
      status: "delivered",
      name: "Đã giao hàng",
    },
    {
      status: "cancelled",
      name: "Đã hủy",
    },
    {
      status: "refund",
      name: "Trả hàng/Hoàn tiền",
    },
  ];

  return (
    <div className="flex justify-around my-4 space-x-4 border-b pb-2">
      {filterOrderStatus.map((status, index) => (
        <Link to={config.routes.adminOrders}>
          <button
            key={index}
            onClick={() => handleFilterChange(status.status)}
            className={`relative ${
              selectedFilter === status.status
                ? "text-gray-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {status.name}
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
