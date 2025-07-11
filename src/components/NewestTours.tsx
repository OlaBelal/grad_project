import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, ChevronLeft, ChevronRight, Star, Tag, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { authService } from '../services/authService';
import { saveInteraction } from '../services/localStorageService';
import { calculateTotal } from '../services/calculationService';
import { UserInteraction } from '../interfaces/userInteraction';
import { fetchNewestTours } from '../services/travelService';
import { Tour } from '../types';
import { API_BASE_URL } from '../services/apiConfig';

const NewestTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const userId = authService.getCurrentUser()?.id || 'anonymous';

  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await fetchNewestTours();
        const formattedTours = data.items.map(tour => ({
          ...tour,
          imageUrls: Array.isArray(tour.imageUrls) ? tour.imageUrls : [tour.imageUrls || ''],
          rating: tour.rating || Math.floor(Math.random() * 2) + 3 + Math.random() // Random rating between 3-5 if not provided
        }));
        setTours(formattedTours);
      } catch (err) {
        setError('Failed to load newest tours');
        console.error('Error loading newest tours:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  useEffect(() => {
    if (tours.length > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [tours, currentIndex]);

  const handleNext = () => {
    if (isAnimating || tours.length === 0) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tours.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating || tours.length === 0) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tours.length) % tours.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex || tours.length === 0) return;
    setDirection(index > currentIndex ? 1 : -1);
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const requireAuth = (action: () => void) => {
    if (!authService.isAuthenticated()) {
      if (window.confirm('You need to login first. Do you want to login now?')) {
        navigate('/login', { state: { from: '/newest-tours' } });
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

  const handleViewDetails = (tourId: number) => {
    const tour = tours.find(t => t.id === tourId);
    if (!tour) return;
    
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

  const calculateDuration = (startDate: string, endDate: string): string => {
    const diffInMs = new Date(endDate).getTime() - new Date(startDate).getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return `${diffInDays} days`;
  };

  const currentTour = tours[currentIndex];

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-pulse h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="animate-pulse h-6 bg-gray-200 rounded w-1/4 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-pulse bg-gray-200 h-[500px] rounded-xl"></div>
              <div className="space-y-4">
                <div className="animate-pulse h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="animate-pulse h-6 bg-gray-200 rounded w-full"></div>
                <div className="animate-pulse h-6 bg-gray-200 rounded w-5/6"></div>
                <div className="animate-pulse h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="animate-pulse h-12 bg-gray-200 rounded mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-orange-500 text-white rounded text-orange-500"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (tours.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Newest Tours</h2>
          <p className="text-gray-600 mb-8">No newest tours available at the moment</p>
          <button
            onClick={() => navigate('/tours')}
            className="px-4 py-2 text-orange-500 text-white rounded text-orange-500"
          >
            View All Tours
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Newest Tours</h2>
            <p className="text-gray-600">Discover our latest travel experiences</p>
          </div>
          <div className="hidden md:block">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-orange-500 rounded-full">
              <Tag size={20} className="mr-2" />
              Just Added
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
                src={
                  currentTour.coverImageUrl && currentTour.coverImageUrl.trim() !== ''
                    ? currentTour.coverImageUrl.startsWith('http')
                      ? currentTour.coverImageUrl
                      : `${API_BASE_URL}/${currentTour.coverImageUrl}`
                    : currentTour.imageUrls?.length > 0
                      ? currentTour.imageUrls[0].startsWith('http')
                        ? currentTour.imageUrls[0]
                        : `${API_BASE_URL}/${currentTour.imageUrls[0]}`
                      : `${API_BASE_URL}/default-tour.jpg`
                }
                alt={currentTour.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-out transform hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `${API_BASE_URL}/default-tour.jpg`;
                }}
              />

              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <button
                  onClick={() => handleFavorite(currentTour)}
                  className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all"
                  aria-label={isFavorite(currentTour.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    size={20}
                    className={
                      isFavorite(currentTour.id)
                        ? 'text-red-500 fill-current'
                        : 'text-gray-400 hover:text-red-500'
                    }
                  />
                </button>
                <div className="bg-white px-4 py-2 rounded-full text-lg font-semibold text-orange-500">
                  £{currentTour.price || 0}
                </div>
              </div>
            </div>
            
            <div className="p-6 lg:p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-bold text-gray-900">{currentTour.title}</h3>
                <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                  <Star size={16} className="text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{currentTour.rating?.toFixed(1) || '4.5'}</span>
                </div>
              </div>
              <p className="text-gray-600 text-lg mb-8">{currentTour.description || 'Explore this amazing new destination with our latest tour offering.'}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center text-gray-600">
                  <Calendar size={24} className="mr-3 text-orange-500" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <span className="text-sm">
                      {new Date(currentTour.startDate).toLocaleDateString()} - {new Date(currentTour.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={24} className="mr-3 text-orange-500" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <span className="text-sm">{currentTour.destinationCity}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={24} className="mr-3 text-orange-500" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <span className="text-sm">
                      {calculateDuration(currentTour.startDate, currentTour.endDate)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={24} className="mr-3 text-orange-500" />
                  <div>
                    <p className="font-semibold">Seats Left</p>
                    <span className="text-sm">{currentTour.availableSeats}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => handleBookNow(currentTour)}
                  disabled={currentTour.availableSeats <= 0}
                  className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 text-lg font-semibold transform hover:scale-[1.02] ${
                    currentTour.availableSeats > 0 
                      ? 'bg-orange-500 text-white hover:bg-orange-600' 
                      : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  {currentTour.availableSeats > 0 ? 'Book Now' : 'Sold Out'}
                </button>
                <button
                  onClick={() => handleViewDetails(currentTour.id)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-200 text-lg font-semibold transform hover:scale-[1.02]"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            <button
              onClick={handlePrev}
              disabled={isAnimating || tours.length === 0}
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating || tours.length === 0}
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-3">
            {tours.map((_, index) => (
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

export default NewestTours;