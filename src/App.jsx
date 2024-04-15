
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

import HomeDocente from "./components/HomeDocente.jsx";
import HorarioDocente from "./components/HorarioDocente.jsx";
import CitaDocente from "./components/CitaDocente.jsx";
import Docentes from "./components/Docentes.jsx";
import Help from "./components/Help.jsx";
import Paciente from "./components/Paciente.jsx";
import PerfilDocente from "./components/PerfilDocente.jsx";
import HistorialClinicoDocente from "./components/HistorialClinicoDocente.jsx";
import Datos from './components/Datos.jsx'
import NavbarDoc from './components/docentes/navbarDoc.jsx'
import Info from './components/logeado/Info.jsx'
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
    }
  };

  return (
    <>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<><Home/><Informacion/><About/><Newsletter/><Fotter/></>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/formConsulta" element={<ConsultaForm />} />
        <Route path="/homedocente" element={<><HomeDocente/><HorarioDocente/><CitaDocente/><Docentes/><Help/><Paciente/><PerfilDocente/><HistorialClinicoDocente/><Datos/><Fotter/></>} />
        <Route path="/infolog" element={<Info />} />
        {/* Agrega aquí el resto de tus rutas */}
      </Routes>
    </>
  );
}

export default App;

