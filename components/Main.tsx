"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTaxi,
  FaCarSide,
  FaMapMarkedAlt,
} from "react-icons/fa";
import Maps from "./Map";
import ServiceForms from "./ServiceForm";

const getCityFromComponents = (components: google.maps.GeocoderAddressComponent[]) => {
  for (const component of components) {
    if (component.types.includes("locality")) {
      return component.long_name;
    }
    if (component.types.includes("administrative_area_level_2")) {
      return component.long_name;
    }
  }
  return "";
};
const Main: React.FC = () => {
    // Location states
    const [pickupLocation, setPickupLocation] = useState<{
      address: string;
      city: string;
      lat: number;
      lng: number;
    }>({ address: "", city: "", lat: 0, lng: 0 });
    
    const [dropLocation, setDropLocation] = useState<{
      address: string;
      city: string;
      lat: number;
      lng: number;
    }>({ address: "", city: "", lat: 0, lng: 0 });
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [selectedOption, setSelectedOption] = useState<
    "Local" | "Rental" | "Outstation"
  >("Local");
  const [headerMounted, setHeaderMounted] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const phrases = [
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

  useEffect(() => {
    // Load Google Maps script with Places library
    const loadGoogleMaps = () => {
      if (!window.google) {
        const existingScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
          script.onload = () => {
            setIsScriptLoaded(true);
            getCurrentLocation();
          };
        } else {
          setIsScriptLoaded(true);  // If script is already present, mark it as loaded
          getCurrentLocation();
        }
      } else {
        setIsScriptLoaded(true);
        getCurrentLocation();
      }
    };
  
    // Get user's current location
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
              {
                location: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              },
              (results, status) => {
                if (status === "OK" && results?.[0]) {
                  setPickupLocation({
                    address: results[0].formatted_address || "",
                    city: getCityFromComponents(results[0].address_components),
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                }
              }
            );
          },
          (error) => console.error("Error getting location:", error)
        );
      }
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
        setLoopNum(loopNum + 1);
      }

      setTypingSpeed(isDeleting ? 20 : 40);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <div className="relative -top-10 w-full text-left space-y-4 md:space-y-6 min-w-[320px] p-4 md:p-6">
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
        className={`text-lg font-mono text-gray-600 font-semibold transition-opacity duration-500 ${
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
                    pointerEvents: "none",
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

        <div className="relative min-h-[160px] md:w-4/5">
        <ServiceForms
      key={selectedOption}
      serviceType={selectedOption}
      pickupAddress={pickupLocation.address}
      dropAddress={dropLocation.address}
      onPickupChange={(newLocation) => {
        setPickupLocation({
          address: newLocation.address,
          city: newLocation.city,
          lat: newLocation.latitude,
          lng: newLocation.longitude,
        });
      }}
      onDropChange={(newLocation) => {
        setDropLocation({
          address: newLocation.address,
          city: newLocation.city,
          lat: newLocation.latitude,
          lng: newLocation.longitude,
        });
      }}
    />
        </div>

        <div className=" md:w-1/2 md:absolute md:right-0 md:top-0 md:h-full justify-center border-none">
          <Maps />
        </div>
      </div>
    </div>
  );
};
export default Main;
