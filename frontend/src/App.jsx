// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar         from "./components/Navbar";
import Footer         from "./components/Footer";
import { Home }       from "./Home";
import ProductList    from "./components/ProductList";
import ProductDetail  from "./components/ProductDetailPage";
import CheckoutPage   from "./components/CheckoutPage";
import OrderConfirm   from "./components/OrderConfirmationPage";
import AboutPage      from "./pages/About";
import ContactPage    from "./pages/Contactpage";

import Login          from "./components/Login";
import Register       from "./components/Register";
import MyOrders       from "./pages/MyOrders";

import AdminLogin     from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageProducts from "./components/Admin/ManageProducts";
import ManageOrders   from "./components/Admin/ManageOrders";

import { CartProvider } from "./context/CartContext";
import { UIProvider, useUI } from "./context/UIContext";
import { AuthProvider } from "./context/AuthContext";

import CartSidebar     from "./components/CartSidebar";
import RequireAuth     from "./components/RequireAuth";
import ProtectedRoute  from "./components/ProtectedRoutes";

// Moved useUI inside UIProvider to ensure context is available
const AppContent = () => {
  const { showCartSidebar, setShowCartSidebar } = useUI();

  return (
    <>
      <Navbar />

      {/* Cart Sidebar: shown when triggered */}
      {showCartSidebar && (
        <CartSidebar onClose={() => setShowCartSidebar(false)} />
      )}

      <main className="pt-16">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/order-confirmation" element={<OrderConfirm />} />

          {/* User Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected User Routes */}
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <CheckoutPage />
              </RequireAuth>
            }
          />
          <Route
            path="/my-orders"
            element={
              <RequireAuth>
                <MyOrders />
              </RequireAuth>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute needsLoginSource>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute needsDashboardSource>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute needsDashboardSource>
                <ManageOrders />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          {/* AppContent must be inside UIProvider for useUI */}
          <AppContent />
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
