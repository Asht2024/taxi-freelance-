"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTaxi, FaCarSide, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import ServiceForms from "../../../components/ServiceForm";
import { useRouter } from "next/navigation";

type LocationType = {
  address: string;
  city: string;
  lat: number;
  lng: number;
};

type OptionType = "One-Way" | "Round-Trip" | "Full-Day";

const AhmedabadToMumbaiPage = () => {
  const router = useRouter();
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
  const [selectedOption, setSelectedOption] = useState<OptionType>("One-Way");

  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const response = await fetch("/api/get-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: lat, longitude: lng }),
      });

      const data = await response.json();
      if (response.ok) {
        setPickupLocation({
          address: data.address,
          city: data.city,
          lat: data.lat,
          lng: data.lng,
        });
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Could not fetch location details. Please enter manually.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPickupLocation((prev) => ({
            ...prev,
            lat: latitude,
            lng: longitude,
          }));
          getAddressFromCoords(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

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
    setTimeout(() => router.push(route), 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Reliable Cab and Taxi Services: Ahmedabad to Mumbai & Mumbai to Ahmedabad</h1>
          <p className="text-lg">
            Comfortable, reliable, and convenient cab services for your journey between Ahmedabad and Mumbai.
          </p>
        </div>
      </section>

      {/* Service Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Service Selection Buttons */}
          <div className="flex gap-4 mb-6">
            {[
              { name: "One-Way", icon: <FaTaxi size={24} /> },
              { name: "Round-Trip", icon: <FaCarSide size={24} /> },
              { name: "Full-Day", icon: <FaMapMarkedAlt size={24} /> },
            ].map((option) => (
              <button
                key={option.name}
                onClick={() => setSelectedOption(option.name as OptionType)}
                className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
                  selectedOption === option.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.icon}
                <span>{option.name}</span>
              </button>
            ))}
          </div>

          {/* Service Form */}
          <ServiceForms
            key={selectedOption}
            serviceType={selectedOption}
            pickupAddress={pickupLocation.address}
            dropAddress={dropLocation.address}
            onPickupChange={setPickupLocation}
            onDropChange={setDropLocation}
          />

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearchCab}
            className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FaSearch size={18} />
            <span>Search Available Cabs</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-8">
          {/* Introduction */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Asht Cab Services?</h2>
            <p className="text-gray-600">
              When it comes to traveling between two of India’s busiest cities, Ahmedabad and Mumbai, comfort, reliability, and convenience are essential. Whether you’re traveling for business, a family vacation, or just a weekend getaway, Asht Cab Services provides seamless cab and taxi solutions for both routes: Ahmedabad to Mumbai and Mumbai to Ahmedabad. With our fleet of modern vehicles and professional drivers, your journey between these bustling cities will be as comfortable and stress-free as possible.
            </p>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Asht Cab Services?</h2>
            <ul className="space-y-3 text-gray-700 list-disc list-inside">
              <li><strong>Comfortable Rides:</strong> Our fleet includes a wide range of vehicles, from economy cabs to luxury cars, ensuring that we have the perfect option for all types of travelers.</li>
              <li><strong>Experienced Drivers:</strong> Our drivers are professional, courteous, and well-trained, ensuring a safe and smooth ride.</li>
              <li><strong>Flexible Booking Options:</strong> We provide a variety of booking options to suit your schedule, whether you need a last-minute taxi or are planning in advance.</li>
            </ul>
          </div>

          {/* Ahmedabad to Mumbai Cab Services */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ahmedabad to Mumbai Cab Services</h2>
            <p className="text-gray-600">
              Our Ahmedabad to Mumbai cab service is the perfect solution for those who value convenience and efficiency. The distance between Ahmedabad and Mumbai is around 530 km, and our cabs ensure that you cover this distance comfortably, whether for business or leisure. With door-to-door service, you won’t have to worry about reaching the station or airport. We pick you up from your location in Ahmedabad and drop you off at your destination in Mumbai without any hassle.
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features of Our Services</h2>
            <ul className="space-y-3 text-gray-700 list-disc list-inside">
              <li><strong>Door-to-Door Pickup and Drop:</strong> We pick you up from your preferred location and drop you off at your desired destination.</li>
              <li><strong>Round-the-Clock Availability:</strong> Our services are available 24/7 for urgent or planned trips.</li>
              <li><strong>Well-Maintained Vehicles:</strong> All our cabs are serviced regularly to ensure a smooth ride.</li>
              <li><strong>Transparent Pricing:</strong> No hidden costs! We provide upfront pricing.</li>
              <li><strong>Safety and Hygiene:</strong> Our cars are sanitized after every trip, and our drivers follow all safety protocols.</li>
            </ul>
          </div>

          {/* Hassle-Free Booking Process */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hassle-Free Booking Process</h2>
            <p className="text-gray-600">
              Booking your Ahmedabad to Mumbai taxi or Mumbai to Ahmedabad cab is quick and simple with Asht Cab Services. You can book through our website, by phone, or via our app. We offer multiple payment options to ensure that the process is as convenient as possible.
            </p>
          </div>

          {/* Things to Consider */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Things to Consider While Choosing Taxi Cab Services</h2>
            <ul className="space-y-3 text-gray-700 list-disc list-inside">
              <li><strong>Know the Distance:</strong> The distance from Ahmedabad to Mumbai is around 522 km, and the journey takes approximately 10 hours and 14 minutes.</li>
              <li><strong>Car Type:</strong> For long distances, pre-book a comfortable and modern car equipped with safety features like GPS, airbags, and seat belts.</li>
              <li><strong>Safety:</strong> Ensure drivers follow all necessary highway rules and prioritize passenger safety.</li>
              <li><strong>Check the Driver’s Credentials:</strong> Verify driver qualifications, route familiarity, and adherence to safety standards.</li>
              <li><strong>Choose the Best Taxi Service Providers:</strong> Conduct thorough research to ensure reliable customer support and a safe journey.</li>
            </ul>
          </div>

          {/* Why Book a One-Way Cab Service? */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Book a One-Way Cab Service from Ahmedabad to Mumbai?</h2>
            <p className="text-gray-600">
              Ahmedabad cab services are widely available across the city, offering comfortable rides. However, for long-distance travel, such as the Ahmedabad to Mumbai cab service, choosing a one-way cab is the most recommended option. The primary reason is that passengers traveling such a long distance do not need to share the ride with others. This means they will have a dedicated taxi, ensuring greater privacy.
            </p>
          </div>

          {/* Why Book a Mumbai to Ahmedabad Cab Service? */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Book a Mumbai to Ahmedabad Cab Service?</h2>
            <p className="text-gray-600">
              In today’s world, we must be prepared for uncertainties while working in various locations. These uncertainties can include floods, landslides, virus outbreaks, natural disasters, and more. In such adverse situations, our primary goal is to return home safely. However, public transport often fails to meet our needs during these challenging times. Therefore, Mumbai to Ahmedabad cab services are the best option, as they can provide alternative solutions to ensure passengers reach their specified destinations safely.
            </p>
          </div>

          {/* Why Book an Online Taxi Cab? */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Book an Online Taxi Cab?</h2>
            <p className="text-gray-600">
              When booking a cab service from Mumbai to Ahmedabad, passengers can expect a variety of benefits. The most common benefits include:
            </p>
            <ul className="space-y-3 text-gray-700 list-disc list-inside">
              <li><strong>100% Assured Ride:</strong> Unlike public transport, which can be uncertain and often crowded, the Ahmedabad to Mumbai cab service guarantees a confirmed journey regardless of the situation in the city.</li>
              <li><strong>Technology-Equipped Cars:</strong> Public transport typically offers less concern for passenger safety. In contrast, the Ahmedabad to Mumbai taxi service is equipped with modern GPS technology that guides the driver and ensures a safe journey.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-100 py-10 text-center mt-12">
        <h3 className="text-xl font-bold text-blue-700">Need a ride now?</h3>
        <p className="text-gray-700 mt-2 mb-4">Call us at +91-9876543210 or book online instantly!</p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Book Now
        </button>
      </section>
    </div>
  );
};

export default AhmedabadToMumbaiPage;