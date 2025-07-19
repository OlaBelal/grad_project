import  { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Adventure Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 5,
    text: "The Egypt tour exceeded all my expectations. The guides were incredibly knowledgeable, and the itinerary was perfectly balanced. Seeing the pyramids at sunrise was a moment I'll never forget."
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Cultural Explorer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 5,
    text: "From the moment I booked until the final goodbye, everything was handled with utmost professionalism. The local experiences and hidden gems they showed us made this trip truly special."
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Photography Enthusiast',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 5,
    text: "As a photographer, I was amazed by the unique perspectives and locations they showed us. The sunset camel ride through the desert was absolutely magical. Highly recommend!"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
          <p className="text-lg text-gray-600">Real experiences from real adventurers</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div
              className={`transition-all duration-300 ease-out ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-orange-500"
                    />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <blockquote className="text-xl text-gray-700 italic mb-6">
                      "{testimonials[currentIndex].text}"
                    </blockquote>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-orange-500">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center px-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110"
              disabled={isAnimating}
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110"
              disabled={isAnimating}
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating && index !== currentIndex) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 300);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-orange-500 w-8' : 'bg-gray-300'
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;