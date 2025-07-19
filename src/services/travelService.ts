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
): Promise<any> => {
  try {
    const payload = {
      CompanyName: requestData.CompanyName || '',
      Owner: requestData.Owner || '',
      Email: requestData.Email || '',
      CommercialRegistrationNumber: requestData.CommercialRegistrationNumber || '',
      PhoneNumber: requestData.PhoneNumber || '',
      WebsiteUrl: requestData.WebsiteUrl || '',
      CompanyAddress: requestData.CompanyAddress || '',
      Description: requestData.Description || '',
      ContactPersonName: requestData.ContactPersonName || '',
      ContactPersonNumber: requestData.ContactPersonNumber || '',
      TypeofTrips: requestData.TypeofTrips || '',
      LicenseImageUrl: requestData.LicenseImageUrl || '',
      LogoUrl: requestData.LogoUrl || '',
      CoverImageUrl: requestData.CoverImageUrl || ''
    };

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

      const response = await fetch(`https://journeymate.runasp.net/api/TourismCompanyRequestApi`, {
      method: 'POST',
      body: formData
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Network response was not ok');
    }

    try {
      return await response.json();
    } catch {
      return { success: true };
    }
  } catch (error) {
    console.error('Submission error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to submit request');
  }


};export const fetchTours = async (): Promise<Tour[]> => {
  try {
    const allTours: Tour[] = [];
    let pageIndex = 1;
    const pageSize = 1000;
    let totalPages = 1;

    do {
      const url = `${API_BASE_URL}/api/Travel?PageSize=${pageSize}&PageIndex=${pageIndex}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      const items = data.items || [];

      allTours.push(...items);

      totalPages = data.totalPages || 1;
      pageIndex++;
    } while (pageIndex <= totalPages);

    return allTours.map((tour: any): Tour => ({
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
      destinationCity: tour.destinationCity || 'Unknown',
      destinationCityLat: tour.destinationCityLat,
      destinationCityLng: tour.destinationCityLng,
      transportationType: tour.transportationType || '',
      coverImageUrl: tour.coverImageUrl || '',
      amenities: Array.isArray(tour.amenities) ? tour.amenities : [],
      companyId: tour.companyId,
      companyName: tour.companyName || '',
      profileImageUrl: tour.profileImageUrl || '',
      companyProfileImageUrl: tour.companyProfileImageUrl || '',
      imageUrls: Array.isArray(tour.imageUrls) ? tour.imageUrls : [],
      image: tour.image || '',
      tags: Array.isArray(tour.tags) ? tour.tags : [],
      categoryId: tour.categoryId || null,
      rating: tour.rating,
      itineraries: Array.isArray(tour.itineraries)
        ? tour.itineraries.map((it: any) => ({
            title: it.title || '',
            dayNumber: it.dayNumber || 0,
            description: it.description || '',
            startTime: it.startTime || '08:00:00',
            endTime: it.endTime || '18:00:00',
            location: it.location || '',
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


export const fetchNewestTours = async (categoryId?: number): Promise<PaginatedToursResponse> => {
  try {
    const baseUrl = `${API_BASE_URL}/api/Travel?Sort=creationDate-desc&PageIndex=1&PageSize=100`;
    const url = categoryId ? `${baseUrl}&categoryId=${categoryId}` : baseUrl;

    const response = await fetch(url);

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

export const fetchDiscountedTours = async (categoryId?: number): Promise<Tour[]> => {
  try {
    const baseUrl = `${API_BASE_URL}/api/Travel/discounted`;
    const url = categoryId ? `${baseUrl}?categoryId=${categoryId}` : baseUrl;
    
    const response = await fetch(url);
    
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

export const fetchLeavingSoonTours = async (categoryId?: number): Promise<{ items: Tour[] }> => {
  try {
    const baseUrl = `${API_BASE_URL}/api/Travel/leaving-soon`;
    const url = categoryId ? `${baseUrl}?categoryId=${categoryId}` : baseUrl;
    
    const response = await fetch(url);
    
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