// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { FiPlay, FiPause } from "react-icons/fi";

// import bike1 from "../assets/spektr/spektrImges/sp-race2.jpeg";
// import bike2 from "../assets/spektr/spektrImges/sp-race13.jpeg";
// import short1 from "../assets/spektr/spektrVideos/sp-race-video1.mp4";
// import short2 from "../assets/spektr/spektrVideos/sp-race-video2.mp4";

// const VideoHeroSection = ({ items = [], className = "" }) => {
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [videosReady, setVideosReady] = useState({});
//   const videoRefs = useRef({});
//   const hoverTimeouts = useRef({});

//   const defaultItems = [
//     {
//       id: 1,
//       title: "Bikes For Sale",
//       subtitle: "Discover More",
//       // link: "/for-sale",
//       videoSrc: short2,
//       posterImage: bike1,
//     },
//     {
//       id: 2,
//       title: "Sell Us Your Bike",
//       subtitle: "Discover More",
//       // link: "/sell-us-your-bike",
//       videoSrc: short1,
//       posterImage: bike2,
//     },
//   ];

//   const sectionItems = items.length ? items : defaultItems;

//   /* -------------------- VIDEO CONTROLS -------------------- */

//   // const playVideo = (id) => {
//   //   const video = videoRefs.current[id];
//   //   if (!video) return;

//   //   clearTimeout(hoverTimeouts.current[id]);

//   //   hoverTimeouts.current[id] = setTimeout(() => {
//   //     video
//   //       .play()
//   //       .then(() => setActiveVideo(id))
//   //       .catch((err) => console.log("Play blocked:", err));
//   //   }, 120);
//   // };

//   const playVideo = (id) => {
//     const video = videoRefs.current[id];
//     if (!video) return;

//     if (isMobile) {
//       video.play().then(() => setActiveVideo(id));
//       return;
//     }

//     clearTimeout(hoverTimeouts.current[id]);

//     hoverTimeouts.current[id] = setTimeout(() => {
//       video
//         .play()
//         .then(() => setActiveVideo(id))
//         .catch(() => {});
//     }, 120);
//   };

//   const stopVideo = (id) => {
//     const video = videoRefs.current[id];
//     clearTimeout(hoverTimeouts.current[id]);

//     if (!video) return;

//     video.pause();
//     video.currentTime = 0;

//     // 🔥 THIS IS THE KEY LINE
//     video.load(); // forces poster to show again

//     if (activeVideo === id) {
//       setActiveVideo(null);
//     }
//   };

//   /* -------------------- ANIMATIONS -------------------- */

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.7, ease: "easeOut" },
//     },
//   };

//   const isMobile = window.matchMedia("(pointer: coarse)").matches;

//   /* -------------------- JSX -------------------- */

//   return (
//     <motion.section
//       className={`relative h-screen min-h-[500px] bg-black overflow-hidden ${className}`}
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <div className="flex flex-col md:flex-row h-full">
//         {sectionItems.map((item, index) => (
//           <motion.div
//             key={item.id}
//             className="relative flex-1 group cursor-pointer"
//             variants={itemVariants}
//             onMouseEnter={!isMobile ? () => playVideo(item.id) : undefined}
//             onMouseLeave={!isMobile ? () => stopVideo(item.id) : undefined}
//             onClick={() => {
//               if (isMobile) {
//                 activeVideo === item.id
//                   ? stopVideo(item.id)
//                   : playVideo(item.id);
//               }
//             }}
//           >
//             <a
//               // href={item.link}
//               className="block w-full h-full relative overflow-hidden"
//               onClick={(e) => {
//                 if (activeVideo === item.id) e.preventDefault();
//               }}
//             >
//               {/* VIDEO */}
//               <video
//                 ref={(el) => (videoRefs.current[item.id] = el)}
//                 poster={item.posterImage}
//                 preload="metadata"
//                 muted
//                 loop
//                 playsInline
//                 onCanPlay={() =>
//                   setVideosReady((p) => ({ ...p, [item.id]: true }))
//                 }
//                 className="absolute inset-0 w-full h-full object-fit transition-transform duration-700"
//                 style={{
//                   transform:
//                     activeVideo === item.id ? "scale(1.1)" : "scale(1.05)",
//                   filter:
//                     activeVideo === item.id
//                       ? "brightness(1.1)"
//                       : "brightness(1)",
//                 }}
//               >
//                 <source src={item.videoSrc} type="video/mp4" />
//               </video>

//               {/* GRADIENT */}
//               <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10" />

//               {/* CONTENT */}
//               {/* <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
//                 <motion.h1
//                   className="text-3xl md:text-5xl font-bold uppercase tracking-[0.3em] mb-3"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 + index * 0.2 }}
//                 >
//                   {item.title}
//                 </motion.h1>

//                 <motion.p
//                   className="uppercase tracking-[0.2em] opacity-90 mb-6"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.5 + index * 0.2 }}
//                 >
//                   {item.subtitle}
//                 </motion.p>

//                 <div className="flex w-28">
//                   <span className="flex-1 h-1 bg-green-600" />
//                   <span className="flex-1 h-1 bg-gray-100" />
//                   <span className="flex-1 h-1 bg-red-600" />
//                 </div>
//               </div> */}

//               {/* PLAY / PAUSE */}
//               {/* <div className="absolute top-4 right-4 z-30 bg-black/60 rounded-full p-3 text-white">
//                 {activeVideo === item.id ? (
//                   <FiPause className="w-5 h-5" />
//                 ) : (
//                   <FiPlay className="w-5 h-5 ml-0.5" />
//                 )}
//               </div> */}

//               {/* LOADER */}
//               {!videosReady[item.id] && (
//                 <div className="absolute top-4 left-4 z-30">
//                   <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
//                 </div>
//               )}
//             </a>
//           </motion.div>
//         ))}
//       </div>
//     </motion.section>
//   );
// };

// export default VideoHeroSection;

// import React, { useState, useRef, useEffect } from "react";

// // ─── Import your assets ───────────────────────────────────────────────────────
// import bike1 from "../assets/spektr/spektrImges/sp-race2.jpeg";
// import bike2 from "../assets/spektr/spektrImges/sp-race13.jpeg";
// import short2 from "../assets/videos/short2.mp4";
// import short1 from "../assets/spektr/spektrVideos/sp-race-video1.mp4";
// // import short2 from "../assets/spektr/spektrVideos/sp-race-video2.mp4";

// // ─── Placeholder images (replace with your imports above) ────────────────────
// // const bike1 = bike1;
// // const bike2 = bike2;
// // const short1 = null; // replace with your video import
// // const short2 = null; // replace with your video import

// // ─── Ticker content — edit freely ─────────────────────────────────────────────
// const TICKER_TEXT =
//   "Race Results · Verstappen P1 +0.342s · Hamilton P2 +1.104s · Leclerc P3 +2.887s · Bikes For Sale — New Stock Arrived · Sell Us Your Bike — Get Instant Valuation · Next Race: Silverstone GP — 14 Days";

// // ─── Track names cycling in the telemetry strip ───────────────────────────────
// const TRACKS = [
//   "Silverstone GP — Sector 2",
//   "Monza — Rettifilo",
//   "Spa-Francorchamps — Eau Rouge",
//   "Nürburgring — Sector 3",
//   "Suzuka — Spoon Curve",
// ];

// // ─── Simulated telemetry phases ───────────────────────────────────────────────
// const TELEMETRY = [
//   { gear: 3, rpm: 6200, speed: 198 },
//   { gear: 3, rpm: 7800, speed: 241 },
//   { gear: 4, rpm: 8400, speed: 287 },
//   { gear: 4, rpm: 9200, speed: 312 },
//   { gear: 5, rpm: 10800, speed: 351 },
//   { gear: 5, rpm: 11200, speed: 368 },
//   { gear: 4, rpm: 9600, speed: 299 },
//   { gear: 3, rpm: 7400, speed: 234 },
// ];

// const SHIFT_COLORS = [
//   "#16a34a",
//   "#16a34a",
//   "#16a34a",
//   "#16a34a",
//   "#eab308",
//   "#eab308",
//   "#dc2626",
//   "#dc2626",
// ];

// function lerp(a, b, t) {
//   return Math.round(a + (b - a) * t);
// }

// // ─── Speed Lines ─────────────────────────────────────────────────────────────
// function SpeedLines({ visible }) {
//   const lines = [
//     { top: "12%", width: 300, dur: 0.38, delay: 0.0 },
//     { top: "22%", width: 240, dur: 0.42, delay: 0.05 },
//     { top: "35%", width: 180, dur: 0.36, delay: 0.12 },
//     { top: "50%", width: 350, dur: 0.44, delay: 0.02 },
//     { top: "65%", width: 200, dur: 0.4, delay: 0.18 },
//     { top: "78%", width: 260, dur: 0.37, delay: 0.08 },
//     { top: "90%", width: 320, dur: 0.43, delay: 0.15 },
//     { top: "108px", width: 280, dur: 0.39, delay: 0.22 },
//     { top: "55%", width: 190, dur: 0.41, delay: 0.1 },
//   ];

//   return (
//     <div
//       style={{
//         position: "absolute",
//         inset: 0,
//         overflow: "hidden",
//         opacity: visible ? 1 : 0,
//         transition: "opacity 0.3s",
//         pointerEvents: "none",
//       }}
//     >
//       {lines.map((l, i) => (
//         <div
//           key={i}
//           style={{
//             position: "absolute",
//             top: l.top,
//             right: 0,
//             height: 1,
//             width: l.width,
//             background:
//               "linear-gradient(to left, transparent, rgba(255,255,255,0.18), transparent)",
//             animation: `spektr-speedline ${l.dur}s linear ${l.delay}s infinite`,
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// // ─── Panel ────────────────────────────────────────────────────────────────────
// function Panel({ item, isActive, isMobile, onPlay, onStop, index }) {
//   const videoRef = useRef(null);
//   const hoverTimeout = useRef(null);
//   const [videoReady, setVideoReady] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   const playVideo = () => {
//     const video = videoRef.current;
//     if (!video) return;
//     if (isMobile) {
//       video.play().then(() => onPlay(item.id));
//       return;
//     }
//     clearTimeout(hoverTimeout.current);
//     hoverTimeout.current = setTimeout(() => {
//       video
//         .play()
//         .then(() => onPlay(item.id))
//         .catch(() => {});
//     }, 120);
//   };

//   const stopVideo = () => {
//     const video = videoRef.current;
//     clearTimeout(hoverTimeout.current);
//     if (!video) return;
//     video.pause();
//     video.currentTime = 0;
//     video.load();
//     onStop(item.id);
//   };

//   const accentColor = index === 0 ? "#dc2626" : "#fbbf24";
//   const accentDim =
//     index === 0 ? "rgba(220,38,38,0.15)" : "rgba(251,191,36,0.12)";
//   const accentBorder =
//     index === 0 ? "rgba(220,38,38,0.4)" : "rgba(251,191,36,0.35)";

//   return (
//     <div
//       style={{
//         position: "relative",
//         flex: 1,
//         cursor: "pointer",
//         overflow: "hidden",
//         borderRight: index === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "flex-end",
//         padding: "32px 28px",
//         transition: "transform 0.18s",
//       }}
//       onMouseEnter={() => {
//         if (!isMobile) {
//           setHovered(true);
//           playVideo();
//         }
//       }}
//       onMouseLeave={() => {
//         if (!isMobile) {
//           setHovered(false);
//           stopVideo();
//         }
//       }}
//       onClick={() => {
//         if (isMobile) {
//           isActive ? stopVideo() : playVideo();
//         }
//       }}
//     >
//       {/* Poster / Video background */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           overflow: "hidden",
//         }}
//       >
//         {/* Poster image (always present as fallback) */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             backgroundImage: `url(${item.posterImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             transform: hovered ? "scale(1.07)" : "scale(1.02)",
//             transition: "transform 0.65s cubic-bezier(0.23,1,0.32,1)",
//           }}
//         />

//         {/* Video (overlays poster when playing) */}
//         {item.videoSrc && (
//           <video
//             ref={videoRef}
//             poster={item.posterImage}
//             preload="metadata"
//             muted
//             loop
//             playsInline
//             onCanPlay={() => setVideoReady(true)}
//             style={{
//               position: "absolute",
//               inset: 0,
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               opacity: isActive ? 1 : 0,
//               transform: isActive ? "scale(1.07)" : "scale(1.02)",
//               transition:
//                 "opacity 0.4s, transform 0.65s cubic-bezier(0.23,1,0.32,1)",
//             }}
//           >
//             <source src={item.videoSrc} type="video/mp4" />
//           </video>
//         )}
//       </div>

//       {/* Dark gradient overlay */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           zIndex: 1,
//           background: hovered
//             ? "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.08) 100%)"
//             : "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.28) 60%, rgba(0,0,0,0.12) 100%)",
//           transition: "background 0.4s",
//         }}
//       />

//       {/* Speed lines */}
//       <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
//         <SpeedLines visible={hovered || isActive} />
//       </div>

//       {/* Corner badge */}
//       {/* <div
//         style={{
//           position: "absolute",
//           top: 16,
//           left: 16,
//           zIndex: 10,
//           background: index === 0 ? "#dc2626" : accentDim,
//           color: index === 0 ? "#fff" : accentColor,
//           border: index === 0 ? "none" : `1px solid ${accentBorder}`,
//           fontSize: 10,
//           fontWeight: 500,
//           letterSpacing: "0.10em",
//           textTransform: "uppercase",
//           padding: "4px 10px",
//           borderRadius: 3,
//         }}
//       >
//         {item.badge}
//       </div> */}

//       {/* Play / Pause indicator */}
//       <div
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -70%)",
//           width: 52,
//           height: 52,
//           borderRadius: "50%",
//           zIndex: 10,
//           border:
//             hovered || isActive
//               ? `1.5px solid ${accentColor}`
//               : "1.5px solid rgba(255,255,255,0.22)",
//           background: hovered || isActive ? accentDim : "transparent",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           transition: "border-color 0.3s, background 0.3s, transform 0.3s",
//           transformOrigin: "center",
//           ...(hovered ? { transform: "translate(-50%, -70%) scale(1.1)" } : {}),
//         }}
//       >
//         {isActive ? (
//           /* Pause bars */
//           <div style={{ display: "flex", gap: 4 }}>
//             <div
//               style={{
//                 width: 3,
//                 height: 14,
//                 background: "rgba(255,255,255,0.85)",
//                 borderRadius: 2,
//               }}
//             />
//             <div
//               style={{
//                 width: 3,
//                 height: 14,
//                 background: "rgba(255,255,255,0.85)",
//                 borderRadius: 2,
//               }}
//             />
//           </div>
//         ) : (
//           /* Play triangle */
//           <div
//             style={{
//               width: 0,
//               height: 0,
//               borderTop: "9px solid transparent",
//               borderBottom: "9px solid transparent",
//               borderLeft: `16px solid ${hovered ? "#fff" : "rgba(255,255,255,0.65)"}`,
//               marginLeft: 3,
//               transition: "border-left-color 0.2s",
//             }}
//           />
//         )}
//       </div>

//       {/* Video loading spinner */}
//       {item.videoSrc && !videoReady && (
//         <div style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
//           <div
//             style={{
//               width: 20,
//               height: 20,
//               borderRadius: "50%",
//               border: "2px solid rgba(255,255,255,0.15)",
//               borderTopColor: "rgba(255,255,255,0.7)",
//               animation: "spektr-spin 0.8s linear infinite",
//             }}
//           />
//         </div>
//       )}

//       {/* Text content */}
//       {/* <div style={{ position: "relative", zIndex: 10 }}>
//         <div
//           style={{
//             fontSize: 11,
//             letterSpacing: "0.14em",
//             textTransform: "uppercase",
//             color: accentColor,
//             fontWeight: 500,
//             marginBottom: 8,
//           }}
//         >
//           {item.label}
//         </div>
//         <div
//           style={{
//             fontSize: 28,
//             fontWeight: 500,
//             lineHeight: 1.1,
//             color: "#f1f5f9",
//             marginBottom: 10,
//           }}
//         >
//           {item.title}
//         </div>
//         <div
//           style={{
//             fontSize: 13,
//             color: "rgba(255,255,255,0.5)",
//             marginBottom: 20,
//             lineHeight: 1.55,
//           }}
//         >
//           {item.subtitle}
//         </div>
//         <div
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 8,
//             fontSize: 12,
//             letterSpacing: "0.10em",
//             textTransform: "uppercase",
//             fontWeight: 500,
//             color: "#f1f5f9",
//             border: `1px solid ${hovered ? accentColor : "rgba(255,255,255,0.18)"}`,
//             background: hovered
//               ? index === 0
//                 ? "#dc2626"
//                 : "rgba(251,191,36,0.18)"
//               : "transparent",
//             padding: "9px 18px",
//             borderRadius: 3,
//             transition: "background 0.2s, border-color 0.2s",
//           }}
//         >
//           {item.cta}
//           <span
//             style={{
//               transition: "transform 0.2s",
//               display: "inline-block",
//               transform: hovered ? "translateX(4px)" : "translateX(0)",
//             }}
//           >
//             →
//           </span>
//         </div>
//       </div> */}
//     </div>
//   );
// }

// // ─── Tachometer SVG ───────────────────────────────────────────────────────────
// function Tachometer({ rpm }) {
//   const ratio = Math.min(rpm / 12000, 1);
//   const angle = -120 + ratio * 180; // sweep from -120° to +60°
//   return (
//     <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
//       <circle
//         cx="27"
//         cy="27"
//         r="25"
//         stroke="rgba(255,255,255,0.07)"
//         strokeWidth="1"
//       />
//       <path
//         d="M6 42 A23 23 0 0 1 48 42"
//         stroke="rgba(255,255,255,0.10)"
//         strokeWidth="3"
//         strokeLinecap="round"
//       />
//       <path
//         d="M6 42 A23 23 0 0 1 26 4.5"
//         stroke="rgba(220,38,38,0.45)"
//         strokeWidth="3"
//         strokeLinecap="round"
//       />
//       <line
//         x1="27"
//         y1="38"
//         x2="27"
//         y2="12"
//         stroke="#dc2626"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         style={{
//           transformOrigin: "27px 38px",
//           transform: `rotate(${angle}deg)`,
//           transition: "transform 0.25s ease",
//         }}
//       />
//       <circle cx="27" cy="38" r="2.5" fill="#dc2626" />
//       <text
//         x="27"
//         y="49"
//         textAnchor="middle"
//         fill="rgba(255,255,255,0.3)"
//         fontSize="5.5"
//         fontFamily="sans-serif"
//       >
//         RPM ×1000
//       </text>
//     </svg>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// const VideoHeroSection = ({ items = [], className = "" }) => {
//   const [activeVideo, setActiveVideo] = useState(null);

//   // Telemetry state
//   const [telemetry, setTelemetry] = useState({
//     gear: 4,
//     rpm: 8400,
//     speed: 287,
//   });
//   const [trackIdx, setTrackIdx] = useState(0);
//   const [trackVisible, setTrackVisible] = useState(true);
//   const [lap, setLap] = useState(14);
//   const animRef = useRef({ phase: 0, animT: 0 });
//   const rafRef = useRef(null);

//   const isMobile =
//     typeof window !== "undefined"
//       ? window.matchMedia("(pointer: coarse)").matches
//       : false;

//   const defaultItems = [
//     {
//       id: 1,
//       label: "Collection",
//       title: "Bikes For Sale",
//       subtitle:
//         "Track-bred machines. Street-legal performance.\nHand-picked & ready to ride.",
//       cta: "Explore Now",
//       badge: "New Stock",
//       videoSrc: short2,
//       posterImage: bike1,
//       link: "/for-sale",
//     },
//     {
//       id: 2,
//       label: "Sell",
//       title: "Sell Us Your Bike",
//       subtitle: "Fair prices, fast process.\nWe buy any race or road machine.",
//       cta: "Get Valuation",
//       badge: "Instant Quote",
//       videoSrc: short1,
//       posterImage: bike2,
//       link: "/sell-us-your-bike",
//     },
//   ];

//   const sectionItems = items.length ? items : defaultItems;

//   // ── Telemetry animation loop
//   useEffect(() => {
//     let phase = 0,
//       animT = 0;
//     const tick = () => {
//       animT += 0.015;
//       if (animT >= 1) {
//         animT = 0;
//         phase = (phase + 1) % TELEMETRY.length;
//       }
//       const t = animT < 0.5 ? 2 * animT * animT : -1 + (4 - 2 * animT) * animT;
//       const next = (phase + 1) % TELEMETRY.length;
//       setTelemetry({
//         gear: TELEMETRY[phase].gear,
//         rpm: lerp(TELEMETRY[phase].rpm, TELEMETRY[next].rpm, t),
//         speed: lerp(TELEMETRY[phase].speed, TELEMETRY[next].speed, t),
//       });
//       rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, []);

//   // ── Track name rotation
//   useEffect(() => {
//     const id = setInterval(() => {
//       setTrackVisible(false);
//       setTimeout(() => {
//         setTrackIdx((i) => (i + 1) % TRACKS.length);
//         setTrackVisible(true);
//       }, 320);
//     }, 3500);
//     return () => clearInterval(id);
//   }, []);

//   // ── Lap counter
//   useEffect(() => {
//     const id = setInterval(() => {
//       setLap((l) => Math.min(l + 1, 24));
//     }, 7000);
//     return () => clearInterval(id);
//   }, []);

//   const ratio = Math.min(telemetry.rpm / 12000, 1);
//   const litCount = Math.round(ratio * 8);

//   return (
//     <>
//       {/* ── Keyframe injector ── */}
//       <style>{`
//         @keyframes spektr-speedline {
//           from { transform: translateX(0); opacity: 0.65; }
//           to   { transform: translateX(-110%); opacity: 0; }
//         }
//         @keyframes spektr-spin {
//           to { transform: rotate(360deg); }
//         }
//         @keyframes spektr-ticker {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }
//         @keyframes spektr-gear-glow {
//           0%,100% { box-shadow: 0 0 0px rgba(220,38,38,0); }
//           50%     { box-shadow: 0 0 14px rgba(220,38,38,0.35); }
//         }
//       `}</style>

//       <section
//         className={className}
//         style={{
//           background: "#0a0a0a",
//           color: "#f1f5f9",
//           fontFamily: "sans-serif",
//           overflow: "hidden",
//           position: "relative",
//           minHeight: 500,
//         }}
//       >
//         {/* ─── TICKER ─────────────────────────────────────────────────────── */}
//         <div
//           style={{
//             background: "#dc2626",
//             height: 40,
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               whiteSpace: "nowrap",
//               animation: "spektr-ticker 22s linear infinite",
//             }}
//           >
//             {[0, 1].map((i) => (
//               <span
//                 key={i}
//                 style={{
//                   fontSize: 11,
//                   fontWeight: 500,
//                   letterSpacing: "0.12em",
//                   textTransform: "uppercase",
//                   color: "#fff",
//                   opacity: 0.92,
//                   padding: "0 32px",
//                 }}
//               >
//                 {TICKER_TEXT}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* ─── SPLIT PANELS ────────────────────────────────────────────────── */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             height: "calc(100vh - 28px - 72px)",
//             minHeight: 420,
//             position: "relative",
//           }}
//         >
//           {sectionItems.map((item, index) => (
//             <Panel
//               key={item.id}
//               item={item}
//               index={index}
//               isActive={activeVideo === item.id}
//               isMobile={isMobile}
//               onPlay={(id) => setActiveVideo(id)}
//               onStop={(id) =>
//                 setActiveVideo((prev) => (prev === id ? null : prev))
//               }
//             />
//           ))}

//           {/* Center divider */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               bottom: 0,
//               left: "50%",
//               width: 1,
//               background:
//                 "linear-gradient(to bottom, transparent, #dc2626 40%, #dc2626 60%, transparent)",
//               zIndex: 20,
//               pointerEvents: "none",
//             }}
//           />
//         </div>

//         {/* ─── TELEMETRY STRIP ─────────────────────────────────────────────── */}
//         <div
//           style={{
//             background: "#111827",
//             borderTop: "1px solid rgba(255,255,255,0.06)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "0 24px",
//             height: 72,
//             gap: 20,
//             flexWrap: "nowrap",
//             overflow: "hidden",
//           }}
//         >
//           {/* Tachometer + RPM value */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//               flexShrink: 0,
//             }}
//           >
//             <Tachometer rpm={telemetry.rpm} />
//             <div>
//               <div
//                 style={{
//                   fontSize: 10,
//                   letterSpacing: "0.10em",
//                   textTransform: "uppercase",
//                   color: "#6b7280",
//                 }}
//               >
//                 Revs
//               </div>
//               <div style={{ fontSize: 17, fontWeight: 500, color: "#dc2626" }}>
//                 {telemetry.rpm.toLocaleString()}
//               </div>
//             </div>
//           </div>

//           {/* RPM bars */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "flex-end",
//               gap: 3,
//               height: 36,
//               flexShrink: 0,
//             }}
//           >
//             {Array.from({ length: 14 }).map((_, i) => {
//               const thresh = (i + 1) / 14;
//               const active = thresh <= ratio;
//               const barH = active
//                 ? Math.round(8 + (ratio - thresh / 14) * 28)
//                 : 8;
//               const barColors = [
//                 "#374151",
//                 "#374151",
//                 "#374151",
//                 "#374151",
//                 "#374151",
//                 "#374151",
//                 "#374151",
//                 "#374151",
//                 "#dc2626",
//                 "#dc2626",
//                 "#ef4444",
//                 "#f87171",
//                 "#fca5a5",
//                 "#fecaca",
//               ];
//               return (
//                 <div
//                   key={i}
//                   style={{
//                     width: 6,
//                     borderRadius: 2,
//                     height: barH,
//                     background: barColors[Math.min(i, barColors.length - 1)],
//                     opacity: active ? 1 : 0.18,
//                     transition: "height 0.12s ease, opacity 0.12s",
//                   }}
//                 />
//               );
//             })}
//           </div>

//           {/* Shift lights */}
//           <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
//             {SHIFT_COLORS.map((col, i) => (
//               <div
//                 key={i}
//                 style={{
//                   width: 10,
//                   height: 10,
//                   borderRadius: "50%",
//                   background: i < litCount ? col : "rgba(255,255,255,0.06)",
//                   border: "1px solid rgba(255,255,255,0.08)",
//                   opacity: i < litCount ? 1 : 0.4,
//                   transition: "background 0.08s, opacity 0.08s",
//                 }}
//               />
//             ))}
//           </div>

//           {/* Gear display */}
//           <div
//             style={{
//               fontSize: 30,
//               fontWeight: 500,
//               width: 50,
//               height: 50,
//               borderRadius: 6,
//               border: "1.5px solid rgba(220,38,38,0.4)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#dc2626",
//               flexShrink: 0,
//               animation: "spektr-gear-glow 2s ease-in-out infinite",
//             }}
//           >
//             {telemetry.gear}
//           </div>

//           {/* Track name */}
//           <div
//             style={{
//               flex: 1,
//               overflow: "hidden",
//               display: "flex",
//               alignItems: "center",
//               gap: 10,
//             }}
//           >
//             <div
//               style={{
//                 fontSize: 10,
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//                 color: "#6b7280",
//                 flexShrink: 0,
//               }}
//             >
//               Circuit
//             </div>
//             <div
//               style={{
//                 fontSize: 13,
//                 fontWeight: 500,
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 opacity: trackVisible ? 1 : 0,
//                 transform: trackVisible ? "translateY(0)" : "translateY(6px)",
//                 transition: "opacity 0.3s, transform 0.3s",
//               }}
//             >
//               {TRACKS[trackIdx]}
//             </div>
//           </div>

//           {/* Lap stats */}
//           <div style={{ display: "flex", gap: 20, flexShrink: 0 }}>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: 14, fontWeight: 500, color: "#fbbf24" }}>
//                 1:27.3
//               </div>
//               <div
//                 style={{
//                   fontSize: 10,
//                   letterSpacing: "0.10em",
//                   textTransform: "uppercase",
//                   color: "#6b7280",
//                   marginTop: 2,
//                 }}
//               >
//                 Best Lap
//               </div>
//             </div>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: 14, fontWeight: 500 }}>
//                 {telemetry.speed}
//               </div>
//               <div
//                 style={{
//                   fontSize: 10,
//                   letterSpacing: "0.10em",
//                   textTransform: "uppercase",
//                   color: "#6b7280",
//                   marginTop: 2,
//                 }}
//               >
//                 km/h
//               </div>
//             </div>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: 14, fontWeight: 500 }}>{lap}/24</div>
//               <div
//                 style={{
//                   fontSize: 10,
//                   letterSpacing: "0.10em",
//                   textTransform: "uppercase",
//                   color: "#6b7280",
//                   marginTop: 2,
//                 }}
//               >
//                 Lap
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default VideoHeroSection;

import React, { useState, useRef, useEffect } from "react";

// ─── Import your assets ───────────────────────────────────────────────────────
import bike1 from "../assets/spektr/spektrImges/sp-race3.jpeg";
import bike2 from "../assets/spektr/spektrImges/sp-race13.jpeg";
import short2 from "../assets/videos/short2.mp4";
import short1 from "../assets/spektr/spektrVideos/sp-race-video1.mp4";

// ─── Ticker content ───────────────────────────────────────────────────────────
const TICKER_TEXT =
  "Race Results · Verstappen P1 +0.342s · Hamilton P2 +1.104s · Leclerc P3 +2.887s · Bikes For Sale — New Stock Arrived · Sell Us Your Bike — Get Instant Valuation · Next Race: Silverstone GP — 14 Days";

// ─── Track names cycling in the telemetry strip ───────────────────────────────
const TRACKS = [
  "Silverstone GP — Sector 2",
  "Monza — Rettifilo",
  "Spa-Francorchamps — Eau Rouge",
  "Nürburgring — Sector 3",
  "Suzuka — Spoon Curve",
];

// ─── Simulated telemetry phases ───────────────────────────────────────────────
const TELEMETRY = [
  { gear: 3, rpm: 6200, speed: 198 },
  { gear: 3, rpm: 7800, speed: 241 },
  { gear: 4, rpm: 8400, speed: 287 },
  { gear: 4, rpm: 9200, speed: 312 },
  { gear: 5, rpm: 10800, speed: 351 },
  { gear: 5, rpm: 11200, speed: 368 },
  { gear: 4, rpm: 9600, speed: 299 },
  { gear: 3, rpm: 7400, speed: 234 },
];

const SHIFT_COLORS = [
  "#16a34a",
  "#16a34a",
  "#16a34a",
  "#16a34a",
  "#eab308",
  "#eab308",
  "#dc2626",
  "#dc2626",
];

const BAR_COLORS = [
  "#1f2937",
  "#1f2937",
  "#1f2937",
  "#1f2937",
  "#1f2937",
  "#1f2937",
  "#1f2937",
  "#1f2937",
  "#dc2626",
  "#dc2626",
  "#ef4444",
  "#f87171",
  "#fca5a5",
  "#fecaca",
];

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

// ─── Speed Lines ─────────────────────────────────────────────────────────────
function SpeedLines({ visible }) {
  const lines = [
    { top: "11%", width: 340, dur: 0.37, delay: 0.0 },
    { top: "23%", width: 260, dur: 0.43, delay: 0.07 },
    { top: "38%", width: 420, dur: 0.35, delay: 0.14 },
    { top: "54%", width: 200, dur: 0.46, delay: 0.03 },
    { top: "69%", width: 310, dur: 0.4, delay: 0.19 },
    { top: "83%", width: 380, dur: 0.38, delay: 0.1 },
    { top: "93%", width: 230, dur: 0.42, delay: 0.22 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.35s",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: l.top,
            right: 0,
            height: 1,
            width: l.width,
            background:
              "linear-gradient(to left, transparent, rgba(255,255,255,0.12), transparent)",
            animation: `spektr-speedline ${l.dur}s linear ${l.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Scan Line ────────────────────────────────────────────────────────────────
function ScanLine({ visible }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: 8,
        background:
          "linear-gradient(to bottom, transparent, rgba(255,255,255,0.025), transparent)",
        animation: "spektr-scanline 4s linear infinite",
        zIndex: 3,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s",
      }}
    />
  );
}

// ─── Corner Brackets ─────────────────────────────────────────────────────────
function CornerBrackets({ visible, color }) {
  const style = {
    opacity: visible ? 1 : 0,
    transition: "opacity 0.35s",
  };
  return (
    <>
      {/* Top-right */}
      <div
        style={{
          ...style,
          position: "absolute",
          top: 16,
          right: 16,
          width: 18,
          height: 18,
          borderTop: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
          zIndex: 10,
          borderRadius: 0,
        }}
      />
      {/* Bottom-left */}
      <div
        style={{
          ...style,
          position: "absolute",
          bottom: 16,
          left: 16,
          width: 18,
          height: 18,
          borderBottom: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
          zIndex: 10,
          borderRadius: 0,
        }}
      />
    </>
  );
}

// ─── Panel ────────────────────────────────────────────────────────────────────
function Panel({ item, isActive, isMobile, onPlay, onStop, index }) {
  const videoRef = useRef(null);
  const hoverTimeout = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [hovered, setHovered] = useState(false);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isMobile) {
      video.play().then(() => onPlay(item.id));
      return;
    }
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      video
        .play()
        .then(() => onPlay(item.id))
        .catch(() => {});
    }, 120);
  };

  const stopVideo = () => {
    const video = videoRef.current;
    clearTimeout(hoverTimeout.current);
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.load();
    onStop(item.id);
  };

  // Left panel = red, right panel = gold/champagne
  const accentColor = index === 0 ? "#dc2626" : "#c9a84c";
  const accentDim =
    index === 0 ? "rgba(220,38,38,0.10)" : "rgba(201,168,76,0.08)";
  const accentBorder =
    index === 0 ? "rgba(220,38,38,0.70)" : "rgba(201,168,76,0.60)";
  const bracketColor =
    index === 0 ? "rgba(220,38,38,0.70)" : "rgba(201,168,76,0.60)";

  // Directional gradient: left panel fades left→right, right panel right→left
  const overlayBase =
    index === 0
      ? "linear-gradient(115deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 100%)"
      : "linear-gradient(245deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 100%)";
  const overlayHover =
    index === 0
      ? "linear-gradient(115deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.30) 100%)"
      : "linear-gradient(245deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.30) 100%)";

  return (
    <div
      style={{
        position: "relative",
        flex: index === 0 ? "0 0 62%" : "1",
        cursor: "pointer",
        overflow: "hidden",
        background: "#000",
      }}
      onMouseEnter={() => {
        if (!isMobile) {
          setHovered(true);
          playVideo();
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          setHovered(false);
          stopVideo();
        }
      }}
      onClick={() => {
        if (isMobile) {
          isActive ? stopVideo() : playVideo();
        }
      }}
    >
      {/* Poster image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${item.posterImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered ? "scale(1.06)" : "scale(1.0)",
          transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* Video overlay */}
      {item.videoSrc && (
        <video
          ref={videoRef}
          poster={item.posterImage}
          preload="metadata"
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "scale(1.06)" : "scale(1.0)",
            transition:
              "opacity 0.4s, transform 0.7s cubic-bezier(0.23,1,0.32,1)",
            zIndex: 1,
          }}
        >
          <source src={item.videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Directional overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: hovered ? overlayHover : overlayBase,
          transition: "background 0.4s",
        }}
      />

      {/* Speed lines */}
      <SpeedLines visible={hovered || isActive} />

      {/* Scan line */}
      <ScanLine visible={hovered || isActive} />

      {/* Corner brackets */}
      <CornerBrackets visible={hovered || isActive} color={bracketColor} />

      {/* Corner badge */}
      <div
        className={`
    absolute top-3 left-3 sm:top-4 sm:left-4 z-10
    text-[8px] sm:text-[10px] md:text-xs
    font-medium tracking-wider uppercase
    px-2 sm:px-3 py-1 rounded-sm
    ${
      index === 0
        ? "bg-red-600 text-white"
        : "text-yellow-500 border border-yellow-500/50 bg-black/40 backdrop-blur-sm"
    }
  `}
      >
        {item.badge}
      </div>

      {/* Play / Pause ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: hovered
            ? "translate(-50%, -62%) scale(1.1)"
            : "translate(-50%, -62%) scale(1)",
          width: 56,
          height: 56,
          borderRadius: "50%",
          zIndex: 10,
          border:
            hovered || isActive
              ? `1px solid ${accentColor}`
              : "1px solid rgba(255,255,255,0.20)",
          background: hovered || isActive ? accentDim : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.3s, background 0.3s, transform 0.3s",
        }}
      >
        {isActive ? (
          <div style={{ display: "flex", gap: 4 }}>
            <div
              style={{
                width: 3,
                height: 14,
                background: "rgba(255,255,255,0.85)",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: 3,
                height: 14,
                background: "rgba(255,255,255,0.85)",
                borderRadius: 2,
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderLeft: `15px solid ${hovered ? "#fff" : "rgba(255,255,255,0.55)"}`,
              marginLeft: 4,
              transition: "border-left-color 0.2s",
            }}
          />
        )}
      </div>

      {/* Video loading spinner */}
      {item.videoSrc && !videoReady && (
        <div style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.12)",
              borderTopColor: "rgba(255,255,255,0.6)",
              animation: "spektr-spin 0.8s linear infinite",
            }}
          />
        </div>
      )}

      {/* Bottom info bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: index === 0 ? "28px 32px" : "28px 24px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: accentColor,
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: index === 0 ? 28 : 22,
                fontWeight: 500,
                lineHeight: 1.05,
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              {item.title}
            </div>
          </div>
          {index === 0 && (
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 20 }}>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: 4,
                }}
              >
                In Stock
              </div>
              <div style={{ fontSize: 22, fontWeight: 500, color: "#fff" }}>
                24
              </div>
            </div>
          )}
        </div>
        {/* Accent underline */}
        <div
          style={{
            marginTop: 16,
            height: 1,
            background:
              index === 0
                ? "linear-gradient(to right, rgba(220,38,38,0.6), rgba(220,38,38,0.1), transparent)"
                : "linear-gradient(to right, rgba(201,168,76,0.5), rgba(201,168,76,0.1), transparent)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Tachometer SVG ───────────────────────────────────────────────────────────
function Tachometer({ rpm }) {
  const ratio = Math.min(rpm / 12000, 1);
  const angle = -120 + ratio * 180;
  return (
    <svg width="46" height="46" viewBox="0 0 54 54" fill="none">
      <circle
        cx="27"
        cy="27"
        r="24"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
      />
      <path
        d="M6 42 A23 23 0 0 1 48 42"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M6 42 A23 23 0 0 1 26 4.5"
        stroke="rgba(220,38,38,0.35)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="27"
        y1="38"
        x2="27"
        y2="13"
        stroke="#dc2626"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transformOrigin: "27px 38px",
          transform: `rotate(${angle}deg)`,
          transition: "transform 0.22s ease",
        }}
      />
      <circle cx="27" cy="38" r="2.5" fill="#dc2626" />
      <text
        x="27"
        y="49"
        textAnchor="middle"
        fill="rgba(255,255,255,0.2)"
        fontSize="5"
        fontFamily="sans-serif"
      >
        RPM
      </text>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const VideoHeroSection = ({ items = [], className = "" }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [telemetry, setTelemetry] = useState({
    gear: 4,
    rpm: 8400,
    speed: 287,
  });
  const [trackIdx, setTrackIdx] = useState(0);
  const [trackVisible, setTrackVisible] = useState(true);
  const [lap, setLap] = useState(14);
  const rafRef = useRef(null);

  const isMobile =
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: coarse)").matches
      : false;

  const defaultItems = [
    {
      id: 1,
      label: "Shop Collection",
      title: "Bikes For Sale",
      subtitle:
        "Track-bred machines. Street-legal performance.\nHand-picked & ready to ride.",
      cta: "Explore Now",
      badge: "New Stock",
      videoSrc: short2,
      posterImage: bike1,
      link: "/for-sale",
    },
    {
      id: 2,
      label: "Sell Your Bike",
      title: "Get Valuation",
      subtitle: "Fair prices, fast process.\nWe buy any race or road machine.",
      cta: "Get Valuation",
      badge: "Instant Quote",
      videoSrc: short1,
      posterImage: bike2,
      link: "/sell-us-your-bike",
    },
  ];

  const sectionItems = items.length ? items : defaultItems;

  // ── Telemetry animation loop
  useEffect(() => {
    let phase = 0,
      animT = 0;
    const tick = () => {
      animT += 0.015;
      if (animT >= 1) {
        animT = 0;
        phase = (phase + 1) % TELEMETRY.length;
      }
      const t = animT < 0.5 ? 2 * animT * animT : -1 + (4 - 2 * animT) * animT;
      const next = (phase + 1) % TELEMETRY.length;
      setTelemetry({
        gear: TELEMETRY[phase].gear,
        rpm: lerp(TELEMETRY[phase].rpm, TELEMETRY[next].rpm, t),
        speed: lerp(TELEMETRY[phase].speed, TELEMETRY[next].speed, t),
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Track name rotation
  useEffect(() => {
    const id = setInterval(() => {
      setTrackVisible(false);
      setTimeout(() => {
        setTrackIdx((i) => (i + 1) % TRACKS.length);
        setTrackVisible(true);
      }, 320);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // ── Lap counter
  useEffect(() => {
    const id = setInterval(() => {
      setLap((l) => Math.min(l + 1, 24));
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const ratio = Math.min(telemetry.rpm / 12000, 1);
  const litCount = Math.round(ratio * 8);

  return (
    <>
      <style>{`
        @keyframes spektr-speedline {
          from { transform: translateX(0); opacity: 0.55; }
          to   { transform: translateX(-110%); opacity: 0; }
        }
        @keyframes spektr-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes spektr-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes spektr-gear-glow {
          0%,100% { border-color: rgba(220,38,38,0.35); }
          50%     { border-color: rgba(220,38,38,0.85); }
        }
        @keyframes spektr-scanline {
          0%   { top: -8px; }
          100% { top: 100%; }
        }
        @keyframes spektr-pulse {
          0%,100% { opacity: 0.5; }
          50%     { opacity: 1; }
        }
      `}</style>

      <section
        className={className}
        style={{
          background: "#000",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
          overflow: "hidden",
          position: "relative",
          minHeight: 500,
        }}
      >
        {/* ─── TICKER ──────────────────────────────────────────────────────── */}
        <div
          style={{
            background: "#0a0a0a",
            height: 36,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Live indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 18px",
              flexShrink: 0,
              borderRight: "1px solid rgba(255,255,255,0.06)",
              height: "100%",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#dc2626",
                animation: "spektr-pulse 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Live
            </span>
          </div>

          {/* Scrolling text */}
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div
              style={{
                display: "flex",
                whiteSpace: "nowrap",
                animation: "spektr-ticker 26s linear infinite",
              }}
            >
              {[0, 1].map((i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.50)",
                    padding: "0 32px",
                  }}
                >
                  {TICKER_TEXT}
                </span>
              ))}
            </div>
          </div>

          {/* Brand name right side */}
          <div
            style={{
              padding: "0 18px",
              flexShrink: 0,
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Spektr Racing
            </span>
          </div>
        </div>

        {/* ─── SPLIT PANELS ────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "calc(100vh - 36px - 64px)",
            minHeight: 420,
            position: "relative",
          }}
        >
          {sectionItems.map((item, index) => (
            <Panel
              key={item.id}
              item={item}
              index={index}
              isActive={activeVideo === item.id}
              isMobile={isMobile}
              onPlay={(id) => setActiveVideo(id)}
              onStop={(id) =>
                setActiveVideo((prev) => (prev === id ? null : prev))
              }
            />
          ))}

          {/* Center divider — gradient red line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "62%",
              width: 1,
              background:
                "linear-gradient(to bottom, transparent 0%, #1a1a1a 20%, #dc2626 50%, #1a1a1a 80%, transparent 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ─── TELEMETRY STRIP ─────────────────────────────────────────────── */}
        <div
          className="
    bg-black border-t border-white/10
    flex flex-wrap md:flex-nowrap
    items-center justify-between
    px-3 sm:px-4 md:px-6
    py-2 sm:py-3
    gap-3 sm:gap-4
  "
        >
          {/* LEFT - Tachometer */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Tachometer rpm={telemetry.rpm} />

            <div>
              <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-white/40">
                Revs
              </p>
              <p className="text-xs sm:text-sm md:text-base text-red-600 font-medium">
                {telemetry.rpm.toLocaleString()}
              </p>
            </div>
          </div>

          {/* RPM Bars (hide on very small screens) */}
          <div className="hidden sm:flex items-end gap-[2px] h-6 sm:h-7">
            {Array.from({ length: 14 }).map((_, i) => {
              const thresh = (i + 1) / 14;
              const active = thresh <= ratio;
              const barH = active ? 6 + (ratio - thresh / 14) * 20 : 6;

              return (
                <div
                  key={i}
                  className="w-[3px] sm:w-[4px] rounded-sm transition-all duration-150"
                  style={{
                    height: barH,
                    background: BAR_COLORS[i],
                    opacity: active ? 1 : 0.2,
                  }}
                />
              );
            })}
          </div>

          {/* Shift Lights */}
          <div className="flex gap-1">
            {SHIFT_COLORS.map((col, i) => (
              <div
                key={i}
                className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full border border-white/10"
                style={{
                  background: i < litCount ? col : "rgba(255,255,255,0.08)",
                  opacity: i < litCount ? 1 : 0.4,
                }}
              />
            ))}
          </div>

          {/* Gear */}
          <div
            className="flex items-center justify-center
    w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
    border border-red-500/40 text-red-600
    text-sm sm:text-lg md:text-xl font-semibold rounded-md"
          >
            {telemetry.gear}
          </div>

          {/* Track */}
          <div className="flex-1 min-w-[80px] sm:min-w-[120px] overflow-hidden">
            <p className="text-[8px] sm:text-[10px] uppercase text-white/40">
              Circuit
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm text-white/70 truncate">
              {TRACKS[trackIdx]}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
            {/* Best Lap */}
            <div className="text-center">
              <p className="text-[10px] sm:text-xs md:text-sm text-yellow-500 font-medium">
                1:27.3
              </p>
              <p className="text-[8px] uppercase text-white/40">Best</p>
            </div>

            {/* Speed */}
            <div className="text-center">
              <p className="text-[10px] sm:text-xs md:text-sm">
                {telemetry.speed}
              </p>
              <p className="text-[8px] uppercase text-white/40">km/h</p>
            </div>

            {/* Lap */}
            <div className="text-center">
              <p className="text-[10px] sm:text-xs md:text-sm">{lap}/24</p>
              <p className="text-[8px] uppercase text-white/40">Lap</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoHeroSection;
