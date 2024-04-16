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
  const togglerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  // const navItems = [
  //   {link: "Home", path: "home", type: "scroll"},
  //   {link: "Servicios", path: "servicios", type: "scroll"},
  //   {link: "Información", path: "informacion", type: "scroll"},
  // ]

  //CAMBIO PABLO: CAMBIAR TIPO DE USUARIO PARA EL NAVBAR

  const [userType, setUserType] = useState('paciente');
  const togglerUserType = () => {
    setUserType(userType === 'paciente' ? 'terapeuta' : 'paciente');
  }

  const navItems = userType === 'terapeuta' ? [
    {link: "Home", path: "/homedocente", type: "route"},
    {link: "Horarios", path: "horariodocente", type: "scroll"},
    {link: "Citas", path: "citas", type: "scroll"},
    {link: "Pacientes", path: "pacientes", type: "scroll"},
    {link: "Ayuda", path: "ayuda", type: "scroll"},
  ] : [
    {link: "Home", path: "/", type: "route"},
    {link: "Servicios", path: "servicios", type: "scroll"},
    {link: "Información", path: "informacion", type: "scroll"},
  ];

  const profileItems = [
    {link: "Perfil", path: "perfil"},
    {link: "Colegas", path: "colegas"},
    {link: "Datos", path: "datos"},
    {link: "Historial clínico", path: "historial"},
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

        {/*<div className='space-x-12 hidden md:flex items-center'>*/}
        {/*<button*/}
        {/*    onClick={() => navigate('/login')} // Usa navigate para cambiar la ruta*/}
        {/*    className="bg-secondary py-2 px-4 transition-all duration-300 rounded */}
        {/*    hover: text-white hover:bg-indigo-600"*/}
        {/*  >*/}
        {/*  Iniciar sesion</button>*/}
        
        {/*</div>*/}

        {/*BOTON PARA CAMBIAR DE TIPO DE USUARIO*/}


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
          <button onClick={togglerUserType} className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600">{userType === 'paciente' ? 'Cambiar a Terapeuta' : 'Cambiar a Paciente'}</button>
          <div className='relative flex items-center'>
            <img src={user} alt="Docente" className="w-20 h-20 rounded-full mx-auto mb-4" />
            <select className='ml-2 bg-white border rounded shadow-lg py-2 z-20'>
              {profileItems.map(({link, path}) => (
                  <option key={path} value={path}>{link}</option>
              ))}
            </select>
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