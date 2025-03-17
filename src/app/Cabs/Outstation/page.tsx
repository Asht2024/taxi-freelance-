"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";


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
}
const OutstationPage = () => {
    const router = useRouter();
    const [mycars, setMyCars] = useState<CarType[]>([]);
    const cars = [
       { model: "Skoda Slavia", image_url: "/sedan.png", car_name: "Sedan", local_price_per_km: 35, local_min_price: 550, rental_price: "1650 1950 1800 11 160", outstation_per_km: 11, outstation_min: 1800, luggage: 4, passenger: 3, calculated_price: 0 },
       { model: "Mahindra Scorpio", image_url: "/suv.png", car_name: "SUV", local_price_per_km: 75, local_min_price: 1000, rental_price: "2450 2850 3550 14 200", outstation_per_km: 14, outstation_min: 2500, luggage: 6, passenger: 6, calculated_price: 0 },
       { model: "Toyota", image_url: "/inova.png", car_name: "Innova", local_price_per_km: 125, local_min_price: 1800, rental_price: "3800 4500 17 260", outstation_per_km: 18, outstation_min: 3800, luggage: 7, passenger: 6, calculated_price: 0 },
       { model: "Toyota", image_url: "/inovacysta.png", car_name: "Innova Cysta", local_price_per_km: 150, local_min_price: 1800, rental_price: "4700 5500 17 260", outstation_per_km: 21, outstation_min: 4800, luggage: 7, passenger: 6, calculated_price: 0 },
     ]
     useEffect(() => {
      const dataString = localStorage.getItem("currentTripData");
      console.log("data is", dataString);
    
      if (!dataString) return;
    
      try {
        const data = JSON.parse(dataString);
    
        // Calculate total travel allowance
        const calculateAllowance = () => {
          try {
            const startDate = new Date(`${data.formData.date}T${data.formData.time}`);
            const endDate = new Date(`${data.formData.dropdate}T${data.formData.droptime}`);
    
            const diffMs = endDate.getTime() - startDate.getTime();
            const diffHours = Math.abs(diffMs / (1000 * 60 * 60));
    
            const days = Math.floor(diffHours / 24);
            const nights = Math.ceil((diffHours % 24) / 12); // Assuming 12 hours = 1 night
            return (days * 300) + (nights * 250);
          } catch (error) {
            console.error("Error calculating allowance:", error);
            return 0;
          }
        };
    
        // Calculate distance using provided coordinates
        const totaldistance = calculateDistance(
          data.pickupLocation.lat,
          data.pickupLocation.lng,
          data.dropLocation.lat,
          data.dropLocation.lng
        );
    
        console.log("Total distance:", totaldistance);
    
        // Filter and calculate pricing for cars
        const processedCars = cars
          .filter((car) =>
            car.passenger >= data.formData?.members &&
            car.luggage >= data.formData?.luggage
          )
          .map((car) => {
            const calculatedPrice = car.outstation_min + totaldistance * car.outstation_per_km;
            let allowance = 0
            if(data.formData.tripType != "One Way"){
            allowance = calculateAllowance();
            console.log("Allowance:", allowance);
            }
            return {
              ...car,
              calculated_price: calculatedPrice + allowance,
            };
          });
    
        setMyCars(processedCars);
      } catch (error) {
        console.error("Error parsing data or processing cars:", error);
      }
    }, []);
     const handleonclick = (car: CarType) => {
       const route = '/Cabs/Outstation/Booking';
       localStorage.setItem("selectedcars", JSON.stringify(car));
       router.push(route);
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
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mycars.map((car, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Car Image */}
                <div className="h-48 relative overflow-hidden rounded-t-xl">
                  <img
                    src={car.image_url}
                    alt={car.car_name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Car Details */}
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

                  {/* Price Section */}
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-gray-900">
                      ₹{(car.calculated_price ?? 0).toFixed(2)}
                      <span className="text-sm text-gray-500 ml-1">/ trip</span>
                    </p>
                    {car.calculated_price && (
                      <p className="text-sm text-green-600 mt-1">
                        All Inclusive Price
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {car.luggage} Luggage
                      </span>
                    </div>
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
        </div>
      </motion.div>
    </div>
  );
};
const AllowanceInfo = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-blue-50 p-4 rounded-xl mb-8 flex items-center gap-4"
  >
    <div className="flex items-center gap-2">
      <div className="bg-blue-100 p-2 rounded-full">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
        </svg>
      </div>
      <span className="font-medium">Day Allowance: ₹300</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="bg-blue-100 p-2 rounded-full">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      </div>
      <span className="font-medium">Night Allowance: ₹250</span>
    </div>
  </motion.div>
);

export default OutstationPage;