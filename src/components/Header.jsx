// components/Header.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { GiSteeringWheel, GiCheckeredFlag } from "react-icons/gi";
import logo from "../assets/images/spektr.jpeg";

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Store", href: "#store" },
    { name: "Accessories", href: "#accessories" },
    { name: "Stickers", href: "#stickers" },
    { name: "Racing Clips", href: "#clips" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    setScrolled(isScrolled);
  }, [isScrolled]);

  const logoVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: 360,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl py-3 shadow-2xl shadow-black/50"
            : " py-6 bg-black/20"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1],
          staggerChildren: 0.1,
        }}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-3 group select-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Logo Container */}
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 rounded-xl bg-red-600/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Logo */}
                <div className="relative bg-black rounded-xl p-1 border border-red-600/40">
                  <img
                    src={logo}
                    alt="Spektr Racing"
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>

              {/* Brand Text */}
              <div className="flex flex-col leading-none">
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                  SPEKTR<span className="text-red-600">RACING</span>
                </h1>
                <span className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Built For Speed
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-white font-medium group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.5,
                    type: "spring",
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.div
                    className="absolute inset-0 bg-red-600/20 rounded-lg -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{
                      scale: 1,
                      opacity: 1,
                      transition: { duration: 0.2 },
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"
                    whileHover={{
                      width: "100%",
                      left: 0,
                      transition: { duration: 0.3 },
                    }}
                  />
                </motion.a>
              ))}
            </nav>

            {/* Shop Now Button */}
            <div className="flex items-center gap-4">
              <motion.button
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-600 text-white font-bold rounded-full shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span>Shop Now</span>
                <GiCheckeredFlag className="w-4 h-4" />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                className="relative p-3 xl:hidden text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <FiX key="close" className="text-xl" />
                  ) : (
                    <FiMenu key="menu" className="text-xl" />
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-80 bg-gray-900 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-red-600 to-orange-600 p-2 rounded-xl">
                      <GiSteeringWheel className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-black">RACEX</span>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
              </div>

              <nav className="p-6">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between p-4 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors group"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      <GiCheckeredFlag className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-colors" />
                    </motion.a>
                  ))}
                </div>

                {/* Shop Now Button in Mobile Menu */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                  <motion.button
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Shop Now</span>
                    <GiCheckeredFlag className="w-4 h-4" />
                  </motion.button>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
