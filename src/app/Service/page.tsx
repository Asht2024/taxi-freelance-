import Head from 'next/head';
import Image from 'next/image';
import {
  ArrowRightIcon,
  CalendarIcon,
  BriefcaseIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon,
  ShieldCheckIcon,
  
} from '@heroicons/react/24/outline';
import '../globals.css'


export default function Services() {
  const serviceCategories = [
    {
      title: "One-Way Services",
      icon: <ArrowRightIcon className="w-8 h-8 text-blue-600" />,
      services: [
        "Ahmedabad to Mumbai",
        "Rajkot to Hirasar Airport",
        "Local One-Way Trips",
        "Outstation One-Way"
      ]
    },
    {
      title: "Regular Commutes",
      icon: <CalendarIcon className="w-8 h-8 text-blue-600" />,
      services: [
        "Monthly Subscription Plans",
        "Corporate Employee Transport",
        "School/College Commutes",
        "Daily Office Rides"
      ]
    },
    {
      title: "Business Solutions",
      icon: <BriefcaseIcon className="w-8 h-8 text-blue-600" />,
      services: [
        "Client Pickup/Drop",
        "Executive Travel",
        "Event Transportation",
        "Airport Meet & Greet"
      ]
    }
  ];

  const serviceHighlights = [
    {
      title: "24/7 Availability",
      desc: "Instant booking anytime, anywhere",
      icon: <ClockIcon className="w-12 h-12 text-white" />
    },
    {
      title: "Price Transparency",
      desc: "No hidden charges, clear kilometer rates",
      icon: <CurrencyRupeeIcon className="w-12 h-12 text-white" />
    },
    {
      title: "Premium Fleet",
      desc: "AC vehicles with latest amenities",
      icon: <ShieldCheckIcon className="w-12 h-12 text-white" />
    }
  ];

  return (
    <div 
    className="min-h-screen"
  >
      <Head>
        <title>Our Services - Asht Cab Services</title>
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Premium Cab Services for Every Need
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            10+ years of trusted transportation solutions across 250+ cities
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-all flex items-center gap-2">
              Book Instantly <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-full hover:bg-white/10 transition-all">
              24/7 Support: +91 9925566614
            </button>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Service Categories</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="mb-6 text-blue-600">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.services.map((service, sIndex) => (
                    <li 
                      key={sIndex}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Specialized Solutions</h2>
            <p className="text-gray-600">Tailored services for specific requirements</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-blue-600 w-fit p-4 rounded-lg mb-6">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Private Cab Service</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Discreet travel experience</li>
                <li>• Personal chauffeur</li>
                <li>• Premium vehicle options</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-blue-600 w-fit p-4 rounded-lg mb-6">
                <MapPinIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Airport Transfers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Flight tracking</li>
                <li>• Meet & greet service</li>
                <li>• Luggage assistance</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-blue-600 w-fit p-4 rounded-lg mb-6">
                <BriefcaseIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Corporate Plans</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Bulk booking discounts</li>
                <li>• Monthly invoicing</li>
                <li>• Dedicated account manager</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Transparent Pricing</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-4">City Rides</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">₹12/km</div>
              <ul className="space-y-3 text-gray-600">
                <li>• Free waiting time</li>
                <li>• 24/7 availability</li>
                <li>• AC vehicles</li>
              </ul>
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-4">Outstation</h3>
              <div className="text-4xl font-bold mb-4">₹10/km</div>
              <ul className="space-y-3">
                <li>• One-way options available</li>
                <li>• Driver allowance included</li>
                <li>• Toll taxes excluded</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-4">Hourly Rental</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">₹150/hr</div>
              <ul className="space-y-3 text-gray-600">
                <li>• 8 hour/80km package</li>
                <li>• Multiple stopovers</li>
                <li>• Fuel included</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {serviceHighlights.map((highlight, index) => (
              <div 
                key={index}
                className="bg-blue-600 text-white p-8 rounded-xl text-center hover:-translate-y-2 transition-all"
              >
                <div className="mb-6 flex justify-center">
                  <div className="bg-white/10 p-4 rounded-full">
                    {highlight.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                <p className="text-blue-100">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Premium Fleet</h2>
            <p className="text-gray-600">Choose from our variety of well-maintained vehicles</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {['sedan', 'inova', 'suv'].map((vehicle, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <Image
                  src={`/${vehicle}.png`}
                  alt={vehicle}
                  width={600}
                  height={400}
                  className="rounded-xl transform group-hover:scale-105 transition-all duration-500 object-cover h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 p-6 flex flex-col justify-end">
                  <h3 className="text-white text-xl font-semibold">
                    {vehicle === 'sedan' ? 'Premium Sedan' : 
                     vehicle === 'innova' ? 'Toyota Innova' : 
                     'Premium SUV'}
                  </h3>
                  <div className="text-blue-200 text-sm mt-2">
                    {vehicle === 'sedan' ? "4 Seater • Luxury Interiors" : 
                     vehicle === 'innova' ? "7 Seater • Executive Class" : 
                     "6 Seater • Spacious Cabin"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
     
    </div>
  );
}