// frontend/src/pages/OrderConfirmationPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Success icon

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  const {  totalAmount, orderId, paymentStatus, address } = state || {};

  useEffect(() => {
    if (!orderId) {
      navigate("/"); // Redirect to home if no order details available
    } else {
      setOrderDetails({
        orderId,
        paymentStatus,
        address,
      });
    }
  }, [orderId, navigate]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-5 py-5">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="flex justify-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Order Confirmation
        </h1>

        {/* Order Confirmation Details */}
        <p className="text-center text-gray-600 mb-4">
          Thank you for your purchase! Your order has been successfully placed.
        </p>

       <div className="bg-gray-100 p-4 rounded-lg mb-8">
  <h2 className="text-xl font-medium text-gray-800 mb-2">Order Summary</h2>
  <div className="flex justify-between mb-2">
    <span className="text-gray-600">Order ID:</span>
    <span className="font-semibold text-gray-800">{orderDetails.orderId}</span>
  </div>
  <div className="flex justify-between mb-2">
    <span className="text-gray-600">Payment Method:</span>
    <span className="font-semibold text-gray-800">Cash on Delivery</span>
  </div>
  <div className="flex justify-between mb-2">
    <span className="text-gray-600">Total Amount:</span>
    <span className="font-semibold text-gray-800">₹ {totalAmount}</span>
  </div>
</div>

        {/* Shipping Address */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h2 className="text-xl font-medium text-gray-800 mb-2">Shipping Address</h2>
          <div className="flex flex-col space-y-2">
            <span className="text-gray-600">Name: <span className="font-semibold text-gray-800">{address.name}</span></span>
            <span className="text-gray-600">Street: <span className="font-semibold text-gray-800">{address.street}</span></span>
            <span className="text-gray-600">City: <span className="font-semibold text-gray-800">{address.city}</span></span>
            <span className="text-gray-600">State: <span className="font-semibold text-gray-800">{address.state}</span></span>
            <span className="text-gray-600">Postal Code: <span className="font-semibold text-gray-800">{address.postalCode}</span></span>
          </div>
        </div>

        {/* Order Action Section */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
