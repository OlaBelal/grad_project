import React, { createContext, useContext, useState, useEffect } from 'react';
import { likeTravel, unlikeTravel, getFavoriteTravels } from '../services/apiService';
import { Tour } from '../types';
import { authService } from '../services/authService';

interface FavoritesContextType {
  favorites: Tour[];
  toggleFavorite: (tour: Tour) => void;
  isFavorite: (id: number) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  loading: true,
});

export const FavoritesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [favorites, setFavorites] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await getFavoriteTravels();
      // Add type assertion or proper typing for the response data
      const favoriteTours = response.data as Tour[]; // or use proper type guard
      setFavorites(favoriteTours);
    } catch (err) {
      console.error('Error loading favorites', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (tour: Tour) => {
    if (!authService.isAuthenticated()) {
      alert('Please login to add favorites');
      return;
    }

    try {
      const isFav = favorites.some(fav => fav.id === tour.id);
      if (isFav) {
        await unlikeTravel(tour.id);
        setFavorites(prev => prev.filter(fav => fav.id !== tour.id));
      } else {
        await likeTravel(tour.id);
        setFavorites(prev => [...prev, tour]);
      }
    } catch (err) {
      console.error('Toggle favorite failed', err);
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);