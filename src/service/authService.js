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

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password?email=${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const resetPassword = async (token, newPassword) => {
  console.log("Sending data to server:", { token, newPassword }); // Log data being sent
  try {
    const response = await axios.post(`${API_URL}/reset-password`, JSON.stringify({ token, newPassword }), {
      headers: {
        'Content-Type': 'application/json' // Ensure headers are set for JSON
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error.response ? error.response.data : "No response data");
    throw error.response.data;
  }
};




