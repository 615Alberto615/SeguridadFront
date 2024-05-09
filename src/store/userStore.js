import { create } from 'zustand';
import {fetchPeopleByRole, fetchUserById, fetchAllUsers, updateUser  } from '../service/userService';

const usePeopleStore = create((set, get) => ({
    people: [],
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
    fetchAllUsers: async (token) => {
        try {
            const users = await fetchAllUsers(token);
            set({ people: users });
        } catch (error) {
            console.error('Error fetching all users: ', error);
        }
    },
    //Modificar el usuario por el Admin
    updateUser: async (userData, token) => {
        try {
            await updateUser(userData, token);
            console.log('Usuario actualizado exitosamente');
            // Realizar cualquier otra acción necesaria después de la actualización
        } catch (error) {
            console.error('Error al actualizar usuario: ', error);
            // Manejar el error de manera adecuada en tu aplicación
        }
    },
    setPage: (page) => set({ page }),
    
}));

export { usePeopleStore };

