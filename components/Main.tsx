"use client";
import React, { useEffect, useState } from "react";
import { FaCar, FaMapMarkedAlt, FaTaxi } from "react-icons/fa";

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
      {/* 🚖 Taxi Service Heading */}
      <h1
        className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
        bg-clip-text text-transparent transform transition-all duration-1000
        ${isMounted ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        hover:scale-105`}
      >
        Asth Cab Service
      </h1>

      {/* ✍️ Typewriter Effect */}
      <div
        className={`text-lg font-mono text-gray-600 font-semibold transition-opacity duration-700 delay-300
        ${isMounted ? "opacity-100" : "opacity-0"}`}
      >
        {text}
        <span className="ml-1 animate-blink">|</span>
      </div>

      {/* 📝 Booking Form (Text ke neeche) */}
      <div className="space-y-6 mt-10">
        {/* 🚖 3 Circular Icon Buttons */}
        <div className="flex gap-4 justify-start">
          {[
            { name: "Rental", icon: <FaCar size={24} /> },
            { name: "Outstation", icon: <FaMapMarkedAlt size={24} /> },
            { name: "Local", icon: <FaTaxi size={24} /> },
          ].map((option) => (
            <button
              key={option.name}
              onClick={() => setSelectedOption(option.name)}
              className={`w-16 h-16 flex items-center justify-center rounded-full border-2 
              transition-all duration-300 shadow-md
              ${selectedOption === option.name ? "bg-yellow-500 text-white border-yellow-500" : "border-gray-300 text-gray-700 hover:bg-gray-200"}`}
            >
              {option.icon}
            </button>
          ))}
        </div>

        {/* 📝 Input Fields */}
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Pickup Location"
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Drop Location"
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-all">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
