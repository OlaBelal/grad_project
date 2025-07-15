import axios from "axios";

interface EventData {
  id: number;
  name: string;
  date: string;
  description: string;
  travelTips: string;
  image: string;
}

export const fetchEventById = async (id: number): Promise<EventData> => {
  const response = await axios.get<EventData>(
    `https://journeymate.runasp.net/api/ApiEvents/events/${id}`
  );
  return response.data;
};

export const fetchEvents = async (): Promise<EventData[]> => {
  const response = await axios.get<EventData[]>(
    "https://journeymate.runasp.net/api/ApiEvents/events"
  );
  return response.data;
};