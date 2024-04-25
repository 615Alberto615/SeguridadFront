import { create } from 'zustand';
import { createQuote } from '../service/quoteService';

const useQuoteStore = create((set, get) => ({
    quotes: [],
    addQuote: async (quoteData, token) => {
        const result = await createQuote(quoteData, token);
        if (result && result.code === 200) {
            set({ quotes: [...get().quotes, result.data] });  // Agregar la nueva cita al estado
        }
        return result;
    }
}));

export default useQuoteStore;
