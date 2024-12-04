import { create } from "zustand";
import { fetchAnalisis, deleteAnalisis, updateAnalisis , createAnalisis} from "../service/analisisService";

const useAnalisisStore = create((set) => ({
  analisisList: [],
  fetchAnalisis: async (token) => {
    try {
      const response = await fetchAnalisis(token);
      set({ analisisList: response });
    } catch (error) {
      console.error("Error fetching analysis data: ", error);
    }
  },
  createAnalisis: async (analisis, token) => {
    await createAnalisis(analisis, token);
  },
  deleteAnalisis: async (id, token) => {
    try {
      await deleteAnalisis(id, token);
      set((state) => ({
        analisisList: state.analisisList.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting analysis: ", error);
    }
  },
  updateAnalisis: async (updatedAnalisis) => {
    try {
      await updateAnalisis(updatedAnalisis);
      set((state) => ({
        analisisList: state.analisisList.map((item) =>
          item.id === updatedAnalisis.id ? updatedAnalisis : item
        ),
      }));
    } catch (error) {
      console.error("Error updating analysis: ", error);
    }
  },
}));

export { useAnalisisStore };
