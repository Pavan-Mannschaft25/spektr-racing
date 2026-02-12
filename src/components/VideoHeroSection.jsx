// // import React, { useState, useRef } from "react";
// // import { motion } from "framer-motion";
// // import { FiPlay, FiPause } from "react-icons/fi";
// // import bike1 from "../assets/bike/bike1.jpg";
// // import bike2 from "../assets/bike/bike2.jpg";

// // const VideoHeroSection = ({ items = [], className = "" }) => {
// //   const [activeVideo, setActiveVideo] = useState(null);
// //   const videoRefs = useRef({});

// //   const defaultItems = [
// //     {
// //       id: 1,
// //       title: "Bikes For Sale",
// //       subtitle: "Discover More",
// //       //   link: "/for-sale",
// //       videoSrc:
// //         "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
// //       posterImage: bike1,
// //     },
// //     {
// //       id: 2,
// //       title: "Sell Us Your Bike",
// //       subtitle: "Discover More",
// //       //   link: "/sell-us-your-car",
// //       videoSrc:
// //         "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
// //       posterImage: bike2,
// //     },
// //   ];

// //   const sectionItems = items.length ? items : defaultItems;

// //   const playVideo = (id) => {
// //     const video = videoRefs.current[id];
// //     if (!video) return;

// //     setActiveVideo(id);
// //     video.play().catch(() => {});
// //   };

// //   const stopVideo = (id) => {
// //     const video = videoRefs.current[id];
// //     if (!video) return;

// //     setActiveVideo(null);
// //     video.pause();
// //     video.currentTime = 0;
// //   };

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: { staggerChildren: 0.2 },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 40 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 0.7, ease: "easeOut" },
// //     },
// //   };

// //   return (
// //     <motion.section
// //       className={`video-hero-section ${className}`}
// //       variants={containerVariants}
// //       initial="hidden"
// //       animate="visible"
// //     >
// //       <div className="row g-0 h-100">
// //         {sectionItems.map((item) => (
// //           <motion.div
// //             key={item.id}
// //             className="col-md-6 col-12 video-card"
// //             variants={itemVariants}
// //             onMouseEnter={() => playVideo(item.id)}
// //             onMouseLeave={() => stopVideo(item.id)}
// //             onClick={() => playVideo(item.id)}
// //           >
// //             <a href={item.link} className="video-link">
// //               <div className="video-wrapper">
// //                 <video
// //                   ref={(el) => (videoRefs.current[item.id] = el)}
// //                   poster={item.posterImage}
// //                   preload="metadata"
// //                   loop
// //                   muted
// //                   playsInline
// //                 >
// //                   <source src={item.videoSrc} type="video/mp4" />
// //                 </video>

// //                 <div className="video-overlay" />

// //                 <div className="video-content">
// //                   <h1>{item.title}</h1>
// //                   <p>{item.subtitle}</p>

// //                   <div className="stripes">
// //                     <span className="green" />
// //                     <span className="white" />
// //                     <span className="red" />
// //                   </div>
// //                 </div>

// //                 <div className="play-indicator">
// //                   {activeVideo === item.id ? <FiPause /> : <FiPlay />}
// //                 </div>
// //               </div>
// //             </a>
// //           </motion.div>
// //         ))}
// //       </div>

// //       {/* Styles */}
// //       <style>{`
// //         .video-hero-section {
// //           height: 80vh;
// //           min-height: 600px;
// //           overflow: hidden;
// //         }

// //         .video-card {
// //           position: relative;
// //           cursor: pointer;
// //         }

// //         .video-wrapper {
// //           position: relative;
// //           width: 100%;
// //           height: 100%;
// //           overflow: hidden;
// //         }

// //         .video-wrapper video {
// //           width: 100%;
// //           height: 100%;
// //           object-fit: cover;
// //           transition: transform 0.5s ease, filter 0.5s ease;
// //         }

// //         .video-card:hover video {
// //           transform: scale(1.05);
// //           filter: brightness(1.1);
// //         }

// //         .video-overlay {
// //           position: absolute;
// //           inset: 0;
// //           background: linear-gradient(
// //             to bottom,
// //             rgba(0, 0, 0, 0.3),
// //             rgba(0, 0, 0, 0.6)
// //           );
// //         }

// //         .video-content {
// //           position: absolute;
// //           inset: 0;
// //           z-index: 2;
// //           display: flex;
// //           flex-direction: column;
// //           justify-content: center;
// //           align-items: center;
// //           text-align: center;
// //           color: #fff;
// //         }

// //         .video-content h1 {
// //           text-transform: uppercase;
// //           letter-spacing: 0.25em;
// //           font-size: 2rem;
// //         }

// //         .video-content p {
// //           margin-top: 10px;
// //           font-size: 0.9rem;
// //           letter-spacing: 0.2em;
// //           opacity: 0.85;
// //         }

// //         .stripes {
// //           display: flex;
// //           width: 120px;
// //           margin-top: 20px;
// //         }

// //         .stripes span {
// //           flex: 1;
// //           height: 4px;
// //         }

// //         .green { background: #16a34a; }
// //         .white { background: #f8fafc; }
// //         .red { background: #dc2626; }

// //         .play-indicator {
// //           position: absolute;
// //           top: 16px;
// //           right: 16px;
// //           z-index: 3;
// //           background: rgba(0, 0, 0, 0.6);
// //           border-radius: 50%;
// //           padding: 10px;
// //           color: #fff;
// //           font-size: 20px;
// //         }

// //         @media (max-width: 768px) {
// //           .video-hero-section {
// //             height: auto;
// //           }

// //           .video-card {
// //             height: 300px;
// //           }
// //         }
// //       `}</style>
// //     </motion.section>
// //   );
// // };

// // export default VideoHeroSection;

// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FiPlay, FiPause } from "react-icons/fi";
// import bike1 from "../assets/bike/bike1.jpg";
// import bike2 from "../assets/bike/bike2.jpg";

// const VideoHeroSection = ({ items = [], className = "" }) => {
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [videosLoaded, setVideosLoaded] = useState({});
//   const videoRefs = useRef({});

//   const defaultItems = [
//     {
//       id: 1,
//       title: "Bikes For Sale",
//       subtitle: "Discover More",
//       link: "/for-sale",
//       videoSrc:
//         "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
//       posterImage: bike1,
//     },
//     {
//       id: 2,
//       title: "Sell Us Your Bike",
//       subtitle: "Discover More",
//       link: "/sell-us-your-bike",
//       videoSrc:
//         "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
//       posterImage: bike2,
//     },
//   ];

//   const sectionItems = items.length ? items : defaultItems;

//   const playVideo = (id) => {
//     const video = videoRefs.current[id];
//     if (!video) return;

//     // Ensure video is loaded before playing
//     if (video.readyState >= 2) {
//       setActiveVideo(id);
//       video.play().catch((error) => {
//         console.log("Video play failed:", error);
//       });
//     }
//   };

//   const stopVideo = (id) => {
//     const video = videoRefs.current[id];
//     if (!video) return;

//     setActiveVideo(null);
//     video.pause();
//     video.currentTime = 0;
//   };

//   // Handle video loaded state
//   const handleVideoLoaded = (id) => {
//     setVideosLoaded((prev) => ({ ...prev, [id]: true }));
//   };

//   // Clean up videos on unmount
//   useEffect(() => {
//     return () => {
//       Object.values(videoRefs.current).forEach((video) => {
//         if (video) {
//           video.pause();
//           video.src = "";
//         }
//       });
//     };
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 50, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     },
//   };

//   return (
//     <motion.section
//       className={`relative h-screen min-h-[600px] overflow-hidden bg-black ${className}`}
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <div className="flex flex-col md:flex-row h-full">
//         {sectionItems.map((item, index) => (
//           <motion.div
//             key={item.id}
//             className="relative flex-1 h-1/2 md:h-full group cursor-pointer"
//             variants={itemVariants}
//             onMouseEnter={() => playVideo(item.id)}
//             onMouseLeave={() => stopVideo(item.id)}
//             onTouchStart={() => playVideo(item.id)}
//             onTouchEnd={() => stopVideo(item.id)}
//           >
//             <a
//               href={item.link}
//               className="block w-full h-full relative overflow-hidden"
//               onClick={(e) => {
//                 // Prevent link click if just hovering
//                 if (activeVideo === item.id) {
//                   e.preventDefault();
//                 }
//               }}
//             >
//               {/* Video Background */}
//               <div className="absolute inset-0 w-full h-full">
//                 <video
//                   ref={(el) => (videoRefs.current[item.id] = el)}
//                   poster={item.posterImage}
//                   preload="metadata"
//                   loop
//                   muted
//                   playsInline
//                   className="w-full h-full object-cover transition-all duration-700 ease-out scale-105 group-hover:scale-110 group-hover:brightness-110"
//                   onLoadedData={() => handleVideoLoaded(item.id)}
//                   style={{
//                     filter:
//                       activeVideo === item.id
//                         ? "brightness(1.1)"
//                         : "brightness(1)",
//                     transform:
//                       activeVideo === item.id ? "scale(1.1)" : "scale(1.05)",
//                   }}
//                 >
//                   <source src={item.videoSrc} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>

//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 z-10" />

//                 {/* Fallback Image for mobile */}
//                 <div
//                   className="absolute inset-0 w-full h-full object-cover md:hidden"
//                   style={{
//                     backgroundImage: `url(${item.posterImage})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                   }}
//                 />
//               </div>

//               {/* Content */}
//               <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
//                 <motion.h1
//                   className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[0.3em] mb-3 text-center"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 + index * 0.2 }}
//                 >
//                   {item.title}
//                 </motion.h1>

//                 <motion.p
//                   className="text-sm sm:text-base uppercase tracking-[0.2em] opacity-90 mb-6 text-center"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.5 + index * 0.2 }}
//                 >
//                   {item.subtitle}
//                 </motion.p>

//                 {/* Color Stripes */}
//                 <motion.div
//                   className="flex w-24 sm:w-32"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.7 + index * 0.2 }}
//                 >
//                   <span className="flex-1 h-1 bg-green-600" />
//                   <span className="flex-1 h-1 bg-gray-100" />
//                   <span className="flex-1 h-1 bg-red-600" />
//                 </motion.div>
//               </div>

//               {/* Play/Pause Indicator */}
//               <motion.div
//                 className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-sm rounded-full p-3 text-white"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{
//                   opacity: activeVideo === item.id ? 1 : 0,
//                   scale: activeVideo === item.id ? 1 : 0.8,
//                 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {activeVideo === item.id ? (
//                   <FiPause className="w-5 h-5" />
//                 ) : (
//                   <FiPlay className="w-5 h-5 ml-0.5" />
//                 )}
//               </motion.div>

//               {/* Hover Effect Border */}
//               <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-300 z-10 pointer-events-none" />
//             </a>
//           </motion.div>
//         ))}
//       </div>

//       {/* Mobile Scroll Indicator */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 md:hidden">
//         <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default VideoHeroSection;

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiPause } from "react-icons/fi";

import bike1 from "../assets/bike/bike1.jpg";
import bike2 from "../assets/bike/bike2.jpg";
import short from "../assets/videos/short1.mp4";

const VideoHeroSection = ({ items = [], className = "" }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [videosReady, setVideosReady] = useState({});
  const videoRefs = useRef({});
  const hoverTimeouts = useRef({});

  const defaultItems = [
    {
      id: 1,
      title: "Bikes For Sale",
      subtitle: "Discover More",
      link: "/for-sale",
      videoSrc: short,
      posterImage: bike1,
    },
    {
      id: 2,
      title: "Sell Us Your Bike",
      subtitle: "Discover More",
      link: "/sell-us-your-bike",
      videoSrc: short,
      posterImage: bike2,
    },
  ];

  const sectionItems = items.length ? items : defaultItems;

  /* -------------------- VIDEO CONTROLS -------------------- */

  const playVideo = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    clearTimeout(hoverTimeouts.current[id]);

    hoverTimeouts.current[id] = setTimeout(() => {
      video
        .play()
        .then(() => setActiveVideo(id))
        .catch((err) => console.log("Play blocked:", err));
    }, 120);
  };

  const stopVideo = (id) => {
    const video = videoRefs.current[id];
    clearTimeout(hoverTimeouts.current[id]);

    if (!video) return;

    video.pause();
    video.currentTime = 0;

    // 🔥 THIS IS THE KEY LINE
    video.load(); // forces poster to show again

    if (activeVideo === id) {
      setActiveVideo(null);
    }
  };

  /* -------------------- ANIMATIONS -------------------- */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  /* -------------------- JSX -------------------- */

  return (
    <motion.section
      className={`relative h-screen min-h-[600px] bg-black overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row h-full">
        {sectionItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative flex-1 group cursor-pointer"
            variants={itemVariants}
            onMouseEnter={() => playVideo(item.id)}
            onMouseLeave={() => stopVideo(item.id)}
            onClick={() => playVideo(item.id)} // mobile tap
          >
            <a
              href={item.link}
              className="block w-full h-full relative overflow-hidden"
              onClick={(e) => {
                if (activeVideo === item.id) e.preventDefault();
              }}
            >
              {/* VIDEO */}
              <video
                ref={(el) => (videoRefs.current[item.id] = el)}
                poster={item.posterImage}
                preload="metadata"
                muted
                loop
                playsInline
                onCanPlay={() =>
                  setVideosReady((p) => ({ ...p, [item.id]: true }))
                }
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                style={{
                  transform:
                    activeVideo === item.id ? "scale(1.1)" : "scale(1.05)",
                  filter:
                    activeVideo === item.id
                      ? "brightness(1.1)"
                      : "brightness(1)",
                }}
              >
                <source src={item.videoSrc} type="video/mp4" />
              </video>

              {/* GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10" />

              {/* CONTENT */}
              {/* <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
                <motion.h1
                  className="text-3xl md:text-5xl font-bold uppercase tracking-[0.3em] mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                >
                  {item.title}
                </motion.h1>

                <motion.p
                  className="uppercase tracking-[0.2em] opacity-90 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  {item.subtitle}
                </motion.p>

                <div className="flex w-28">
                  <span className="flex-1 h-1 bg-green-600" />
                  <span className="flex-1 h-1 bg-gray-100" />
                  <span className="flex-1 h-1 bg-red-600" />
                </div>
              </div> */}

              {/* PLAY / PAUSE */}
              <div className="absolute top-4 right-4 z-30 bg-black/60 rounded-full p-3 text-white">
                {activeVideo === item.id ? (
                  <FiPause className="w-5 h-5" />
                ) : (
                  <FiPlay className="w-5 h-5 ml-0.5" />
                )}
              </div>

              {/* LOADER */}
              {!videosReady[item.id] && (
                <div className="absolute top-4 left-4 z-30">
                  <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default VideoHeroSection;
