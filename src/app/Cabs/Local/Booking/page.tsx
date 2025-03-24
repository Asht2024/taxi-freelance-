"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import axios from "axios";
import {v4 as uuidv4 } from "uuid";

interface TripData {
  pickupLocation: {
    address: string;
    city: string;
    lat: number;
    lng: number;
  };
  dropLocation: {
    address: string;
    city: string;
    lat: number;
    lng: number;
  };
  formData: {
    date: string;
    time: string;
    members: number;
    luggage: number;
    tripType: string;
  };
}

interface CarDetails {
  model: string;
  image_url: string;
  car_name: string;
  calculated_price: number;
  passenger: number;
  luggage: number;
}

export default function BookingPage() {
  const [paymentOption, setPaymentOption] = useState<"full" | "partial">("full");
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
  });
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const tripDataString = localStorage.getItem("currentTripData");
    const carDataString = localStorage.getItem("selectedcars");

    if (tripDataString) setTripData(JSON.parse(tripDataString));
    if (carDataString) setCarDetails(JSON.parse(carDataString));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDetailsSubmitted(true);
  };

  const initiatePhonePePayment = async (amountType: "full" | "partial") => {
    setIsProcessingPayment(true);
    setPaymentError("");
    setPaymentOption(amountType);

    try {
      const transactionId = uuidv4();
      const baseAmount = carDetails!.calculated_price*1.05;
      const totalAmount = amountType === "partial" ? baseAmount * 0.35 : baseAmount;
      const amount = Math.round(totalAmount * 100); // Convert to paise
       localStorage.setItem('contact',formData.contact);
       localStorage.setItem('baseAmount', JSON.stringify(baseAmount));
       localStorage.setItem('totalamount',JSON.stringify(totalAmount));
      const response = await axios.post("/api/payments/initiate", {
        transactionId,
        amount,
        contact: formData.contact,
        email: formData.email,
        name: formData.name,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        setPaymentError("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("Error processing payment. Please check your details.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (!tripData || !carDetails)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen mt-14 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 h-fit"
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Booking Details</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailCard
                title="Pickup Location"
                value={tripData.pickupLocation.address}
                icon="📍"
              />
              <DetailCard
                title="Drop Location"
                value={tripData.dropLocation.address}
                icon="🏁"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DetailItem title="Date" value={tripData.formData.date} />
              <DetailItem title="Time" value={tripData.formData.time} />
              <DetailItem title="Passengers" value={tripData.formData.members} />
              <DetailItem title="Luggage" value={tripData.formData.luggage} />
            </div>

            {!isDetailsSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="space-y-4">
                  <InputField
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <InputField
                    label="Contact Number"
                    type="tel"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-all duration-300 font-semibold text-lg"
                >
                  Confirm Details
                </button>
              </motion.form>
            ) : (
              <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <DetailItem title="Name" value={formData.name} />
          <DetailItem title="Contact" value={formData.contact} />
          <DetailItem title="Email" value={formData.email} />

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentOption("partial")}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentOption === "partial"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <div className="text-left">
                <p className="font-semibold text-lg">Pay 35% Now</p>
                <p className="text-gray-600 text-sm">
                  ₹{(carDetails.calculated_price *1.05* 0.35).toFixed(2)}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentOption("full")}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentOption === "full"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <div className="text-left">
                <p className="font-semibold text-lg">Pay Full Amount</p>
                <p className="text-gray-600 text-sm">
                  ₹{(carDetails.calculated_price * 1.05).toFixed(2)}
                </p>
              </div>
            </button>
          </div>

          <button
            onClick={() => initiatePhonePePayment(paymentOption)}
            disabled={isProcessingPayment}
            className={`w-full ${
              isProcessingPayment
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            } text-white py-3 px-6 rounded-xl transition-all duration-300 font-semibold text-lg`}
          >
            {isProcessingPayment ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </div>
            ) : paymentOption === "partial" ? (
              `Pay 35% Now (₹${(carDetails.calculated_price * 0.35).toFixed(2)})`
            ) : (
              `Pay Full Amount (₹${(carDetails.calculated_price * 1.05).toFixed(2)})`
            )}
          </button>

          {paymentError && (
            <div className="text-red-600 text-center mt-4">{paymentError}</div>
          )}
        </motion.div>
            )}
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 h-fit"
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Car Details</h2>

          <div className="flex flex-col items-center space-y-6">
            <img
              src={carDetails.image_url}
              alt={carDetails.car_name}
              className="w-full h-64 object-contain rounded-xl"
            />

            <div className="w-full space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {carDetails.car_name}
              </h3>
              <p className="text-gray-600">{carDetails.model}</p>

              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  title="Passengers"
                  value={carDetails.passenger}
                  icon="👥"
                />
                <DetailItem
                  title="Luggage"
                  value={carDetails.luggage}
                  icon="🧳"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Price:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{(carDetails.calculated_price * 1.05).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Inc tax 5%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Reusable Components
const DetailCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) => (
  <div className="bg-gray-50 p-4 rounded-xl">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xl">{icon}</span>
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{value}</p>
  </div>
);

const DetailItem = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon?: string;
}) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-2">
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-gray-600">{title}</span>
    </div>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

const InputField = ({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      value={value}
      onChange={onChange}
    />
  </div>
);




  

  






  
     