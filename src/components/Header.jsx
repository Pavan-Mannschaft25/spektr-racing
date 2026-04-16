// // components/Header.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiMenu, FiX, FiChevronDown } from "react-icons/fi"; // Added FiChevronDown
// import { GiSteeringWheel, GiCheckeredFlag } from "react-icons/gi";
// import logo from "../assets/images/white-spectr-logo.png";

// const Header = ({ isScrolled }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [isLocked, setIsLocked] = useState(false);

//   // State for mobile accordion menu
//   const [expandedMobileDropdown, setExpandedMobileDropdown] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const leftNavItems = [
//     {
//       name: "STORE",
//       sectionId: "store",
//       dropdown: [
//         { name: "Popular Products", sectionId: "store" },
//         { name: "stickers", sectionId: "stickers" },
//         { name: "Accessories", sectionId: "accessories" },
//         { name: "gloves", sectionId: "gloves" },
//       ],
//     },
//   ];

//   const rightNavItems = [
//     { name: "Racing Clips", sectionId: "clips" },
//     { name: "Stickers", sectionId: "stickers" },
//   ];

//   const allNavItems = [...leftNavItems, ...rightNavItems];

//   useEffect(() => {
//     const handleClickOutside = () => setOpenDropdown(null);
//     window.addEventListener("click", handleClickOutside);
//     return () => window.removeEventListener("click", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setScrolled(isScrolled);
//   }, [isScrolled]);

//   const handleNavigation = (sectionId) => {
//     const scrollToSection = () => {
//       const element = document.getElementById(sectionId);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       } else {
//         setTimeout(scrollToSection, 100);
//       }
//     };

//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         scrollToSection();
//       }, 300);
//     } else {
//       scrollToSection();
//     }

//     // Close everything on navigation
//     setIsMobileMenuOpen(false);
//     setExpandedMobileDropdown(null);
//   };

//   // Helper to toggle mobile dropdown
//   const toggleMobileDropdown = (name) => {
//     setExpandedMobileDropdown((prev) => (prev === name ? null : name));
//   };

//   return (
//     <>
//       <motion.header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled ? "bg-black/70 py-3 md:py-4" : "py-3 md:py-4 bg-black/10"
//         }`}
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{
//           duration: 0.8,
//           ease: [0.25, 1, 0.5, 1],
//           staggerChildren: 0.1,
//         }}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between relative">
//             {/* Logo */}
//             <motion.div
//               onClick={() => navigate("/")}
//               className="flex items-center gap-2 group select-none lg:absolute lg:left-1/2 xl:transform lg:-translate-x-1/2"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <div className="relative rounded-xl">
//                   <img
//                     src={logo}
//                     alt="Spektr Racing"
//                     className="w-10 h-10 md:w-17 md:h-17 object-contain"
//                   />
//                 </div>
//               </div>
//               <div className="sm:flex flex-col leading-none lg:py-6">
//                 <h1 className="text-lg md:text-3xl font-bold tracking-[0.12em] text-white">
//                   SPEKTR
//                 </h1>
//                 <h2 className="text-md md:text-2xl font-bold tracking-[0.12em] text-white text-center">
//                   - RACING -
//                 </h2>
//               </div>
//             </motion.div>

//             {/* Desktop Left Navigation */}
//             <nav className="hidden lg:flex items-center space-x-1 flex-1 font-sans text-md md:text-lg uppercase">
//               {leftNavItems.map((item, index) => (
//                 <div
//                   key={item.name}
//                   className="relative"
//                   onMouseEnter={() => {
//                     if (!isLocked) setOpenDropdown(item.name);
//                   }}
//                   onMouseLeave={() => {
//                     if (!isLocked) setOpenDropdown(null);
//                   }}
//                 >
//                   <motion.button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (openDropdown === item.name && isLocked) {
//                         setOpenDropdown(null);
//                         setIsLocked(false);
//                       } else {
//                         setOpenDropdown(item.name);
//                         setIsLocked(true);
//                       }
//                     }}
//                     className="px-4 py-2 text-white hover:bg-white/20"
//                   >
//                     {item.name}
//                   </motion.button>

//                   {/* Desktop Dropdown */}
//                   {item.dropdown && openDropdown === item.name && (
//                     <motion.div
//                       className="absolute left-0 top-full w-58 text-md bg-black/90 shadow-lg z-50 font-sans"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                     >
//                       {item.dropdown.map((subItem) => (
//                         <button
//                           key={subItem.name}
//                           onClick={() => {
//                             handleNavigation(subItem.sectionId);
//                             setOpenDropdown(null);
//                             setIsLocked(false);
//                           }}
//                           className="block w-full text-left px-4 py-2 text-white hover:bg-red-600/30 uppercase"
//                         >
//                           {subItem.name}
//                         </button>
//                       ))}
//                     </motion.div>
//                   )}
//                 </div>
//               ))}

//               <motion.button
//                 className="relative px-4 py-2 text-white hover:bg-white/20 text-lg uppercase"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link to="/contact-us">Contact Us</Link>
//               </motion.button>
//             </nav>

//             {/* Desktop Right Navigation */}
//             <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-end uppercase">
//               {rightNavItems.map((item, index) => (
//                 <motion.button
//                   onClick={() => handleNavigation(item.sectionId)}
//                   key={item.name}
//                   className="relative px-4 py-2 text-white hover:bg-white/20 group md:text-md"
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     delay: 0.1 * (index + leftNavItems.length),
//                     duration: 0.5,
//                     type: "spring",
//                   }}
//                   whileHover={{ y: -2 }}
//                   whileTap={{ y: 0 }}
//                 >
//                   <span className="relative z-10 font-sans text-md md:text-lg uppercase">
//                     {item.name}
//                   </span>
//                   <motion.div
//                     className="absolute inset-0 bg-red-600/20 rounded-lg -z-10"
//                     initial={{ scale: 0, opacity: 0 }}
//                     whileHover={{
//                       scale: 1,
//                       opacity: 1,
//                       transition: { duration: 0.2 },
//                     }}
//                   />
//                   <motion.div
//                     className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"
//                     whileHover={{
//                       width: "100%",
//                       left: 0,
//                       transition: { duration: 0.3 },
//                     }}
//                   />
//                 </motion.button>
//               ))}
//             </nav>

//             {/* Mobile Menu Toggle */}
//             <motion.button
//               className="relative p-3 lg:hidden text-white/80 hover:text-white transition-colors"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               <AnimatePresence mode="wait">
//                 {isMobileMenuOpen ? (
//                   <FiX key="close" size={30} className="text-2xl" />
//                 ) : (
//                   <FiMenu key="menu" size={30} className="text-2xl" />
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </div>
//         </div>
//       </motion.header>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             className="fixed inset-0 z-40 xl:hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             {/* Backdrop */}
//             <motion.div
//               className="absolute inset-0 bg-black/90 backdrop-blur-md"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileMenuOpen(false)}
//             />

//             {/* Menu Panel */}
//             <motion.div
//               className="absolute right-0 top-20 h-full w-72 sm:w-80 bg-black shadow-2xl"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             >
//               <nav className="p-6 overflow-y-auto h-full pb-32 font-sans">
//                 <div className="space-y-6">
//                   {/* Left Section (Contains Dropdowns) */}
//                   <div>
//                     <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-bold">
//                       Menu
//                     </p>
//                     <div className="space-y-1">
//                       {leftNavItems.map((item, index) => (
//                         <div key={item.name}>
//                           {/* Parent Button */}
//                           <motion.button
//                             onClick={() => {
//                               if (item.dropdown) {
//                                 toggleMobileDropdown(item.name);
//                               } else {
//                                 handleNavigation(item.sectionId);
//                               }
//                             }}
//                             className="flex items-center justify-between w-full p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group"
//                             initial={{ opacity: 0, x: 50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 0.05 * index }}
//                           >
//                             <span className="text-md">{item.name}</span>

//                             {/* Icon Logic: Show Chevron if Dropdown, else Flag */}
//                             {item.dropdown ? (
//                               <motion.div
//                                 animate={{
//                                   rotate:
//                                     expandedMobileDropdown === item.name
//                                       ? 180
//                                       : 0,
//                                 }}
//                                 transition={{ duration: 0.3 }}
//                               >
//                                 <FiChevronDown className="w-5 h-5 text-gray-400" />
//                               </motion.div>
//                             ) : (
//                               <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
//                                 <GiCheckeredFlag className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
//                               </div>
//                             )}
//                           </motion.button>

//                           {/* Mobile Dropdown Content (Accordion) */}
//                           {item.dropdown && (
//                             <AnimatePresence>
//                               {expandedMobileDropdown === item.name && (
//                                 <motion.div
//                                   initial={{ height: 0, opacity: 0 }}
//                                   animate={{ height: "auto", opacity: 1 }}
//                                   exit={{ height: 0, opacity: 0 }}
//                                   transition={{
//                                     duration: 0.3,
//                                     ease: "easeInOut",
//                                   }}
//                                   className="overflow-hidden bg-white/5 rounded-lg ml-4 mt-1"
//                                 >
//                                   {item.dropdown.map((subItem) => (
//                                     <button
//                                       key={subItem.name}
//                                       onClick={() =>
//                                         handleNavigation(subItem.sectionId)
//                                       }
//                                       className="flex items-center justify-between w-full p-3 pl-6 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors uppercase"
//                                     >
//                                       {subItem.name}
//                                     </button>
//                                   ))}
//                                 </motion.div>
//                               )}
//                             </AnimatePresence>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Right Section (Simple Links) */}
//                   <div>
//                     <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-bold">
//                       Media
//                     </p>
//                     <div className="space-y-1">
//                       {rightNavItems.map((item, index) => (
//                         <motion.button
//                           key={item.name}
//                           onClick={() => handleNavigation(item.sectionId)}
//                           className="flex items-center justify-between w-full p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group"
//                           initial={{ opacity: 0, x: 50 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{
//                             delay: 0.05 * (index + leftNavItems.length),
//                           }}
//                         >
//                           <span className="text-md">{item.name}</span>
//                           <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
//                             <GiCheckeredFlag className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
//                           </div>
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Shop Now Button */}
//                 <div className="mt-8 pt-8 border-t border-gray-800">
//                   <motion.button
//                     className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 transition-all duration-300"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     <span>Shop Now</span>
//                     <GiCheckeredFlag className="w-4 h-4" />
//                   </motion.button>
//                 </div>
//               </nav>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Header;

// components/Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi"; // Added FiChevronDown
import { GiSteeringWheel, GiCheckeredFlag } from "react-icons/gi";
import logo from "../assets/images/white-spectr-logo.png";

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  // State for mobile accordion menu
  const [expandedMobileDropdown, setExpandedMobileDropdown] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const leftNavItems = [
    {
      name: "STORE",
      sectionId: "store",
      dropdown: [
        { name: "Popular Products", sectionId: "store" },
        { name: "stickers", sectionId: "stickers" },
        { name: "Accessories", sectionId: "accessories" },
        { name: "gloves", sectionId: "gloves" },
      ],
    },
  ];

  const rightNavItems = [
    { name: "Racing Clips", sectionId: "clips" },
    { name: "Stickers", sectionId: "stickers" },
  ];

  const allNavItems = [...leftNavItems, ...rightNavItems];

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setScrolled(isScrolled);
  }, [isScrolled]);

  const handleNavigation = (sectionId) => {
    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        setTimeout(scrollToSection, 100);
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection();
      }, 300);
    } else {
      scrollToSection();
    }

    // Close everything on navigation
    setIsMobileMenuOpen(false);
    setExpandedMobileDropdown(null);
  };

  // Helper to toggle mobile dropdown
  const toggleMobileDropdown = (name) => {
    setExpandedMobileDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 py-3 md:py-4 px-2 md:px-8"
            : "py-3 md:py-4 bg-black/10 px-2 md:px-8"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1],
          staggerChildren: 0.1,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between relative">
            {/* Logo - Left Aligned */}
            <motion.div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 group select-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-xl">
                  <img
                    src={logo}
                    alt="Spektr Racing"
                    className="w-10 h-10 md:w-13 md:h-13 object-contain"
                  />
                </div>
              </div>
              <div className="sm:flex flex-col leading-none">
                <h1 className="text-lg md:text-2xl font-bold tracking-[0.12em] text-white">
                  SPEKTR
                </h1>
                <h2 className="text-xs md:text-md font-bold tracking-[0.12em] text-white text-center mt-0">
                  - RACING -
                </h2>
              </div>
            </motion.div>

            {/* Desktop Navigation - Right Aligned */}
            <nav className="hidden lg:flex items-center space-x-1 font-sans text-sm md:text-md uppercase">
              {/* Left Nav Items (with dropdowns) */}
              {leftNavItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (!isLocked) setOpenDropdown(item.name);
                  }}
                  onMouseLeave={() => {
                    if (!isLocked) setOpenDropdown(null);
                  }}
                >
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (openDropdown === item.name && isLocked) {
                        setOpenDropdown(null);
                        setIsLocked(false);
                      } else {
                        setOpenDropdown(item.name);
                        setIsLocked(true);
                      }
                    }}
                    className="px-4 py-2 text-white hover:bg-white/20"
                  >
                    {item.name}
                  </motion.button>

                  {/* Desktop Dropdown */}
                  {item.dropdown && openDropdown === item.name && (
                    <motion.div
                      className="absolute left-0 top-full w-58 text-md bg-black/90 shadow-lg z-50 font-sans"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {item.dropdown.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => {
                            handleNavigation(subItem.sectionId);
                            setOpenDropdown(null);
                            setIsLocked(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-red-600/30 uppercase"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Right Nav Items */}
              {rightNavItems.map((item, index) => (
                <motion.button
                  onClick={() => handleNavigation(item.sectionId)}
                  key={item.name}
                  className="relative px-4 py-2 text-white hover:bg-white/20 group md:text-md"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 * (index + leftNavItems.length + 1),
                    duration: 0.5,
                    type: "spring",
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <span className="relative z-10 font-sans text-sm md:text-md uppercase">
                    {item.name}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-red-600/20 rounded-lg -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{
                      scale: 1,
                      opacity: 1,
                      transition: { duration: 0.2 },
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"
                    whileHover={{
                      width: "100%",
                      left: 0,
                      transition: { duration: 0.3 },
                    }}
                  />
                </motion.button>
              ))}

              {/* Contact Us Link */}
              <motion.button
                className="relative px-4 py-2 text-white hover:bg-white/20 text-md uppercase"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact-us">Contact Us</Link>
              </motion.button>
            </nav>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="relative p-3 lg:hidden text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <FiX key="close" size={30} className="text-2xl" />
                ) : (
                  <FiMenu key="menu" size={30} className="text-2xl" />
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute right-0 top-20 h-full w-72 sm:w-80 bg-black shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <nav className="p-6 overflow-y-auto h-full pb-32 font-sans">
                <div className="space-y-6">
                  {/* Left Section (Contains Dropdowns) */}
                  <div>
                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-bold">
                      Menu
                    </p>
                    <div className="space-y-1">
                      {leftNavItems.map((item, index) => (
                        <div key={item.name}>
                          {/* Parent Button */}
                          <motion.button
                            onClick={() => {
                              if (item.dropdown) {
                                toggleMobileDropdown(item.name);
                              } else {
                                handleNavigation(item.sectionId);
                              }
                            }}
                            className="flex items-center justify-between w-full p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * index }}
                          >
                            <span className="text-md">{item.name}</span>

                            {/* Icon Logic: Show Chevron if Dropdown, else Flag */}
                            {item.dropdown ? (
                              <motion.div
                                animate={{
                                  rotate:
                                    expandedMobileDropdown === item.name
                                      ? 180
                                      : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <FiChevronDown className="w-5 h-5 text-gray-400" />
                              </motion.div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                <GiCheckeredFlag className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                              </div>
                            )}
                          </motion.button>

                          {/* Mobile Dropdown Content (Accordion) */}
                          {item.dropdown && (
                            <AnimatePresence>
                              {expandedMobileDropdown === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                  }}
                                  className="overflow-hidden bg-white/5 rounded-lg ml-4 mt-1"
                                >
                                  {item.dropdown.map((subItem) => (
                                    <button
                                      key={subItem.name}
                                      onClick={() =>
                                        handleNavigation(subItem.sectionId)
                                      }
                                      className="flex items-center justify-between w-full p-3 pl-6 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors uppercase"
                                    >
                                      {subItem.name}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Section (Simple Links) */}
                  <div>
                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-bold">
                      Media
                    </p>
                    <div className="space-y-1">
                      {rightNavItems.map((item, index) => (
                        <motion.button
                          key={item.name}
                          onClick={() => handleNavigation(item.sectionId)}
                          className="flex items-center justify-between w-full p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group uppercase"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.05 * (index + leftNavItems.length),
                          }}
                        >
                          <span className="text-md">{item.name}</span>
                        </motion.button>
                      ))}
                    </div>
                    {/* Contact Us Link */}
                    <motion.button
                      className="relative px-4 py-2 text-white hover:bg-white/20 text-md font-extralight uppercase"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to="/contact-us">Contact Us</Link>
                    </motion.button>
                  </div>
                </div>

                {/* Shop Now Button */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                  <motion.button
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Shop Now</span>
                    <GiCheckeredFlag className="w-4 h-4" />
                  </motion.button>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
