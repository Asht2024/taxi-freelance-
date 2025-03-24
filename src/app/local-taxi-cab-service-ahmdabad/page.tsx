"use client";
import Head from 'next/head';
import { 
  BuildingOfficeIcon,
  TruckIcon,
  CheckCircleIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  BookOpenIcon,
  UsersIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Main from '../../../components/Main';
export default function TaxiServices() {
  const router = useRouter();
  
  // Data arrays for dynamic rendering
  const benefits = [
    { icon: <TruckIcon className="h-6 w-6" />, title: "Modern Fleet", content: "Regularly cleaned and maintained vehicles for comfortable rides" },
    { icon: <UserCircleIcon className="h-6 w-6" />, title: "Professional Drivers", content: "Courteous, knowledgeable drivers ensuring safe journeys" },
    { icon: <CalendarDaysIcon className="h-6 w-6" />, title: "Flexible Booking", content: "24/7 online, phone, and app booking options" },
    { icon: <CurrencyDollarIcon className="h-6 w-6" />, title: "Transparent Pricing", content: "No hidden charges with competitive rates" }
  ];

  const comparisonPoints = [
    { icon: <CheckCircleIcon className="h-6 w-6" />, title: "Guaranteed Service", content: "Reliable transportation without delays" },
    { icon: <ClockIcon className="h-6 w-6" />, title: "Punctual Pickups", content: "No waiting for unpredictable public transport" },
    { icon: <CreditCardIcon className="h-6 w-6" />, title: "Multiple Payments", content: "Accepting cashless and digital payments" },
    { icon: <TruckIcon className="h-6 w-6" />, title: "Luxurious Rides", content: "Clean, posh cars for comfortable travel" }
  ];

  const carTypes = [
    { icon: <UsersIcon className="h-6 w-6" />, name: "Sedan", capacity: "4 passengers" },
    { icon: <TruckIcon className="h-6 w-6" />, name: "SUV", capacity: "7 passengers" },
    { icon: <DevicePhoneMobileIcon className="h-6 w-6" />, name: "Hatchback", capacity: "4 passengers" },
    { icon: <CreditCardIcon className="h-6 w-6" />, name: "Luxury", capacity: "Executive travel" }
  ];

  return (
    <div className="min-h-screen mt-10">
      <Main/>
      <Head>
        <title>Premium Taxi Services in Ahmedabad | Asht Cab</title>
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <BuildingOfficeIcon className="h-12 w-12 mr-4" />
            <h1 className="text-4xl font-bold">Reliable Taxi & Cab Services in Ahmedabad</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Experience premium transportation with Asht Cab Services - your trusted partner for comfortable,
            affordable, and reliable taxi solutions in Ahmedabad.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <TruckIcon className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Local Taxi Services</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Navigate Ahmedabad is vibrant streets with our 24/7 available, well-maintained taxis. 
              Perfect for daily commutes, business meetings, or city exploration.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              Book City Ride
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <TruckIcon className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Premium Cab Services</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Choose from our luxury fleet for business travel or special occasions. 
              Professional drivers, AC vehicles, and seamless city navigation.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              Explore Premium
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Asht Cab?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-max mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-blue-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Taxi vs Public Transport</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Superior Comfort</h3>
              <ul className="space-y-6">
                {comparisonPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-4">{point.icon}</span>
                    <div>
                      <h4 className="font-semibold mb-2">{point.title}</h4>
                      <p className="text-gray-600">{point.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Booking Options</h3>
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <DevicePhoneMobileIcon className="h-6 w-6 mr-4 text-blue-600" />
                  <span>Mobile App</span>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <CreditCardIcon className="h-6 w-6 mr-4 text-blue-600" />
                  <span>Online Payment</span>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <BookOpenIcon className="h-6 w-6 mr-4 text-blue-600" />
                  <span>Advance Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Luxury Fleet</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {carTypes.map((car, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="bg-blue-100 rounded-full p-4 w-max mx-auto mb-4">
                {car.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
              <p className="text-gray-600">{car.capacity}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Ride in Comfort?</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            <button 
              onClick={() => router.push('/Contact')}
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center"
            >
              Contact Our Team
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
            <button 
              onClick={() => router.push('/Booking')}
              className="border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition flex items-center"
            >
              Instant Booking
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}