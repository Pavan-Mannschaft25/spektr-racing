// // import { motion, AnimatePresence } from "framer-motion";

// // import {
// //   MdFullscreen,
// //   MdFullscreenExit,
// //   MdLocalShipping,
// //   MdRefresh,
// //   MdVerified,
// // } from "react-icons/md";
// // import { FaAward, FaTruck } from "react-icons/fa";
// // import Product3D from "../components/Product3D";

// // function ProductOverviewPage({ product }) {
// //   return (
// //     <div className="flex flex-col lg:flex-row h-full">
// //       {/* --- Left Side: 3D Viewer --- */}
// //       {/* Mobile: 50vh height. Desktop: flex-1 (fills space) */}
// //       <div className="relative h-[50vh] lg:h-auto lg:flex-1 flex items-center justify-center overflow-hidden">
// //         {/* Background Pattern */}
// //         <div className="absolute inset-0 opacity-10">
// //           <div
// //             className="absolute inset-0"
// //             style={{
// //               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
// //             }}
// //           />
// //         </div>

// //         {/* 3D Product Display Container */}
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.8 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           transition={{ duration: 0.8, ease: "easeOut" }}
// //           className="relative w-full h-full flex items-center justify-center"
// //         >
// //           <div className="w-full h-full flex items-center justify-center">
// //             {/* Responsive Height for 3D Canvas */}
// //             <div className="w-full h-full lg:h-[70vh] flex items-center justify-center">
// //               {/* <Product3D
// //                         key={isFullscreen ? "full" : "normal"}
// //                         model={product.model}
// //                         key={product.id}
// //                       /> */}
// //               <Product3D model={product.model} key={product.id} />
// //             </div>
// //           </div>

// //           {/* Floating Badge */}
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ delay: 0.5, type: "spring" }}
// //             className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gradient-to-r from-red-500 to-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold shadow-xl flex items-center gap-2 text-xs sm:text-sm"
// //           >
// //             NEW
// //           </motion.div>
// //         </motion.div>

// //         {/* Fullscreen Button - Hidden on Mobile for cleaner UI */}
// //         <div className="absolute bottom-4 right-4 hidden lg:flex gap-2 z-40">
// //           <motion.button
// //             whileHover={{ scale: 1.1 }}
// //             whileTap={{ scale: 0.9 }}
// //             onClick={() => setIsFullscreen((p) => !p)}
// //             className="p-3 md:p-4 bg-black/70 backdrop-blur-xl rounded-xl sm:rounded-2xl text-gray-400 hover:text-white transition-all shadow-2xl border border-white/20"
// //             title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
// //           >
// //             {isFullscreen ? (
// //               <MdFullscreenExit size={24} />
// //             ) : (
// //               <MdFullscreen size={24} />
// //             )}
// //           </motion.button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProductOverviewPage;

// import { useLocation } from "react-router-dom";
// import Product3D from "../components/Product3D";
// import { useState } from "react";

// function ProductOverviewPage() {
//   const { state } = useLocation();
//   const product = state?.product;

//   const [isFullscreen, setIsFullscreen] = useState(false);

//   if (!product) {
//     return <div className="text-white p-10">No product found</div>;
//   }

//   return (
//     <div className="flex flex-col lg:flex-row h-screen bg-black">
//       {/* LEFT - 3D */}
//       <div className="w-full lg:w-1/2 h-[50vh] lg:h-full">
//         <Product3D model={product.model} />
//       </div>

//       {/* RIGHT - DETAILS */}
//       <div className="w-full lg:w-1/2 text-white p-6">
//         <h1 className="text-3xl font-bold">{product.name}</h1>
//         <p className="mt-4">{product.description}</p>
//         <p className="mt-4 text-xl">${product.price}</p>

//         {/* Colors */}
//         <div className="flex gap-2 mt-4">
//           {product.colors.map((c, i) => (
//             <div
//               key={i}
//               className="w-6 h-6 rounded-full border"
//               style={{ background: c }}
//             />
//           ))}
//         </div>

//         {/* Sizes */}
//         <div className="flex gap-2 mt-4">
//           {product.sizes.map((s, i) => (
//             <span key={i} className="border px-3 py-1">
//               {s}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductOverviewPage;

import { useLocation, useParams } from "react-router-dom";
import Product3D from "../components/Product3D";
import { useState, useEffect } from "react";
import { products } from "../data/products";

function ProductOverviewPage() {
  const { state } = useLocation();
  const { id } = useParams();

  const [product, setProduct] = useState(state?.product || null);

  // 🔥 fallback if user refreshes page
  useEffect(() => {
    if (!product) {
      const found = products.find((p) => p.id === Number(id));
      setProduct(found);
    }
  }, [id, product]);

  if (!product) {
    return <div className="text-white p-10">Loading product...</div>;
  }

  return (
    // <div className="h-screen bg-black text-white flex flex-col overflow-hidden font-sans">
    //   {/* 🔥 TOP - 3D VIEWER */}
    //   <div className="h-[45%] md:h-[50%] lg:h-[70%] w-full">
    //     <Product3D model={product.model} />
    //   </div>

    //   {/* 🔥 BOTTOM - DETAILS */}
    //   <div className="flex-1 overflow-y-auto p-5 md:p-8">
    //     {/* Title */}
    //     <h1 className="text-2xl md:text-4xl font-bold">{product.name}</h1>

    //     {/* Price */}
    //     <p className="mt-2 text-xl md:text-2xl text-red-500 font-semibold">
    //       ${product.price}
    //     </p>

    //     {/* Description */}
    //     <p className="mt-4 text-gray-300 leading-relaxed">
    //       {product.description}
    //     </p>

    //     {/* Colors */}
    //     <div className="mt-6">
    //       <h3 className="text-sm text-gray-400 mb-2">Colors</h3>
    //       <div className="flex gap-3">
    //         {product.colors.map((c, i) => (
    //           <div
    //             key={i}
    //             className="w-7 h-7 rounded-full border-2 border-white/30 cursor-pointer hover:scale-110 transition"
    //             style={{ background: c }}
    //           />
    //         ))}
    //       </div>
    //     </div>

    //     {/* Sizes */}
    //     <div className="mt-6">
    //       <h3 className="text-sm text-gray-400 mb-2">Sizes</h3>
    //       <div className="flex gap-3 flex-wrap">
    //         {product.sizes.map((s, i) => (
    //           <span
    //             key={i}
    //             className="px-4 py-1 border border-white/30 rounded-lg hover:bg-white hover:text-black transition cursor-pointer"
    //           >
    //             {s}
    //           </span>
    //         ))}
    //       </div>
    //     </div>

    //     {/* CTA */}
    //     <div className="mt-8">
    //       <button className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-lg transition">
    //         Add to Cart
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-black text-white flex flex-col font-sans">
      {/* 🔥 TOP - 3D VIEWER */}
      <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px] w-full border border-gray-900">
        <Product3D model={product.model} />
      </div>
      {/* <div className="sticky top-0 h-[500px] bg-black z-10 border border-gray-900 ">
        <Product3D model={product.model} />
      </div> */}

      {/* 🔥 DETAILS (NORMAL FLOW) */}
      <div className="p-5 md:p-8 max-w-6xl mx-auto w-full">
        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold">{product.name}</h1>

        {/* Price */}
        <p className="mt-2 text-xl md:text-2xl text-red-500 font-semibold">
          ${product.price}
        </p>

        {/* Description */}
        <p className="mt-4 text-gray-300 leading-relaxed">
          {product.description}
        </p>

        {/* Colors */}
        <div className="mt-6">
          <h3 className="text-sm text-gray-400 mb-2">Colors</h3>
          <div className="flex gap-3">
            {product.colors?.map((c, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white/30 hover:scale-110 transition"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-6">
          <h3 className="text-sm text-gray-400 mb-2">Sizes</h3>
          <div className="flex gap-3 flex-wrap">
            {product.sizes?.map((s, i) => (
              <span
                key={i}
                className="px-4 py-1 border border-white/30 rounded-lg hover:bg-white hover:text-black transition"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <button className="w-1/2 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-lg transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductOverviewPage;
