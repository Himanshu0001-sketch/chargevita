import React from "react";
import ProductCard from "./ProductCard";
import products from "../data/products.json"; // ✅ Import local JSON

const ProductList = () => {
  return (
    <>
      {/* Section Heading for Mobile */}
      <h1 className="block md:hidden px-4 text-2xl font-semibold text-gray-600 mt-4 mb-2">
        Some Top Products
      </h1>

      {/* Product Grid */}
      <section className="w-full px-2 md:px-12 lg:px-20 xl:px-32 py-6">
        {/* Section Heading for Desktop */}
        <h1 className="hidden md:block text-xl font-semibold text-gray-600 mb-6 uppercase">
          Some Top Products
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} /> // ✅ use `id`
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductList;
