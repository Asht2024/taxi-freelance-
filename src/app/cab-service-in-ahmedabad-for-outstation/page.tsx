"use client"
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { FaCarSide, FaRoute, FaCity, FaStar } from 'react-icons/fa';
import Main from '../../../components/Main';
import { useRouter } from 'next/navigation';
export default function HomePage() {
  const router=useRouter()
  return (
    <div className='mt-10'>
    <Main/>
    <div className="min py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Hero Section */}
        <section className="bg-white rounded-2xl p-8 shadow-2xl shadow-blue-100/50 border-2 border-blue-50 transform transition hover:shadow-blue-200/50">
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-blue-100 p-4 rounded-xl">
              <FaCarSide className="text-4xl text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Reliable Cab Services in Ahmedabad for Local and Outstation Travel
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Ahmedabad, a bustling metropolis known for its rich history, vibrant culture, and rapid urban growth, is one
            of Gujarat’s most visited cities. Whether you’re a resident or a visitor, navigating this city and traveling
            to nearby destinations requires a reliable cab service...
          </p>
        </section>

        {/* Outstation Travel */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <FaRoute className="text-4xl" />
              <h2 className="text-2xl font-bold">Outstation Cab Service</h2>
            </div>
            <p className="text-blue-50 leading-relaxed mb-4">
              For travelers looking to explore nearby destinations from Ahmedabad, our cab service for outstation trips is
              the ideal choice. Whether it’s a weekend getaway, business trip, or family vacation...
            </p>
            <div className="bg-white/10 p-4 rounded-xl">
              <p className="font-semibold">Popular Destinations:</p>
              <p className="opacity-90">Udaipur • Mount Abu • Surat • Vadodara</p>
            </div>
          </div>

          {/* Local Service */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-50">
            <div className="flex items-center gap-4 mb-6">
              <FaCity className="text-4xl text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Local Cab Service</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              For those who need quick, efficient transportation within the city, our local cab service is designed to
              meet your needs. Whether you are heading to an office, meeting, or running errands...
            </p>
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="font-semibold text-blue-600">Coverage Area:</p>
              <p className="text-blue-600/90">Entire Ahmedabad City & Suburbs</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <FaStar className="text-4xl text-amber-400" />
            <h2 className="text-2xl font-bold text-gray-800">Why Choose Asht Cab Services?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Comfortable Rides', desc: 'Modern amenities, regularly maintained vehicles' },
              { title: 'Professional Drivers', desc: 'Licensed, experienced, and courteous' },
              { title: 'Flexible Booking', desc: 'Easy scheduling for any trip type' },
              { title: 'Competitive Pricing', desc: 'Transparent rates, no hidden fees' },
              { title: '24/7 Availability', desc: 'Round-the-clock service' },
              { title: 'Safety First', desc: 'Verified drivers, emergency support' },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
                <h3 className="font-bold text-blue-600 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-8 text-white shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Conclusion</h2>
          <p className="text-lg leading-relaxed mb-4">
            When it comes to reliable and convenient cab service in Ahmedabad, Asht Cab Services is your go-to provider.
            Our commitment to customer satisfaction, competitive rates, and professional service makes us the preferred
            choice...
          </p>
          <button 
            onClick={() => router.push('/Booking')}
            className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center mx-auto"
          >
            Book Your Ride Now
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        </section>
      </div>
    </div>
    </div>
  );
}