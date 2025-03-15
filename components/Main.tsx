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
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Location states
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

  // Typing animation states
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [selectedOption, setSelectedOption] = useState<OptionType>("Local");

  const phrases: string[] = [
    "Trusted Taxi Solution in Gujarat",
    "Local taxi cab service in Ahmedabad",
    "Rajkot to Hirasar airport taxi service",
    "Taxi service in Ahmedabad airport",
  ];

  // Handle redirection
  const handleSearchCab = () => {
    if (!isFormValid) return;

    const route = `/Cabs/${selectedOption}`;

    // Store complete trip data in localStorage
    const tripData = {
      pickupLocation,
      dropLocation,
      selectedOption,
      formData: JSON.parse(localStorage.getItem("tripFormData") || "{}")
    };

    localStorage.setItem("currentTripData", JSON.stringify(tripData));

    // Redirect after animation
    setTimeout(() => {
      router.push(route);
    }, 500);
  };

  // Typing effect
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
  }, [text, isDeleting, loopNum, phrases, typingSpeed]);

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        setIsMapLoaded(true);
        return;
      }

      if (!document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBv0kNWVgU4H3dHz67CuQppiMS5-opfVWI&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsMapLoaded(true);
        document.head.appendChild(script);
      }
    };

    loadGoogleMaps();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full text-left space-y-4 md:space-y-6 min-w-[320px] p-4 md:p-6 pt-20 sm:pt-24"
      >
        {/* Header Section */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Asht Cab
        </h1>

        <div className="text-lg font-mono text-gray-600 font-semibold">
          {text}
          <span className="ml-1 animate-blink">|</span>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mt-20">
          {/* Service Selection Buttons */}
          <div className="flex gap-4">
            {[
              { name: "Local", icon: <FaTaxi size={24} /> },
              { name: "Rental", icon: <FaCarSide size={24} /> },
              { name: "Outstation", icon: <FaMapMarkedAlt size={24} /> },
            ].map((option) => (
              <div key={option.name} className="relative group">
                {selectedOption === option.name && (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: -25, opacity: 1 }}
                    className="absolute left-1/2 -translate-x-1/2 -top-6 text-blue-600 font-semibold"
                  >
                    {option.name}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="h-1 bg-blue-600 mt-1 rounded-full"
                    />
                  </motion.div>
                )}
                <motion.button
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedOption(option.name as OptionType)}
                  className={`w-16 h-16 flex items-center justify-center rounded-full border-2 
                    ${
                      selectedOption === option.name
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {option.icon}
                </motion.button>
              </div>
            ))}
          </div>

          {/* Search Cab Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: isFormValid ? 1.05 : 1 }}
            whileTap={{ scale: isFormValid ? 0.95 : 1 }}
            onClick={handleSearchCab}
            disabled={!isFormValid}
            className={`w-full md:w-auto px-6 py-3 rounded-lg flex items-center justify-center space-x-2 shadow-lg transition-all ${
              isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaSearch size={18} />
            <span>Search Cab</span>
          </motion.button>

          {/* Service Forms */}
          <div className="relative min-h-[160px] md:w-4/5">
            {isMapLoaded ? (
              <ServiceForms
                key={selectedOption}
                serviceType={selectedOption}
                pickupAddress={pickupLocation.address}
                dropAddress={dropLocation.address}
                onPickupChange={(newLocation) => setPickupLocation(newLocation)}
                onDropChange={(newLocation) => setDropLocation(newLocation)}
                onFormValidityChange={setIsFormValid}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                Loading address services...
              </div>
            )}
          </div>

          {/* Map Section */}
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
    </AnimatePresence>
  );
};

export default MainPage;