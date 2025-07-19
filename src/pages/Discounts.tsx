import React, { useState } from 'react';
import { Star } from 'lucide-react';

const discounts = [
  {
    id: 1,
    title: "Last Minute Deal: Hurghada Resort",
    rating: 4.5,
    reviews: 890,
    price: 2500,
    originalPrice: 5000,
    hotelName: "Hurghada Beach Resort",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "Tomorrow",
    discount: 50,
    isLimitedTime: true
  },
  {
    id: 2,
    title: "Flash Sale: Alexandria Weekend",
    rating: 4.3,
    reviews: 756,
    price: 1800,
    originalPrice: 3000,
    hotelName: "Alexandria Sea View",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "Next 24 hours",
    discount: 40,
    isLimitedTime: true
  },
  {
    id: 3,
    title: "Early Bird: Aswan Cruise",
    rating: 4.7,
    reviews: 1200,
    price: 4000,
    originalPrice: 6000,
    hotelName: "Nile Cruise Deluxe",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "This week",
    discount: 33,
    isLimitedTime: false
  },
  {
    id: 4,
    title: "Special Offer: Sharm El Sheikh",
    rating: 4.6,
    reviews: 980,
    price: 3500,
    originalPrice: 5500,
    hotelName: "Sharm Resort & Spa",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "Next week",
    discount: 36,
    isLimitedTime: false
  }
];

const relatedSearches = [
  "Beach Resorts",
  "Weekend Getaways",
  "Last Minute Deals",
  "Family Packages",
  "Luxury Stays",
  "Adventure Tours"
];

const Discounts = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Search Deals</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full p-2 border rounded-lg pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2">
                  🔍
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Discount Range</h3>
              {[50, 40, 30, 20, 10].map((discount) => (
                <div key={discount} className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <label>{discount}% and above</label>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Deal Type</h3>
              {['Flash Sale', 'Early Bird', 'Last Minute', 'Weekend Special', 'Holiday Package'].map((type) => (
                <div key={type} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(type)}
                    onChange={() => {
                      setSelectedAmenities(prev =>
                        prev.includes(type)
                          ? prev.filter(t => t !== type)
                          : [...prev, type]
                      );
                    }}
                    className="mr-2"
                  />
                  <label>{type}</label>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Price After Discount</h3>
              <div className="flex gap-2 mt-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-20 p-1 border rounded"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-20 p-1 border rounded"
                />
                <button className="bg-gray-200 px-3 rounded">Go</button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label>Limited Time Only</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label>Ending Soon</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {discounts.map((deal) => (
            <div key={deal.id} className="bg-white rounded-lg shadow mb-6 p-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full">
                      -{deal.discount}%
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-start justify-between">
                    <div>
                      {deal.isLimitedTime && (
                        <div className="flex items-center mb-2">
                          <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Limited Time</span>
                        </div>
                      )}
                      <h2 className="text-xl font-semibold mb-2">{deal.title}</h2>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              size={16}
                              className={index < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-600">• {deal.reviews}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-red-600">{deal.price}EG</span>
                    <span className="ml-2 line-through text-gray-600">{deal.originalPrice}EG</span>
                    <span className="ml-2 text-green-600">
                      Save {deal.originalPrice - deal.price}EG ({deal.discount}%)
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center mb-1">
                      <span className="text-blue-500">• {deal.hotelName}</span>
                    </div>
                    <div>Offer ends: {deal.availableUntil}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Related Searches */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">RELATED DEALS</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {relatedSearches.map((search) => (
                <button
                  key={search}
                  className="p-3 bg-white rounded-lg shadow text-left hover:shadow-md transition-shadow"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-8 gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Previous</button>
            {[1, 2, 3, '...', 98].map((page, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded ${page === 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discounts;