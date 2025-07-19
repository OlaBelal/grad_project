import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderSection from '../components/HeaderSection';
import NavigationTabs from '../components/NavigationTabs';
import TabContent from '../components/TabContent';
import zr3Image from '../assets/images/zr3.png';
import { Tour } from '../types';
import { fetchTourDetails } from '../services/travelService';
import { ChatbotContext } from '../context/ChatbotContext';

const TravelWithUs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleChat } = useContext(ChatbotContext);
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Information');

  useEffect(() => {
    const loadTourData = async () => {
      try {
        // Get tourId from location.state whether from chatbot or direct link
        const tourId = location.state?.id || location.state?.tour?.id || location.state?.tourId;
        
        if (!tourId) {
          throw new Error('Tour ID is missing');
        }

        const tourData = await fetchTourDetails(tourId);
        setTour(tourData);
      } catch (err) {
        console.error('Failed to load tour:', err);
        setError('Failed to load tour details');
      } finally {
        setLoading(false);
      }
    };

    loadTourData();
  }, [location.state]);

  useEffect(() => {
    // Close the chatbot when opening the travel page
    toggleChat(); // Removed the argument here
  }, [toggleChat]);

  if (loading) {
    return <div className="text-center py-10">Loading tour details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!tour) {
    return <div className="text-center py-10">No tour data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <HeaderSection tour={tour} />

      <div className="container mx-auto px-4 -mt-10 z-0 relative bg-white p-6 rounded-lg shadow-lg max-w-[1150px]">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="pb-32">
          <TabContent activeTab={activeTab} tour={tour} />
        </div>

        <div className="absolute bottom-0 left-0">
          <img src={zr3Image} alt="ZR3" className="w-60 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default TravelWithUs;