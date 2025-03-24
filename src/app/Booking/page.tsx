"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTaxi, FaCarSide, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import ServiceForms from "../../../components/ServiceForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type LocationType = {
  address: string;
  city: string;
  lat: number;
  lng: number;
};

const BookingPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

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

  // Service type state
  const [selectedOption, setSelectedOption] = useState<string>("Local");

  // Get user's current location
  useEffect(() => {
    const getAddressFromCoords = async (lat: number, lng: number) => {
      try {
        const response = await fetch("/api/get-address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude: lat, longitude: lng }),
        });
        const data = await response.json();
        setPickupLocation({
          address: data.address,
          city: data.city,
          lat: data.lat,
          lng: data.lng,
        });
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getAddressFromCoords(latitude, longitude);
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);

  const handleSearchCab = () => {
    if (!session?.user) {
      alert("Please login to continue");
      router.push("/signin");
      return;
    }

    const formData = JSON.parse(localStorage.getItem("tripFormData") || "{}");
    const tripData = {
      pickupLocation,
      dropLocation,
      selectedOption,
      formData,
    };

    localStorage.setItem("currentTripData", JSON.stringify(tripData));
    
    // Basic validation
    if (!pickupLocation.address || !formData.date || !formData.time) {
      alert("Please fill all required fields");
      return;
    }

    router.push(`/cabs/${selectedOption}`);
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Your Ride</h1>
        
        {/* Service Type Selector */}
        <div className="flex justify-center gap-4 mb-8">
          {["Local", "Rental", "Outstation"].map((option) => (
            <button
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors
                ${selectedOption === option 
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {option === "Local" && <FaTaxi />}
              {option === "Rental" && <FaCarSide />}
              {option === "Outstation" && <FaMapMarkedAlt />}
              {option}
            </button>
          ))}
        </div>

        {/* Service Form */}
        <motion.div
  className="flex justify-center ml-70"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <ServiceForms
    serviceType={selectedOption}
    pickupAddress={pickupLocation.address}
    dropAddress={dropLocation.address}
    onPickupChange={setPickupLocation}
    onDropChange={setDropLocation}
  />
</motion.div>


        {/* Search Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSearchCab}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg
                     flex items-center gap-2 transition-colors duration-300"
          >
            <FaSearch />
            Search Available Cabs
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;