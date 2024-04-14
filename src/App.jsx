import './App.css'
import Home from './components/Home'
import Informacion from './components/Informacion'
import Navbar from './components/Navbar'
import About from './components/About'
import NavbarL from './components/logeado/NavbarL'
import Newsletter from './components/Newsletter'
import Fotter from './components/Fotter'
import { Routes, Route, useLocation } from 'react-router-dom';
import LogIn from './components/LogIn';
import Horarios from './components/logeado/Horarios';
import HomeDocente from "./components/HomeDocente.jsx";
import HorarioDocente from "./components/HorarioDocente.jsx";
import CitaDocente from "./components/CitaDocente.jsx";
import Docentes from "./components/Docentes.jsx";
import Help from "./components/Help.jsx";
import Paciente from "./components/Paciente.jsx";
import PerfilDocente from "./components/PerfilDocente.jsx";
import HistorialClinicoDocente from "./components/HistorialClinicoDocente.jsx";
import Datos from "./components/Datos.jsx";
function App() {
  const isLoggedIn = true;
  let location = useLocation(); // Esta es la ubicación actual en tu app.

  return (
    <>
      {/*{(isLoggedIn || location.pathname !== '/login') && (isLoggedIn ? <NavbarL /> : <Navbar />)}*/}
        <Navbar/>
      <Routes>
        <Route path="/" element={<><Home/><Informacion/><About/><Newsletter/><Fotter/></>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/homedocente" element={<><HomeDocente/><HorarioDocente/><CitaDocente/><Docentes/><Help/><Paciente/><PerfilDocente/><HistorialClinicoDocente/><Fotter/></>} />
        {/* Agrega aquí el resto de tus rutas */}
      </Routes>
    </>
  );
}

export default App;