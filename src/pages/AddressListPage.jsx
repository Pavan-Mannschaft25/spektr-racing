// // pages/AddressListPage.jsx
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiMapPin,
//   FiPlus,
//   FiEdit2,
//   FiTrash2,
//   FiCheck,
//   FiX,
// } from "react-icons/fi";

// const AddressListPage = () => {
//   const [addresses, setAddresses] = useState([
//     {
//       id: 1,
//       label: "Home",
//       name: "Alex Johnson",
//       phone: "+91 98765 43210",
//       address: "123 Racing Street, Motorsport City",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       pincode: "600001",
//       isDefault: true,
//     },
//     {
//       id: 2,
//       label: "Office",
//       name: "Alex Johnson",
//       phone: "+91 98765 43210",
//       address: "456 Corporate Avenue, Business Park",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       pincode: "600034",
//       isDefault: false,
//     },
//   ]);

//   const [isAddingNew, setIsAddingNew] = useState(false);
//   const [newAddress, setNewAddress] = useState({
//     label: "Home",
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const handleAddAddress = () => {
//     if (!newAddress.name || !newAddress.address || !newAddress.city) return;

//     const address = {
//       ...newAddress,
//       id: Date.now(),
//       isDefault: addresses.length === 0,
//     };

//     setAddresses([...addresses, address]);
//     setNewAddress({
//       label: "Home",
//       name: "",
//       phone: "",
//       address: "",
//       city: "",
//       state: "",
//       pincode: "",
//     });
//     setIsAddingNew(false);
//   };

//   const handleSetDefault = (id) => {
//     setAddresses(
//       addresses.map((addr) => ({
//         ...addr,
//         isDefault: addr.id === id,
//       })),
//     );
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this address?")) {
//       setAddresses(addresses.filter((addr) => addr.id !== id));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black pt-24 pb-12 px-4 font-sans">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8 flex items-center justify-between"
//         >
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">Address Book</h1>
//             <p className="text-gray-400">Manage your delivery addresses</p>
//           </div>

//           {!isAddingNew && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsAddingNew(true)}
//               className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-red-600/25 transition-all"
//             >
//               <FiPlus size={18} />
//               Add New
//             </motion.button>
//           )}
//         </motion.div>

//         <AnimatePresence>
//           {isAddingNew && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="mb-6 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
//             >
//               <h3 className="text-xl font-bold text-white mb-4">
//                 Add New Address
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm text-gray-300 mb-2">
//                     Label
//                   </label>
//                   <select
//                     value={newAddress.label}
//                     onChange={(e) =>
//                       setNewAddress({ ...newAddress, label: e.target.value })
//                     }
//                     className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500"
//                   >
//                     <option>Home</option>
//                     <option>Office</option>
//                     <option>Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-300 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     value={newAddress.name}
//                     onChange={(e) =>
//                       setNewAddress({ ...newAddress, name: e.target.value })
//                     }
//                     placeholder="Enter name"
//                     className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-300 mb-2">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     value={newAddress.phone}
//                     onChange={(e) =>
//                       setNewAddress({ ...newAddress, phone: e.target.value })
//                     }
//                     placeholder="Enter phone number"
//                     className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-300 mb-2">
//                     Pincode
//                   </label>
//                   <input
//                     type="text"
//                     value={newAddress.pincode}
//                     onChange={(e) =>
//                       setNewAddress({ ...newAddress, pincode: e.target.value })
//                     }
//                     placeholder="Enter pincode"
//                     className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm text-gray-300 mb-2">
//                     Address
//                   </label>
//                   <textarea
//                     value={newAddress.address}
//                     onChange={(e) =>
//                       setNewAddress({ ...newAddress, address: e.target.value })
//                     }
//                     placeholder="House No., Street, Area"
//                     rows={3}
//                     className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-300 mb-2">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     value={newAddress.city}
//                     onChange={(e) =>
//                       setNewAddress({ ...newAddress, city: e.target.value })
//                     }
//                     placeholder="Enter city"
//                     className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-300 mb-2">
//                     State
//                   </label>
//                   <input
//                     type="text"
//                     value={newAddress.state}
//                     onChange={(e) =>
//                       setNewAddress({ ...newAddress, state: e.target.value })
//                     }
//                     placeholder="Enter state"
//                     className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-3 mt-6">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   onClick={handleAddAddress}
//                   className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
//                 >
//                   <FiCheck size={18} />
//                   Save Address
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => setIsAddingNew(false)}
//                   className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
//                 >
//                   <FiX size={18} />
//                   Cancel
//                 </motion.button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {addresses.map((address, index) => (
//             <motion.div
//               key={address.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border ${
//                 address.isDefault ? "border-red-500" : "border-white/10"
//               } hover:border-red-500/30 transition-all relative`}
//             >
//               {address.isDefault && (
//                 <div className="absolute -top-3 right-6 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
//                   DEFAULT
//                 </div>
//               )}

//               <div className="flex items-start gap-4 mb-4">
//                 <div className="p-3 bg-red-600/20 rounded-xl">
//                   <FiMapPin className="text-red-500" size={24} />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <h3 className="text-white font-bold text-lg">
//                       {address.label}
//                     </h3>
//                     <span className="text-gray-500 text-sm">•</span>
//                     <span className="text-gray-400 text-sm">
//                       {address.name}
//                     </span>
//                   </div>
//                   <p className="text-gray-400 text-sm">{address.phone}</p>
//                 </div>
//               </div>

//               <div className="space-y-1 text-gray-300 text-sm mb-4">
//                 <p>{address.address}</p>
//                 <p>
//                   {address.city}, {address.state} - {address.pincode}
//                 </p>
//               </div>

//               <div className="flex items-center gap-3 pt-4 border-t border-white/10">
//                 {!address.isDefault && (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     onClick={() => handleSetDefault(address.id)}
//                     className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
//                   >
//                     Set as Default
//                   </motion.button>
//                 )}

//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   className="ml-auto p-2 text-gray-400 hover:text-white transition-colors"
//                 >
//                   <FiEdit2 size={16} />
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   onClick={() => handleDelete(address.id)}
//                   className="p-2 text-gray-400 hover:text-red-500 transition-colors"
//                 >
//                   <FiTrash2 size={16} />
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {addresses.length === 0 && !isAddingNew && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-16 bg-white/5 rounded-2xl border border-white/10"
//           >
//             <FiMapPin className="mx-auto text-gray-600 mb-4" size={48} />
//             <p className="text-gray-400 text-lg">No addresses saved</p>
//             <p className="text-gray-500 text-sm mt-2">
//               Add an address for faster checkout
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddressListPage;

// pages/AddressListPage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiSave,
} from "react-icons/fi";

const AddressListPage = () => {
  // State management
  const [addresses, setAddresses] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null); // Track which address is being edited

  // Form states
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [editFormData, setEditFormData] = useState({}); // For editing existing address
  const [error, setError] = useState("");

  // Load addresses from localStorage on mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem("addresses");
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    } else {
      // Default sample data if no saved addresses
      const defaultAddresses = [
        {
          id: 1,
          label: "Home",
          name: "Alex Johnson",
          phone: "+91 98765 43210",
          address: "123 Racing Street, Motorsport City",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "600001",
          isDefault: true,
        },
        {
          id: 2,
          label: "Office",
          name: "Alex Johnson",
          phone: "+91 98765 43210",
          address: "456 Corporate Avenue, Business Park",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "600034",
          isDefault: false,
        },
      ];
      setAddresses(defaultAddresses);
      localStorage.setItem("addresses", JSON.stringify(defaultAddresses));
    }
  }, []);

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem("addresses", JSON.stringify(addresses));
    }
  }, [addresses]);

  // Reset new address form
  const resetNewAddressForm = () => {
    setNewAddress({
      label: "Home",
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
    setError("");
  };

  // Validate address form
  const validateAddressForm = (formData) => {
    if (!formData.name?.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.address?.trim()) {
      setError("Address is required");
      return false;
    }
    if (!formData.city?.trim()) {
      setError("City is required");
      return false;
    }
    if (!formData.state?.trim()) {
      setError("State is required");
      return false;
    }
    if (!formData.pincode?.trim()) {
      setError("Pincode is required");
      return false;
    }
    return true;
  };

  // Handle adding new address
  const handleAddAddress = () => {
    if (!validateAddressForm(newAddress)) return;

    const address = {
      ...newAddress,
      id: Date.now(),
      isDefault: addresses.length === 0, // First address becomes default
    };

    setAddresses([...addresses, address]);
    resetNewAddressForm();
    setIsAddingNew(false);
  };

  // Start editing an address
  const handleStartEdit = (address) => {
    setEditingId(address.id);
    setEditFormData({ ...address }); // Clone the address data
    setError("");
    setIsAddingNew(false); // Close add form if open
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
    setError("");
  };

  // Save edited address
  const handleSaveEdit = () => {
    if (!validateAddressForm(editFormData)) return;

    setAddresses(
      addresses.map((addr) =>
        addr.id === editingId ? { ...editFormData } : addr,
      ),
    );
    setEditingId(null);
    setEditFormData({});
    setError("");
  };

  // Handle input changes for edit form
  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  // Set default address
  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
  };

  // Delete address
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updatedAddresses = addresses.filter((addr) => addr.id !== id);

      // If we're deleting the default address and there are other addresses, make the first one default
      if (updatedAddresses.length > 0) {
        const wasDefault = addresses.find((addr) => addr.id === id)?.isDefault;
        if (wasDefault) {
          updatedAddresses[0].isDefault = true;
        }
      }

      setAddresses(updatedAddresses);

      // If we were editing this address, cancel edit mode
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  // Render address form (reusable for add/edit)
  const renderAddressForm = (
    formData,
    handleChange,
    onSubmit,
    onCancel,
    isEditing = false,
  ) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 ${isEditing ? "mt-4" : "mb-6"}`}
    >
      <h3 className="text-xl font-bold text-white mb-4">
        {isEditing ? "Edit Address" : "Add New Address"}
      </h3>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Label */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Label *</label>
          <select
            value={formData.label}
            onChange={(e) => handleChange("label", e.target.value)}
            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
          >
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter full name"
            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Pincode *</label>
          <input
            type="text"
            value={formData.pincode || ""}
            onChange={(e) => handleChange("pincode", e.target.value)}
            placeholder="Enter pincode"
            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-300 mb-2">Address *</label>
          <textarea
            value={formData.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="House No., Street, Area, Landmark"
            rows={3}
            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">City *</label>
          <input
            type="text"
            value={formData.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Enter city"
            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">State *</label>
          <input
            type="text"
            value={formData.state || ""}
            onChange={(e) => handleChange("state", e.target.value)}
            placeholder="Enter state"
            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSubmit}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg"
        >
          <FiSave size={18} />
          {isEditing ? "Update Address" : "Save Address"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
        >
          <FiX size={18} />
          Cancel
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Address Book</h1>
            <p className="text-gray-400">Manage your delivery addresses</p>
          </div>

          {!isAddingNew && editingId === null && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsAddingNew(true);
                resetNewAddressForm();
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-red-600/25 transition-all"
            >
              <FiPlus size={18} />
              Add New
            </motion.button>
          )}
        </motion.div>

        {/* Add New Address Form */}
        <AnimatePresence>
          {isAddingNew &&
            renderAddressForm(
              newAddress,
              (field, value) =>
                setNewAddress((prev) => ({ ...prev, [field]: value })),
              handleAddAddress,
              () => {
                setIsAddingNew(false);
                resetNewAddressForm();
              },
            )}
        </AnimatePresence>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border ${
                address.isDefault ? "border-red-500" : "border-white/10"
              } hover:border-red-500/30 transition-all relative`}
            >
              {/* Default Badge */}
              {address.isDefault && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                  DEFAULT
                </div>
              )}

              {/* Check if this address is being edited */}
              {editingId === address.id ? (
                /* EDIT MODE - Show Form Inside Card */
                renderAddressForm(
                  editFormData,
                  handleEditChange,
                  handleSaveEdit,
                  handleCancelEdit,
                  true,
                )
              ) : (
                /* VIEW MODE - Show Address Details */
                <>
                  {/* Address Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-red-600/20 rounded-xl flex-shrink-0">
                      <FiMapPin className="text-red-500" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-white font-bold text-lg">
                          {address.label}
                        </h3>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-400 text-sm truncate">
                          {address.name}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {address.phone || "No phone provided"}
                      </p>
                    </div>
                  </div>

                  {/* Address Details */}
                  <div className="space-y-1 text-gray-300 text-sm mb-4 pl-14">
                    <p>{address.address}</p>
                    <p>
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10 pl-14">
                    {!address.isDefault && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSetDefault(address.id)}
                        className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                      >
                        Set as Default
                      </motion.button>
                    )}

                    <div className="ml-auto flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleStartEdit(address)}
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                        title="Edit address"
                      >
                        <FiEdit2 size={16} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(address.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Delete address"
                      >
                        <FiTrash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {addresses.length === 0 && !isAddingNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/5 rounded-2xl border border-white/10"
          >
            <FiMapPin className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-400 text-lg">No addresses saved</p>
            <p className="text-gray-500 text-sm mt-2">
              Add an address for faster checkout
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingNew(true)}
              className="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold inline-flex items-center gap-2"
            >
              <FiPlus size={18} />
              Add Your First Address
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AddressListPage;
