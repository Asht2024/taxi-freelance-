"use client";
import Head from 'next/head';
import { 
  TruckIcon,
  ClockIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  MapPinIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Main from '../../../components/Main';
import { useRouter } from 'next/navigation';
export default function AirportTransfers() {

  const features = [
    { icon: <ClockIcon className="h-6 w-6" />, title: "29 km Express Transfer", content: "50-55 minute direct route between Rajkot and Hirasar Airport" },
    { icon: <UserCircleIcon className="h-6 w-6" />, title: "Professional Drivers", content: "Trained chauffeurs with airport protocol knowledge" },
    { icon: <CurrencyDollarIcon className="h-6 w-6" />, title: "Fixed Pricing", content: "No surge pricing - pay what you see upfront" },
    { icon: <ShieldCheckIcon className="h-6 w-6" />, title: "Flight Tracking", content: "Real-time flight monitoring for perfect timing" }
  ];

  const rideTypes = [
    { title: "One-Way Transfer", description: "Simple point-to-point service with no return charges" },
    { title: "Round Trip", description: "Complete airport return package with discounted pricing" },
    { title: "Private Taxi", description: "Exclusive vehicle with personal space and privacy" },
    { title: "Metered Fare", description: "Pay-per-kilometer option for short distances" }
  ];
 const router=useRouter();
  return (
    <div className="min-h-screen mt-10">
      <Main/>
      <Head>
        <title>Premium Rajkot-Hirasar Airport Taxi Service | Asht Cab</title>
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <TruckIcon className="h-12 w-12 mr-4" />
            <h1 className="text-4xl font-bold">Seamless Airport Transfers</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Premium Rajkot to Hirasar Airport taxi services - 29 km journey made effortless with 24/7 availability, 
            flight tracking, and professional chauffeurs.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Service Highlights */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center mb-6">
              <MapPinIcon className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold">Rajkot to Hirasar Airport</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Stress-free departures with punctual pickups and luggage assistance. Our drivers monitor flight schedules 
              to ensure perfect timing for your airport arrival.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Doorstep pickup within Rajkot</span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Complimentary 30-minute waiting period</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center mb-6">
              <MapPinIcon className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold">Hirasar to Rajkot</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Smooth arrivals with meet-and-greet service. We track your flight to adjust pickup time automatically, 
              even for delayed arrivals.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Flight delay protection</span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>24/7 customer support</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-blue-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Asht Cab?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full p-4 w-max mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ride Options */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8">Transfer Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rideTypes.map((ride, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-semibold mb-2">{ride.title}</h3>
                <p className="text-gray-600">{ride.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Steps */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="flex items-center mb-8">
            <DevicePhoneMobileIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold">Easy 3-Step Booking</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-max mx-auto p-4 rounded-full mb-4">1</div>
              <h3 className="text-lg font-semibold">Select Journey Details</h3>
              <p className="text-gray-600 text-sm">Pickup location, date & vehicle type</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-max mx-auto p-4 rounded-full mb-4">2</div>
              <h3 className="text-lg font-semibold">Confirm Pricing</h3>
              <p className="text-gray-600 text-sm">Transparent all-inclusive fares</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-max mx-auto p-4 rounded-full mb-4">3</div>
              <h3 className="text-lg font-semibold">Relax & Travel</h3>
              <p className="text-gray-600 text-sm">Real-time driver tracking</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-blue-900 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Ready for Stress-Free Travel?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your Rajkot-Hirasar airport transfer now and enjoy guaranteed punctuality, 
            flight monitoring, and premium comfort.
          </p>
          <button 
            onClick={() => router.push('/Booking')}
            className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center mx-auto"
          >
            Book Airport Transfer
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        </section>
      </div>
    </div>
  );
}