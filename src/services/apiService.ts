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
    console.log("Raw interactions from localStorage:", interactions);

    // Filter valid interactions that have required fields and matching userId
    const validInteractions = interactions
      .filter((interaction: UserInteraction) => {
        // Check if interaction has an id and belongs to the current user
        return interaction.id && interaction.userId === userId;
      })
      .map(interaction => ({
        id: interaction.id,
        type: interaction.type || 'travel',
        total: interaction.total || interaction.checkout || 0
      }));

    console.log("Valid interactions after filtering and transformation:", validInteractions);

    if (validInteractions.length === 0) {
      console.log("No valid interactions to send");
      return false;
    }

    // Build the payload according to Swagger specification
    const data: UserInteractionForAPI = {
      id: userId,
      userInteraction: validInteractions
    };

    console.log("Final data being sent to API:", JSON.stringify(data, null, 2));

    try {
      const response = await fetch(`${API_BASE_URL}/Ai/userinteractions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
      });

      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response body:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Interactions submitted successfully");
      clearInteractions();
      return true;
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