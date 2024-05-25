// En store/useAuthStore.js
import { create } from 'zustand';
import { loginUser, registerUser,resetPassword } from '../service/authService';
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
      if (response.code === 200) {
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
      } else {
        set({ error: response.message });
      }
    } catch (error) {
      set({ error: error.message || 'Error en inicio de sesión' });
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
  resetPassword: async (passwordData) => {
    try {
      const response = await resetPassword(passwordData);
      if (response.code === 200) {
        set({ error: null });
        return response;
      } else {
        set({ error: response.message });
        return { error: response.message };
      }
    } catch (error) {
      set({ error: error.message || 'Error al cambiar la contraseña' });
      return { error: error.message || 'Error al cambiar la contraseña' };
    }
  }

 
}));

export default useAuthStore;
