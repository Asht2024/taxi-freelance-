import React from 'react';
import '../globals.css'
const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full p-6 shadow-lg">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Please read all the terms and conditions carefully before proceeding.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">General Terms</h2>
            <ul className="list-disc list-inside space-y-4">
              <li>Start/End Km and Hours are calculated from garage to garage.</li>
              <li>All email conversations are part of the contract once a booking is made.</li>
              <li>Duty slips must be filled by customers. No disputes are entertained.</li>
              <li>Parking, toll, and state entry fees are directly paid by the customer.</li>
              <li>Sightseeing is conducted as per the itinerary (off-route travel is not allowed).</li>
              <li>AsthCab Cabs reserves the right to provide a similar car if the booked car is unavailable.</li>
              <li>Additional charges are payable directly to the driver in cash.</li>
              <li>AC may not function in hilly areas or when the vehicle is parked.</li>
              <li>Drivers are not forced to exceed speed limits set by Indian Motor Vehicle laws.</li>
              <li>
                <strong>Rental Time Policy:</strong> Customers are allowed a 15-minute grace period post scheduled pickup time. 
                After this period, the rental duration will be calculated from the originally scheduled pickup time.
              </li>
              <li>
                <strong>Peak Season Pricing:</strong> For advance bookings during festivals or tourist seasons, 
                rates will be charged according to the prevailing prices on the actual pickup date.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Policies</h2>
            <ul className="list-disc list-inside space-y-4">
              <li>The company may terminate bookings without prior notice.</li>
              <li>Airport/railway transfer delays due to traffic are not the company s responsibility.</li>
              <li>Customers must check the vehicle before leaving to avoid loss of belongings.</li>
              <li>In case of a vehicle breakdown, alternate arrangements will be made promptly for major issues.</li>
              <li>Drivers cannot operate in No Entry zones or narrow streets.</li>
              <li>Night driving in hilly areas is restricted for safety reasons.</li>
              <li>Pick-up and drop points must be specified during booking.</li>
              <li>Tour destination routes cannot be changed without prior notice.</li>
              <li>
                <strong>Vehicle Cleanliness:</strong> Customers will be charged for cleaning/repair fees
                in case of interior damage, vomiting, or excessive dirtiness caused during the rental period.
              </li>
              <li>
                <strong>Additional Charges:</strong> All toll taxes, state entry taxes, parking charges, 
                and police entry fees must be paid directly by the customer during the journey.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Package Terms</h2>
            <ul className="list-disc list-inside space-y-4">
              <li>All travelers must provide valid photo identification (Passport, Voter ID, Driver’s License).</li>
              <li>Hotels may deny stay without proper ID proof.</li>
              <li>Early check-in and late check-out are subject to additional charges unless included.</li>
              <li>Meals are served on a fixed menu or buffet basis as per hotel policy.</li>
              <li>Room service for meals may incur extra charges.</li>
              <li>Refunds are not applicable for unused facilities or short stays.</li>
              <li>Natural disasters, roadblocks, or strikes may impact the itinerary without refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
            <p className="leading-relaxed">
              AsthCab Cabs Service expressly disclaims any implied warranties. The company operates under the
              jurisdiction of Indian laws, with disputes handled in Delhi courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="leading-relaxed">
              For further queries or concerns, feel free to contact us at:
              <a
                href="mailto:complain@ashtcabservices.in"
                className="ml-1 text-blue-600 hover:text-cyan-600 transition-colors duration-300"
              >
                complain@ashtcabservices.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;





  