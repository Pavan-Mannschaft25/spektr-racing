// // components/InstagramFlow.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { FaInstagram } from "react-icons/fa";

// const InstagramFlow = () => {
//   const posts = [
//     { id: 1, image: "https://picsum.photos/seed/insta1/300/300.jpg" },
//     { id: 2, image: "https://picsum.photos/seed/insta2/300/300.jpg" },
//     { id: 3, image: "https://picsum.photos/seed/insta3/300/300.jpg" },
//     { id: 4, image: "https://picsum.photos/seed/insta4/300/300.jpg" },
//     { id: 5, image: "https://picsum.photos/seed/insta5/300/300.jpg" },
//     { id: 6, image: "https://picsum.photos/seed/insta6/300/300.jpg" },
//   ];

//   return (
//     <section className="py-20 px-4 bg-gray-950">
//       <div className="container mx-auto">
//         <motion.div
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             INSTAGRAM FLOW
//           </h2>
//           <p className="text-gray-400 text-lg">Follow Us @RACEX</p>
//         </motion.div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {posts.map((post, index) => (
//             <motion.div
//               key={post.id}
//               className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <img
//                 src={post.image}
//                 alt={`Instagram post ${post.id}`}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
//                 <FaInstagram size={30} className="text-white" />
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           className="text-center mt-10"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-md hover:shadow-lg transition-shadow">
//             Follow on Instagram
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default InstagramFlow;

// components/InstagramFlow.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import bike1 from "../assets/bike/bike1.jpg";
import bike2 from "../assets/bike/bike2.jpg";
import bike3 from "../assets/bike/bike3.avif";
import bike4 from "../assets/bike/bike4.webp";
import bike5 from "../assets/bike/bike5.webp";

const posts = [bike1, bike2, bike3, bike4, bike5];

const InstagramFlow = () => {
  return (
    <section className="py-16 bg-black overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          INSTAGRAM FLOW
        </h2>
        <p className="text-gray-400 mt-2">Follow us @RACEX</p>
      </div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // 👈 speed (higher = slower)
          }}
        >
          {/* Duplicate posts for seamless loop */}
          {[...posts, ...posts].map((img, index) => (
            <div
              key={index}
              className="relative min-w-[200px] h-[200px] rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={img}
                alt="Instagram"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <FaInstagram className="text-white text-3xl" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <a
          href="#"
          className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
        >
          Follow on Instagram
        </a>
      </div>
    </section>
  );
};

export default InstagramFlow;
