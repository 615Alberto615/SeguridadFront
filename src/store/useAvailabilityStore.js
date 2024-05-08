import { create } from 'zustand';
import {
    createAvailability,
    updateAvailability,
    getAllAvailabilities,
    getAvailabilitiesByUserId,
    getAvailabilityById,
    deleteAvailability, updateAvailabilityStatus,
} from '../service/availabilityService';

const useAvailabilityStore = create((set) => ({
    availabilities: [],
    selectedAvailability: null,
    error: null,


    createAvailability: async (availabilityData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await createAvailability(availabilityData, token);
            set((state) => ({ ...state, availabilities: [...state.availabilities, response.data], error: null }));
            return response;
        } catch (error) {
            set((state) => ({ ...state, error: error.message || 'Error creating availability' }));
        }
    },

    updateAvailability: async (updatedAvailability) => {
        try {
            const token = localStorage.getItem('token');
            const response = await updateAvailability(updatedAvailability.id, updatedAvailability, token);
            set((state) => ({ ...state, selectedAvailability: response.data, error: null }));
            return response;
        } catch (error) {
            set((state) => ({ ...state, error: error.message || 'Error updating availability' }));
        }
    },

    updateAvailabilityStatus: async (availabilityId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await updateAvailabilityStatus(availabilityId, newStatus, token);
            set((state) => ({ ...state, selectedAvailability: response.data, error: null }));
            return response;
        } catch (error) {
            set((state) => ({ ...state, error: error.message || 'Error updating availability status' }));
        }
    },



    fetchAllAvailabilities: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await getAllAvailabilities(token);
            set((state) => ({ ...state, availabilities: response.data, error: null }));
        } catch (error) {
            set((state) => ({ ...state, error: error.message || 'Error fetching availabilities' }));
        }
    },

    fetchAvailabilitiesByUserId: async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await getAvailabilitiesByUserId(userId, token);
            set((state) => ({ ...state, availabilities: response.data, error: null }));
        } catch (error) {
            set((state) => ({ ...state, error: error.message || 'Error fetching availabilities by user ID' }));
        }
    },

    fetchAvailabilityById: async (availabilityId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await getAvailabilityById(availabilityId, token);
            set((state) => ({ ...state, selectedAvailability: response.data, error: null }));
        } catch (error) {
            set((state) => ({ ...state, error: error.message || 'Error fetching availability by ID' }));
        }
    },

    deleteAvailability: async (availabilityId) => {
        try {
            const token = localStorage.getItem('token');
            await deleteAvailability(availabilityId, token);
            set((state) => ({ ...state, availabilities: state.availabilities.filter((availability) => availability.id !== availabilityId), error: null }));
        } catch (error) {
            set((state) => ({ ...state, error: error.message || 'Error deleting availability' }));
        }
    },
}));

export default useAvailabilityStore;
