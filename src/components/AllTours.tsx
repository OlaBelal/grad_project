import { useEffect, useState } from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { saveInteraction } from '../services/localStorageService';
import { calculateTotal } from '../services/calculationService';
import { UserInteraction } from '../interfaces/userInteraction';
import { authService } from '../services/authService';
import { fetchTours } from '../services/travelService';
import { Tour } from '../types';
import { API_BASE_URL } from '../services/apiConfig';

const AllTours = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 9;
  const userId = authService.getCurrentUser()?.id || 'anonymous';

  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await fetchTours();
        const formattedTours = data.map(tour => ({
          ...tour,
          imageUrls: Array.isArray(tour.imageUrls) ? tour.imageUrls : [tour.imageUrls || ''],
          rating: tour.rating || Math.floor(Math.random() * 2) + 3 + Math.random() // Random rating between 3-5 if not provided
        }));
        setTours(formattedTours);
      } catch (err) {
        setError('Failed to load tours. Please try again later.');
        console.error('Error loading tours:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  const requireAuth = (action: () => void) => {
    if (!authService.isAuthenticated()) {
      if (window.confirm('You need to login first. Do you want to login now?')) {
        navigate('/login', { state: { from: location.pathname } });
      }
      return false;
    }
    action();
    return true;
  };

  const handleBookNow = (tour: Tour) => {
    requireAuth(() => {
      const interaction: UserInteraction = {
        userId,
        id: tour.id.toString(),
        type: 'travel',
        checkout: 1,
        favourite: isFavorite(tour.id),
        booked: true,
        total: tour.price || 0
      };
      
      interaction.total = calculateTotal(interaction);
      saveInteraction(interaction);
      
      navigate('/payment', {
        state: {
          title: tour.title,
          price: tour.price,
          location: tour.destinationCity,
          imageUrl: tour.imageUrls?.[0] || `${API_BASE_URL}/default-tour.jpg`
        },
      });
    });
  };

  const handleFavorite = (tour: Tour) => {
    requireAuth(() => {
      const isCurrentlyFavorite = isFavorite(tour.id);
      toggleFavorite({
        ...tour,
        image: tour.imageUrls?.[0] || `${API_BASE_URL}/default-tour.jpg`
      });
      
      const interaction: UserInteraction = {
        userId,
        id: tour.id.toString(),
        type: 'travel',
        checkout: 0,
        favourite: !isCurrentlyFavorite,
        booked: false,
        total: 0
      };
      
      interaction.total = calculateTotal(interaction);
      saveInteraction(interaction);
    });
  };

  const handleSeeDetails = (tour: Tour) => {
    const interaction: UserInteraction = {
      userId,
      id: tour.id.toString(),
      type: 'travel',
      checkout: 0,
      favourite: isFavorite(tour.id),
      booked: false,
      total: 0
    };
    
    interaction.total = calculateTotal(interaction);
    saveInteraction(interaction);
    
    navigate('/travel-with-us', { state: { tour } });
  };

  // Filter tours based on search term and price range
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tour.destinationCity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = (tour.price || 0) >= priceRange[0] && (tour.price || 0) <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  // Pagination logic
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Available Tours</h2>
            <p className="text-lg text-gray-600">Loading tours...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-64 w-full"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">All Available Tours</h2>
          <p className="text-lg text-gray-600">Discover your next adventure</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Tours
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title or destination..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range: £{priceRange[0]} - £{priceRange[1]}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  id="priceRange"
                  min="0"
                  max="10000"
                  step="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  value={priceRange[1]}
                  onChange={(e) => {
                    setPriceRange([priceRange[0], parseInt(e.target.value)]);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setPriceRange([0, 10000]);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {filteredTours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tours match your search criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 10000]);
                setCurrentPage(1);
              }}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Show All Tours
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentTours.map((tour) => (
                <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative hover:shadow-xl transition-shadow duration-300">
                  <button
                    onClick={() => handleFavorite(tour)}
                    className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                    aria-label={isFavorite(tour.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      size={20}
                      className={
                        isFavorite(tour.id)
                          ? 'text-red-500 fill-current'
                          : 'text-gray-400 hover:text-red-500'
                      }
                    />
                  </button>

                  <div className="relative">
                    <img
                      src={
                        tour.imageUrls?.length > 0
                          ? tour.imageUrls[0].startsWith('http')
                            ? tour.imageUrls[0]
                            : `${API_BASE_URL}/${tour.imageUrls[0]}`
                          : `${API_BASE_URL}/default-tour.jpg`
                      }
                      alt={tour.title}
                      className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `${API_BASE_URL}/default-tour.jpg`;
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-orange-500 shadow-sm">
                      £{tour.price || 0}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                        {tour.title}
                      </h3>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{tour.rating?.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{tour.destinationCity}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {tour.description || 'No description available'}
                    </p>
                    <div className="flex space-x-4">
                      <button
                        className={`flex-1 ${tour.availableSeats > 0 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 rounded-md transition-colors`}
                        onClick={() => tour.availableSeats > 0 && handleBookNow(tour)}
                        disabled={tour.availableSeats <= 0}
                      >
                        {tour.availableSeats > 0 ? 'Book Now' : 'Sold Out'}
                      </button>
                      <button
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
                        onClick={() => handleSeeDetails(tour)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-md ${currentPage === pageNum ? 'bg-orange-500 text-white' : 'border border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllTours;