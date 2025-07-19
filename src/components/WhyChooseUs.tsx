import React from 'react';
import { Shield, Clock, Award, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safe Travel',
    description: 'Your safety is our top priority with trusted partners and experienced guides'
  },
  {
    icon: Clock,
    title: 'Flexible Booking',
    description: 'Easy booking process with free cancellation up to 24 hours before departure'
  },
  {
    icon: Award,
    title: 'Expert Guides',
    description: 'Knowledgeable local guides who bring history to life'
  },
  {
    icon: HeartHandshake,
    title: 'Local Experience',
    description: 'Authentic experiences and interactions with local communities'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-600">Experience Egypt with confidence and comfort</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-block p-4 bg-amber-100 rounded-full mb-6">
                  <Icon size={32} className="text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;