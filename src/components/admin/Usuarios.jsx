import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

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
