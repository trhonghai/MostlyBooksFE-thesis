import React, { useState, useEffect } from "react";
import { formatDate } from "~/utils/formatDate";
import { formatPrice } from "~/utils/formatPrice";

function TodayRevenue({ orderDelivered }) {
  const [todayOrders, setTodayOrders] = useState([]);
  const [todayRevenue, setTodayRevenue] = useState(0);

  useEffect(() => {
    const calculateTodayOrdersAndRevenue = () => {
      const today = new Date();
      const todayDateString = today.toISOString().split("T")[0]; // Lấy ngày hôm nay dưới dạng YYYY-MM-DD

      const filteredOrders = orderDelivered.filter((order) => {
        const orderDate = new Date(order.orderDate);
        const orderDateString = orderDate.toISOString().split("T")[0]; // Lấy ngày đặt hàng của đơn hàng dưới dạng YYYY-MM-DD
        return orderDateString === todayDateString;
      });

      const totalRevenue = filteredOrders.reduce(
        (total, order) => total + order.amount + order.shipping,
        0
      );

      setTodayOrders(filteredOrders);
      setTodayRevenue(totalRevenue);
    };

    calculateTodayOrdersAndRevenue();
  }, [orderDelivered]);

  return (
    <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
      <div className="rounded-t mb-0 px-0 border-0">
        <div className="flex flex-wrap items-center px-4 py-2">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
              Doanh thu hôm nay
            </h3>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Mã hóa đơn
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Thời gian đặt hàng
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Tổng tiền
                  </th>

                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                </tr>
              </thead>
              <tbody>
                {todayOrders.map((order, index) => (
                  <tr key={index} className="text-gray-700 dark:text-gray-100">
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {order.orderCode}
                    </td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {new Date(order.orderDate).toLocaleString()}
                    </td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {formatPrice(order.amount + order.shipping)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-2 text-lg text-left">
              Tổng doanh thu: {formatPrice(todayRevenue)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayRevenue;
