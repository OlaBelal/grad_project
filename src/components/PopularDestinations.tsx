import React from 'react';

const destinations = [
  {
    id: 1,
    name: 'Pyramids of Giza',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Visit the last remaining wonder of the ancient world'
  },
  {
    id: 2,
    name: 'Luxor Temple',
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Explore the magnificent temples of ancient Thebes'
  },
  {
    id: 3,
    name: 'Red Sea',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Discover world-class diving and pristine beaches'
  },
  {
    id: 4,
    name: 'Valley of the Kings',
    image: 'https://images.unsplash.com/photo-1560153216-a7ae9d3f8631?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: "Uncover the secrets of pharaohs' tombs"
  }
];

const PopularDestinations = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-lg text-gray-600">Explore Egypt's most iconic locations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative h-48">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{destination.name}</h3>
                <p className="text-gray-600">{destination.description}</p>
                <button className="mt-4 text-amber-600 font-semibold hover:text-amber-700">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;