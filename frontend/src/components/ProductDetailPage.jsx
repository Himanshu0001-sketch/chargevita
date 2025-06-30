import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import products from "../data/Products.json";
import TestimonialSection from "./TestimonialSection";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toast, setToast] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // track which pack is selected (0,1,2)
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);

  useEffect(() => {
    const found = products.find((p) => p.slug === slug);
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
    }
  }, [slug]);

  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  // define the three standard packs
  const packs = [
    { days: 30, mult: 1, badge: "", save: "" },
    { days: 60, mult: 2, badge: "Most Popular", save: "Save 16%" },
    { days: 90, mult: 3, badge: "Best Results", save: "Save 22%" },
  ];

  const handleAddToCart = () => {
    const pack = packs[selectedPackIndex];
    // pass pack.mult as second arg so cartContext adds that many
    addToCart(product, pack.mult);
    setToast({ message: `Added ${pack.days}-Day Pack to Cart!` });
    setTimeout(() => setToast(null), 3000);
  };

  const handleBuyNow = () => {
    const pack = packs[selectedPackIndex];
    addToCart(product, pack.mult);
    navigate("/checkout", {
      state: {
        cartItems: [{ ...product, quantity: pack.mult }],
        totalAmount: product.price * pack.mult,
      },
    });
  };

  return (
    <>
    <div className="container mx-auto py-5 px-5 ">
      {toast && (
        <div className="fixed top-15 right-5 bg-green-100 text-green-800 p-3 rounded shadow">
          {toast.message}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mobile Title */}
        <h1 className="md:hidden text-xl font-bold">{product.name}</h1>

        {/* Image Gallery */}
        <div className="flex flex-col items-center">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg shadow-lg"
          />
          <div className="flex mt-4 gap-2 overflow-x-auto">
            <img
              src={product.image}
              alt="main-thumb"
              className="w-20 h-20 object-cover rounded border-2 cursor-pointer"
              onClick={() => setSelectedImage(product.image)}
            />
            {product.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className="w-20 h-20 object-cover rounded border-2 cursor-pointer"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Details + Packs + Actions */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="hidden md:block text-3xl font-bold">{product.name}</h1>
          <p className="hidden md:block text-2xl font-semibold text-red-500">₹ {product.price}</p>
          <p className="md:hidden text-2xl font-semibold text-red-500">₹ {product.price}</p>

          <h3 className="text-xl font-semibold">Product Description:</h3>
          <p className="text-gray-700">{product.description}</p>

          {/* — Pack Selector */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Pick Your Pack:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {packs.map((pack, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPackIndex(i)}
                  className={`
                    relative p-4 rounded-lg border cursor-pointer
                    ${i === 0 ? "bg-pink-50 border-pink-500" : "bg-gray-100 border-gray-300"}
                    ${i === selectedPackIndex ? "ring-3 ring-orange-400" : ""}
                  `}
                >
                  {pack.badge && (
                    <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1  rounded-full">
                      {pack.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold mt-2">{pack.days} Days Pack</h3>
                  <p className="text-gray-600">{pack.days} gummies</p>
                  <p className="mt-2 font-semibold">Rs. {product.price * pack.mult}</p>
                  {pack.save && <p className="text-xs text-purple-700 mt-1">{pack.save}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:block mt-4 flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section (unchanged) */}
      {product.bottomSection && (
        <div className="mt-12">
          <h2 className="text-2xl text-center font-semibold mb-4">
            {product.bottomSection.heading}
          </h2>
          <div className="container flex flex-col md:flex-row max-w-5xl mx-auto gap-4">
            {product.bottomSection.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.bottomSection.heading} ${idx + 1}`}
                className="w-full h-80 md:object-cover rounded-lg shadow"
              />
            ))}
           
          </div>
          <div className="container max-w-5xl mx-auto mt-5 bg-orange-500 rounded-md p-5 text-white">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* first 3 features */}
  <ul className="list-disc list-inside text-sm space-y-3">
    {product.features.slice(0, 3).map((feature, idx) => (
      <li key={idx}>{feature}</li>
    ))}
  </ul>
  {/* next 3 features */}
  <ul className="list-disc list-inside text-sm space-y-3">
    {product.features.slice(3, 6).map((feature, idx) => (
      <li key={idx + 3}>{feature}</li>
    ))}
  </ul>
</div>
          </div>
        </div>
      )}
      <TestimonialSection/>
      <div className="">
        <h1 className="text-3xl font-bold text-center py-5 text-gray-600">What to Expect ?</h1>
       <img src={product.photo} alt="" className="w-full"/>
      </div>
    </div>
    
  <div className="md:hidden fixed bottom-0 left-0 w-full bg-white p-2 flex space-x-2 shadow-lg">
  <button
    onClick={handleAddToCart}
    className="flex-1 bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600"
  >
    Add to Cart
  </button>
  <button
    onClick={handleBuyNow}
    className="flex-1 bg-orange-500 text-white py-3 rounded hover:bg-orange-600"
  >
    Buy Now
  </button>
</div>


    </>
  );
};

export default ProductDetailPage;
