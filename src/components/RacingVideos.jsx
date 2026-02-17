import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import VideoHeroSection from "./VideoHeroSection";

import bike1 from "../assets/bike/bike1.jpg";
import bike2 from "../assets/bike/bike2.jpg";
import bike3 from "../assets/bike/bike3.avif";
import bike4 from "../assets/bike/bike4.webp";
import bike5 from "../assets/bike/bike5.webp";

import short1 from "../assets/videos/short7.mp4";
import short2 from "../assets/videos/short3.mp4";
import short3 from "../assets/videos/short4.mp4";
import short4 from "../assets/videos/short5.mp4";
import short5 from "../assets/videos/short6.mp4";

const RacingVideos = () => {
  const scrollContainerRef = useRef(null);
  const videoRefs = useRef({});

  const [activeVideo, setActiveVideo] = useState(null);
  const [mutedVideos, setMutedVideos] = useState({});

  const videos = [
    {
      id: 1,
      title: "Street Race Highlights",
      thumbnail: bike1,
      videoUrl: short1,
    },
    { id: 2, title: "Drift Masters 2023", thumbnail: bike2, videoUrl: short2 },
    { id: 3, title: "Night Run Tokyo", thumbnail: bike3, videoUrl: short3 },
    { id: 4, title: "Mountain Pass", thumbnail: bike4, videoUrl: short4 },
    { id: 5, title: "Extreme Run", thumbnail: bike5, videoUrl: short5 },
  ];

  /* ---------------- INIT MUTE ---------------- */
  useEffect(() => {
    const init = {};
    videos.forEach((v) => (init[v.id] = true));
    setMutedVideos(init);
  }, []);

  /* ---------------- VIDEO CONTROL ---------------- */
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video) return;

      if (Number(id) === activeVideo) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
        video.load(); // restore poster
      }
    });
  }, [activeVideo]);

  /* ---------------- HELPERS ---------------- */
  const toggleMute = (id) => {
    setMutedVideos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scroll = (dir) => {
    scrollContainerRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  /* ---------------- JSX ---------------- */
  return (
    <section id="clips" className="py-20 px-2 bg-gray-950">
      <div className="mx-auto">
        <motion.h2
          className="text-xl md:text-3xl font-bold mb-12 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          SHORT RACING CLIPS
        </motion.h2>

        {/* HERO */}
        <VideoHeroSection />

        {/* SCROLLER */}
        <div className="relative pt-6">
          {/* LEFT */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 rounded-full text-white"
          >
            ‹
          </button>

          {/* RIGHT */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 rounded-full text-white"
          >
            ›
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="flex-shrink-0 w-80 cursor-pointer"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                /* ▶️ Hover starts playing */
                onMouseEnter={() =>
                  activeVideo !== video.id && setActiveVideo(video.id)
                }
                /* ⏹ Click toggles play / stop */
                onClick={() =>
                  setActiveVideo((prev) =>
                    prev === video.id ? null : video.id,
                  )
                }
              >
                <div className="relative h-72 rounded-lg overflow-hidden bg-black">
                  <video
                    ref={(el) => (videoRefs.current[video.id] = el)}
                    src={video.videoUrl}
                    poster={video.thumbnail}
                    muted={mutedVideos[video.id]}
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />

                  {/* PLAY ICON */}
                  {activeVideo !== video.id && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <FaPlay size={40} className="text-white ml-1" />
                    </div>
                  )}

                  {/* MUTE */}
                  <button
                    className="absolute bottom-2 right-2 p-2 bg-black/60 rounded-full text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute(video.id);
                    }}
                  >
                    {mutedVideos[video.id] ? (
                      <FaVolumeMute size={16} />
                    ) : (
                      <FaVolumeUp size={16} />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RacingVideos;
