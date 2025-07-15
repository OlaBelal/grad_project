import { UserInteraction } from '../interfaces/userInteraction';

const INTERACTIONS_KEY = 'userInteractions';

export const saveInteraction = (interaction: UserInteraction): void => {
  const existingInteractions = getInteractions();
  
  // Ensure the interaction has a total value
  const completeInteraction = {
    ...interaction,
    total: interaction.total || interaction.checkout || 0
  };

  const existingIndex = existingInteractions.findIndex(
    (existingInteraction) => 
      existingInteraction.userId === completeInteraction.userId && 
      existingInteraction.id === completeInteraction.id
  );
  
  if (existingIndex >= 0) {
    existingInteractions[existingIndex] = completeInteraction;
  } else {
    existingInteractions.push(completeInteraction);
  }
  
  localStorage.setItem(INTERACTIONS_KEY, JSON.stringify(existingInteractions));
};

export const getInteractions = (): UserInteraction[] => {
  const data = localStorage.getItem(INTERACTIONS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getInteractionById = (userId: string, id: string): UserInteraction | undefined => {
  const interactions = getInteractions();
  return interactions.find(
    (interaction) => interaction.userId === userId && interaction.id === id
  );
};

export const clearInteractions = (): void => {
  localStorage.removeItem(INTERACTIONS_KEY);
};

export const getUserInteractions = (userId: string): UserInteraction[] => {
  const interactions = getInteractions();
  return interactions.filter(
    (interaction) => interaction.userId === userId
  );
};

// Migration function for old data format
export const migrateOldInteractions = (): void => {
  const interactions = getInteractions();
  const needsMigration = interactions.some(i => !('total' in i));
  
  if (needsMigration) {
    const migrated = interactions.map(i => ({
      ...i,
      total: i.total || i.checkout || 0
    }));
    localStorage.setItem(INTERACTIONS_KEY, JSON.stringify(migrated));
  }
};