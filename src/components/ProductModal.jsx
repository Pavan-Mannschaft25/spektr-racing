// // components/ProductModal.jsx
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// const ProductModal = ({ product, onClose }) => {
//   const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
//   const [selectedColor, setSelectedColor] = useState(product.colors[0]);

//   if (!product) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//       >
//         <motion.div
//           className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="relative">
//             <button
//               className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white"
//               onClick={onClose}
//             >
//               <IoClose size={24} />
//             </button>

//             <div className="grid md:grid-cols-2 gap-8 p-8">
//               {/* Product Image */}
//               <div className="relative h-96 md:h-full bg-gray-800 rounded-lg overflow-hidden">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover"
//                 />
//                 {/* In a real app, you would implement Three.js 3D viewer here */}
//               </div>

//               {/* Product Details */}
//               <div className="flex flex-col">
//                 <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
//                 <p className="text-red-600 text-2xl font-bold mb-4">
//                   ${product.price}
//                 </p>
//                 <p className="text-gray-400 mb-6">{product.description}</p>

//                 {/* Size Selector */}
//                 <div className="mb-6">
//                   <h3 className="text-lg font-semibold mb-3">Size</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {product.sizes.map((size) => (
//                       <button
//                         key={size}
//                         className={`px-4 py-2 border ${
//                           selectedSize === size
//                             ? "border-red-600 bg-red-600/20 text-white"
//                             : "border-gray-700 text-gray-400"
//                         } rounded-md transition-colors`}
//                         onClick={() => setSelectedSize(size)}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Color Selector */}
//                 <div className="mb-8">
//                   <h3 className="text-lg font-semibold mb-3">Color</h3>
//                   <div className="flex gap-2">
//                     {product.colors.map((color) => (
//                       <button
//                         key={color}
//                         className={`w-10 h-10 rounded-full border-2 ${
//                           selectedColor === color
//                             ? "border-white"
//                             : "border-gray-700"
//                         }`}
//                         style={{ backgroundColor: color }}
//                         onClick={() => setSelectedColor(color)}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Add to Cart Button */}
//                 <motion.button
//                   className="px-6 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors mt-auto"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Add to Cart
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default ProductModal;

// components/ProductModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdZoomIn } from "react-icons/md";

import {
  FaMotorcycle,
  FaTachometerAlt,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

const ProductModal = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const controls = useAnimation();
  const containerRef = useRef(null);

  // Simulate 360-degree view with multiple angles
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  // Auto-rotate effect
  useEffect(() => {
    if (isAutoRotating) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating, productImages.length]);

  // Handle manual rotation
  const handleManualRotation = (direction) => {
    setIsAutoRotating(false);
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + productImages.length) % productImages.length,
      );
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={containerRef}
          className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-800"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: 0.4, type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Premium Header */}
          <div className="relative bg-gradient-to-r from-red-600/20 to-orange-600/20 p-6 border-b border-gray-800">
            <button
              className="absolute top-6 right-6 z-10 p-2 bg-black/60 backdrop-blur rounded-full text-white hover:bg-black/80 transition-colors"
              onClick={onClose}
            >
              <IoClose size={24} />
            </button>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-600/20 rounded-lg">
                <FaMotorcycle className="text-3xl text-red-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-wide">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < 4 ? "" : "opacity-50"} />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">
                    (4.8) • 324 Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* 360° Product Viewer */}
            <div className="relative bg-black p-8 flex items-center justify-center">
              {/* Circular rotation indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-medium">
                  360° VIEW
                </span>
              </div>

              {/* Main product image with rotation effect */}
              <div className="relative w-80 h-80">
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotate: isAutoRotating ? 360 : 0 }}
                  transition={{
                    duration: 2,
                    repeat: isAutoRotating ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <img
                    src={productImages[currentImageIndex]}
                    alt={`${product.name} - View ${currentImageIndex + 1}`}
                    className={`w-full h-full object-contain rounded-xl transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
                  />
                </motion.div>

                {/* Rotation controls */}
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/70 backdrop-blur rounded-full text-white hover:bg-black/90 transition-colors"
                  onClick={() => handleManualRotation("prev")}
                >
                  <IoChevronBack size={20} />
                </button>

                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/70 backdrop-blur rounded-full text-white hover:bg-black/90 transition-colors"
                  onClick={() => handleManualRotation("next")}
                >
                  <IoChevronForward size={20} />
                </button>

                {/* Zoom control */}
                <button
                  className="absolute bottom-0 right-0 p-2 bg-black/70 backdrop-blur rounded-full text-white hover:bg-black/90 transition-colors"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <MdZoomIn size={20} />
                </button>
              </div>

              {/* Image thumbnails */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-red-500 w-8"
                        : "bg-gray-600"
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsAutoRotating(false);
                    }}
                  />
                ))}
              </div>

              {/* Auto-rotate toggle */}
              <button
                className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isAutoRotating
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
                onClick={() => setIsAutoRotating(!isAutoRotating)}
              >
                {isAutoRotating ? "STOP ROTATION" : "AUTO ROTATE"}
              </button>
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col">
              {/* Price and badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-red-500">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm font-bold">
                  IN STOCK
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-gray-800">
                {["details", "specs", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-3 px-1 font-medium transition-colors capitalize ${
                      activeTab === tab
                        ? "text-red-500 border-b-2 border-red-500"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === "details" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <FaTachometerAlt className="text-red-500" />
                        <span className="text-gray-300">
                          Maximum speed: 180 mph
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaShieldAlt className="text-red-500" />
                        <span className="text-gray-300">
                          Advanced safety features
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "specs" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-500">Engine</span>
                      <span className="text-white font-medium">
                        1000cc V-Twin
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-500">Power</span>
                      <span className="text-white font-medium">150 HP</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-500">Weight</span>
                      <span className="text-white font-medium">220 kg</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div
                          key={review}
                          className="bg-gray-900/50 p-4 rounded-lg"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="text-sm" />
                              ))}
                            </div>
                            <span className="text-gray-400 text-sm">
                              John D.
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            "Amazing performance! Exactly what I needed for the
                            track."
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-white">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-white scale-110 shadow-lg"
                          : "border-gray-700 hover:border-gray-500"
                      }`}
                      style={{ backgroundColor: color }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <motion.button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(220, 38, 38, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaMotorcycle />
                  ADD TO CART
                </motion.button>

                <motion.button
                  className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaStar />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
