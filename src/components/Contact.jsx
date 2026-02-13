// components/Contact.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaCheck,
  FaArrowRight,
  FaYoutube,
} from "react-icons/fa";
import { GiCheckeredFlag } from "react-icons/gi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(formData);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      label: "Email Us",
      value: "contact@spektrracing.com",
      href: "mailto:contact@spektrracing.com",
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      label: "Call Us",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      label: "Visit Us",
      value: "123 Racing Street, Speed City, SC 12345",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaYoutube />, href: "#" },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-20 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <GiCheckeredFlag className="w-4 h-4 text-red-600" />
            <span className="text-red-600 text-sm font-semibold">
              GET IN TOUCH
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6">
            <span className="text-white">LET'S</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 ml-4">
              RACE TOGETHER
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to elevate your racing experience? Our team is here to help
            you find the perfect gear and answer all your questions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="group flex items-center gap-4 p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl hover:border-red-600/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                  }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm font-medium">
                      {info.label}
                    </p>
                    <p className="text-white font-semibold">{info.value}</p>
                  </div>
                  <FaArrowRight className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="pt-8 border-t border-gray-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-500 text-sm font-medium mb-4">
                Follow Us
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Decorative Element */}
            <motion.div
              className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 0.3, rotate: 360 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "linear" }}
            >
              <GiCheckeredFlag className="w-64 h-64 text-red-600" />
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Form Container */}
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 lg:p-10">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-600 to-orange-600 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>

              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-600 focus:bg-black/70 transition-all duration-300 text-white placeholder-gray-600"
                      placeholder="John Doe"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-600 focus:bg-black/70 transition-all duration-300 text-white placeholder-gray-600"
                      placeholder="john@example.com"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-600 focus:bg-black/70 transition-all duration-300 text-white placeholder-gray-600"
                    placeholder="+1 (555) 123-4567"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl focus:outline-none focus:border-red-600 focus:bg-black/70 transition-all duration-300 text-white placeholder-gray-600 resize-none"
                    placeholder="Tell us about your racing needs..."
                    required
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-red-600/25 transition-all duration-300 flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                      />
                    ) : isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <FaCheck className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        className="flex items-center gap-2"
                      >
                        Send Message
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
