import React from 'react';
import { Itinerary } from '../types';
import { FaUtensils, FaCoffee, FaHamburger, FaRunning, FaMapMarkerAlt, FaClock, FaStickyNote } from 'react-icons/fa';

interface TabTourPlanProps {
  itineraries: Itinerary[];
}

const TabTourPlan: React.FC<TabTourPlanProps> = ({ itineraries }) => {
  console.log('Rendering TabTourPlan with itineraries:', itineraries);
  
  if (!itineraries || itineraries.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-4xl font-bold text-[#DF6951] mb-4">Tour Plan</h2>
        <p className="text-gray-600">No itinerary information available for this tour.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-4xl font-bold text-[#DF6951] mb-6">Tour Plan</h2>
      <div className="relative">
        <div className="absolute left-4 h-full border-l-2 border-gray-300 border-dashed"></div>

        {itineraries.map((item, index) => (
          <div className="flex items-start mb-8" key={index}>
            <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
              <span className="text-sm font-bold">
                {item.dayNumber.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="ml-6 flex-1">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              
              <div className="mb-2 flex items-center gap-2">
                <FaClock className="text-gray-500" />
                <span className="font-semibold">Time:</span> {item.startTime} - {item.endTime}
              </div>
              
              <div className="mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" />
                <span className="font-semibold">Location:</span> {item.location}
              </div>

              {item.activities.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-semibold mb-1 flex items-center gap-2">
                    <FaRunning className="text-gray-500" />
                    Activities:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-6">
                    {item.activities.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-4 mb-3 items-center">
                {item.includesBreakfast && (
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <FaCoffee className="text-amber-600" />
                    Breakfast
                  </span>
                )}
                {item.includesLunch && (
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <FaUtensils className="text-blue-600" />
                    Lunch
                  </span>
                )}
                {item.includesDinner && (
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <FaHamburger className="text-purple-600" />
                    Dinner
                  </span>
                )}
              </div>

              {/* {item.notes && (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <FaStickyNote />
                    <span className="font-semibold">Notes:</span>
                  </div>
                  <p className="text-sm text-gray-700">{item.notes}</p>
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabTourPlan;