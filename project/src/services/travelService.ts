import { API_BASE_URL } from "./apiConfig";
import { Tour, Review } from "../types";

export const fetchTours = async (): Promise<Tour[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Travel`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    const toursData =
      responseData.items || responseData.data || responseData.tours || [];

    if (!Array.isArray(toursData)) {
      throw new Error("Invalid data format: Expected array");
    }

    return toursData.map(
      (tour: any): Tour => ({
        id: tour.id,
        title: tour.title || "Untitled Tour",
        description: tour.description || "",
        price: tour.price || 0,
        startDate: tour.startDate || "",
        endDate: tour.endDate || "",
        creationDate: tour.creationDate,
        availableSeats: tour.availableSeats || 0,
        departurePoint: tour.departurePoint || "",
        departurePointLat: tour.departurePointLat,
        departurePointLng: tour.departurePointLng,
        destinationCity: tour.destinationCity || "Unknown Destination",
        destinationCityLat: tour.destinationCityLat,
        destinationCityLng: tour.destinationCityLng,
        transportationType: tour.transportationType || "",
        amenities: Array.isArray(tour.amenities) ? tour.amenities : [],
        companyId: tour.companyId,
        companyName: tour.companyName || "Unknown Company",
        imageUrls: Array.isArray(tour.imageUrls) ? tour.imageUrls : [],
        itineraries: Array.isArray(tour.itineraries) ? tour.itineraries : [],
        rating: tour.rating,
      })
    );
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw new Error("Failed to fetch tours. Please try again later.");
  }
};

// Helper function to calculate duration
const calculateDuration = (startDate?: string, endDate?: string): string => {
  if (!startDate || !endDate) return "";
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  } catch {
    return "";
  }
};

export const fetchTourDetails = async (id: number): Promise<Tour> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Travel/${id}`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    return {
      id: data.id,
      title: data.title || "Untitled Tour",
      description: data.description || "",
      price: data.price || 0,
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      creationDate: data.creationDate,
      availableSeats: data.availableSeats || 0,
      departurePoint: data.departurePoint || "",
      departurePointLat: data.departurePointLat,
      departurePointLng: data.departurePointLng,
      destinationCity: data.destinationCity || "Unknown Destination",
      destinationCityLat: data.destinationCityLat,
      destinationCityLng: data.destinationCityLng,
      transportationType: data.transportationType || "",
      amenities: Array.isArray(data.amenities) ? data.amenities : [],
      companyId: data.companyId,
      companyName: data.companyName || "Unknown Company",
      imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls : [],
      itineraries: Array.isArray(data.itineraries) ? data.itineraries : [],
      rating: data.rating,
    };
  } catch (error) {
    console.error(`Error fetching tour details for id ${id}:`, error);
    throw error;
  }
};

/*
export const fetchTourReviews = async (tourId: number): Promise<Review[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Reviews?tourId=${tourId}`);
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const responseData = await response.json();

    const reviewsData = Array.isArray(responseData)
      ? responseData
      : responseData.data || responseData.items || responseData.reviews || [];

    return reviewsData.map((review: any): Review => ({
      id: review.id,
      userName: review.userName || 'Anonymous',
      rating: review.rating || 0,
      comment: review.comment || '',
      date: review.date || new Date().toISOString(),
      userAvatar: review.userAvatar,
      tourId: review.tourId || tourId
    }));
  } catch (error) {
    console.error(`Error fetching reviews for tour ${tourId}:`, error);
    throw error;
  }
};
*/

// بديل مبسط إذا كنت تريد دالة تعيد قائمة فارغة
export const fetchTourReviews = async (tourId: number): Promise<Review[]> => {
  return [];
};
