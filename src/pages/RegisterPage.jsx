// // pages/RegisterPage.jsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FiUser,
//   FiMail,
//   FiLock,
//   FiPhone,
//   FiEye,
//   FiEyeOff,
// } from "react-icons/fi";
// import logo from "../assets/images/white-spectr-logo.png";

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       if (formData.password !== formData.confirmPassword) {
//         setError("Passwords do not match");
//         return;
//       }

//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       if (formData.name && formData.email && formData.password) {
//         localStorage.setItem("token", "mock-jwt-token-12345");
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             name: formData.name,
//             email: formData.email,
//             phone: formData.phone,
//             isLoggedIn: true,
//           }),
//         );

//         navigate("/");
//       } else {
//         setError("Please fill in all required fields");
//       }
//     } catch (err) {
//       setError("Registration failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 py-8 font-sans">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <div className="text-center mb-8">
//           <img
//             src={logo}
//             alt="Spektr Racing"
//             className="w-24 h-24 mx-auto mb-4"
//           />
//           <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
//           <p className="text-gray-400">Join Spektr Racing today</p>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
//         >
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {error && (
//               <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300">
//                 Full Name *
//               </label>
//               <div className="relative">
//                 <FiUser
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300">
//                 Email *
//               </label>
//               <div className="relative">
//                 <FiMail
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="john@example.com"
//                   className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <FiPhone
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="+91 98765 43210"
//                   className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300">
//                 Password *
//               </label>
//               <div className="relative">
//                 <FiLock
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Min. 8 characters"
//                   className="w-full pl-12 pr-12 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
//                 >
//                   {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300">
//                 Confirm Password *
//               </label>
//               <div className="relative">
//                 <FiLock
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Re-enter password"
//                   className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
//                   required
//                 />
//               </div>
//             </div>

//             <motion.button
//               type="submit"
//               disabled={isLoading}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className={`w-full py-3 px-4 rounded-xl font-semibold text-white mt-6 ${
//                 isLoading
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg"
//               }`}
//             >
//               {isLoading ? "Creating Account..." : "Create Account"}
//             </motion.button>
//           </form>

//           <p className="mt-6 text-center text-gray-400">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-blue-400 hover:text-blue-300 font-semibold"
//             >
//               Sign in
//             </Link>
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default RegisterPage;

// pages/RegisterPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiArrowLeft } from "react-icons/fi";
import logo from "../assets/images/white-spectr-logo.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get phone number from login page state
  const initialPhone = location.state?.phone || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: initialPhone,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Update phone when location state changes
  useEffect(() => {
    if (location.state?.phone) {
      setFormData((prev) => ({ ...prev, phone: location.state.phone }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setFormData({ ...formData, phone: value });
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Validation
      if (!formData.name.trim()) {
        setError("Please enter your full name");
        return;
      }

      if (!formData.email.trim()) {
        setError("Please enter your email address");
        return;
      }

      if (!formData.phone || formData.phone.length < 10) {
        setError("Please enter a valid phone number");
        return;
      }

      // Check if user already exists with this phone
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = existingUsers.find(
        (u) => u.phone === formData.phone,
      );

      if (existingUser) {
        setError(
          "An account with this phone number already exists. Please login instead.",
        );
        return;
      }

      // Create new user object
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      };

      // Save to users list in localStorage
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Set as current logged-in user
      localStorage.setItem("token", "mock-jwt-token-12345");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...newUser,
          isLoggedIn: true,
        }),
      );

      setSuccessMessage("Account created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 py-8 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        {initialPhone && (
          <motion.button
            onClick={() =>
              navigate("/login", { state: { phone: formData.phone } })
            }
            className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <FiArrowLeft size={18} />
            <span>Back to Login</span>
          </motion.button>
        )}

        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Spektr Racing"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">
            {initialPhone
              ? `Complete your registration for ${initialPhone}`
              : "Join Spektr Racing today"}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-lg text-sm"
              >
                {successMessage}
              </motion.div>
            )}

            {/* Phone Number (Pre-filled or Read-only if from login) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FiPhone size={16} />
                Phone Number *
                {initialPhone && (
                  <span className="text-xs text-blue-400">(from login)</span>
                )}
              </label>
              <div className="relative">
                <FiPhone
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full pl-12 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all ${
                    initialPhone ? "font-semibold" : ""
                  }`}
                  required
                  readOnly={!!initialPhone}
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FiUser size={16} />
                Full Name *
              </label>
              <div className="relative">
                <FiUser
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FiMail size={16} />
                Email Address *
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white mt-6 transition-all ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-red-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-red-600/25"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          {!initialPhone && (
            <p className="mt-6 text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Sign in
              </Link>
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
