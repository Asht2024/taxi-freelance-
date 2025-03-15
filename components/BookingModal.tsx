// components/BookingModal.tsx
"use client";

import { motion } from "framer-motion";

interface RentalPackage {
  duration: string;
  price: number;
  extra: {
    distance: string;
    time: string;
  };
}

interface BookingModalProps {
  packageDetails: RentalPackage | null;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ packageDetails, onClose }) => {
  return (
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
};

export default BookingModal;