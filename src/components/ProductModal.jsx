// // src/components/ProductModal.jsx
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useTransform,
// } from "framer-motion";
// import {
//   IoClose,
//   IoChevronBack,
//   IoChevronForward,
//   IoSparkles,
//   IoDiamond,
//   IoPricetag,
//   IoShirt,
//   IoColorPalette,
//   IoCube,
//   IoImages,
//   IoSearch,
//   IoHeart,
//   IoShareSocial,
//   IoCart,
//   IoExpand,
//   IoContract,
// } from "react-icons/io5";
// import {
//   Md360,
//   MdViewInAr,
//   MdZoomIn,
//   MdAutoAwesome,
//   MdGesture,
//   MdSpeed,
//   MdFullscreen,
//   MdFullscreenExit,
//   MdInfo,
//   MdStar,
//   MdLocalShipping,
//   MdSecurity,
//   MdRefresh,
// } from "react-icons/md";
// import { FaExpand, FaCompress, FaGem } from "react-icons/fa";

// const ProductModal = ({ product, onClose }) => {
//   const [viewMode, setViewMode] = useState("gallery"); // Changed default to gallery
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isAutoRotating, setIsAutoRotating] = useState(true);
//   const [rotationSpeed, setRotationSpeed] = useState(0.5);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [showInfo, setShowInfo] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("M");
//   const [selectedColor, setSelectedColor] = useState("#000000");
//   const [quantity, setQuantity] = useState(1);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [showAddedToCart, setShowAddedToCart] = useState(false);
//   const [productType, setProductType] = useState("box");
//   const [environment, setEnvironment] = useState("studio");
//   const [showShadows, setShowShadows] = useState(true);
//   const [showReflections, setShowReflections] = useState(true);

//   const x = useMotionValue(0);
//   const backgroundX = useTransform(x, [-100, 0, 100], [20, 0, -20]);

//   if (!product) return null;

//   /* ---------- Different Images for Each View Mode ---------- */
//   const galleryImages = useMemo(() => {
//     // Generate 5 different gallery images
//     return [
//       product.image,
//       product.image,
//       product.image,
//       product.image,
//       product.image,
//     ];
//   }, [product.image]);

//   const zoomImages = useMemo(() => {
//     // Generate 5 different zoom images
//     return [
//       product.image,
//       product.image,
//       product.image,
//       product.image,
//       product.image,
//     ];
//   }, []);

//   const magicImages = useMemo(() => {
//     // Generate 5 different magic images
//     return [
//       product.image,
//       product.image,
//       product.image,
//       product.image,
//       product.image,
//     ];
//   }, []);

//   // Get current images based on view mode
//   const getCurrentImages = () => {
//     switch (viewMode) {
//       case "gallery":
//         return galleryImages;
//       case "focus":
//         return zoomImages;
//       case "magic":
//         return magicImages;
//       default:
//         return galleryImages;
//     }
//   };

//   const currentImages = getCurrentImages();

//   /* ---------- Keyboard Navigation ---------- */
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowLeft") prevImage();
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "f" || e.key === "F") setIsFullscreen((p) => !p);
//       if (e.key === " ") setIsZoomed((p) => !p);
//       if (e.key === "i" || e.key === "I") setShowInfo((p) => !p);
//     };
//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, []);

//   /* ---------- Navigation ---------- */
//   const nextImage = () => {
//     setImageLoaded(false);
//     setCurrentImageIndex((p) => (p + 1) % currentImages.length);
//   };

//   const prevImage = () => {
//     setImageLoaded(false);
//     setCurrentImageIndex(
//       (p) => (p - 1 + currentImages.length) % currentImages.length,
//     );
//   };

//   const handleAddToCart = () => {
//     setShowAddedToCart(true);
//     setTimeout(() => setShowAddedToCart(false), 2000);
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//       >
//         {/* Animated Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/50 to-black">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,58,255,0.1),transparent_70%)]" />
//           <motion.div
//             className="absolute inset-0 opacity-30"
//             animate={{
//               background: [
//                 "radial-gradient(circle at 20% 50%, rgba(120, 58, 255, 0.3), transparent 50%)",
//                 "radial-gradient(circle at 80% 50%, rgba(255, 58, 120, 0.3), transparent 50%)",
//                 "radial-gradient(circle at 50% 80%, rgba(58, 255, 120, 0.3), transparent 50%)",
//               ],
//             }}
//             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//           />
//         </div>

//         <motion.div
//           drag="x"
//           dragConstraints={{ left: 0, right: 0 }}
//           style={{ x, backgroundX }}
//           onClick={(e) => e.stopPropagation()}
//           initial={{ scale: 0.8, opacity: 0, rotateX: -10 }}
//           animate={{ scale: 1, opacity: 1, rotateX: 0 }}
//           exit={{ scale: 0.8, opacity: 0, rotateX: 10 }}
//           transition={{
//             type: "spring",
//             stiffness: 300,
//             damping: 30,
//             duration: 0.5,
//           }}
//           className={`relative w-full ${
//             isFullscreen ? "h-full max-w-full" : "max-w-7xl mx-4"
//           } bg-black/50 backdrop-blur-2xl overflow-hidden rounded-3xl shadow-2xl border border-white/10`}
//         >
//           {/* Shimmer Effect */}
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
//             animate={{ x: ["-100%", "100%"] }}
//             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//           />

//           {/* Header */}
//           <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="flex items-center gap-2 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10"
//               >
//                 <IoDiamond className="text-yellow-400" size={20} />
//                 <span className="text-white font-semibold">
//                   Premium Collection
//                 </span>
//               </motion.div>
//             </div>

//             <div className="flex items-center gap-3">
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: 180 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setIsLiked((p) => !p)}
//                 className={`p-3 rounded-2xl transition-all backdrop-blur-xl ${
//                   isLiked
//                     ? "bg-red-500/20 text-red-400 border border-red-500/30"
//                     : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
//                 }`}
//               >
//                 <IoHeart size={22} />
//               </motion.button>

//               {/* <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-xl border border-white/20"
//               >
//                 <IoShareSocial size={22} />
//               </motion.button> */}

//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: 90 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={onClose}
//                 className="p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-xl border border-white/20"
//               >
//                 <IoClose size={26} />
//               </motion.button>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div
//             className={`relative ${isFullscreen ? "h-screen" : "h-[90vh]"} pt-20`}
//           >
//             {/* Left Side - Product Viewer */}
//             <div className="relative h-full flex items-center justify-center">
//               {/* Background Pattern */}
//               <div className="absolute inset-0 opacity-10">
//                 <div
//                   className="absolute inset-0"
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                   }}
//                 />
//               </div>

//               {/* View Mode Selector */}
//               <motion.div
//                 initial={{ y: -30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="absolute top-0 left-1/2 -translate-x-1/2 z-40"
//               >
//                 <div className="flex gap-2 bg-black/60 backdrop-blur-2xl p-1.5 rounded-3xl border border-white/20 shadow-2xl">
//                   {[
//                     {
//                       id: "gallery",
//                       icon: IoImages,
//                       label: "Gallery",
//                       color: "from-blue-500 to-cyan-500",
//                     },
//                     // {
//                     //   id: "focus",
//                     //   icon: IoSearch,
//                     //   label: "Zoom",
//                     //   color: "from-green-500 to-emerald-500",
//                     // },
//                     // {
//                     //   id: "magic",
//                     //   icon: IoSparkles,
//                     //   label: "Magic",
//                     //   color: "from-yellow-500 to-orange-500",
//                     // },
//                   ].map(({ id, icon: Icon, label, color }) => (
//                     <motion.button
//                       key={id}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => {
//                         setViewMode(id);
//                         setCurrentImageIndex(0); // Reset index when switching views
//                         setImageLoaded(false);
//                       }}
//                       className={`relative px-5 py-3 rounded-2xl flex items-center gap-2 text-sm font-semibold transition-all overflow-hidden ${
//                         viewMode === id
//                           ? "text-white"
//                           : "text-gray-400 hover:text-white"
//                       }`}
//                     >
//                       {viewMode === id && (
//                         <motion.div
//                           className={`absolute inset-0 bg-gradient-to-r ${color}`}
//                           layoutId="activeTab"
//                           transition={{
//                             type: "spring",
//                             bounce: 0.2,
//                             duration: 0.6,
//                           }}
//                         />
//                       )}
//                       <span className="relative z-10 flex items-center gap-2">
//                         <Icon size={18} />
//                         {label}
//                       </span>
//                     </motion.button>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Product Display Area */}
//               <div className="relative w-full h-full flex items-center justify-center">
//                 {/* Gallery View */}
//                 <AnimatePresence mode="wait">
//                   {viewMode === "gallery" && (
//                     <motion.div
//                       key="gallery"
//                       className="relative w-full h-full flex items-center justify-center p-12"
//                     >
//                       <motion.div
//                         className="relative"
//                         whileHover={{ scale: 1.02 }}
//                         transition={{
//                           type: "spring",
//                           stiffness: 400,
//                           damping: 30,
//                         }}
//                       >
//                         {!imageLoaded && (
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <motion.div
//                               animate={{ rotate: 360 }}
//                               transition={{
//                                 duration: 1,
//                                 repeat: Infinity,
//                                 ease: "linear",
//                               }}
//                               className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
//                             />
//                           </div>
//                         )}
//                         <motion.img
//                           src={currentImages[currentImageIndex]}
//                           onLoad={() => setImageLoaded(true)}
//                           className={`max-w-full max-h-[50vh] object-contain rounded-3xl shadow-2xl transition-opacity duration-500 ${
//                             imageLoaded ? "opacity-100" : "opacity-0"
//                           }`}
//                           style={{
//                             filter:
//                               "drop-shadow(0 25px 50px rgba(120, 58, 255, 0.3))",
//                           }}
//                           initial={{ opacity: 0, scale: 0.8, y: 50 }}
//                           animate={{ opacity: 1, scale: 1, y: 0 }}
//                           exit={{ opacity: 0, scale: 0.8, y: -50 }}
//                           transition={{ duration: 0.6, ease: "easeOut" }}
//                         />
//                         {/* Floating Badge */}
//                         <motion.div
//                           initial={{ opacity: 0, scale: 0 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: 0.5, type: "spring" }}
//                           className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-2xl font-bold shadow-xl flex items-center gap-2"
//                         >
//                           <FaGem size={16} />
//                           NEW
//                         </motion.div>
//                       </motion.div>
//                     </motion.div>
//                   )}

//                   {/* Bottom Image Thumbnails */}
//                   {viewMode !== "magic" && (
//                     <motion.div
//                       initial={{ y: 40, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                       className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40"
//                     >
//                       <div className="flex gap-4 px-4 py-2 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
//                         {currentImages.map((img, index) => {
//                           const isActive = index === currentImageIndex;

//                           return (
//                             <motion.button
//                               key={index}
//                               onClick={() => {
//                                 setCurrentImageIndex(index);
//                                 setImageLoaded(false);
//                               }}
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.95 }}
//                               animate={{
//                                 scale: isActive ? 1.15 : 1,
//                                 opacity: isActive ? 1 : 0.6,
//                               }}
//                               transition={{
//                                 type: "spring",
//                                 stiffness: 300,
//                                 damping: 20,
//                               }}
//                               className={`relative rounded-2xl overflow-hidden border ${
//                                 isActive
//                                   ? "border-purple-400 shadow-lg shadow-purple-500/50"
//                                   : "border-white/10"
//                               }`}
//                             >
//                               <img
//                                 src={img}
//                                 alt=""
//                                 className="w-14 h-12 object-contain bg-black/40"
//                               />

//                               {/* Active Glow */}
//                               {isActive && (
//                                 <motion.div
//                                   layoutId="activeThumbnail"
//                                   className="absolute inset-0 ring-2 ring-purple-400 rounded-2xl"
//                                 />
//                               )}
//                             </motion.button>
//                           );
//                         })}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Navigation Arrows */}
//               {viewMode !== "magic" && (
//                 <>
//                   <motion.button
//                     initial={{ x: -100, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     whileHover={{ scale: 1.1, x: -10 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={prevImage}
//                     className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-xl rounded-3xl text-white shadow-2xl border border-white/20 hover:shadow-purple-500/50 transition-all"
//                   >
//                     <IoChevronBack size={20} />
//                   </motion.button>
//                   <motion.button
//                     initial={{ x: 100, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     whileHover={{ scale: 1.1, x: 10 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={nextImage}
//                     className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-xl rounded-3xl text-white shadow-2xl border border-white/20 hover:shadow-purple-500/50 transition-all"
//                   >
//                     <IoChevronForward size={20} />
//                   </motion.button>
//                 </>
//               )}

//               {/* Image Indicators */}
//               {/* {viewMode !== "magic" && currentImages.length > 0 && (
//                 <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-40">
//                   {currentImages.map((_, index) => (
//                     <motion.button
//                       key={index}
//                       whileHover={{ scale: 1.5 }}
//                       whileTap={{ scale: 0.8 }}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className={`h-2 rounded-full transition-all ${
//                         index === currentImageIndex
//                           ? "w-12 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
//                           : "w-2 bg-gray-600 hover:bg-gray-500"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               )} */}

//               {/* Controls */}
//               <div className="absolute bottom-12 right-12 flex gap-3 z-40">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setIsFullscreen((p) => !p)}
//                   className="p-4 bg-black/70 backdrop-blur-xl rounded-2xl text-gray-400 hover:text-white transition-all shadow-2xl border border-white/20"
//                   title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
//                 >
//                   {isFullscreen ? (
//                     <MdFullscreenExit size={26} />
//                   ) : (
//                     <MdFullscreen size={26} />
//                   )}
//                 </motion.button>
//               </div>
//             </div>

//             {/* Right Side - Product Info */}
//             <AnimatePresence>
//               {showInfo && (
//                 <motion.div
//                   initial={{ x: 400, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   exit={{ x: 400, opacity: 0 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   className="absolute right-0 top-0 bottom-0 w-[420px] bg-black/80 backdrop-blur-2xl border-l border-white/10 p-8 overflow-y-auto"
//                 >
//                   <div className="space-y-6">
//                     {/* Product Title */}
//                     <div>
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="flex items-center gap-2 mb-2"
//                       >
//                         <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-xl uppercase">
//                           Limited Edition
//                         </span>
//                         <div className="flex items-center gap-1 text-yellow-400">
//                           <MdStar size={16} fill="currentColor" />
//                           <span className="text-sm font-semibold">4.9</span>
//                         </div>
//                       </motion.div>
//                       <h2 className="text-3xl font-bold text-white mb-2">
//                         {product.name || "Premium Product"}
//                       </h2>
//                       <p className="text-gray-400">
//                         Experience the perfect blend of luxury and innovation
//                       </p>
//                     </div>

//                     {/* Price */}
//                     <div className="flex items-center gap-4">
//                       <motion.span
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
//                       >
//                         ${product.price || "299"}
//                       </motion.span>
//                       {product.originalPrice && (
//                         <span className="text-xl text-gray-500 line-through">
//                           ${product.originalPrice}
//                         </span>
//                       )}
//                       {product.discount && (
//                         <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-xl text-sm font-medium">
//                           -{product.discount}%
//                         </span>
//                       )}
//                     </div>

//                     {/* Options */}
//                     <div className="space-y-4">
//                       <div>
//                         <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
//                           <IoShirt />
//                           Size
//                         </p>
//                         <div className="flex gap-2">
//                           {["XS", "S", "M", "L", "XL"].map((size) => (
//                             <motion.button
//                               key={size}
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => setSelectedSize(size)}
//                               className={`px-4 py-2 rounded-xl font-medium transition-all ${
//                                 selectedSize === size
//                                   ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
//                                   : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                               }`}
//                             >
//                               {size}
//                             </motion.button>
//                           ))}
//                         </div>
//                       </div>

//                       <div>
//                         <p className="text-sm text-gray-400 mb-3">Quantity</p>
//                         <div className="flex items-center gap-3">
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() =>
//                               setQuantity(Math.max(1, quantity - 1))
//                             }
//                             className="w-12 h-12 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center text-xl font-bold"
//                           >
//                             -
//                           </motion.button>
//                           <span className="w-16 text-center text-white text-xl font-semibold">
//                             {quantity}
//                           </span>
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => setQuantity(quantity + 1)}
//                             className="w-12 h-12 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center text-xl font-bold"
//                           >
//                             +
//                           </motion.button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Features */}
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-3 text-sm text-gray-400">
//                         <MdLocalShipping className="text-green-400" size={20} />
//                         <span>Free Express Delivery</span>
//                       </div>
//                       <div className="flex items-center gap-3 text-sm text-gray-400">
//                         <MdSecurity className="text-blue-400" size={20} />
//                         <span>2 Year Premium Warranty</span>
//                       </div>
//                       <div className="flex items-center gap-3 text-sm text-gray-400">
//                         <MdRefresh className="text-orange-400" size={20} />
//                         <span>30-Day Hassle-Free Returns</span>
//                       </div>
//                     </div>

//                     {/* Add to Cart Button */}
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleAddToCart}
//                       className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-purple-500/25 transition-all"
//                     >
//                       <IoCart size={24} />
//                       Shop Now
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Info Toggle Button */}
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setShowInfo((p) => !p)}
//               className={`absolute right-8 top-1/4 -translate-y-1/2 p-4 rounded-2xl transition-all shadow-2xl backdrop-blur-xl border ${
//                 showInfo
//                   ? "bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white"
//                   : "bg-black/70 text-gray-400 hover:text-white border-white/20"
//               }`}
//             >
//               <MdInfo size={26} />
//             </motion.button>
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
  IoStar,
  IoCheckmarkCircle,
  IoInformationCircle,
  IoShieldCheckmark,
  IoRocket,
  IoTime,
  IoGift,
  IoFlash,
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
  MdLocalShipping,
  MdSecurity,
  MdRefresh,
  MdVerified,
} from "react-icons/md";
import { FaExpand, FaCompress, FaGem, FaAward, FaTruck } from "react-icons/fa";

const ProductModal = ({ product, onClose }) => {
  const [viewMode, setViewMode] = useState("gallery");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [productType, setProductType] = useState("box");
  const [environment, setEnvironment] = useState("studio");
  const [showShadows, setShowShadows] = useState(true);
  const [showReflections, setShowReflections] = useState(true);

  const x = useMotionValue(0);
  const backgroundX = useTransform(x, [-100, 0, 100], [20, 0, -20]);

  if (!product) return null;

  /* ---------- Different Images for Each View Mode ---------- */
  const galleryImages = useMemo(() => {
    return [
      product.image,
      product.image,
      product.image,
      product.image,
      product.image,
    ];
  }, [product.image]);

  const zoomImages = useMemo(() => {
    return [
      product.image,
      product.image,
      product.image,
      product.image,
      product.image,
    ];
  }, []);

  const magicImages = useMemo(() => {
    return [
      product.image,
      product.image,
      product.image,
      product.image,
      product.image,
    ];
  }, []);

  const getCurrentImages = () => {
    switch (viewMode) {
      case "gallery":
        return galleryImages;
      case "focus":
        return zoomImages;
      case "magic":
        return magicImages;
      default:
        return galleryImages;
    }
  };

  const currentImages = getCurrentImages();

  /* ---------- Keyboard Navigation ---------- */
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "f" || e.key === "F") setIsFullscreen((p) => !p);
      if (e.key === " ") setIsZoomed((p) => !p);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  /* ---------- Navigation ---------- */
  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((p) => (p + 1) % currentImages.length);
  };

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex(
      (p) => (p - 1 + currentImages.length) % currentImages.length,
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
            isFullscreen ? "h-full max-w-full" : "max-w-8xl mx-4"
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

              {/* <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-xl border border-white/20"
              >
                <IoShareSocial size={22} />
              </motion.button> */}

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
            <div className="flex h-full">
              {/* Left Side - Product Viewer */}
              <div className="relative flex-1 flex items-center justify-center">
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
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-40"
                >
                  <div className="flex gap-2 bg-black/60 backdrop-blur-2xl p-1.5 rounded-3xl border border-white/20 shadow-2xl">
                    {[
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
                        onClick={() => {
                          setViewMode(id);
                          setCurrentImageIndex(0);
                          setImageLoaded(false);
                        }}
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
                            src={currentImages[currentImageIndex]}
                            onLoad={() => setImageLoaded(true)}
                            className={`max-w-full max-h-[50vh] object-contain rounded-3xl shadow-2xl transition-opacity duration-500 ${
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
                        className="relative w-full h-full flex items-center justify-center p-12"
                      >
                        <motion.div
                          className="relative overflow-hidden rounded-3xl"
                          whileHover={{ scale: 1.05 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        >
                          <motion.img
                            src={currentImages[currentImageIndex]}
                            className="max-w-full max-h-[70vh] object-contain"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -50 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold mb-1">
                              Zoom View
                            </h3>
                            <p className="text-sm opacity-80">
                              Scroll to explore details
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Magic View */}
                    {viewMode === "magic" && (
                      <motion.div
                        key="magic"
                        className="relative w-full h-full flex items-center justify-center p-12"
                      >
                        <motion.div
                          className="relative"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <motion.img
                            src={currentImages[currentImageIndex]}
                            className="max-w-full max-h-[60vh] object-contain rounded-3xl shadow-2xl"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -50 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-purple-600/20 to-transparent pointer-events-none" />
                        </motion.div>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center">
                          <h3 className="text-2xl font-bold mb-2">360° View</h3>
                          <p className="text-sm opacity-80">
                            Drag to rotate the product
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Image Thumbnails */}
                {viewMode !== "magic" && (
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
                  >
                    <div className="flex gap-4 px-4 py-2 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
                      {currentImages.map((img, index) => {
                        const isActive = index === currentImageIndex;

                        return (
                          <motion.button
                            key={index}
                            onClick={() => {
                              setCurrentImageIndex(index);
                              setImageLoaded(false);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                              scale: isActive ? 1.15 : 1,
                              opacity: isActive ? 1 : 0.6,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            className={`relative rounded-2xl overflow-hidden border ${
                              isActive
                                ? "border-purple-400 shadow-lg shadow-purple-500/50"
                                : "border-white/10"
                            }`}
                          >
                            <img
                              src={img}
                              alt=""
                              className="w-14 h-12 object-contain bg-black/40"
                            />

                            {/* Active Glow */}
                            {isActive && (
                              <motion.div
                                layoutId="activeThumbnail"
                                className="absolute inset-0 ring-2 ring-purple-400 rounded-2xl"
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Navigation Arrows */}
                {viewMode !== "magic" && (
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
                      <IoChevronBack size={20} />
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
                      <IoChevronForward size={20} />
                    </motion.button>
                  </>
                )}

                {/* Controls */}
                <div className="absolute bottom-8 right-8 flex gap-3 z-40">
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

              {/* Right Side - Product Info (Enhanced and Wider) */}
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-[520px] bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-2xl border-l border-white/10 p-10 overflow-y-auto"
              >
                <div className="space-y-8">
                  {/* Product Title Section */}
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3"
                    >
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-xl uppercase shadow-lg">
                        Limited Edition
                      </span>
                      <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1.5 rounded-xl">
                        <IoStar
                          size={18}
                          className="text-yellow-400"
                          fill="currentColor"
                        />
                        <span className="text-yellow-400 font-bold">4.9</span>
                        <span className="text-gray-300 text-sm">
                          (324 reviews)
                        </span>
                      </div>
                    </motion.div>

                    <h2 className="text-3xl font-bold text-white leading-tight">
                      {product.name || "Premium Product"}
                    </h2>

                    <p className="text-gray-300 text-md leading-relaxed">
                      Experience the perfect blend of luxury and innovation with
                      our exclusive collection
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex items-end gap-4">
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                      >
                        ${product.price || "299"}
                      </motion.span>
                      {product.originalPrice && (
                        <span className="text-xl text-gray-500 line-through mb-1">
                          ${product.originalPrice}
                        </span>
                      )}
                      {product.discount && (
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-xl text-sm font-bold mb-2">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <MdVerified className="text-green-400" size={20} />
                      <span className="text-green-400 text-sm font-medium">
                        Best Price Guaranteed
                      </span>
                    </div>
                  </div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <IoCube className="text-blue-400" size={20} />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Material</p>
                          <p className="text-white font-semibold">
                            Premium Quality
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <MdLocalShipping
                            className="text-green-400"
                            size={20}
                          />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Shipping</p>
                          <p className="text-white font-semibold">
                            Free Express
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <IoInformationCircle className="text-purple-400" />
                      Product Details
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Crafted with precision and attention to detail, this
                      premium product combines elegant design with exceptional
                      functionality. Made from the finest materials to ensure
                      durability and comfort.
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Handcrafted with premium materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Limited edition with unique design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Certified quality and authenticity</span>
                      </li>
                    </ul>
                  </div>

                  {/* Customization Options */}
                  <div className="space-y-6">
                    {/* Size Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-white font-semibold flex items-center gap-2">
                          <IoShirt className="text-purple-400" />
                          Select Size
                        </p>
                        <button className="text-purple-400 text-sm hover:text-purple-300">
                          Size Guide
                        </button>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {["XS", "S", "M", "L", "XL"].map((size) => (
                          <motion.button
                            key={size}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedSize(size)}
                            className={`py-3 rounded-xl font-bold transition-all ${
                              selectedSize === size
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
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
                      <p className="text-white font-semibold mb-3 flex items-center gap-2">
                        <IoColorPalette className="text-purple-400" />
                        Choose Color
                      </p>
                      <div className="flex gap-3">
                        {[
                          { color: "#000000", name: "Black" },
                          { color: "#FFFFFF", name: "White" },
                          { color: "#8B4513", name: "Brown" },
                          { color: "#4169E1", name: "Blue" },
                          { color: "#FF6347", name: "Red" },
                        ].map(({ color, name }) => (
                          <motion.button
                            key={color}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedColor(color)}
                            className={`relative w-12 h-12 rounded-full border-3 transition-all ${
                              selectedColor === color
                                ? "border-purple-400 shadow-lg shadow-purple-500/50"
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
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Selection */}
                    <div>
                      <p className="text-white font-semibold mb-3">Quantity</p>
                      <div className="flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-14 h-14 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center text-2xl font-bold border border-gray-700"
                        >
                          -
                        </motion.button>
                        <div className="w-20 h-14 rounded-xl bg-gray-900/50 border border-gray-700 flex items-center justify-center">
                          <span className="text-white text-xl font-bold">
                            {quantity}
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-14 h-14 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center text-2xl font-bold border border-gray-700"
                        >
                          +
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Premium Features */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FaAward className="text-yellow-400" />
                      Premium Benefits
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                        <FaTruck className="text-green-400" size={24} />
                        <div>
                          <p className="text-white font-semibold">
                            Free Express Delivery
                          </p>
                          <p className="text-gray-400 text-sm">
                            Get it in 2-3 business days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                        <IoShieldCheckmark
                          className="text-blue-400"
                          size={24}
                        />
                        <div>
                          <p className="text-white font-semibold">
                            2 Year Premium Warranty
                          </p>
                          <p className="text-gray-400 text-sm">
                            Full coverage included
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                        <MdRefresh className="text-orange-400" size={24} />
                        <div>
                          <p className="text-white font-semibold">
                            30-Day Hassle-Free Returns
                          </p>
                          <p className="text-gray-400 text-sm">
                            No questions asked
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                        <IoGift className="text-purple-400" size={24} />
                        <div>
                          <p className="text-white font-semibold">
                            Premium Packaging
                          </p>
                          <p className="text-gray-400 text-sm">
                            Gift-ready presentation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  {/* <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-purple-500/50 transition-all"
                  >
                    <IoCart size={28} />
                    Add to Cart
                  </motion.button> */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl hover:shadow-green-500/50 transition-all"
                  >
                    <IoFlash size={28} />
                    Buy Now
                  </motion.button>

                  {/* Stock Information */}
                  <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 font-medium">
                        In Stock
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">Only 5 left</span>
                  </div>

                  {/* Added to Cart Notification */}
                  <AnimatePresence>
                    {showAddedToCart && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl flex items-center gap-3"
                      >
                        <IoCheckmarkCircle size={24} />
                        Added to Cart Successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
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
