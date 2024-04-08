
import './App.css'
import Home from './components/Home'
import Informacion from './components/Informacion'
import Navbar from './components/Navbar'
import About from './components/About'
import NavbarL from './components/logeado/NavbarL'
import Newsletter from './components/Newsletter'
import Fotter from './components/Fotter'
import { Routes, Route, useLocation } from 'react-router-dom';// Importa Routes y Route
import LogIn from './components/LogIn';
import Horarios from './components/logeado/Horarios';
function App() {
  const isLoggedIn = true;
  let location = useLocation(); // Esta es la ubicación actual en tu app.

  return (
    <>
      {(isLoggedIn || location.pathname !== '/login') && (isLoggedIn ? <NavbarL /> : <Navbar />)}
      <Routes>
        <Route path="/" element={<><Home/><Informacion/><About/><Newsletter/><Fotter/></>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/horarios" element={<Horarios />} />
        {/* Agrega aquí el resto de tus rutas */}
      </Routes>
    </>
  );
}

export default App;