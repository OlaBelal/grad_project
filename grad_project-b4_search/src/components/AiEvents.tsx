import React, { useState, useEffect } from "react";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

interface Event {
  title: string;
  category: string | null;
  dates: string;
  date: string | null;
  location: string;
  link: string;
  image: string;
  map_Link: string | null;
  type: string | null;
}

const AIEvents = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = token ? authService.getUserIdFromToken() : null;

        if (!userId) {
          throw new Error("User not authenticated");
        }

        const response = await axios.get<Event[]>(
          `https://journeymate.runasp.net/api/Ai/recommend-events/${userId}`,
          {
            params: {
              numRecommendations: 5,
              numHighestInteractions: 2,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch recommended events");
        console.error("Error fetching recommended events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [events]);

  const handleNext = () => {
    if (isAnimating || events.length === 0) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating || events.length === 0) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + events.length) % events.length
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex || events.length === 0) return;
    setDirection(index > currentIndex ? 1 : -1);
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleViewDetails = (eventLink: string) => {
    window.open(eventLink, "_blank");
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recommended events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">{error}</h3>
            <p className="mt-2 text-gray-600">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No recommended events found
            </h3>
            <p className="mt-2 text-gray-600">
              Complete your profile to get personalized recommendations
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentEvent = events[currentIndex];

  // Extract date range from the dates string
  const formatEventDates = (datesString: string) => {
    const dateRange = datesString.split(" at ")[0];
    return dateRange || "Date not specified";
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI-Suggested Events for You
            </h2>
            <p className="text-gray-600">
              Personalized experiences based on your interests
            </p>
          </div>
          <div className="hidden md:block">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-600 rounded-full">
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              AI Powered
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-300 ease-out ${
              isAnimating
                ? `transform ${
                    direction > 0 ? "-translate-x-full" : "translate-x-full"
                  } opacity-0`
                : "transform translate-x-0 opacity-100"
            }`}
          >
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <img
                src={
                  currentEvent.image ||
                  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                }
                alt={currentEvent.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-out transform hover:scale-105"
              />
              {currentEvent.category && (
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full text-lg font-semibold text-purple-500">
                  {currentEvent.category}
                </div>
              )}
            </div>

            <div className="p-6 lg:p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {currentEvent.title}
              </h3>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="flex items-start text-gray-600">
                  <Calendar size={24} className="mr-3 text-purple-500 mt-1" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <span className="text-sm">
                      {formatEventDates(currentEvent.dates)}
                    </span>
                  </div>
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPin size={24} className="mr-3 text-purple-500 mt-1" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <span className="text-sm">
                      {currentEvent.location.split(",")[0]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-all duration-200 text-lg font-semibold transform hover:scale-[1.02]"
                  onClick={() => handleViewDetails(currentEvent.link)}
                >
                  View Event Details
                </button>
                {currentEvent.map_Link && (
                  <button
                    className="flex-1 bg-white border border-purple-500 text-purple-500 py-3 px-6 rounded-lg hover:bg-purple-50 transition-all duration-200 text-lg font-semibold transform hover:scale-[1.02]"
                    onClick={() =>
                      window.open(currentEvent.map_Link!, "_blank")
                    }
                  >
                    View on Map
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-3">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                disabled={isAnimating}
                className={`w-3 h-3 rounded-full transition-all duration-200 transform hover:scale-125 ${
                  index === currentIndex
                    ? "bg-purple-500 scale-125"
                    : "bg-gray-300 hover:bg-purple-300"
                } disabled:cursor-not-allowed`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIEvents;
