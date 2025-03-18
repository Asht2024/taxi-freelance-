"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  FaTaxi, FaCarSide, FaMapMarkedAlt, FaSearch, FaShieldAlt, 
  FaClock, FaWallet, FaStar, FaRoute, FaHeadset, FaSmile
} from "react-icons/fa";
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

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

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const featureCardVariants = {
    hover: { y: -10, scale: 1.05 },
    rest: { y: 0, scale: 1 }
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
          {/* Service Selection Buttons */}
          <motion.div className="flex gap-4">
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
</motion.div>

          {/* Service Forms */}
          <motion.div className="relative min-h-[160px] md:w-4/5">
            <ServiceForms
              key={selectedOption}
              serviceType={selectedOption}
              pickupAddress={pickupLocation.address}
              dropAddress={dropLocation.address}
              onPickupChange={(newLocation) => setPickupLocation(newLocation)}
              onDropChange={(newLocation) => setDropLocation(newLocation)}
            />
          </motion.div>

          {/* Search Cab Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearchCab}
            className={`w-full md:w-auto px-6 py-3 rounded-lg flex items-center justify-center space-x-2 shadow-lg transition-all bg-blue-600 text-white hover:bg-blue-700`}
          >
            <FaSearch size={18} />
            <span>Search Cab</span>
          </motion.button>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden md:flex md:w-1/2 md:absolute md:right-0 md:bottom-3/4 md:h-auto justify-center"
          >
            <Maps />
          </motion.div>
        </motion.div>

        {/* Value Proposition Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
          className="py-12 space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Revolutionizing Travel in Gujarat
          </h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={sectionVariants}
          >
            {[
              { icon: <FaShieldAlt />, title: "Safe & Secure", color: "bg-red-100" },
              { icon: <FaClock />, title: "24/7 Service", color: "bg-blue-100" },
              { icon: <FaWallet />, title: "Transparent Pricing", color: "bg-green-100" },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={featureCardVariants}
                whileHover="hover"
                className={`p-6 rounded-xl ${item.color} flex flex-col items-center gap-4`}
              >
                <div className="text-4xl text-gray-700">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
          className="py-12 bg-gray-50 rounded-3xl"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Sets Us Apart
            </h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={sectionVariants}
            >
              {[
                { 
                  title: "Expert Chauffeurs",
                  content: "Professional drivers with extensive local knowledge",
                  icon: <FaStar className="text-3xl text-yellow-500"/>
                },
                {
                  title: "Pan-Gujarat Coverage",
                  content: "Serving 100+ cities across the state",
                  icon: <FaRoute className="text-3xl text-blue-500"/>
                },
                {
                  title: "Luxury Fleet",
                  content: "Well-maintained, modern vehicles",
                  icon: <FaCarSide className="text-3xl text-green-500"/>
                },
              ].map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={featureCardVariants}
                  whileHover="hover"
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-full bg-opacity-20">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          ref={ref}
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
          className="py-12 relative overflow-hidden"
        >
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"
          />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12">
              Seamless Booking Journey
            </h2>
            <motion.div
              className="space-y-12 relative"
              variants={sectionVariants}
            >
              {/* Timeline line */}
              <div className="absolute left-1/2 w-1 h-full bg-gray-200 rounded-full -translate-x-1/2"/>
              
              {[
                { step: 1, title: "Choose Your Ride", icon: <FaCarSide /> },
                { step: 2, title: "Set Locations", icon: <FaMapMarkedAlt /> },
                { step: 3, title: "Confirm & Travel", icon: <FaShieldAlt /> },
              ].map((step, idx) => (
                <motion.div
                  key={step.step}
                  variants={featureCardVariants}
                  className="relative z-10 flex items-center justify-center gap-8 even:flex-row-reverse"
                >
                  <div className="w-1/2 p-4">
                    <h3 className="text-2xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {idx === 0 && "Select from our range of premium vehicles"}
                      {idx === 1 && "Enter your pickup and destination details"}
                      {idx === 2 && "Secure payment and instant confirmation"}
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="py-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl"
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <FaHeadset className="text-5xl mx-auto mb-6"/>
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl mb-8">
              Experience Gujarat like never before with our premium service
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
            >
              <FaSmile className="text-xl"/>
              Start Your Journey
            </motion.button>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
};

export default MainPage;