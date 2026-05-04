// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import logo from "../assets/images/white-spectr-logo.png";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
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
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       if (formData.email && formData.password) {
//         localStorage.setItem("token", "mock-jwt-token-12345");
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             name: "Alex Johnson",
//             email: formData.email,
//             isLoggedIn: true,
//           }),
//         );

//         navigate("/");
//       } else {
//         setError("Please fill in all fields");
//       }
//     } catch (err) {
//       setError("Invalid email or password");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 font-sans">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <div className="text-center mb-8">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring" }}
//             className="inline-block"
//           >
//             <img
//               src={logo}
//               alt="Spektr Racing"
//               className="w-24 h-24 mx-auto mb-4"
//             />
//           </motion.div>
//           <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
//           <p className="text-gray-400">Sign in to your account</p>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
//         >
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm"
//               >
//                 {error}
//               </motion.div>
//             )}

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300">Email</label>
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
//                   placeholder="Enter your email"
//                   className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300">
//                 Password
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
//                   placeholder="Enter your password"
//                   className="w-full pl-12 pr-12 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//                 >
//                   {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-red-400 hover:text-red-300 transition-colors"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             <motion.button
//               type="submit"
//               disabled={isLoading}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all ${
//                 isLoading
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-red-600/25"
//               }`}
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                       fill="none"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   Signing in...
//                 </span>
//               ) : (
//                 "Sign In"
//               )}
//             </motion.button>
//           </form>

//           <div className="my-6 flex items-center">
//             <div className="flex-1 border-t border-white/10"></div>
//             <span className="px-4 text-sm text-gray-500">OR</span>
//             <div className="flex-1 border-t border-white/10"></div>
//           </div>

//           <button
//             type="button"
//             className="w-full py-3 px-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
//           >
//             <svg className="w-5 h-5" viewBox="0 0 24 24">
//               <path
//                 fill="#4285F4"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
//               />
//               <path
//                 fill="#34A853"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="#FBBC05"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="#EA4335"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Continue with Google
//           </button>

//           <p className="mt-6 text-center text-gray-400">
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="text-red-400 hover:text-red-300 font-semibold transition-colors"
//             >
//               Sign up
//             </Link>
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginPage;

// pages/LoginPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPhone, FiArrowLeft } from "react-icons/fi";
import logo from "../assets/images/white-spectr-logo.png";
import Header from "../components/Header";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebasebase/firebase";
import { removeWhitespaces } from "../utils/stringUtils";
import { checkUser } from "../services/authservices/authservice";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const otpInputRefs = useRef([]);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Get phone number from location state if coming from register page
  useEffect(() => {
    if (location.state?.phone) {
      setPhoneNumber(location.state.phone);
    }
  }, [location.state]);

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && showOtpInput) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, showOtpInput]);

  // Auto-focus next OTP input
  useEffect(() => {
    if (showOtpInput) {
      const firstEmptyIndex = otp.findIndex((digit) => digit === "");
      if (firstEmptyIndex !== -1) {
        otpInputRefs.current[firstEmptyIndex]?.focus();
      }
    }
  }, [otp, showOtpInput]);

  const setupRecaptcha = (containerId) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: "invisible", // or 'normal'
        callback: (response) => {},
      });
    } else {
      console.log("error launching !window.recaptchaVerifier");
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setupRecaptcha("recaptcha-container");
    const appVerifier = window.recaptchaVerifier;
    const phNumber = "+91" + phoneNumber;

    try {
      if (phoneNumber.length >= 10) {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phNumber,
          appVerifier,
        );
        window.confirmationResult = confirmationResult;
        setShowOtpInput(true);
        setTimer(60); // 60 seconds timer
        setOtp(["", "", "", "", "", ""]);
      } else {
        setError("Please enter a valid phone number");
      }
    } catch (error) {
      console.error("SMS not sent", error);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace - go to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split("").forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      setError("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const otpString = otp.join("");

      if (otpString.length === 6) {
        try {
          const result = await window.confirmationResult.confirm(otpString);
          const user = result.user;
          console.log("User signed in successfully:", user);
          validateUser();
        } catch (error) {
          console.error("Invalid verification code", error);
          setError("Invalid OTP. Please try again.");
        }
      } else {
        setError("Please enter complete OTP");
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPhone = () => {
    setShowOtpInput(false);
    setTimer(0);
    setOtp(["", "", "", "", "", ""]);
  };

  const validateUser = async () => {
    const fullPhoneNumber = phoneNumber;
    const phoneNum = removeWhitespaces(fullPhoneNumber);
    setIsLoading(true);
    try {
      const response = await checkUser(phoneNum);
      console.log(
        "check user Resp",
        response,
        response.result?.email ?? "",
        response.result?.name ?? "",
      );
      updateUser(response);
    } catch (error) {
      // The error is already logged by our api.js interceptor
      // We just need to display a message to the user
      if (error.response?.data?.message == "User does not exist") {
        // User doesn't exist - redirect to register with phone number
        setError("Number not registered. Please sign up first.");
        setTimeout(() => {
          navigate("/register", { state: { phone: phoneNumber } });
        }, 1500);
      } else {
        setError(
          error.response?.data?.message || "Login failed. Please try again.",
        );
        // setShowOtpInput(false);
        // setOtpCode("");
        handleEditPhone();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (e) => {
    // Check if user already exists with this phone
    // Mock OTP verification - check if user exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = existingUsers.find((u) => u.phone === phoneNumber);

    console.log(e, 'the user resp');
    if (existingUser) {
      localStorage.setItem("@auth_token", "mock-jwt-token-12345");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...existingUser,
          isLoggedIn: true,
        }),
      );
      navigate("/");

      return;
    }

    // Create new user object
    const newUser = {
      id: e.result?.id ?? "",
      name: e.result?.name ?? "",
      email: e?.result.email ?? "",
      phone: phoneNumber,
      createdAt: new Date().toISOString(),
    };

    // Save to users list in localStorage
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Set as current logged-in user
    localStorage.setItem("@auth_token", "mock-jwt-token-12345");

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...newUser,
        isLoggedIn: true,
      }),
    );
    navigate("/");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 font-sans">
      <Header isScrolled={false} />
      <div id="recaptcha-container"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block"
          >
            <img
              src={logo}
              alt="Spektr Racing"
              className="w-24 h-24 mx-auto mb-4"
            />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {showOtpInput ? "Verify OTP" : "Welcome Spektr"}
          </h1>
          <p className="text-gray-400">
            {showOtpInput
              ? `Enter the code sent to ${phoneNumber}`
              : "Sign in to your account"}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {!showOtpInput ? (
            /* PHONE NUMBER INPUT */
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) setPhoneNumber(value);
                    }}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-lg tracking-wider"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading || phoneNumber.length < 10}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all ${
                  isLoading || phoneNumber.length < 10
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
                    Sending OTP...
                  </span>
                ) : (
                  "Send OTP"
                )}
              </motion.button>
            </form>
          ) : (
            /* OTP INPUT */
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {/* Display phone number with edit option */}
              <div className="flex items-center justify-between bg-black/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <FiPhone className="text-gray-400" size={16} />
                  <span className="text-white font-medium">{phoneNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={handleEditPhone}
                  className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
                >
                  Edit
                </button>
              </div>

              {/* OTP Input Boxes */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-300">
                  Enter 6-digit OTP
                </label>
                <div
                  className="flex gap-2 justify-between"
                  onPaste={handleOtpPaste}
                >
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-bold bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Timer and Resend */}
              <div className="flex items-center justify-between text-sm">
                {timer > 0 ? (
                  <span className="text-gray-400">
                    Resend OTP in{" "}
                    <span className="text-red-400 font-mono font-bold">
                      {formatTime(timer)}
                    </span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-red-400 hover:text-red-300 font-medium transition-colors disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading || otp.some((digit) => !digit)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all ${
                  isLoading || otp.some((digit) => !digit)
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-red-500 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-red-600/25"
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
                    Verifying...
                  </span>
                ) : (
                  "Verify & Sign In"
                )}
              </motion.button>
            </form>
          )}

          {!showOtpInput && (
            <p className="mt-6 text-center text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-red-600 hover:text-red-400 font-semibold transition-colors"
              >
                Sign up
              </button>
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
