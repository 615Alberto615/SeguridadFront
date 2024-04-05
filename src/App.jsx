
import './App.css'
import Home from './components/Home'
import Informacion from './components/Informacion'
import Navbar from './components/Navbar'
import About from './components/About'

import Newsletter from './components/Newsletter'
import Fotter from './components/Fotter'
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<><Home/><Informacion/><About/><Newsletter/><Fotter/></>} />
        
        {/* <Route path="/pacientes" element={<Pacientes />} /> */}
      </Routes>
    </>
  );
}

export default App;