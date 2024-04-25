import axios from 'axios';

const API_BASE_URL = 'http://localhost:8004/api/v1/user';

export const fetchPeopleByRole = async (roleId, token, page = 0, size = 3) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/peopleByRole/${roleId}?getAll=true`, {
            headers: { Authorization: token },
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        // Manejar los errores de manera adecuada en tu aplicación
        console.error('Error fetching data: ', error);
        throw error;
    }
};
