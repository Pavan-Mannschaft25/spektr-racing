// pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEdit2,
  FiSave,
  FiCamera,
} from "react-icons/fi";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+91 98765 43210",
    avatar: null,
  });
  const [tempData, setTempData] = useState(userData);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserData(parsedUser);
      setTempData(parsedUser);
    }
  }, []);

  const handleEdit = () => {
    setTempData(userData);
    setIsEditing(true);
    setSaveMessage("");
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUserData(tempData);
    localStorage.setItem("user", JSON.stringify(tempData));
    setIsEditing(false);
    setSaveMessage("Profile updated successfully!");

    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your personal information</p>
        </motion.div>

        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-500/20 border border-green-500 text-green-200 px-6 py-3 rounded-lg"
          >
            {saveMessage}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  userData.name?.charAt(0)?.toUpperCase() || "A"
                )}
              </div>
              {isEditing && (
                <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiCamera className="text-white" size={24} />
                </button>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
              <p className="text-gray-400">Member since January 2024</p>
            </div>
            {!isEditing ? (
              <motion.button
                onClick={handleEdit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <FiEdit2 size={16} />
                Edit Profile
              </motion.button>
            ) : (
              <div className="flex gap-3">
                <motion.button
                  onClick={handleCancel}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <FiSave size={16} />
                  Save
                </motion.button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FiUser size={16} />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.name}
                  onChange={(e) =>
                    setTempData({ ...tempData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              ) : (
                <div className="px-4 py-3 bg-black/20 rounded-xl text-gray-300">
                  {userData.name}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FiMail size={16} />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={tempData.email}
                  onChange={(e) =>
                    setTempData({ ...tempData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              ) : (
                <div className="px-4 py-3 bg-black/20 rounded-xl text-gray-300">
                  {userData.email}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FiPhone size={16} />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={tempData.phone}
                  onChange={(e) =>
                    setTempData({ ...tempData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              ) : (
                <div className="px-4 py-3 bg-black/20 rounded-xl text-gray-300">
                  {userData.phone || "Not provided"}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
