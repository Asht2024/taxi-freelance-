"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

const CabsPage = () => {
  useEffect(() => {
    // Add any initial data fetching here
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 sm: pt-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          className="text-4xl font-bold text-blue-600 mb-8"
        >
          Available Cabs
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: item * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-200 rounded-lg mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold mb-2">Premium Sedan</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">4 Seater</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CabsPage;