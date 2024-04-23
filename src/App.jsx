
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
import ConsultasEst from './components/logeado/ConsultasEst.jsx'
import CitasEst from './components/logeado/CitasEst.jsx'
import Historial from './components/logeado/historial.jsx'
import SidebarAdm from "./components/admin/sidebarAdm.jsx";
import Usuarios from "./components/admin/Usuarios.jsx";
import Graficos from "./components/admin/Graficos.jsx";
import PerfilAdmin from "./components/admin/PerfilAdmin.jsx";


function App() {
  const [isLoggedIn, ] = useState(true); // Simula el estado de login
  const [userId, ] = useState(1); // Simula el ID del usuario logeado

  // Lógica para seleccionar la Navbar
  const renderNavbar = () => {
    if (!isLoggedIn) {
      return <Navbar />;
    } else if (isLoggedIn && userId === 1) {
      return <NavbarL />;
    } else if (isLoggedIn && userId === 2) {
      return <NavbarDoc />;
    } else if (isLoggedIn && userId === 3) {
      return <SidebarAdm />;
    }
  };

  // Envuelve las rutas en un contenedor que se ajusta según el usuario
  const renderRoutes = () => {
    const mainClass = userId === 3 ? "ml-7" : "ml-0"; // Ajusta el margen según el usuario
    return (
      <div className={mainClass}>
        <Routes>
          <Route path="/" element={<><Home/><Informacion/><About/><Newsletter/></>} />
          <Route path="/" element={<><Home/><Informacion/><About/><Newsletter/></>} />
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
        <Route path="/consultas" element={<><CitasEst/><ConsultasEst /> </>} />
        <Route path="/historial" element={<Historial/>} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/graficos" element={<Graficos />} />
        <Route path="/perfilAdmin" element={<PerfilAdmin />} />
        <Route path="/logout" element={<><Navbar /><Home/><Informacion/><About/><Newsletter/></>} />
        </Routes>
        <Fotter />
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
