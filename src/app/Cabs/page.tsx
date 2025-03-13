"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

// Type Definitions
interface Capacity {
  passengers: number;
  luggage: number;
}

interface ExtraInfo {
  distance: string;
  time: string;
}

interface RentalPackage {
  duration: string;
  price: number;
  extra: ExtraInfo;
}

interface DriverAllowance {
  perDay: number;
  perNight: number;
}

interface BaseRideOption {
  type: string;
  carType: string;
  model: string;
  capacity: Capacity;
}

interface LocalRideOption extends BaseRideOption {
  distance: string;
  totalPrice: number;
}

interface RentalRideOption extends BaseRideOption {
  packages: RentalPackage[];
}

interface OutstationRideOption extends BaseRideOption {
  distance: string;
  totalPrice: number;
  driverAllowance: DriverAllowance;
}



const rideOptions: {
  local: LocalRideOption;
  rental: RentalRideOption;
  outstation: OutstationRideOption;
} = {
  local: {
    type: "Local",
    distance: "141 km",
    carType: "Sedan",
    model: "Skoda Slavi",
    capacity: { passengers: 4, luggage: 3 },
    totalPrice: 5317.11,
  },
  rental: {
    type: "Rental",
    carType: "Sedan",
    model: "Skoda Slavi",
    capacity: { passengers: 4, luggage: 3 },
    packages: [
      {
        duration: "6hr / 60km",
        price: 1650,
        extra: { distance: "11km", time: "160min" },
      },
      {
        duration: "8hr / 80km",
        price: 1950,
        extra: { distance: "11km", time: "160min" },
      },
      {
        duration: "12hr / 120km",
        price: 2800,
        extra: { distance: "11km", time: "160min" },
      },
    ],
  },
  outstation: {
    type: "Outstation Oneway",
    distance: "141 km",
    carType: "Sedan",
    model: "Skoda Slavi",
    capacity: { passengers: 4, luggage: 3 },
    driverAllowance: {
      perDay: 300,
      perNight: 250,
    },
    totalPrice: 2088.23,
  },
};

// Props type for BookingModal
interface BookingModalProps {
  packageDetails: RentalPackage | null;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ packageDetails, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="bg-white rounded-xl p-6 w-full max-w-lg"
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-4">BOOKING DETAILS</h2>

      <div className="space-y-4">
        <div>
          <p className="font-semibold">Booking Type: <span className="font-normal">Rental</span></p>
          <p className="font-semibold">Pickup Location: <span className="font-normal">WFQP+VM, Chandapur, Uttar Pradesh</span></p>
          <p className="font-semibold">Booking Date: <span className="font-normal">2025-03-18 at 00:00</span></p>
          <p className="font-semibold">Vehicle: <span className="font-normal">Innova Crysta</span></p>
          <p className="font-semibold">Package: <span className="font-normal">{packageDetails?.duration || "N/A"}</span></p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-bold mb-2">PERSONAL DETAILS</h3>
          <div className="space-y-3">
            <input type="text" placeholder="Full Name*" className="w-full p-2 border rounded-lg" required />
            <input type="tel" placeholder="Contact Number*" className="w-full p-2 border rounded-lg" required />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Confirm ₹{packageDetails?.price || "N/A"}
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const CabsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const type = searchParams?.get("type")?.toLowerCase() || "local";
  const selectedData = rideOptions[type as keyof typeof rideOptions] || rideOptions.local;

  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<RentalPackage | null>(null);

  const handleBookNow = (pkg: RentalPackage | null = null) => {
    setSelectedPackage(pkg);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen p-8 sm:pt-20">
      {showBookingModal && (
        <BookingModal
          packageDetails={selectedPackage}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-8 sm:pt-20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="text-4xl font-bold text-blue-600 mb-6"
          >
            {selectedData.type} Cabs
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {"packages" in selectedData ? (
              selectedData.packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 bg-gray-200 rounded-lg mb-4 animate-pulse" />
                  <h3 className="text-xl font-semibold mb-2">{pkg.duration}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">Price: ₹{pkg.price}</p>
                    <p className="text-gray-600">Extra: {pkg.extra.distance} per km</p>
                    <p className="text-gray-600">Extra Time: {pkg.extra.time} per hour</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {selectedData.capacity.passengers} Seater
                    </span>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => handleBookNow(pkg)}
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow col-span-full md:col-span-2 lg:col-span-1"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold mb-2">
                  {selectedData.type} - {selectedData.carType}
                </h3>
                <div className="space-y-2 mb-4">
                  {"distance" in selectedData && (
                    <p className="text-gray-600">Distance: {selectedData.distance}</p>
                  )}
                  <p className="text-gray-600">Model: {selectedData.model}</p>
                  <p className="text-gray-600">Passengers: {selectedData.capacity.passengers}</p>
                  <p className="text-gray-600">Luggage: {selectedData.capacity.luggage}</p>
                  {"driverAllowance" in selectedData && (
                    <>
                      <p className="text-gray-600">
                        Driver Allowance (Day): ₹{selectedData.driverAllowance.perDay}
                      </p>
                      <p className="text-gray-600">
                        Driver Allowance (Night): ₹{selectedData.driverAllowance.perNight}
                      </p>
                    </>
                  )}
                  {"totalPrice" in selectedData && (
                    <p className="text-lg font-bold text-blue-600">
                      Total Price: ₹{selectedData.totalPrice}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {selectedData.capacity.passengers} Seater
                  </span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => handleBookNow(null)}
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CabsPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CabsContent />
    </Suspense>
  );
};

export default CabsPage;
