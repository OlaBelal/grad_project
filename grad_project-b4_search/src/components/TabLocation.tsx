import React from 'react';
import { Tour } from '../types';

const encodeLocation = (location: string) => {
  return encodeURIComponent(location);
};

const TabLocation: React.FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-[#DF6951] mb-4">Location</h2>
      <div className="bg-gray-200 h-96 rounded-lg overflow-hidden">
        {tour.destinationCityLat && tour.destinationCityLng ? (
  <iframe
    src={`https://maps.google.com/maps?q=${tour.destinationCityLat},${tour.destinationCityLng}&z=14&output=embed`}
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
  />
) : (
  <div className="flex items-center justify-center h-full text-gray-600">
    Location data not available.
  </div>
)}

      </div>
      <li className="pt-4">
        <span>{tour.destinationCity}</span> This destination offers a variety of transport options, including public transit, car rentals, and guided tours for convenient travel. You can explore a range of accommodations, from luxury hotels to cozy boutique stays, ensuring a comfortable visit. Additionally, the area is home to popular attractions, local eateries, and cultural landmarks, making it a perfect spot for both adventure and relaxation.
      </li>
    </div>
  );
};

export default TabLocation;