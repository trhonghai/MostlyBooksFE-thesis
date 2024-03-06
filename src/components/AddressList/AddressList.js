import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddressList({ data }) {
  return (
    <>
      <h2 className="text-left text-lg border-b-2 border-gray-200 pb-2">
        ĐỊA CHỈ GIAO HÀNG
      </h2>
      <table className="w-full">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data
            .sort((a, b) => {
              // Đặt địa chỉ mặc định lên đầu tiên
              if (
                a.defaultForShopping === true &&
                b.defaultForShopping === false
              ) {
                return -1; // a sẽ được đưa lên trước b
              } else if (
                a.defaultForShopping === false &&
                b.defaultForShopping === true
              ) {
                return 1; // b sẽ được đưa lên trước a
              } else {
                return 0; // Giữ nguyên vị trí nếu cả hai đều có hoặc không có defaultForShopping
              }
            })
            .map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    checked={item.defaultForShopping === true}
                  />
                </td>
                <td className="px-4 py-2 text-left">
                  <label className="block text-gray-700">
                    {item.lastName} {item.firstName}
                  </label>
                </td>
                <td className="px-4 py-2">
                  <label className="block text-gray-700 text-left">
                    {item.address}, {item.ward}, {item.district}, {item.city}
                  </label>
                </td>
                <td className="px-4 py-2">
                  <label className="block text-gray-700 text-left">
                    {item.phoneNumber}
                  </label>
                </td>
                <td>
                  <div className="flex">
                    <button className="mr-4">
                      <FontAwesomeIcon icon={faEdit} color="blue" size="lg" />
                    </button>
                    <button className="mr-4">
                      <FontAwesomeIcon icon={faTrash} color="blue" size="lg" />
                    </button>
                  </div>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default AddressList;
