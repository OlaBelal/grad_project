import React from 'react';
import { saveInteraction } from '../services/localStorageService';
import {  calculateTotal } from '../services/calculationService';
import { UserInteraction } from '../interfaces/userInteraction';

const Events = () => {
  const events = [
    {
      id: 'event_1',
      name: 'Abu Simbel Sun Festival',
      date: 'February 22 & October 22',
      description: 'A remarkable event where the sun illuminates the inner sanctuary of the Abu Simbel temple.',
      travelTips: 'Book accommodations in advance. Arrive early to secure a good viewing spot.',
      image: 'https://example.com/abu-simbel.jpg',
    },
    {
      id: 'event_2',
      name: 'Cairo International Film Festival',
      date: 'November/December',
      description: 'One of the oldest and most prestigious film festivals in the Middle East.',
      travelTips: 'Check the festival schedule for screenings and events. Purchase tickets in advance.',
      image: 'https://example.com/cairo-film.jpg',
    },
    {
      id: 'event_3',
      name: 'Wafaa Al-Nil Festival',
      date: 'August',
      description: 'An ancient festival celebrating the Nile River, featuring cultural performances and traditional rituals.',
      travelTips: 'Experience local traditions and enjoy the festive atmosphere along the Nile.',
      image: 'https://example.com/wafaa-al-nil.jpg',
    },
    {
      id: 'event_4',
      name: 'Pharaonic Wedding Festival',
      date: 'Varies',
      description: 'A reenactment of an ancient Egyptian wedding, showcasing traditional costumes and ceremonies.',
      travelTips: 'Inquire about the festival dates and locations. Enjoy the vibrant cultural displays.',
      image: 'https://example.com/pharaonic-wedding.jpg',
    },
    {
      id: 'event_5',
      name: 'International Festival for Drums and Traditional Arts',
      date: 'April/May',
      description: 'A celebration of drumming and traditional arts from around the world, held in Cairo.',
      travelTips: 'Attend the diverse performances and workshops. Explore the cultural exchange.',
      image: 'https://example.com/drums-festival.jpg',
    },
  ];

  const handleEventClick = (eventId: string) => {
    // تسجيل تفاعل النقر على الحدث
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
    
    // يمكنك إضافة أي منطق إضافي هنا
    console.log(`Event ${eventId} clicked`);
  };

  const handleFavorite = (eventId: string) => {
    // هنا يمكنك تنفيذ منطق المفضلة إذا أردت
    console.log(`Event ${eventId} favorited`);
    
    // تسجيل تفاعل المفضلة
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Famous Events in Egypt</h1>
      <ul>
        {events.map((event) => (
          <li 
            key={event.id} 
            className="mb-6 p-4 border rounded-md hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleEventClick(event.id)}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(event.id);
                }}
                className="p-2 text-gray-400 hover:text-red-500"
                aria-label="Add to favorites"
              >
                ♡
              </button>
            </div>
            <img 
              src={event.image} 
              alt={event.name} 
              className="w-full h-48 object-cover mb-4 mt-2 rounded-md"
            />
            <p className="text-gray-600">{event.date}</p>
            <p className="mt-2">{event.description}</p>
            <p className="mt-2">
              <strong>Travel Tips:</strong> {event.travelTips}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
