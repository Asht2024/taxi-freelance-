"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTaxi, FaCarSide, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import Maps from "./Map";
import ServiceForms from "./ServiceForm";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    google: typeof google;
  }
}

type LocationType = {
  address: string;
  city: string;
  lat: number;
  lng: number;
};

type OptionType = "Local" | "Rental" | "Outstation";

const MainPage = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (isRedirecting) {
      setIsVisible(false);
      const timer = setTimeout(() => router.push("/Cabs"), 500);
      return () => clearTimeout(timer);
    }
  }, [isRedirecting, router]);

  const [pickupLocation, setPickupLocation] = useState<LocationType>({
    address: "",
    city: "",
    lat: 0,
    lng: 0,
  });

  const [dropLocation, setDropLocation] = useState<LocationType>({
    address: "",
    city: "",
    lat: 0,
    lng: 0,
  });

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [selectedOption, setSelectedOption] = useState<OptionType>("Local");
  const [headerMounted, setHeaderMounted] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const phrases: string[] = [
    "Trusted Taxi Solution in Gujarat",
    "Local taxi cab service in Ahmedabad",
    "Rajkot to Hirasar airport taxi service",
    "Taxi service in Ahmedabad airport",
  ];

  useEffect(() => {
    setHeaderMounted(true);
    const timer = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        setIsMapLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBv0kNWVgU4H3dHz67CuQppiMS5-opfVWI&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsMapLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    const handleType = () => {
      const current = phrases[loopNum % phrases.length];
      const updated = isDeleting
        ? current.substring(0, text.length - 1)
        : current.substring(0, text.length + 1);

      setText(updated);

      if (!isDeleting && updated === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updated === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      }

      setTypingSpeed(isDeleting ? 20 : 40);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full text-left space-y-4 md:space-y-6 min-w-[320px] p-4 md:p-6 pt-20 sm:pt-24"
        >
          <h1
            className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
              bg-clip-text text-transparent transition-all duration-500 ${
                headerMounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
          >
            Asht Cab
          </h1>

          <div
            className={`text-lg font-mono text-gray-600 font-semibold transition-opacity duration-500  ${
              textVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {text}
            <span className="ml-1 animate-blink">|</span>
          </div>

          <div className="space-y-6 mt-20">
          <div className="flex gap-4">
  {[
    { name: "Local", icon: <FaTaxi size={24} /> },
    { name: "Rental", icon: <FaCarSide size={24} /> },
    { name: "Outstation", icon: <FaMapMarkedAlt size={24} /> },
  ].map((option, index) => (
    <div key={option.name} className="relative group">
      {/* Selected Option Label */}
      {selectedOption === option.name && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: -25, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute left-1/2 -translate-x-1/2 -top-6 text-blue-600 font-semibold whitespace-nowrap"
        >
          {option.name}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="h-1 bg-blue-600 mt-1 rounded-full"
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}

      {/* Hover Tooltip */}
      {selectedOption !== option.name && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 -top-8 
            bg-gray-800 text-white text-xs px-2 py-1 rounded-md
            before:content-[''] before:absolute before:top-full before:left-1/2
            before:-translate-x-1/2 before:border-4 before:border-transparent
            before:border-t-gray-800"
          style={{
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: 'none'
          }}
        >
          {option.name}
        </motion.div>
      )}

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          type: "spring",
        }}
        onClick={() =>
          setSelectedOption(
            option.name as "Local" | "Rental" | "Outstation"
          )
        }
        className={`
          w-16 h-16 flex items-center justify-center rounded-full border-2 
          transition-all duration-300 shadow-md relative
          ${
            selectedOption === option.name
              ? "bg-blue-600 text-white border-blue-600 shadow-lg"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }
        `}
      >
        {option.icon}
      </motion.button>
    </div>
  ))}
</div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setIsRedirecting(true);
                router.push(`/Cabs?type=${selectedOption.toLowerCase()}`);
              }}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 shadow-lg hover:bg-blue-700 transition-all"
            >
              <FaSearch size={18} />
              <span>Search Cab</span>
            </motion.button>

            <div className="relative min-h-[160px] md:w-4/5">
              <ServiceForms
                key={selectedOption}
                serviceType={selectedOption}
                pickupAddress={pickupLocation.address}
                dropAddress={dropLocation.address}
                onPickupChange={(newLocation) =>
                  setPickupLocation({
                    address: newLocation.address,
                    city: newLocation.city,
                    lat: newLocation.latitude,
                    lng: newLocation.longitude,
                  })
                }
                onDropChange={(newLocation) =>
                  setDropLocation({
                    address: newLocation.address,
                    city: newLocation.city,
                    lat: newLocation.latitude,
                    lng: newLocation.longitude,
                  })
                }
              />
            </div>

            <div className="md:w-1/2 md:absolute md:right-0 md:bottom-10 md:h-auto flex justify-center border-none">
              {isMapLoaded ? (
                <Maps />
              ) : (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                  Loading map...
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainPage;