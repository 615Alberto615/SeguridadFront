import create from 'zustand';
import { fetchPeopleByRole } from '../service/userService';

const usePeopleStore = create((set, get) => ({
    people: [],
    page: 0,
    size: 3,
    totalPages: 0,
    fetchPeople: async (roleId, token) => {
        const data = await fetchPeopleByRole(roleId, token, get().page, get().size);
        set({
            people: data.data,
            totalPages: Math.ceil(data.data.length / get().size)
        });
    },
    setPage: (page) => set({ page })
}));

export default usePeopleStore;
