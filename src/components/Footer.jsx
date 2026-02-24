// components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
// import logo from "../assets/images/spektr.jpeg";
import logo from "../assets/images/white-spectr-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-900 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.a
              href="#"
              className="flex items-center gap-3 group select-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Logo Container */}
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0  blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Logo */}
                <div className="relative">
                  <img
                    src={logo}
                    alt="Spektr Racing"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>

              {/* Brand Text */}
              <div className="flex flex-col leading-none">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  SPEKTR<span className="text-red-600">RACING</span>
                </h1>
                {/* <span className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Built For Speed
                </span> */}
              </div>
            </motion.a>
            <p className="text-gray-400 pt-4 md:pl-4">
              Built for Speed. Designed for Champions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-extralight mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Racing Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Events
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaYoutube />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-900 pt-8 text-center text-gray-400">
          <p>© {currentYear} Racing Brand. Built for Speed.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
