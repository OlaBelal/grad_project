import axios from 'axios';
import { getAuthHeader } from './authService';
import { UserInteraction, UserInteractionForAPI } from '../interfaces/userInteraction';
import { getInteractions, clearInteractions } from './localStorageService';

const API_BASE_URL = 'https://journeymate.runasp.net/api';
const TRAVEL_API_URL = `${API_BASE_URL}/Travel`;

// Travel-related API functions
export const travelService = {
  likeTravel: (travelId: number) => {
    return axios.post(`${TRAVEL_API_URL}/like/${travelId}`, null, getAuthHeader());
  },

  unlikeTravel: (travelId: number) => {
    return axios.delete(`${TRAVEL_API_URL}/like/${travelId}`, getAuthHeader());
  },

  getFavoriteTravels: () => {
    return axios.get(`${TRAVEL_API_URL}/Favtravels`, getAuthHeader());
  }
};

// User interaction-related API functions
export const interactionService = {
  sendInteractionsToAPI: async (userId: string): Promise<boolean> => {
    const interactions = getInteractions();
    
    if (interactions.length === 0) {
      return false;
    }
    
    const data: UserInteractionForAPI = {
      id: userId,
      userInteraction: interactions.map((interaction: UserInteraction) => ({
        eventID: interaction.id,
        type: interaction.type,
        total: interaction.total
      }))
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/UserInteraction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        clearInteractions();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to send interactions:', error);
      return false;
    }
  }
};

// Combined API service object
export const apiService = {
  ...travelService,
  ...interactionService
};

// Individual named exports for direct importing
export const likeTravel = travelService.likeTravel;
export const unlikeTravel = travelService.unlikeTravel;
export const getFavoriteTravels = travelService.getFavoriteTravels;
export const sendInteractionsToAPI = interactionService.sendInteractionsToAPI;

// Default export (combined service)
export default apiService;