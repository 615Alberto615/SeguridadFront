import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

import { useEffect } from 'react';
import { usePeopleStore } from '../../store/userStore'; 

const Usuarios = () => {
    const { fetchAllUsers, people, updateUser } = usePeopleStore();

    const [showModifyPanel, setShowModifyPanel] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [showDeletePanel, setShowDeletePanel] = useState(false);
    // Estado para almacenar el usuario seleccionado para eliminar
    const [selectedUser, setSelectedUser] = useState(null);

    const handleModifyClick = (user) => {
        setSelectedUser(user)
        setShowModifyPanel(true);
    };

    const handleCancelClick = () => {
        setShowModifyPanel(false);
    };

    const handleConfirmClick = async (user) => {
        // Aquí puedes enviar la solicitud para modificar el rol y estado del usuario
        setShowModifyPanel(false);
        setSelectedUser(user)
        try {
            // Llama a updateUser pasando los datos del usuario a actualizar y el token
            const token = localStorage.getItem('token');
            let isActive;

            if (selectedStatus === "Activo") {
                isActive = true;
            } else if (selectedStatus === "Inactivo") {
                isActive = false;
            }
            const userData = {
                userId: user.userId,
                role: selectedRole,
                status: isActive
            };
            await updateUser(userData, token);
            console.log('Usuario actualizado exitosamente');
            // Realiza cualquier otra acción necesaria después de la actualización
        } catch (error) {
            console.error('Error al actualizar usuario: ', error);
            // Maneja el error de manera adecuada en tu aplicación
        }
    };

    // Función para mostrar la pantalla de eliminación
    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowDeletePanel(true);
    };

    // Función para cancelar la eliminación
    const handleCancelDeleteClick = () => {
        setSelectedUser(null);
        setShowDeletePanel(false);
    };

    // Función para confirmar la eliminación
    const handleConfirmDelteClick = () => {
        // Aquí puedes enviar la solicitud para eliminar el usuario
        setShowDeletePanel(false);
    };

    const roles = ['admin', 'estudiante', 'psiquiatra', 'administrativo'];
    const estados = ['Activo', 'Inactivo']

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchAllUsers(token);
    }, [fetchAllUsers]);

    return (
        <div className="md:px-16 p-4 max-w-screen-2xl mx-auto mt-24" id='usuarios'>
            <motion.div
                variants={fadeIn('right',0.2)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.7}}
                className="mb-8">
                <h3 className="text-3xl text-primary font-bold mb-3">Gestión de Usuarios</h3>
                <p className="text-base text-tartiary">Administra los usuarios de la plataforma, consulta su información y realiza acciones como modificar o eliminar.</p>
            </motion.div>

            <ul className="divide-y divide-gray-200">
                <li className="py-4 flex items-center justify-between">
                    <div className="grid grid-cols-4 w-full">
                        <span className="font-semibold col-span-2">Nombre</span>
                        <span className="font-semibold col-span-2">Email</span>
                    </div>
                    <span className="font-semibold w-1/4 text-center">Estado</span>
                    <span className="font-semibold w-1/4 flex justify-end">Acciones</span>
                </li>
                {people.map(usuario => (
                    <li key={usuario.userId} className="py-4 flex items-center justify-between">
                        <div className="grid grid-cols-4 w-full">
                            <span className="col-span-2">{usuario.people.name}</span>
                            <span className="text-sm text-tartiary col-span-2">{usuario.people.email}</span>
                        </div>
                        <span className={`w-1/4 text-center ${usuario.status ? 'text-green-500' : 'text-red-500'}`}>
                            {usuario.status ? 'Activo' : 'Inactivo'}
                        </span>
                        <div className="w-1/4 flex justify-end space-x-2">
                            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => handleModifyClick(usuario)}>Modificar</button>
                            <button className="bg-secondary py-2 px-3 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => handleDeleteClick(usuario)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Aquí va la paginación */}
            {showModifyPanel && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-2">Modificar Usuario</h2>
                        <label htmlFor="rol">Rol:</label>
                        <select id="rol" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            {roles.map((role, index) => (
                                <option key={index} value={role}>{role}</option>
                            ))}
                        </select>
                        <label htmlFor="estado">Estado:</label>
                        <select id="estado" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            {estados.map((estado, index) => (
                                <option key={index} value={estado}>{estado}</option>
                            ))}
                        </select>
                        <div className="flex justify-end mt-2">
                            <button className="bg-primary text-white py-2 px-4 mr-2" onClick={handleConfirmClick}>Confirmar</button>
                            <button className="bg-gray-300 py-2 px-4" onClick={handleCancelClick}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Pantalla de eliminación */}
            {showDeletePanel && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-2">Eliminar Usuario</h2>
                        {selectedUser && (
                            <p className="mb-4">¿Está seguro de eliminar a {selectedUser.people.name}?</p>
                        )}
                        <div className="flex justify-end">
                            <button className="bg-primary text-white py-2 px-4 mr-2" onClick={handleConfirmDelteClick}>Confirmar</button>
                            <button className="bg-gray-300 py-2 px-4" onClick={handleCancelDeleteClick}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Usuarios;

/*
// Lista de usuarios
const usuariosList = [
    { id: 1, name: "Ana López", email: "ana@email.com", status: "Activo" },
    { id: 2, name: "Carlos Sánchez", email: "carlos@email.com", status: "Inactivo" },
    { id: 3, name: "Laura Fernández", email: "laura@email.com", status: "Activo" },
    { id: 4, name: "Pedro Martínez", email: "Pmartinez@email.com", status: "Activo" },
    { id: 5, name: "María Gómez", email: "Mgomez@email.com", status: "Inactivo" },
    { id: 6, name: "José Rodríguez", email: "JRodriguez@email.com", status: "Activo" },
    { id: 7, name: "Sofía Torres", email: "STorres@email.com", status: "Inactivo" },
    { id: 8, name: "Javier Pérez", email: "JPerez@email.com", status: "Activo" },
    { id: 9, name: "Fernanda Gutiérrez", email: "FGutierrez@email.com", status: "Inactivo" },
    { id: 10, name: "Roberto Morales", email: "RMorales@email.com", status: "Activo" },
    { id: 11, name: "Elena Ruiz", email: "ERuiz@email.com", status: "Inactivo" },
    // Agrega más usuarios aquí...
];

const ITEMS_PER_PAGE = 8;

const token = localStorage.getItem('token');

const Usuarios = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculamos el rango de usuarios a mostrar en la página actual
    const indexOfLastUsuario = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstUsuario = indexOfLastUsuario - ITEMS_PER_PAGE;
    const currentUsuarios = usuariosList.slice(indexOfFirstUsuario, indexOfLastUsuario);

    const totalPages = Math.ceil(usuariosList.length / ITEMS_PER_PAGE);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="md:px-16 p-4 max-w-screen-2xl mx-auto mt-24" id='usuarios'>
            <motion.div
                variants={fadeIn('right',0.2)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.7}}
                className="mb-8">
                <h3 className="text-3xl text-primary font-bold mb-3">Gestión de Usuarios</h3>
                <p className="text-base text-tartiary">Administra los usuarios de la plataforma, consulta su información y realiza acciones como modificar o eliminar.</p>
            </motion.div>

            <ul className="divide-y divide-gray-200">
                <li className="py-4 flex items-center justify-between">
                    <div className="grid grid-cols-4 w-full">
                        <span className="font-semibold col-span-2">Nombre</span>
                        <span className="font-semibold col-span-2">Email</span>
                    </div>
                    <span className="font-semibold w-1/4 text-center">Estado</span>
                    <span className="font-semibold w-1/4 flex justify-end">Acciones</span>
                </li>
                {currentUsuarios.map(usuario => (
                    <li key={usuario.id} className="py-4 flex items-center justify-between">
                        <div className="grid grid-cols-4 w-full">
                            <span className="col-span-2">{usuario.name}</span>
                            <span className="text-sm text-tartiary col-span-2">{usuario.email}</span>
                        </div>
                        <span className={`w-1/4 text-center ${usuario.status === "Activo" ? 'text-green-500' : 'text-red-500'}`}>
                            {usuario.status}
                        </span>
                        <div className="w-1/4 flex justify-end space-x-2">
                            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600">Modificar</button>
                            <button className="bg-secondary py-2 px-3 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-8 flex justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`mx-1 px-4 py-2 rounded ${currentPage === pageNumber ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Usuarios;
*/
