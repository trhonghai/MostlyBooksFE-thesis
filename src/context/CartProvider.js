import React, { createContext, useState } from "react";
import axios from "axios";
import { useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [totalCartItems, setTotalCartItems] = useState(10);

  const getTotalCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user-cart/get-total-cart?cart=${localStorage.getItem(
          "cartId"
        )}`
      );
      setTotalCartItems(response.data);
      console.log("Total cart items updated:", response.data);
    } catch (error) {
      console.error("Error updating total cart items:", error);
    }
  };

  return (
    <CartContext.Provider value={{ totalCartItems, getTotalCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

