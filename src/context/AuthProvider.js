// AuthContext.js
import React, { createContext, useState } from "react";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCurrent, setUserCurrent] = useState(
    JSON.parse(localStorage.getItem("userId") || false)
  );
  const [userRole, setUserRole] = useState(
    JSON.parse(localStorage.getItem("roles") || false)
  );

  const handleLogout = () => {
    // Đặt lại giá trị isLoggedIn thành false khi logout
    setIsLoggedIn(false);
    // Xóa thông tin user khỏi localStorage
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("cartId");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles");
    // Cập nhật userCurrent và userRole thành null
    setUserCurrent(null);
    setUserRole(null);
  };
  const setLogin = (data) => {
    setIsLoggedIn(true);
    setUserCurrent(data.userId);
    setUserRole(data.roles);
  };
  useEffect(() => {
    if (userCurrent) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userCurrent]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userCurrent, userRole, handleLogout, setLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
