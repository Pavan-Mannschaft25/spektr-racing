// // components/RacingVideos.jsx
// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { FaPlay } from "react-icons/fa";

// const RacingVideos = () => {
//   const scrollContainerRef = useRef(null);
//   const [activeVideo, setActiveVideo] = useState(null);

//   const videos = [
//     {
//       id: 1,
//       title: "Street Race Highlights",
//       thumbnail: "https://picsum.photos/seed/video1/400/225.jpg",
//     },
//     {
//       id: 2,
//       title: "Drift Masters 2023",
//       thumbnail: "https://picsum.photos/seed/video2/400/225.jpg",
//     },
//     {
//       id: 3,
//       title: "Night Run Tokyo",
//       thumbnail: "https://picsum.photos/seed/video3/400/225.jpg",
//     },
//     {
//       id: 4,
//       title: "Mountain Pass Challenge",
//       thumbnail: "https://picsum.photos/seed/video4/400/225.jpg",
//     },
//     {
//       id: 5,
//       title: "Underground Racing",
//       thumbnail: "https://picsum.photos/seed/video5/400/225.jpg",
//     },
//   ];

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 400;
//       scrollContainerRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section className="py-20 px-4 bg-gray-950">
//       <div className="container mx-auto">
//         <motion.h2
//           className="text-4xl md:text-5xl font-bold mb-12 text-center"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           SHORT RACING CLIPS
//         </motion.h2>

//         <div className="relative">
//           <button
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white"
//             onClick={() => scroll("left")}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="15 18 9 12 15 6"></polyline>
//             </svg>
//           </button>

//           <button
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white"
//             onClick={() => scroll("right")}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="9 18 15 12 9 6"></polyline>
//             </svg>
//           </button>

//           <div
//             ref={scrollContainerRef}
//             className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             {videos.map((video, index) => (
//               <motion.div
//                 key={video.id}
//                 className="flex-shrink-0 w-80 cursor-pointer"
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ scale: 1.03 }}
//                 onMouseEnter={() => setActiveVideo(video.id)}
//                 onMouseLeave={() => setActiveVideo(null)}
//               >
//                 <div className="relative h-48 rounded-lg overflow-hidden">
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div
//                     className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${activeVideo === video.id ? "opacity-100" : "opacity-0"}`}
//                   >
//                     <FaPlay size={40} className="text-white" />
//                   </div>
//                 </div>
//                 <h3 className="mt-2 text-lg font-medium">{video.title}</h3>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RacingVideos;

// components/RacingVideos.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const RacingVideos = () => {
  const scrollContainerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [mutedVideos, setMutedVideos] = useState({});
  const videoRefs = useRef({});

  const videos = [
    {
      id: 1,
      title: "Street Race Highlights",
      thumbnail: "https://picsum.photos/seed/video1/400/225.jpg",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 2,
      title: "Drift Masters 2023",
      thumbnail: "https://picsum.photos/seed/video2/400/225.jpg",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 3,
      title: "Night Run Tokyo",
      thumbnail: "https://picsum.photos/seed/video3/400/225.jpg",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      id: 4,
      title: "Mountain Pass Challenge",
      thumbnail: "https://picsum.photos/seed/video4/400/225.jpg",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    {
      id: 5,
      title: "Underground Racing",
      thumbnail: "https://picsum.photos/seed/video5/400/225.jpg",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleMute = (videoId) => {
    setMutedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  useEffect(() => {
    // Initialize all videos as muted
    const initialMutedState = {};
    videos.forEach((video) => {
      initialMutedState[video.id] = true;
    });
    setMutedVideos(initialMutedState);
  }, []);

  useEffect(() => {
    // Handle video play/pause based on activeVideo state
    Object.keys(videoRefs.current).forEach((id) => {
      const video = videoRefs.current[id];
      if (video) {
        if (Number(id) === activeVideo) {
          video.play().catch((e) => console.error("Error playing video:", e));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeVideo]);

  return (
    <section className="py-20 px-2 bg-gray-950">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          SHORT RACING CLIPS
        </motion.h2>

        <div className="relative">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="flex-shrink-0 w-80 cursor-pointer"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => setActiveVideo(video.id)}
                onMouseLeave={() => setActiveVideo(null)}
              >
                <div className="relative h-120 rounded-lg overflow-hidden bg-black">
                  <video
                    ref={(el) => (videoRefs.current[video.id] = el)}
                    src={video.videoUrl}
                    poster={video.thumbnail}
                    className="w-full h-full object-cover"
                    muted={mutedVideos[video.id] !== false}
                    loop
                    playsInline
                    preload="metadata"
                  />

                  {/* Video overlay with play icon when not active */}
                  <div
                    className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${activeVideo === video.id ? "opacity-0" : "opacity-100"}`}
                  >
                    <FaPlay size={40} className="text-white ml-1" />
                  </div>

                  {/* Mute/Unmute button */}
                  <button
                    className="absolute bottom-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute(video.id);
                    }}
                    aria-label={mutedVideos[video.id] ? "Unmute" : "Mute"}
                  >
                    {mutedVideos[video.id] ? (
                      <FaVolumeMute size={16} />
                    ) : (
                      <FaVolumeUp size={16} />
                    )}
                  </button>

                  {/* Loading indicator */}
                  <div
                    className={`absolute top-2 right-2 ${activeVideo === video.id ? "block" : "hidden"}`}
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
                {/* <h3 className="mt-2 text-lg font-medium text-white">
                  {video.title}
                </h3> */}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RacingVideos;
