import axios from "axios";

function useLogout() {
  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/authentication/logout",
        {
          Headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("cartId");
    } catch (error) {
      console.log("Error:", error);
      return false;
    }
  };
  return { logout };
}

export default useLogout;
