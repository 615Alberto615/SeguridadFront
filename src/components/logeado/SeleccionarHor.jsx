import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { useNavigate } from 'react-router-dom';

const HorarioModal = ({ isOpen, onClose }) => {
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();  // Instancia para usar navigate

    // Función para obtener la fecha y hora actual en formato adecuado para min en input datetime-local
    const getFormattedDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;  // getMonth() es base 0
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        // Formato: YYYY-MM-DDThh:mm
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    };

    const handleConfirm = async () => {
        if (!selectedDateTime) {
            setMessage('Por favor, selecciona una fecha y hora antes de confirmar.');
            setMessageType('error');
            return;
        }
        
        if (new Date(selectedDateTime) < new Date()) {
            setMessage('No puedes seleccionar una fecha y/o hora pasada.');
            setMessageType('error');
            return; 
        }

        try {
            // Simula la llamada a la API
            setMessage('Solicitud realizada con éxito.');
            setMessageType('success');
            
            // Cerrar la modal y luego redirigir
            setTimeout(() => {
                onClose();  // Cierra la modal
                navigate('/formConsulta');  // Redirige a la ruta de confirmación
            }, 2000);  // Espera 2 segundos para cerrar la modal y redirigir
        } catch (error) {
            setMessage(`Error al solicitar: ${error.message}`);
            setMessageType('error');
        }
    };

    if (!isOpen) return null; // No renderiza nada si no está abierta

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <motion.div
                variants={fadeIn('up', 0.2)}
                initial='hidden'
                animate='show'
                exit='hidden'
                className="bg-white rounded-lg p-6 w-3/4 md:max-w-md mx-auto relative"
            >
                <h2 className="text-xl font-bold text-center">Selecciona un horario</h2>
                <div className="my-4">
                    <input
                        type="datetime-local"
                        className="form-input rounded border px-4 py-2 w-full"
                        value={selectedDateTime}
                        onChange={(e) => setSelectedDateTime(e.target.value)}
                        min={getFormattedDateTime()}  // Establece el valor mínimo para el input
                    />
                    <button
                        className="w-full mt-4 bg-primary text-white py-2 rounded"
                        onClick={handleConfirm}
                        disabled={!selectedDateTime}  // Deshabilita el botón si no se ha seleccionado una fecha y hora
                    >
                        Confirmar Horario
                    </button>
                </div>
                {message && (
                    <div className={`text-sm py-2 px-4 ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </div>
                )}
                <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
            </motion.div>
        </div>
    );
};

export default HorarioModal;
