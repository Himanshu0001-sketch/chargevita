import React from "react";
import  { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
 // ✅ Correct import

import CheckoutPage from "./components/CheckoutPage";
import ProductDetailPage from "./components/ProductDetailPage";
import Footer from "./components/Footer";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contactpage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import ProductList from "./components/ProductList";
import AdminLogin from "./components/Admin/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoutes";
import ManageProducts from "./components/Admin/ManageProducts";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageOrders from "./components/Admin/ManageOrders";

import { CartProvider } from "./context/CartContext";
import { UIProvider, useUI } from "./context/UIContext";

import { Home } from "./Home";

import CartSidebar from "./components/CartSidebar";

// CartSidebarHandler: Inner component to toggle sidebar based on context
const CartSidebarHandler = () => {
  const { showCartSidebar, setShowCartSidebar } = useUI();
  return showCartSidebar ? <CartSidebar onClose={() => setShowCartSidebar(false)} /> : null;
};

function App() {
  return (
    <CartProvider>
      <UIProvider>
        <div className="min-h-screen flex flex-col relative">
          <Navbar />
          <CartSidebarHandler /> {/* 🛒 Sidebar handler here */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/products" element={<ProductList />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute needsLoginSource={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute needsDashboardSource={true}>
                    <ManageProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute needsDashboardSource={true}>
                    <ManageOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={<div className="text-center text-xl">Page Not Found</div>}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </UIProvider>
    </CartProvider>
  );
}

export default App;
