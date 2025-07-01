import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tour} from '../types';
import TabInformation from './TabInformation';
import TabTourPlan from './TabTourPlan';
import TabLocation from './TabLocation';
import TabGallery from './TabGallery';
// import TabReviews from './TabReviews';
import BookingForm from './BookingForm';

interface TabContentProps {
  activeTab: string;
  tour: Tour;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, tour }) => {
  // const [reviews, setReviews] = useState<Review[]>([
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     rating: 5,
  //     comment: 'Amazing tour! The guide was very knowledgeable and the itinerary was perfect.',
  //     date: '2023-10-15',
  //     avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Smith',
  //     rating: 4,
  //     comment: 'Great experience overall, but the food could have been better.',
  //     date: '2023-09-22',
  //     avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  //   }
  // ]);

  const navigate = useNavigate();

  const handleCompanyNameClick = () => {
    navigate('/CompaniesPag', {
      state: {
        companyName: tour.companyName,
        companyLogo: tour.companyLogo
      }
    });
  };

  return (
    <div className="mt-8 pb-8 relative">
      <div className="flex gap-8 max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'Information' && (
            <TabInformation tour={tour} onCompanyNameClick={handleCompanyNameClick} />
          )}

          {activeTab === 'Tour Plan' && <TabTourPlan />}

          {activeTab === 'Location' && <TabLocation tour={tour} />}

          {activeTab === 'Gallery' && <TabGallery tour={tour} />}

          {/* {activeTab === 'Reviews' && (
            <TabReviews reviews={reviews} setReviews={setReviews} />
          )} */}
        </div>

        {/* Booking Form (Sticky to the Right) */}
        <BookingForm tour={tour} />
      </div>
    </div>
  );
};

export default TabContent;
