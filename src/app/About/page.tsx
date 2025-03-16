import Head from 'next/head';
import Image from 'next/image';
import { ArrowRightIcon, ClockIcon, UserGroupIcon, ShieldCheckIcon, CurrencyRupeeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function About() {
  const services = [
    { 
      title: "Local Taxi Service in Ahmedabad", 
      description: "Comfortable rides within the city for work, shopping, or leisure.",
      icon: <ClockIcon className="w-8 h-8 text-blue-600" />
    },
    { 
      title: "Outstation Cab Service", 
      description: "Affordable and safe trips outside Ahmedabad for vacations or business.",
      icon: <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
    },
    { 
      title: "Airport Transfers", 
      description: "Punctual rides to Rajkot and Hirasar airports.", 
      icon: <CurrencyRupeeIcon className="w-8 h-8 text-blue-600" />
    },
  ];

  const team = [
    { name: "Hiren Pankhaniya", role: "Director", bio: "Visionary leader driving innovation and growth." },
    { name: "Nirmalaben Pankhaniya", role: "CEO", bio: "Ensures exceptional service delivery." },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us - Asht Cab Services</title>
      </Head>

      {/* Header Section */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Image 
            src="/logo.png" // Replace with your logo path
            alt="Asht Cab Logo"
            width={120}
            height={40}
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            Book Now <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-blue-600/10 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Trusted Travel Partner in Ahmedabad
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Safe, Comfortable, and Reliable Cab Services Since 2014
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Explore Services
          </button>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Image 
              src="/suv.png" // Add your story image
              alt="Asht Cab Story"
              width={600}
              height={400}
              className="rounded-lg"
            />
            <p className="text-gray-600 leading-relaxed">
              Founded in 2014, Asht Cab Services has grown to serve 1,100+ customers across 250+ cities. 
              From local rides in Ahmedabad to long-distance trips, we prioritize your safety and comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <UserGroupIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Professional Drivers</h3>
              <p className="text-gray-600">Courteous and experienced</p>
            </div>
            <div className="text-center">
              <ShieldCheckIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">Anytime, anywhere</p>
            </div>
            <div className="text-center">
              <CurrencyRupeeIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-gray-600">No hidden charges</p>
            </div>
            <div className="text-center">
              <PhoneIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Dedicated Support</h3>
              <p className="text-gray-600">We’re here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Leaders</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm text-center">
                <Image 
                  src="/team-placeholder.jpg" // Add team photos
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Asht Cab Services</h3>
              <p className="text-gray-400">Your trusted partner for safe and comfortable travel.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Local Taxi</li>
                <li>Outstation Trips</li>
                <li>Airport Transfers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Ahmedabad, Gujarat</p>
              <p className="text-gray-400">+91 12345 67890</p>
              <p className="text-gray-400">info@ashtcab.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {/* Add social media icons */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Asht Cab Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}