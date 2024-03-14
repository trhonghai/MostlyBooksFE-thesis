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
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUserCurrent(result.data);
  };

  const onSubmit = async (newUser, file) => {
    if (mode === "add") {
      // console.log(newUser);
      const formData = new FormData();

      formData.append("newUser", JSON.stringify(newUser));
      formData.append("image", file);

      await axios.post("http://localhost:8080/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      loadUsers();
      alert("User created successfully!");
    }
    // else {
    //   await axios.put(`http://localhost:8080/user/${userCurrent.id}`, newUser);
    //   loadUsers();
    // }
  };

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
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
    <main className="h-full overflow-y-auto">
      <div className="container px-6 mx-auto grid">
        {/* <h2 className="my-6 text-3xl text-left capitalize font-semibold text-indigo-500 ">
          Quản lý người dùng
        </h2> */}
        <div className=" w-full overflow-x-auto">
          <div className="flex mt-4 overflow-hidden rounded-lg shadow-xs">
            <div className="w-full grid justify-items-end mb-6">
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
          </div>
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead>
              <tr className="bg-[#FFD16B] rounded-lg text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-6 py-3  text-xs font-medium  uppercase tracking-wider">
                  Tên người dùng
                </th>
                <th className="px-6 py-3  text-xs font-medium  uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3  text-xs font-medium  uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3  text-xs font-medium  uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3  text-xs font-medium  uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Edit User Modal */}
              <UserForm
                isOpen={isModalEditOpen}
                onRequestClose={closeModalEdit}
                onSave={onSubmit}
                userCurrent={userCurrent}
                title="Cập nhật tài khoản người dùng"
                mode={mode}
              />
              {users.map((user) => (
                <tr key={user.id} className="border">
                  <td className="px-6 py-4 text-left whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-left whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex">
                    {user.roles.map((role) => (
                      <p key={role.id} className="px-2 py-4 whitespace-nowrap">
                        {role.name}
                      </p>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-left whitespace-nowrap">
                    <span className="px-2  inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
    </main>
  );
}

export default ManageUsers;
