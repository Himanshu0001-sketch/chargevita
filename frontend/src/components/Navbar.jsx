import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useUI } from "../context/UIContext"; // 🆕 UI context
import { FaCartPlus } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseFill } from "react-icons/ri";
import imageone from "../assets/image/chargevitalogo.png";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { setShowCartSidebar } = useUI(); // 🆕
  const itemCount = cartItems.reduce((a, c) => a + c.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCartClick = () => {
    setShowCartSidebar(true); // 🛒 open sidebar
    setIsMenuOpen(false); // optional: close mobile menu if open
  };

  return (
    <nav className="bg-white text-orange-500 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-2">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500 uppercase tracking-wide flex items-center">
          <img src={imageone} alt="ChargeVita" className="h-12 mr-2" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-lg font-medium hover:text-[#1a202c] transition">Home</Link>
          <Link to="/about" className="text-lg font-medium hover:text-[#1a202c] transition">About</Link>
          <Link to="/products" className="text-lg font-medium hover:text-[#1a202c] transition">Products</Link>
          <Link to="/contact" className="text-lg font-medium hover:text-[#1a202c] transition">Contact</Link>
        </div>

        {/* Cart + Mobile Menu Toggle */}
        <div className="flex items-center space-x-6">
          <button onClick={handleCartClick} className="flex items-center text-lg font-medium hover:text-[#1a202c]">
            <FaCartPlus className="mr-1" /> ({itemCount})
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
            {isMenuOpen ? <RiCloseFill /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
  <div className="md:hidden bg-[#F3F4F6] text-gray-800 py-4 px-6 space-y-6 border-t border-gray-300">
    <Link
      to="/"
      onClick={() => setIsMenuOpen(false)}
      className="block text-lg font-medium text-orange-500 hover:text-[#1a202c]"
    >
      Home
    </Link>
    <Link
      to="/about"
      onClick={() => setIsMenuOpen(false)}
      className="block text-lg font-medium text-orange-500 hover:text-[#1a202c]"
    >
      About
    </Link>
    <Link
      to="/products"
      onClick={() => setIsMenuOpen(false)}
      className="block text-lg font-medium text-orange-500 hover:text-[#1a202c]"
    >
      Products
    </Link>
    <Link
      to="/contact"
      onClick={() => setIsMenuOpen(false)}
      className="block text-lg font-medium text-orange-500 hover:text-[#1a202c]"
    >
      Contact
    </Link>
    <button
      onClick={handleCartClick}
      className="flex items-center text-lg font-medium text-orange-500 hover:text-[#1a202c]"
    >
      <FaCartPlus className="mr-2" /> ({itemCount})
    </button>
  </div>
)}

    </nav>
  );
};

export default Navbar;
