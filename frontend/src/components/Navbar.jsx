import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import { FaCartPlus } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseFill } from "react-icons/ri";
import imageone from "../assets/image/chargevitalogo.png";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { setShowCartSidebar } = useUI();
  const navigate = useNavigate();
  const itemCount = cartItems.reduce((a, c) => a + c.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCartClick = () => {
    setShowCartSidebar(true);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white text-orange-500 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-2">
        <Link to="/" className="flex items-center">
          <img src={imageone} alt="ChargeVita" className="h-12 mr-2" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="hover:text-[#1a202c]">Home</Link>
          <Link to="/about" className="hover:text-[#1a202c]">About</Link>
          <Link to="/products" className="hover:text-[#1a202c]">Products</Link>
          <Link to="/contact" className="hover:text-[#1a202c]">Contact</Link>
        </div>

        <div className="flex items-center space-x-6">
          {/* Cart Button */}
          <button onClick={handleCartClick} className="flex items-center">
            <FaCartPlus className="mr-1" /> ({itemCount})
          </button>

          {/* Mobile menu toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
            {isMenuOpen ? <RiCloseFill /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#F3F4F6] text-gray-800 py-4 px-6 space-y-4 border-t">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-gray-100">
            Home
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-gray-100">
            About
          </Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-gray-100">
            Products
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-gray-100">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
