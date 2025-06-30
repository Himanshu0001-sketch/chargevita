import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const { cartItems: initialCartItems, totalAmount: initialTotal } = state || {
    cartItems: [],
    totalAmount: 0,
  };

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [totalAmount, setTotalAmount] = useState(initialTotal);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    if (!initialCartItems || initialCartItems.length === 0) {
      navigate("/");
    }
  }, [initialCartItems, navigate]);

  // Recalculate total when quantities change
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.slug === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handlePlaceOrder = async () => {
    if (loading) return;
    setLoading(true);

    const requiredFields = ["name", "phone", "street", "city", "state", "postalCode"];
    const hasEmptyFields = requiredFields.some((key) => address[key].trim() === "");
    if (hasEmptyFields) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        products: cartItems.map((item) => ({
          productId: item.slug,
          name:      item.name,
          price:     item.price,
          quantity:  item.quantity,
        })),
        totalAmount,
        address,
      };

      const { data } = await axios.post(`${apiUrl}/api/orders`, payload);

      const orderDetails = {
        orderId:     data._id || `COD${Date.now()}`,
        paymentStatus: data.paymentStatus || "Pending",
        cartItems,
        totalAmount,
        address,
      };

      navigate("/order-confirmation", { state: orderDetails });
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.entries(address).every(([key, val]) => {
    if (key === "email") return true;
    return val.trim() !== "";
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="flex flex-col-reverse md:flex-row gap-6">
          {/* Shipping Form */}
          <div className="w-full md:w-3/5 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Shipping Information</h2>
            <div className="space-y-4">
              {[
                { name: "name", label: "Full Name" },
                { name: "phone", label: "Phone Number" },
                { name: "email", label: "Email Address (optional)" },
                { name: "street", label: "Street Address" },
                { name: "city", label: "City" },
                { name: "state", label: "State" },
                { name: "postalCode", label: "Postal Code" },
              ].map((field) => (
                <input
                  key={field.name}
                  type="text"
                  name={field.name}
                  placeholder={field.label}
                  value={address[field.name]}
                  onChange={handleAddressChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={!isFormValid || loading}
              className={`mt-6 w-full bg-blue-600 text-white font-medium text-lg py-3 rounded-md transition hover:bg-blue-700 ${
                !isFormValid || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Place Order (Cash on Delivery)"}
            </button>
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-2/5 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.slug}
                  className="flex items-start justify-between gap-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.slug, -1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.slug, 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                  </div>
                  <p className="font-semibold text-gray-700">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-4 space-y-2 text-right">
              <p className="text-gray-700 text-sm">
                Items: <span className="font-medium">{cartItems.length}</span>
              </p>
              <p className="text-gray-800 text-xl font-bold">
                Total: ₹{totalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
