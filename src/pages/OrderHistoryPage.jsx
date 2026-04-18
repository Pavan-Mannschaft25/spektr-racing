// pages/OrderHistoryPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiPackage,
  FiCalendar,
  FiDollarSign,
  FiEye,
  FiFilter,
} from "react-icons/fi";

const mockOrders = [
  {
    id: "ORD-20240115-001",
    date: "2024-01-15",
    total: 1299.0,
    status: "Delivered",
    items: [
      { name: "Racing Sticker Pack", quantity: 2, price: 499.5 },
      { name: "Gloves Pro Edition", quantity: 1, price: 300.0 },
    ],
  },
  {
    id: "ORD-20240110-002",
    date: "2024-01-10",
    total: 2499.0,
    status: "Shipped",
    items: [
      { name: "Steering Wheel Cover", quantity: 1, price: 1999.0 },
      { name: "Keychain Set", quantity: 5, price: 100.0 },
    ],
  },
  {
    id: "ORD-20240105-003",
    date: "2024-01-05",
    total: 899.0,
    status: "Processing",
    items: [{ name: "Dashboard Camera Mount", quantity: 1, price: 899.0 }],
  },
];

const OrderHistoryPage = () => {
  const [orders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState("All");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Shipped":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Order History</h1>
          <p className="text-gray-400">View and track your orders</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center gap-4 flex-wrap"
        >
          <FiFilter className="text-gray-400" size={20} />
          {["All", "Processing", "Shipped", "Delivered"].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === status
                  ? "bg-red-600 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {status}
            </motion.button>
          ))}
        </motion.div>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/5 rounded-2xl border border-white/10"
            >
              <FiPackage className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400 text-lg">No orders found</p>
              <p className="text-gray-500 text-sm mt-2">
                Your orders will appear here
              </p>
            </motion.div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden hover:border-red-500/30 transition-all"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id,
                    )
                  }
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-white font-semibold">{order.id}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                          <FiCalendar size={14} />
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-white font-bold text-lg flex items-center gap-2">
                          <FiDollarSign size={16} />₹{order.total.toFixed(2)}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <FiEye size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="border-t border-white/10 bg-black/20"
                  >
                    <div className="p-6 space-y-3">
                      <h3 className="text-white font-semibold mb-4">
                        Order Items:
                      </h3>
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-gray-400">
                              ×{item.quantity}
                            </span>
                            <span className="text-white">{item.name}</span>
                          </div>
                          <span className="text-gray-300">
                            ₹{item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="pt-4 flex justify-between items-center border-t border-white/10 mt-4">
                        <span className="text-gray-400">
                          Total ({order.items.length} items)
                        </span>
                        <span className="text-white font-bold text-xl">
                          ₹{order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
