import axios from "axios";

export const fetchEvents = async () => {
  const response = await axios.get(
    "https://journeymate.runasp.net/api/ApiEvents/events"
  );
  return response.data;
};
