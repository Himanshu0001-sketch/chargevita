import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartSidebar = ({ onClose }) => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    window.scrollTo(0, 0); // Scroll to top before navigating
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate("/checkout", { state: { cartItems, totalAmount } });
    onClose(); // Close the sidebar after navigating
  };

  return (
    <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg shadow-gray-300 z-50 transition-transform duration-300 transform translate-x-0 overflow-y-auto">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button onClick={onClose} className="text-red-500 text-xl cursor-pointer">✕</button>
      </div>

      <div className="p-4 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-3 items-center border p-2 rounded">
                <img src={`${apiUrl}${item.image}`} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p>₹ {item.price} × {item.quantity}</p>
                  <div className="flex gap-2 mt-1">
                    <button onClick={() => updateCartItemQuantity(item._id, -1)} className="px-2 bg-gray-200">-</button>
                    <button onClick={() => updateCartItemQuantity(item._id, 1)} className="px-2 bg-gray-200">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="text-sm text-red-500">Remove</button>
              </div>
            ))}
            <div className="pt-4 border-t">
              <p className="text-lg font-bold">Total: ₹ {totalAmount}</p>
              <button
                onClick={handleCheckout}
                className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-2 text-red-600 text-sm hover:underline cursor-pointer"
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
