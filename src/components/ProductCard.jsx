// // // components/ProductCard.jsx
// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { FiEye } from "react-icons/fi";

// // const ProductCard = ({ product, index, openProductModal }) => {
// //   const [isHovered, setIsHovered] = useState(false);

// //   return (
// //     <motion.div
// //       className="relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
// //       initial={{ opacity: 0, y: 30 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true }}
// //       transition={{ duration: 0.5, delay: index * 0.1 }}
// //       whileHover={{ y: -10 }}
// //       onHoverStart={() => setIsHovered(true)}
// //       onHoverEnd={() => setIsHovered(false)}
// //       onClick={() => openProductModal(product)}
// //     >
// //       <div className="relative h-64 overflow-hidden">
// //         <img
// //           src={product.image}
// //           alt={product.name}
// //           className="w-full h-full object-cover transition-transform duration-500"
// //           style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
// //         />

// //         {isHovered && (
// //           <motion.div
// //             className="absolute inset-0 bg-black/60 flex items-center justify-center"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             <motion.button
// //               className="px-4 py-2 bg-red-600 text-white font-medium rounded-md flex items-center gap-2"
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               <FiEye /> Quick View
// //             </motion.button>
// //           </motion.div>
// //         )}
// //       </div>

// //       <div className="p-4">
// //         <h3 className="text-xl font-bold mb-2">{product.name}</h3>
// //         <p className="text-red-600 font-bold text-lg">${product.price}</p>
// //       </div>

// //       {isHovered && (
// //         <motion.div
// //           className="absolute inset-0 border-2 border-red-600 rounded-lg pointer-events-none"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 0.3 }}
// //         />
// //       )}
// //     </motion.div>
// //   );
// // };

// // export default ProductCard;

// // components/ProductCard.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FiEye, FiShoppingCart, FiTrendingUp } from "react-icons/fi";
// import { FaStar } from "react-icons/fa";

// const ProductCard = ({ product, index, openProductModal }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       className="relative bg-black rounded-lg overflow-hidden cursor-pointer group"
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       whileHover={{ y: -10 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       onClick={() => openProductModal(product)}
//     >
//       {/* Racing stripe decoration */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 z-10"></div>

//       <div className="relative h-64 overflow-hidden bg-gray-950">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-full object-cover transition-transform duration-700"
//           style={{ transform: isHovered ? "scale(1.15)" : "scale(1)" }}
//         />

//         {/* Product badge for featured items */}
//         {product.featured && (
//           <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
//             HOT
//           </div>
//         )}

//         {/* Quick view overlay */}
//         {isHovered && (
//           <motion.div
//             className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <motion.button
//               className="px-5 py-2.5 bg-red-600 text-white font-bold rounded-md flex items-center gap-2 shadow-lg"
//               whileHover={{ scale: 1.05, backgroundColor: "#ff3333" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <FiEye /> Quick View
//             </motion.button>

//             <motion.button
//               className="px-5 py-2.5 bg-gray-800 text-white font-bold rounded-md flex items-center gap-2 border border-gray-700"
//               whileHover={{ scale: 1.05, backgroundColor: "#333" }}
//               whileTap={{ scale: 0.95 }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 // Add to cart functionality
//               }}
//             >
//               <FiShoppingCart /> Add to Cart
//             </motion.button>
//           </motion.div>
//         )}
//       </div>

//       <div className="p-4 bg-gradient-to-b from-gray-900 to-black">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-xl font-bold text-white">{product.name}</h3>
//           {product.rating && (
//             <div className="flex items-center text-yellow-500 text-sm">
//               <FaStar className="mr-1" />
//               <span>{product.rating}</span>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <p className="text-red-600 font-bold text-lg">${product.price}</p>
//           {product.originalPrice && (
//             <p className="text-gray-500 line-through text-sm">
//               ${product.originalPrice}
//             </p>
//           )}
//         </div>

//         {product.isTrending && (
//           <div className="mt-2 flex items-center text-green-500 text-sm">
//             <FiTrendingUp className="mr-1" />
//             <span>Trending</span>
//           </div>
//         )}
//       </div>

//       {/* Animated border on hover */}
//       <motion.div
//         className="absolute inset-0 border-2 border-red-600 rounded-lg pointer-events-none"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: isHovered ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       />
//     </motion.div>
//   );
// };

// export default ProductCard;

// components/ProductCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiShoppingCart, FiHeart, FiZap } from "react-icons/fi";
import { FaStar, FaTrophy } from "react-icons/fa";

const ProductCard = ({ product, index, openProductModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => openProductModal(product)}
    >
      {/* Card with premium styling */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-red-600 p-[2px]">
            <div className="w-full h-full bg-black rounded-2xl"></div>
          </div>
        </div>

        {/* Product image with sophisticated hover effect */}
        <div className="relative h-72 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>

          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.2 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          {/* Premium badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {product.isNew && (
              <motion.div
                className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                NEW
              </motion.div>
            )}
            {product.isTopRated && (
              <motion.div
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <FaTrophy className="text-xs" /> TOP RATED
              </motion.div>
            )}
          </div>

          {/* Quick actions overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg flex items-center gap-2 shadow-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(255, 30, 30, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FiEye /> Quick View
            </motion.button>

            <div className="flex gap-3">
              <motion.button
                className="p-3 bg-gray-800 text-white rounded-lg shadow-xl"
                whileHover={{ scale: 1.1, backgroundColor: "#333" }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to cart functionality
                }}
              >
                <FiShoppingCart />
              </motion.button>

              <motion.button
                className="p-3 bg-gray-800 text-white rounded-lg shadow-xl"
                whileHover={{
                  scale: 1.1,
                  color: "#ef4444",
                  backgroundColor: "#333",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to wishlist functionality
                }}
              >
                <FiHeart />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Product info with premium styling */}
        <div className="p-5 relative z-20">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-white tracking-wide">
              {product.name}
            </h3>
            <motion.div
              className="flex items-center gap-1 text-yellow-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <FaStar className="text-sm" />
              <span className="text-sm font-semibold">
                {product.rating || "4.8"}
              </span>
            </motion.div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-red-500">
                ${product.price}
              </p>
              {product.originalPrice && (
                <p className="text-gray-500 line-through text-sm">
                  ${product.originalPrice}
                </p>
              )}
            </div>

            {product.isFastShipping && (
              <motion.div
                className="flex items-center gap-1 text-green-500 text-xs font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <FiZap /> Fast Ship
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
