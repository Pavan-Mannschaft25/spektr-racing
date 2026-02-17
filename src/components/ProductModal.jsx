// // src/components/ProductModal.jsx
// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
// import {
//   Md360,
//   MdViewInAr,
//   MdZoomIn,
//   MdAutoAwesome,
//   MdGesture,
// } from "react-icons/md";
// import {
//   FaHeart,
//   FaShoppingCart,
//   FaStar,
//   FaExpand,
//   FaCompress,
//   FaTruck,
//   FaShieldAlt,
//   FaUndo,
// } from "react-icons/fa";

// import ThreeProductViewer from "./ThreeProductViewer";

// const ProductModal = ({ product, onClose, addToCart }) => {
//   const [viewMode, setViewMode] = useState("360");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAutoRotating, setIsAutoRotating] = useState(true);
//   const [rotationSpeed, setRotationSpeed] = useState(0.5);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [showAddedToCart, setShowAddedToCart] = useState(false);
//   const [keepSceneAlive, setKeepSceneAlive] = useState(false);

//   if (!product) return null;

//   /* ---------- Images ---------- */
//   const productImages = useMemo(() => {
//     const baseImage = product.image;
//     if (!baseImage) {
//       console.warn("No image provided for product");
//       return [];
//     }
//     return Array(8).fill(baseImage);
//   }, [product.image]);

//   // Add debug logging
//   useEffect(() => {
//     console.log("Product Images:", productImages);
//     console.log("Current Image Index:", currentImageIndex);
//   }, [productImages, currentImageIndex]);

//   /* ---------- Keyboard Navigation ---------- */
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowLeft") prevImage();
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "f" || e.key === "F") setIsFullscreen((p) => !p);
//     };
//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, []);

//   /* ---------- Navigation ---------- */
//   const nextImage = () =>
//     setCurrentImageIndex((p) => (p + 1) % productImages.length);

//   const prevImage = () =>
//     setCurrentImageIndex(
//       (p) => (p - 1 + productImages.length) % productImages.length,
//     );

//   /* ---------- Add to Cart ---------- */
//   const handleAddToCart = () => {
//     addToCart({
//       ...product,
//       quantity,
//       size: selectedSize,
//       color: selectedColor,
//     });
//     setShowAddedToCart(true);
//     setTimeout(() => setShowAddedToCart(false), 2000);
//   };

//   /* ---------- View Mode Change ---------- */
//   const handleViewModeChange = (mode) => {
//     setViewMode(mode);
//     setIsAutoRotating(mode === "360");

//     // Keep scene alive when switching away from 360
//     if (mode !== "360") {
//       setKeepSceneAlive(true);
//     } else {
//       setKeepSceneAlive(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//       >
//         <motion.div
//           onClick={(e) => e.stopPropagation()}
//           initial={{ scale: 0.9, y: 50, opacity: 0 }}
//           animate={{ scale: 1, y: 0, opacity: 1 }}
//           exit={{ scale: 0.9, y: 50, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           className={`relative w-full ${
//             isFullscreen ? "h-full max-w-full" : "max-w-7xl"
//           } bg-gradient-to-br from-[#0f0f14] via-[#1a1a24] to-[#0f0f14] rounded-3xl overflow-hidden shadow-2xl border border-white/10`}
//         >
//           {/* ---------- Header ---------- */}
//           {/* <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-pink-900/20"> */}
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 90 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={onClose}
//             className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all"
//           >
//             <IoClose size={24} />
//           </motion.button>
//           {/* </div> */}

//           {/* ---------- VIEWER AREA ---------- */}
//           <div
//             className={`relative ${
//               isFullscreen ? "h-[calc(100vh-280px)]" : "h-[500px]"
//             } bg-gradient-to-br from-[#12121a] via-black to-[#1a1a24] flex items-center justify-center overflow-hidden`}
//           >
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
//               <div
//                 className="absolute inset-0"
//                 style={{
//                   backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
//                                  radial-gradient(circle at 75% 75%, rgba(219, 39, 119, 0.1) 0%, transparent 50%)`,
//                 }}
//               />
//             </div>

//             {/* View Mode Tabs */}
//             <motion.div
//               initial={{ y: -20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="absolute top-6 left-1/2 -translate-x-1/2 z-30"
//             >
//               <div className="flex gap-2 bg-black/60 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl">
//                 {[
//                   { id: "360", icon: Md360, label: "3D View" },
//                   { id: "gallery", icon: MdViewInAr, label: "Gallery" },
//                   { id: "focus", icon: MdZoomIn, label: "Focus" },
//                   { id: "magic", icon: MdAutoAwesome, label: "Magic" },
//                 ].map(({ id, icon: Icon, label }) => (
//                   <motion.button
//                     key={id}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => handleViewModeChange(id)}
//                     className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${
//                       viewMode === id
//                         ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
//                         : "text-gray-400 hover:text-white hover:bg-white/10"
//                     }`}
//                   >
//                     <Icon size={18} />
//                     {label}
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>

//             {/* ---------- CONTENT ---------- */}
//             <div className="relative w-full h-full">
//               {/* Keep Three.js viewer in DOM but hidden when not in 360 view */}
//               <div
//                 className={`absolute inset-0 ${viewMode === "360" ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300`}
//               >
//                 {productImages.length > 0 && (
//                   <ThreeProductViewer
//                     productImages={productImages}
//                     currentImageIndex={currentImageIndex}
//                     isAutoRotating={isAutoRotating}
//                     rotationSpeed={rotationSpeed}
//                   />
//                 )}
//               </div>

//               {/* Other Views */}
//               <AnimatePresence mode="wait">
//                 {viewMode === "gallery" && (
//                   <motion.img
//                     key="gallery"
//                     src={productImages[currentImageIndex] || ""}
//                     className="absolute inset-0 w-full h-full object-contain"
//                     initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
//                     animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                     exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
//                     transition={{ duration: 0.5, ease: "easeInOut" }}
//                     onError={(e) => {
//                       e.target.src =
//                         "https://via.placeholder.com/400x400?text=Image+Not+Found";
//                     }}
//                   />
//                 )}

//                 {viewMode === "focus" && (
//                   <motion.div
//                     key="focus"
//                     className="absolute inset-0 flex items-center justify-center"
//                   >
//                     <motion.img
//                       src={productImages[currentImageIndex] || ""}
//                       className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
//                       animate={{
//                         scale: [1, 1.2, 1],
//                         filter: [
//                           "brightness(1) saturate(1)",
//                           "brightness(1.2) saturate(1.3)",
//                           "brightness(1) saturate(1)",
//                         ],
//                       }}
//                       transition={{
//                         duration: 3,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }}
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/400x400?text=Image+Not+Found";
//                       }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
//                   </motion.div>
//                 )}

//                 {viewMode === "magic" && (
//                   <motion.div
//                     key="magic"
//                     className="absolute inset-0 flex items-center justify-center"
//                   >
//                     {productImages.slice(0, 5).map((image, index) => (
//                       <motion.img
//                         key={index}
//                         src={
//                           image ||
//                           "https://via.placeholder.com/300x150?text=Image+Not+Found"
//                         }
//                         alt=""
//                         className="absolute w-[300px] h-[150px] object-contain rounded-2xl"
//                         initial={{
//                           opacity: 0,
//                           scale: 0.5,
//                           rotate: Math.random() * 360,
//                           x: (index - 2) * 100,
//                           y: (index - 2) * 50,
//                         }}
//                         animate={{
//                           opacity: [0, 0.3, 0.3, 0],
//                           scale: [0.5, 0.8, 0.8, 0.5],
//                           rotate: [
//                             Math.random() * 360,
//                             Math.random() * 360 + 180,
//                           ],
//                           x: [
//                             (index - 2) * 100,
//                             (index - 2) * 50,
//                             (index - 2) * 100,
//                           ],
//                           y: [
//                             (index - 2) * 50,
//                             (index - 2) * 0,
//                             (index - 2) * 50,
//                           ],
//                         }}
//                         transition={{
//                           duration: 4,
//                           delay: index * 0.3,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                         }}
//                         style={{ zIndex: 5 - index }}
//                         onError={(e) => {
//                           e.target.src =
//                             "https://via.placeholder.com/300x150?text=Image+Not+Found";
//                         }}
//                       />
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Gallery Navigation */}
//             {viewMode !== "360" && (
//               <>
//                 <motion.button
//                   initial={{ x: -50, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   whileHover={{ scale: 1.1, x: -5 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={prevImage}
//                   className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/70 backdrop-blur-xl rounded-2xl text-white hover:bg-white/20 transition-all shadow-xl"
//                 >
//                   <IoChevronBack size={28} />
//                 </motion.button>
//                 <motion.button
//                   initial={{ x: 50, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   whileHover={{ scale: 1.1, x: 5 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={nextImage}
//                   className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/70 backdrop-blur-xl rounded-2xl text-white hover:bg-white/20 transition-all shadow-xl"
//                 >
//                   <IoChevronForward size={28} />
//                 </motion.button>
//               </>
//             )}

//             {/* Image Indicators */}
//             {viewMode !== "360" && productImages.length > 0 && (
//               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
//                 {productImages.map((_, index) => (
//                   <motion.button
//                     key={index}
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.8 }}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`h-2 rounded-full transition-all ${
//                       index === currentImageIndex
//                         ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500"
//                         : "w-2 bg-gray-600 hover:bg-gray-500"
//                     }`}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Controls */}
//             <div className="absolute bottom-8 right-8 flex gap-3 z-30">
//               {viewMode === "360" && (
//                 <>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsAutoRotating((p) => !p)}
//                     className={`p-3 rounded-2xl transition-all shadow-xl ${
//                       isAutoRotating
//                         ? "bg-purple-600/20 text-purple-400"
//                         : "bg-black/70 text-gray-400 hover:text-white"
//                     }`}
//                     title={isAutoRotating ? "Stop Rotation" : "Start Rotation"}
//                   >
//                     <MdGesture size={22} />
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() =>
//                       setRotationSpeed(
//                         rotationSpeed === 0.5
//                           ? 1
//                           : rotationSpeed === 1
//                             ? 2
//                             : 0.5,
//                       )
//                     }
//                     className="p-3 bg-black/70 rounded-2xl text-gray-400 hover:text-white transition-all shadow-xl"
//                     title={`Speed: ${rotationSpeed}x`}
//                   >
//                     <span className="text-sm font-bold">{rotationSpeed}x</span>
//                   </motion.button>
//                 </>
//               )}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setIsFullscreen((p) => !p)}
//                 className="p-3 bg-black/70 rounded-2xl text-gray-400 hover:text-white transition-all shadow-xl"
//                 title={isFullscreen ? "Exit Fullscreen" : "Fullscreen (F)"}
//               >
//                 {isFullscreen ? (
//                   <FaCompress size={20} />
//                 ) : (
//                   <FaExpand size={20} />
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default ProductModal;

// src/components/ProductModal.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  IoClose,
  IoChevronBack,
  IoChevronForward,
  IoSparkles,
  IoDiamond,
  IoPricetag,
  IoShirt,
  IoColorPalette,
  IoCube,
  IoImages,
  IoSearch,
  IoHeart,
  IoShareSocial,
  IoCart,
  IoExpand,
  IoContract,
} from "react-icons/io5";
import {
  Md360,
  MdViewInAr,
  MdZoomIn,
  MdAutoAwesome,
  MdGesture,
  MdSpeed,
  MdFullscreen,
  MdFullscreenExit,
  MdInfo,
  MdStar,
  MdLocalShipping,
  MdSecurity,
  MdRefresh,
} from "react-icons/md";
import { FaExpand, FaCompress, FaGem } from "react-icons/fa";

import ThreeProductViewer from "./ThreeProductViewer";

const ProductModal = ({ product, onClose }) => {
  const [viewMode, setViewMode] = useState("360");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const x = useMotionValue(0);
  const backgroundX = useTransform(x, [-100, 0, 100], [20, 0, -20]);

  if (!product) return null;

  /* ---------- Images ---------- */
  const productImages = useMemo(() => {
    const baseImage = product.image;
    if (!baseImage) {
      console.warn("No image provided for product");
      return [];
    }
    return Array(8).fill(baseImage);
  }, [product.image]);

  /* ---------- Keyboard Navigation ---------- */
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "f" || e.key === "F") setIsFullscreen((p) => !p);
      if (e.key === " ") setIsZoomed((p) => !p);
      if (e.key === "i" || e.key === "I") setShowInfo((p) => !p);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  /* ---------- Navigation ---------- */
  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((p) => (p + 1) % productImages.length);
  };

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex(
      (p) => (p - 1 + productImages.length) % productImages.length,
    );
  };

  const handleAddToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

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
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/50 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,58,255,0.1),transparent_70%)]" />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(120, 58, 255, 0.3), transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255, 58, 120, 0.3), transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(58, 255, 120, 0.3), transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x, backgroundX }}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0, rotateX: -10 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotateX: 10 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5,
          }}
          className={`relative w-full ${
            isFullscreen ? "h-full max-w-full" : "max-w-7xl mx-4"
          } bg-black/50 backdrop-blur-2xl overflow-hidden rounded-3xl shadow-2xl border border-white/10`}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10"
              >
                <IoDiamond className="text-yellow-400" size={20} />
                <span className="text-white font-semibold">
                  Premium Collection
                </span>
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked((p) => !p)}
                className={`p-3 rounded-2xl transition-all backdrop-blur-xl ${
                  isLiked
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                <IoHeart size={22} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-xl border border-white/20"
              >
                <IoShareSocial size={22} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-xl border border-white/20"
              >
                <IoClose size={26} />
              </motion.button>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`relative ${isFullscreen ? "h-screen" : "h-[90vh]"} pt-20`}
          >
            {/* Left Side - Product Viewer */}
            <div className="relative h-full flex items-center justify-center">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* View Mode Selector */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 z-40"
              >
                <div className="flex gap-2 bg-black/60 backdrop-blur-2xl p-1.5 rounded-3xl border border-white/20 shadow-2xl">
                  {[
                    {
                      id: "360",
                      icon: Md360,
                      label: "3D View",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      id: "gallery",
                      icon: IoImages,
                      label: "Gallery",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      id: "focus",
                      icon: IoSearch,
                      label: "Zoom",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      id: "magic",
                      icon: IoSparkles,
                      label: "Magic",
                      color: "from-yellow-500 to-orange-500",
                    },
                  ].map(({ id, icon: Icon, label, color }) => (
                    <motion.button
                      key={id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode(id)}
                      className={`relative px-5 py-3 rounded-2xl flex items-center gap-2 text-sm font-semibold transition-all overflow-hidden ${
                        viewMode === id
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {viewMode === id && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${color}`}
                          layoutId="activeTab"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon size={18} />
                        {label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Product Display Area */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 3D Viewer */}
                <motion.div
                  className={`absolute inset-0 ${viewMode === "360" ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-700`}
                >
                  {productImages.length > 0 && (
                    <ThreeProductViewer
                      productImages={productImages}
                      currentImageIndex={currentImageIndex}
                      isAutoRotating={isAutoRotating}
                      rotationSpeed={rotationSpeed}
                    />
                  )}
                </motion.div>

                {/* Gallery View */}
                <AnimatePresence mode="wait">
                  {viewMode === "gallery" && (
                    <motion.div
                      key="gallery"
                      className="relative w-full h-full flex items-center justify-center p-12"
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      >
                        {!imageLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
                            />
                          </div>
                        )}
                        <motion.img
                          src={productImages[currentImageIndex] || ""}
                          onLoad={() => setImageLoaded(true)}
                          className={`max-w-full max-h-[70vh] object-contain rounded-3xl shadow-2xl transition-opacity duration-500 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          style={{
                            filter:
                              "drop-shadow(0 25px 50px rgba(120, 58, 255, 0.3))",
                          }}
                          initial={{ opacity: 0, scale: 0.8, y: 50 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -50 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/800x600?text=Image+Not+Found";
                          }}
                        />
                        {/* Floating Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-2xl font-bold shadow-xl flex items-center gap-2"
                        >
                          <FaGem size={16} />
                          NEW
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Focus View */}
                  {viewMode === "focus" && (
                    <motion.div
                      key="focus"
                      className="relative w-full h-full flex items-center justify-center p-8"
                      onClick={() => setIsZoomed((p) => !p)}
                      style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
                    >
                      <motion.img
                        src={productImages[currentImageIndex] || ""}
                        className={`max-w-full max-h-full object-contain rounded-3xl shadow-2xl transition-transform duration-500 ${
                          isZoomed ? "scale-150" : "scale-100"
                        }`}
                        animate={{
                          scale: isZoomed ? [1, 1.5, 1.5] : [1, 1.05, 1],
                          filter: [
                            "brightness(1) saturate(1) contrast(1)",
                            "brightness(1.1) saturate(1.2) contrast(1.1)",
                            "brightness(1) saturate(1) contrast(1)",
                          ],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/800x600?text=Image+Not+Found";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      {isZoomed && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-2xl text-white font-semibold"
                        >
                          Click to zoom out
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Magic View */}
                  {viewMode === "magic" && (
                    <motion.div
                      key="magic"
                      className="relative w-full h-full flex items-center justify-center p-8"
                    >
                      {productImages.slice(0, 8).map((image, index) => (
                        <motion.img
                          key={index}
                          src={image || ""}
                          alt=""
                          className="absolute max-w-[350px] max-h-[250px] object-contain rounded-2xl drop-shadow-2xl"
                          initial={{
                            opacity: 0,
                            scale: 0.2,
                            rotate: Math.random() * 360,
                            x: (index - 3.5) * 120,
                            y: (index - 3.5) * 60,
                          }}
                          animate={{
                            opacity: [0, 0.7, 0.7, 0],
                            scale: [0.2, 0.9, 0.9, 0.2],
                            rotate: [
                              Math.random() * 360,
                              Math.random() * 360 + 180,
                            ],
                            x: [
                              (index - 3.5) * 120,
                              (index - 3.5) * 60,
                              (index - 3.5) * 120,
                            ],
                            y: [
                              (index - 3.5) * 60,
                              (index - 3.5) * 0,
                              (index - 3.5) * 60,
                            ],
                          }}
                          transition={{
                            duration: 6,
                            delay: index * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{ zIndex: 10 - index }}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/350x250?text=Image+Not+Found";
                          }}
                        />
                      ))}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute text-6xl"
                      >
                        ✨
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              {viewMode !== "360" && viewMode !== "magic" && (
                <>
                  <motion.button
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.1, x: -10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-xl rounded-3xl text-white shadow-2xl border border-white/20 hover:shadow-purple-500/50 transition-all"
                  >
                    <IoChevronBack size={36} />
                  </motion.button>
                  <motion.button
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.1, x: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-xl rounded-3xl text-white shadow-2xl border border-white/20 hover:shadow-purple-500/50 transition-all"
                  >
                    <IoChevronForward size={36} />
                  </motion.button>
                </>
              )}

              {/* Image Indicators */}
              {viewMode !== "360" &&
                viewMode !== "magic" &&
                productImages.length > 0 && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-40">
                    {productImages.map((_, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "w-12 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
                            : "w-2 bg-gray-600 hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                )}

              {/* Controls */}
              <div className="absolute bottom-12 right-12 flex gap-3 z-40">
                {viewMode === "360" && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsAutoRotating((p) => !p)}
                      className={`p-4 rounded-2xl transition-all shadow-2xl backdrop-blur-xl border ${
                        isAutoRotating
                          ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-400 border-purple-500/50"
                          : "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-400 border-purple-500/50"
                      }`}
                      title={
                        isAutoRotating ? "Stop Rotation" : "Start Rotation"
                      }
                    >
                      <MdGesture size={26} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setRotationSpeed(
                          rotationSpeed === 0.5
                            ? 1
                            : rotationSpeed === 1
                              ? 2
                              : 0.5,
                        )
                      }
                      className="p-4 bg-black/70 backdrop-blur-xl rounded-2xl text-gray-400 hover:text-white transition-all shadow-2xl border border-white/20"
                      title={`Speed: ${rotationSpeed}x`}
                    >
                      <MdSpeed size={26} />
                    </motion.button>
                  </>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFullscreen((p) => !p)}
                  className="p-4 bg-black/70 backdrop-blur-xl rounded-2xl text-gray-400 hover:text-white transition-all shadow-2xl border border-white/20"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <MdFullscreenExit size={26} />
                  ) : (
                    <MdFullscreen size={26} />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Right Side - Product Info */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 400, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute right-0 top-0 bottom-0 w-[420px] bg-black/80 backdrop-blur-2xl border-l border-white/10 p-8 overflow-y-auto"
                >
                  <div className="space-y-6">
                    {/* Product Title */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-2"
                      >
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-xl uppercase">
                          Limited Edition
                        </span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <MdStar size={16} fill="currentColor" />
                          <span className="text-sm font-semibold">4.9</span>
                        </div>
                      </motion.div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {product.name || "Premium Product"}
                      </h2>
                      <p className="text-gray-400">
                        Experience the perfect blend of luxury and innovation
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                      >
                        ${product.price || "299"}
                      </motion.span>
                      {product.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      {product.discount && (
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-xl text-sm font-medium">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                          <IoShirt />
                          Size
                        </p>
                        <div className="flex gap-2">
                          {["XS", "S", "M", "L", "XL"].map((size) => (
                            <motion.button
                              key={size}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                selectedSize === size
                                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                              }`}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                          <IoColorPalette />
                          Color
                        </p>
                        <div className="flex gap-2">
                          {[
                            "#000000",
                            "#FFFFFF",
                            "#FF0000",
                            "#0000FF",
                            "#00FF00",
                          ].map((color) => (
                            <motion.button
                              key={color}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedColor(color)}
                              className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                                selectedColor === color
                                  ? "border-purple-400 shadow-lg shadow-purple-400/50"
                                  : "border-gray-600 hover:border-gray-500"
                              }`}
                              style={{ backgroundColor: color }}
                            >
                              {selectedColor === color && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-3 h-3 bg-white rounded-full" />
                                </div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 mb-3">Quantity</p>
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            className="w-12 h-12 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center text-xl font-bold"
                          >
                            -
                          </motion.button>
                          <span className="w-16 text-center text-white text-xl font-semibold">
                            {quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-12 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center text-xl font-bold"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <MdLocalShipping className="text-green-400" size={20} />
                        <span>Free Express Delivery</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <MdSecurity className="text-blue-400" size={20} />
                        <span>2 Year Premium Warranty</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <MdRefresh className="text-orange-400" size={20} />
                        <span>30-Day Hassle-Free Returns</span>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-purple-500/25 transition-all"
                    >
                      <IoCart size={24} />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowInfo((p) => !p)}
              className={`absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-2xl transition-all shadow-2xl backdrop-blur-xl border ${
                showInfo
                  ? "bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white"
                  : "bg-black/70 text-gray-400 hover:text-white border-white/20"
              }`}
            >
              <MdInfo size={26} />
            </motion.button>
          </div>

          {/* Added to Cart Notification */}
          <AnimatePresence>
            {showAddedToCart && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-2xl flex items-center gap-3"
              >
                <IoCart size={24} />
                <span className="font-bold text-lg">
                  Added to Cart Successfully!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
