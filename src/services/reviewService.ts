// src/services/reviewService.ts
import { API_BASE_URL } from './apiConfig';

// تصدير الواجهة أولاً
export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userAvatar?: string;
  tourId?: number;
}

export const fetchTourReviews = async (tourId: number): Promise<Review[]> => {
  const response = await fetch(`${API_BASE_URL}/api/Reviews?tourId=${tourId}`);
  if (!response.ok) throw new Error('Failed to fetch reviews');
  return await response.json();
};

export const submitReview = async (review: Omit<Review, 'id'>): Promise<Review> => {
  const response = await fetch(`${API_BASE_URL}/api/Reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) throw new Error('Failed to submit review');
  return await response.json();
};