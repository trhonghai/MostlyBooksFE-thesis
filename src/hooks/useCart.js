import axios from "axios";

function useCart() {
  const cartId = localStorage.getItem("cartId");
  const fetchCartItem = () => {
    const response = axios.get(
      `http://localhost:8080/user-cart?cart=${cartId}`
    );
    console.log(response);
    return { result: response.data };
  };
  return { fetchCartItem };
}

export default useCart;
