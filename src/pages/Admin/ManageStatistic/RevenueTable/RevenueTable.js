import React, { useEffect, useState } from "react";
import { useOrder } from "~/hooks";
import { formatPrice } from "~/utils/formatPrice";

function RevenueTable({ orderDelivered }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const getMonthYearFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear();
    return { month, year };
  };

  // Tính tổng doanh thu theo tháng và theo năm
  const calculateRevenueByMonthAndYear = (orders) => {
    const revenueByMonth = {};
    const revenueByYear = {};

    orders.forEach((order) => {
      const { amount, shipping, orderDate } = order;
      const { month, year } = getMonthYearFromTimestamp(orderDate);

      // Tính tổng doanh thu theo tháng
      if (!revenueByMonth[year]) {
        revenueByMonth[year] = {};
      }
      if (!revenueByMonth[year][month]) {
        revenueByMonth[year][month] = 0;
      }
      revenueByMonth[year][month] += amount + shipping;

      // Tính tổng doanh thu theo năm
      if (!revenueByYear[year]) {
        revenueByYear[year] = 0;
      }
      revenueByYear[year] += amount + shipping;
    });

    return { revenueByMonth, revenueByYear };
  };

  const { revenueByMonth, revenueByYear } =
    calculateRevenueByMonthAndYear(orderDelivered);
  const [collapsed, setCollapsed] = useState(true);

  // Hàm để xử lý sự kiện click nút thu gọn
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Hàm để xử lý sự kiện khi thay đổi năm được chọn
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
      <div className="rounded-t mb-0 px-0 border-0">
        <div className="flex flex-wrap items-center px-4 py-2">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
              Doanh thu theo tháng
            </h3>
          </div>
          <div>
            <select
              className="text-xs font-semibold"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {Object.keys(revenueByYear).map((year) => (
                <option key={year} value={parseInt(year)}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Tháng
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Doanh thu
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Số hóa đơn
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }, (_, index) => index + 1).map(
                (month) => {
                  const year = new Date().getFullYear();
                  const revenue = revenueByMonth[selectedYear]?.[month] || 0;
                  const orderCount = orderDelivered.filter(
                    (order) =>
                      getMonthYearFromTimestamp(order.orderDate).month ===
                        month &&
                      getMonthYearFromTimestamp(order.orderDate).year ===
                        selectedYear
                  ).length;
                  if (collapsed && revenue === 0 && orderCount === 0) {
                    return null;
                  }
                  return (
                    <tr
                      key={`${selectedYear}-${month}`}
                      className="text-gray-700 dark:text-gray-100"
                    >
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {month}/{selectedYear}
                      </th>
                      <td className="border-t-0 px-4 text-left align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {formatPrice(revenue)}
                      </td>
                      <td className="border-t-0 px-4 text-left align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {orderCount}
                      </td>

                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {Math.round(
                              (revenue / revenueByYear[year]) * 100
                            ) || 0}
                            %
                          </span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div
                                style={{
                                  width: `${
                                    Math.round(
                                      (revenue / revenueByYear[year]) * 100
                                    ) || 0
                                  }%`,
                                }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <div>
            <button
              className="text-xs items-center text-[#FFD16B] dark:text-gray-400 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleCollapse}
            >
              {collapsed ? "Mở rộng" : "Thu gọn"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueTable;
