// chatService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8004/api/chat';

export const startChatSession = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/start`);
        return response.data;
    } catch (error) {
        console.error('Error starting chat session:', error);
        throw error;
    }
};

export const sendMessage = async (sessionId, message) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/send`, { sessionId, message });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const fetchChatHistory = async (sessionId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/history/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat history:', error);
        throw error;
    }
};
