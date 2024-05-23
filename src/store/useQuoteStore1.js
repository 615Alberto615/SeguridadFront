// store/useQuoteStore.js
import { create } from 'zustand';
import { getAllQuotes, getQuoteById, deleteQuoteById } from '../service/quoteService1';  

const useQuoteStore = create((set) => ({
    quotes: [],
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

    fetchQuoteById: async (userId, token) => {
        try {
            const response = await getQuoteById(userId, token);
            console.log('API Response:', response);  // Verifica los datos de la API
            set(state => ({ ...state, quotes: response.data, error: null })); // Almacena en quotes
        } catch (error) {
            console.error('Error fetching quote:', error);
            set(state => ({ ...state, error: error.message }));
        }
    },
    deleteQuoteById: async (quotesId, token) => {
        try {
            const response = await deleteQuoteById(quotesId, token);
            console.log('API Response:', response);
            set(state => ({ 
                ...state, 
                quotes: state.quotes.filter(quote => quote.quotesId !== quotesId), 
                error: null 
            }));
        } catch (error) {
            console.error('Error deleting quote:', error);
            set(state => ({ ...state, error: error.message }));
        }
    },
}));

export default useQuoteStore;
