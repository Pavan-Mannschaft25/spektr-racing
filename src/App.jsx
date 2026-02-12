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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header isScrolled={isScrolled} />
      <Hero />
      <PopularPicks products={products} openProductModal={openProductModal} />
      <RacingVideos />
      <Categories products={products} openProductModal={openProductModal} />
      <InstagramFlow />
      <Contact />
      <Footer />

      <AnimatePresence>
        {isModalOpen && (
          <ProductModal product={selectedProduct} onClose={closeProductModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
