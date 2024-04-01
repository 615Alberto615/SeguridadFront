
import './App.css'
import Home from './components/Home'
import Informacion from './components/Informacion'
import Navbar from './components/Navbar'
import About from './components/About'
import Princing from './components/Pricing'
import Newsletter from './components/Newsletter'
import Fotter from './components/Fotter'
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import Pacientes from './components/Pacientes'; 
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<><Home/><Informacion/><About/><Princing/><Newsletter/><Fotter/></>} />
        <Route path="/pacientes" element={<Pacientes />} />
        {/* Agrega aquí otras rutas según sea necesario */}
      </Routes>
    </>
  );
}

export default App;