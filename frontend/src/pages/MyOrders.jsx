import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/my-orders`
      );
      setOrders(data);
    };
    if (user) fetch();
  }, [user]);

  if (!orders.length) return <p className="p-8 text-center">No orders found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.map(o => (
        <div key={o._id} className="border p-4 rounded mb-4">
          <p><strong>Order ID:</strong> {o._id}</p>
          <p><strong>Date:</strong> {new Date(o.createdAt).toLocaleString()}</p>
          <p><strong>Total:</strong> ₹{o.totalAmount}</p>
          <ul className="ml-4 list-disc">
            {o.products.map((p, i) => (
              <li key={i}>
                {p.quantity}× {p.product?.name || "Unknown"}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
