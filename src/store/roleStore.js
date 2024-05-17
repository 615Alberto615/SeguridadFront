// roleStore.js
import { create } from 'zustand';
import { fetchAllRoles } from '../service/rolService';

const useRoleStore = create((set) => ({
    roles: [],
    fetchRoles: async (token) => {
        try {
            const rolesData = await fetchAllRoles(token);
            set({ roles: rolesData.data });
        } catch (error) {
            console.error('Error fetching roles: ', error);
        }
    },
}));

export { useRoleStore };
