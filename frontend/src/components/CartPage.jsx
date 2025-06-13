import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add some items before checking out.");
      return;
    }
    navigate("/checkout", { state: { cartItems, totalAmount } });
  };

  const handleIncrementQuantity = (id) => {
    updateCartItemQuantity(id, 1);
  };

  const handleDecrementQuantity = (id) => {
    updateCartItemQuantity(id, -1);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Your Cart</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section (Product List) */}
        <div className="w-full md:w-2/3 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-lg sm:text-xl text-gray-600 mb-4">No items in cart.</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 text-blue-600 hover:underline text-lg"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                      <p className="text-sm text-gray-500 mt-1">₹ {item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleDecrementQuantity(item._id)}
                          className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 hover:bg-gray-300"
                        >
                          -
                        </button>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <button
                          onClick={() => handleIncrementQuantity(item._id)}
                          className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      
                      <p className="font-bold text-gray-800 mt-1">Total: ₹ {item.price * item.quantity}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section (Cart Summary) */}
        <div className="w-full md:w-1/3 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
          <div className="space-y-3">
            <p className="text-base text-gray-700">Total Products: {cartItems.length}</p>
            <p className="text-base text-gray-700">
              Total Quantity: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
            <p className="text-xl font-bold text-gray-800">Total: ₹ {totalAmount}</p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all"
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="text-red-600 hover:underline text-base font-semibold"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
