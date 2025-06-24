// src/components/Admin/ManageOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Axios instance with admin token auth
  const axiosAdmin = axios.create({
    baseURL: `${apiUrl}/api/orders`,
    headers: {
      authorization: import.meta.env.VITE_ADMIN_TOKEN,
    },
  });

  useEffect(() => {
    sessionStorage.removeItem("fromDashboard");
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // GET /api/orders/admin
      const res = await axiosAdmin.get("/admin");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      // DELETE /api/orders/:id
      await axiosAdmin.delete(`/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Failed to delete order", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-9">
      <h2 className="text-4xl font-bold mb-8 text-center text-orange-500 uppercase">Manage Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-6 border border-gray-200 rounded-2xl shadow-md bg-white hover:shadow-lg transition"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                {/* Left Side */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-800">
                    Order ID: {order._id}
                  </h3>

                  <p className="text-gray-500 text-sm mb-2">
                    Placed on: {new Date(order.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>

                  <p className="text-gray-700">
                    <span className="font-medium">Total:</span> ₹{order.totalAmount}
                  </p>

                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span> {order.paymentStatus}
                  </p>

                  {/* Full Address */}
                  <div className="mt-4">
                    <p className="text-gray-800 font-semibold mb-1">Shipping Address:</p>
                    <p className="text-gray-600 leading-relaxed">
                      <strong>Name:</strong> {order.address.name}<br />
                      <strong>Phone:</strong> {order.address.phone}<br />
                      {order.address.email && (
                        <><strong>Email:</strong> {order.address.email}<br /></>
                      )}
                      <strong>Street:</strong> {order.address.street}<br />
                      <strong>City:</strong> {order.address.city}<br />
                      <strong>State:</strong> {order.address.state}<br />
                      <strong>Postal Code:</strong> {order.address.postalCode}
                    </p>
                  </div>

                  {/* Product List with Image */}
                  <div className="mt-4">
                    <p className="text-gray-800 font-semibold mb-1">Products:</p>
                    <ul className="space-y-4">
                      {order.products.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4">
                          <img
                            src={`${apiUrl}${item.product?.image || "/placeholder.jpg"}`}
                            alt={item.product?.name || "Product"}
                            className="w-16 h-16 object-cover rounded shadow"
                          />
                          <div>
                            <p className="text-gray-700 font-medium">
                              {item.product?.name || "Unknown Product"}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity} | ₹{item.product?.price}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-start lg:items-end gap-4">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
