import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiPause } from "react-icons/fi";

import bike1 from "../assets/bike/bike1.jpg";
import bike2 from "../assets/bike/bike2.jpg";
import short1 from "../assets/videos/short1.mp4";
import short2 from "../assets/videos/short2.mp4";

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
      videoSrc: short1,
      posterImage: bike1,
    },
    {
      id: 2,
      title: "Sell Us Your Bike",
      subtitle: "Discover More",
      link: "/sell-us-your-bike",
      videoSrc: short2,
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
