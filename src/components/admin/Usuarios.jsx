import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { usePeopleStore } from '../../store/userStore';
import { useRoleStore } from '../../store/roleStore'; // Importa el store de roles

const Usuarios = () => {
    const { fetchAllUsers, people, changeRole, changeStatus } = usePeopleStore();
    const { roles, fetchRoles } = useRoleStore(); // Utiliza el store de roles

    const [showModifyPanel, setShowModifyPanel] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    // Encuentra el nombre del rol por ID
    const getRoleName = (roleId) => {
        const role = roles.find(role => role.rolId === roleId);
        return role ? role.rolType : 'Sin Rol';
    };

    const handleModifyClick = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.rolId);  // Guarda el rolId actual del usuario
        setShowModifyPanel(true);
    };

    const handleCancelClick = () => {
        setShowModifyPanel(false);
    };

    const handleConfirmClick = async () => {
        const token = localStorage.getItem('token');
        if (!selectedUser || !selectedRole) {
            console.error('Error: Usuario o rol no seleccionado');
            return;
        }
    
        try {
            await changeRole(selectedUser.userId, selectedRole, token);
            console.log('Usuario actualizado exitosamente');
            setShowModifyPanel(false);
        } catch (error) {
            console.error('Error al actualizar usuario: ', error);
            setShowModifyPanel(true);
        }
    };

    const handleStatusChange = async (user) => {
        const token = localStorage.getItem('token');
        try {
            await changeStatus(user.userId, !user.status, token);
            console.log('Estado del usuario cambiado exitosamente');
        } catch (error) {
            console.error('Error al cambiar estado del usuario: ', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchAllUsers(token);
        fetchRoles(token);  // Asegúrate de cargar los roles
    }, [fetchAllUsers, fetchRoles]);

    return (
        <div className="md:px-16 p-4 max-w-screen-2xl mx-auto mt-24" id='usuarios'>
            <motion.div variants={fadeIn('right',0.2)} initial='hidden' whileInView={'show'} className="mb-8">
                <h3 className="text-3xl text-primary font-bold mb-3">Gestión de Usuarios</h3>
                <p className="text-base text-tartiary">Administra los usuarios de la plataforma, consulta su información y realiza acciones como modificar o eliminar.</p>
            </motion.div>

            <ul className="divide-y divide-gray-200">
            <li className="py-4 grid grid-cols-12">
                    <span className="col-span-3 font-bold">Nombre</span>
                    <span className="col-span-3 font-bold">Email</span>
                    <span className="col-span-2 font-bold text-center">Estado</span>
                    <span className="col-span-2 font-bold text-center">Rol</span>
                    <span className="col-span-2 font-bold text-right">Acciones</span>
                </li>
                {people.map(usuario => (
                    <li key={usuario.userId} className="py-4 flex items-center justify-between">
                        <div className="grid grid-cols-12 w-full">
                            <span className="col-span-3">{usuario.people.name}</span>
                            <span className="col-span-3">{usuario.people.email}</span>
                            <span className={`col-span-2 text-center ${usuario.status ? 'text-green-500' : 'text-red-500'}`}>
                                {usuario.status ? 'Activo' : 'Inactivo'}
                            </span>
                            <span className="col-span-2 text-center">{getRoleName(usuario.rolId)}</span>
                            <div className="col-span-2 flex justify-end space-x-2">
                                <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => handleModifyClick(usuario)}>Modificar</button>
                                <button className="bg-secondary py-2 px-3 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => handleStatusChange(usuario)}>
                                    {usuario.status ? 'Eliminar' : 'Alta'}
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {showModifyPanel && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-2">Modificar Usuario</h2>
                        <label htmlFor="rol">Rol:</label>
                        <select id="rol" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="">Selecciona un rol</option>
                            {roles.map((role) => (
                                <option key={role.rolId} value={role.rolId}>
                                    {role.rolType}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end mt-2">
                            <button className="bg-primary text-white py-2 px-4 mr-2" onClick={handleConfirmClick}>Confirmar</button>
                            <button className="bg-gray-300 py-2 px-4" onClick={handleCancelClick}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Usuarios;
