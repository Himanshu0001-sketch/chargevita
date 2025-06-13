import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add product to the cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from the cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((p) => p._id !== productId));
  };

  // Clear the cart
  const clearCart = () => setCartItems([]);

  // Update quantity (increment or decrement)
  const updateCartItemQuantity = (productId, quantityChange) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p._id === productId
          ? { ...p, quantity: Math.max(1, p.quantity + quantityChange) } // Prevent negative quantities
          : p
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
