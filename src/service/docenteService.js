// service/docenteService.js
import axios from 'axios';

// Base URLs
const API_DOCENTES_BASE_URL = 'http://localhost:8004/api/v1/user/peopleByRole';
const API_QUOTES_BASE_URL = 'http://localhost:8004/api/v1/quote/by-therapist';

// Modifica la función para tomar roleId como parámetro
export const fetchAllDocentes = async (roleId) => {
  try {
    const token = localStorage.getItem('token');

    if (!roleId || !token) {
      throw new Error('Role ID or token is missing from localStorage.');
    }

    const response = await axios.get(`${API_DOCENTES_BASE_URL}/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      'Error fetching docentes:',
      error.response ? error.response.data : 'No response data',
      error
    );
    throw error;
  }
};


export const fetchAppointmentsByTherapist = async () => {
  try {
    // Retrieve user ID and token from localStorage
    const therapistId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!therapistId || !token) {
      throw new Error('Therapist ID or token is missing from localStorage.');
    }

    const response = await axios.get(`${API_QUOTES_BASE_URL}/${therapistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      'Error fetching appointments:',
      error.response ? error.response.data : 'No response data',
      error
    );
    throw error;
  }
};
