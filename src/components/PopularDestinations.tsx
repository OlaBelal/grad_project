import { Link } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    name: 'Pyramids of Giza',
    image: 'https://toppng.com/uploads/preview/egyptian-pyramids-11547843159jpseqoon3h.jpg',
    description: 'Visit the last remaining wonder of the ancient world'
  },
  {
    id: 3,
    name: 'Nuweiba',
    image: 'https://www.kadmartravel.com/images/subpages/83682Created_At_1691396465.Nuweiba.jpg',
    description: 'Discover world-class diving and pristine beaches'
  },
  {
    id: 2,
    name: 'Luxor Temple',
    image: 'https://egyptra.com/wp-content/uploads/2024/12/pngtree-egypt-luxor-temple-view-image_15653539.jpg',
    description: 'Explore the magnificent temples of ancient Thebes'
  },
  
  {
    id: 4,
    name: 'Siwa Oasis',
    image: 'https://betamedia.experienceegypt.eg/media/experienceegypt/img/Original/2024/2/20/2024_2_20_20_18_1_705.jpeg',
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
                <Link
                  to={
                    destination.id === 1
                      ? "/pyramids"
                      : destination.id === 2
                      ? "/luxor-temple"
                      : destination.id === 3
                      ? "/nuweiba"
                      : destination.id === 4
                      ? "/Siwa"
                      : "#"
                  }
                  className="mt-4 text-amber-600 font-semibold hover:text-amber-700 inline-block"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
