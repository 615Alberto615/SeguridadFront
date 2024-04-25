import axios from 'axios';

const API_BASE_URL = 'http://localhost:8004/api/v1/treatment';

export const fetchTreatmentsByUserId = async (userId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all/${userId}`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching treatments: ', error);
        throw error;
    }
};
export const createTreatment = async (treatmentData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, treatmentData, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating treatment: ', error);
        throw error;
    }
};