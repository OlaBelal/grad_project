
import { Calendar, Users } from 'lucide-react';

const tours = [
  {
    id: 1,
    title: 'Cairo & Pyramids Explorer',
    duration: '3 Days',
    groupSize: '10-15 people',
    price: 499,
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 2,
    title: 'Nile River Cruise',
    duration: '7 Days',
    groupSize: '20-30 people',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1565812999201-8c1c6367d00a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 3,
    title: 'Red Sea Diving Adventure',
    duration: '5 Days',
    groupSize: '8-12 people',
    price: 799,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  }
];

const FeaturedTours = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Tours</h2>
          <p className="text-lg text-gray-600">Handpicked tours for unforgettable experiences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-full">
                  From ${tour.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{tour.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={20} className="mr-2" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={20} className="mr-2" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;