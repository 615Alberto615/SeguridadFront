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
    const { data } = response.data;
    if (data && data.token) {
      localStorage.setItem('token', data.token);  
      console.log("Token stored in localStorage:", data.token);  // Debugging: Mostrar el token almacenado
      return response.data;
    } else {
      throw new Error('Token not provided or invalid response');
    }
  } catch (error) {
    console.error("Error during login:", error.response ? error.response.data : "No response data");
    throw error.response.data;
  }
};
