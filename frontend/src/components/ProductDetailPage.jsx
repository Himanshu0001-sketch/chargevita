import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/products/${id}`);
        setProduct(data);
        setSelectedImage(data.image); // Default to main image
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };

    fetchProduct();
  }, [id, apiUrl]);

  const handleAddToCart = () => {
    addToCart(product);
    setToast({ message: "Added to Cart!", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout", {
      state: {
        cartItems: [{ ...product, quantity: 1 }],
        totalAmount: product.price,
      },
    });
  };

  if (!product) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="container mx-auto py-15 mt-9 px-5">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-9 right-6 text-green-500 p-7">
          {toast.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <h1 className="md:hidden text-xl font-bold text-gray-800">{product.name}</h1>

        {/* Image + Thumbnails */}
        <div className="flex flex-col items-center">
          <img
            src={`${apiUrl}${selectedImage}`}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg shadow-lg"
          />

          {/* Thumbnail carousel */}
          <div className="flex mt-4 gap-2 overflow-x-auto max-w-full">
            <img
              src={`${apiUrl}${product.image}`}
              alt="Main"
              className="w-20 h-20 object-cover border-2 rounded cursor-pointer"
              onClick={() => setSelectedImage(product.image)}
            />
            {product.gallery?.map((img, idx) => (
              <img
                key={idx}
                src={`${apiUrl}${img}`}
                alt={`Thumbnail ${idx + 1}`}
                className="w-20 h-20 object-cover border-2 rounded cursor-pointer"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="hidden md:block text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="hidden md:block mt-4 text-xl font-semibold text-red-500">
            ₹ {product.price}
          </p>
          <p className="md:hidden text-2xl font-semibold text-red-600">₹ {product.price}</p>

          <h3 className="text-xl font-semibold text-gray-700 mt-4">Product Description :-</h3>
          <p className="mt-2 text-lg text-gray-600">{product.description}</p>
          <ul className="list-disc list-inside text-sm mt-2 text-gray-600">
            {product.features.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>

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
