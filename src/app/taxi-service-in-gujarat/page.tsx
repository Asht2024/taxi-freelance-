"use client";
import Head from 'next/head';
import { 
  MapIcon,
  ClockIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  BookOpenIcon,
  TruckIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Main from '../../../components/Main';
export default function GujaratTravel() {

  const perks = [
    { icon: <ClockIcon className="h-6 w-6" />, title: "Punctuality", content: "Smart routing with real-time traffic updates" },
    { icon: <TruckIcon className="h-6 w-6" />, title: "Comfort Journey", content: "AC vehicles with spacious seating" },
    { icon: <UserCircleIcon className="h-6 w-6" />, title: "Expert Drivers", content: "Local knowledge with safety certification" },
    { icon: <CurrencyDollarIcon className="h-6 w-6" />, title: "Transparent Pricing", content: "No hidden charges, all-inclusive fares" }
  ];

  const bookingSteps = [
    { step: "1", title: "Select Journey Type", content: "City ride, intercity, or airport transfer" },
    { step: "2", title: "Choose Date/Time", content: "Flexible scheduling 24/7" },
    { step: "3", title: "Secure Payment", content: "Multiple payment options available" },
    { step: "4", title: "Instant Confirmation", content: "Real-time booking status updates" }
  ];

  return (
    <div className="min-h-screen mt-10">
        <Main/>
      <Head>
        <title>Premium Taxi Services in Gujarat | Asht Cab</title>
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <MapIcon className="h-12 w-12 mr-4" />
            <h1 className="text-4xl font-bold">Explore Gujarat in Comfort</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Discover Gujarat is rich heritage and modern marvels with our premium taxi services. 
            Reliable, comfortable, and available 24/7 for all your travel needs.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Places to Visit */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <MapIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold">Gujarat Travel Highlights</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-600">
                Explore ancient temples, vibrant markets, and UNESCO World Heritage Sites. 
                Our taxi services connect you to Gujarat is top destinations:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Rann of Kutch white desert</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Gir National Park wildlife</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Statue of Unity</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Business travelers enjoy our corporate packages with:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>WiFi-enabled vehicles</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Multi-city itineraries</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Executive car options</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Service Perks */}
        <section className="bg-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Asht Cab?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {perks.map((perk, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full p-4 w-max mx-auto mb-4">
                  {perk.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{perk.title}</h3>
                <p className="text-gray-600 text-sm">{perk.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Process */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <BookOpenIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold">Easy 4-Step Booking</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {bookingSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-max mx-auto p-4 mb-4">
                  <span className="text-xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Single-way Service */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <TruckIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold">Flexible One-Way Service</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Cost-Effective Travel</h3>
              <p className="text-gray-600">
                Perfect for business trips and night travel. Pay only for the journey you need 
                with our transparent pricing model.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">24/7 Availability</h3>
              <p className="text-gray-600">
                Book last-minute rides or schedule in advance. Our drivers are available 
                round-the-clock for urgent trips.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-blue-900 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore Gujarat?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your premium taxi service today and experience comfortable, reliable travel 
            across Gujarat is amazing destinations.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center mx-auto"
          >
            Start Your Journey
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        </section>
      </div>
    </div>
  );
}