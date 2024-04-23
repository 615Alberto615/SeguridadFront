import  { useState } from 'react';
import logo from '../../assets/logo.png'
import user from "../../assets/user1.png";

//iconos

import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { Link as ScrollLink } from 'react-scroll'; // Renombrado para evitar conflictos
import { Link as RouterLink } from 'react-router-dom'; 
 
const Navbar = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const togglerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const togglerProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }


  const navItems = [
    {link: "Home", path: "/homedocente", type: "route"},
    {link: "Horarios", path: "/horariodocente", type: "route"},
    {link: "Citas", path: "/citadocente", type: "route"},
    {link: "Pacientes", path: "/paciente", type: "route"},
    {link: "Ayuda", path: "/help", type: "route"},
  ];

  const profileItems = [
    {link: "Perfil", path: "/perfildocente",type: "route"},
    {link: "Colegas", path: "/docentes" ,type: "route"},
    {link: "Datos", path: "/datos", type: "route"},
    {link: "Historial clínico", path: "/historialdocente", type: "route"},
    {link: "Cerrar sesión", path: "logout"},
  ]
  return (
    <>
    <nav className='bg-white md:px-14 p-4 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 right-0 left-0'>
      <div className='text-lg container mx-auto flex justify-between items-center font-medium'>
        <div className='flex space-x-14 items-center'>
          <a href="/" className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
            <img src={logo} alt=""  className='w-10 inline-block items-center'/><span>UCB</span>
          </a>


          <ul className="md:flex space-x-12 hidden">
          {
            navItems.map(({link, path, type}) => type === "scroll" ? (
              <ScrollLink activeClass='active' spy={true} smooth={true} offset={-100} key={link} to={path} className='block hover:text-gray-300 cursor-pointer'>{link}</ScrollLink>
            ) : (
              // Solo para "Pacientes", usamos RouterLink para redirigir a otra página
              <RouterLink to={path} key={link} className='block hover:text-gray-300 cursor-pointer'>{link}</RouterLink>
            ))
          }
        </ul>
        </div>

        <div className='md:hidden'>
              <button onClick={togglerMenu} className='text-white  focus:outline-none
                focus:text-gray-300'>
                  {
                  
                    isMenuOpen? (<FaXmark  className='w-6 h-6 text-primary'/>):(<FaBars 
                      className='w-6 h-6 text-primary'/>)
                  }
              </button>
        </div>
        <div className='space-x-12 hidden md:flex items-center'>
          <div className='space-x-12 hidden md:flex items-center relative'>
            <button onClick={togglerProfileMenu} className='focus:outline-none profile-button'>
              <img src={user} alt="Docente" className="w-20 h-20 rounded-full" />
            </button>
            {isProfileMenuOpen && (
                <div className='absolute top-24 right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20'>
                  <ul className='list-none'>
                    {profileItems.map(({link, path}) => (
                        <li key={link}>
                          <RouterLink to={path} className='block hover:bg-gray-200 px-4 py-2'>{link}</RouterLink>
                        </li>
                    ))}
                  </ul>
                </div>
            )}
          </div>
        </div>

      </div>
    </nav>

    <div className={`space-y-4 px-4 pt-24 pb-5 bg-secondary text-xl ${isMenuOpen ? "block fixed top-0 right-0 left-0":"hidden"}`}>
      {
            navItems.map(({link, path}) => <ScrollLink activeClass='active' spy={true} smooth={true} offset={-80} key={link} to={path} className='block 
            hover:text-gray-300 text-white'
            onClick={togglerMenu}
            >{link}</ScrollLink>)
      }

    </div>

    </>

  );
}
export default Navbar;