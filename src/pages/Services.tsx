import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Ship, Car, Train, MapPin, Compass } from 'lucide-react';

const services = [
  {
    icon: Plane,
    title: 'Travel With Us',
    description: 'Discover amazing destinations with our curated travel packages',
    link: '/travel-with-us'
  },
  {
    icon: Ship,
    title: 'Cruise Packages',
    description: 'Luxury cruise experiences to unforgettable destinations',
    link: '/cruises'
  },
  {
    icon: Car,
    title: 'Car Rentals',
    description: 'Explore at your own pace with our premium car rental service',
    link: '/car-rentals'
  },
  {
    icon: Train,
    title: 'Rail Tours',
    description: 'Scenic rail journeys through breathtaking landscapes',
    link: '/rail-tours'
  },
  {
    icon: MapPin,
    title: 'Local Experiences',
    description: 'Authentic local experiences and cultural immersions',
    link: '/local-experiences'
  },
  {
    icon: Compass,
    title: 'Adventure Tours',
    description: 'Thrilling adventures for the bold explorer',
    link: '/adventure-tours'
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600">Choose from our wide range of travel services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(service.link)}
                className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                  <Icon size={32} className="text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-orange-500 font-medium hover:text-orange-600">
                  Learn More →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;