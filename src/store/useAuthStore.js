// En store/useAuthStore.js
import { create } from 'zustand';
import { loginUser, registerUser } from '../service/authService';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  userId: null,
  rol:null,
  isLoggedIn: false,
  error: null,

  login: async (userData) => {
    try {
      const response = await loginUser(userData);
      if (response.code === 200) {
        set({
          token: response.token,
          userId: response.id,
          rol: response.rol,
          isLoggedIn: true,
          error: null
        });
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('rol', response.rol);
      } else {
        set({ error: response.message });
      }
    } catch (error) {
      set({ error: error.message || 'Error en inicio de sesión' });
    }
  },

  register: async (userData) => {
    try {
      const response = await registerUser(userData);
      set({ user: response, error: null });
    } catch (error) {
      set({ user: null, error: error.message || 'No se pudo registrar al usuario' });
    }
  },

  logout: () => {
    set({ user: null, token: null, userId: null, isLoggedIn: false, error: null });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Redireccionar al login o a la página principal
  }
}));

export default useAuthStore;
