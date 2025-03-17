import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Loader = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Add a delay before hiding the loader
      const timer = setTimeout(() => setIsVisible(false), 1000); // Adjust delay as needed
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo with Keyframes Bounce Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1], // Bounce effect
              opacity: 1,
              rotate: [0, 10, -10, 0], // Slight rotation
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "keyframes", // Use keyframes for multiple values
              times: [0, 0.5, 1], // Keyframe timing
              duration: 1.5, // Total animation duration
              repeat: Infinity, // Repeat the animation infinitely
              repeatType: "mirror", // Mirror the animation on repeat
              ease: "easeInOut", // Smooth easing
            }}
          >
            <Image
              src="/ashtlogo.png"
              width={70}
              height={70}
              priority
              alt="logo"
              className="animate-pulse" // Add a subtle pulse effect
            />
          </motion.div>

          {/* "Loading..." Text with Fade-In and Fade-Out Animation */}
          <motion.div
            className="absolute bottom-8 text-lg font-semibold text-gray-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;