"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTaxi, FaCarSide, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import Maps from "./Map";
import ServiceForms from "./ServiceForm";
import { useRouter } from "next/navigation";
declare global {
  interface Window {
    google: typeof google;
  }
}

interface Car {
  id: number;
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
}

type LocationType = {
  address: string;
  city: string;
  lat: number;
  lng: number;
};

type OptionType = "Local" | "Rental" | "Outstation";

const getCityFromComponents = (
  components: google.maps.GeocoderAddressComponent[]
): string => {
  for (const component of components) {
    if (
      component.types.includes("locality") ||
      component.types.includes("administrative_area_level_2")
    ) {
      return component.long_name;
    }
  }
  return "";
};

const MainPage = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  // const priceCalculation = async ({ pickupcity, distance, dropcity }:{pickupcity:String;distance:Number;dropcity:String  }) => {
  //   try {
  //     const res = await fetch("/api/getallcars");
  //     const data = await res.json();
  //     if (!data.success) {
  //       console.error(data.message || "Failed to fetch cars.");
  //       return;
  //     }
  
  //     const cars = data.data;
  
  //     // Step 2: Fetch pickup and drop location IDs
  //     const pickupRes = await fetch(`/api/getlocationid?city=${pickupcity}`);
  //     const pickupData = await pickupRes.json();
  
  //     const dropRes = await fetch(`/api/getlocationid?city=${dropcity}`);
  //     const dropData = await dropRes.json();
  
  //     if (!pickupData.success || !dropData.success) {
  //       console.error("Error fetching location IDs");
  //       return;
  //     }
  
  //     const pickupLocationId = pickupData.location_id;
  //     const dropLocationId = dropData.location_id;
  
  //     // Step 3: Calculate price for each car without updating DB
  //     const updatedCars = cars.map(async (car:any) => {
  //       let calculatedPrice = 0;
  
  //       if (!pickupLocationId) {
  //         // Local pricing logic
  //         calculatedPrice =
  //           distance <= 5
  //             ? car.local_min_price
  //             : car.local_min_price + (distance - 5) * car.local_price_per_km;
  //       } else if (
  //         (pickupLocationId === 3 && dropLocationId === 4) ||
  //         (pickupLocationId === 4 && dropLocationId === 3)
  //       ) {
  //         // Fixed price for specific locations
  //         const priceRes = await fetch(
  //           `/api/getlocalbookingprice?carid=${car.id}&locationid=${pickupLocationId}`
  //         );
  //         const priceData = await priceRes.json();
  //         if (priceData.success) {
  //           calculatedPrice = parseInt(priceData.data[0]);
  //         }
  //       } else {
  //         // General case: Fetch fixed price from backend
  //         const priceRes = await fetch(
  //           `/api/getlocalbookingprice?carid=${car.id}&locationid=${pickupLocationId}`
  //         );
  //         const priceData = await priceRes.json();
  //         if (priceData.success) {
  //           let prices = priceData.data[0].split(" ").map(Number); // Convert string to array of integers
  
  //           // Price selection based on distance
  //           if (prices.length === 3) {
  //             calculatedPrice =
  //               distance <= 15
  //                 ? prices[0]
  //                 : distance <= 20
  //                 ? prices[1]
  //                 : distance <= 25
  //                 ? prices[2]
  //                 : car.local_min_price + (distance - 5) * car.local_price_per_km;
  //           } else {
  //             calculatedPrice =
  //               distance <= 15
  //                 ? prices[0]
  //                 : distance <= 20
  //                 ? prices[1]
  //                 : distance <= 25
  //                 ? prices[2]
  //                 : distance <= 30
  //                 ? prices[3]
  //                 : prices[4];
  //           }
  //         }
  //       }
  
  //       // Return car object with temporary calculated price (without updating DB)
  //       return { ...car, calculated_price: calculatedPrice };
  //     });
  
  //     // Resolve all async operations before setting state
  //     const finalCars = await Promise.all(updatedCars);
  //     setCars(finalCars); // Update state with cars including calculated_price
  
  //   } catch (err) {
  //     console.error("Error in price calculation:", err);
  //   }
  // };
  
  useEffect(() => {
    if (isRedirecting) {
      setIsVisible(false);
      const timer = setTimeout(() => router.push("/Cabs"), 500);
      return () => clearTimeout(timer);
    }
  }, [isRedirecting, router]);

  const [pickupLocation, setPickupLocation] = useState<LocationType>({
    address: "",
    city: "",
    lat: 0,
    lng: 0,
  });

  const [dropLocation, setDropLocation] = useState<LocationType>({
    address: "",
    city: "",
    lat: 0,
    lng: 0,
  });

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [selectedOption, setSelectedOption] = useState<OptionType>("Local");
  const [headerMounted, setHeaderMounted] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const phrases: string[] = [
    "Trusted Taxi Solution in Gujarat",
    "Local taxi cab service in Ahmedabad",
    "Rajkot to Hirasar airport taxi service",
    "Taxi service in Ahmedabad airport",
  ];

  useEffect(() => {
    setHeaderMounted(true);
    const timer = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const existingScript = document.querySelector(
          'script[src^="https://maps.googleapis.com/maps/api/js"]'
        );
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
          script.onload = () => getCurrentLocation();
        } else {
          getCurrentLocation();
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const geocoder = new window.google.maps.Geocoder();
            const latlng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            geocoder.geocode({ location: latlng }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                setPickupLocation({
                  address: results[0].formatted_address || "",
                  city: getCityFromComponents(results[0].address_components),
                  lat: latlng.lat,
                  lng: latlng.lng,
                });
              }
            });
          },
          (error) => console.error("Location error:", error)
        );
      }
    };

    loadGoogleMaps();
  }, []);

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
  }, [text, isDeleting, loopNum]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full text-left space-y-4 md:space-y-6 min-w-[320px] p-4 md:p-6 pt-20 sm:pt-24"
        >
          
          <h1
            className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
              bg-clip-text text-transparent transition-all duration-500 ${
                headerMounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
          >
            Asht Cab
          </h1>

          <div
            className={`text-lg font-mono text-gray-600 font-semibold transition-opacity duration-500  ${
              textVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {text}
            <span className="ml-1 animate-blink">|</span>
            
          </div>

          

          <div className="space-y-6 mt-20">
            <div className="flex gap-4">
              {(["Local", "Rental", "Outstation"] as OptionType[]).map(
                (name, index) => {
                  const icon =
                    name === "Local" ? (
                      <FaTaxi size={24} />
                    ) : name === "Rental" ? (
                      <FaCarSide size={24} />
                    ) : (
                      <FaMapMarkedAlt size={24} />
                    );

                  return (
                    <div key={name} className="relative group">
                      {selectedOption === name ? (
                        <motion.div
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: -25, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="absolute left-1/2 -translate-x-1/2 -top-6 text-blue-600 font-semibold whitespace-nowrap"
                        >
                          {name}
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="h-1 bg-blue-600 mt-1 rounded-full"
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      ) : (
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
                            pointerEvents: "none",
                          }}
                        >
                          {name}
                        </motion.div>
                      )}

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
                        onClick={() => setSelectedOption(name)}
                        className={`w-16 h-16 flex items-center justify-center rounded-full border-2 
                        transition-all duration-300 shadow-md relative ${
                          selectedOption === name
                            ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {icon}
                      </motion.button>
                    </div>
                  );
                }
              )}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                priceCalculation();
                setIsRedirecting(true);
                router.push(`/Cabs?type=${selectedOption.toLowerCase()}`);
              }}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 shadow-lg hover:bg-blue-700 transition-all"
            >
              <FaSearch size={18} />
              <span>Search Cab</span>
            </motion.button>

            

            <div className="relative min-h-[160px] md:w-4/5">
              <ServiceForms
                key={selectedOption}
                serviceType={selectedOption}
                pickupAddress={pickupLocation.address}
                dropAddress={dropLocation.address}
                onPickupChange={(newLocation) =>
                  setPickupLocation({
                    address: newLocation.address,
                    city: newLocation.city,
                    lat: newLocation.latitude,
                    lng: newLocation.longitude,
                  })
                }
                onDropChange={(newLocation) =>
                  setDropLocation({
                    address: newLocation.address,
                    city: newLocation.city,
                    lat: newLocation.latitude,
                    lng: newLocation.longitude,
                  })
                }
              />
            </div>

            {/* Replaced "hey" with suv.png */}
           

            <div className="md:w-1/2 md:absolute md:right-0 md:bottom-10 md:h-auto flex justify-center border-none">
              <Maps />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainPage;
