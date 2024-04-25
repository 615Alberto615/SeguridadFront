import { create } from 'zustand';
import {fetchPeopleByRole, fetchUserById} from '../service/userService';

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
    fetchCurrentUser: async (userId, token) => {
        const user = await fetchUserById(userId, token);
        console.log("User data:", user);
        set({ currentUser: user.data });
    },
    setPage: (page) => set({ page })
}));

export default usePeopleStore;
