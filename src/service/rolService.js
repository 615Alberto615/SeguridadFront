// roleService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8004/api/v1/rol';

export const fetchAllRoles = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`, {
            headers: { Authorization: token },
        });
        console.log("Fetch all roles response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching all roles: ', error);
        throw error;
    }
};
