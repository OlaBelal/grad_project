import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderSection from '../components/HeaderSection';
import NavigationTabs from '../components/NavigationTabs';
import TabContent from '../components/TabContent';
import zr3Image from '../assets/images/zr3.png';
import { Tour } from '../types';

const TravelWithUs: React.FC = () => {
  const location = useLocation();
  
  // تعريف القيم الافتراضية للجولة
  const defaultTour: Tour = {
    id: 0,
    title: 'Default Tour',
    description: '',
    price: 0,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    creationDate: new Date().toISOString(),
    availableSeats: 0,
    departurePoint: 'Unknown Departure',
    departurePointLat: 0,
    departurePointLng: 0,
    destinationCity: 'Unknown Destination',
    destinationCityLat: 0,
    destinationCityLng: 0,
    transportationType: 'Unknown',
    amenities: [],
    companyId: 0,
    companyName: 'Unknown Company',
    companyLogo: '',
    imageUrls: [],
    itineraries: [],
    rating: 0
  };

  // استخدام الجولة من location.state أو القيم الافتراضية
  const tour = location.state?.tour as Tour || defaultTour;

  const [activeTab, setActiveTab] = useState<string>('Information');

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      {/* Top Section with Background Image */}
      <HeaderSection tour={tour} />

      {/* Container for Navigation and Content */}
      <div className="container mx-auto px-4 -mt-10 z-0 relative bg-white p-6 rounded-lg shadow-lg max-w-[1150px]">
        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Based on Active Tab */}
        <div className="pb-32">
          <TabContent activeTab={activeTab} tour={tour} />
        </div>

        {/* Image at the bottom-left corner of the container */}
        <div className="absolute bottom-0 left-0">
          <img
            src={zr3Image}
            alt="ZR3"
            className="w-60 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default TravelWithUs;
