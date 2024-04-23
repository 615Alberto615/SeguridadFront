import { useState } from 'react';
import {
    FaBars,
    FaArrowLeft,
    FaHome,
    FaSignOutAlt,
    FaUsers
} from "react-icons/fa";
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {FaGauge, FaPerson} from "react-icons/fa6";

const SidebarAdm = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const togglerMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { link: "Inicio", path: "admin/home", icon: <FaHome /> },
        { link: "Usuarios", path: "usuarios", icon: <FaUsers /> },
        { link: "Graficos", path: "/graficos", icon: <FaGauge /> },
        { link: "Perfil", path: "/perfilAdmin", icon: <FaPerson /> },
        { link: "Cerrar sesión", path: "logout", icon: <FaSignOutAlt/> },
    ];

    return (
        <>
            {/* Botón para mostrar/ocultar sidebar */}
            <button
                onClick={togglerMenu}
                className='md:hidden fixed z-50 top-4 left-4 text-white focus:outline-none focus:text-gray-300'
            >
                {isMenuOpen ? <FaArrowLeft className='w-6 h-6 text-primary' /> : <FaBars className='w-6 h-6 text-primary' />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${isMenuOpen ? 'w-64' : 'w-16'}`}
            >
                <div className={`p-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-center">UCB Admin</h2>
                </div>
                <ul className="mt-6">
                    {navItems.map(({ link, path, icon }) => (
                        <li key={link} className="flex items-center px-4 py-2 hover:bg-gray-700">
                            <RouterLink
                                to={path}
                                className="flex items-center text-white hover:text-gray-300 transition duration-300"
                                onClick={togglerMenu}
                            >
                                {isMenuOpen ? icon : <span className="w-6 h-6 mr-2">{icon}</span>}
                                {isMenuOpen && <span className="ml-2">{link}</span>}
                            </RouterLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Ajuste de tamaño del contenido principal */}
            <div
                className={`ml-${isMenuOpen ? '64' : '16'} transition-all duration-300`}
            >
                {/* Contenido principal de tu página */}
                {/* ... */}
            </div>
        </>
    );
}

export default SidebarAdm;
