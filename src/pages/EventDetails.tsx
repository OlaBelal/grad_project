import { useEffect, useState } from "react";
import { fetchEventById } from "../services/eventService";
import { FaHeart, FaRegHeart, FaCalendarAlt, FaInfoCircle, FaMapMarkerAlt, FaArrowLeft, FaLink, FaExternalLinkAlt } from "react-icons/fa";
import { saveInteraction } from "../services/localStorageService";
import { authService } from "../services/authService";
import { UserInteraction } from "../interfaces/userInteraction";
import { calculateTotal } from "../services/calculationService";
import { useParams, useNavigate } from "react-router-dom";

interface EventData {
  id: number;
  name: string;
  category?: string | null;
  dates?: string;
  date?: string | null;
  location?: string;
  link?: string;
  image: string;
  map_Link?: string | null;
  type?: string | null;
  description?: string;
  travelTips?: string;
  title?: string; // Alternative to name
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const userId = authService.getUserIdFromToken() || 'anonymous';
  const baseImageUrl = "https://journeymate.runasp.net";

  useEffect(() => {
    const loadEvent = async () => {
      try {
        if (!id) {
          throw new Error("Event ID is missing");
        }
        const data = await fetchEventById(parseInt(id));
        console.log("API Response:", data); // Debugging
        setEvent(data);
      } catch (err) {
        console.error("Failed to load event:", err);
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const toggleLike = () => {
    if (!event) return;

    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

    const interaction: UserInteraction = {
      userId,
      id: event.id.toString(),
      type: "event",
      checkout: 0,
      favourite: newLikedStatus,
      booked: false,
      total: calculateTotal({
        userId,
        id: event.id.toString(),
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

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(() => {
      toggleLike();
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-blue-400 rounded-full mb-4"></div>
        <p className="text-xl text-white font-medium">Loading event details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center p-8 bg-gray-900 rounded-xl shadow-md">
        <p className="text-xl text-red-400 font-medium">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center p-8 bg-gray-900 rounded-xl shadow-md">
        <p className="text-xl text-gray-300 font-medium">Event not found</p>
        <button 
          onClick={() => navigate('/events')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaArrowLeft /> Browse Events
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Full Screen Image with Overlay */}
      <div className="relative h-screen w-full">
        <img
          src={
            event.image?.startsWith("http")
              ? event.image
              : `${baseImageUrl}${event.image}`
          }
          alt={event.title || event.name || "Event"}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-event.jpg";
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
        >
          <FaArrowLeft className="text-white text-xl" />
        </button>
        
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className="absolute top-6 right-6 z-10 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
          aria-label={liked ? "Unlike this event" : "Like this event"}
        >
          {liked ? (
            <FaHeart className="text-red-500 text-xl animate-pulse" />
          ) : (
            <FaRegHeart className="text-white text-xl hover:text-red-500 transition-colors" />
          )}
        </button>

        {/* Event Title and Basic Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pb-32 bg-gradient-to-t from-black via-black/90 to-transparent">
          <h1 className="text-5xl font-bold mb-4">{event.title || event.name}</h1>
          
          {/* Event Dates */}
          {(event.dates || event.date) && (
            <div className="flex items-center gap-3 text-white/90 text-xl mb-4">
              <FaCalendarAlt className="text-blue-400" />
              <span className="font-medium">{event.dates || event.date}</span>
            </div>
          )}
          
          {/* Event Location */}
          {event.location && (
            <div className="flex items-start gap-3 text-white/90 text-lg">
              <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Event Content */}
      <div className="relative z-10 bg-black px-6 sm:px-12 lg:px-24 py-16 -mt-20 rounded-t-3xl">
        {/* Event Category and Type */}
        <div className="flex flex-wrap gap-4 mb-8">
          {event.category && (
            <div className="bg-blue-900/30 text-blue-400 px-4 py-2 rounded-full text-sm">
              {event.category}
            </div>
          )}
          {event.type && (
            <div className="bg-purple-900/30 text-purple-400 px-4 py-2 rounded-full text-sm">
              {event.type}
            </div>
          )}
        </div>

        {/* Event Description */}
        {event.description && (
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              <FaInfoCircle className="text-blue-400" />
              About This Event
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {event.description}
            </p>
          </div>
        )}

        {/* Travel Tips Section */}
        {event.travelTips && (
          <div className="mb-16 bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-400" />
              Travel Tips
            </h2>
            <p className="text-gray-300 leading-relaxed">{event.travelTips}</p>
          </div>
        )}

        {/* Additional Information Section */}
        <div className="mb-16 pt-8 border-t border-gray-800">
          <h3 className="text-2xl font-medium mb-8">Event Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event ID */}
            <div className="bg-gray-900 p-6 rounded-xl">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Event ID</h4>
              <p className="text-white font-mono">{event.id}</p>
            </div>
            
            {/* External Link */}
            {event.link && (
              <div className="bg-gray-900 p-6 rounded-xl">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Official Link</h4>
                <a 
                  href={event.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                >
                  <FaLink />
                  <span>Visit Event Website</span>
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            )}
            
            {/* Map Link */}
            {event.map_Link && (
              <div className="bg-gray-900 p-6 rounded-xl">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Location Map</h4>
                <a 
                  href={event.map_Link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                >
                  <FaMapMarkerAlt />
                  <span>View on Map</span>
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleLikeClick}
            className={`px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors text-lg ${
              liked 
                ? 'bg-red-900/30 text-red-400 hover:bg-red-900/40 border border-red-800/50' 
                : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
            }`}
          >
            {liked ? (
              <>
                <FaHeart className="text-red-500" />
                <span>Liked</span>
              </>
            ) : (
              <>
                <FaRegHeart />
                <span>Like this Event</span>
              </>
            )}
          </button>
          
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex-1 text-lg font-medium text-center"
            >
              Get Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
