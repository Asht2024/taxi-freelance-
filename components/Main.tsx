"use client";
import React, { useEffect, useState } from "react";
import { FaCarSide, FaMapMarkedAlt, FaTaxi } from "react-icons/fa";
import { 
  FiMapPin, 
  FiFlag, 
  FiRepeat,  // Correct swap icon
  FiClock, 
  FiChevronDown,
  FiBriefcase,
  FiUsers
} from "react-icons/fi";

const Main = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Rental");

  const phrases = [
    "Your Trusted Taxi Solution in Gujarat",
    "Local taxi cab service in Ahmedabad",
    "Rajkot to Hirasar airport taxi service",
    "Taxi service in Ahmedabad airport",
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleType = () => {
      const currentPhrase = phrases[loopNum % phrases.length];
      const updatedText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setTypingSpeed(isDeleting ? 20 : 40);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases]);

  return (
    <div className="w-full max-w-4xl mx-auto text-left space-y-6 p-6">
      {/* Header */}
      <h1
        className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
        bg-clip-text text-transparent transform transition-all duration-1000
        ${
          isMounted
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }
        hover:scale-105`}
      >
        Asth Cab Service
      </h1>

      {/* Typewriter Effect */}
      <div
        className={`text-lg font-mono text-gray-600 font-semibold transition-opacity duration-700 delay-300
        ${isMounted ? "opacity-100" : "opacity-0"}`}
      >
        {text}
        <span className="ml-1 animate-blink">|</span>
      </div>

      {/* Booking Form */}
      <div className="space-y-6 mt-10">
        {/* Service Type Buttons */}
        <div className="flex gap-4 justify-start">
          {[
            { name: "Local", icon: <FaTaxi size={24} /> },
            { name: "Rental", icon: <FaCarSide size={24} /> },
            { name: "Outstation", icon: <FaMapMarkedAlt size={24} /> },
          ].map((option) => (
            <div key={option.name} className="relative group">
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap
                before:content-[''] before:absolute before:top-full before:left-1/2
                before:-translate-x-1/2 before:border-4 before:border-transparent
                before:border-t-gray-800">
                {option.name}
              </div>

              {/* Button */}
              <button
                onClick={() => setSelectedOption(option.name)}
                className={`w-16 h-16 flex items-center justify-center rounded-full border-2 
                  transition-all duration-300 shadow-md
                  ${
                    selectedOption === option.name
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {option.icon}
              </button>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="space-y-6">
          {/* Address Row */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter pickup location"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
              />
              <FiMapPin className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>

            <button className="p-3 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors shadow-lg">
              <FiRepeat className="text-white" size={24} />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter drop location"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all"
              />
              <FiFlag className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Details Row */}
          <div className="flex gap-4">
            <div className="flex-1 relative group">
              <button className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-left flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiClock className="text-gray-400" size={20} />
                  <span className="text-gray-500">Select Date & Time</span>
                </div>
                <FiChevronDown className="text-gray-400" />
              </button>
            </div>

            <div className="flex-1 relative">
              <input
                type="number"
                min="0"
                max="10"
                placeholder="Luggage"
                className="w-full px-4 py-2 pl-10 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              />
              <FiBriefcase className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            <div className="flex-1 relative">
              <input
                type="number"
                min="1"
                max="8"
                placeholder="Passengers"
                className="w-full px-4 py-2 pl-10 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              />
              <FiUsers className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Choose Ride Button */}
          <div className="pt-4">
            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <FaCarSide size={24} />
              Choose Your Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;