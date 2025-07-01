// src/components/ProductDetailPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaGift } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import products from "../data/Products.json";
import TestimonialSection from "./TestimonialSection";
import imageone from "../assets/image/badges.webp";
const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { setShowCartSidebar } = useUI();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toast, setToast] = useState(null);

  // countdown state (seconds)
  const [timeLeft, setTimeLeft] = useState(59 * 60);

  // load product by slug
  useEffect(() => {
    const found = products.find((p) => p.slug === slug);
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
    }
  }, [slug]);

  // start countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  // format mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleAddToCart = () => {
    // add 3 items (1 paid + 2 free)
    addToCart(product, 3);
    // open sidebar on both desktop & mobile
    setShowCartSidebar(true);
    setToast({ message: "✅ Added (1 + 2 Free) to Cart!" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, 3);
    setShowCartSidebar(true);
    navigate("/checkout", {
      state: {
        cartItems:   [{ ...product, quantity: 3 }],
        totalAmount: product.price, // only charge one
      },
    });
  };

  return (
    <>
      <div className="container mx-auto py-6 px-5">
        {toast && (
          <div className="fixed top-5 right-5 bg-green-100 text-green-800 p-3 rounded shadow-lg">
            {toast.message}
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PRODUCT IMAGES */}
          <div className="space-y-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg shadow-lg"
            />
            <div className="flex space-x-2 overflow-x-auto">
              {[product.image, ...product.gallery].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name}-${i}`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border-2"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
             <div className="hidden md:flex mt-6 space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-2xl font-semibold text-red-500">₹ {product.price}</p>

              {/* SPECIAL OFFER BANNER */}
              <div className="flex items-center bg-yellow-50 border-l-8 border-yellow-400 p-4 rounded-lg shadow-md">
                <FaGift className="text-yellow-500 text-6xl mr-6 animate-bounce" />
                <div>
                  <p className="text-lg font-bold text-yellow-800">Special Offer</p>
                  <p className="text-xl font-semibold text-yellow-900">Buy 1, Get 2 Free!</p>
                  <p className="mt-1 text-sm text-red-600">
                    Offer ends in{" "}
                    <span className="font-mono font-bold text-red-700">
                      00:{minutes}:{seconds}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <img src={imageone} alt="" className="md:w-1/2 w-full h-25 md:h-20"/>
              </div>
              {/* KEY HIGHLIGHTS */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Key Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {product.keyHighlights.map((kh, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-4 ">
                      <p className="text-sm text-gray-500">{kh.label}</p>
                      <p className="mt-1 font-medium text-gray-900">{kh.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            
            
          </div>
        </div>

        {/* BOTTOM SECTION */}
        {product.bottomSection && (
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold text-center">
              {product.bottomSection.heading}
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              {product.bottomSection.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.bottomSection.heading}-${idx}`}
                  className="w-full md:w-1/3 h-70 object-contain rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        <TestimonialSection />

        {/* WHAT TO EXPECT */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-4">What to Expect?</h2>
          <img
            src={product.photo}
            alt="What to Expect"
            className="w-full rounded-lg shadow"
          />
        </div>
      </div>

      {/* MOBILE CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white p-3 flex shadow-inner">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3"
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

export default ProductDetailPage;
