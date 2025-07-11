import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Sunset Desert Safari",
    description: "Based on your interest in adventure travel, experience a magical evening in the desert with camel riding, sandboarding, and traditional dinner under the stars.",
    date: "Mar 15, 2024",
    location: "Sahara Desert",
    duration: "6 hours",
    groupSize: "8-12",
    image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 89
  },
  {
    id: 2,
    title: "Nile Dinner Cruise",
    description: "Perfect for couples! Enjoy a romantic evening cruise along the Nile with live entertainment and gourmet Egyptian cuisine.",
    date: "Mar 18, 2024",
    location: "Cairo",
    duration: "4 hours",
    groupSize: "2-30",
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    price: 75
  },
  {
    id: 3,
    title: "Ancient Temples Photography Tour",
    description: "Based on your photography interests, join our expert guide for the perfect photo opportunities at Luxor's ancient temples during golden hour.",
    date: "Mar 20, 2024",
    location: "Luxor",
    duration: "5 hours",
    groupSize: "6-10",
    image: "https://demo-source.imgix.net/mountains.jpg",
    price: 95
  }
];

const AIEvents = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    setTimeout(() => setIsAnimating(false), 300); // Reduced from 500ms to 300ms
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
    setTimeout(() => setIsAnimating(false), 300); // Reduced from 500ms to 300ms
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300); // Reduced from 500ms to 300ms
  };

  const currentEvent = events[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Suggested Events for You</h2>
            <p className="text-gray-600">Personalized experiences based on your interests</p>
          </div>
          <div className="hidden md:block">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-600 rounded-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              AI Powered
            </div>
          </div>
        </div>

        <div className="relative">
          <div 
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-300 ease-out ${
              isAnimating ? `transform ${direction > 0 ? '-translate-x-full' : 'translate-x-full'} opacity-0` : 'transform translate-x-0 opacity-100'
            }`}
          >
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-out transform hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-lg font-semibold text-orange-500">
                ${currentEvent.price}
              </div>
            </div>
            
            <div className="p-6 lg:p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{currentEvent.title}</h3>
              <p className="text-gray-600 text-lg mb-8">{currentEvent.description}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center text-gray-600">
                  <Calendar size={24} className="mr-3 text-orange-500" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <span className="text-sm">{currentEvent.date}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={24} className="mr-3 text-orange-500" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <span className="text-sm">{currentEvent.location}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={24} className="mr-3 text-orange-500" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <span className="text-sm">{currentEvent.duration}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={24} className="mr-3 text-orange-500" />
                  <div>
                    <p className="font-semibold">Group Size</p>
                    <span className="text-sm">{currentEvent.groupSize}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-200 text-lg font-semibold transform hover:scale-[1.02]">
                Book Now - ${currentEvent.price}
              </button>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-3">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                disabled={isAnimating}
                className={`w-3 h-3 rounded-full transition-all duration-200 transform hover:scale-125 ${
                  index === currentIndex 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-gray-300 hover:bg-orange-300'
                } disabled:cursor-not-allowed`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIEvents;