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
export const fetchUserById = async (userId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/find/${userId}`, {
            headers: { Authorization: token },
        });
        console.log("Fetch user response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by ID: ', error);
        throw error;
    }
};

export const fetchPeopleById = async (userId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/findPerson/${userId}`, {
            headers: { Authorization: token },
        });
        console.log("Fetch people response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching people by ID: ', error);
        throw error;
    }
};

export const fetchPatientsByRole = async (roleId, token, page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/peopleByRole/${roleId}`, {
            headers: { Authorization: token },
            params: { page, size }
        });
        return response.data.data; // Accede a la propiedad data del ResponseDTO
    } catch (error) {
        console.error('Error fetching patients by role: ', error);
        throw error;
    }
};

// Mostrar todos los usuarios para el admin
export const fetchAllUsers = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`, {
            headers: { Authorization: token },
        });
        console.log("Fetch all users response:", response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching all users: ', error);
        throw error;
    }
};

//Actualizar el usuario por el admin
export const updateUser = async (userData, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateUser`, userData, {
            headers: { Authorization: token },
        });
        console.log("Update user response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user by admin: ', error);
        throw error;
    }
};


export const changeUserRole = async (userId, newRoleId, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/changeRole/${userId}`, {
            rolId: newRoleId
        }, {
            headers: { Authorization: token },
        });
        console.log("Change role response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error changing user role: ', error);
        throw error;
    }
};

// Función para cambiar el estado de un usuario
export const changeUserStatus = async (userId, newStatus, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/changeStatus/${userId}`, {
            status: newStatus
        }, {
            headers: { Authorization: token },
        });
        console.log("Change status response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error changing user status: ', error);
        throw error;
    }
};
