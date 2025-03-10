"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTaxi,
  FaCarSide,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaCalendar,
  FaClock,
} from "react-icons/fa";

// Define props for ServiceForms
interface ServiceFormsProps {
  serviceType: "Local" | "Rental" | "Outstation";
}

const ServiceForms: React.FC<ServiceFormsProps> = ({ serviceType }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const inputCommonClass = "w-full pl-12 pr-4 py-3 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white shadow-sm";
  const iconCommonClass = "absolute left-4 top-1/2 -translate-y-1/2 text-blue-500";
  const rowCommonClass = "relative h-[58px]"; // Fixed height for equal row sizing

  const renderForm = () => {
    switch (serviceType) {
      case "Local":
        return (
          <div className="space-y-6 w-full md:w-1/2">
            <div className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <input
                type="text"
                placeholder="Pickup Location"
                className={inputCommonClass}
              />
            </div>

            <div className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <input
                type="text"
                placeholder="Drop Location"
                className={inputCommonClass}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6 h-[58px]">
              <div className="relative w-full md:w-1/2">
                <FaCalendar className={iconCommonClass} />
                <input type="date" className={inputCommonClass} />
              </div>
              <div className="relative w-full md:w-1/2">
                <FaClock className={iconCommonClass} />
                <input type="time" className={inputCommonClass} />
              </div>
            </div>
          </div>
        );

      case "Rental":
        return (
          <div className="space-y-6 w-full md:w-1/2">
            <div className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <input
                type="text"
                placeholder="Pickup Location"
                className={inputCommonClass}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6 h-[58px]">
              <div className="relative w-full md:w-1/2">
                <FaCalendar className={iconCommonClass} />
                <input type="date" className={inputCommonClass} />
              </div>
              <div className="relative w-full md:w-1/2">
                <FaClock className={iconCommonClass} />
                <input type="time" className={inputCommonClass} />
              </div>
            </div>
          </div>
        );

      case "Outstation":
        return (
          <div className="space-y-6 w-full md:w-1/2">
            <div className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <input
                type="text"
                placeholder="From City"
                className={inputCommonClass}
              />
            </div>

            <div className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <input
                type="text"
                placeholder="To City"
                className={inputCommonClass}
              />
            </div>

            <div className="flex flex-col gap-6 h-[58px]">
              <div className="relative w-full md:w-1/2">
                <FaCalendar className={iconCommonClass} />
                <input type="date" className={inputCommonClass} />
              </div>
              <div className="relative w-full md:w-1/2">
                <FaClock className={iconCommonClass} />
                <input type="time" className={inputCommonClass} />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="transition-all duration-300"
    >
      {renderForm()}
    </motion.div>
  );
};

const Main: React.FC = () => {
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
    <div className="w-full max-w-4xl mx-auto text-left space-y-6 p-6">
      {/* Header */}
      <h1
        className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
        bg-clip-text text-transparent transition-all duration-500 ${
          headerMounted
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-12"
        }`}
      >
        Asth Cab Service
      </h1>

      {/* Typewriter */}
      <div
        className={`text-lg font-mono text-gray-600 font-semibold transition-opacity duration-500 ${
          textVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
        <span className="ml-1 animate-blink">|</span>
      </div>

      {/* Booking Section */}
      <div className="space-y-6 mt-10">
        {/* Service Type Buttons */}
        <div className="flex gap-4">
          {[
            { name: "Local", icon: <FaTaxi size={24} /> },
            { name: "Rental", icon: <FaCarSide size={24} /> },
            { name: "Outstation", icon: <FaMapMarkedAlt size={24} /> },
          ].map((option, index) => (
            <div key={option.name} className="relative group mt-7">
              {/* Selected Option Label - Always visible */}
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

              {/* Hover Tooltip - Only shows on hover for non-selected options */}
              {selectedOption !== option.name && (
                <motion.div
                  initial={{ y: 5 }}
                  animate={{ y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 -top-8 
            bg-gray-800 text-white text-xs px-2 py-1 rounded-md
            before:content-[''] before:absolute before:top-full before:left-1/2
            before:-translate-x-1/2 before:border-4 before:border-transparent
            before:border-t-gray-800
            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ pointerEvents: "none" }}
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

        {/* Form Container */}
        <div className="relative min-h-[160px]">
          <ServiceForms key={selectedOption} serviceType={selectedOption} />
        </div>
      </div>
    </div>
  );
};

export default Main;
