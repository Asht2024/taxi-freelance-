"use client";
import Head from 'next/head';
import { 
  ArrowRightIcon,
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'; // Removed CarIcon
import '../globals.css';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();
  
  const whyChooseUs = [
    { 
      icon: <CheckCircleIcon className="w-8 h-8 text-blue-600" />,
      title: "Comfortable & Clean Vehicles",
      content: "Our fleet is regularly maintained for cleanliness and comfort."
    },
    { 
      icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
      title: "Professional Drivers",
      content: "Experienced, courteous drivers ensuring safe rides."
    },
    { 
      icon: <ClockIcon className="w-8 h-8 text-blue-600" />,
      title: "24/7 Availability",
      content: "Round-the-clock service for any time travel needs."
    },
    { 
      icon: <CheckCircleIcon className="w-8 h-8 text-blue-600" />,
      title: "Affordable Pricing",
      content: "Competitive rates with no hidden charges."
    }
  ];

  return (
    <div className="min-h-screen">
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
            <button onClick={() => router.push("/Booking")} className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-all flex items-center gap-2">
              Book Now <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button onClick={() => router.push("/Contact")} className="border-2 border-white px-6 py-3 rounded-full hover:bg-white/10 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-20">
        <div className="grid md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-xl p-6">
          {[{ number: "10+", label: "Years Experience" }, { number: "250+", label: "Cities Covered" }, { number: "1100+", label: "Happy Customers" }, { number: "24/7", label: "Service Availability" }].map((stat, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Journey</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-1 gap-8">
            <div className="space-y-8">
              <div className="border-2 border-blue-600 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">About Asht Cab Services</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your reliable partner for transportation in Ahmedabad. We combine convenience, comfort, and safety for 
                  seamless travel experiences. Whether local rides or long journeys, our professional drivers and 
                  well-maintained vehicles ensure smooth trips.
                </p>
              </div>
              <div className="border-2 border-blue-600 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Foundation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Founded in 2014 to simplify travel, we have expanded to 250+ cities with 1100+ satisfied customers. 
                  Now a corporate entity with our sister firm Aadesh Cab Services, we offer local taxis, outstation 
                  cabs, and airport transfers with punctuality and affordability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Choose Us?</h2>
            <p className="text-gray-600">Your satisfaction, our commitment</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  {item.icon}
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To make every journey meaningful through enhanced safety and tech-driven solutions. We aim to 
                provide cost-effective, seamless experiences while setting new transportation standards.
              </p>
            </div>
            <div className="bg-yellow-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                Build lasting customer relationships through exceptional solutions. Expanding across cities while 
                leveraging technology to redefine cab services and elevate operational excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
              Reviving Travel Comfort
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <SparklesIcon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <p className="text-gray-600">
                  Experience ultimate comfort with ASHT Cab Services. Through meticulous supervision and commitment 
                  to excellence, we consistently exceed customer expectations.
                </p>
              </div>
              {/* Add other milestone points similarly */}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Fleet */}
      <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <UserGroupIcon className="w-8 h-8 text-green-600" />
              Our Leadership
            </h3>
            <p className="text-gray-600">
              Driven by Director Mr. Hiren Pankhaniya and CEO Mrs. Nirmalaben Pankhaniya...
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TruckIcon className="w-8 h-8 text-blue-600" /> {/* Changed to TruckIcon */}
              Our Fleet
            </h3>
            <p className="text-gray-600">
              Featuring latest models with cutting-edge technology...
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* Final CTA with Contact Content */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-xl mb-8">
            Experience reliable, safe, and convenient travel with Asht Cab Services. 
            Contact us for any travel needs or questions about your trip.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => router.push("/Contact")} className="bg-white text-blue-900 px-8 py-3 rounded-full hover:bg-blue-100 transition-all">
              Contact Us
            </button>
            <button onClick={() => router.push("/Booking")} className="border-2 border-white px-8 py-3 rounded-full hover:bg-white/10">
              Book Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}



