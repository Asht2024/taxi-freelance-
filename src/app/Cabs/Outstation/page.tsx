"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface CarType {
  model: string;
  image_url: string;
  car_name: string;
  local_price_per_km: number;
  local_min_price: number;
  rental_price: string;
  outstation_per_km: number;
  outstation_min: number;
  luggage: number;
  passenger: number;
  calculated_price: number;
  outstation_oneway: number;
}

const OutstationPage = () => {
  const router = useRouter();
  const [mycars, setMyCars] = useState<CarType[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  const cars: CarType[] = [
    {
      outstation_oneway: 18,
      model: "Swift Dzire or Equivalent",
      image_url: "/sedan.png",
      car_name: "Sedan",
      local_price_per_km: 35,
      local_min_price: 550,
      rental_price: "1650 1950 1800 11 160",
      outstation_per_km: 11,
      outstation_min: 1800,
      luggage: 4,
      passenger: 4,
      calculated_price: 0,
    },
    {
      outstation_oneway: 21,
      model: "Ertiga or Equivalent",
      image_url: "/suv.png",
      car_name: "SUV",
      local_price_per_km: 75,
      local_min_price: 1000,
      rental_price: "2450 2850 3550 14 200",
      outstation_per_km: 14,
      outstation_min: 2500,
      luggage: 6,
      passenger: 6,
      calculated_price: 0,
    },
    {
      outstation_oneway: 28,
      model: "Marrazo or Equivalent",
      image_url: "/inova.png",
      car_name: "Innova",
      local_price_per_km: 125,
      local_min_price: 1800,
      rental_price: "3800 4500 17 260",
      outstation_per_km: 18,
      outstation_min: 3800,
      luggage: 7,
      passenger: 7,
      calculated_price: 0,
    },
    {
      outstation_oneway: 30,
      model: "or Equivalent",
      image_url: "/inovacysta.png",
      car_name: "Innova Cysta",
      local_price_per_km: 150,
      local_min_price: 1800,
      rental_price: "4700 5500 17 260",
      outstation_per_km: 21,
      outstation_min: 4800,
      luggage: 7,
      passenger: 7,
      calculated_price: 0,
    },
  ];

  useEffect(() => {
    const dataString = localStorage.getItem("currentTripData");
    if (!dataString) return;

    const data = JSON.parse(dataString);

    const startDate = new Date(data.formData.date);
    const endDate = new Date(data.formData.dropdate);

    // Set both times to 00:00:00 for accurate full day counting
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const dayCount = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;


    const calculatePrices = async () => {
      try {
        const res = await axios.post("/api/get-distance", {
          lat1: data.pickupLocation.lat,
          lng1: data.pickupLocation.lng,
          lat2: data.dropLocation.lat,
          lng2: data.dropLocation.lng,
        });

        if (!res.data.success) {
          alert("No route found");
          router.push("/");
          return;
        }

        const distance = res.data.distance;
        setTotalDistance(distance);

        let allowance = 0
        if(dayCount){
          allowance = dayCount * 300 + (dayCount - 1) * 250;
        }

        const processedCars = cars
          .filter(
            (car) =>
              car.passenger >= data.formData?.members &&
              car.luggage >= data.formData?.luggage
          )
          .map((car) => {
            let calculatedPrice = 0;

            if (data.formData.tripType !== "One Way") {
              const minimumDistance = dayCount * 300;
              calculatedPrice =
                distance >= minimumDistance
                  ? distance * car.outstation_per_km
                  : minimumDistance * car.outstation_per_km;
            } else {
              if (distance <= 100) {
                calculatedPrice = car.outstation_min;
              } else {
                calculatedPrice =
                  car.outstation_min +
                  (distance - 100) * car.outstation_oneway;
              }
            }

            return {
              ...car,
              calculated_price: calculatedPrice + allowance,
            };
          });

        setMyCars(processedCars);
      } catch (err) {
        console.error(err);
        alert("Error fetching distance");
      }
    };

    calculatePrices();
  }, []);

  const handleonclick = (car: CarType) => {
    localStorage.setItem("selectedcars", JSON.stringify(car));
    localStorage.setItem("car", car.car_name);
    localStorage.setItem("price", JSON.stringify(car.calculated_price));
    router.push("/Cabs/Outstation/Booking");
  };

  return (
    <div className="min-h-screen p-8 mt-14 sm:pt-20">
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

        <AllowanceInfo />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mycars.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden rounded-t-xl">
                <img
                  src={car.image_url}
                  alt={car.car_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {car.car_name}
                    </h3>
                    <p className="text-gray-500 text-sm">{car.model}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {car.passenger} Seats
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{car.calculated_price.toFixed(2)}
                    <span className="text-sm text-gray-500 ml-1">/ trip</span>
                  </p>
                  {car.calculated_price > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      All Inclusive Price
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Distance: {totalDistance.toFixed(1)} km
                </p>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-600">
                    {car.luggage} Luggage
                  </span>
                  <button
                    onClick={() => handleonclick(car)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors duration-300 flex items-center"
                  >
                    Book Now
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mycars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No cars available matching your criteria
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const AllowanceInfo = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`bg-blue-50 p-4 rounded-xl mb-8 text-blue-800 font-medium flex flex-col sm:flex-row sm:justify-between gap-2`}
  >
    <span className="text-center sm:text-left">
      Day Allowance (₹300)
    </span>
    <span className="text-center sm:text-right">
      Night Allowance (₹250)
    </span>
  </motion.div>
);


export default OutstationPage;
