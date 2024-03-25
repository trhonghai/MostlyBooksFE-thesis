import { Modal } from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import images from "~/assets/images";

function UserForm({
  isOpen,
  onRequestClose,
  onSave,
  title,
  userCurrent,
  mode,
}) {
  const [createUser, setCreateUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    // photos: "",
  });

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photos: "",
    phone: "",
    enabled: false,
  });
  console.log(userCurrent);

  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const { firstName, lastName, email, password, phone } = createUser;
  const [isEmailTaken, setIsEmailTaken] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    loadRoles();
    if (userCurrent) {
      setSelectedRoles(userCurrent.roles.map((role) => role.id));
      setData(userCurrent);
      setEnabled(userCurrent.enabled);
      setFile(userCurrent.photos);
      setThumbnailSrc(userCurrent.photos);
    }
    console.log(file);
  }, [userCurrent]);

  const loadRoles = async () => {
    const result = await axios.get("http://localhost:8080/roles");
    setRoles(result.data);
  };

  const checkEmailAvailability = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/users/check_email?email=${createUser.email}`
      );
      setIsEmailTaken(response.data);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await checkEmailAvailability();
    if (isEmailTaken === "Duplicated") {
      alert("Email is already taken. Please choose another one.");
    } else if (mode === "add") {
      const newUser = {
        ...createUser,
        enabled: enabled,
        // photos: selec,
        roles: selectedRoles,
      };
      // console.log(newUser.photos);
      console.log(newUser, file);
      onSave(newUser, file);
      setCreateUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        // enabled: false,
      });
      setSelectedRoles([]);
      onRequestClose();
    } else {
      const newUser = {
        ...data,
        enabled: enabled,
        roles: selectedRoles,
      };

      if (file) {
        // Nếu có, thực hiện cập nhật cả thông tin sách và hình ảnh mới
        onSave(newUser, file);
      } else {
        // Nếu không, chỉ cập nhật thông tin sách
        onSave(newUser, null);
        console.log(newUser);
      }
      onRequestClose();
    }
  };

  const [file, setFile] = useState(null);
  const [fileSizeError, setFileSizeError] = useState(null);
  const [thumbnailSrc, setThumbnailSrc] = useState(images.defaultUser);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileSize = selectedFile.size;
      if (fileSize > 1048576) {
        setFileSizeError("You must choose an image less than 1MB!");
        setFile(null);
        // setThumbnailSrc(null);
      } else {
        setFileSizeError(null);
        setFile(selectedFile);
        showImageThumbnail(selectedFile);
      }
    }
  };

  const showImageThumbnail = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Do something with the image data, e.g., display it
      const thumbnailSrc = e.target.result;
      // You can use thumbnailSrc to display the image in your UI
      setThumbnailSrc(thumbnailSrc);
    };

    reader.readAsDataURL(file);
  };

  const handleChecked = () => {
    setEnabled((prevEnabled) => !prevEnabled);
  };
  const handleChange = (e) => {
    setCreateUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(e.target.value);
  };

  const handleCheckboxChange = (roleId) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="min-h-screen mt-2 mb-2 flex items-center justify-center ">
        <div className="container max-w-xl ">
          <div className="bg-white rounded shadow-lg  px-4 md:p-8 mb-6">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Họ và Tên
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <input
                    name="firstName"
                    placeholder="Nhập đầy đủ họ tên"
                    type="text"
                    required
                    value={userCurrent ? data.firstName : firstName}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Tên người dùng
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <input
                    name="lastName"
                    placeholder="Nhập tên người dùng"
                    type="text"
                    required=""
                    value={userCurrent ? data.lastName : lastName}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-5  text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    name="email"
                    placeholder="user@example.com"
                    type="email"
                    required=""
                    value={userCurrent ? data.email : email}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={(e) => handleChange(e)}
                    onBlur={checkEmailAvailability}
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-5  text-gray-700">
                  Số điện thoại
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    name="phone"
                    placeholder="user@example.com"
                    type="phone"
                    required=""
                    value={userCurrent ? data.phone : phone}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Mật khẩu
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    name="password"
                    type="password"
                    value={userCurrent ? data.password : password}
                    required=""
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-2 flex ">
                <label className="mr-12 w-32 block text-sm font-medium leading-5 text-gray-700">
                  Vai trò
                </label>
                <div className="mt-1 rounded-md shadow-sm align-center">
                  {roles.map((role) => (
                    <div key={role.id} className="flex ">
                      <input
                        type="checkbox"
                        name={role.name}
                        value={role.id}
                        id={role.id}
                        checked={selectedRoles.includes(role.id)}
                        onChange={() => handleCheckboxChange(role.id)}
                      />
                      <p className="text-xm ml-6 ">
                        {role.name} - {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2 flex">
                <label className="w-28 text-sm font-medium leading-5 text-gray-700">
                  Enabled
                </label>
                <div className="ml-3 rounded-md shadow-sm ">
                  <div className=" ">
                    <input
                      // name="enabled"
                      type="checkbox"
                      required=""
                      id="checkbox"
                      checked={enabled}
                      onChange={handleChecked}
                    />
                  </div>
                </div>
              </div>

              <div className=" flex items-center ">
                <label className="w-28 text-sm font-medium leading-5 text-gray-700">
                  Photo
                </label>
                <div className="ml-3 rounded-md shadow-sm ">
                  <div className="flex items-center justify-center ">
                    <input
                      type="file"
                      name="image"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                    />
                    {fileSizeError && (
                      <p style={{ color: "red" }}>{fileSizeError}</p>
                    )}
                    {thumbnailSrc && (
                      <img
                        src={thumbnailSrc}
                        alt="Thumbnail"
                        style={{ maxWidth: "100px" }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    value="Lưu"
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Lưu
                  </button>
                </span>
                <span className="block ml-2 w-full rounded-md shadow-sm">
                  <button
                    value="Hủy"
                    onClick={onRequestClose}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-red-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 "
                  >
                    Hủy
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default UserForm;
