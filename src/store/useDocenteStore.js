import { create } from 'zustand';
import { fetchAllDocentes } from '../service/docenteService'; // Importa correctamente fetchAllDocentes

const ITEMS_PER_PAGE = 3;

const useDocenteStore = create((set) => ({
  allDocentes: [],
  displayedDocentes: [],
  currentPage: 0,
  totalPages: 0,
  isLoading: false,
  error: null,

  fetchAllDocentes: async () => {
    set({ isLoading: true });
    const token = localStorage.getItem('token');
    if (!token) {
      set({ error: 'No autorizado o sesión expirada', isLoading: false });
      return;
    }

    try {
      // Pasa el roleID como argumento a la función
      const allDocentes = await fetchAllDocentes(3);  // Aquí pasamos el roleID 3 directamente
      set({
        allDocentes,
        displayedDocentes: allDocentes.slice(0, ITEMS_PER_PAGE),
        totalPages: Math.ceil(allDocentes.length / ITEMS_PER_PAGE),
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false, error: error.message || 'Error en la solicitud de la API' });
    }
  },

  setCurrentPage: (pageNumber) => {
    set((state) => {
      const newPage = Math.max(0, Math.min(pageNumber, state.totalPages - 1));
      const offset = newPage * ITEMS_PER_PAGE;
      return {
        currentPage: newPage,
        displayedDocentes: state.allDocentes.slice(offset, offset + ITEMS_PER_PAGE)
      };
    });
  }
}));



export default useDocenteStore;
