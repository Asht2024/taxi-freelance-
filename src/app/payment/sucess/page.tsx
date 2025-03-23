"use client";

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function PaymentSuccess() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("User ID:", session.user.id); // User ID को console पर print करें
      const tripData=JSON.parse(localStorage.getItem('currentTripData') || "")
      const carName=localStorage.getItem('car')
       const price=Number(localStorage.getItem('price'))
      const saveBookingData = async () => {
        const bookingData = {
          userId: session.user.id, // Use user ID from session
          carName: carName,
          amount: price,
          paymentStatus: 'SUCCESS',
          tripData: tripData,
          }

        try {
          const response = await fetch('/api/booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
          });

          if (response.ok) {
            console.log('Booking data saved successfully!');
          } else {
            console.error('Failed to save booking data.');
          }
        } catch (error) {
          console.error('Error saving booking data:', error);
        }
      };

      saveBookingData();
    }
  }, [session, status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Your booking has been confirmed. Check your email for details.
        </p>
        <button
          onClick={() => (window.location.href = '/')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}