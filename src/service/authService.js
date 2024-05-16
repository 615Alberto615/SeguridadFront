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

    if (data && data.token && data.id) {
      // Store token and id in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);

      console.log("Token and UserId stored in localStorage:", data.token, data.id);
      return response.data;
    } else {
      throw new Error('Token or user ID not provided or invalid response');
    }
  } catch (error) {
    console.error("Error during login:", error.response ? error.response.data : "No response data");
    throw error.response.data;
  }
};

