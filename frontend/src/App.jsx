import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import AdminPage from "./components/AdminPage";
import { CartProvider } from "./context/CartContext";
import { Home } from "./Home";
import ProductDetailPage from "./components/ProductDetailPage";
import Footer from "./components/Footer";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contactpage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import ProductList from "./components/ProductList";


function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminPage />} />
             <Route path="/product/:id" element={<ProductDetailPage />} />
             <Route path="/about" element={<AboutPage/>}/>
             <Route path="/contact" element={<ContactPage/>}/>
             <Route path="/order-confirmation" element={<OrderConfirmationPage/>}/>
             <Route path="/products" element={<ProductList/>}/>
            <Route
              path="*"
              element={<div className="text-center text-xl">Page Not Found</div>}
            />
          </Routes>
        </main>
        <Footer/>
      </div>
    </CartProvider>
  );
}

export default App;
