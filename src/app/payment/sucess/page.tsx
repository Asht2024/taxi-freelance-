"use client";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function PaymentSuccess() {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && !processed) {
      const handleSuccess = async () => {
        try {
          setLoading(true);
          setProcessed(true);
          
          // Get trip data from localStorage
          const tripDataString = localStorage.getItem('currentTripData');
          const tripData = tripDataString ? JSON.parse(tripDataString) : {};
          
          console.log('Current Trip Data:', tripData);

          // Transform data to match email template expectations
          const transformedTripData = {
            pickupLocation: tripData.pickupLocation?.address || 'Not specified',
            dropoffLocation: tripData.dropLocation?.address || 'Not specified',
            date: tripData.formData?.date || 'Not specified',
            time: tripData.formData?.time || 'Not specified',
            distance: tripData.distance || '',
            duration: tripData.duration || '',
            carType: tripData.selectedOption || ''
          };

          const carName = localStorage.getItem('car') || "Unknown Car";
          const estimatedfair=localStorage.getItem('baseAmount')

          const bookingamount=localStorage.getItem('totalamount')

          const contact=localStorage.getItem('contact')

          // Save booking
          const bookingResponse = await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: session.user.id,
              carName,
              amount:parseFloat(estimatedfair||"0"),
              paymentStatus: 'SUCCESS',
              tripData: transformedTripData,
              costomername:session.user.name,
              costomemail:session.user.email,
              costomercontact:contact,
              paid:parseFloat(bookingamount||"0"),
            }),
          });

          if (!bookingResponse.ok) {
            throw new Error('Booking save failed');
          }

          // Send confirmation emails with car and price information
          const emailResponse = await fetch('/api/send-email1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              car: carName,
              estimatedfair:Number(estimatedfair),
              BookingTotal:Number(bookingamount),
              Contact:Number(contact),
              tripData: transformedTripData
            }),
          });

          if (!emailResponse.ok) {
            throw new Error('Email sending failed');
          }

          // Clear local storage
          localStorage.removeItem('currentTripData');
          localStorage.removeItem('car');
          localStorage.removeItem('price');

          setError(null);
        } catch (error) {
          console.error('Payment success process error:', error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
          setProcessed(false);
        } finally {
          setLoading(false);
        }
      };

      handleSuccess();
    }
  }, [session, status, processed]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Processing...</h1>
          <p className="text-gray-600 mb-6">Please wait while we confirm your booking.</p>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed. Check your email for details.
        </p>
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to:<br/>
            <span className="font-medium">{session?.user?.email}</span>
          </p>
        </div>
        <button
          onClick={() => (window.location.href = '/')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}