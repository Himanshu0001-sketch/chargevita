// src/App.jsx
import React, { lazy, Suspense, memo } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { UIProvider, useUI } from "./context/UIContext";
import { AuthProvider } from "./context/AuthContext";

// Lazy load components for code splitting
const Home = lazy(() => import("./Home").then(module => ({ default: module.Home })));
const ProductList = lazy(() => import("./components/ProductList"));
const ProductDetail = lazy(() => import("./components/ProductDetailPage"));
const CheckoutPage = lazy(() => import("./components/CheckoutPage"));
const OrderConfirm = lazy(() => import("./components/OrderConfirmationPage"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contactpage"));

const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const MyOrders = lazy(() => import("./pages/MyOrders"));

const AdminLogin = lazy(() => import("./components/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard"));
const ManageProducts = lazy(() => import("./components/Admin/ManageProducts"));
const ManageOrders = lazy(() => import("./components/Admin/ManageOrders"));

const CartSidebar = lazy(() => import("./components/CartSidebar"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoutes"));

// Loading component for Suspense fallback
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
  </div>
));

// 404 Page component
const NotFoundPage = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-600">The page you're looking for doesn't exist.</p>
    </div>
  </div>
));

// Moved useUI inside UIProvider to ensure context is available
const AppContent = memo(() => {
  const { showCartSidebar, setShowCartSidebar } = useUI();

  return (
    <>
      <Navbar />
      
      {/* Cart Sidebar: shown when triggered */}
      {showCartSidebar && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 z-50" />}>
          <CartSidebar onClose={() => setShowCartSidebar(false)} />
        </Suspense>
      )}

      <main className="pt-16">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
});

AppContent.displayName = 'AppContent';

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