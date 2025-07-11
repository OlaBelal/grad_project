import { API_BASE_URL } from './apiConfig';
import { Tour, Review, Itinerary } from '../types';

interface PaginatedToursResponse {
  items: Tour[];
  totalCount: number;
  totalPages: number;
  fromItem: number;
  toItem: number;
}

interface Category {
  id: number;
  categoryName: string;
}

// Tourism company requests (GetInTouch)
export const FORM_API_BASE_URL = 'https://journymatedashboard.runasp.net';

export interface TourismCompanyRequest {
  CompanyName: string;
  Owner: string;
  Email: string;
  CommercialRegistrationNumber: string;
  PhoneNumber: string;
  WebsiteUrl?: string;
  CompanyAddress: string;
  Description: string;
  ContactPersonName: string;
  ContactPersonNumber: string;
  TypeofTrips: string;
  LicenseImageUrl: string;
  LogoUrl: string;
  CoverImageUrl: string;
  Status?: string;
  CreatedAt?: string;
}

export const submitTourismCompanyRequest = async (
  requestData: Omit<TourismCompanyRequest, 'Status' | 'CreatedAt'>
): Promise<Response> => {
  try {
    const response = await fetch(`${FORM_API_BASE_URL}/api/TourismCompanyRequestApi/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...requestData,
        Status: 'Pending',
        CreatedAt: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Network response was not ok';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error('Failed to parse error response', e);
      }
      throw new Error(errorMessage);
    }

    return response;
  } catch (error: unknown) {
    console.error('Error submitting company request:', error);
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to submit company request. Please try again later.');
    }
    throw new Error('Failed to submit company request. Please try again later.');
  }
};

export const fetchTours = async (categoryId?: number): Promise<Tour[]> => {
  try {
    const url = categoryId 
      ? `${API_BASE_URL}/api/Travel?categoryId=${categoryId}`
      : `${API_BASE_URL}/api/Travel`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseData = await response.json();
    
    let toursData: any[] = [];
    
    if (Array.isArray(responseData)) {
      toursData = responseData;
    } else if (responseData.items && Array.isArray(responseData.items)) {
      toursData = responseData.items;
    } else if (responseData.data && Array.isArray(responseData.data)) {
      toursData = responseData.data;
    } else {
      throw new Error('Invalid data format: Expected array');
    }

    return toursData.map((tour: any): Tour => ({
      id: tour.id,
      title: tour.title || 'Untitled Tour',
      description: tour.description || '',
      price: tour.price || 0,
      startDate: tour.startDate || '',
      endDate: tour.endDate || '',
      creationDate: tour.creationDate,
      availableSeats: tour.availableSeats || 0,
      departurePoint: tour.departurePoint || '',
      departurePointLat: tour.departurePointLat,
      departurePointLng: tour.departurePointLng,
      destinationCity: tour.destinationCity || 'Unknown Destination',
      destinationCityLat: tour.destinationCityLat,
      destinationCityLng: tour.destinationCityLng,
      transportationType: tour.transportationType || '',
      coverImageUrl: tour.coverImageUrl || '',
      amenities: Array.isArray(tour.amenities) ? tour.amenities : [],
      companyId: tour.companyId,
      companyName: tour.companyName || 'Unknown Company',
      profileImageUrl: tour.profileImageUrl || '',
      companyProfileImageUrl: tour.companyProfileImageUrl || '',
      imageUrls: Array.isArray(tour.imageUrls) ? tour.imageUrls : [],
      image: tour.image || '',
      tags: Array.isArray(tour.tags) ? tour.tags : [],
      categoryId: tour.categoryId || null,
      rating: tour.rating,
      itineraries: Array.isArray(tour.itineraries) 
        ? tour.itineraries.map((it: any): Itinerary => ({
            title: it.title || `Day ${it.dayNumber}`,
            dayNumber: it.dayNumber || 0,
            description: it.description || '',
            startTime: it.startTime || '08:00:00',
            endTime: it.endTime || '18:00:00',
            location: it.location || 'Unknown Location',
            activities: Array.isArray(it.activities) ? it.activities : [],
            includesBreakfast: it.includesBreakfast || false,
            includesLunch: it.includesLunch || false,
            includesDinner: it.includesDinner || false,
            notes: it.notes || ''
          }))
        : []
    }));
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw new Error('Failed to fetch tours. Please try again later.');
  }
};

export const fetchNewestTours = async (): Promise<PaginatedToursResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Travel?Sort=creationDate-desc&PageIndex=1&PageSize=100`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseData = await response.json();
    
    const toursData = responseData.items || responseData.data || responseData.tours || [];
    
    if (!Array.isArray(toursData)) {
      throw new Error('Invalid data format: Expected array');
    }

    return {
      items: toursData.map((tour: any): Tour => ({
        id: tour.id,
        title: tour.title || 'Untitled Tour',
        description: tour.description || '',
        price: tour.price || 0,
        startDate: tour.startDate || '',
        endDate: tour.endDate || '',
        creationDate: tour.creationDate,
        availableSeats: tour.availableSeats || 0,
        departurePoint: tour.departurePoint || '',
        departurePointLat: tour.departurePointLat,
        departurePointLng: tour.departurePointLng,
        destinationCity: tour.destinationCity || 'Unknown Destination',
        destinationCityLat: tour.destinationCityLat,
        destinationCityLng: tour.destinationCityLng,
        transportationType: tour.transportationType || '',
        coverImageUrl: tour.coverImageUrl || '',
        amenities: Array.isArray(tour.amenities) ? tour.amenities : [],
        companyId: tour.companyId,
        companyName: tour.companyName || 'Unknown Company',
        profileImageUrl: tour.profileImageUrl || '',
        companyProfileImageUrl: tour.companyProfileImageUrl || '',
        imageUrls: Array.isArray(tour.imageUrls) ? tour.imageUrls : [],
        image: tour.image || '',
        tags: Array.isArray(tour.tags) ? tour.tags : [],
        categoryId: tour.categoryId || null,
        rating: tour.rating,
        itineraries: Array.isArray(tour.itineraries)
          ? tour.itineraries.map((it: any): Itinerary => ({
              title: it.title || `Day ${it.dayNumber}`,
              dayNumber: it.dayNumber || 0,
              description: it.description || '',
              startTime: it.startTime || '08:00:00',
              endTime: it.endTime || '18:00:00',
              location: it.location || 'Unknown Location',
              activities: Array.isArray(it.activities) ? it.activities : [],
              includesBreakfast: it.includesBreakfast || false,
              includesLunch: it.includesLunch || false,
              includesDinner: it.includesDinner || false,
              notes: it.notes || ''
            }))
          : []
      })),
      totalCount: responseData.totalCount || toursData.length,
      totalPages: responseData.totalPages || 1,
      fromItem: responseData.fromItem || 0,
      toItem: responseData.toItem || toursData.length
    };
  } catch (error) {
    console.error('Error fetching newest tours:', error);
    throw new Error('Failed to fetch newest tours. Please try again later.');
  }
};

export const fetchDiscountedTours = async (): Promise<Tour[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Travel/discounted`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseData = await response.json();
    
    const toursData = responseData.items || responseData.data || responseData.tours || [];
    
    if (!Array.isArray(toursData)) {
      throw new Error('Invalid data format: Expected array');
    }

    return toursData.map((tour: any): Tour => ({
      id: tour.id,
      title: tour.title || 'Untitled Tour',
      description: tour.description || '',
      price: tour.price || 0,
      startDate: tour.startDate || '',
      endDate: tour.endDate || '',
      creationDate: tour.creationDate,
      availableSeats: tour.availableSeats || 0,
      departurePoint: tour.departurePoint || '',
      departurePointLat: tour.departurePointLat,
      departurePointLng: tour.departurePointLng,
      destinationCity: tour.destinationCity || 'Unknown Destination',
      destinationCityLat: tour.destinationCityLat,
      destinationCityLng: tour.destinationCityLng,
      transportationType: tour.transportationType || '',
      coverImageUrl: tour.coverImageUrl || '',
      amenities: Array.isArray(tour.amenities) ? tour.amenities : [],
      companyId: tour.companyId,
      companyName: tour.companyName || 'Unknown Company',
      profileImageUrl: tour.profileImageUrl || '',
      companyProfileImageUrl: tour.companyProfileImageUrl || '',
      imageUrls: Array.isArray(tour.imageUrls) ? tour.imageUrls : [],
      image: tour.image || '',
      tags: Array.isArray(tour.tags) ? tour.tags : [],
      categoryId: tour.categoryId || null,
      rating: tour.rating,
      itineraries: Array.isArray(tour.itineraries)
        ? tour.itineraries.map((it: any): Itinerary => ({
            title: it.title || `Day ${it.dayNumber}`,
            dayNumber: it.dayNumber || 0,
            description: it.description || '',
            startTime: it.startTime || '08:00:00',
            endTime: it.endTime || '18:00:00',
            location: it.location || 'Unknown Location',
            activities: Array.isArray(it.activities) ? it.activities : [],
            includesBreakfast: it.includesBreakfast || false,
            includesLunch: it.includesLunch || false,
            includesDinner: it.includesDinner || false,
            notes: it.notes || ''
          }))
        : []
    }));
  } catch (error) {
    console.error('Error fetching discounted tours:', error);
    throw new Error('Failed to fetch discounted tours. Please try again later.');
  }
};

export const fetchLeavingSoonTours = async (): Promise<{ items: Tour[] }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Travel/leaving-soon`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseData = await response.json();
    
    const toursData = responseData.items || responseData.data || responseData.tours || [];
    
    if (!Array.isArray(toursData)) {
      throw new Error('Invalid data format: Expected array');
    }

    return {
      items: toursData.map((tour: any): Tour => ({
        id: tour.id,
        title: tour.title || 'Untitled Tour',
        description: tour.description || '',
        price: tour.price || 0,
        startDate: tour.startDate || '',
        endDate: tour.endDate || '',
        creationDate: tour.creationDate,
        availableSeats: tour.availableSeats || 0,
        departurePoint: tour.departurePoint || '',
        departurePointLat: tour.departurePointLat,
        departurePointLng: tour.departurePointLng,
        destinationCity: tour.destinationCity || 'Unknown Destination',
        destinationCityLat: tour.destinationCityLat,
        destinationCityLng: tour.destinationCityLng,
        transportationType: tour.transportationType || '',
        coverImageUrl: tour.coverImageUrl || '',
        amenities: Array.isArray(tour.amenities) ? tour.amenities : [],
        companyId: tour.companyId,
        companyName: tour.companyName || 'Unknown Company',
        profileImageUrl: tour.profileImageUrl || '',
        companyProfileImageUrl: tour.companyProfileImageUrl || '',
        imageUrls: Array.isArray(tour.imageUrls) ? tour.imageUrls : [],
        image: tour.image || '',
        tags: Array.isArray(tour.tags) ? tour.tags : [],
        categoryId: tour.categoryId || null,
        rating: tour.rating,
        itineraries: Array.isArray(tour.itineraries)
          ? tour.itineraries.map((it: any): Itinerary => ({
              title: it.title || `Day ${it.dayNumber}`,
              dayNumber: it.dayNumber || 0,
              description: it.description || '',
              startTime: it.startTime || '08:00:00',
              endTime: it.endTime || '18:00:00',
              location: it.location || 'Unknown Location',
              activities: Array.isArray(it.activities) ? it.activities : [],
              includesBreakfast: it.includesBreakfast || false,
              includesLunch: it.includesLunch || false,
              includesDinner: it.includesDinner || false,
              notes: it.notes || ''
            }))
          : []
      }))
    };
  } catch (error) {
    console.error('Error fetching leaving soon tours:', error);
    throw new Error('Failed to fetch leaving soon tours. Please try again later.');
  }
};

export const fetchTourDetails = async (id: number): Promise<Tour> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Travel/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Tour details API response:', data);

    return {
      id: data.id,
      title: data.title || 'Untitled Tour',
      description: data.description || '',
      price: data.price || 0,
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      creationDate: data.creationDate,
      availableSeats: data.availableSeats || 0,
      departurePoint: data.departurePoint || '',
      departurePointLat: data.departurePointLat,
      departurePointLng: data.departurePointLng,
      destinationCity: data.destinationCity || 'Unknown Destination',
      destinationCityLat: data.destinationCityLat,
      destinationCityLng: data.destinationCityLng,
      transportationType: data.transportationType || '',
      coverImageUrl: data.coverImageUrl || '',
      amenities: Array.isArray(data.amenities) ? data.amenities : [],
      companyId: data.companyId,
      companyName: data.companyName || 'Unknown Company',
      profileImageUrl: data.profileImageUrl || '',
      companyProfileImageUrl: data.companyProfileImageUrl || '',
      imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls : [],
      image: data.image || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      categoryId: data.categoryId || null,
      rating: data.rating,
      itineraries: Array.isArray(data.itineraries)
        ? data.itineraries.map((it: any): Itinerary => ({
            title: it.title || `Day ${it.dayNumber}`,
            dayNumber: it.dayNumber || 0,
            description: it.description || '',
            startTime: it.startTime || '08:00:00',
            endTime: it.endTime || '18:00:00',
            location: it.location || 'Unknown Location',
            activities: Array.isArray(it.activities) ? it.activities : [],
            includesBreakfast: it.includesBreakfast || false,
            includesLunch: it.includesLunch || false,
            includesDinner: it.includesDinner || false,
            notes: it.notes || ''
          }))
        : []
    };
  } catch (error) {
    console.error(`Error fetching tour details for id ${id}:`, error);
    throw new Error('Failed to fetch tour details. Please try again later.');
  }
};

export const fetchTourReviews = async (tourId: number): Promise<Review[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Reviews?tourId=${tourId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseData = await response.json();

    const reviewsData = Array.isArray(responseData)
      ? responseData
      : responseData.data || responseData.items || responseData.reviews || [];

    return reviewsData.map((review: any): Review => ({
      id: review.id,
      name: review.name || review.userName || 'Anonymous',
      rating: review.rating || 0,
      comment: review.comment || '',
      date: review.date || new Date().toISOString(),
      avatar: review.avatar || review.userAvatar || ''
    }));
  } catch (error) {
    console.error(`Error fetching reviews for tour ${tourId}:`, error);
    return [];
  }
};

export const calculateTourDuration = (startDate?: string, endDate?: string): string => {
  if (!startDate || !endDate) return '';
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  } catch {
    return '';
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Category`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data)) {
      return data;
    } else if (data.items && Array.isArray(data.items)) {
      return data.items;
    } else if (data.data && Array.isArray(data.data)) {
      return data.data;
    } else {
      throw new Error('Invalid categories data format');
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
};