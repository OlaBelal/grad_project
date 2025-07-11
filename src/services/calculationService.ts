// services/calculationService.ts
import { UserInteraction } from '../interfaces/userInteraction';

const WEIGHTS = {
  checkout: 1,
  favourite: 3,
  like: 2,
  booked: 5
};

export const calculateTotal = (interaction: UserInteraction): number => {
  let total = interaction.checkout * WEIGHTS.checkout;
  
  if (interaction.favourite) {
    total += WEIGHTS.favourite;
  }
  
  if (interaction.like) {
    total += WEIGHTS.like;
  }
  
  if (interaction.booked) {
    total += WEIGHTS.booked;
  }
  
  return parseFloat(total.toFixed(3));
};