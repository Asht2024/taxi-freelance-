"use client";
import Head from 'next/head';
import { 
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Main from '../../../components/Main';
import { useRouter } from 'next/navigation';
export default function RajkotAirportTaxi() {

  const features = [
    { icon: <ClockIcon className="h-6 w-6" />, title: "24/7 Availability", content: "Round-the-clock service for all flights" },
    { icon: <CheckCircleIcon className="h-6 w-6" />, title: "Flight Tracking", content: "Real-time flight monitoring" },
    { icon: <CurrencyDollarIcon className="h-6 w-6" />, title: "Fixed Pricing", content: "No surge charges" },
    { icon: <StarIcon className="h-6 w-6" />, title: "Rated Drivers", content: "4.9/5 customer rating" }
  ];

  const router=useRouter()

  const destinations = [
    { location: "Ahmedabad", distance: "230 km", time: "4h 10m" },
    { location: "Dwarka", distance: "263 km", time: "4h 30m" },
    { location: "Kutch", distance: "290 km", time: "6h 11m" }
  ];

  return (
    <div className="min-h-screen mt-10">
    <Main/>
      <Head>
        <title>Premium Rajkot Airport Taxi Services | Asht Cab</title>
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <h1 className="text-4xl font-bold">Rajkot Airport Taxi Services</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Stress-free airport transfers with flight tracking, 24/7 availability, and premium comfort
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Why Choose Us */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <CheckCircleIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold">Why Choose Asht Cab?</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-max mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Times */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <ClockIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-semibold">{dest.location}</h3>
                <div className="flex justify-between mt-2">
                  <p className="text-gray-600">{dest.distance}</p>
                  <p className="text-blue-600 font-semibold">{dest.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unique Features */}
        <section className="bg-blue-50 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <StarIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Unique Services</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Pet-friendly vehicles</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Multi-ride packages</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <CurrencyDollarIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Transparent Pricing</h3>
              </div>
              <p className="text-gray-600">
                Fixed rates with no hidden charges. Only pay extra if you modify your route beyond original booking.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-blue-900 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Ready for Seamless Travel?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your Rajkot airport transfer now and experience premium comfort with guaranteed punctuality
          </p>
          <button 
            onClick={() => router.push('/Booking')}
            className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center mx-auto"
          >
            Book Airport Transfer
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        </section>

        {/* Tourism Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mt-12">
          <div className="flex items-center mb-8">
            <MapPinIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold">Explore Rajkot</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Pirotan Island</h3>
              <p className="text-gray-600">Marine national park sanctuary</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Sivrajpur Beach</h3>
              <p className="text-gray-600">Pristine white sandy beaches</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Soarium</h3>
              <p className="text-gray-600">Unique astronomical experience</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}