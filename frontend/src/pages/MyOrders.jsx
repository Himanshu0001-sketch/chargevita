import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaBoxOpen, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/my-orders`
        );
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, [user]);

  if (!orders.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-xl">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">My Orders</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaBoxOpen className="text-2xl" />
                  <span className="font-medium">Order ID:</span>
                  <span className="font-mono">{order._id}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt />
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg text-gray-700 font-semibold flex items-center">
                    <FaRupeeSign className="mr-1" />
                    {order.totalAmount.toLocaleString()}
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    COD
                  </span>
                </div>
                <h3 className="text-md font-medium text-gray-800 mb-2">
                  Items:
                </h3>
                <ul className="space-y-1 list-disc list-inside mb-4">
                  {order.products.map((p, idx) => (
                    <li key={idx} className="text-gray-700">
                      {p.quantity} × {p.name}
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium">Shipping Info:</h4>
                  <p>{order.address.name}</p>
                  <p>
                    {order.address.street}, {order.address.city}, {order.address.state} - {order.address.postalCode}
                  </p>
                  {order.address.phone && <p>Phone: {order.address.phone}</p>}
                  {order.address.email && <p>Email: {order.address.email}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
