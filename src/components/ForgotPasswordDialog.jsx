// ForgotPasswordDialog.js
import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';

const ForgotPasswordDialog = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const { forgotPassword } = useAuthStore();

    const handleSend = async () => {
      if (!email) {
        alert('Por favor, introduce un correo electrónico.');
        return;
      }
      
      // Simulamos el envío del correo sin esperar la respuesta
      forgotPassword(email);

      // Mensaje de enviado exitoso
      alert('Enviado exitoso. Verifica tu cuenta.');

      // Cerrar el diálogo inmediatamente después de mostrar el mensaje
      onClose();
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
          <h3 className="text-lg font-semibold text-center mb-4">Recuperar Contraseña</h3>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Introduce tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-around mt-4">
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
};

export default ForgotPasswordDialog;
