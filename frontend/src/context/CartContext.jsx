// src/context/CartContext.jsx
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item with quantity, merging if exists
  const addToCart = (product, quantity) => {
    setCartItems(items => {
      const exists = items.find(item => item.slug === product.slug);
      if (exists) {
        return items.map(item =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // include full product object to preserve 'offer' info
        return [...items, { ...product, quantity }];
      }
    });
  };

  // Remove completely
  const removeFromCart = slug => {
    setCartItems(items => items.filter(item => item.slug !== slug));
  };

  // Update quantity delta
  const updateCartItemQuantity = (slug, delta) => {
    setCartItems(items =>
      items
        .map(item =>
          item.slug === slug
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Clear all
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
