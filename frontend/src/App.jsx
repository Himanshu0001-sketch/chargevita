import React, { lazy, Suspense, memo } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { UIProvider, useUI } from "./context/UIContext";


// Lazy load components for code splitting
const Home           = lazy(() => import("./Home").then(module => ({ default: module.Home })));
const ProductList    = lazy(() => import("./components/ProductList"));
const ProductDetail  = lazy(() => import("./components/ProductDetailPage"));
const CheckoutPage   = lazy(() => import("./components/CheckoutPage"));
const OrderConfirm   = lazy(() => import("./components/OrderConfirmationPage"));
const AboutPage      = lazy(() => import("./pages/About"));
const ContactPage    = lazy(() => import("./pages/Contactpage"));





const CartSidebar    = lazy(() => import("./components/CartSidebar"));



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

const AppContent = memo(() => {
  const { showCartSidebar, setShowCartSidebar } = useUI();

  return (
    <>
      <Navbar />
      
      {/* Cart Sidebar: shown when triggered */}
      {showCartSidebar && (
        <Suspense fallback={<LoadingSpinner />}>
          <div className="fixed z-50">
            <CartSidebar onClose={() => setShowCartSidebar(false)} />
          </div>
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

            {/* <-- Updated to use slug --> */}
            <Route path="/product/:slug" element={<ProductDetail />} />

            <Route path="/order-confirmation" element={<OrderConfirm />} />

           

            {/* Protected User Routes */}
            <Route
              path="/checkout"
              element={
                
                  <CheckoutPage />
                
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
   
      <CartProvider>
        <UIProvider>
          {/* AppContent must be inside UIProvider for useUI */}
          <AppContent />
        </UIProvider>
      </CartProvider>
    
  );
}

export default App;
