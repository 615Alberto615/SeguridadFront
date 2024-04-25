import axios from 'axios';

const API_URL = 'http://localhost:8004/api/v1/quote/by-therapist';

export const fetchQuotesByTherapist = async (therapistId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${therapistId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
};
