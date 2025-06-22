import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Assuming you have CartContext set up
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Accessing addToCart function from CartContext
  const navigate = useNavigate(); // To navigate the user to the checkout page

  // State for the toast notification
  const [toast, setToast] = useState(null);

  // Get the base API URL from the environment variable
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch product details based on the ID from URL
  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Trying to fetch:", `${apiUrl}/api/products/${id}`);

      try {
        const { data } = await axios.get(`${apiUrl}/api/products/${id}`); // Use apiUrl from .env
        setProduct(data); // Set the product data in state
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };

    fetchProduct();
  }, [id, apiUrl]);

  if (!product) return <p className="text-center text-lg font-semibold">Loading...</p>;

  // Handle Add to Cart functionality
  const handleAddToCart = () => {
    addToCart(product); // Add the current product to the cart
    setToast({ message: "Added to Cart!", type: "success" }); // Display success message
    setTimeout(() => setToast(null), 3000); // Hide the toast after 3 seconds
  };

  // Handle Buy Now functionality
  const handleBuyNow = () => {
    addToCart(product); // Add product to cart
    navigate("/checkout", {
  state: {
    cartItems: [{ ...product, quantity: 1 }],
    totalAmount: product.price,
  },
});
 // Navigate to checkout page with the selected product
  };

  return (
    <div className="container mx-auto py-15 mt-9 px-5">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-9 right-6 text-green-500 p-7 ">
          {toast.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <h1 className="md:hidden text-xl font-bold text-gray-800">{product.name}</h1>
        {/* Product Image */}
        <div className="flex justify-center ">
          <img
            src={`${apiUrl}${product.image}`}  // Dynamically use the base API URL from .env
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg shadow-lg"
          />
        </div>
        <p className="md:hidden text-2xl font-semibold text-red-600">₹ {product.price}</p>
       
 
        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="hidden md:block text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="hidden md:block mt-4 text-xl font-semibold text-red-500">₹ {product.price}</p>
           <h3 className="text-xl font-semibold text-gray-700">Product Description :-</h3>
          <p className="mt-2 text-lg text-gray-600">{product.description}</p>
          <ul className="list-disc list-inside text-sm mt-2 text-gray-600">
            {product.features.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
         
          {/* Add to Cart and Buy Now Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-white py-2 px-6 transition duration-300 cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-orange-500 text-white py-2 px-6 transition duration-300 cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ProductDetailPage;
