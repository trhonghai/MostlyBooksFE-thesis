import axios from "axios";
import { useState } from "react";

function useRegister() {
  const [loading, setLoading] = useState(false);

  const register = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        data
      );
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(response.data);
    } catch (error) {
      console.error("Đăng ký thất bại:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}

export default useRegister;
