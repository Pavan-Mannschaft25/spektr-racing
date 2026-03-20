// // components/Categories.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import ProductCard from "./ProductCard";

// const Categories = ({ products, openProductModal }) => {
//   const categories = [
//     { name: "Stickers", id: "stickers" },
//     { name: "Accessories", id: "accessories" },
//     { name: "Gloves", id: "gloves" },
//   ];

//   return (
//     <section id="stickers" className="py-16 px-4 bg-black">
//       <div className="container mx-auto">
//         {categories.map((category, categoryIndex) => {
//           const categoryProducts = products.filter(
//             (p) => p.category === category.id,
//           );

//           return (
//             <div key={category.id} className="mb-16">
//               <motion.div
//                 className="flex items-center justify-between mb-8"
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
//               >
//                 <h2 className="text-xl md:text-3xl font-bold">
//                   {category.name.toUpperCase()}
//                 </h2>
//                 <button className="text-red-600 hover:underline font-sans">
//                   <span className="font-sans text-lg font-bold">View All</span>
//                 </button>
//               </motion.div>

//               <div
//                 className="flex gap-4 overflow-x-auto pb-4"
//                 style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//               >
//                 {categoryProducts.map((product, index) => (
//                   <div key={product.id} className="flex-shrink-0 w-80 md:w-90">
//                     <ProductCard
//                       product={product}
//                       index={index}
//                       openProductModal={openProductModal}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default Categories;

// components/Categories.jsx
import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const Categories = ({ products, openProductModal }) => {
  const categories = [
    { name: "Stickers", id: "stickers" },
    { name: "Accessories", id: "accessories" },
    { name: "Gloves", id: "gloves" },
  ];

  return (
    <div className="bg-black">
      {categories.map((category, categoryIndex) => {
        const categoryProducts = products.filter(
          (p) => p.category === category.id,
        );

        return (
          <section
            key={category.id}
            id={category.id} // ✅ correct id for navigation
            className="pt-18 px-4"
          >
            <div className="container mx-auto">
              {/* Heading */}
              <motion.div
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-xl md:text-3xl font-bold text-white">
                  {category.name.toUpperCase()}
                </h2>

                <button className="text-red-600 hover:underline font-sans">
                  <span className="text-lg font-bold">View All</span>
                </button>
              </motion.div>

              {/* Products */}
              <div
                className="flex gap-4 overflow-x-auto pb-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {categoryProducts.map((product, index) => (
                  <div key={product.id} className="flex-shrink-0 w-80 md:w-90">
                    <ProductCard
                      product={product}
                      index={index}
                      openProductModal={openProductModal}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Categories;
