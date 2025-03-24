"use client";
import Head from 'next/head';
import { 
  TruckIcon,
  UserCircleIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ClockIcon,
  MapPinIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Main from '../../../components/Main';
import { useRouter } from 'next/navigation';
export default function IntercityServices() {
 const router=useRouter()
  const features = [
    { icon: <TruckIcon className="h-6 w-6" />, title: "Door-to-Door Service", content: "Hassle-free pickup and drop-off at your preferred locations" },
    { icon: <ClockIcon className="h-6 w-6" />, title: "24/7 Availability", content: "Round-the-clock service for urgent or planned trips" },
    { icon: <ShieldCheckIcon className="h-6 w-6" />, title: "Safety First", content: "Sanitized vehicles and safety-certified drivers" },
    { icon: <CurrencyDollarIcon className="h-6 w-6" />, title: "Transparent Pricing", content: "No hidden charges with upfront quotes" }
  ];

  const considerations = [
    { icon: <MapPinIcon className="h-6 w-6" />, title: "Accurate Distance Tracking", content: "522 km journey with precise route planning" },
    { icon: <TruckIcon className="h-6 w-6" />, title: "Modern Fleet", content: "GPS-equipped vehicles with safety features" },
    { icon: <ShieldCheckIcon className="h-6 w-6" />, title: "Driver Verification", content: "Thoroughly vetted professional drivers" },
    { icon: <InformationCircleIcon className="h-6 w-6" />, title: "Service Transparency", content: "Clear communication and reliable support" }
  ];

  return (
    <div className="min-h-screen mt-10">
     <Main/>
      <Head>
        <title>Premium Ahmedabad-Mumbai Cab Services | Asht Cab</title>
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <TruckIcon className="h-12 w-12 mr-4" />
            <h1 className="text-4xl font-bold">Premium Intercity Cab Services</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Experience seamless travel between Ahmedabad and Mumbai with our reliable, comfortable, 
            and safe taxi services. 530 km journey made effortless with professional drivers 
            and modern fleet.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Why Choose Us Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <CheckCircleIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">Why Choose Asht Cab?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <UserCircleIcon className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expert Drivers</h3>
                  <p className="text-gray-600">Professional drivers with extensive route knowledge and safety training</p>
                </div>
              </div>
              <div className="flex items-start">
                <CalendarIcon className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Booking</h3>
                  <p className="text-gray-600">Book instantly online or via app with multiple payment options</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <TruckIcon className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Luxury Fleet</h3>
                  <p className="text-gray-600">Choose from economy sedans to premium SUVs with AC</p>
                </div>
              </div>
              <div className="flex items-start">
                <CurrencyDollarIcon className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Best Rates</h3>
                  <p className="text-gray-600">Competitive pricing with no hidden charges</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Highlights */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center mb-6">
              <TruckIcon className="h-8 w-8 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold">Ahmedabad to Mumbai</h3>
            </div>
            <p className="text-gray-600 mb-6">
              8-10 hour comfortable journey with multiple stop options. Perfect for business 
              trips, family vacations, or solo travel.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Doorstep pickup</span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Live journey tracking</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center mb-6">
              <TruckIcon className="h-8 w-8 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold">Mumbai to Ahmedabad</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Safe return journeys with experienced drivers. Flexible timing and 
              emergency support throughout the trip.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Multiple vehicle options</span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Corporate travel solutions</span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Luggage assistance</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Service Features</h2>
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

        {/* Booking CTA */}
        <section className="text-center bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Travel Comfortably?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Book your Ahmedabad-Mumbai cab in 3 simple steps. Get instant confirmation 
            and real-time updates on your journey.
          </p>
          <button 
            onClick={() => router.push('/Booking')}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center mx-auto"
          >
            Book Now
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        </section>

        {/* Travel Considerations */}
        <section className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-8">Smart Travel Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {considerations.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}