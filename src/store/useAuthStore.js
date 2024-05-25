// En store/useAuthStore.js
import { create } from 'zustand';
import { loginUser, registerUser,resetPassword,forgotPassword } from '../service/authService';
import axios from 'axios';
const useAuthStore = create((set) => ({
  user: null,
  token: null,
  userId: null,
  userRol: null,
  isLoggedIn: false,
  error: null,

  login: async (userData) => {
    try {
      const response = await loginUser(userData);
      console.log("API Response:", response); // Log the full response from the API
      if (response && response.code === 200) {
        set({
          token: response.data.token,
          userId: response.data.id,
          userRol: response.data.rol,
          isLoggedIn: true,
          error: null
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userRol', response.data.rol);
        localStorage.setItem('isLoggedIn', true);
        console.log("Login successful, user data stored.");
      } else {
        console.error("Login failed with response:", response); // Detailed log when login fails
        set({ error: response.message || "Login failed without error message." });
      }
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : "No response data available.");
      set({ error: error.response ? error.response.data.message : "Error in login request." });
    }
  },
  

  logout: () => {
    set({ user: null, token: null, userId: null, userRol: null, isLoggedIn: false, error: null });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRol');
    localStorage.removeItem('isLoggedIn');
  },

  register: async (userData) => {
    try {
      const response = await registerUser(userData);
      set({ user: response.data, error: null });
      return response;  // Asegúrate de devolver la respuesta aquí
    } catch (error) {
      set({ user: null, error: error.message || 'No se pudo registrar al usuario' });
      return { error: error.message || 'No se pudo registrar al usuario' };  // Devuelve un error adecuadamente
    }
  },
  fetchUserDetails: async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8004/api/v1/user/find/${userId}`, {
        headers: {
          'Authorization': token
        }
      });
      if (response.data && response.data.code === 200) {
        set({ user: response.data.data.people });
      } else {
        console.error('Failed to fetch user details', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user details', error);
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await forgotPassword(email);
      if (response.success) {
        alert('Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña.');
      }
      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;  // Throwing an error to handle it in the UI components.
    }
  },
  
  resetPassword: async (token, newPassword) => {
    try {
      const response = await resetPassword(token, newPassword);
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;  
    }
  },

 
}));

export default useAuthStore;
