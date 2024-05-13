// store/useQuoteStore.js
import { create } from 'zustand';
import { getQuoteById } from '../service/quoteService1';
const useQuoteStore = create((set) => ({
    quotes: [],
    selectedQuote: null,
    error: null,

    fetchQuoteById: async (quotesId, token) => {
        try {
            const response = await getQuoteById(quotesId, token);
            console.log('API Response:', response);  // Verifica los datos de la API
            set(state => ({ ...state, quotes: response.data, selectedQuote: response.data[0], error: null }));
        } catch (error) {
            console.error('Error fetching quotes:', error);
            set(state => ({ ...state, error: error.message }));
        }
    },
}));

export default useQuoteStore;
