import React, { useContext, useState, useRef, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import { CartContext } from "../context/CartContext"; 
import { AuthContext } from "../context/AuthContext"; 
import { useUI } from "../context/UIContext"; 
import { FaCartPlus, FaUserCircle } from "react-icons/fa"; 
import { GiHamburgerMenu } from "react-icons/gi"; 
import { RiCloseFill } from "react-icons/ri"; 
import imageone from "../assets/image/chargevitalogo.png";  

const Navbar = () => {   
  const { cartItems } = useContext(CartContext);   
  const { user, logout } = useContext(AuthContext);   
  const { setShowCartSidebar } = useUI();   
  const navigate = useNavigate();   
  const itemCount = cartItems.reduce((a, c) => a + c.quantity, 0);    

  const [isMenuOpen, setIsMenuOpen] = useState(false);   
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);   
  const userMenuRef = useRef(null);    

  const handleCartClick = () => {     
    setShowCartSidebar(true);     
    setIsMenuOpen(false);   
  };    

  const handleUserIconClick = () => {     
    setIsUserMenuOpen((prev) => !prev);     
    setIsMenuOpen(false);   
  };    

  const handleLogout = () => {     
    setIsUserMenuOpen(false);     
    logout();     
    navigate("/");   
  };    

  useEffect(() => {     
    const handleClickOutside = (e) => {       
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {         
        setIsUserMenuOpen(false);       
      }     
    };     
    document.addEventListener("mousedown", handleClickOutside);     
    return () => document.removeEventListener("mousedown", handleClickOutside);   
  }, []);    

  return (     
    <nav className="bg-white text-orange-500 shadow-md fixed top-0 w-full z-50">       
      <div className="container mx-auto flex justify-between items-center px-6 py-2">         
        <Link to="/" className="flex items-center">           
          <img src={imageone} alt="ChargeVita" className="h-12 mr-2" />           
        </Link>          

        {/* Desktop Menu (Hidden on mobile) */}         
        <div className="hidden md:flex space-x-8 items-center">           
          <Link to="/" className="hover:text-[#1a202c]">Home</Link>           
          <Link to="/about" className="hover:text-[#1a202c]">About</Link>           
          <Link to="/products" className="hover:text-[#1a202c]">Products</Link>           
          <Link to="/contact" className="hover:text-[#1a202c]">Contact</Link>         
        </div>          

        <div className="flex items-center space-x-6">
          {/* Cart Button (Always visible on both desktop and mobile) */}
          <button onClick={handleCartClick} className="flex items-center">
            <FaCartPlus className="mr-1" /> ({itemCount})
          </button>

          {/* User Icon (Visible on desktop, hidden on mobile) */}
          <div className="relative hidden md:block" ref={userMenuRef}>
            <button onClick={handleUserIconClick} className="text-2xl">
              <FaUserCircle />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-gray-800 cursor-default">{user.name}</div>
                    <button
                      onClick={() => { navigate('/my-orders'); setIsUserMenuOpen(false); }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
            {isMenuOpen ? <RiCloseFill /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#F3F4F6] text-gray-800 py-4 px-6 space-y-4 border-t">
          {/* User Info Section in Hamburger Menu */}
          <div className="flex flex-col space-y-4">
            <div className="text-xl font-semibold">
              {user ? user.name : "User"} {/* Show user name or "User" if not logged in */}
            </div>

            {/* Links */}
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>

            {/* Conditionally render based on user login */}
            {user ? (
              <>
                <Link
                  to="/my-orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block py-2 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 hover:bg-gray-100"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
