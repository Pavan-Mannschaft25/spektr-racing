// // // components/PopularPicks.jsx
// // import React from "react";
// // import { motion } from "framer-motion";
// // import ProductCard from "./ProductCard";

// // const PopularPicks = ({ products, openProductModal }) => {
// //   const featuredProducts = products.slice(0, 4);

// //   return (
// //     <section className="py-20 px-4">
// //       <div className="container mx-auto">
// //         <motion.h2
// //           className="text-4xl md:text-5xl font-bold mb-12 text-center"
// //           initial={{ opacity: 0, y: 30 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.6 }}
// //         >
// //           POPULAR PICKS
// //         </motion.h2>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //           {featuredProducts.map((product, index) => (
// //             <ProductCard
// //               key={product.id}
// //               product={product}
// //               index={index}
// //               openProductModal={openProductModal}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default PopularPicks;

// // components/PopularPicks.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import ProductCard from "./ProductCard";
// import {
//   FaMotorcycle,
//   FaTrophy,
//   FaFire,
//   FaFlagCheckered,
// } from "react-icons/fa";

// const PopularPicks = ({ products, openProductModal }) => {
//   const featuredProducts = products.slice(0, 4);

//   // Racing-themed color scheme
//   const racingColors = {
//     primary: "#FF1E1E", // Racing red
//     secondary: "#121212", // Dark charcoal
//     accent: "#FFD700", // Gold for winners
//     text: "#FFFFFF", // White text
//     subtle: "#333333", // Subtle gray
//   };

//   return (
//     <section className="py-20 px-4 relative overflow-hidden bg-black">
//       {/* Subtle racing track pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="h-full w-full bg-repeat"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L50 100 M0 50 L100 50' stroke='white' stroke-width='2'/%3E%3C/svg%3E")`,
//             backgroundSize: "100px 100px",
//           }}
//         ></div>
//       </div>

//       {/* Decorative racing elements */}
//       <motion.div
//         className="absolute top-10 left-10 text-6xl opacity-20"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//       >
//         <FaMotorcycle style={{ color: racingColors.primary }} />
//       </motion.div>

//       <motion.div
//         className="absolute bottom-10 right-10 text-6xl opacity-20"
//         animate={{ rotate: -360 }}
//         transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//       >
//         <FaTrophy style={{ color: racingColors.accent }} />
//       </motion.div>

//       {/* Racing flag decoration */}
//       <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
//         <div className="h-20 w-1 bg-red-600"></div>
//         <motion.div
//           className="h-10 w-16 bg-black border-2 border-white"
//           style={{
//             backgroundImage: `repeating-linear-gradient(45deg, black, black 5px, white 5px, white 10px)`,
//           }}
//           animate={{ x: [0, 5, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         ></motion.div>
//       </div>

//       <div className="container mx-auto relative z-10">
//         <div className="text-center mb-12">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="flex justify-center items-center mb-4">
//               <FaFire
//                 className="text-3xl mr-3"
//                 style={{ color: racingColors.primary }}
//               />
//               <h2
//                 className="text-4xl md:text-5xl font-bold tracking-wider"
//                 style={{ color: racingColors.text }}
//               >
//                 POPULAR PICKS
//               </h2>
//               <FaFire
//                 className="text-3xl ml-3"
//                 style={{ color: racingColors.primary }}
//               />
//             </div>
//             <p
//               className="text-lg"
//               style={{ color: racingColors.text, opacity: 0.8 }}
//             >
//               Top gear for champions who live for the thrill of the race
//             </p>

//             {/* Racing line decoration */}
//             <div className="flex justify-center mt-6">
//               <div className="h-1 w-20 bg-red-600"></div>
//               <div className="h-1 w-4 bg-white mx-1"></div>
//               <div className="h-1 w-20 bg-red-600"></div>
//             </div>
//           </motion.div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {featuredProducts.map((product, index) => (
//             <motion.div
//               key={product.id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -10 }}
//             >
//               <ProductCard
//                 product={product}
//                 index={index}
//                 openProductModal={openProductModal}
//               />
//             </motion.div>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <motion.button
//             className="px-8 py-3 rounded-full font-bold text-white flex items-center mx-auto bg-red-600 shadow-lg"
//             whileHover={{ scale: 1.05, backgroundColor: "#ff3333" }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 400, damping: 10 }}
//           >
//             View All Racing Gear
//             <FaMotorcycle className="ml-2" />
//           </motion.button>

//           {/* Racing flag decoration */}
//           <div className="flex justify-center mt-4">
//             <FaFlagCheckered
//               className="text-2xl"
//               style={{ color: racingColors.text, opacity: 0.5 }}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PopularPicks;

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
    <section className="py-24 px-4 relative overflow-hidden bg-black">
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
          <div className="flex justify-center items-center mb-6">
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
          </div>

          {/* Main title with enhanced styling */}
          <motion.div
            className="flex justify-center items-center mb-4"
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
          </motion.div>

          {/* Subtitle with animation */}
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Elite racing gear selected by champions for those who demand victory
            on every track
          </motion.p>

          {/* Racing line decoration */}
          <motion.div
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
          </motion.div>
        </motion.div>

        {/* Product grid with enhanced spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              openProductModal={openProductModal}
            />
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
            className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg rounded-full flex items-center mx-auto shadow-2xl"
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
