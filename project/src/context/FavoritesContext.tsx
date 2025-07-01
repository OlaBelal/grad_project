import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tour } from '../types'; // استيراد واجهة Tour من الملف المشترك

interface FavoritesContextType {
  favorites: Tour[]; // تغيير من FavoriteTour[] إلى Tour[]
  toggleFavorite: (tour: Tour) => void; // تغيير المعامل إلى Tour
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [favorites, setFavorites] = useState<Tour[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (tour: Tour) => {
    setFavorites(prev => 
      prev.some(fav => fav.id === tour.id)
        ? prev.filter(fav => fav.id !== tour.id)
        : [...prev, tour]
    );
  };

  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
