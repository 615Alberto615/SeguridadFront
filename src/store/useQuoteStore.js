import { create } from 'zustand';
import { fetchQuotesByTherapist, createQuote } from '../service/quoteService';
import { getUserIdFromToken } from '../components/utils/jwtUtils';  // Asegúrate de que la ruta de importación es correcta

const useQuoteStore = create((set, ) => ({
  quotes: [],
  isLoading: false,
  error: null,

  // Función para obtener citas del terapeuta
  fetchQuotes: async () => {
    set({ isLoading: true });
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();  // Obtener el ID del usuario desde el token
    if (!token || !userId) {
      set({ error: 'No autorizado o sesión expirada', isLoading: false });
      return;
    }

    try {
      const data = await fetchQuotesByTherapist(userId, token);
      if (data.code === 200) {
        set({ quotes: data.data, isLoading: false });
      } else {
        set({ error: data.message, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false, error: error.message || 'Error al obtener citas' });
    }
  },

  // Función para agregar una nueva cita
  addQuote: async (quoteData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ error: 'No autorizado o sesión expirada' });
      return;
    }
    const result = await createQuote(quoteData, token);
    if (result && result.code === 200) {
      set((state) => ({ quotes: [...state.quotes, result.data] }));  // Agregar la nueva cita al estado
    }
    return result;
  }
}));

export default useQuoteStore;
