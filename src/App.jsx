
  import './App.css'
  import Home from './components/Home'
  import Informacion from './components/Informacion'
  import Navbar from './components/Navbar'
  import About from './components/About'
  import NavbarL from './components/logeado/NavbarL'
  import Newsletter from './components/Newsletter'
  import Fotter from './components/Fotter'
  import { Routes, Route,  } from 'react-router-dom';// Importa Routes y Route
  import LogIn from './components/LogIn';
  import Horarios from './components/logeado/Horarios';
  import ConsultaForm from './components/logeado/ConsultaForm';
  import  { useState } from 'react';

  import HomeDocente from "./components/docentes/HomeDocente.jsx";
  import HorarioDocente from "./components/docentes/HorarioDocente.jsx";
  import CitaDocente from "./components/docentes/CitaDocente.jsx";
  import Docentes from "./components/docentes/Docentes.jsx";
  import Help from "./components/Help.jsx";
  import Paciente from "./components/docentes/Paciente.jsx";
  import PerfilDocente from "./components/docentes/PerfilDocente.jsx";
  import HistorialClinicoDocente from "./components/docentes/HistorialClinicoDocente.jsx";
  import Datos from './components/docentes/Datos.jsx'
  import NavbarDoc from './components/docentes/navbarDoc.jsx'
  import Info from './components/logeado/Info.jsx'
  import SeleccionarHor from './components/logeado/SeleccionarHor.jsx'
  //import ConsultasEst from './components/logeado/ConsultasEst.jsx'
  import CitasEst from './components/logeado/CitasEst.jsx'
  import Historial from './components/logeado/historial.jsx'
  import SidebarAdm from "./components/admin/sidebarAdm.jsx";
  import Usuarios from "./components/admin/Usuarios.jsx";
  import Graficos from "./components/admin/Graficos.jsx";
  import PerfilAdmin from "./components/admin/PerfilAdmin.jsx";
  import Register from "./components/Register.jsx";
  
  import Consultas2 from './components/logeado/Consultas2.jsx'

  import PerfilEstudiante from "./components/logeado/perfilest.jsx";

  import {  useEffect } from 'react'; 


  function App() {
    
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userIdState, setUserIdState] = useState(localStorage.getItem('userId'));
    const [rol, setRol] = useState(localStorage.getItem('userRol'));
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    useEffect(() => {
        console.log("Rol actual:", rol);
        console.log("Token actual:", token);
        console.log("User ID actual:", userIdState);
        console.log("Is Logged In:", isLoggedIn);
    }, [rol, token, userIdState, isLoggedIn]);

    // Actualiza el estado si los valores en localStorage cambian, por ejemplo, en diferentes pestañas
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token'));
            setUserIdState(localStorage.getItem('userId'));
            setRol(localStorage.getItem('userRol'));
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const renderNavbar = () => {
        const path = location.pathname;
        if (path === '/login' || path === '/register') {
            return null;
        } else if (!isLoggedIn) {
            return <Navbar />;
        } else {
            switch (rol) {
                case '2':
                    return <NavbarL />;
                case '3':
                    return <NavbarDoc />;
                case '1':
                    return <SidebarAdm />;
                default:
                    return <Navbar />;
            }
        }
    };

    const renderRoutes = () => {
        const mainClass = rol === '1' ? "ml-7" : "ml-0";
        return (
        <div className={mainClass}>
          <Routes>
            <Route path="/" element={<><Home/><Informacion/><About/><Newsletter/><Fotter /></>} />        
            <Route path="/login" element={<LogIn />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/formConsulta" element={<ConsultaForm />} />
            <Route path="/homedocente" element={<><HomeDocente/><CitaDocente/><Docentes/><Help/></>} />
            <Route path="/horariodocente" element={<HorarioDocente />} />
            <Route path="/citadocente" element={<CitaDocente />} />
            <Route path="/docentes" element={<Docentes />} />
            <Route path="/help" element={<Help />} />
            <Route path="/paciente" element={<Paciente />} />
            <Route path="/perfildocente" element={<PerfilDocente />} />
            <Route path="/historialdocente" element={<HistorialClinicoDocente />} />
            <Route path="/datos" element={<Datos />} />
            <Route path="/infolog" element={<Info />} />
            <Route path="/seleccionarhor" element={<SeleccionarHor />} />
            <Route path="/consultas" element={<><CitasEst/><Consultas2 /> </>} />
            <Route path="/historial" element={<Historial/>} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/graficos" element={<Graficos />} />
            <Route path="/perfilAdmin" element={<PerfilAdmin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<><Navbar /><Home/><Informacion/><About/><Newsletter/><Fotter /></>} />
            <Route path="/perfil" element={<PerfilEstudiante />} />
            <Route path="*" element={<div>404</div>} />
            </Routes>
            
          </div>
      );
    };

    return (
      <>
        {renderNavbar()}
        {renderRoutes()}
      </>
    );
  }

  export default App;
