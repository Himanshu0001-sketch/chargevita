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
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const found = products.find((p) => p.slug === slug);
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
      if (found.offer?.endsIn) {
        const [hh = 0, mm = 0, ss = 0] = found.offer.endsIn
          .split(":")
          .map((x) => parseInt(x, 10));
        setTimeLeft(hh * 3600 + mm * 60 + ss);
      }
    }
  }, [slug]);

  useEffect(() => {
    if (timeLeft === null) return;
    const interval = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    return h > 0
      ? `${String(h).padStart(2, "0")}:${mm}:${ss}`
      : `${mm}:${ss}`;
  };

  const handleAddToCart = () => {
    const buy = product.offer?.buy || 1;
    const free = product.offer?.free || 0;
    addToCart(product, buy + free);
    if (product.slug === "clear-skin-gummies") {
      const ice = products.find((p) => p.slug === "ice-roller");
      if (ice) addToCart({ ...ice, price: 0 }, 1);
    }
    setShowCartSidebar(true);
    setToast({ message: `✅ Added (${buy} + ${free} Free) to Cart!` });
    setTimeout(() => setToast(null), 3000);
  };

  const handleBuyNow = () => {
    const buy = product.offer?.buy || 1;
    const free = product.offer?.free || 0;
    addToCart(product, buy + free);
    if (product.slug === "clear-skin-gummies") {
      const ice = products.find((p) => p.slug === "ice-roller");
      if (ice) addToCart({ ...ice, price: 0 }, 1);
    }
    setShowCartSidebar(true);
    navigate("/checkout", {
      state: {
        cartItems: [{ ...product, quantity: buy + free }],
        totalAmount: product.price * buy,
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg shadow-lg"
            />
            <div className="flex space-x-2 overflow-x-auto">
              {[product.image, ...product.gallery].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name}-${idx}`}
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

          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-2xl font-semibold text-red-500">
                ₹ {product.price}
              </p>

              {product.offer && (
                <div className="flex items-center bg-yellow-50 border-l-8 border-yellow-400 p-4 rounded-lg shadow-md">
                  <FaGift className="text-yellow-500 text-6xl mr-6 animate-bounce" />
                  <div>
                    <p className="text-lg font-bold text-yellow-800">
                      {product.offer.title}
                    </p>
                    <p className="text-xl font-semibold text-yellow-900">
                      {product.offer.subtitle}
                    </p>
                    {timeLeft > 0 ? (
                      <p className="mt-1 text-sm text-red-600">
                        Offer ends in{' '}
                        <span className="font-mono font-bold text-red-700">
                          {formatTime(timeLeft)}
                        </span>
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-gray-500">Offer expired</p>
                    )}
                  </div>
                </div>
              )}

              <img
                src={imageone}
                alt=""
                className="md:w-1/2 w-full h-20 rounded-lg"
              />

              <div>
                <h3 className="text-xl font-semibold mb-3">Key Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {product.keyHighlights.map((kh, idx) => (
                    <div
                      key={idx}
                      className="border-b border-gray-200 pb-4"
                    >
                      <p className="text-sm text-gray-500">{kh.label}</p>
                      <p className="mt-1 font-medium text-gray-900">
                        {kh.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  className="w-full md:w-1/3 h-72 object-contain rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        <TestimonialSection />

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-4">
            What to Expect?
          </h2>
          <img
            src={product.photo[0]}
            alt="What to Expect"
            className="w-full rounded-lg shadow"
          />
        </div>
      </div>

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
