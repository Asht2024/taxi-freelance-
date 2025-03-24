"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendar,
  FaClock,
  FaPlusCircle,
  FaUsers,
  FaSuitcase,
  FaUserPlus,
  FaWeightHanging,
  FaTrash,
} from "react-icons/fa";
import AutocompleteInput from "./AutoComplete";

// In ServiceForms component
interface LocationData {
  address: string;
  city: string;
  lat: number;
  lng: number;
}

interface ServiceFormsProps {
  serviceType: string;
  pickupAddress: string;
  dropAddress: string;
  onPickupChange: (location: LocationData) => void;
  onDropChange: (location: LocationData) => void;
}

interface FormData {
  date: string;
  time: string;
  dropdate: string;
  droptime: string;
  members: number;
  luggage: number;
  tripType: "One Way" | "Round Trip";
  intermediateCities?: string[];
}

type FormDataValue = string | number | string[] | "One Way" | "Round Trip";

const ServiceForms = ({
  serviceType,
  pickupAddress,
  dropAddress,
  onPickupChange,
  onDropChange,
}: ServiceFormsProps): React.ReactElement => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    date: "",
    time: "",
    dropdate: "",
    droptime: "",
    members: 1,
    luggage: 0,
    tripType: "One Way",
    intermediateCities: [],
  });

  // Trip type state for Outstation
  const [tripType, setTripType] = useState<"One Way" | "Round Trip">("One Way");
  const [intermediateCities, setIntermediateCities] = useState<string[]>([]);

  // Check form validity whenever form data changes

  // Save form data to localStorage when values change
  const handleFormChange = (field: keyof FormData, value: FormDataValue) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Save all form data including locations to localStorage
    const completeFormData = {
      ...newFormData,
      serviceType,
      tripType,
      intermediateCities,
      pickupAddress,
      dropAddress,
    };
    localStorage.setItem("tripFormData", JSON.stringify(completeFormData));
  };
  const handleTripTypeChange = (newType: "One Way" | "Round Trip") => {
    setTripType(newType);
  };

  useEffect(() => {
    handleFormChange("tripType", tripType);
  }, [tripType]);

  // Load form data from localStorage on component mount
  useEffect(() => {
    setTripType("One Way");
    handleFormChange("tripType", "One Way");
    const savedData = localStorage.getItem("tripFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      if (parsedData.tripType) {
        setTripType(parsedData.tripType);
      }
      if (parsedData.intermediateCities) {
        setIntermediateCities(parsedData.intermediateCities);
      }
    }
  }, []);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  
  const handleAddCity = () => {
    const newCities = [...intermediateCities, ""];
    setIntermediateCities(newCities);
    handleFormChange("intermediateCities", newCities);
  };

  const handleRemoveCity = (index: number) => {
    const newCities = intermediateCities.filter((_, i) => i !== index);
    setIntermediateCities(newCities);
    handleFormChange("intermediateCities", newCities);
  };
  const inputCommonClass =
    "w-full pl-12 pr-10 py-3 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white shadow-sm";
  const iconCommonClass =
    "absolute left-4 top-1/2 -translate-y-1/2 text-blue-500";
  const rowCommonClass = "relative h-[58px]";
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
              <AutocompleteInput
                label="Pickup Location"
                value={pickupAddress}
                onChange={onPickupChange}
              />
            </motion.div>

            <motion.div
              variants={formVariants}
              className="grid grid-cols-2 gap-3 h-[58px]"
            >
              {/* Pickup Date Field */}
              <div className="relative">
                <FaCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                <label
                  htmlFor="pickupDate"
                  className={`w-full pt-4 pb-2 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pl-8 bg-white shadow-sm flex text-sm items-center whitespace-nowrap`}
                >
                  {formData.date ? formData.date : "Date"}
                </label>
                <input
                  id="pickupDate"
                  type="date"
                  className="absolute inset-0  text-sm outline-none bg-transparent text-transparent cursor-pointer"
                  value={formData.date}
                  onChange={(e) => handleFormChange("date", e.target.value)}
                />
              </div>

              {/* Pickup Time Field */}
              <div className="relative">
                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                <label
                  htmlFor="pickupTime"
                  className={`w-full pt-4 pb-2 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pl-8 bg-white shadow-sm flex text-sm items-center whitespace-nowrap`}
                >
                  {formData.time ? formData.time : "Time"}
                </label>
                <input
                  id="pickupTime"
                  type="time"
                  className="absolute inset-0 text-sm outline-none bg-transparent text-transparent cursor-pointer"
                  value={formData.time}
                  onChange={(e) => handleFormChange("time", e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div variants={formVariants} className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <AutocompleteInput
                label="Drop Location"
                value={dropAddress}
                onChange={onDropChange}
              />
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
                  value={formData.members}
                  onChange={(e) =>
                    handleFormChange("members", parseInt(e.target.value))
                  }
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
                  value={formData.luggage}
                  onChange={(e) =>
                    handleFormChange("luggage", parseInt(e.target.value))
                  }
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
              <AutocompleteInput
                label="Pickup Location"
                value={pickupAddress}
                onChange={onPickupChange}
              />
            </motion.div>

            <motion.div
              variants={formVariants}
              className="grid grid-cols-2 gap-3 h-[58px]"
            >
              {/* Pickup Date Field */}
              <div className="relative">
                <FaCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                <label
                  htmlFor="pickupDate"
                  className={`w-full pt-4 pb-2 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pl-8 bg-white shadow-sm flex text-sm items-center whitespace-nowrap`}
                >
                  {formData.date ? formData.date : "Date"}
                </label>
                <input
                  id="pickupDate"
                  type="date"
                  className="absolute inset-0 text-sm bg-transparent outline-none text-transparent cursor-pointer"
                  value={formData.date}
                  onChange={(e) => handleFormChange("date", e.target.value)}
                />
              </div>

              {/* Pickup Time Field */}
              <div className="relative">
                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                <label
                  htmlFor="pickupTime"
                  className={`w-full pt-4 pb-2 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pl-8 bg-white shadow-sm flex text-sm items-center whitespace-nowrap`}
                >
                  {formData.time ? formData.time : "Time"}
                </label>
                <input
                  id="pickupTime"
                  type="time"
                  className="absolute inset-0 text-sm bg-transparent outline-none text-transparent cursor-pointer"
                  value={formData.time}
                  onChange={(e) => handleFormChange("time", e.target.value)}
                />
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
                  value={formData.members}
                  onChange={(e) =>
                    handleFormChange("members", parseInt(e.target.value))
                  }
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
                  value={formData.luggage}
                  onChange={(e) =>
                    handleFormChange("luggage", parseInt(e.target.value))
                  }
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
            <motion.div variants={formVariants} className="flex gap-4">
              <button
                className={`flex-1 py-2 px-4 rounded-lg ${
                  tripType === "One Way"
                    ? "bg-blue-600 text-white"
                    : "border-blue-600 border-2 text-blue-600"
                }`}
                onClick={() => handleTripTypeChange("One Way")}
              >
                One Way
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg ${
                  tripType === "Round Trip"
                    ? "bg-blue-600 text-white"
                    : "border-blue-600 border-2 text-blue-600"
                }`}
                onClick={() => handleTripTypeChange("Round Trip")}
              >
                Round Trip
              </button>
            </motion.div>

            <motion.div variants={formVariants} className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <AutocompleteInput
                label="Pickup Location"
                value={pickupAddress}
                onChange={onPickupChange}
              />
            </motion.div>

            {/* Date & Time Section */}
            <motion.div
              variants={formVariants}
              className="grid grid-cols-2 gap-3 h-[58px]"
            >
              {/* Pickup Date Field */}
              <div className="relative">
                <FaCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                <label
                  htmlFor="pickupDate"
                  className={`w-full pt-4 pb-2 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pl-8 bg-white shadow-sm flex text-sm items-center whitespace-nowrap`}
                >
                  {formData.date
                    ? formData.date
                    : tripType === "Round Trip"
                    ? "Pickup Date"
                    : "Date"}
                </label>
                <input
                  id="pickupDate"
                  type="date"
                  className="absolute inset-0 text-sm outline-none bg-transparent text-transparent cursor-pointer"
                  value={formData.date}
                  onChange={(e) => handleFormChange("date", e.target.value)}
                />
              </div>

              {/* Pickup Time Field */}
              <div className="relative">
                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                <label
                  htmlFor="pickupTime"
                  className={`w-full pt-4 pb-2 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pl-8 bg-white shadow-sm flex text-sm items-center whitespace-nowrap`}
                >
                  {formData.time
                    ? formData.time
                    : tripType === "Round Trip"
                    ? "Pickup Time"
                    : "Time"}
                </label>
                <input
                  id="pickupTime"
                  type="time"
                  className="absolute text-sm inset-0 outline-none bg-transparent text-transparent cursor-pointer"
                  value={formData.time}
                  onChange={(e) => handleFormChange("time", e.target.value)}
                />
              </div>
            </motion.div>
            {tripType !== "One Way" && (
              <motion.button
                variants={formVariants}
                className="flex items-center gap-2  text-blue-700"
                onClick={handleAddCity}
              >
                <FaPlusCircle /> Add Intermediate City
              </motion.button>
            )}
             {tripType !== "One Way" && (
              <AnimatePresence>
                <motion.div className="space-y-4">
                  {intermediateCities.map((city, index) => (
                    <motion.div
                      key={index}
                      variants={formVariants}
                      className="relative"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <AutocompleteInput
                        label={`Intermediate City ${index + 1}`}
                        value={city}
                        onChange={(location) => {
                          const newCities = [...intermediateCities];
                          newCities[index] = location.address;
                          setIntermediateCities(newCities);
                          handleFormChange("intermediateCities", newCities);
                        }}
                      />
                      <button
                        onClick={() => handleRemoveCity(index)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            <motion.div variants={formVariants} className={rowCommonClass}>
              <FaMapMarkerAlt className={iconCommonClass} />
              <AutocompleteInput
                label="Drop Location"
                value={dropAddress}
                onChange={onDropChange}
              />
            </motion.div>

            {/* Round Trip Date & Time Section */}
            {tripType === "Round Trip" && (
              <motion.div
                variants={formVariants}
                className="grid grid-cols-2 gap-3 h-[58px]"
              >
                {/* Pickup Date Field */}
                <div className="relative">
                  <FaCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                  <label
                    htmlFor="DropDate"
                    className={`w-full pt-4 pb-2 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pl-8 bg-white shadow-sm flex text-sm items-center whitespace-nowrap`}
                  >
                    {formData.dropdate ? formData.dropdate : "Drop Date"}
                  </label>
                  <input
                    id="DropDate"
                    type="date"
                    className="absolute inset-0 text-sm  outline-none bg-transparent text-transparent cursor-pointer"
                    value={formData.dropdate}
                    onChange={(e) =>
                      handleFormChange("dropdate", e.target.value)
                    }
                  />
                </div>

                {/* Pickup Time Field */}
                <div className="relative">
                  <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                  <label
                    htmlFor="dropTime"
                    className={`w-full pt-4 pb-2 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pl-8 bg-white shadow-sm flex text-sm items-center whitespace-nowrap`}
                  >
                    {formData.droptime ? formData.droptime : "Drop Time"}
                  </label>
                  <input
                    id="dropTime"
                    type="time"
                    className="absolute inset-0  text-sm outline-none bg-transparent text-transparent cursor-pointer"
                    value={formData.droptime}
                    onChange={(e) =>
                      handleFormChange("droptime", e.target.value)
                    }
                  />
                </div>
              </motion.div>
            )}

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
                  value={formData.members}
                  onChange={(e) =>
                    handleFormChange("members", parseInt(e.target.value))
                  }
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
                  value={formData.luggage}
                  onChange={(e) =>
                    handleFormChange("luggage", parseInt(e.target.value))
                  }
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaWeightHanging />
                </span>
              </motion.div>
            </motion.div>

            {/* Intermediate Cities */}
           
            
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

export default ServiceForms;
