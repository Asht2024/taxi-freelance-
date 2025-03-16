import Head from 'next/head';
import { 
  ArrowRightIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  
  TruckIcon,
 
  DevicePhoneMobileIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function About() {
  const services = [
    {
      title: "Local Taxi Service in Ahmedabad",
      icon: <MapPinIcon className="w-8 h-8 text-blue-600" />,
      features: ["24/7 Availability", "Instant Booking", "AC Vehicles"]
    },
    {
      title: "Ahmedabad to Mumbai Cab",
      icon: <GlobeAltIcon className="w-8 h-8 text-blue-600" />,
      features: ["6-seater Options", "Live Tracking", "Multiple Stops"]
    },
    {
      title: "Airport Transfers",
      icon: <TruckIcon className="w-8 h-8 text-blue-600" />,
      features: ["Flight Monitoring", "Meet & Greet", "Luggage Help"]
    },
    {
      title: "Rajkot Airport Taxi",
      icon: <DevicePhoneMobileIcon className="w-8 h-8 text-blue-600" />,
      features: ["On-Time Service", "Professional Drivers", "Affordable Rates"]
    },
    {
      title: "Rajkot to Hirasar Airport",
      icon: <ClockIcon className="w-8 h-8 text-blue-600" />,
      features: ["Timely Pickup", "Comfortable Ride", "Reliable Drivers"]
    },
    {
      title: "Outstation Cabs",
      icon: <UserIcon className="w-8 h-8 text-blue-600" />,
      features: ["Long-Distance Travel", "Safety Focused", "AC & Non-AC Cars"]
    }
  ];

  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "250+", label: "Cities Covered" },
    { number: "1100+", label: "Happy Customers" },
    { number: "24/7", label: "Service Availability" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us - Asht Cab Services</title>
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-800 to-blue-600 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Experience Travel Revolution
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Trusted transportation partner for Ahmedabad since 2014
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-all flex items-center gap-2">
              Book Now <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-full hover:bg-white/10 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-20">
        <div className="grid md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-xl p-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Story</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="text-gray-600 space-y-6 text-lg max-w-4xl mx-auto">
            <p>
              Welcome to Asht Cab Services, your reliable and trustworthy partner for all your transportation needs in and around Ahmedabad. We are dedicated to providing exceptional cab services that combine convenience, comfort, and safety.
            </p>
            <p>
              Founded in 2014 with a mission to simplify travel, we’ve now expanded to over 250 cities and earned the trust of 1,100+ satisfied customers. On February 15, 2024, we became a corporate entity. Our sister firm, Aadesh Cab Services, is now a proud part of our journey.
            </p>
            <p>
              Our services include Local Taxi in Ahmedabad, Outstation Cab Services, Rajkot Airport Taxi, Rajkot to Hirasar Airport Taxi, and Ahmedabad to Mumbai Cab. We ensure smooth rides, punctuality, and affordable rates.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Services</h2>
            <p className="text-gray-600">Your travel needs, our top priority</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <ul className="text-gray-600 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Our vision is to make every customer’s journey more meaningful and delightful. We strive to enhance safety and professionalism in our service while incorporating innovative solutions through technology and dedication.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to build strong relationships and maintain long-term bonds with our customers by offering personalized and innovative transportation solutions across cities and towns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Leaders</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The journey of a decade was made possible by the visionary leadership of Mr. Hiren Pankhaniya (Director) and Mrs. Nirmalaben Pankhaniya (CEO). Their commitment continues to inspire our highly professional and hardworking team.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Contact Us Now!</h2>
          <p className="mb-6">
            Stop worrying and enjoy the most reliable and comfortable cab service with ASHT. We’re ready to turn your journey into a memorable adventure.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-100 transition-all">
            Book Your Ride
          </button>
        </div>
      </section>
    </div>
  );
}