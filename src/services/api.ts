import axios from 'axios';

export const API_BASE_URL = 'https://journeymate.runasp.net';

export interface SocialMediaLink {
  platform: string;
  url: string;
}

export interface PaymentMethod {
  type: string;
  provider: string;
}

export interface Rating {
  userId: string;
  companyId: number;
  rating: number;
  message: string;
}

export interface Travel {
  id: number;
  title: string;
  description: string;
  price: number;
  saleDiscount?: number;
  startDate: string;
  endDate: string;
  creationDate: string;
  availableSeats: number;
  departurePoint: string;
  departurePointLat: number;
  departurePointLng: number;
  destinationCity: string;
  destinationCityLat: number;
  destinationCityLng: number;
  transportationType: string;
  coverImageUrl: string;
  included: string;
  notIncluded: string;
  specialOffer?: string;
  amenities: string[];
  companyId: number;
  companyName: string;
  imageUrls: string[];
  itineraries: {
    dayNumber: number;
    activities: string[];
  }[];
}

export interface WorkingHour {
  dayOfWeek: string;
  workingTime: string;
}

export interface Company {
  id: number;
  userId: string;
  companyName: string;
  address: string;
  email: string;
  phoneNumber: string;
  description: string;
  website: string;
  slogan?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  establishedDate?: string;
  rating: number;
  socialMediaLinks: SocialMediaLink[];
  paymentMethods: PaymentMethod[];
  ratings: Rating[];
  travels: Travel[];
  workingHours: WorkingHour[];
  type?: string;
  verified?: boolean;
  destinations?: string[];
  specialties?: string[];
  latitude?: number | null;
  longitude?: number | null;
}

export interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export interface Post {
  id: number;
  userName: string;
  userProfile: string;
  time: string;
  text: string;
  image?: string;
}

export interface SimilarCompany {
  id: number;
  name: string;
  image: string;
  email: string;
}

export interface UpcomingTravel {
  id: number;
  location: string;
  image: string;
  date: string;
  daysLeft: number;
}

export const getCompanies = async (
  pageIndex: number = 1,
  pageSize: number = 5,
  sort?: string,
  rate?: number,
  search?: string,
  verifiedOnly?: boolean,
  address?: string
): Promise<{ items: Company[]; totalCount: number; totalPages: number }> => {
  try {
    const params = new URLSearchParams();
    params.append('PageIndex', pageIndex.toString());
    params.append('PageSize', pageSize.toString());
    
    if (sort) params.append('sort', sort);
    if (rate) params.append('rate', rate.toString());
    if (search) params.append('Search', search);
    if (verifiedOnly) params.append('verified', 'true');
    if (address && address !== 'All') params.append('address', address);

    const response = await axios.get<{
      items: Company[];
      totalCount: number;
      totalPages: number;
    }>(`${API_BASE_URL}/api/Company`, { params });

    return {
      items: response.data.items,
      totalCount: response.data.totalCount,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const getCompanyDetails = async (id: number): Promise<Company> => {
  try {
    const response = await axios.get<Company>(`${API_BASE_URL}/api/Company/${id}`);
    const companyData = response.data;
    
    const formattedCompany: Company = {
      ...companyData,
      phoneNumber: companyData.phoneNumber || '',
      profileImageUrl: companyData.profileImageUrl || 'https://via.placeholder.com/150',
      coverImageUrl: companyData.coverImageUrl || 'https://via.placeholder.com/1200x400',
      socialMediaLinks: companyData.socialMediaLinks || [],
      paymentMethods: companyData.paymentMethods || [],
      workingHours: companyData.workingHours || [],
      ratings: companyData.ratings || [],
      travels: companyData.travels || []
    };

    return formattedCompany;
  } catch (error) {
    console.error(`Error fetching company ${id} details:`, error);
    throw error;
  }
};

export const submitReview = async (
  companyId: number,
  review: { name: string; text: string; rating: number; avatar?: string }
): Promise<Review> => {
  try {
    const apiReview = {
      userId: 'current-user-id',
      companyId,
      rating: review.rating,
      message: review.text
    };

    const response = await axios.post<Rating>(
      `${API_BASE_URL}/api/Company/${companyId}/ratings`,
      apiReview
    );

    const formattedReview: Review = {
      id: parseInt(response.data.userId),
      name: review.name,
      role: 'Customer',
      image: review.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
      rating: response.data.rating,
      text: response.data.message,
      date: new Date().toISOString(),
      avatar: review.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'
    };

    return formattedReview;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

export const calculateDaysLeft = (dateString: string): number => {
  const today = new Date();
  const targetDate = new Date(dateString);
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatWorkingHours = (workingHours: WorkingHour[]): { day: string; hours: string }[] => {
  return workingHours.map(wh => ({
    day: wh.dayOfWeek,
    hours: wh.workingTime
  }));
};

export const getSimilarCompanies = async (companyId: number): Promise<SimilarCompany[]> => {
  try {
    return [
      {
        id: 1,
        name: 'شركة سياحية مشابهة',
        image: 'https://via.placeholder.com/150',
        email: 'similar@example.com'
      },
      {
        id: 2,
        name: 'شركة رحلات أخرى',
        image: 'https://via.placeholder.com/150',
        email: 'another@example.com'
      }
    ];
  } catch (error) {
    console.error('Error fetching similar companies:', error);
    return [];
  }
};

export const getCompanyPosts = async (companyId: number): Promise<Post[]> => {
  try {
    return [
      {
        id: 1,
        userName: 'مدير الشركة',
        userProfile: 'https://randomuser.me/api/portraits/lego/1.jpg',
        time: '2023-05-15T10:30:00',
        text: 'نعلن عن رحلات جديدة لهذا الموسم!',
        image: 'https://via.placeholder.com/600x400'
      }
    ];
  } catch (error) {
    console.error('Error fetching company posts:', error);
    return [];
  }
};