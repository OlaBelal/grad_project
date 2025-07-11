import React from 'react';
import { saveInteraction } from '../services/localStorageService';
import { calculateTotal } from '../services/calculationService';
import { UserInteraction } from '../interfaces/userInteraction';

const Events = () => {
  const events = [
    {
      id: 'event_1',
      name: 'Abu Simbel Sun Festival',
      date: 'February 22 & October 22',
      description: 'A remarkable event where the sun illuminates the inner sanctuary of the Abu Simbel temple.',
      travelTips: 'Book accommodations in advance. Arrive early to secure a good viewing spot.',
      image: 'https://kemetexperience.com/wp-content/uploads/2019/02/AsSoundLight-1024x683.jpg',
    },
    {
      id: 'event_2',
      name: 'Cairo International Film Festival',
      date: 'November/December',
      description: 'One of the oldest and most prestigious film festivals in the Middle East.',
      travelTips: 'Check the festival schedule for screenings and events. Purchase tickets in advance.',
      image: 'https://vitrina.ai/wp-content/uploads/2025/01/CIFF.jpg',
    },
    {
      id: 'event_3',
      name: 'Wafaa Al-Nil Festival',
      date: 'August',
      description: 'An ancient festival celebrating the Nile River, featuring cultural performances and traditional rituals.',
      travelTips: 'Experience local traditions and enjoy the festive atmosphere along the Nile.',
      image: 'https://pbs.twimg.com/media/CMY6eWFWEAAuBoh?format=jpg&name=4096x4096',
    },
    {
      id: 'event_4',
      name: 'Cairo Marathon',
      date: 'December',
      description: 'An exciting annual marathon that runs through historic Cairo landmarks, attracting runners from around the world.',
      travelTips: 'Register early to participate or cheer. Stay hydrated and enjoy the scenic route through the city’s iconic sites.',
      image: 'https://www.sportseventsegypt.com/wp-content/uploads/2022/06/running-race.jpg',
    },
    {
      id: 'event_5',
      name: 'International Festival for Drums and Traditional Arts',
      date: 'April/May',
      description: 'A celebration of drumming and traditional arts from around the world, held in Cairo.',
      travelTips: 'Attend the diverse performances and workshops. Explore the cultural exchange.',
      image: 'https://www.sis.gov.eg/Content/Upload/slider/5202328111923677.jpg',
    },
  ];

  const handleEventClick = (eventId: string) => {
    const interaction: UserInteraction = {
      id: eventId,
      type: 'event',
      checkout: 1,
      favourite: false,
      booked: false,
      total: 0
    };
    interaction.total = calculateTotal(interaction);
    saveInteraction(interaction);
    console.log(`Event ${eventId} clicked`);
  };

  const handleFavorite = (eventId: string) => {
    console.log(`Event ${eventId} favorited`);
    const interaction: UserInteraction = {
      id: eventId,
      type: 'event',
      checkout: 0,
      favourite: true,
      booked: false,
      total: 0
    };
    interaction.total = calculateTotal(interaction);
    saveInteraction(interaction);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-800">Famous Events in Egypt</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <li
            key={event.id}
            onClick={() => handleEventClick(event.id)}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer flex flex-col"
          >
            <div className="relative">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-72 object-cover rounded-t-xl"
                loading="lazy"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(event.id);
                }}
                aria-label="Add to favorites"
                className="absolute top-4 right-4 bg-white bg-opacity-75 rounded-full p-2 text-red-500 hover:text-red-600 shadow"
              >
                ♡
              </button>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold mb-1 text-indigo-700">{event.name}</h2>
              <p className="text-sm text-gray-500 mb-3">{event.date}</p>
              <p className="text-gray-700 flex-grow">{event.description}</p>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Travel Tips:</strong> {event.travelTips}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
