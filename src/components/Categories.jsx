// components/Categories.jsx
import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const Categories = ({ products, openProductModal }) => {
  const categories = [
    { name: "Stickers", id: "stickers" },
    { name: "Accessories", id: "accessories" },
    { name: "Gloves", id: "gloves" },
  ];

  return (
    <section
      id="stickers"
      className="py-16 px-4 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="container mx-auto">
        {categories.map((category, categoryIndex) => {
          const categoryProducts = products.filter(
            (p) => p.category === category.id,
          );

          return (
            <div key={category.id} className="mb-16">
              <motion.div
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold">
                  {category.name.toUpperCase()}
                </h2>
                <button className="text-red-600 font-medium hover:underline">
                  View All
                </button>
              </motion.div>

              <div
                className="flex gap-6 overflow-x-auto pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {categoryProducts.map((product, index) => (
                  <div key={product.id} className="flex-shrink-0 w-64">
                    <ProductCard
                      product={product}
                      index={index}
                      // openProductModal={openProductModal}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
