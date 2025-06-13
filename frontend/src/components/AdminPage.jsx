import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoPersonCircleOutline } from "react-icons/io5";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders");
        setOrders(data);
        setError("");
      } catch (err) {
        setError("Failed to fetch orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/orders/admin",
        { username, password }
      );
      setOrders(data);
      setError("");
    } catch (err) {
      setError("Invalid credentials or error fetching orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderStatusUpdate = async (orderId, status) => {
    try {
      await axios.post("http://localhost:5000/api/orders/update-status", {
        id: orderId,
        status,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, paymentStatus: status } : order
        )
      );

      alert("Order status updated!");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      alert("Order deleted!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 mt-10">
     
     

      {orders.length === 0 ? (
       <form
  onSubmit={handleLogin}
  className="max-w-md mx-auto bg-white p-6 rounded shadow"
>
  <div className="flex justify-center mb-4">
    <IoPersonCircleOutline className="text-6xl text-blue-600" />
  </div>
  <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
    Admin Login
  </h2>

  <div className="mb-4">
    <label className="block mb-1 font-medium">Username:</label>
    <input
      type="text"
      className="w-full border p-2 rounded"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      placeholder="Enter admin username"
    />
  </div>

  <div className="mb-4">
    <label className="block mb-1 font-medium">Password:</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Enter password"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  </div>

  {/* Error message can be uncommented if needed */}
  {/* {error && <p className="text-red-600 mb-2">{error}</p>} */}

  <button
    type="submit"
    className="bg-blue-600 w-full text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    {loading ? "Logging in..." : "Login & View Orders"}
  </button>
</form>

      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-6">All Orders</h2>

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border bg-white p-4 rounded-lg shadow-sm space-y-2"
              >
                {/* Order ID + Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <p className="font-semibold text-sm break-all">
                    Order ID: {order._id}
                  </p>
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 self-start sm:self-auto">
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  ({order.paymentStatus === "Paid" ? "Paid" : "Pending/Failed"})
                </p>

                <p className="text-sm">
                  Placed At:{" "}
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </p>
                <p className="text-sm">Total: ₹ {order.totalAmount}</p>

                {/* Address */}
                {order.address ? (
                  <div className="text-sm">
                    <p className="font-semibold">Shipping Address:</p>
                    <p>Name: {order.address.name}</p>
                    <p>Street: {order.address.street}</p>
                    <p>City: {order.address.city}</p>
                    <p>State: {order.address.state}</p>
                    <p>Postal Code: {order.address.postalCode}</p>
                  </div>
                ) : (
                  <p className="text-red-600">Address details not available.</p>
                )}

                {/* Products */}
                <div>
                  <p className="font-medium underline text-sm">Items:</p>
                  <ul className="list-disc pl-5 text-sm">
                    {order.products && Array.isArray(order.products) && order.products.length > 0 ? (
                      order.products.map((item, idx) =>
                        item && item.product ? (
                          <li key={idx}>
                            {item.product.name} x {item.quantity} (₹{item.product.price} each)
                          </li>
                        ) : (
                          <li key={idx}>Invalid item data</li>
                        )
                      )
                    ) : (
                      <li>No items in this order</li>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() =>
                      handleOrderStatusUpdate(order._id, "Shipped")
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Mark as Shipped
                  </button>
                  <button
                    onClick={() =>
                      handleOrderStatusUpdate(order._id, "Delivered")
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Mark as Delivered
                  </button>
                  <button
                    onClick={() =>
                      handleOrderStatusUpdate(order._id, "Cancelled")
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Mark as Cancelled
                  </button>
                  <button
                    onClick={() =>
                      handleOrderStatusUpdate(order._id, "Yet to Dispatch")
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Yet to Dispatch
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
