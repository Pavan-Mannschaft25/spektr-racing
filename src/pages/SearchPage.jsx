// pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiGrid, FiList, FiShoppingCart } from "react-icons/fi";

// Import your products data - adjust path as needed
// import { products } from "../data/products";

// Mock products data for demonstration
const products = [
  {
    id: 1,
    name: "Racing Sticker Pack Premium",
    description: "High-quality vinyl stickers for racing enthusiasts",
    price: 499,
    originalPrice: 799,
    image:
      "https://via.placeholder.com/300x300/1a1a1a/ff0000?text=Sticker+Pack",
    category: "Stickers",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Pro Racing Gloves",
    description: "Professional grade racing gloves with grip enhancement",
    price: 1299,
    originalPrice: 1599,
    image:
      "https://via.placeholder.com/300x300/1a1a1a/ff6600?text=Racing+Gloves",
    category: "Accessories",
    badge: "New",
  },
  {
    id: 3,
    name: "Steering Wheel Cover Sport",
    description: "Premium leather steering wheel cover with red stitching",
    price: 1999,
    originalPrice: 2499,
    image: "https://via.placeholder.com/300x300/1a1a1a/00ff00?text=Wheel+Cover",
    category: "Accessories",
    badge: null,
  },
  {
    id: 4,
    name: "Dashboard Camera Mount",
    description: "Universal dash cam mount with 360° rotation",
    price: 899,
    originalPrice: null,
    image: "https://via.placeholder.com/300x300/1a1a1a/0066ff?text=Dash+Cam",
    category: "Accessories",
    badge: "Popular",
  },
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      let sorted = [...results];
      switch (sortBy) {
        case "price-low":
          sorted.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "name":
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }

      setFilteredProducts(sorted);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            Search Products
          </h1>

          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <FiSearch
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for racing gear, stickers, accessories..."
              className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
            />
          </form>
        </motion.div>

        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-6 flex-wrap gap-4"
          >
            <p className="text-gray-400">
              Found{" "}
              <span className="text-white font-semibold">
                {filteredProducts.length}
              </span>{" "}
              results for "{searchQuery}"
            </p>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>

              <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-red-600 text-white" : "text-gray-400"}`}
                >
                  <FiGrid size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-red-600 text-white" : "text-gray-400"}`}
                >
                  <FiList size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {searchQuery ? (
          filteredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/30 transition-all group ${
                    viewMode === "list" ? "flex gap-6" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden bg-black/20 ${
                      viewMode === "list"
                        ? "w-64 h-64 flex-shrink-0"
                        : "aspect-square"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1">
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description || "Premium quality racing product"}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-white">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="ml-2 text-gray-500 line-through text-sm">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
                      >
                        <FiShoppingCart size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/5 rounded-2xl border border-white/10"
            >
              <FiSearch className="mx-auto text-gray-600 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-white mb-2">
                No results found
              </h2>
              <p className="text-gray-400 mb-6">
                Try searching with different keywords
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSearchQuery("")}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
              >
                Clear Search
              </motion.button>
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FiSearch className="mx-auto text-gray-600 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-white mb-2">
              Start Searching
            </h2>
            <p className="text-gray-400">
              Type in the search box above to find products
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
