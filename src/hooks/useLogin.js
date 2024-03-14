import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "~/context/AuthProvider";
// import { saveUser } from "~/utils/localStorage";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setLogin } = useContext(AuthContext);

  const login = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/authentication",
        data
      );
      setLogin(response.data);
      console.log("Đăng nhập thành công:", response.data);
      const { access_token, refresh_token } = response.data;
      console.log(refresh_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("cartId", response.data.cartId);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("roles", JSON.stringify(response.data.roles));
    } catch (error) {
      console.error("Đăng nhập thất bại:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}

export default useLogin;
