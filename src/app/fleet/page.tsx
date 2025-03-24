"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FleetPage = () => {
  const cars = [
    {
      model: "Swift Dzire or Equivalent",
      image_url: "/sedan.png",
      car_name: "Sedan",
      local_price_per_km: 35,
      rental_price: "1650 1950 1800",
      outstation_per_km: 18,
      luggage: 4,
      passenger: 4,
    },
    {
      model: "Ertiga or Equivalent",
      image_url: "/suv.png",
      car_name: "SUV",
      local_price_per_km: 75,
      rental_price: "2450 2850 3550",
      outstation_per_km: 21,
      luggage: 6,
      passenger: 6,
    },
    {
      model: "Marrazo or Equivalent",
      image_url: "/inova.png",
      car_name: "Innova",
      local_price_per_km: 125,
      rental_price: "3800 4500",
      outstation_per_km: 28,
      luggage: 7,
      passenger: 7,
    },
    {
      model: "Innova Cysta or Equivalent",
      image_url: "/inovacysta.png",
      car_name: "Innova Crysta",
      local_price_per_km: 150,
      rental_price: "4700 5500",
      outstation_per_km: 30,
      luggage: 7,
      passenger: 7,
    },
  ];

  const services = [
    { name: "Local Taxi Cab Service in Ahmedabad", link: "/local-taxi-cab-service-ahmdabad" },
    { name: "Ahmedabad to Mumbai Taxi Cab Service", link: "/ahmedabad-to-mumbai-taxi-cab-service" },
    { name: "Rajkot to Hirasar Airport Taxi Service", link: "/rajkot-to-hirasar-cab-service" },
    { name: "Taxi Service in Gujarat", link: "/taxi-service-in-gujarat" },
    { name: "Taxi Service in Ahmedabad Airport", link: "/taxi-service-in-ahmedabad-airport" },
    { name: "Rajkot Airport Taxi", link: "/rajkot-airport-taxi" },
    { name: "Cab Service in Ahmedabad for Outstation", link: "/cab-service-in-ahmedabad-for-outstation" },
  ];

  const router = useRouter();

  return (
    <div className="min-h-screen mt-5 py-8">
      {/* Fleet Section */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Our Fleet
          <span className="block mt-2 text-lg font-normal text-gray-600">
            Choose from our premium selection of vehicles
          </span>
        </h2>

        <div className="space-y-12">
          {cars.map((car, index) => {
            const prices = car.rental_price.split(" ");
            const packages = prices.length === 2
              ? ['8hr/80km', '12hr/120km']
              : ['6hr/60km', '8hr/80km', '12hr/120km'];

            return (
              <div
                key={car.model}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
                    <Image
                      src={car.image_url}
                      alt={car.car_name}
                      layout="fill"
                      objectFit="contain"
                      className="transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">{car.car_name}</h3>
                  <p className="text-gray-600 italic">{car.model}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Local Rate</p>
                      <p className="font-bold text-lg">₹{car.local_price_per_km}/km</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">One-Way</p>
                      <p className="font-bold text-lg">₹{car.outstation_per_km}/km</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Luggage</p>
                      <p className="font-bold text-lg">{car.luggage} Bags</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Passengers</p>
                      <p className="font-bold text-lg">{car.passenger}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Rental Packages:</h4>
                    <div className="flex flex-wrap gap-4">
                      {prices.map((price, i) => (
                        <div
                          key={i}
                          className="bg-blue-100 p-3 rounded-lg flex-1 min-w-[120px] text-center"
                        >
                          <p className="text-lg font-bold text-blue-800">₹{price}</p>
                          <p className="text-xs text-gray-600 mt-1">{packages[i]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => { router.push("/") }}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Our Services
          <span className="block mt-2 text-lg font-normal text-gray-600">
            Explore our comprehensive taxi services
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.link}
              href={service.link}
              className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-600 rounded-full transition-all duration-300 group-hover:h-10"></div>
                <p className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                  {service.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FleetPage;
