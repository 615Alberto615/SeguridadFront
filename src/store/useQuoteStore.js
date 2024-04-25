import { create } from 'zustand';
import { fetchQuotesByTherapist } from '../service/quoteService';
import { getUserIdFromToken } from '../components/utils/jwtUtils';

const useQuoteStore = create((set) => ({
  quotes: [],
  isLoading: false,
  error: null,

  fetchQuotes: async () => {
    set({ isLoading: true });
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken();
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
  }
}));

export default useQuoteStore;
