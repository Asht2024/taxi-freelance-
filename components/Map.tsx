"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google?.maps) {
      setErrorMessage("Google Maps failed to load.");
      setIsLoading(false);
      return;
    }

    // Initialize the map (no need to assign to 'map' if not used)
    new window.google.maps.Map(mapRef.current, {
      center: { lat: 23.0225, lng: 72.5714 }, // Ahmedabad
      zoom: 12,
    });

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (window.google?.maps) {
      initMap();
    } else {
      const timer = setInterval(() => {
        if (window.google?.maps) {
          initMap();
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [initMap]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[300px] md:h-[450px] lg:h-[350px] rounded-lg shadow-lg overflow-hidden relative"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50/80 z-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
            />
          </motion.div>
        </div>
      )}

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 p-4"
        >
          <p className="text-center text-red-600 font-medium">{errorMessage}</p>
        </motion.div>
      )}

      <div ref={mapRef} className="w-full h-full" />
    </motion.div>
  );
};

export default Map;
