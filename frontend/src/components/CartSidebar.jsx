// src/components/CartSidebar.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartSidebar = ({ onClose }) => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Only charge for 1 unit per 3 (buy 1 get 2 free)
  const totalAmount = cartItems.reduce((acc, item) => {
    const paidUnits = Math.ceil(item.quantity / 3);
    return acc + paidUnits * item.price;
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
    <div
      className="
        fixed top-0 right-0
        w-[70%]      /* 70% width on mobile */
        sm:w-96      /* 24rem width from small screens up */
        h-full bg-white shadow-lg z-50 overflow-y-auto
      "
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <button onClick={onClose} className="text-red-500 text-2xl leading-none">×</button>
      </div>

      <div className="p-4 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => {
              const paidUnits = Math.ceil(item.quantity / 3);
              const subtotal = paidUnits * item.price;
              return (
                <div key={item.slug} className="flex gap-3 items-center border p-2 rounded">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm">
                      Qty: {item.quantity}{" "}
                      <span className="text-gray-500">(1 paid + {item.quantity - 1} free)</span>
                    </p>
                    <p className="mt-1 text-sm">
                      ₹{item.price} × {paidUnits} = <strong>₹{subtotal}</strong>
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => updateCartItemQuantity(item.slug, -1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        −
                      </button>
                      <button
                        onClick={() => updateCartItemQuantity(item.slug, 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.slug)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            <div className="pt-4 border-t">
              <p className="text-lg font-bold">Total: ₹ {totalAmount}</p>
              <button
                onClick={handleCheckout}
                className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-2 text-red-600 text-sm hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
