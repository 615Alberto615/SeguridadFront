// service/docenteService.js
import axios from 'axios';

const API_URL = 'http://localhost:8004/api/v1/user/peopleByRole/1';

export const fetchAllDocentes = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;  // Asegúrate de que esto corresponde al formato de tu respuesta
  } catch (error) {
    console.error("Error fetching docentes:", error.response ? error.response.data : "No response data", error);
    throw error;
  }
};
