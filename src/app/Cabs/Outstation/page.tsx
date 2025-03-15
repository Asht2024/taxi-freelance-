"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import BookingModal from "../../../../components/BookingModal";

interface LocationType {
  address: string;
  city: string;
  lat: number;
  lng: number;
}

const OutstationPage = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [tripData, setTripData] = useState({
    pickupLocation: null as LocationType | null,
    dropLocation: null as LocationType | null,
  });

  useEffect(() => {
    // Get locations from session storage
    const pickupLocation = sessionStorage.getItem("pickupLocation");
    const dropLocation = sessionStorage.getItem("dropLocation");

    if (pickupLocation && dropLocation) {
      setTripData({
        pickupLocation: JSON.parse(pickupLocation),
        dropLocation: JSON.parse(dropLocation),
      });
    }
  }, []);

  const outstationData = {
    type: "Outstation Oneway",
    distance: tripData.pickupLocation && tripData.dropLocation ? 
      `${calculateDistance(
        tripData.pickupLocation.lat,
        tripData.pickupLocation.lng,
        tripData.dropLocation.lat,
        tripData.dropLocation.lng
      ).toFixed(1)} km` : "Loading...",
    carType: "Sedan",
    model: "Skoda Slavi",
    capacity: { passengers: 4, luggage: 3 },
    driverAllowance: {
      perDay: 300,
      perNight: 250,
    },
    // Calculate price based on distance (₹15 per km + base price of ₹1000)
    get totalPrice() {
      if (!tripData.pickupLocation || !tripData.dropLocation) return 0;
      const distance = calculateDistance(
        tripData.pickupLocation.lat,
        tripData.pickupLocation.lng,
        tripData.dropLocation.lat,
        tripData.dropLocation.lng
      );
      return 1000 + (distance * 15);
    },
  };

  // Function to calculate distance between two points using Haversine formula
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  return (
    <div className="min-h-screen p-8 sm:pt-20">
      {showBookingModal && (
        <BookingModal
          packageDetails={{
            duration: "1 day",
            price: outstationData.totalPrice,
            extra: {
              distance: outstationData.distance,
              time: "24 hours"
            }
          }}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <motion.h1
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          className="text-4xl font-bold text-blue-600 mb-6"
        >
          Outstation Cabs
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gray-200 rounded-lg mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold mb-2">
              {outstationData.carType} - {outstationData.model}
            </h3>
            <div className="space-y-2 mb-4">
              <p className="text-gray-600">Distance: {outstationData.distance}</p>
              <p className="text-gray-600">Model: {outstationData.model}</p>
              <p className="text-gray-600">
                Passengers: {outstationData.capacity.passengers}
              </p>
              <p className="text-gray-600">
                Luggage: {outstationData.capacity.luggage}
              </p>
              <p className="text-gray-600">
                Driver Allowance (Day): ₹{outstationData.driverAllowance.perDay}
              </p>
              <p className="text-gray-600">
                Driver Allowance (Night): ₹{outstationData.driverAllowance.perNight}
              </p>
              <p className="text-lg font-bold text-blue-600">
                Total Price: ₹{outstationData.totalPrice}
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowBookingModal(true)}
            >
              Book Now
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OutstationPage;