import axios from "axios";
import { useContext } from "react";
import AuthContext from "~/context/AuthProvider";

function useLogout() {
  const { handleLogout } = useContext(AuthContext);
  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/authentication/logout",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // localStorage.removeItem("refresh_token");
      // localStorage.removeItem("cartId");
      // localStorage.removeItem("userId");
      handleLogout();
    } catch (error) {
      console.log("Error:", error);
      return false;
    }
  };
  return { logout };
}

export default useLogout;
