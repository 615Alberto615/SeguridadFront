
import './App.css'
import Home from './components/Home'
import Informacion from './components/Informacion'
import Navbar from './components/Navbar'
import About from './components/About'
import NavbarL from './components/logeado/NavbarL'
import Newsletter from './components/Newsletter'
import Fotter from './components/Fotter'
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route

function App() {
  // Variable fija que simula que el usuario está logueado
  const isLoggedIn = false;

  return (
    <>
      {isLoggedIn ? <NavbarL/> : <Navbar/>}
      <Routes>
        <Route path="/" element={<><Home /><Informacion /><About /><Newsletter /><Fotter /></>} />
        {/* Agregar otras rutas aquí según sea necesario */}
      </Routes>
    </>
  );
}

export default App;