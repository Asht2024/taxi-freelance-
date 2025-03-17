import React from 'react';

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-600 rounded-full p-6 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Refund Policy
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Transparent and fair refund process for your peace of mind.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Eligibility</h2>
            <ul className="list-disc list-inside space-y-4">
              <li>Full refunds available for cancellations made 48 hours before pickup time.</li>
              <li>Partial refund (50%) for cancellations between 24-48 hours before pickup.</li>
              <li>No refund for cancellations within 24 hours of pickup.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Time</h2>
            <p className="leading-relaxed">
              Refunds are processed within <span className="font-semibold text-green-600">7-10 business days</span> and will be credited to the original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Refundable Scenarios</h2>
            <ul className="list-disc list-inside space-y-4">
              <li>No-shows on the day of booking</li>
              <li>Service utilized partially</li>
              <li>Force majeure events (natural disasters, political unrest)</li>
              <li>Change of mind after service commencement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left border-b">Cancellation Time</th>
                    <th className="px-4 py-3 text-left border-b">Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b">More than 48 hours</td>
                    <td className="px-4 py-3 border-b font-semibold text-green-600">100%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b">24-48 hours</td>
                    <td className="px-4 py-3 border-b font-semibold text-amber-600">50%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b">Less than 24 hours</td>
                    <td className="px-4 py-3 border-b font-semibold text-red-600">0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request</h2>
            <ol className="list-decimal list-inside space-y-4">
              <li>Send email to <span className="text-green-600">refunds@ashtcabservices.in</span> with booking ID</li>
              <li>Await confirmation from our team</li>
              <li>Allow 7-10 days for processing</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Support</h2>
            <p className="leading-relaxed">
              For refund-related queries:
              <a
                href="mailto:info@ashtcabservices.in"
                className="ml-1 text-green-600 hover:text-emerald-600 transition-colors duration-300"
              >
                info@ashtcabservices.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;