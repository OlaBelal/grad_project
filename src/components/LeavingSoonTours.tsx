import { useEffect, useState } from 'react';
import { Star, MapPin, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { saveInteraction } from '../services/localStorageService';
import { calculateTotal } from '../services/calculationService';
import { UserInteraction } from '../interfaces/userInteraction';
import { authService } from '../services/authService';
import { fetchLeavingSoonTours } from '../services/travelService';
import { Tour } from '../types';
import { API_BASE_URL } from '../services/apiConfig';

const LeavingSoonTours = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const userId = authService.getCurrentUser()?.id || 'anonymous';

  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await fetchLeavingSoonTours();
        const formattedTours = (data.items || []).map(tour => ({
          ...tour,
          imageUrls: Array.isArray(tour.imageUrls) ? tour.imageUrls : [tour.imageUrls || ''],
          coverImageUrl: tour.coverImageUrl || '',
          rating: tour.rating || Math.floor(Math.random() * 2) + 3 + Math.random()
        }));
        setTours(formattedTours);
      } catch (err) {
        setError('Failed to load leaving soon tours');
        console.error('Error loading leaving soon tours:', err);
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
          imageUrl: tour.coverImageUrl || tour.imageUrls?.[0] || `${API_BASE_URL}/default-tour.jpg`
        },
      });
    });
  };

  const handleFavorite = (tour: Tour) => {
    requireAuth(() => {
      const isCurrentlyFavorite = isFavorite(tour.id);
      toggleFavorite({
        ...tour,
        image: tour.coverImageUrl || tour.imageUrls?.[0] || `${API_BASE_URL}/default-tour.jpg`
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === tours.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? tours.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leaving Soon Tours</h2>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Leaving Soon Tours</h2>
          <p className="text-lg text-gray-600">Don't miss these upcoming adventures</p>
        </div>

        {tours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tours available at the moment</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {tours.map((tour) => (
                  <div key={tour.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
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
                            tour.coverImageUrl && tour.coverImageUrl.trim() !== ''
                              ? tour.coverImageUrl.startsWith('http')
                                ? tour.coverImageUrl
                                : `${API_BASE_URL}/${tour.coverImageUrl}`
                              : tour.imageUrls?.length > 0
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
                        <div className="flex flex-col space-y-2">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Departure:</span> {new Date(tour.startDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Available Seats:</span> {tour.availableSeats}
                          </div>
                        </div>
                        <div className="flex space-x-4 mt-4">
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
                            See Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {tours.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-orange-300'}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeavingSoonTours;