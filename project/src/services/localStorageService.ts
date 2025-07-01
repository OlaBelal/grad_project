// services/localStorageService.ts
import { UserInteraction } from '../interfaces/userInteraction';

const INTERACTIONS_KEY = 'userInteractions';

export const saveInteraction = (interaction: UserInteraction): void => {
  const existingInteractions = getInteractions();
  
  const existingIndex = existingInteractions.findIndex(i => i.id === interaction.id);
  
  if (existingIndex >= 0) {
    existingInteractions[existingIndex] = interaction;
  } else {
    existingInteractions.push(interaction);
  }
  
  localStorage.setItem(INTERACTIONS_KEY, JSON.stringify(existingInteractions));
};

export const getInteractions = (): UserInteraction[] => {
  const data = localStorage.getItem(INTERACTIONS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getInteractionById = (id: string): UserInteraction | undefined => {
  const interactions = getInteractions();
  return interactions.find(i => i.id === id);
};

export const clearInteractions = (): void => {
  localStorage.removeItem(INTERACTIONS_KEY);
};
