import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-gray-400 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full">
      {/* Product Image */}
      <div className="w-full md:h-56 h-55 overflow-hidden rounded-xl">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full h-50 md:h-full md:object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className=" flex-1">
         <p className=" text-lg  text-red-600 mb-2">
          ₹{product.price}
        </p>
        <h3 className="text-md font-semibold text-gray-800  line-clamp-2">
          {product.name}
        </h3>
      
       
      </div>

      {/* Buttons */}
      <div className="flex justify-between  mt-3">
       
        <button
          onClick={handleViewDetails}
          className="hidden md:block px-2 py-1  bg-orange-500 text-white cursor-pointer  transition"
        >
          View Details
        </button>

         <button
          onClick={handleViewDetails}
          className="md:hidden px-2  py-1  bg-orange-500 text-white cursor-pointer  transition"
        >
          View more
        </button>
         <button
          onClick={handleAddToCart}
          className=" cursor-pointer  "
        >
          <FaCartPlus size={25}/>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
