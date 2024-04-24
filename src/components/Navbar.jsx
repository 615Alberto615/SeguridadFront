import  { useState } from 'react';
import logo from '../assets/logo.png'

//iconos

import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { Link as ScrollLink } from 'react-scroll'; // Renombrado para evitar conflictos
import { Link as RouterLink } from 'react-router-dom'; 

const goToLogin = () => {
  window.location.href = `/login`;
};
const Navbar = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const togglerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const navItems = [
    {link: "Home", path: "home", type: "scroll"},
    {link: "Servicios", path: "servicios", type: "scroll"},
    {link: "Información", path: "informacion", type: "scroll"},
 

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

        <div className='space-x-12 hidden md:flex items-center'>
        <button
            onClick={() => goToLogin()} // Usa navigate para cambiar la ruta
            className="bg-secondary py-2 px-4 transition-all duration-300 rounded 
            hover: text-white hover:bg-indigo-600"
          >
          Iniciar sesion</button>
        
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