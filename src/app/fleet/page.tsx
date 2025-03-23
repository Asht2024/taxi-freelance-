import React from 'react';

const FleetPage = () => {
  const cars = [
    {
      id: 1,
      name: 'SUV',
      image: '/suv.png',
      description: 'Spacious and comfortable, perfect for family trips and off-road adventures.',
    },
    {
      id: 2,
      name: 'Sedan',
      image: '/sedan.png',
      description: 'Elegant and efficient, ideal for city drives and business travel.',
    },
    {
      id: 3,
      name: 'Innova Crysta',
      image: '/inovacysta.png',
      description: 'Luxurious and reliable, great for long journeys and group travel.',
    },
    {
      id: 4,
      name: 'Innova',
      image: '/inova.png',
      description: 'Durable and versatile, suitable for both personal and commercial use.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Fleet</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{car.name}</h2>
                <p className="text-gray-600">{car.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FleetPage;