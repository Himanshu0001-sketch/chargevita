// src/components/CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { cartItems: initialCartItems = [], totalAmount: initialTotal = 0 } = state || {};
  const [cartItems, setCartItems]     = useState(initialCartItems);
  const [totalAmount, setTotalAmount] = useState(initialTotal);
  const [loading, setLoading]         = useState(false);
  const [address, setAddress]         = useState({
    name: "", phone: "", email: "", street: "", city: "", state: "", postalCode: ""
  });

  // redirect if no items
  useEffect(() => {
    if (!initialCartItems.length) navigate("/");
  }, [initialCartItems, navigate]);

  // recompute total using same logic
  useEffect(() => {
    const total = cartItems.reduce((acc, it) => {
      const paidUnits = Math.ceil(it.quantity / 3);
      return acc + paidUnits * it.price;
    }, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handleAddressChange = e => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const updateQuantity = (slug, delta) =>
    setCartItems(items =>
      items.map(it =>
        it.slug === slug
          ? { ...it, quantity: Math.max(1, it.quantity + delta) }
          : it
      )
    );

  const handlePlaceOrder = async () => {
    if (loading) return;
    setLoading(true);

    // require email now too
    const required = ["name","phone","email","street","city","state","postalCode"];
    if (required.some(f => !address[f].trim())) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const payload = {
      products: cartItems.map(it => ({
        productId: it.slug,
        name:      it.name,
        price:     it.price,
        quantity:  it.quantity
      })),
      totalAmount,
      address
    };

    try {
      const { data } = await axios.post(`${apiUrl}/api/orders`, payload);
      navigate("/order-confirmation", {
        state: { orderId: data._id, cartItems, totalAmount, address }
      });
    } catch (err) {
      console.error("Order error:", err.response?.data || err);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.values(address).every(v => Boolean(v.trim()));

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="flex flex-col-reverse md:flex-row gap-6">
          {/* Shipping Form */}
          <div className="w-full md:w-3/5 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              {[
                { name:"name", label:"Full Name" },
                { name:"phone", label:"Phone Number" },
                { name:"email", label:"Email Address" },
                { name:"street", label:"Street Address" },
                { name:"city", label:"City" },
                { name:"state", label:"State" },
                { name:"postalCode", label:"Postal Code" },
              ].map(f => (
                <input
                  key={f.name}
                  type={f.name==="email"?"email":"text"}
                  name={f.name}
                  placeholder={f.label}
                  value={address[f.name]}
                  onChange={handleAddressChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={!isFormValid||loading}
              className={`mt-6 w-full py-3 text-white font-medium rounded-md transition ${
                !isFormValid||loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Place Order (Cash on Delivery)"}
            </button>
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-2/5 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cartItems.map(it => {
                const paidUnits = Math.ceil(it.quantity/3);
                const subtotal  = paidUnits * it.price;
                return (
                  <div key={it.slug} className="flex items-start justify-between gap-4 border-b pb-4">
                    <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded" loading="lazy" />
                    <div className="flex-1">
                      <p className="font-medium">{it.name}</p>
                      <p className="text-sm">
                        Qty: {it.quantity} <span className="text-gray-500">(1 paid + 2 free)</span>
                      </p>
                      <p className="mt-1">₹{it.price} × {paidUnits} = <strong>₹{subtotal}</strong></p>
                      <div className="flex gap-2 mt-1">
                        <button onClick={()=>updateQuantity(it.slug,-1)} className="px-2 bg-gray-200 rounded">-</button>
                        <button onClick={()=>updateQuantity(it.slug, 1)} className="px-2 bg-gray-200 rounded">+</button>
                      </div>
                    </div>
                    <p className="font-semibold">₹{subtotal}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-right">
              <p>Items: <span className="font-medium">{cartItems.length}</span></p>
              <p className="text-xl font-bold">Total: ₹{totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
