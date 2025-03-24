"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface CarType {
  model: string;
  image_url: string;
  car_name: string;
  rental_price: string;
  luggage: number;
  passenger: number;
}

interface PackageType {
  hours: number;
  km: number;
  price: number;
  extraKm: number;
  extraTime: number;
}

const RentalPage = () => {
  const router = useRouter();
  const [selectedCar, setSelectedCar] = useState<{id: number, packageIndex: number} | null>(null);
  const [mycars, setMyCars] = useState<CarType[]>([]);

  const parsePackages = (rentalString: string) => {
    const numbers = rentalString.split(' ').map(Number);
    const packages: PackageType[] = [];
    
    if(numbers.length === 4) {
      packages.push(
        { hours: 8, km: 80, price: numbers[0], extraKm: numbers[2], extraTime: numbers[3] },
        { hours: 12, km: 120, price: numbers[1], extraKm: numbers[2], extraTime: numbers[3] }
      );
    } else if(numbers.length === 5) {
      packages.push(
        { hours: 6, km: 60, price: numbers[0], extraKm: numbers[3], extraTime: numbers[4] },
        { hours: 8, km: 80, price: numbers[1], extraKm: numbers[3], extraTime: numbers[4] },
        { hours: 12, km: 120, price: numbers[2], extraKm: numbers[3], extraTime: numbers[4] }
      );
    }
    return packages;
  };

  const cars = [
    { model: "Swift Dzire or Equivalent", image_url: "/sedan.png", car_name: "Sedan", 
      rental_price: "1650 1950 2850 11 160", luggage: 4, passenger: 4 },
    { model: "Ertiga or Equivalent", image_url: "/suv.png", car_name: "SUV", 
      rental_price: "2450 2850 3550 14 200", luggage: 6, passenger: 6 },
    { model: "Marrazo or Equivalent", image_url: "/inova.png", car_name: "Innova", 
      rental_price: "3800 4500 17 260", luggage: 7, passenger: 7},
    { model: "or Equivalent", image_url: "/inovacysta.png", car_name: "Innova Cysta", 
      rental_price: "4700 5500 17 260", luggage: 7, passenger: 7 },
  ];
  const handleBookPackage = (car: CarType, pkg: PackageType) => {
    const bookingData = {
      car: {
        model: car.model,
        image_url: car.image_url,
        car_name: car.car_name,
        luggage: car.luggage,
        passenger: car.passenger
      },
      package: pkg
    };
    localStorage.setItem('car',car.car_name)
    localStorage.setItem('price',JSON.stringify(pkg.price))
    
    localStorage.setItem("selectedRentalPackage", JSON.stringify(bookingData));
    router.push('/Cabs/Rental/Booking')
  };
  useEffect(() => {
    const dataString = localStorage.getItem("currentTripData") || "";
    const data = JSON.parse(dataString);
    const processedCars = cars.filter(car => 
      car.passenger >= data.formData?.members && 
      car.luggage >= data.formData?.luggage
    );
    setMyCars(processedCars);
  }, []);

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
          className="text-4xl font-bold text-blue-600 mb-6 text-center"
        >
          Choose Your Rental Package
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mycars.map((car, carIndex) => {
            const packages = parsePackages(car.rental_price);
            
            return (
              <motion.div
                key={carIndex}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="relative h-48 bg-blue-50">
                  <img 
                    src={car.image_url} 
                    alt={car.car_name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{car.car_name}</h3>
                      <p className="text-gray-500 text-sm">{car.model}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                        {car.passenger} Seats
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                        {car.luggage} Luggage
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {packages.map((pkg, pkgIndex) => (
                      <motion.div
                        key={pkgIndex}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all
                          ${selectedCar?.id === carIndex && selectedCar?.packageIndex === pkgIndex 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-400'}`}
                        onClick={() => setSelectedCar({id: carIndex, packageIndex: pkgIndex})}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">
                              {pkg.hours} Hours / {pkg.km} KM
                            </h4>
                            <p className="text-sm text-gray-600">
                              Extra: {pkg.extraKm}/km and {pkg.extraTime}/hr
                            </p>
                          </div>
                          <span className="text-2xl font-bold text-blue-600">
                            ₹{pkg.price}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {selectedCar?.id === carIndex && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-6"
                    >
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl 
                        font-semibold text-lg shadow-lg transform transition-all duration-300 
                        hover:scale-[1.02]"
                        onClick={() => handleBookPackage(car, packages[selectedCar.packageIndex])}
                        >
                        Book Package - ₹{packages[selectedCar.packageIndex].price}
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default RentalPage;