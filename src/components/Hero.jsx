// // components/Hero.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { FaPlay } from "react-icons/fa";

// const Hero = () => {
//   return (
//     <section className="relative h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Video */}
//       <div className="absolute inset-0 z-0">
//         <div className="w-full h-full bg-gray-900">
//           {/* Placeholder for video - in a real app, you'd use a video element */}
//           <img
//             src="https://picsum.photos/seed/racing/1920/1080.jpg"
//             alt="Racing Background"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="absolute inset-0 bg-black/60"></div>
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 text-center px-4">
//         <motion.h1
//           className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           DEFY THE NORM
//         </motion.h1>
//         <motion.h2
//           className="text-4xl md:text-6xl font-bold mb-10 tracking-tighter text-red-600"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//         >
//           RACE THE STREETS
//         </motion.h2>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <motion.button
//             className="px-8 py-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors"
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 0 15px rgba(225, 6, 0, 0.7)",
//             }}
//             whileTap={{ scale: 0.95 }}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             Shop Now
//           </motion.button>

//           <motion.button
//             className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//           >
//             <FaPlay className="text-sm" /> Watch Clips
//           </motion.button>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//         animate={{ y: [0, 10, 0] }}
//         transition={{ repeat: Infinity, duration: 2 }}
//       >
//         <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;

// components/Hero.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
} from "react-icons/fa";
import { GiCheckeredFlag } from "react-icons/gi";
import bike1 from "../assets/bike/bike1.jpg";
import bike2 from "../assets/bike/bike2.jpg";
import bike3 from "../assets/bike/bike3.avif";
import video from "../assets/videos/video1.mp4";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  const controlsTimeout = useRef(null);

  // Array of bike racing videos
  const videos = [
    {
      src: video,
      poster: bike1,
      title: "Street Racing",
    },
    {
      src: video,
      poster: bike2,
      title: "Track Day",
    },
    {
      src: video,
      poster: bike3,
      title: "Mountain Pass",
    },
  ];

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Auto-play when loaded
      video.play().catch(() => {
        setIsPlaying(false);
      });

      // Handle video load
      const handleLoadedData = () => {
        setIsLoaded(true);
      };

      // Handle video end to loop to next video
      const handleEnded = () => {
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        setCurrentVideoIndex(nextIndex);
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("ended", handleEnded);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentVideoIndex]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);

    // Clear existing timeout
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }

    // Hide controls after 3 seconds
    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideoIndex}
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            poster={videos[currentVideoIndex].poster}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <source src={videos[currentVideoIndex].src} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </AnimatePresence>

        {/* Video Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Animated Scan Lines */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full bg-repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 2px,
            rgba(255, 255, 255, 0.03) 4px
          )"
          />
        </div>

        {/* Vignette Effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_20px_rgba(0,0,0,0.5)]" />
      </div>

      {/* Video Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <motion.button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <FaPause className="text-lg" />
                  ) : (
                    <FaPlay className="text-lg ml-1" />
                  )}
                </motion.button>

                {/* Mute Button */}
                <motion.button
                  onClick={toggleMute}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? (
                    <FaVolumeMute className="text-sm" />
                  ) : (
                    <FaVolumeUp className="text-sm" />
                  )}
                </motion.button>

                {/* Video Title */}
                <div className="text-white">
                  <p className="text-xs opacity-70">Now Playing</p>
                  <p className="text-sm font-semibold">
                    {videos[currentVideoIndex].title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Video Indicators */}
                <div className="flex gap-2">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentVideoIndex
                          ? "bg-red-600 w-8"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                {/* Fullscreen Button */}
                <motion.button
                  onClick={toggleFullscreen}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaExpand className="text-sm" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <motion.div
            className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      )}

      {/* Hero Content */}
      {/* <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full overflow-hidden shadow-2xl shadow-red-600/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Shop Now
              <GiCheckeredFlag className="text-lg" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            className="group px-8 py-4 bg-transparent border-2 border-white/50 text-white font-bold rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            onClick={togglePlay}
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <FaPlay className="text-sm ml-0.5" />
            </div>
            {isPlaying ? "Pause Video" : "Watch Race"}
          </motion.button>
        </div>
      </motion.div> */}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
