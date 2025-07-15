import React from 'react';
import { Shield, Plane, Headset as HeadSet, Award } from 'lucide-react';

const services = [
  {
    icon: Shield,
    title: 'Get Best Prices',
    description: 'Pay through our application and save thousands and get amazing rewards'
  },
  {
    icon: Plane,
    title: 'Covid Safe',
    description: 'We have all the curated hotels that have all the precaution for a covid safe environment'
  },
  {
    icon: HeadSet,
    title: 'Flexible Payment',
    description: 'Enjoy the flexible payment through our app and get rewards on every payment'
  },
  {
    icon: Award,
    title: 'Find The Best Near You',
    description: 'Find the best hotels and places to visit near you in a single click'
  }
];

const Services = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">We Offer Best Services</h2>
          <p className="text-lg text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="text-center group hover:bg-orange-500 p-8 rounded-lg transition-colors duration-300">
                <div className="inline-block p-4 bg-gray-100 rounded-lg mb-6 group-hover:bg-white">
                  <Icon size={32} className="text-orange-500 group-hover:text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-white">{service.title}</h3>
                <p className="text-gray-600 group-hover:text-white">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;