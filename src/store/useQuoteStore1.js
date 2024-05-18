// store/useQuoteStore.js
import { create } from 'zustand';
import { getAllQuotes, getQuoteById } from '../service/quoteService1';  

const useQuoteStore = create((set) => ({
    quotes: [],
    selectedQuote: null,
    error: null,

    fetchAllQuotes: async (token) => {
        try {
            const response = await getAllQuotes(token);
            console.log('API Response:', response);
            set(state => ({ ...state, quotes: response.data, error: null }));
        } catch (error) {
            console.error('Error fetching quotes:', error);
            set(state => ({ ...state, error: error.message }));
        }
    },

    fetchQuoteById: async (quotesId, token) => {
        try {
            const response = await getQuoteById(quotesId, token);
            console.log('API Response:', response);  // Verifica los datos de la API
            set(state => ({ ...state, selectedQuote: response.data, error: null }));
        } catch (error) {
            console.error('Error fetching quote:', error);
            set(state => ({ ...state, error: error.message }));
        }
    },
}));

export default useQuoteStore;
