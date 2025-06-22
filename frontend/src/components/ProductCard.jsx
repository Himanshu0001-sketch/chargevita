import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { setShowCartSidebar } = useUI();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAddToCart = () => {
  addToCart(product);
  if (window.innerWidth >= 768) {
    setShowCartSidebar(true); // Only show sidebar on desktop
  }
};


  const handleBuyNow = () => {
  addToCart(product); // Optional: ensure product is in cart

  // ✅ Scroll to top before navigation
  window.scrollTo(0, 0);

  navigate("/checkout", {
    state: {
      cartItems: [{ ...product, quantity: 1 }],
      totalAmount: product.price,
    },
  });
};


  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className="bg-white p-4 rounded-2xl shadow-gray-400 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full"
    >
      {/* Product Image and Clickable Area */}
      <div
        className="flex-1 cursor-pointer"
        onClick={handleViewDetails}
      >
        <div className="w-full md:h-56 h-55 overflow-hidden rounded-xl">
          <img
            src={`${apiUrl}${product.image}`}
            alt={product.name}
            className="w-full h-50 md:h-full md:object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <p className="text-lg text-red-600 mt-3">₹{product.price}</p>
        <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h3>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleBuyNow}
          className="hidden md:block px-4 py-1 bg-orange-500 text-white cursor-pointer transition  mr-2"
        >
          Buy Now
        </button>
        <button
          onClick={handleBuyNow}
          className="md:hidden px-3 py-1 bg-orange-500 text-white cursor-pointer transition  mr-2"
        >
          Buy Now
        </button>

        <button
          onClick={handleAddToCart}
          className="cursor-pointer px-2"
          title="Add to Cart"
        >
          <FaCartPlus size={25} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
