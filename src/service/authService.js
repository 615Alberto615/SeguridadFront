// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8004/api/v1/auth'; 
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    // Aquí puedes decidir lanzar el error o devolverlo directamente
    console.error("Error during login:", error.response ? error.response.data : "No response data");
    throw error.response.data; // Asegúrate de que este manejo de error es adecuado para tu front-end
  }
};
