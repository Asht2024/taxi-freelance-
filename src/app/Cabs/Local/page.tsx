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
}

const LocalPage = () => {
  const router = useRouter();
  const [mycars, setMyCars] = useState<CarType[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0); 
  
  const Cities = [
    "Vadodara",
    "Ahmedabad",
    "Rajkot",
    "Hirasar",
    "Dahod",
    "Morbi",
  ];
  const cars = [
    {
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
    const dataString = localStorage.getItem("currentTripData") || "";
    console.log("data is" + localStorage.getItem("currentTripData"));
    const data = JSON.parse(dataString); // Parse it into a JavaScript object
    const pickupcity = data.pickupLocation.city;
    const dropcity = data.dropLocation.city;
    async function calculateDistance() {
        try {
            const response = await axios.post("/api/get-distance", {
                lat1:data.pickupLocation.lat,
                lng1:data.pickupLocation.lng,
                lat2:data.dropLocation.lat,
                lng2:data.dropLocation.lng,
            });
  
            if (response.data.success) {
              setTotalDistance(response.data.distance);
              const totaldistance = response.data.distance;
              if (totaldistance > 40) {
                alert(
                  "your Totaldistance more than 40km then continue your booking in outstation one-way"
                );
                gooutstation();
              }
                const processedCars = cars
                .filter(
                  (car) =>
                    car.passenger >= data.formData?.members &&
                    car.luggage >= data.formData?.luggage
                )
                .map((car) => {
                  let calculatedprice = 0;
                  if (pickupcity == Cities[0]) {
                    if (car.car_name == "Sedan") {
                      if (totaldistance <= 15) {
                        calculatedprice = 700;
                      } else if (totaldistance <= 20) {
                        calculatedprice = 1000;
                      } else if (totaldistance <= 25) {
                        calculatedprice = 1250;
                      } else {
                        calculatedprice =
                          1250 + (totaldistance - 25) * car.local_price_per_km;
                      }
                    } else if (car.car_name == "SUV") {
                      if (totaldistance <= 15) {
                        calculatedprice = 1300;
                      } else if (totaldistance <= 20) {
                        calculatedprice = 1600;
                      } else if (totaldistance <= 25) {
                        calculatedprice = 2000;
                      } else {
                        calculatedprice =
                          2000 + (totaldistance - 25) * car.local_price_per_km;
                      }
                    } else {
                      calculatedprice =
                        car.local_min_price +
                        (totaldistance - 5) * car.local_price_per_km;
                    }
                  } else if (pickupcity == Cities[1]) {
                    if (car.car_name == "Sedan") {
                      if (dropcity == Cities[4]) {
                        calculatedprice = 3700;
                      } else if (dropcity == Cities[2] || dropcity == Cities[5]) {
                        calculatedprice = 2800;
                      } else if (totaldistance <= 20) {
                        calculatedprice = 700;
                      } else if (totaldistance <= 25) {
                        calculatedprice = 950;
                      } else if (totaldistance <= 30) {
                        calculatedprice = 1250;
                      } else if (totaldistance <= 35) {
                        calculatedprice = 1550;
                      } else {
                        calculatedprice = 1850;
                      }
                    } else if (car.car_name == "SUV") {
                      if (dropcity == Cities[4]) {
                        calculatedprice = 4500;
                      } else if (dropcity == Cities[2] || dropcity == Cities[5]) {
                        calculatedprice = 3500;
                      } else if (totaldistance <= 20) {
                        calculatedprice = 1500;
                      } else if (totaldistance <= 25) {
                        calculatedprice = 1800;
                      } else if (totaldistance <= 30) {
                        calculatedprice = 2200;
                      } else if (totaldistance <= 35) {
                        calculatedprice = 2500;
                      } else {
                        calculatedprice = 2800;
                      }
                    } else if (car.car_name == "Innova") {
                      if (dropcity == Cities[4]) {
                        calculatedprice = 5600;
                      } else if (dropcity == Cities[2] || dropcity == Cities[5]) {
                        calculatedprice = 6000;
                      } else if (totaldistance <= 20) {
                        calculatedprice = 2500;
                      } else if (totaldistance <= 25) {
                        calculatedprice = 2500;
                      } else if (totaldistance <= 30) {
                        calculatedprice = 3000;
                      } else if (totaldistance <= 35) {
                        calculatedprice = 3200;
                      } else {
                        calculatedprice = 3500;
                      }
                    } else {
                      if (dropcity == Cities[4]) {
                        calculatedprice = 6500;
                      } else if (dropcity == Cities[2] || dropcity == Cities[5]) {
                        calculatedprice = 7000;
                      } else if (totaldistance <= 20) {
                        calculatedprice = 3000;
                      } else if (totaldistance <= 25) {
                        calculatedprice = 3000;
                      } else if (totaldistance <= 30) {
                        calculatedprice = 3500;
                      } else if (totaldistance <= 35) {
                        calculatedprice = 3700;
                      } else {
                        calculatedprice = 3800;
                      }
                    }
                  } else if (
                    (pickupcity == Cities[2] && dropcity == Cities[3]) ||
                    (dropcity == Cities[2] && pickupcity == Cities[3])
                  ) {
                    if (car.car_name == "Sedan") {
                      calculatedprice = 1150;
                    } else if (car.car_name == "SUV") {
                      calculatedprice = 1800;
                    } else if (car.car_name == "Innova") {
                      calculatedprice = 3000;
                    } else {
                      calculatedprice = 4000;
                    }
                  } else if (
                    (pickupcity == Cities[2] && dropcity == Cities[1]) ||
                    (pickupcity == Cities[6] && dropcity == Cities[1])
                  ) {
                    if (car.car_name == "Sedan") {
                      calculatedprice = 2800;
                    } else if (car.car_name == "SUV") {
                      calculatedprice = 3500;
                    } else if (car.car_name == "Innova") {
                      calculatedprice = 6000;
                    } else {
                      calculatedprice = 7000;
                    }
                  } else {
                    calculatedprice =
                      car.local_min_price + (totaldistance - 5) * car.local_price_per_km;
                  }
          
                  car.calculated_price = calculatedprice;
          
                  return {
                    ...car,
                    calculated_price: calculatedprice,
                  }; // Create NEW objects
                });
                setMyCars(processedCars);
            } else {
                alert("No route found");
                gohome();
                return
            }
        } catch (er) {
          console.log(er)
           return 
        }
    };
 
    calculateDistance();
  }, []);
  const handleonclick = (car: CarType) => {
    const route = "/Cabs/Local/Booking";
    localStorage.setItem("selectedcars", JSON.stringify(car));
    localStorage.setItem('car',car.car_name)
    localStorage.setItem('price',JSON.stringify(car.calculated_price))
    router.push(route);
  };
  const gohome = () => {
    const route = "/";
    router.push(route);
  };
  const gooutstation  = () => {
    const route = "/Cabs/Outstation";
    router.push(route);
  };

  return (
    <div className="min-h-screen p-8 sm:pt-20 mt-14">
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
          Local Cabs
        </motion.h1>

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
                  <p className="text-sm text-gray-600 font-medium">
                    Total Distance: {totalDistance.toFixed(1)} km
                  </p>
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

export default LocalPage;
