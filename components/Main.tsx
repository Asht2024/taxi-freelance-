"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTaxi,
  FaCarSide,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaCalendar,
  FaClock,
  FaArrowRight,
  FaSyncAlt,
  FaTrash,
  FaPlusCircle,
  FaUsers, 
  FaSuitcase,
  FaUserPlus,
  FaWeightHanging 
} from "react-icons/fa";

interface ServiceFormsProps {
  serviceType: "Local" | "Rental" | "Outstation";
}

const ServiceForms: React.FC<ServiceFormsProps> = ({ serviceType }) => {
  const inputCommonClass =
    "w-full pl-12 pr-10 py-3 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white shadow-sm";
  const iconCommonClass = "absolute left-4 top-1/2 -translate-y-1/2 text-blue-500";
  const rowCommonClass = "relative h-[58px]";

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Outstation state
  const [tripType, setTripType] = useState<"One Way" | "Round Trip">("One Way");
  const [intermediateCities, setIntermediateCities] = useState<string[]>([]);

  const handleAddCity = () => setIntermediateCities([...intermediateCities, ""]);
  const handleRemoveCity = (index: number) => setIntermediateCities(intermediateCities.filter((_, i) => i !== index));
  const handleUpdateCity = (index: number, value: string) => {
    const newCities = [...intermediateCities];
    newCities[index] = value;
    setIntermediateCities(newCities);
  };

  const renderForm = () => {
    switch (serviceType) {
      case "Local":
        return (
          <motion.div
            className="space-y-6 w-full md:w-1/2"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div variants={formVariants} className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <input
                type="text"
                placeholder="Pickup Location"
                className={inputCommonClass}
              />
            </motion.div>

            <motion.div variants={formVariants} className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <input
                type="text"
                placeholder="Drop Location"
                className={inputCommonClass}
              />
            </motion.div>

            <motion.div
              variants={formVariants}
              className="grid grid-cols-2 gap-3 h-[58px]"
            >
              <div className="relative">
                <FaCalendar className={iconCommonClass} />
                <input type="date" className={inputCommonClass} />
              </div>
              <div className="relative">
                <FaClock className={iconCommonClass} />
                <input type="time" className={inputCommonClass} />
              </div>
            </motion.div>

            <motion.div 
  variants={formVariants}
  className="grid grid-cols-2 gap-4"
  initial="hidden"
  animate="visible"
  transition={{ staggerChildren: 0.1 }}
>
  <motion.div 
    variants={formVariants}
    className={rowCommonClass}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <FaUsers className={iconCommonClass} />
    <input
      type="number"
      placeholder="Number of Members"
      className={inputCommonClass}
      min="1"
      max="10"
    />
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
      <FaUserPlus />
    </span>
  </motion.div>

  <motion.div 
    variants={formVariants}
    className={rowCommonClass}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <FaSuitcase className={iconCommonClass} />
    <input
      type="number"
      placeholder="Luggage (kg)"
      className={inputCommonClass}
      min="0"
      step="1"
    />
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
      <FaWeightHanging />
    </span>
  </motion.div>
</motion.div>
          </motion.div>
        );

      case "Rental":
        return (
          <motion.div
            className="space-y-6 w-full md:w-1/2"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div variants={formVariants} className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <input
                type="text"
                placeholder="Pickup Location"
                className={inputCommonClass}
              />
            </motion.div>

            <motion.div
              variants={formVariants}
              className="grid grid-cols-2 gap-3 h-[58px]"
            >
              <div className="relative">
                <FaCalendar className={iconCommonClass} />
                <input type="date" className={inputCommonClass} />
              </div>
              <div className="relative">
                <FaClock className={iconCommonClass} />
                <input type="time" className={inputCommonClass} />
              </div>
            </motion.div>
            <motion.div 
  variants={formVariants}
  className="grid grid-cols-2 gap-4"
  initial="hidden"
  animate="visible"
  transition={{ staggerChildren: 0.1 }}
>
  <motion.div 
    variants={formVariants}
    className={rowCommonClass}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <FaUsers className={iconCommonClass} />
    <input
      type="number"
      placeholder="Number of Members"
      className={inputCommonClass}
      min="1"
      max="10"
    />
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
      <FaUserPlus />
    </span>
  </motion.div>

  <motion.div 
    variants={formVariants}
    className={rowCommonClass}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <FaSuitcase className={iconCommonClass} />
    <input
      type="number"
      placeholder="Luggage (kg)"
      className={inputCommonClass}
      min="0"
      step="1"
    />
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
      <FaWeightHanging />
    </span>
  </motion.div>
</motion.div>
          </motion.div>
        );

      case "Outstation":
        return (
          <motion.div
            className="space-y-6 w-full md:w-1/2"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            {/* Trip Type Selector */}
            <motion.div variants={formVariants} className="flex gap-4 justify-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTripType("One Way")}
                className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 transition-all ${
                  tripType === "One Way"
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaArrowRight className="text-lg" />
                One Way
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTripType("Round Trip")}
                className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 transition-all ${
                  tripType === "Round Trip"
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaSyncAlt className="text-lg" />
                Round Trip
              </motion.button>
            </motion.div>

            {/* From & To City */}
            <div className="space-y-6">
              <motion.div variants={formVariants} className={rowCommonClass}>
                <FaMapMarkerAlt className={iconCommonClass} />
                <input placeholder="From City" className={inputCommonClass} />
              </motion.div>

              <motion.div variants={formVariants} className={rowCommonClass}>
                <FaMapMarkerAlt className={iconCommonClass} />
                <input placeholder="To City" className={inputCommonClass} />
              </motion.div>
            </div>

            {/* Date & Time Section */}
            <motion.div variants={formVariants} className="grid grid-cols-2 gap-4">
              <div className={rowCommonClass}>
                <FaCalendar className={iconCommonClass} />
                <input type="date" className={inputCommonClass} />
              </div>
              <div className={rowCommonClass}>
                <FaClock className={iconCommonClass} />
                <input type="time" className={inputCommonClass} />
              </div>
            </motion.div>

            <motion.div 
  variants={formVariants}
  className="grid grid-cols-2 gap-4"
  initial="hidden"
  animate="visible"
  transition={{ staggerChildren: 0.1 }}
>
  <motion.div 
    variants={formVariants}
    className={rowCommonClass}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <FaUsers className={iconCommonClass} />
    <input
      type="number"
      placeholder="Number of Members"
      className={inputCommonClass}
      min="1"
      max="10"
    />
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
      <FaUserPlus />
    </span>
  </motion.div>

  <motion.div 
    variants={formVariants}
    className={rowCommonClass}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <FaSuitcase className={iconCommonClass} />
    <input
      type="number"
      placeholder="Luggage (kg)"
      className={inputCommonClass}
      min="0"
      step="1"
    />
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
      <FaWeightHanging />
    </span>
  </motion.div>
</motion.div>
            

            {/* Intermediate Cities Section */}
            {tripType === "Round Trip" && (
              <motion.div 
                variants={formVariants}
                className="space-y-4 mt-4 bg-blue-50 p-4 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-800">
                    Intermediate Cities
                  </h3>
                  <span className="text-sm text-blue-600">
                    {intermediateCities.length} added
                  </span>
                </div>

                <AnimatePresence>
                  {intermediateCities.map((city, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="relative group"
                    >
                      <div className={rowCommonClass}>
                        <FaMapMarkerAlt className={iconCommonClass} />
                        <input
                          value={city}
                          onChange={(e) => handleUpdateCity(index, e.target.value)}
                          placeholder={`Stop ${index + 1}`}
                          className={inputCommonClass}
                        />
                        <button
                          onClick={() => handleRemoveCity(index)}
                          className="absolute right-3 top-1/2 -translate-y-1/2
                            text-red-500 hover:text-red-700 transition-colors
                            p-2 rounded-full hover:bg-red-50"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <motion.button
                  onClick={handleAddCity}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-white border-2 border-dashed border-blue-200
                    rounded-lg text-blue-600 hover:text-blue-700 font-medium
                    flex items-center justify-center gap-2 transition-all"
                >
                  <FaPlusCircle className="text-lg" />
                  Add Stop
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
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
    <div className="relative -top-10 w-full text-left space-y-4 md:space-y-6 min-w-[320px] p-4 md:p-6">

      <h1
        className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
        bg-clip-text text-transparent transition-all duration-500 ${
          headerMounted
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-12"
        }`}
      >
        Asht Cab Service 
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
        <div className="flex gap-4 flex-wrap">
          {[
            { name: "Local", icon: <FaTaxi size={24} /> },
            { name: "Rental", icon: <FaCarSide size={24} /> },
            { name: "Outstation", icon: <FaMapMarkedAlt size={24} /> },
          ].map((option, index) => (
            <div key={option.name} className="relative group">
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

        <div className="relative min-h-[160px]">
          <ServiceForms key={selectedOption} serviceType={selectedOption} />
        </div>
      </div>
    </div>
  );
};

export default Main;