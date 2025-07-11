import {
  UserInteraction,
  UserInteractionForAPI,
} from "../interfaces/userInteraction";
import { getInteractions, clearInteractions } from "./localStorageService";

const API_ENDPOINT = "https://journeymate.runasp.net/api";

export const sendInteractionsToAPI = async (
  userId: string
): Promise<boolean> => {
  const interactions = getInteractions();

  if (interactions.length === 0) {
    return false;
  }

  const data: UserInteractionForAPI = {
    id: userId,
    userInteraction: interactions.map((i) => ({
      eventID: i.id,
      type: i.type,
      total: i.total,
    })),
  };

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // إذا نجح الإرسال، نمسح البيانات المحلية
      clearInteractions();
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to send interactions:", error);
    return false;
  }
};
