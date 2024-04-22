import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import config from "~/config";
import { useBook, useOrder } from "~/hooks";
import { formatPrice } from "~/utils/formatPrice";
import RevenueTable from "./RevenueTable/RevenueTable";
import RevenueToday from "./RevenueToday";
import Chart from "./Chart";
import { shoppingCartIcon } from "~/components/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

function ManageStatistic() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const { getAllOrders, fetchOrderByStatus } = useOrder();
  const { getAllBook } = useBook();
  const [totalBook, setTotalBook] = useState(0);

  const fetchAllBook = async () => {
    try {
      const result = await getAllBook();
      console.log(result);
      setTotalBook(result.length);
    } catch (error) {
      console.error("Lấy sách thất bại:", error.message);
    }
  };

  const [orderDelivered, setOrderDelivered] = useState([]);

  const fetchOrderDelivered = async () => {
    try {
      const response = await fetchOrderByStatus("DELIVERED");
      const totalRevenue = response.reduce(
        (total, order) => total + order.amount + order.shipping,
        0
      );
      setTotalRevenue(totalRevenue);

      setOrderDelivered(response);
    } catch (error) {
      console.error("Lấy danh mục thất bại:", error.message);
    }
  };

  const result = async () => {
    const result = await getAllOrders();
    const totalOrders = result.length;
    setTotalOrders(totalOrders);
  };

  useEffect(() => {
    result();
    fetchOrderDelivered();
    fetchAllBook();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold mr-4">
                  {formatPrice(totalRevenue)}
                </div>

                <div className="flex items-center justify-center h-12 w-12 items-center justify-center rounded-full bg-blue-200 dark:bg-meta-4">
                  <FontAwesomeIcon icon={faEye} />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-400">
                Tổng doanh thu
              </div>
            </div>
          </div>

          <a
            href="/gebruikers"
            className="text-[#f84525] font-medium text-sm hover:text-red-800"
          >
            View
          </a>
        </div>
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold mr-4">{totalOrders}</div>

                <div className="flex items-center justify-center h-12 w-12 items-center justify-center rounded-full bg-blue-200 dark:bg-meta-4">
                  {shoppingCartIcon()}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-400">
                Tổng đơn hàng
              </div>
            </div>
          </div>
          <Link
            to={config.routes.adminOrders}
            className="text-[#f84525] font-medium text-sm hover:text-red-800"
          >
            View
          </Link>
        </div>
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-semibold mb-1">{totalBook}</div>
              <div className="text-sm font-medium text-gray-400">
                Tổng sản phẩm
              </div>
            </div>
          </div>
          <Link
            to={config.routes.adminBooks}
            className="text-[#f84525] font-medium text-sm hover:text-red-800"
          >
            View
          </Link>
        </div>
      </div>
      <Chart orderDelivered={orderDelivered} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueTable orderDelivered={orderDelivered} />
        <RevenueToday orderDelivered={orderDelivered} />
      </div>
    </div>
  );
}

export default ManageStatistic;
