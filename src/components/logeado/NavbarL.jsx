import { useState } from 'react';
import logo from '../../assets/logo.png';

//iconos
import { FaTimes, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const togglerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const navItems = [
    {link: "Home", path: "/home"},
    {link: "Servicios", path: "/servicios"},
    {link: "Información", path: "/informacion"},
  ];

  return (
    <>
      <nav className='bg-white md:px-14 p-4 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 right-0 left-0 z-10'>
        <div className='text-lg container mx-auto flex justify-between items-center font-medium'>
          <div className='flex space-x-14 items-center'>
            <a href="/" className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
              <img src={logo} alt="UCB Logo" className='w-10 inline-block items-center'/>
              <span>UCB</span>
            </a>

            <ul className="md:flex space-x-12 hidden">
              {
                navItems.map(({link, path}) => (
                  <a href={path} key={link} className='block hover:text-gray-300 cursor-pointer'>{link}</a>
                ))
              }
            </ul>
          </div>
          
          {/* Menu hamburguesa para dispositivos móviles */}
          <div className='md:hidden'>
            <button onClick={togglerMenu} className='text-primary focus:outline-none focus:text-gray-300'>
              {isMenuOpen ? <FaTimes  className='w-6 h-6'/> : <FaBars className='w-6 h-6'/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu desplegable para dispositivos móviles */}
      <div className={`bg-white fixed top-0 right-0 bottom-0 w-[60vw] p-8 border-l z-20 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={togglerMenu} className='text-primary mb-8'>
          <FaTimes  className='w-8 h-8'/>
        </button>
        {
          navItems.map(({link, path}) => (
            <a href={path} key={link} className='block hover:text-gray-300 text-primary mb-4' onClick={togglerMenu}>{link}</a>
          ))
        }
      </div>
    </>
  );
}

export default Navbar;
