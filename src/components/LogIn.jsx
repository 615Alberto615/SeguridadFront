import { useState } from 'react';
import ucb from '../assets/ucb.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Login = () => {
  const { login, error, isLoggedIn } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleLogin = async () => {
    setLocalError('');
    if (!username.trim() || !password) {
      setLocalError('Por favor, completa todos los campos para iniciar sesión.');
      return;
    }

    try {
      const result = await login({ userName: username, password: password });
      if (result && result.code === 200) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('userId', result.data.id);
        localStorage.setItem('userRol', result.data.rol);
        localStorage.setItem('isLoggedIn', true);
        console.log(result);

        // Forzar la recarga de la página completa para reiniciar la aplicación
        window.location.href = '/';
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      if (err.response && err.response.data) {
        setLocalError(err.response.data.message || "Error desconocido");
      } else {
        setLocalError("Error de conexión o configuración");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (isLoggedIn && !error) {
    console.log('User is logged in, redirecting to home page');
    window.location.href = '/';
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1 bg-gradient-to-r from-secondary to-pink text-white p-12 justify-center items-center">
        <motion.div
          variants={fadeIn('down', 0.6)}
          initial='hidden'
          whileInView='show'
          onClick={() => window.location.href = `/`}
          style={{ cursor: 'pointer' }}
        >
          <img src={ucb} alt="UCB Logo" className='h-30' />
        </motion.div>
      </div>
      <motion.div 
        variants={fadeIn('up', 0.6)}
        initial='hidden'
        whileInView='show'
        className="flex-1 bg-white flex justify-center items-center p-10"
      >
        <div className="w-full max-w-md">
          <h2 className="text-primary text-3xl font-bold mb-5 flex justify-center">Inicia Sesión</h2>
          <div className="space-y-4">
            {localError && (
              <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                {localError}
              </div>
            )}
            {error && (
              <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                Error en inicio de sesión: {error}
              </div>
            )}
            <input 
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            <button onClick={handleLogin}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-secondary text-sm font-medium text-white hover:bg-primary"
            >
              Iniciar Sesión
            </button>
            <div className="mt-4 text-center">
              <span className="text-gray-700">¿Olvidaste tu contraseña?</span>
              {' '}
              <Link to="/recuperar" className="text-indigo-600 hover:text-indigo-500 font-medium">Recuperala</Link>
            </div>
            <div className="mt-4 text-center">
              <span className="text-gray-700">¿Eres estudiante de la UCB y aún no tienes cuenta?</span>
              {' '}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">Regístrate</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
