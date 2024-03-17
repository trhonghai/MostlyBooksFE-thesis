import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import FilterOrder from "~/components/FilterOrder";
import { useOrder } from "~/hooks";
import { formatDate } from "~/utils/formatDate";
import { formatPrice } from "~/utils/formatPrice";

function ManageOders() {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});

  const { getAllOrders, OrderDetails, fetchOrderByStatus } = useOrder();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    fetchOrderByStatus(filter);
    // Thực hiện các hành động khác tương ứng với việc thay đổi bộ lọc ở đây
  };
  useEffect(() => {
    // fetchOrders();
    fetchOrdersByStatus(selectedFilter);
  }, [selectedFilter]);

  console.log(selectedFilter);

  const fetchOrdersByStatus = async (status) => {
    try {
      let result;
      if (status === "all") {
        // Gọi API để lấy tất cả các đơn hàng khi trạng thái được chọn là "tất cả"
        result = await getAllOrders();
      } else {
        // Gọi API để lấy các đơn hàng dựa trên trạng thái
        result = await fetchOrderByStatus(status);
      }
      setOrders(result);
      console.log(result);
      // Lưu ý: cần cập nhật orderDetails tương ứng ở đây nếu cần
      result.forEach(async (order) => {
        const orderDetailData = await OrderDetails(order.id);
        setOrderDetails((prev) => ({ ...prev, [order.id]: orderDetailData }));
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const offset = (currentPage - 1) * itemsPerPage;
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="bg-white w-full shadow-lg overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-xl">
        <div className=" rounded-lg mx-4 ">
          <div className="flex items-center justify-between py-5 ">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              QUẢN LÝ ĐƠN HÀNG
            </h3>
          </div>
          <FilterOrder
            handleFilterChange={handleFilterChange}
            selectedFilter={selectedFilter}
          />
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-2 py-3">Mã đơn hàng</th>
                    <th className="px-2 py-3">Tên khách hàng</th>
                    <th className="px-2 py-3">Sản phẩm</th>
                    <th className="px-2 py-3">Ngày đặt hàng</th>
                    <th className="px-2 py-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500 text-left bg-white divide-y divide-gray-200">
                  {orders.slice(offset, offset + itemsPerPage)?.map((order) => {
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
                            to={`/adminOrders/${order.id}`}
                            state={{ dataOrder: order }}
                          >
                            <p className="whitespace-no-wrap">
                              {order.orderCode}
                            </p>
                          </Link>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <Link
                            to={`/adminOrders/${order.id}`}
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

                                  {moreNamesCount > 0 && (
                                    <p className="whitespace-no-wrap text-left">
                                      ...
                                    </p>
                                  )}
                                </p>
                                <p className="text-left">
                                  {/* // Hiển thị tổng số lượng  */}
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
                            {order?.orderStatus?.status}
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
            <div className="flex justify-center items-center h-96">
              <p>Không có đơn hàng nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageOders;
