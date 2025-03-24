"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTaxi, FaCarSide, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import Maps from "./Map";
import ServiceForms from "./ServiceForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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

type OptionType = string;

const MainPage = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session.data?.user?.email) {
      const confirmed = window.confirm(
        "You need to login to continue. Click OK to be redirected to the login page."
      );
      
      if (confirmed) {
        router.push("/signin");
      } else {
        // Optional: You can add additional handling here if user clicks Cancel
        router.push("/"); // Redirect to home if they cancel
      }
    }
  }, [session.data?.user?.email, router]);
  

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
    
    if (selectedOption === "Local") {
      if (!dropLocation.address) {
        alert("Please enter drop location!");
        return;
      }
    } else if (selectedOption !== "Rental") {
      if (!dropLocation.address) {
        alert("Please enter drop location!");
        return;
      } else if (data.tripType === "Outstation") {
        if (!data.dropdate || !data.droptime) {
          alert("Please enter drop date OR time!");
          return;
        }
      }
    }

    if (!session.data?.user.email) {
      alert("Please login to continue");
      router.push('/signin');
    } else {
      setTimeout(() => {
        router.push(route);
      }, 500);
    }
  }; // Fixed missing closing brace here

  useEffect(() => {
    const phrases: string[] = [
      "Trusted Taxi Solution in Gujarat",
      "Local taxi cab service in Ahmedabad",
      "Rajkot to Hirasar airport taxi service",
      "Taxi service in Ahmedabad airport",
    ];

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

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full text-left space-y-4 md:space-y-6 min-w-[320px] p-4 md:p-6 pt-9 sm:pt-24"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Asht Cab
          </h1>
          <div className="hidden md:block text-lg font-mono text-gray-600 font-semibold">
            {text}
            <span className="ml-1 animate-blink">|</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="space-y-6 mt-20"
        >
          <div className="md:flex md:gap-8 md:items-start">
            {/* Form Section */}
            <div className="w-full md:flex-[1.5] md:max-w-2xl lg:max-w-3xl mx-auto space-y-6 px-4">
              {/* Service Selection Buttons */}
              <motion.div className="flex gap-4 justify-center md:justify-start">
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
                        className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded-md
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
                      onClick={() => setSelectedOption(option.name)}
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
              </motion.div>

              {/* Service Forms */}
              <motion.div className="relative min-h-[160px]">
                <ServiceForms
                  key={selectedOption}
                  serviceType={selectedOption}
                  pickupAddress={pickupLocation.address}
                  dropAddress={dropLocation.address}
                  onPickupChange={setPickupLocation}
                  onDropChange={setDropLocation}
                />
              </motion.div>

              {/* Search Cab Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearchCab}
                className="w-full md:w-auto px-6 py-3 rounded-lg flex items-center justify-center space-x-2 shadow-lg 
                         transition-all bg-blue-600 text-white hover:bg-blue-700 mx-auto md:mx-0"
              >
                <FaSearch size={18} />
                <span>Search Cab</span>
              </motion.button>
            </div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="hidden xl:block md:flex-1 md:min-w-[400px] lg:min-w-[450px] mt-8 md:mt-0"
            >
              <Maps />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MainPage;