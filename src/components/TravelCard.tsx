import { Heart, ChevronRight, MapPin } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faChair,
  faBus,
} from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../services/apiConfig";

interface TravelCardProps {
  tour: any;
  isFavorite: (id: string) => boolean;
  handleFavorite: (tour: any) => void;
  handleSeeDetails: (tour: any) => void;
  handleBookNow: (tour: any) => void;
  renderStarRating: (rating: number) => JSX.Element;
}

export default function TravelCard({
  tour,
  isFavorite,
  handleFavorite,
  handleSeeDetails,
  handleBookNow,
  renderStarRating,
}: TravelCardProps) {
  return (
    <div
      key={tour.id}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="md:flex">
        <div className="md:w-1/3 h-40 md:h-40 relative">
          <img
            src={
              tour.coverImageUrl ||
              (tour.imageUrls?.length > 0
                ? tour.imageUrls[0].startsWith("http")
                  ? tour.imageUrls[0]
                  : `${API_BASE_URL}/${tour.imageUrls[0]}`
                : "https://via.placeholder.com/300x200")
            }
            alt={tour.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x200";
            }}
          />
          <button
            onClick={() => handleFavorite(tour)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label={
              isFavorite(tour.id) ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              size={20}
              className={
                isFavorite(tour.id)
                  ? "text-red-500 fill-current"
                  : "text-gray-400 hover:text-red-500"
              }
            />
          </button>
          <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-orange-500 shadow-sm">
            £{tour.price || 0}
          </div>
        </div>
        <div className="p-4 md:w-2/3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-orange-500">{tour.title}</h3>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
              £{tour.price?.toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="flex items-center mt-1 mb-2">
            {renderStarRating(tour.rating)}
            <span className="ml-2 text-sm text-gray-600">
              <MapPin size={14} className="inline mr-1" />
              {tour.destinationCity}
            </span>
          </div>
          <p className="text-gray-600 line-clamp-2 mb-4">{tour.description}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCalendarDay}
                className="text-orange-500 mr-2"
              />
              <span>
                {tour.startDate
                  ? new Date(tour.startDate).toLocaleDateString()
                  : "N/A"}{" "}
                -{" "}
                {tour.endDate
                  ? new Date(tour.endDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faChair}
                className="text-orange-500 mr-2"
              />
              <span>{tour.availableSeats} seats available</span>
            </div>
            {tour.transportationType && (
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faBus}
                  className="text-orange-500 mr-2"
                />
                <span>{tour.transportationType}</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handleSeeDetails(tour)}
              className="text-orange-500 hover:text-orange-600 font-medium flex items-center"
            >
              View Details <ChevronRight className="ml-1" size={16} />
            </button>
            <button
              onClick={() => handleBookNow(tour)}
              className={`${
                tour.availableSeats > 0
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-4 py-2 rounded-lg transition duration-300`}
              disabled={tour.availableSeats <= 0}
            >
              {tour.availableSeats > 0 ? "Book Now" : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
