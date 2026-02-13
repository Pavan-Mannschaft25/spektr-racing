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

const ProductModal = ({ product, onClose, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);
  const productRef = useRef(null);

  // Auto-rotate effect
  useEffect(() => {
    if (isAutoRotating && !isDragging) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 2) % 360);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating, isDragging]);

  // Handle manual rotation
  const handleManualRotation = (direction) => {
    setIsAutoRotating(false);
    if (direction === "next") {
      setRotation((prev) => (prev + 30) % 360);
    } else {
      setRotation((prev) => (prev - 30 + 360) % 360);
    }
  };

  // Handle drag to rotate
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotation((prev) => (prev + deltaX) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsAutoRotating(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    setRotation((prev) => (prev + deltaX) % 360);
    setStartX(e.touches[0].clientX);
  };

  const handleAddToCart = () => {
    addToCart(product, { size: selectedSize, color: selectedColor });
    onClose();
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
            {/* 3D Product Viewer */}
            <div className="relative bg-black p-8 flex items-center justify-center overflow-hidden">
              {/* Circular rotation indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-2 rounded-full">
                <div
                  className={`w-2 h-2 rounded-full ${isAutoRotating ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
                ></div>
                <span className="text-white text-xs font-medium">
                  {isAutoRotating ? "AUTO ROTATING" : "MANUAL CONTROL"}
                </span>
              </div>

              {/* 3D Product Container */}
              <div
                className="relative w-80 h-80 perspective-1000 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                <div
                  ref={productRef}
                  className="w-full h-full relative transform-style-3d transition-transform duration-100"
                  style={{
                    transform: `rotateY(${rotation}deg) ${isZoomed ? "scale(1.5)" : "scale(1)"}`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Create 8 sides for the 3D effect */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                    <div
                      key={index}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(150px)`,
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={`${product.name} - View ${index + 1}`}
                        className="w-full h-full object-contain rounded-xl"
                        style={{
                          filter: `brightness(${1 - Math.abs(angle - 180) / 500})`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rotation controls */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur rounded-full text-white hover:bg-black/90 transition-colors"
                onClick={() => handleManualRotation("prev")}
              >
                <IoChevronBack size={20} />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur rounded-full text-white hover:bg-black/90 transition-colors"
                onClick={() => handleManualRotation("next")}
              >
                <IoChevronForward size={20} />
              </button>

              {/* Zoom control */}
              <button
                className="absolute bottom-4 right-4 p-3 bg-black/70 backdrop-blur rounded-full text-white hover:bg-black/90 transition-colors"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <MdZoomIn size={20} />
              </button>

              {/* Auto-rotate toggle */}
              <button
                className={`absolute bottom-4 left-4 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
                      {product.description ||
                        "Experience the pinnacle of racing performance with our elite gear. Engineered for champions who demand nothing but the best on every track."}
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
                      <span className="text-gray-500">Material</span>
                      <span className="text-white font-medium">
                        Carbon Fiber Composite
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-500">Weight</span>
                      <span className="text-white font-medium">1.2 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-500">Certification</span>
                      <span className="text-white font-medium">
                        FIA Approved
                      </span>
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
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
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
                  {["Black", "White", "Red", "Blue"].map((color) => (
                    <motion.button
                      key={color}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedColor === color
                          ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </motion.button>
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
                  onClick={handleAddToCart}
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
