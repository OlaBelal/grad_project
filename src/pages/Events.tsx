import { useEffect, useState } from "react";
import { fetchEvents } from "../services/eventService";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { saveInteraction } from "../services/localStorageService";
import { authService } from "../services/authService";
import { UserInteraction } from "../interfaces/userInteraction";
import { calculateTotal } from "../services/calculationService";
import { useNavigate } from "react-router-dom"; // أضف هذا الاستيراد

interface EventData {
  id: number;
  name: string;
  date: string;
  description: string;
  travelTips: string;
  image: string;
}

const Events = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedEvents, setLikedEvents] = useState<number[]>([]);
  const baseImageUrl = "https://journeymate.runasp.net";
  const userId = authService.getUserIdFromToken() || 'anonymous';
  const navigate = useNavigate(); // استخدم useNavigate للتنقل

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

  const toggleLike = (eventId: number) => {
    const isCurrentlyLiked = likedEvents.includes(eventId);
    const newLikedStatus = !isCurrentlyLiked;

    setLikedEvents(prev => 
      newLikedStatus 
        ? [...prev, eventId]
        : prev.filter(id => id !== eventId)
    );

    const interaction: UserInteraction = {
      userId,
      id: eventId.toString(),
      type: "event",
      checkout: 0,
      favourite: newLikedStatus,
      booked: false,
      total: calculateTotal({
        userId,
        id: eventId.toString(),
        type: "event",
        checkout: 0,
        favourite: newLikedStatus,
        booked: false,
        total: 0
      })
    };

    saveInteraction(interaction);
  };

  const requireAuth = (action: () => void) => {
    if (!authService.isAuthenticated()) {
      if (window.confirm('You need to login first. Do you want to login now?')) {
        window.location.href = '/login';
      }
      return false;
    }
    action();
    return true;
  };

  const handleLikeClick = (eventId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    requireAuth(() => {
      toggleLike(eventId);
    });
  };

  const handleCardClick = (eventId: number) => {
    navigate(`/events/${eventId}`); // التنقل إلى صفحة الحدث المحدد
  };

  if (loading) return <p className="p-4">Loading events...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-6xl font-bold text-[#DF6951] mb-4 font-yesteryear text-center">
        Events That Shape Egypt
      </h1>
      <p className="text-lg text-gray-600 font-volkhov text-center mb-8">
        From ancient traditions to modern festivals, explore what makes Egypt come alive.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative cursor-pointer" // أضفت cursor-pointer هنا
            onClick={() => handleCardClick(event.id)} // أضفت حدث النقر هنا
          >
            <img
              src={
                event.image?.startsWith("http")
                  ? event.image
                  : `${baseImageUrl}${event.image}`
              }
              alt={event.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-event.jpg";
              }}
            />
            
            <button
              onClick={(e) => handleLikeClick(event.id, e)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label={likedEvents.includes(event.id) ? "Unlike" : "Like"}
            >
              {likedEvents.includes(event.id) ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-600 text-xl hover:text-red-500" />
              )}
            </button>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{event.name}</h2>
                <p className="text-gray-600 text-sm">{event.date}</p>
              </div>
              
              <p className="text-gray-700 mb-3 line-clamp-3">{event.description}</p>
              
              <div className="mt-4 pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-800">Travel Tips:</strong> {event.travelTips}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;