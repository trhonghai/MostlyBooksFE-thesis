import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import FilterOrder from "~/components/FilterOrder";
import { useOrder } from "~/hooks";
import { formatDate } from "~/utils/formatDate";
import { formatPrice } from "~/utils/formatPrice";

function Order() {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const { Orders, OrderDetails, fetchOrderByStatus } = useOrder();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [orderCounts, setOrderCounts] = useState({});

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    fetchOrderByStatus(filter);
    // Thực hiện các hành động khác tương ứng với việc thay đổi bộ lọc ở đây
  };
  useEffect(() => {
    // fetchOrders();
    fetchOrdersByStatus(selectedFilter);
    // updateOrderCounts(orders);
  }, [selectedFilter]);

  console.log(selectedFilter);

  const fetchOrdersByStatus = async (status) => {
    try {
      let result;
      if (status === "all") {
        result = await Orders();
      } else {
        // Lấy tất cả đơn hàng từ API và lọc lại trên client-side
        const allOrders = await Orders();
        result = allOrders.filter(
          (order) => order.orderStatus.status === status
        );
      }
      updateOrderCounts(result);
      setOrders(result);
      result.forEach(async (order) => {
        const orderDetailData = await OrderDetails(order.id);
        setOrderDetails((prev) => ({ ...prev, [order.id]: orderDetailData }));
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderCounts = (orders) => {
    const counts = {};
    orders.forEach((order) => {
      const status = order.orderStatus.status;
      counts[status] = (counts[status] || 0) + 1;
    });
    setOrderCounts(counts);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const offset = (currentPage - 1) * itemsPerPage;
  const pageCount = Math.ceil(orders?.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="bg-white max-w-4xl shadow overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-lg">
        <div className="overflow-y-hidden rounded-lg ">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              ĐƠN HÀNG CỦA TÔI
            </h3>
            <FilterOrder
              handleFilterChange={handleFilterChange}
              selectedFilter={selectedFilter}
              Orders={Orders}
            />
          </div>
          {orders?.length > 0 ? (
            <div className="overflow-x-auto px-4">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-2 py-3">Mã đơn hàng</th>
                    <th className="px-2 py-3">Sản phẩm</th>
                    <th className="px-2 py-3">Tổng tiền</th>
                    <th className="px-2 py-3">Ngày tạo</th>
                    <th className="px-2 py-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500 bg-white divide-y divide-gray-200">
                  {orders?.slice(offset, offset + itemsPerPage).map((order) => {
                    // Tính tổng số lượng cho mỗi đơn hàng
                    let totalQuantity = 0;
                    orderDetails[order.id]?.forEach((detail) => {
                      totalQuantity += detail.quantity;
                    });
                    let bookNames = [];
                    orderDetails[order.id]?.forEach((detail) => {
                      bookNames.push(detail.book.name);
                    });
                    let displayNames = bookNames.slice(0, 2);
                    let moreNamesCount = bookNames.length - 2;

                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-200 cursor-pointer transition duration-150 border-b border-gray-200 text-left border-gray-200 bg-white px-5 py-5 text-sm"
                      >
                        <td className="border-b  text-left border-gray-200 bg-white px-5 py-5 text-sm">
                          <Link
                            to={`/account/orders/${order.id}`}
                            state={{ dataOrder: order }}
                          >
                            <p className="whitespace-no-wrap">{order.id}</p>
                          </Link>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <Link
                            to={`/account/orders/${order.id}`}
                            state={{ dataOrder: order }}
                          >
                            <div className="flex items-center">
                              <div className="h-32 w-32 flex-shrink-0">
                                {/* Hiển thị hình ảnh chỉ cho chi tiết đầu tiên */}
                                {orderDetails[order.id]?.[0] && (
                                  <img
                                    className="h-full w-full "
                                    src={orderDetails[order.id][0].book.img}
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="ml-3">
                                <p className="whitespace-no-wrap text-left">
                                  {/* Hiển thị tên sách của chi tiết đầu tiên */}
                                  {/* Hiển thị tối đa hai tên sách */}
                                  {displayNames.map((name, index) => (
                                    <p
                                      key={index}
                                      className="whitespace-no-wrap text-left"
                                    >
                                      {name}
                                    </p>
                                  ))}
                                  {/* Nếu có nhiều hơn hai tên sách, hiển thị dấu '...' */}
                                  {moreNamesCount > 0 && (
                                    <p className="whitespace-no-wrap text-left">
                                      ...
                                    </p>
                                  )}
                                </p>
                                <p className="text-left">
                                  {/* Hiển thị tổng số lượng */}
                                  Tổng số lượng: {totalQuantity}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="border-b text-left border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">
                            {formatPrice(order.amount + order.shipping)}
                          </p>
                        </td>
                        <td className="border-b text-left border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">
                            {formatDate(order.orderDate)}
                          </p>
                        </td>
                        <td className="border-b text-left border-gray-200 bg-white px-5 py-5 text-sm">
                          <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                            {order.orderStatus.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex items-center justify-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-center">
                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  containerClassName={
                    "pagination flex justify-between items-center"
                  }
                  activeClassName={"active"}
                  previousClassName={
                    "inline-flex justify-center items-center h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                  }
                  nextClassName={
                    "inline-flex justify-center items-center h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                  }
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <p>Không có đơn hàng nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Order;
