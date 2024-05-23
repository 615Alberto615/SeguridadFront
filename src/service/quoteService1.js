// services/quoteService.js
import axios from 'axios';

const API_URL = 'http://localhost:8004/api/v1/quote';

export const getAllQuotes = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

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
export const deleteQuoteById = async (quotesId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${quotesId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
export const isAvailable = async (data, token) => {
    console.log('Sending request to check availability with data:', data); // Log del body de la solicitud
    try {
        const response = await axios.post(`${API_URL}/is-available`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('Received response for availability:', response); // Log de la respuesta completa
        return response.data;
    } catch (error) {
        console.error('Error response for availability:', error.response || error.message); // Log del error
        throw error.response ? error.response.data : error.message;
    }
};

export const addQuote = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/create`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error response for adding quote:', error.response.data);
        throw error.response ? error.response.data : error.message;
    }
};
export const getUserQuotesToday = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/today`, {
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
