//userStore
import { create } from 'zustand';
import { fetchPeopleByRole, fetchUserById, fetchAllUsers, changeUserRole,changeUserStatus } from '../service/userService';


const usePeopleStore = create((set, get) => ({
    people: [],
    page: 0,
    size: 3,
    totalPages: 0,
    currentUser: null,
    fetchUsers: async (roleId, token) => {
        try {
            // Aquí realizas la lógica para obtener los usuarios del backend
            const response = await fetch(`URL_DEL_BACKEND/users?roleId=${roleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            set({ people: data }); // Actualiza el estado con la lista de usuarios
        } catch (error) {
            console.error('Error fetching users: ', error);
        }
    },
    
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
    fetchAllUsers: async (token) => {
        try {
            const users = await fetchAllUsers(token);
            set({ people: users });
        } catch (error) {
            console.error('Error fetching all users: ', error);
        }
    },
    
    setPage: (page) => set({ page }),

    changeRole: async (userId, newRoleId, token) => {
        try {
            const result = await changeUserRole(userId, newRoleId, token);
            console.log('Role change result:', result);
            get().fetchAllUsers(token);  
        } catch (error) {
            console.error('Error changing user role: ', error);
        }
    },

    // Método para cambiar el estado de un usuario
    changeStatus: async (userId, newStatus, token) => {
        try {
            const result = await changeUserStatus(userId, newStatus, token);
            console.log('Status change result:', result);
            get().fetchAllUsers(token);  // Recargar todos los usuarios para reflejar cambios
        } catch (error) {
            console.error('Error changing user status: ', error);
        }
    },
    
}));

export { usePeopleStore };

