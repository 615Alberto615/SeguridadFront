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

      // Si el login es exitoso
      if (response && response.code === 200) {
        set({
          token: response.data.token,
          userId: response.data.id,
          userRol: response.data.rol,
          isLoggedIn: true,
          error: null,  // Limpiar cualquier error anterior
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userRol', response.data.rol);
        localStorage.setItem('isLoggedIn', true);
      } else {
        // En caso de que el servidor devuelva un código no exitoso (aunque normalmente los errores se capturan en el catch)
        set({
          error: response.message || 'Error en el inicio de sesión. Mensaje no disponible.',
        });
      }
    } catch (error) {
      // Aquí capturamos el mensaje de error lanzado desde el authService.js
      set({
        error: error.message,  // Guardamos el mensaje del error
      });
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
      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  resetPassword: async ({ token, newPassword }) => {
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
