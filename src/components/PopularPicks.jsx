// components/PopularPicks.jsx
import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import {
  FaMotorcycle,
  FaTrophy,
  FaFire,
  FaFlagCheckered,
  FaMedal,
} from "react-icons/fa";

const PopularPicks = ({ products, openProductModal }) => {
  const featuredProducts = products.slice(0, 4);

  // Premium racing color palette
  const racingColors = {
    primary: "#DC2626", // Rich red
    secondary: "#0F0F0F", // Deep black
    accent: "#F59E0B", // Amber gold
    text: "#FFFFFF", // Pure white
    highlight: "#1F2937", // Gray highlight
  };

  return (
    <section id="store" className="py-4 px-4 relative overflow-hidden bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Animated speed lines */}
        <motion.div
          className="absolute top-20 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        <motion.div
          className="absolute top-40 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-10"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        ></motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-16 left-16 text-6xl opacity-10"
        animate={{
          rotate: 360,
          y: [0, -10, 0],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <FaMotorcycle style={{ color: racingColors.primary }} />
      </motion.div>

      <motion.div
        className="absolute bottom-16 right-16 text-6xl opacity-10"
        animate={{
          rotate: -360,
          y: [0, 10, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <FaTrophy style={{ color: racingColors.accent }} />
      </motion.div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Premium header section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative top elements */}
          {/* <div className="flex justify-center items-center mb-6">
            <motion.div
              className="h-0.5 w-20 bg-gradient-to-r from-transparent to-red-600"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>

            <FaMedal className="mx-4 text-3xl text-amber-500" />

            <motion.div
              className="h-0.5 w-20 bg-gradient-to-l from-transparent to-red-600"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
          </div> */}

          {/* Main title with enhanced styling */}
          {/* <motion.div
            className="flex justify-start items-center mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FaFire className="text-4xl mr-4 text-red-500" />
            <h2 className="text-5xl md:text-6xl font-black tracking-wider text-white">
              POPULAR
              <span className="text-red-500 ml-2">PICKS</span>
            </h2>
            <FaFire className="text-4xl ml-4 text-red-500" />
          </motion.div> */}

          <motion.div
            className="flex items-center justify-between mb-6 w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* LEFT: Heading */}
            <div className="flex items-center">
              <FaFire className="text-2xl md:text-3xl text-red-500" />
              <h2 className="text-xl md:text-3xl font-black tracking-wider text-white">
                POPULAR
                <span className="text-red-500 ml-2">PICKS</span>
              </h2>
              <FaFire className="text-xl md:text-3xl ml-1 text-red-500" />
            </div>

            {/* RIGHT: Shop Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-flex px-2 md:px-4 py-2 bg-red-600 text-white font-medium tracking-wide rounded-full
               hover:bg-red-700 transition-all shadow-lg"
            >
              SHOP NOW
            </motion.button>
          </motion.div>

          {/* Subtitle with animation */}
          {/* <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Elite racing gear selected by champions for those who demand victory
            on every track
          </motion.p> */}

          {/* Racing line decoration */}
          {/* <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center">
              <div className="h-1 w-16 bg-red-600"></div>
              <div className="h-2 w-2 bg-white rounded-full mx-2"></div>
              <div className="h-1 w-16 bg-red-600"></div>
            </div>
          </motion.div> */}
        </motion.div>

        {/* Product grid with enhanced spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Premium CTA section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-extralight text-sm md:text-md rounded-full flex items-center mx-auto shadow-2xl"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(220, 38, 38, 0.4)",
              background: "linear-gradient(to right, #ef4444, #dc2626)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            EXPLORE FULL COLLECTION
            <FaMotorcycle className="ml-3 text-xl" />
          </motion.button>

          {/* Racing flag decoration */}
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-2 text-gray-600">
              <FaFlagCheckered className="text-2xl" />
              <span className="text-sm font-medium">RACING APPROVED</span>
              <FaFlagCheckered className="text-2xl" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularPicks;
