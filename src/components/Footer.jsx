// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
// import logo from "../assets/images/spektr.jpeg";
import logo from "../assets/images/white-spectr-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-900 py-6 px-4 md:px-8">
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
              <div className="relative">
                <div className="absolute inset-0  blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <img
                    src={logo}
                    alt="Spektr Racing"
                    className="w-10 h-10 md:w-13 md:h-13 object-contain"
                  />
                </div>
              </div>

              <div className="sm:flex flex-col leading-none">
                <h1 className="font-myfont text-xl md:text-2xl font-bold tracking-[0.12em] text-white">
                  SPEKTR
                </h1>
                <h2 className="font-myfont text-md md:text-lg font-bold tracking-[0.12em] text-white text-center">
                  - RACING -
                </h2>
              </div>
            </motion.a>
            <p className="text-white pt-4 md:pl-4 font-sans text-md">
              Wear Confidene. Ride Fearless
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-extralight mb-4">QUiICK LINKS</h4>
            <ul className="space-y-2 font-sans text-md">
              <li className="text-white hover:text-red-600 transition-colors">
                <a href="#">Shop</a>
              </li>
              <li className="text-white hover:text-red-600 transition-colors">
                <a href="#">About Us</a>
              </li>
              <li className="text-white hover:text-red-600 transition-colors">
                <a href="#">Racing Team</a>
              </li>
              <li className="text-white hover:text-red-600 transition-colors">
                <a href="#">Events</a>
              </li>
              <li className="text-white hover:text-red-600 transition-colors">
                <Link to="/contact-us">Contact Us</Link>
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
            <h4 className="text-lg font-extralight mb-4">POLICIES</h4>
            {/* <h4 className="text-red-500 font-semibold mb-3">POLICIES</h4> */}
            <ul className="space-y-2 text-md font-sans">
              <li className="text-white hover:text-red-600 transition-colors">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="text-white hover:text-red-600 transition-colors">
                <Link to="/terms-of-service">Terms of Service</Link>
              </li>
              <li className="text-white hover:text-red-600 transition-colors">
                <Link to="/shipping-policy">Shipping Policy</Link>
              </li>
              <li className="text-white hover:text-red-600 transition-colors">
                <Link to="/refund-return-policy">Refund & Return</Link>
              </li>
              <li className="text-white hover:text-red-600 transition-colors">
                <Link to="/warranty-policy">Warranty Policy</Link>
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
                className="w-12 h-12 bg-black border border-gray-900 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-black border border-gray-900 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-black border border-gray-900 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-black border border-gray-900 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaYoutube />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-900 pt-8 text-center text-md text-gray-400 font-sans">
          <p>© {currentYear} Wear Confidene. Ride Fearless</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
