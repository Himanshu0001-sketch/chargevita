import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaCartPlus } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"; // Import hamburger menu icon
import { RiCloseFill } from "react-icons/ri"; // Import close icon for mobile menu
import imageone from "../assets/image/chargevitalogo.png"
const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((a, c) => a + c.quantity, 0);
  
  // For mobile navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-orange-500 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-2">
        {/* Brand Name / Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500 uppercase tracking-wide flex items-center">
          <img src={imageone} alt="ChargeVita" className=" h-12 mr-2" /> {/* Logo here */}
          
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-lg font-medium text-orange-500 hover:text-[#1a202c] transition duration-300">Home</Link>
          <Link to="/about" className="text-lg font-medium text-orange-500 hover:text-[#1a202c] transition duration-300">About</Link>
          <Link to="/products" className="text-lg font-medium text-orange-500 hover:text-[#1a202c] transition duration-300">Products</Link>
          <Link to="/contact" className="text-lg font-medium text-orange-500 hover:text-[#1a202c] transition duration-300">Contact</Link>
        </div>

        {/* Cart Icon */}
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="flex items-center text-lg font-medium text-orange-500 hover:text-[#1a202c]">
            <FaCartPlus className="mr-1" /> ({itemCount})
          </Link>

          {/* Mobile Menu Icon */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
            {isMenuOpen ? <RiCloseFill /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#F3F4F6] text-gray-800 py-4 px-6 space-y-6 border-t border-gray-300">
          <Link to="/" className="block text-lg font-medium text-orange-500 hover:text-[#1a202c]">Home</Link>
          <Link to="/about" className="block text-lg font-medium text-orange-500 hover:text-[#1a202c]">About</Link>
          <Link to="/products" className="block text-lg font-medium text-orange-500 hover:text-[#1a202c]">Products</Link>
          <Link to="/contact" className="block text-lg font-medium text-orange-500 hover:text-[#1a202c]">Contact</Link>
          <Link to="/cart" className="block text-lg font-medium text-orange-500 hover:text-[#1a202c]">
            <FaCartPlus className="mr-2" /> ({itemCount})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
