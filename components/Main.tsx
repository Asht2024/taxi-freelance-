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


  // Location states
 

  const [dropLocation, setDropLocation] = useState<LocationType>({
    address: "",
    city: "",
    lat: 0,
    lng: 0,
  });
  const [pickupLocation, setPickupLocation] = useState<LocationType>({
    address: "Your current location",
    city: "",
    lat: 0,
    lng: 0,
  });
  
  const getAddressFromCoords = async (lat: number, lng: number) => {
    console.log("Fetching address for:", lat, lng);
    try {
      const response = await fetch("/api/get-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: lat, longitude: lng }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Address fetch failed");
      }
      setPickupLocation({
        address: data.address,
        city: data.city,
        lat: data.lat,
        lng: data.lng,
      });
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Could not fetch location details. Please enter manually.");
    }
  };
  
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPickupLocation((prev) => ({
          ...prev,
          lat: latitude,
          lng: longitude,
        }));
         
        // Fetch address
        getAddressFromCoords(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Please enable location permissions.");
      }
    );
  }, []);
  
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

  const handleSearchCab = () => {
    const data = JSON.parse(localStorage.getItem("tripFormData") || "{}");
    const tripData = {
      pickupLocation,
      dropLocation,
      selectedOption,
      formData: data,
    };

    localStorage.setItem("currentTripData", JSON.stringify(tripData));
    if (!pickupLocation.address || !data.date || !data.time || !data.members) {
      alert("Please enter all input!");
      return;
    }
    const route = `/Cabs/${selectedOption}`;
    if (selectedOption == "Local") {
      if (!dropLocation.address) {
        alert("Please enter drop location!");
        return;
      }
    } else if (selectedOption != "Rental") {
      if (!dropLocation.address) {
        alert("Please enter drop location!");
        return;
      } else if (data.tripType == "Outstation") {
        if (!data.dropdate || !data.droptime) {
          alert("Please enter drop date OR time!");
          return;
        }
      }
    }
    setTimeout(() => {
      router.push(route);
    }, 500);
  };

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
  }, [text, isDeleting, loopNum, typingSpeed]);

  

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
              { name: "Local" as OptionType, icon: <FaTaxi size={24} /> },
              { name: "Rental" as OptionType, icon: <FaCarSide size={24} /> },
              {
                name: "Outstation" as OptionType,
                icon: <FaMapMarkedAlt size={24} />,
              },
            ].map((option, index) => (
              <div key={option.name} className="relative group">
                {/* Active Option Indicator */}
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
                      pointerEvents: "none",
                    }}
                  >
                    {option.name}
                  </motion.div>
                )}

                {/* Service Button */}
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
                  onClick={() => setSelectedOption(option.name)}
                  className={`w-16 h-16 flex items-center justify-center rounded-full border-2 
                    transition-all duration-300 shadow-md relative
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

          {/* Service Forms */}
          <div className="relative min-h-[160px] md:w-4/5">
            <ServiceForms
              key={selectedOption}
              serviceType={selectedOption}
              pickupAddress={pickupLocation.address}
              dropAddress={dropLocation.address}
              onPickupChange={(newLocation) => setPickupLocation(newLocation)}
              onDropChange={(newLocation) => setDropLocation(newLocation)}
            />
          </div>

          {/* Search Cab Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleSearchCab}
            className={`w-full md:w-auto px-6 py-3 rounded-lg flex items-center justify-center space-x-2 shadow-lg transition-all bg-blue-600 text-white hover:bg-blue-700`}
          >
            <FaSearch size={18} />
            <span>Search Cab</span>
          </motion.button>

          {/* Map Section */}
          <div className="hidden md:flex md:w-1/2 md:absolute md:right-0 md:bottom-40 md:h-auto justify-center">
  <Maps />
</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MainPage;
