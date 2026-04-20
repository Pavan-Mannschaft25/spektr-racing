// // components/Header.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiMenu,
//   FiX,
//   FiChevronDown,
//   FiSearch,
//   FiUser,
//   FiLogOut,
// } from "react-icons/fi";
// import { GiCheckeredFlag } from "react-icons/gi";
// import logo1 from "../assets/images/white-spectr-logo.png";
// import logo from "../assets/images/sp_logo1_white2.png";

// const Header = ({ isScrolled }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [isLocked, setIsLocked] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const searchInputRef = useRef(null);

//   // State for mobile accordion menu
//   const [expandedMobileDropdown, setExpandedMobileDropdown] = useState(null);

//   // Mock user data (replace with actual auth state)
//   const [user, setUser] = useState({
//     name: "Alex Johnson",
//     isLoggedIn: true,
//   });

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

//   // Click outside handler - won't close search/profile when clicking inside them
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (event.target.closest(".search-container")) {
//         return;
//       }

//       if (event.target.closest(".profile-dropdown-container")) {
//         return;
//       }

//       setOpenDropdown(null);
//       setIsProfileOpen(false);
//       setIsSearchOpen(false);
//     };

//     window.addEventListener("click", handleClickOutside);
//     return () => window.removeEventListener("click", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setScrolled(isScrolled);
//   }, [isScrolled]);

//   // Focus search input when opened
//   useEffect(() => {
//     if (isSearchOpen && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [isSearchOpen]);

//   // Handle search submit
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       console.log("Searching for:", searchQuery);
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setIsSearchOpen(false);
//       setSearchQuery("");
//     }
//   };

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

//     setIsMobileMenuOpen(false);
//     setExpandedMobileDropdown(null);
//   };

//   // Helper to toggle mobile dropdown
//   const toggleMobileDropdown = (name) => {
//     setExpandedMobileDropdown((prev) => (prev === name ? null : name));
//   };

//   // Logout - Navigate to /login page
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setUser({ ...user, isLoggedIn: false });
//     setIsProfileOpen(false);
//     setIsMobileMenuOpen(false);

//     navigate("/login");
//   };

//   // Close search only when cancel button clicked
//   const handleCloseSearch = () => {
//     setIsSearchOpen(false);
//     setSearchQuery("");
//   };

//   // Handle profile navigation
//   const handleProfileNavigation = (path) => {
//     navigate(path);
//     setIsProfileOpen(false);
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <motion.header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans ${
//           scrolled ? "bg-black/70 px-2 md:px-8" : "bg-black/10 px-2 md:px-8"
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
//           <div className="flex items-center justify-between relative w-full">
//             {/* LEFT: LOGO */}
//             <motion.div
//               onClick={() => navigate("/")}
//               className="flex items-center gap-2 group select-none flex-shrink-0"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <div className="relative rounded-xl flex items-center">
//                   <img
//                     src={logo1}
//                     alt="Spektr Racing"
//                     className="w-8 h-8 md:w-12 md:h-12 object-contain"
//                   />
//                   <img
//                     src={logo}
//                     alt="Spektr Racing"
//                     className="w-20 h-10 ml-1 md:w-36 md:h-14 object-contain"
//                   />
//                 </div>
//               </div>
//             </motion.div>

//             {/* CENTER: NAVIGATION (WHITE COLOR) */}
//             <nav className="hidden lg:flex items-center space-x-1 font-sans text-sm md:text-md uppercase absolute left-1/2 transform -translate-x-1/2">
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
//                     className="px-4 py-2 text-white hover:bg-white/20 transition-colors"
//                   >
//                     {item.name}
//                   </motion.button>

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

//               {rightNavItems.map((item, index) => (
//                 <motion.button
//                   onClick={() => handleNavigation(item.sectionId)}
//                   key={item.name}
//                   className="relative px-4 py-2 text-white hover:bg-white/20 group md:text-md transition-colors"
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     delay: 0.1 * (index + leftNavItems.length + 1),
//                     duration: 0.5,
//                     type: "spring",
//                   }}
//                   whileHover={{ y: -2 }}
//                   whileTap={{ y: 0 }}
//                 >
//                   <span className="relative z-10 font-sans text-sm md:text-md uppercase">
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

//             {/* RIGHT: CONTACT + SEARCH + AVATAR */}
//             <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
//               {/* Contact Link */}
//               <motion.button
//                 className="px-4 py-2 text-white hover:bg-white/20 text-md uppercase transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link to="/contact-us">Contact</Link>
//               </motion.button>

//               {/* Search with Input Box - Only closes with X button */}
//               <div
//                 className="relative flex items-center search-container"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <AnimatePresence mode="wait">
//                   {!isSearchOpen ? (
//                     <motion.button
//                       key="search-icon"
//                       className="relative p-2 text-white border-2 border-red-500 rounded-full hover:bg-red-600/30 transition-all"
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setIsSearchOpen(true);
//                       }}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.8 }}
//                     >
//                       <FiSearch size={18} />
//                     </motion.button>
//                   ) : (
//                     <motion.div
//                       key="search-input"
//                       className="flex items-center"
//                       initial={{ width: 0, opacity: 0 }}
//                       animate={{ width: "auto", opacity: 1 }}
//                       exit={{ width: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <form
//                         onSubmit={handleSearchSubmit}
//                         className="flex items-center"
//                       >
//                         <input
//                           ref={searchInputRef}
//                           type="text"
//                           value={searchQuery}
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                           placeholder="Search products..."
//                           className="w-48 px-4 py-2 bg-white/10 border border-red-500 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/20 transition-all"
//                         />
//                       </form>

//                       {/* Cancel Button - ONLY way to close search */}
//                       <motion.button
//                         type="button"
//                         className="ml-2 p-2 text-white hover:text-red-500 transition-colors bg-red-500/10 rounded-full hover:bg-red-500/20"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleCloseSearch();
//                         }}
//                         title="Close search"
//                       >
//                         <FiX size={18} />
//                       </motion.button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Profile Dropdown (Avatar "A") */}
//               <div
//                 className="relative profile-dropdown-container"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <motion.button
//                   className="relative p-2 w-10 h-10 flex items-center justify-center text-white bg-transparent border-2 border-red-500 rounded-full hover:bg-red-600/30 transition-all font-bold"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setIsProfileOpen(!isProfileOpen);
//                     setOpenDropdown(null);
//                     setIsSearchOpen(false);
//                   }}
//                 >
//                   A
//                 </motion.button>

//                 {/* Profile Dropdown Menu */}
//                 <AnimatePresence>
//                   {isProfileOpen && (
//                     <motion.div
//                       className="absolute right-0 top-full mt-2 w-56 bg-black shadow-xl z-50 overflow-hidden"
//                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {/* User Name */}
//                       <div className="px-6 py-4 border-b border-gray-200">
//                         <p className="text-white text-lg">{user.name}</p>
//                       </div>

//                       {/* Menu Items */}
//                       <div className="py-2">
//                         <button
//                           onClick={() => handleProfileNavigation("/profile")}
//                           className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium"
//                         >
//                           Profile
//                         </button>
//                         <button
//                           onClick={() => handleProfileNavigation("/history")}
//                           className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium"
//                         >
//                           History
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleProfileNavigation("/address-list")
//                           }
//                           className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium"
//                         >
//                           Address List
//                         </button>
//                       </div>

//                       {/* Logout Button - Navigates to /login */}
//                       <div className="border-t border-gray-200 py-2">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium flex items-center gap-2"
//                         >
//                           <FiLogOut size={16} />
//                           Logout
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>

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
//             <motion.div
//               className="absolute inset-0 bg-black/90 backdrop-blur-md"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileMenuOpen(false)}
//             />

//             <motion.div
//               className="absolute right-0 top-20 h-full w-72 sm:w-80 bg-black shadow-2xl"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             >
//               <nav className="p-6 overflow-y-auto h-full pb-32 font-sans">
//                 <div className="space-y-6">
//                   <div>
//                     <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-bold">
//                       Menu
//                     </p>
//                     <div className="space-y-1">
//                       {leftNavItems.map((item, index) => (
//                         <div key={item.name}>
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

//                   <div>
//                     <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-bold">
//                       Media
//                     </p>
//                     <div className="space-y-1">
//                       {rightNavItems.map((item, index) => (
//                         <motion.button
//                           key={item.name}
//                           onClick={() => handleNavigation(item.sectionId)}
//                           className="flex items-center justify-between w-full p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group uppercase"
//                           initial={{ opacity: 0, x: 50 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{
//                             delay: 0.05 * (index + leftNavItems.length),
//                           }}
//                         >
//                           <span className="text-md">{item.name}</span>
//                         </motion.button>
//                       ))}
//                     </div>

//                     <motion.button
//                       className="relative w-full p-4 text-left text-white hover:bg-white/20 text-md font-extralight uppercase mt-4 transition-colors"
//                       whileHover={{ scale: 1.02 }}
//                     >
//                       <Link to="/contact-us">Contact</Link>
//                     </motion.button>

//                     <form onSubmit={handleSearchSubmit} className="mt-4">
//                       <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search..."
//                         className="w-full px-4 py-3 bg-white/10 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </form>
//                   </div>
//                 </div>

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

//                 {user.isLoggedIn && (
//                   <div className="mt-8 pt-8 border-t border-gray-800">
//                     <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-bold">
//                       Account
//                     </p>
//                     <div className="space-y-2">
//                       <div className="px-4 py-3 bg-white/5 rounded-lg">
//                         <p className="text-red-500 font-semibold">
//                           {user.name}
//                         </p>
//                       </div>

//                       <motion.button
//                         onClick={() => handleProfileNavigation("/profile")}
//                         className="w-full flex items-center justify-between p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group uppercase"
//                       >
//                         <span>Profile</span>
//                         <FiUser className="w-5 h-5 text-gray-400" />
//                       </motion.button>

//                       <motion.button
//                         onClick={() => handleProfileNavigation("/history")}
//                         className="w-full flex items-center justify-between p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group uppercase"
//                       >
//                         <span>History</span>
//                       </motion.button>

//                       <motion.button
//                         onClick={() => handleProfileNavigation("/address-list")}
//                         className="w-full flex items-center justify-between p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group uppercase"
//                       >
//                         <span>Address List</span>
//                       </motion.button>

//                       <motion.button
//                         onClick={handleLogout}
//                         className="w-full flex items-center justify-between p-4 text-red-500 font-extralight rounded-lg hover:bg-red-600/20 transition-all duration-300 group uppercase mt-4 border border-red-600/30"
//                       >
//                         <span>Logout</span>
//                         <FiLogOut className="w-5 h-5" />
//                       </motion.button>
//                     </div>
//                   </div>
//                 )}
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
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiSearch,
  FiUser,
  FiLogOut,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import { GiCheckeredFlag } from "react-icons/gi";
import logo1 from "../assets/images/white-spectr-logo.png";
import logo from "../assets/images/sp_logo1_white2.png";

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  // State for mobile accordion menu
  const [expandedMobileDropdown, setExpandedMobileDropdown] = useState(null);

  // Dynamic user state - loads from localStorage
  const [user, setUser] = useState({
    name: "",
    isLoggedIn: false,
    email: "",
    phone: "",
  });

  // Function to load user from localStorage
  const loadUserFromStorage = () => {
    try {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (savedUser && token) {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          name: parsedUser.name || "User",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
          isLoggedIn: true,
        });
        return true;
      } else {
        setUser({
          name: "",
          isLoggedIn: false,
          email: "",
          phone: "",
        });
        return false;
      }
    } catch (error) {
      console.error("Error loading user:", error);
      setUser({
        name: "",
        isLoggedIn: false,
        email: "",
        phone: "",
      });
      return false;
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  // Load user data on component mount
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // Listen for storage changes (when profile is updated in another tab/component)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        loadUserFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Poll for user changes every 2 seconds (for same-tab updates)
  useEffect(() => {
    const interval = setInterval(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser.name !== user.name) {
            loadUserFromStorage();
          }
        } catch (error) {
          console.error("Error parsing user:", error);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [user.name]);

  // Update user when location changes (after login/register)
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/profile") {
      loadUserFromStorage();
    }
  }, [location.pathname]);

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

  // Click outside handler - won't close search/profile when clicking inside them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".search-container")) {
        return;
      }

      if (event.target.closest(".profile-dropdown-container")) {
        return;
      }

      setOpenDropdown(null);
      setIsProfileOpen(false);
      setIsSearchOpen(false);
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setScrolled(isScrolled);
  }, [isScrolled]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

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

    setIsMobileMenuOpen(false);
    setExpandedMobileDropdown(null);
  };

  // Helper to toggle mobile dropdown
  const toggleMobileDropdown = (name) => {
    setExpandedMobileDropdown((prev) => (prev === name ? null : name));
  };

  // Logout - Navigate to /login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Reset user state immediately
    setUser({
      name: "",
      isLoggedIn: false,
      email: "",
      phone: "",
    });
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);

    navigate("/login");
  };

  // Get user initial for avatar (first letter of name)
  const getUserInitial = () => {
    if (user.name && user.name.trim()) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U"; // Default to "U" for User if no name
  };

  // Close search only when cancel button clicked
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  // Handle profile navigation
  const handleProfileNavigation = (path) => {
    navigate(path);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans ${
          scrolled ? "bg-black/70 px-2 md:px-8" : "bg-black/10 px-2 md:px-8"
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
          <div className="flex items-center justify-between relative w-full">
            {/* LEFT: LOGO */}
            <motion.div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 group select-none flex-shrink-0"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-xl flex items-center">
                  <img
                    src={logo1}
                    alt="Spektr Racing"
                    className="w-8 h-8 md:w-12 md:h-12 object-contain"
                  />
                  <img
                    src={logo}
                    alt="Spektr Racing"
                    className="w-20 h-10 ml-1 md:w-36 md:h-14 object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* CENTER: NAVIGATION (WHITE COLOR) */}
            <nav className="hidden lg:flex items-center space-x-1 font-sans text-sm md:text-md uppercase absolute left-1/2 transform -translate-x-1/2">
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
                    className="px-4 py-2 text-white hover:bg-white/20 transition-colors"
                  >
                    {item.name}
                  </motion.button>

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

              {rightNavItems.map((item, index) => (
                <motion.button
                  onClick={() => handleNavigation(item.sectionId)}
                  key={item.name}
                  className="relative px-4 py-2 text-white hover:bg-white/20 group md:text-md transition-colors"
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
            </nav>

            {/* RIGHT: CONTACT + SEARCH + AVATAR */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              {/* Contact Link */}
              <motion.button
                className="px-4 py-2 text-white hover:bg-white/20 text-md uppercase transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact-us">Contact</Link>
              </motion.button>

              {/* Search with Input Box - Only closes with X button */}
              <div
                className="relative flex items-center search-container"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="relative p-2 text-white border-2 border-red-500 rounded-full hover:bg-red-600/30 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/search"); // Navigate to search page
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <FiSearch size={18} />
                </motion.button>
              </div>

              {/* Profile Dropdown (Avatar with User Initial) */}
              <div
                className="relative profile-dropdown-container"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className={`relative p-2 w-10 h-10 flex items-center justify-center bg-red-500 text-white border-2 rounded-full hover:bg-red-400 transition-all font-bold ${
                    user.isLoggedIn ? "border-red-500" : "border-gray-500"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (user.isLoggedIn) {
                      setIsProfileOpen(!isProfileOpen);
                    } else {
                      navigate("/login");
                    }
                    setOpenDropdown(null);
                    setIsSearchOpen(false);
                  }}
                  title={
                    user.isLoggedIn ? `Logged in as ${user.name}` : "Login"
                  }
                >
                  {getUserInitial()}
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && user.isLoggedIn && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-56 bg-black shadow-xl z-50 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* User Name & Email */}
                      <div className="px-6 py-4 border-b border-gray-700">
                        <p className="text-white text-lg font-semibold">
                          {user.name || "User"}
                        </p>
                        {user.email && (
                          <p className="text-gray-400 text-sm mt-1 truncate">
                            {user.email}
                          </p>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {/* <button
                          onClick={() => handleProfileNavigation("/profile")}
                          className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium flex items-center gap-3"
                        >
                          <FiUser size={16} />
                          Profile
                        </button>
                        <button
                          onClick={() => handleProfileNavigation("/history")}
                          className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium flex items-center gap-3"
                        >
                          History
                        </button>
                        <button
                          onClick={() =>
                            handleProfileNavigation("/address-list")
                          }
                          className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium flex items-center gap-3"
                        >
                          Address List
                        </button> */}
                        <button
                          onClick={() => handleProfileNavigation("/profile")}
                          className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium flex items-center gap-3"
                        >
                          <FiUser size={16} />
                          Profile
                        </button>

                        <button
                          onClick={() => handleProfileNavigation("/history")}
                          className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium flex items-center gap-3"
                        >
                          <FiClock size={16} />
                          History
                        </button>

                        <button
                          onClick={() =>
                            handleProfileNavigation("/address-list")
                          }
                          className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium flex items-center gap-3"
                        >
                          <FiMapPin size={16} />
                          Address List
                        </button>
                      </div>

                      {/* Logout Button - Navigates to /login */}
                      <div className="border-t border-gray-700 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full px-6 py-3 text-left text-white hover:bg-red-600/30 transition-colors font-medium flex items-center gap-3"
                        >
                          <FiLogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

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
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="absolute right-0 top-20 h-full w-72 sm:w-80 bg-black shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <nav className="p-6 overflow-y-auto h-full pb-32 font-sans">
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-bold">
                      Menu
                    </p>
                    <div className="space-y-1">
                      {leftNavItems.map((item, index) => (
                        <div key={item.name}>
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

                    <motion.button
                      className="relative w-full p-4 text-left text-white hover:bg-white/20 text-md font-extralight uppercase mt-4 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Link to="/contact-us">Contact</Link>
                    </motion.button>

                    <form onSubmit={handleSearchSubmit} className="mt-4">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full px-4 py-3 bg-white/10 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </form>
                  </div>
                </div>

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

                {user.isLoggedIn && (
                  <div className="mt-8 pt-8 border-t border-gray-800">
                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-bold">
                      Account
                    </p>
                    <div className="space-y-2">
                      {/* User Info Card */}
                      <div className="px-4 py-4 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/30">
                        <div className="flex items-center gap-3">
                          {/* Avatar Circle */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {getUserInitial()}
                          </div>
                          {/* User Details */}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold truncate">
                              {user.name || "User"}
                            </p>
                            {user.email && (
                              <p className="text-gray-400 text-sm truncate">
                                {user.email}
                              </p>
                            )}
                            {user.phone && (
                              <p className="text-gray-500 text-xs mt-1">
                                +{user.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <motion.button
                        onClick={() => handleProfileNavigation("/profile")}
                        className="w-full flex items-center justify-between p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group uppercase"
                      >
                        <span>Profile</span>
                        <FiUser className="w-5 h-5 text-gray-400" />
                      </motion.button>

                      <motion.button
                        onClick={() => handleProfileNavigation("/history")}
                        className="w-full flex items-center justify-between p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group uppercase"
                      >
                        <span>History</span>
                      </motion.button>

                      <motion.button
                        onClick={() => handleProfileNavigation("/address-list")}
                        className="w-full flex items-center justify-between p-4 text-white font-extralight rounded-lg hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-300 group uppercase"
                      >
                        <span>Address List</span>
                      </motion.button>

                      <motion.button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between p-4 text-red-500 font-extralight rounded-lg hover:bg-red-600/20 transition-all duration-300 group uppercase mt-4 border border-red-600/30"
                      >
                        <span>Logout</span>
                        <FiLogOut className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {!user.isLoggedIn && (
                  <div className="mt-8 pt-8 border-t border-gray-800">
                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-bold">
                      Account
                    </p>
                    <motion.button
                      onClick={() => {
                        navigate("/login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Login / Register</span>
                      <FiUser className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
