import  { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 1499,
    rating: 4.8,
    duration: '7 Days',
    description: 'Experience the magic of the Swiss Alps with our carefully curated tour package.'
  },
  {
    id: 2,
    title: 'Berlin',
    image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 899,
    rating: 4.6,
    duration: '5 Days',
    description: 'Discover the rich history and vibrant culture of Germany\'s capital city.'
  },
  {
    id: 3,
    title: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 2499,
    rating: 4.9,
    duration: '6 Days',
    description: 'Relax in paradise with crystal clear waters and luxury overwater villas.'
  },
  {
    id: 4,
    title: 'Toronto',
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 1299,
    rating: 4.5,
    duration: '5 Days',
    description: 'Experience the diversity and excitement of Canada\'s largest city.'
  },
  {
    id: 5,
    title: 'Baku',
    image: 'https://images.unsplash.com/photo-1601574968106-b312ac309953?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 1099,
    rating: 4.4,
    duration: '4 Days',
    description: 'Explore the unique blend of ancient and modern in Azerbaijan\'s capital.'
  },
  {
    id: 6,
    title: 'Chinese',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 1899,
    rating: 4.7,
    duration: '8 Days',
    description: 'Journey through China\'s most iconic destinations and cultural sites.'
  }
];

const PackagesArchive = () => {
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
      }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Travel With Us</h1>
            <p className="text-xl">Discover amazing places at exclusive deals</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              <SlidersHorizontal size={20} />
              Filters
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="date">Date</option>
              <option value="price-high">Price High to Low</option>
              <option value="price-low">Price Low to High</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Packages Grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-orange-500">
                    ${pkg.price}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-600">{pkg.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">{pkg.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-6">Plan Your Trip</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check In
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>3-4 days</option>
                    <option>5-7 days</option>
                    <option>8-10 days</option>
                    <option>10+ days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Join Our Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get special offers and more from Travel With Us
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesArchive;