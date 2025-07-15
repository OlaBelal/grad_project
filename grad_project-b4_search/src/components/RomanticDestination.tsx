import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTours } from '../services/travelService';
import { Tour } from '../types';
import { API_BASE_URL } from '../services/apiConfig';

const RomanticDestination = () => {
  const [tour, setTour] = useState<Tour | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTour = async () => {
      try {
        const data = await fetchTours();
        const selected = data.find((t: Tour) => t.id === 3);
        setTour(selected || null);
      } catch (error) {
        console.error('Error loading tour:', error);
      }
    };
    loadTour();
  }, []);

  const handleViewPackage = () => {
    if (tour) {
      navigate('/travel-with-us', { state: { tour } });
    }
  };

  const handleCompanyClick = () => {
    if (tour?.companyId) {
      navigate(`/companies/${tour.companyId}`);
    }
  };

  if (!tour) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {tour.title || 'Our Romantic Tropical Destinations'}
            </h2>
            <p className="text-gray-600 mb-8">
              {tour.description ||
                'Explore a magical destination perfect for couples and unforgettable moments.'}
            </p>
            <button
              className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600"
              onClick={handleViewPackage}
            >
              View Packages
            </button>
          </div>
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
  alt="Romantic destination"
  className="rounded-lg shadow-xl w-full h-80 object-cover"
  onError={(e) => {
    (e.target as HTMLImageElement).src = `${API_BASE_URL}/default-tour.jpg`;
  }}
/>
            {tour.companyName && (
              <div
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg cursor-pointer"
                onClick={handleCompanyClick}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={tour.companyProfileImageUrl || '/images/default-company.png'}
                    alt={tour.companyName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{tour.companyName}</h4>
                    <p className="text-gray-600">Tour Operator</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RomanticDestination;
