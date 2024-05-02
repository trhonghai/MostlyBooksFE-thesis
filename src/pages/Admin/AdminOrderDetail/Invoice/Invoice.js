import { useRef } from "react";
import { forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import images from "~/assets/images";
import { formatPrice } from "~/utils/formatPrice";

function Invoice({ orderDetails, order, close }, ref) {
  const invoiceRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Hóa đơn thanh toán - Đơn hàng: ${order.id}`,
  });

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg px-8 py-2 max-w-xl mx-auto">
          <div
            className="bg-white rounded-lg  px-8 py-2 max-w-xl mx-auto"
            ref={invoiceRef}
          >
            <div className="flex items-center justify-center font-bold text-xl">
              HÓA ĐƠN
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="h-14 w-24 mr-2 object-contain"
                  src={images.Logo}
                  alt="Logo"
                />

                <div className="text-gray-700 font-semibold text-lg">
                  Mostly Books
                </div>
              </div>
              <div className="text-gray-700">
                <div className="text-sm">
                  Ngày mua: {new Date(order?.orderDate).toLocaleString()}
                </div>
                <div className="text-sm">Mã hóa đơn: {order?.orderCode}</div>
              </div>
            </div>
            <div className="border-b-2 border-gray-300 pb-2 mb-2">
              <h2 className="font-bold">Vận chuyển đến: </h2>
              <div className="text-gray-700">
                {order?.address?.firstName} {order?.address?.lastName}
              </div>
              <div className="text-gray-700">{order?.address?.address}</div>
              <div className="text-gray-700">
                {order?.address?.ward}, {order?.address?.district},{" "}
                {order?.address?.city}
              </div>
              <div className="text-gray-700">{order?.address?.phoneNumber}</div>
              <div className="text-gray-700">{order?.customer?.email}</div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs">
                  <th className="text-gray-700 font-bold uppercase">
                    Tên sản phẩm
                  </th>
                  <th className="text-gray-700 font-bold uppercase">
                    Số lượng
                  </th>
                  <th className="text-gray-700 font-bold uppercase">Giá</th>
                  <th className="text-gray-700 font-bold uppercase">
                    Tổng cộng
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((orderDetail) => (
                  <tr key={orderDetail?.id} className="text-xs">
                    <td className="py-4 text-gray-700">
                      {orderDetail?.book.name}
                    </td>
                    <td className="py-4 text-gray-700">
                      {orderDetail?.quantity}
                    </td>
                    <td className="py-4 text-gray-700">
                      {formatPrice(orderDetail?.price)}
                    </td>
                    <td className="py-4 text-gray-700">
                      {formatPrice(orderDetail?.price * orderDetail?.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <div className="text-gray-700 mr-2 mb-2">Tổng cộng:</div>
              <div className="text-gray-700">
                {formatPrice(order?.amount + order?.shipping)}
              </div>
            </div>

            <div className="border-t-2 border-gray-300 pt-4 mb-4">
              <div className="text-gray-700">
                Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi
              </div>
              <div className="text-gray-700">
                Đừng ngần ngại liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi
                hoặc thắc mắc nào.
              </div>
              <div className="text-gray-700">
                0935115443, mostlybookshop@gmail.com
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={close}
              className="inline-flex  items-center px-4 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#FFD16B] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Đóng
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex ml-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#FFD16B] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Invoice);
