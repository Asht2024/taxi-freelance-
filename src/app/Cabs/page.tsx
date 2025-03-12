"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

type RideOptionBase = {
  type: string;
  carType: string;
  model: string;
  capacity: {
    passengers: number;
    luggage: number;
  };
};

type LocalOption = RideOptionBase & {
  distance: string;
  totalPrice: number;
};

type RentalOption = RideOptionBase & {
  packages: {
    duration: string;
    price: number;
    extra: {
      distance: string;
      time: string;
    };
  }[];
};

type OutstationOption = RideOptionBase & {
  distance: string;
  driverAllowance: {
    perDay: number;
    perNight: number;
  };
  totalPrice: number;
};

type RideOptions = {
  local: LocalOption;
  rental: RentalOption;
  outstation: OutstationOption;
};

const rideOptions: RideOptions = {
  local: {
    type: "Local",
    distance: "141 km",
    carType: "Sedan",
    model: "Skoda Slavi",
    capacity: {
      passengers: 4,
      luggage: 3,
    },
    totalPrice: 5317.11,
  },
  rental: {
    type: "Rental",
    carType: "Sedan",
    model: "Skoda Slavi",
    capacity: {
      passengers: 4,
      luggage: 3,
    },
    packages: [
      {
        duration: "6hr / 60km",
        price: 1650,
        extra: {
          distance: "11km",
          time: "160min",
        },
      },
      {
        duration: "8hr / 80km",
        price: 1950,
        extra: {
          distance: "11km",
          time: "160min",
        },
      },
      {
        duration: "12hr / 120km",
        price: 2800,
        extra: {
          distance: "11km",
          time: "160min",
        },
      },
    ],
  },
  outstation: {
    type: "Outstation Oneway",
    distance: "141 km",
    carType: "Sedan",
    model: "Skoda Slavi",
    capacity: {
      passengers: 4,
      luggage: 3,
    },
    driverAllowance: {
      perDay: 300,
      perNight: 250,
    },
    totalPrice: 2088.23,
  },
};

const CabsPage: FC = () => {
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get("type")?.toLowerCase() as keyof RideOptions;
  const selectedData = rideOptions[typeParam] || rideOptions.local;

  return (
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
          className="text-4xl font-bold text-blue-600 mb-8"
        >
          {selectedData.type} Cabs
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedData.type === "Rental" ? (
            (selectedData as RentalOption).packages.map((pkg, index) => (
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
                  <p className="text-gray-600">
                    Extra Distance: {pkg.extra.distance}
                  </p>
                  <p className="text-gray-600">
                    Extra Time: {pkg.extra.time}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {(selectedData as RentalOption).capacity.passengers} Seater
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
                <p className="text-gray-600">Model: {selectedData.model}</p>
                {"distance" in selectedData && (
                  <p className="text-gray-600">
                    Distance: {selectedData.distance}
                  </p>
                )}
                <p className="text-gray-600">
                  Passengers: {selectedData.capacity.passengers}
                </p>
                <p className="text-gray-600">
                  Luggage: {selectedData.capacity.luggage}
                </p>
                {"driverAllowance" in selectedData && (
                  <>
                    <p className="text-gray-600">
                      Driver Allowance (Day): ₹
                      {selectedData.driverAllowance.perDay}
                    </p>
                    <p className="text-gray-600">
                      Driver Allowance (Night): ₹
                      {selectedData.driverAllowance.perNight}
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CabsPage;
