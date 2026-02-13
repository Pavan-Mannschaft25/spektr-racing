// components/InstagramFlow.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaPlay } from "react-icons/fa";
// import bike1 from "../assets/bike/bike1.jpg";
import bike2 from "../assets/bike/bike2.jpg";
import bike3 from "../assets/bike/bike3.avif";
import bike4 from "../assets/bike/bike4.webp";
import bike5 from "../assets/bike/bike5.webp";
import video1 from "../assets/videos/short2.mp4";
import video2 from "../assets/videos/short2.mp4";
import video3 from "../assets/videos/short2.mp4";
import video4 from "../assets/videos/short2.mp4";
import video5 from "../assets/videos/short2.mp4";
import logo from "../assets/images/gold-logo.png";

// Combine images and videos into post objects
const posts = [
  { image: bike3, video: video1 },
  { image: bike2, video: video2 },
  { image: bike3, video: video3 },
  { image: bike4, video: video4 },
  { image: bike5, video: video5 },
];

const InstagramFlow = () => {
  return (
    <section id="insta" className="py-16 bg-black overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-10 flex flex-col items-center">
        {/* Logo */}
        <img
          src={logo}
          alt="Spektr Racing Logo"
          className="w-20 md:w-24 mb-4 opacity-90"
        />

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wider">
          INSTAGRAM FLOW
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-red-600">@spectr_racing</p>
      </div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Speed of the carousel
          }}
        >
          {/* Duplicate posts for seamless loop */}
          {[...posts, ...posts].map((post, index) => (
            <PostItem key={index} post={post} />
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <a
          href="https://instagram.com/spectr_racing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
        >
          Follow on Instagram
        </a>
      </div>
    </section>
  );
};

// Separate component for each post item to handle video state
const PostItem = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  // Play video on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset to beginning
      }
    }
  }, [isHovered]);

  return (
    <div
      className="relative min-w-[200px] h-[200px] md:min-w-[250px] md:h-[250px] rounded-xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image - shown by default */}
      <img
        src={post.image}
        alt="Instagram"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video - shown on hover */}
      <video
        ref={videoRef}
        src={post.video}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
      />

      {/* Overlay with Instagram icon */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <FaInstagram className="text-white text-3xl md:text-4xl" />
      </div>
    </div>
  );
};

export default InstagramFlow;
