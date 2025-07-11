// interfaces/userInteraction.ts
export interface UserInteraction {
  userId: string;
  id: string;
  type: 'event' | 'travel';
  checkout: number;
  favourite: boolean;
  like?: boolean;
  booked: boolean;
  total: number;
}

export interface UserInteractionForAPI {
  id: string;
  userInteraction: {
    eventID: string;
    type: 'event' | 'travel';
    total: number;
  }[];
}