import UserForm from "./UserForm";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [mode, setMode] = useState("add");

  const [userCurrent, setUserCurrent] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    roles: [],
    // photos: "",
    enabled: false,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUserCurrent = async (id) => {
    const result = await axios.get(`http://localhost:8080/users/${id}`);
    setUserCurrent(result.data);
  };

  const onSubmit = async (newUser, file) => {
    if (mode === "add") {
      // console.log(newUser);
      const formData = new FormData();

      formData.append("newUser", JSON.stringify(newUser));
      formData.append("image", file);

      await axios.post("http://localhost:8080/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      loadUsers();
      alert("User created successfully!");
    } else {
      await axios.put(`http://localhost:8080/users/${userCurrent.id}`, newUser);
      loadUsers();
    }
  };

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/users/${id}`);
    loadUsers();
  };

  const openModal = (mode) => {
    setIsModalOpen(true);
    setMode(mode);
  };
  const openModalEdit = (id, mode) => {
    loadUserCurrent(id);
    setIsModalEditOpen(true);
    setMode(mode);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  return (
    <div className="bg-white w-full shadow-lg overflow-hidden sm:rounded-lg">
      <div className="mx-auto max-w-screen-xl">
        <div className=" rounded-lg mx-4 ">
          <div className="flex items-center justify-between py-5 ">
            <h3 className="text-lg text-left leading-6 font-medium text-gray-900">
              QUẢN LÝ NGƯỜI DÙNG
            </h3>
            <button
              class=" ml-4 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#FBA31A] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#faaf00]"
              onClick={() => openModal("add")}
            >
              Thêm người dùng
            </button>
            <UserForm
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              onSave={onSubmit}
              title="Tạo tài khoản người dùng mới"
              mode={mode}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-2 py-3">Tên khách hàng</th>
                  <th className="px-2 py-3">Email</th>
                  <th className="px-2 py-3">Vai trò</th>
                  <th className="px-2 py-3">Trạng thái</th>
                  <th className="px-2 py-3">Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 text-left bg-white divide-y divide-gray-200">
                <UserForm
                  isOpen={isModalEditOpen}
                  onRequestClose={closeModalEdit}
                  onSave={onSubmit}
                  userCurrent={userCurrent}
                  title="Cập nhật tài khoản người dùng"
                  mode={mode}
                />
                {users.map((user) => (
                  <tr className="hover:bg-gray-200 cursor-pointer transition duration-150 border-b border-gray-200 text-left border-gray-200 bg-white px-5 py-5 text-sm">
                    <td className="border-b  text-left border-gray-200 bg-white px-2 py-5 text-sm">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="border-b  text-left border-gray-200 bg-white px-2 py-5 text-sm">
                      {user.email}
                    </td>
                    <td className="border-b  text-left border-gray-200 bg-white px-2 py-5 text-sm">
                      {user.roles.map((role) => (
                        <p
                          key={role.id}
                          className="px-2 py-4 whitespace-nowrap"
                        >
                          {role.name}
                        </p>
                      ))}
                    </td>
                    <td className="border-b  text-left border-gray-200 bg-white px-2 py-5 text-sm">
                      {user.enabled ? (
                        <span className="px-2  inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-2  inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="border-b  text-left border-gray-200 bg-white px-2 py-5 text-sm">
                      <button
                        onClick={() => openModalEdit(user.id, "edit")}
                        className="px-4 py-2 font-medium text-white bg-[#FFD16B] rounded-md hover:bg-[#FBA31A] focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <Link
                        onClick={() => deleteUser(user.id)}
                        className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
