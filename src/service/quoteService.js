import axios from 'axios';

const API_BASE_URL = 'http://localhost:8004/api/v1/quote';

export const createQuote = async (quoteData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, quoteData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating quote: ', error);
        throw error;
    }
};
