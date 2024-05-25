import { useState } from 'react';
import ucb from '../assets/ucb.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ResetPassword = () => {
  const { resetPassword, error } = useAuthStore();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleResetPassword = async () => {
    setLocalError('');
    if (!newPassword || !confirmPassword) {
      setLocalError('Por favor, completa todos los campos para cambiar la contraseña.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const result = await resetPassword({ newPassword });
      if (result && result.code === 200) {
        alert('Contraseña cambiada exitosamente');
        window.location.href = '/';
      }
    } catch (err) {
      console.error("Error al cambiar la contraseña:", err);
      setLocalError(err.response?.data?.message || "Error desconocido");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleResetPassword();
    }
  };

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
          <h2 className="text-primary text-3xl font-bold mb-5 flex justify-center">Cambia tu Contraseña</h2>
          <div className="space-y-4">
            {localError && (
              <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                {localError}
              </div>
            )}
            {error && (
              <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                Error al cambiar la contraseña: {error}
              </div>
            )}
            <div className="relative">
              <input 
                type={showNewPassword ? "text" : "password"}
                placeholder="Nueva Contraseña"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showNewPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repetir Contraseña"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            <button onClick={handleResetPassword}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-secondary text-sm font-medium text-white hover:bg-primary"
            >
              Cambiar Contraseña
            </button>
            <div className="mt-4 text-center">
              <span className="text-gray-700">¿Recordaste tu contraseña?</span>
              {' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Inicia Sesión</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
