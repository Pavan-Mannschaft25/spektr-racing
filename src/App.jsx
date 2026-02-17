// // App.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import PopularPicks from "./components/PopularPicks";
// import RacingVideos from "./components/RacingVideos";
// import Categories from "./components/Categories";
// import InstagramFlow from "./components/InstagramFlow";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";
// import ProductModal from "./components/ProductModal";
// import { products } from "./data/products";
// import { FaWhatsapp } from "react-icons/fa";
// import VideoHeroSection from "./components/VideoHeroSection";

// function App() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const openProductModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const closeProductModal = () => {
//     setIsModalOpen(false);
//     setTimeout(() => setSelectedProduct(null), 300);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white overflow-x-hidden">
//       <Header isScrolled={isScrolled} />
//       <Hero />
//       <PopularPicks products={products} openProductModal={openProductModal} />
//       <RacingVideos />
//       <Categories products={products} openProductModal={openProductModal} />
//       <InstagramFlow />
//       <Contact />
//       <Footer />
//       <a
//         href="https://wa.me/916305070487"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed bottom-4 right-2 rounded-full shadow-xl px-3 py-3 font-semibold z-100 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white transition"
//       >
//         <FaWhatsapp size={35} />
//       </a>

//       <AnimatePresence>
//         {isModalOpen && (
//           <ProductModal product={selectedProduct} onClose={closeProductModal} />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default App;

// App.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PopularPicks from "./components/PopularPicks";
import RacingVideos from "./components/RacingVideos";
import Categories from "./components/Categories";
import InstagramFlow from "./components/InstagramFlow";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import { products } from "./data/products";
import { FaWhatsapp } from "react-icons/fa";
import VideoHeroSection from "./components/VideoHeroSection";

import logo from "./assets/images/gold-logo.png";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Background logo that appears when scrolling */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={logo}
                alt="Background Logo"
                className="max-w-lg max-h-lg opacity-5 object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header isScrolled={isScrolled} />
      <Hero />
      <PopularPicks products={products} openProductModal={openProductModal} />
      <RacingVideos />
      <Categories products={products} openProductModal={openProductModal} />
      <InstagramFlow />
      <Contact />
      <Footer />
      <a
        href="https://wa.me/916305070487"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 rounded-full shadow-xl px-3 py-3 font-semibold z-100 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white transition"
      >
        <FaWhatsapp size={42} />
      </a>

      <AnimatePresence>
        {isModalOpen && (
          <ProductModal product={selectedProduct} onClose={closeProductModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
