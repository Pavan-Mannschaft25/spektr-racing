// // // pages/Home.jsx
// // import React from "react";
// // import { useLocation } from "react-router-dom";

// // import Header from "../components/Header";
// // import Hero from "../components/Hero";
// // import PopularPicks from "../components/PopularPicks";
// // import RacingVideos from "../components/RacingVideos";
// // import Categories from "../components/Categories";
// // import InstagramFlow from "../components/InstagramFlow";
// // import Contact from "../components/Contact";
// // import Footer from "../components/Footer";
// // import ProductModal from "../components/ProductModal";
// // import { products } from "../data/products";

// // const Home = ({
// //   isScrolled,
// //   openProductModal,
// //   isModalOpen,
// //   selectedProduct,
// //   closeProductModal,
// // }) => {
// //   const location = useLocation();
// //   return (
// //       <>
// //           <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
// //       {/* Background logo that appears when scrolling */}
// //       <AnimatePresence>
// //         {isScrolled && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
// //           >
// //             <div className="relative w-full h-full flex items-center justify-center">
// //               <img
// //                 src={logo}
// //                 alt="Background Logo"
// //                 className="max-w-lg max-h-lg opacity-5 object-contain"
// //               />
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //       {/* <Header isScrolled={isScrolled} /> */}
// //       <Hero key={location.pathname} />
// //       <PopularPicks products={products} openProductModal={openProductModal} />
// //       <RacingVideos />
// //       <Categories products={products} openProductModal={openProductModal} />
// //       <InstagramFlow />
// //       <Contact />
// //       {/* <Footer />
// //       {isModalOpen && (
// //         <ProductModal product={selectedProduct} onClose={closeProductModal} />
// //       )} */}
// //       {/* WhatsApp Button */}
// //       <a
// //         href="https://wa.me/916305070487"
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50 flex items-center justify-center group"
// //       >
// //         <FaWhatsapp
// //           size={24}
// //           className="group-hover:scale-110 transition-transform"
// //         />
// //       </a>

// //       {/* Product Modal Popup */}
// //       <AnimatePresence>
// //         {isModalOpen && (
// //           <ProductModal product={selectedProduct} onClose={closeProductModal} />
// //         )}
// //               </AnimatePresence>
// //               </div>
// //     </>
// //   );
// // };

// // export default Home;

// // pages/Home.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLocation } from "react-router-dom";

// // Import Components
// import Header from "../components/Header";
// import Hero from "../components/Hero";
// import PopularPicks from "../components/PopularPicks";
// import RacingVideos from "../components/RacingVideos";
// import Categories from "../components/Categories";
// import InstagramFlow from "../components/InstagramFlow";
// import Contact from "../components/Contact";
// import Footer from "../components/Footer";
// import ProductModal from "../components/ProductModal";

// // Import Assets and Data
// import { products } from "../data/products";
// import { FaWhatsapp } from "react-icons/fa";
// import logo from "../assets/images/gold-logo.png";

// const Home = () => {
//   const location = useLocation();

//   // State Management for scroll, modal, and selected product
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Effect to handle scroll event and update header background
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Function to open the product modal
//   const openProductModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   // Function to close the product modal
//   const closeProductModal = () => {
//     setIsModalOpen(false);
//     // Delay clearing the product to allow the exit animation to finish
//     setTimeout(() => setSelectedProduct(null), 300);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
//       {/* Background logo that appears when scrolling */}
//       <AnimatePresence>
//         {isScrolled && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
//           >
//             <div className="relative w-full h-full flex items-center justify-center">
//               <img
//                 src={logo}
//                 alt="Background Logo"
//                 className="max-w-lg max-h-lg opacity-5 object-contain"
//               />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header Component */}
//       <Header isScrolled={isScrolled} />

//       {/* Main Page Content */}
//       <main>
//         <Hero key={location.pathname} />
//         <PopularPicks products={products} openProductModal={openProductModal} />
//         <RacingVideos />
//         <Categories products={products} openProductModal={openProductModal} />
//         <InstagramFlow />
//         <Contact />
//       </main>

//       {/* Footer Component */}
//       <Footer />

//       {/* WhatsApp Button */}
//       <a
//         href="https://wa.me/916305070487"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50 flex items-center justify-center group"
//         aria-label="Contact on WhatsApp"
//       >
//         <FaWhatsapp
//           size={24}
//           className="group-hover:scale-110 transition-transform"
//         />
//       </a>

//       {/* Product Modal Popup */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <ProductModal product={selectedProduct} onClose={closeProductModal} />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Home;

// pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// Import Components
import Header from "../components/Header";
import Hero from "../components/Hero";
import PopularPicks from "../components/PopularPicks";
import RacingVideos from "../components/RacingVideos";
import Categories from "../components/Categories";
import InstagramFlow from "../components/InstagramFlow";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ProductModal from "../components/ProductModal";

// Import Assets and Data
import { products } from "../data/products";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/images/gold-logo.png";

const Home = () => {
  const location = useLocation();

  // State Management for scroll, modal, and selected product
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to handle scroll event and update header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to open the product modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Function to close the product modal
  const closeProductModal = () => {
    setIsModalOpen(false);
    // Delay clearing the product to allow the exit animation to finish
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

      {/* Header Component */}
      {/* <Header isScrolled={isScrolled} /> */}

      {/* Main Page Content */}
      <main>
        <Hero key={location.pathname} />
        <PopularPicks products={products} openProductModal={openProductModal} />
        <RacingVideos />
        <Categories products={products} openProductModal={openProductModal} />
        <InstagramFlow />
        <Contact />
      </main>

      {/* Footer Component */}
      {/* <Footer /> */}

      {/* WhatsApp Button - Fixed to remove blue color */}
      <a
        href="https://wa.me/916305070487"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50 flex items-center justify-center group no-underline"
        style={{ color: "white", textDecoration: "none" }}
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp
          size={42}
          className="group-hover:scale-110 transition-transform"
        />
      </a>

      {/* Product Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <ProductModal product={selectedProduct} onClose={closeProductModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
