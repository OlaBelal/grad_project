export interface UserInteraction {
  userId: string;
  id: string;
  type: 'event' | 'travel';
  checkout: number;
  favourite: boolean;
  booked: boolean;
  total: number;
}

export interface UserInteractionForAPI {
  id: string;
  userInteraction: {
    id: string;
    type: 'event' | 'travel';
    total: number;
  }[];
}