// src/components/CartSidebar.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import products from "../data/Products.json";

const CartSidebar = ({ onClose }) => {
  const { cartItems, addToCart, removeFromCart, clearCart, updateCartItemQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Auto-add free Ice Roller when Clear Skin Gummies present
  useEffect(() => {
    const hasSkin = cartItems.some((i) => i.slug === "clear-skin-gummies");
    const hasIce = cartItems.some((i) => i.slug === "ice-roller");
    if (hasSkin && !hasIce) {
      let ice = products.find((p) => p.slug === "ice-roller");
      if (!ice) {
        ice = {
          slug: "ice-roller",
          name: "Ice Roller",
          image: "/ice-roller.jpg",
          price: 0,
          offer: {}
        };
      }
      addToCart({ ...ice, price: 0 }, 1);
    }
  }, [cartItems, addToCart]);

  // Calculate total with offers
  const totalAmount = cartItems.reduce((acc, item) => {
    if (item.slug === "ice-roller") return acc;
    const buy = item.offer?.buy || 1;
    const free = item.offer?.free || 0;
    const group = buy + free;
    const groupsCount = Math.ceil(item.quantity / group);
    const paidUnits = groupsCount * buy;
    let subtotal = paidUnits * item.price;

    // Hair Health Gummies discount
    if (item.slug === "hair-health-gummies" && item.quantity >= 2) {
      const discount = Math.floor(item.quantity / 2) * 49;
      subtotal -= discount;
    }

    return acc + subtotal;
  }, 0);

  const handleCheckout = () => {
    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }
    navigate("/checkout", { state: { cartItems, totalAmount } });
    onClose();
  };

  return (
    <div className="fixed top-0 right-0 w-[70%] sm:w-96 h-full bg-white shadow-lg z-50 overflow-y-auto">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <button onClick={onClose} className="text-red-500 text-2xl leading-none">×</button>
      </div>
      <div className="p-4 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => {
              const isIce = item.slug === "ice-roller";
              if (isIce) {
                return (
                  <div key={item.slug} className="flex justify-between items-center border p-2 rounded">
                    <p className="font-semibold">
                      {item.name} <span className="text-green-600">(Free)</span>
                    </p>
                    <button
                      onClick={() => removeFromCart(item.slug)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                );
              }

              const buy = item.offer?.buy || 1;
              const free = item.offer?.free || 0;
              const group = buy + free;
              const groupsCount = Math.ceil(item.quantity / group);
              const paidUnits = groupsCount * buy;
              let subtotal = paidUnits * item.price;
              let discount = 0;

              if (item.slug === "hair-health-gummies" && item.quantity >= 2) {
                discount = Math.floor(item.quantity / 2) * 49;
                subtotal -= discount;
              }

              return (
                <div key={item.slug} className="flex gap-3 items-center border p-2 rounded">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                    <p className="mt-1 text-sm">
                      ₹{item.price} × {paidUnits} = <strong>₹{paidUnits * item.price}</strong>
                    </p>
                    {discount > 0 && <p className="text-sm text-green-600">Discount: -₹{discount}</p>}
                    <p className="mt-1 text-sm">Subtotal: <strong>₹{subtotal}</strong></p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => updateCartItemQuantity(item.slug, -1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">−</button>
                      <button onClick={() => updateCartItemQuantity(item.slug, 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.slug)} className="text-sm text-red-500 hover:underline">Remove</button>
                </div>
              );
            })}
            <div className="pt-4 border-t">
              <p className="text-lg font-bold">Total: ₹ {totalAmount}</p>
              <button onClick={handleCheckout} className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Checkout</button>
              <button onClick={clearCart} className="w-full mt-2 text-red-600 text-sm hover:underline">Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
