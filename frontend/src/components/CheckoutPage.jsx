import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const { cartItems, totalAmount } = state || { cartItems: [], totalAmount: 0 };

  // Get the API URL from environment variables
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    if (loading) return;

    setLoading(true);

    if (Object.values(address).some((field) => field.trim() === "")) {
      alert("Please fill in all address fields.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount,
        address,
      };

      // Updated API URL to use the environment variable
      const { data } = await axios.post(
        `${apiUrl}/api/payment/create`,
        payload
      );

      if (!data.paymentUrl) {
        alert("Error: Payment URL not received. Please try again.");
        return;
      }

      const options = {
        key: "rzp_test_5VP8aQsRZd71M5",
        amount: totalAmount * 100,
        currency: "INR",
        order_id: data.razorpayOrderId,
        handler: function (response) {
          const orderDetails = {
            orderId: data.orderId,
            paymentStatus: true,
            cartItems,
            totalAmount,
            address,
          };
          navigate("/order-confirmation", { state: orderDetails });
        },
        prefill: {
          name: address.name,
          email: "john.doe@example.com",
          contact: "+919876543210",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Error initiating payment:", err);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.values(address).every((field) => field.trim() !== "");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-9 mt-5">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-orange-500">
          Proceed to Checkout
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={address.name}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={handleAddressChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="my-6 text-center text-gray-600">
          <p>
            You have <strong>{cartItems.length}</strong> item(s) totaling{" "}
            <strong>₹ {totalAmount}</strong>.
          </p>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={!isFormValid || loading}
          className={`w-full bg-green-600 text-white text-lg font-semibold py-3 rounded-md transition duration-300 hover:bg-green-700 ${
            !isFormValid || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : `Pay ₹ ${totalAmount} Now`}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
