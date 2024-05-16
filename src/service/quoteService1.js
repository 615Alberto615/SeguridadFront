// services/quoteService.js
import axios from 'axios';

const API_URL = 'http://localhost:8004/api/v1/quote';

export const getQuoteById = async (quotesId, token) => {
    try {
        const response = await axios.get(`${API_URL}/user/${quotesId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Añade aquí más funciones según necesites operaciones CRUD
