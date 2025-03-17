"use client";

export default function PaymentSuccess() {
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
          onClick={() => window.location.href = '/'}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}