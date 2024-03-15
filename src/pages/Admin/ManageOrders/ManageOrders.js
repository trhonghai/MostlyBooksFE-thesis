function ManageOders() {
  return (
    <div className="bg-white w-full shadow-lg overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-xl">
        <div className=" rounded-lg mx-4 ">
          <div className="flex items-center justify-between py-5 ">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              QUẢN LÝ ĐƠN HÀNG
            </h3>
          </div>
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
                <tr className="hover:bg-gray-200 cursor-pointer transition duration-150 border-b border-gray-200 text-left border-gray-200 bg-white px-5 py-5 text-sm">
                  <td className="border-b  text-left border-gray-200 bg-white px-2 py-5 text-sm"></td>
                  <td className="border-b  text-left border-gray-200 bg-white px-2 py-5 text-sm"></td>
                  <td className="border-b  text-left border-gray-200 bg-white px-2 py-5 text-sm"></td>
                  <td className="border-b  text-left border-gray-200 bg-white px-2 py-5 text-sm"></td>
                  <td className="border-b  text-left border-gray-200 bg-white px-2 py-5 text-sm"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageOders;
