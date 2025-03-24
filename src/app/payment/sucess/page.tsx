"use client";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function PaymentSuccess() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const sendConfirmationEmails = async () => {
        try {
          // Use null coalescing to default to "{}" if null
const tripData = JSON.parse(localStorage.getItem('currentTripData') || "{}");
          const carName = localStorage.getItem('car') || "";
          const price = Number(localStorage.getItem('price')) || 0;

          // पहले booking save करें
          const bookingResponse = await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: session.user.id,
              carName,
              amount: price,
              paymentStatus: 'SUCCESS',
              tripData
            }),
          });

          if (!bookingResponse.ok) throw new Error('Booking save failed');

          // फिर emails भेजें
          const emailResponse = await fetch('/api/send-email1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              tripData
            }),
          });

          if (!emailResponse.ok) throw new Error('Email sending failed');

          localStorage.removeItem('currentTripData');
          localStorage.removeItem('car');
          localStorage.removeItem('price');

        } catch (error) {
          console.error('Payment success process error:', error);
        }
      };

      sendConfirmationEmails();
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