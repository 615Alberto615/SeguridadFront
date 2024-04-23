import { useState } from 'react';
import ucb from '../assets/ucb.png';
import { motion } from 'framer-motion'; 
import { fadeIn } from '../variants';
import { useNavigate } from 'react-router-dom';
// import googleIcon from '../assets/google-icon.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleRegister = () => {
    console.log("Registrar nuevo usuario");
  };

  const handleLogin = async () => {
    
    try {
      const response = await fetch('http://localhost:8004/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: username, password: password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.data); // Guarda el token en localStorage
        navigate('/'); // Redirige a la página de inicio
      } else {
        throw new Error(data.message || "Error de autenticación");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1 bg-gradient-to-r from-secondary to-pink text-white p-12 justify-center items-center">
        <motion.div
        variants={fadeIn('down',0.6)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false,amount:0.7}}
        >
          <img src={ucb} alt="" className='flex-auto justify-center h-40'/>
        </motion.div>
      </div>
      <motion.div 
      variants={fadeIn('up',0.6)}
      initial='hidden'
      whileInView={'show'}
      viewport={{once:false,amount:0.7}}
      className="flex-1 bg-white flex justify-center items-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-primary text-3xl font-bold mb-5 flex justify-center">Inicia Sesión</h2>
          
          <div className="space-y-4">
            <input 
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Sign in
            </button>
            <button onClick={handleRegister}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Registrarse
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
