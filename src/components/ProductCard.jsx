// components/ProductCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiShoppingCart, FiHeart, FiZap } from "react-icons/fi";
import { FaStar, FaTrophy } from "react-icons/fa";
import logo from "../assets/images/black-logo.png";

const ProductCard = ({ product, index, openProductModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card with premium styling */}
      <div className="relative bg-black overflow-hidden shadow-2xl font-sans border border-gray-900">
        {/* Animated white border on hover */}
        {/* Hover background image + white border */}
        {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
          
          <div className="absolute inset-0 bg-black/40" />

          
          <div className="absolute inset-0 border-2 border-white" />
        </div> */}

        {/* Product image with sophisticated hover effect */}
        <div className="relative h-85 overflow-hidden">
          {/* ✅ IMAGE CLICK → PAGE */}
          <Link to={`/product-overview/${product.id}`} state={{ product }}>
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ y: 20 }}
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.7 }}
            />
          </Link>

          {/* ✅ OVERLAY */}
          <motion.div
            className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            {/* ✅ BUTTON (clickable) */}
            <motion.button
              className="px-4 py-2 bg-red-600 text-white flex items-center gap-2 pointer-events-auto"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.stopPropagation();
                openProductModal(product);
              }}
            >
              <FiEye /> Quick View
            </motion.button>
          </motion.div>
        </div>

        {/* Product info with premium styling */}
        <Link to={`/product-overview/${product.id}`} state={{ product }}>
          <div className="p-5 relative z-20 bg-black">
            <div className="flex justify-between items-start mb-3">
              <h3
                className="text-sm md:text-md font-sans font-medium
  leading-tight md:leading-[1.05]
  text-white
  tracking-tight uppercase"
              >
                {product.name}
              </h3>
              {/* <motion.div
              className="flex items-center gap-1 text-yellow-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <FaStar className="text-md" />
              <span className="text-md font-sans">
                {product.rating || "4.8"}
              </span>
            </motion.div> */}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <p className="text-md md:text-lg font-bold font-sans text-white">
                  ${product.price}
                </p>
                {product.originalPrice && (
                  <p className="text-gray-500 line-through text-sm">
                    ${product.originalPrice}
                  </p>
                )}
              </div>

              {product.isFastShipping && (
                <motion.div
                  className="flex items-center gap-1 text-green-500 text-xs font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <FiZap /> Fast Ship
                </motion.div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
