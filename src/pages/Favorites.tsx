import React from 'react';
import { Heart, Star, MapPin } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { Tour } from '../types';
import { API_BASE_URL } from '../services/apiConfig';

const Favorites = () => {
  const { favorites, toggleFavorite, loading } = useFavorites();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-lg">Loading favorites...</p>
      </div>
    );
  }

  const handleSeeDetails = (tour: Tour) => {
    navigate('/travel-with-us', {
      state: { tour },
    });
  };

  const handleBookNow = (tour: Tour) => {
    navigate('/payment', {
      state: {
        title: tour.title,
        price: tour.price,
        location: tour.destinationCity
      },
    });
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Favorite Tours</h2>
          <p className="text-lg text-gray-600">Your saved adventures</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">You haven't saved any tours yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((tour) => (
              <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                <button
                  onClick={() => toggleFavorite(tour)}
                  className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm"
                  aria-label="Remove from favorites"
                >
                  <Heart size={20} className="text-red-500 fill-current" />
                </button>

                <div className="relative">
                  <img
  src={
    tour.coverImageUrl && tour.coverImageUrl.trim() !== ''
      ? tour.coverImageUrl.startsWith('http')
        ? tour.coverImageUrl
        : `${API_BASE_URL}/${tour.coverImageUrl}`
      : tour.imageUrls?.[0]?.startsWith('http')
        ? tour.imageUrls[0]
        : tour.imageUrls?.[0]
          ? `${API_BASE_URL}/${tour.imageUrls[0]}`
          : 'https://via.placeholder.com/300x200'
  }
  alt={tour.title}
  className="w-full h-64 object-cover"
  onError={(e) => {
    (e.target as HTMLImageElement).src = `${API_BASE_URL}/default-tour.jpg`;
  }}
/>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-orange-500">
                    £{tour.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {tour.title}
                    </h3>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1 text-gray-600" />
                      <span className="text-sm text-gray-600">
                        {tour.destinationCity}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="w-1/2 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                      onClick={() => handleBookNow(tour)}
                    >
                      Book Now
                    </button>
                    <button
                      className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
                      onClick={() => handleSeeDetails(tour)}
                    >
                      See Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;