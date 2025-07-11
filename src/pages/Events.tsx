import React, { useEffect, useState } from "react";
import { saveInteraction } from "../services/localStorageService";
import { calculateTotal } from "../services/calculationService";
import { UserInteraction } from "../interfaces/userInteraction";
import { fetchEvents } from "../services/eventService";

interface EventData {
  id: number;
  name: string;
  date: string;
  description: string;
  travelTips: string;
  image: string; // Use "image" as it matches backend field
}

const Events = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseImageUrl = "https://journeymate.runasp.net"; // If image path is relative

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleEventClick = (eventId: number) => {
    const interaction: UserInteraction = {
      id: eventId.toString(),
      type: "event",
      checkout: 1,
      favourite: false,
      booked: false,
      total: 0,
    };

    interaction.total = calculateTotal(interaction);
    saveInteraction(interaction);
    console.log(`Event ${eventId} clicked`);
  };

  const handleFavorite = (eventId: number) => {
    const interaction: UserInteraction = {
      id: eventId.toString(),
      type: "event",
      checkout: 0,
      favourite: true,
      booked: false,
      total: 0,
    };

    interaction.total = calculateTotal(interaction);
    saveInteraction(interaction);
    console.log(`Event ${eventId} favorited`);
  };

  if (loading) return <p className="p-4">Loading events...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

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
              src={
                event.image?.startsWith("http")
                  ? event.image
                  : `${baseImageUrl}${event.image}`
              }
              alt={event.name}
              className="w-full h-48 object-cover mb-4 mt-2 rounded-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-event.jpg";
              }}
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
