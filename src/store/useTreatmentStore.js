import { create } from 'zustand';
import { fetchTreatmentsByUserId, createTreatment } from '../service/treatmentService';

const useTreatmentStore = create((set, get) => ({  
    treatments: [],
    fetchTreatments: async (userId, token) => {
        const data = await fetchTreatmentsByUserId(userId, token);
        set({ treatments: data.data || [] });
    },
    addTreatment: async (treatmentData, token) => {
        const result = await createTreatment(treatmentData, token);
        if (result && result.code === 200) {
            set({ treatments: [...get().treatments, result.data] });
        }
        return result;
    }
}));

export default useTreatmentStore;
