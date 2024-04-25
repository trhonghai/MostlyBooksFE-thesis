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

  const AddtoCart = async (id, price, quantity) => {
    const cartId = localStorage.getItem("cartId");
    try {
      const data = {
        cartId: cartId,
        bookId: id,
        price: price,
        quantity: quantity,
      };
      console.log(quantity);

      const response = await axios.post(
        "http://localhost:8080/user-cart/add-to-cart",
        data
      );
      return response.data;
    } catch (error) {}
  };
  return { fetchCartItem, AddtoCart };
}

export default useCart;
