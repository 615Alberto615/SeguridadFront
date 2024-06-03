import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import user from "../../assets/user1.png";
import useAuthStore from '../../store/useAuthStore';
import { FaTimes, FaBars } from 'react-icons/fa';
 // Renombrado para evitar conflictos
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const { logout, user: currentUser, fetchUserDetails } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Obtener los detalles del usuario al montar el componente
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const togglerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.href = `/`; // O redireccionar a la página que consideres adecuada
  };

  const navItems = [
    { link: "Inicio", path: "/homedocente", type: "route" },
    { link: "Horarios", path: "/horariodocente", type: "route" },
    { link: "Citas", path: "/citadocente", type: "route" },
    { link: "Pacientes", path: "/paciente", type: "route" },
    { link: "Ayuda", path: "/help", type: "route" },
  ];

  const profileItems = [
    { link: "Perfil", path: "/perfildocente", type: "route" },
    { link: "Agendar una Cita", path: "/horariosDoc", type: "route" },
    { link: "Datos Estadisticos", path: "/datos", type: "route" },
    { link: "Historial clínico", path: "/historialdocente", type: "route" },
    { link: "Cerrar sesión", action: handleLogout },
  ];

  return (
    <>
      <nav className='bg-white md:px-14 p-4 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 right-0 left-0 z-10'>
        <div className='text-lg container mx-auto flex justify-between items-center font-medium'>
          <div className='flex space-x-14 items-center'>
            <RouterLink to="/" className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
              <img src={logo} alt="UCB Logo" className='w-10 inline-block items-center' />
              <span>UCB</span>
            </RouterLink>
            <ul className="md:flex space-x-12 hidden">
              {navItems.map(({ link, path }) => (
                <RouterLink to={path} key={link} className='block hover:text-gray-300 cursor-pointer'>{link}</RouterLink>
              ))}
            </ul>
          </div>
          <div className='hidden md:block relative'>
            <button onClick={toggleProfileMenu} className='flex items-center focus:outline-none'>
              {currentUser && <span className='text-primary font-semibold mr-3'>{`${currentUser.name} ${currentUser.firstLastname}`}</span>}
              <img src={user} alt="Docente" className="w-16 h-16 rounded-full" />
            </button>
            {isProfileMenuOpen && (
              <div className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20'>
                {profileItems.map(({ link, path, action }) => (
                  <div key={link} className='block px-4 py-2 text-sm text-primary hover:bg-gray-100'>
                    {action ? (
                      <button onClick={action} className='w-full text-left'>{link}</button>
                    ) : (
                      <RouterLink to={path} className='block w-full text-left'>{link}</RouterLink>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='md:hidden'>
            <button onClick={togglerMenu} className='text-primary focus:outline-none focus:text-gray-300'>
              {isMenuOpen ? <FaTimes className='w-6 h-6' /> : <FaBars className='w-6 h-6' />}
            </button>
          </div>
        </div>
      </nav>
      <div className={`bg-white fixed top-0 right-0 bottom-0 w-[60vw] p-8 border-l z-20 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={togglerMenu} className='text-primary mb-8'>
          <FaTimes className='w-8 h-8' />
        </button>
        {currentUser && (
          <div className='flex items-center mb-4'>
            <img src={user} alt="Docente" className="w-10 h-10 rounded-full mr-2" />
            <span className='text-primary'>{`${currentUser.name} ${currentUser.firstLastname}`}</span>
          </div>
        )}
        {navItems.map(({ link, path }) => (
          <RouterLink to={path} key={link} className='block hover:text-gray-300 text-primary mb-4' onClick={togglerMenu}>{link}</RouterLink>
        ))}
        <div>
          {profileItems.map(({ link, path, action }) => (
            <div key={link} className='block px-4 py-2 text-sm text-primary hover:bg-gray-100'>
              {action ? (
                <button onClick={action} className='w-full text-left'>{link}</button>
              ) : (
                <RouterLink to={path} className='block w-full text-left'>{link}</RouterLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
