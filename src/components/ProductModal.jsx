import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoClose,
  IoHeart,
  IoInformationCircle,
  IoShirt,
  IoColorPalette,
  IoShieldCheckmark,
  IoFlash,
  IoDiamond,
} from "react-icons/io5";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdLocalShipping,
  MdRefresh,
  MdVerified,
} from "react-icons/md";
import { FaAward, FaTruck } from "react-icons/fa";

const ProductModal = ({ product, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsFullscreen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "f" || e.key === "F") setIsFullscreen((p) => !p);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255, 0, 0, 0.3), transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255, 0, 0, 0.3), transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(255, 0, 0, 0.3), transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`relative w-full h-full ${
            isFullscreen
              ? "max-w-8xl max-h-full rounded-none px-4"
              : "max-w-7xl mx-2 sm:mx-4 md:mx-6 lg:mx-8 rounded-2xl sm:rounded-3xl"
          } bg-black/90 backdrop-blur-2xl overflow-hidden shadow-2xl border border-white/10`}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none z-10"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Header */}
          <div className="absolute top-0 right-0 z-50 p-3 sm:p-4 md:p-6 flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-xl border border-white/20"
              >
                <IoClose size={isMobile ? 22 : 26} />
              </motion.button>
            </div>
          </div>

          {/* Main Content Wrapper */}
          <div className="relative font-sans h-full pt-16 sm:pt-20">
            <div className="flex flex-col lg:flex-row h-full">
              {/* --- Left Side: Product Image --- */}
              <div className="relative h-[50vh] lg:h-auto lg:flex-1 flex items-center justify-center overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                {/* Glow behind image */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 bg-red-600/20 rounded-full blur-3xl" />
                </div>

                {/* Product Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative w-full h-full flex items-center justify-center p-8 lg:p-12"
                >
                  <motion.img
                    src={product.image}
                    alt={product.name || "Product Image"}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 0 40px rgba(220, 38, 38, 0.25))",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* NEW Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gradient-to-r from-red-500 to-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold shadow-xl flex items-center gap-2 text-xs sm:text-sm"
                  >
                    NEW
                  </motion.div>
                </motion.div>

                {/* Fullscreen Button */}
                <div className="absolute bottom-4 right-4 hidden lg:flex gap-2 z-40">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFullscreen((p) => !p)}
                    className="p-3 md:p-4 bg-black/70 backdrop-blur-xl rounded-xl sm:rounded-2xl text-gray-400 hover:text-white transition-all shadow-2xl border border-white/20"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? (
                      <MdFullscreenExit size={24} />
                    ) : (
                      <MdFullscreen size={24} />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* --- Right Side: Product Info --- */}
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                  w-full 
                  lg:flex-1
                  bg-black backdrop-blur-2xl 
                  border-l border-white/20 
                  p-4 sm:p-6 md:p-8 overflow-y-auto scroll-hover
                  max-h-[50vh] lg:max-h-full 
                `}
              >
                <div className="space-y-4 sm:space-y-6 md:space-y-8 font-sans">
                  {/* Product Title Section */}
                  <div className="space-y-3 sm:space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
                    >
                      {/* <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl uppercase shadow-lg inline-block w-fit">
                        Limited Edition
                      </span> */}
                      <div className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-lg sm:rounded-xl w-fit">
                        <IoDiamond
                          size={isMobile ? 14 : 18}
                          className="text-white"
                        />
                        <span className="text-white font-bold text-sm sm:text-base">
                          4.9
                        </span>
                        <span className="text-gray-300 text-xs sm:text-sm">
                          (324)
                        </span>
                      </div>
                    </motion.div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl text-white leading-tight font-normal">
                      {product.name || "Premium Product"}
                    </h2>

                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      Experience the perfect blend of luxury and innovation
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="bg-red-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/20">
                    <div className="flex items-end gap-3 sm:gap-4">
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
                      >
                        ${product.price || "299"}
                      </motion.span>
                      {product.originalPrice && (
                        <span className="text-lg sm:text-xl text-gray-300 line-through mb-1">
                          ${product.originalPrice}
                        </span>
                      )}
                      {product.discount && (
                        <span className="px-2 sm:px-3 py-1 bg-black/30 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold mb-2">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-3">
                      <MdVerified
                        className="text-white"
                        size={isMobile ? 16 : 20}
                      />
                      <span className="text-white text-xs sm:text-sm font-medium">
                        Best Price Guaranteed
                      </span>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="bg-gray-800/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700/30">
                    <h3 className="font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 text-lg sm:text-xl">
                      <IoInformationCircle className="text-white" />
                      Product Details
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                      Crafted with precision and attention to detail
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-white mt-0.5">•</span>
                        <span>Handcrafted with premium materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-white mt-0.5">•</span>
                        <span>Limited edition with unique design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-white mt-0.5">•</span>
                        <span>Certified quality and authenticity</span>
                      </li>
                    </ul>
                  </div>

                  {/* Customization Options */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Size Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <p className="text-white font-semibold flex items-center gap-2 text-base sm:text-lg">
                          <IoShirt className="text-white" />
                          Select Size
                        </p>
                        <button className="text-white text-xs sm:text-sm hover:text-red-300">
                          Size Guide
                        </button>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                        {["XS", "S", "M", "L", "XL"].map((size) => (
                          <motion.button
                            key={size}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedSize(size)}
                            className={`py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all text-xs sm:text-sm ${
                              selectedSize === size
                                ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                            }`}
                          >
                            {size}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Color Selection */}
                    <div>
                      <p className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-base sm:text-lg">
                        <IoColorPalette className="text-white" />
                        Choose Color
                      </p>
                      <div className="flex gap-2 sm:gap-3 bg-gray-800/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-700/30">
                        {[
                          { color: "#000000", name: "Black" },
                          { color: "#FFFFFF", name: "White" },
                          { color: "#8B0000", name: "Dark Red" },
                          { color: "#FF0000", name: "Red" },
                          { color: "#FF6B6B", name: "Light Red" },
                        ].map(({ color, name }) => (
                          <motion.button
                            key={color}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedColor(color)}
                            className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all ${
                              selectedColor === color
                                ? "border-red-600 shadow-lg shadow-red-500/50"
                                : "border-gray-600"
                            }`}
                            style={{ backgroundColor: color }}
                            title={name}
                          >
                            {selectedColor === color && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Selection */}
                    <div>
                      <p className="text-white font-semibold mb-1 sm:mb-2 text-base sm:text-lg">
                        Quantity
                      </p>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold border border-gray-700"
                        >
                          -
                        </motion.button>
                        <div className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 rounded-lg sm:rounded-xl bg-gray-900/50 border border-gray-700 flex items-center justify-center">
                          <span className="text-white text-base sm:text-lg md:text-xl font-bold">
                            {quantity}
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold border border-gray-700"
                        >
                          +
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Premium Features */}
                  <div className="space-y-2 sm:space-y-2">
                    {/* <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <FaAward className="text-white" />
                      Premium Benefits
                    </h3> */}
                    <div className="space-y-2 sm:space-y-3">
                      {/* <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg sm:rounded-xl border border-gray-700/30">
                        <FaTruck
                          className="text-white"
                          size={isMobile ? 18 : 24}
                        />
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm sm:text-base">
                            Free Express Delivery
                          </p>
                          <p className="text-gray-400 text-xs sm:text-sm">
                            2-3 business days
                          </p>
                        </div>
                      </div> */}
                      <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg sm:rounded-xl border border-gray-700/30">
                        <IoShieldCheckmark
                          className="text-white"
                          size={isMobile ? 18 : 24}
                        />
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm sm:text-base">
                            2 Year Warranty
                          </p>
                          <p className="text-gray-400 text-xs sm:text-sm">
                            Full coverage included
                          </p>
                        </div>
                      </div>
                      {/* <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg sm:rounded-xl border border-gray-700/30">
                        <MdRefresh
                          className="text-white"
                          size={isMobile ? 18 : 24}
                        />
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm sm:text-base">
                            30-Day Returns
                          </p>
                          <p className="text-gray-400 text-xs sm:text-sm">
                            Hassle-free
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 sm:space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 sm:py-4 md:py-5 bg-red-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 shadow-2xl hover:shadow-red-500/50 transition-all"
                    >
                      <IoFlash size={isMobile ? 20 : 28} />
                      Buy Now
                    </motion.button>
                  </div>

                  {/* Stock Information */}
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-800/30 rounded-lg sm:rounded-xl border border-gray-700/30">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white font-medium text-sm sm:text-base">
                        In Stock
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs sm:text-sm">
                      Only 5 left
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
