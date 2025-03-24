"use client";
import Head from 'next/head';
import { 
  StarIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import Main from '../../../components/Main';
import { useRouter } from 'next/navigation';
export default function AhmedabadTaxi() {
  const bookingSteps = [
    { step: "1", title: "Select Journey Type", content: "City ride, intercity, or airport transfer" },
    { step: "2", title: "Choose Date/Time", content: "Flexible scheduling 24/7" },
    { step: "3", title: "Secure Payment", content: "Multiple payment options available" },
    { step: "4", title: "Instant Confirmation", content: "Real-time booking status updates" }
  ];
  const features = [
    { icon: <ClockIcon className="h-6 w-6" />, title: "24/7 Availability", content: "Round-the-clock service for all your travel needs" },
    { icon: <CurrencyDollarIcon className="h-6 w-6" />, title: "Modern Fleet", content: "AC vehicles with latest safety features" },
    { icon: <CurrencyDollarIcon className="h-6 w-6" />, title: "Transparent Pricing", content: "No hidden charges, exact fare upfront" },
    { icon: <StarIcon className="h-6 w-6" />, title: "Rated Drivers", content: "Professional, trained chauffeurs" }
  ];

  const serviceTypes = [
    { title: "Airport Transfers", description: "Flight-tracked pickups and drops" },
    { title: "City Commutes", description: "Reliable local transportation" },
    { title: "Corporate Travel", description: "Executive class service" },
    { title: "Outstation Trips", description: "Long-distance comfort" }
  ];

  const router=useRouter();
  return (
    <div className="min-h-screen mt-10">
        <Main/>
      <Head>
        <title>Premium Ahmedabad Taxi Services | Asht Cab</title>
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <h1 className="text-4xl font-bold">Premium Airport Taxi Services</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Experience seamless Ahmedabad airport transfers with 24/7 availability, flight tracking,
            and professional chauffeurs. Your comfort is our priority.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Service Highlights */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold">Comprehensive Taxi Solutions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-600">
                Whether you are a business traveler needing punctual airport transfers or a family exploring Ahmedabad is 
                cultural heritage, our services adapt to your needs:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Real-time flight monitoring</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Luggage assistance</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Corporate travel packages include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>WiFi-enabled vehicles</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Multi-stop itineraries</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-blue-50 rounded-2xl p-8 mb-12">
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

        {/* Service Types */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <BriefcaseIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold">Our Services</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {serviceTypes.map((service, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
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

        {/* Final CTA */}
        <section className="text-center bg-blue-900 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Ready for Stress-Free Travel?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your Ahmedabad airport transfer now and experience premium comfort with guaranteed punctuality.
          </p>
          <button 
            onClick={() => router.push('/Booking')}
            className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center mx-auto"
          >
            Book Now
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        </section>
      </div>
    </div>
  );
}