import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { useNavigate } from 'react-router-dom';
import useTreatmentStore from '../../store/useTreatmentStore'; // Asegúrate de que esta ruta sea correcta

const HorarioModal = ({ isOpen, onClose,therapist }) => {
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();
    const { addTreatment } = useTreatmentStore();
    const token = localStorage.getItem('token'); // Asumimos que el token se guarda en localStorage

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

        const treatmentData = {
            treatmentId: null,
            name: "Treatment 1", // Asumimos que el nombre del tratamiento es estático
            startDate: selectedDateTime,
            status: true,
            userPatientId: localStorage.getItem('userId'), // Asumiendo que también almacenamos userId en localStorage
            userPsychiatristId: therapist.peopleId, // Este valor debe ser configurado según la lógica de tu aplicación
            
        };

        try {
            const result = await addTreatment(treatmentData, token);
            if (result.code === 200) {
                setMessage('Solicitud realizada con éxito.');
                setMessageType('success');
                localStorage.setItem('appointmentRequest', selectedDateTime),
                localStorage.setItem('availabilityId',therapist.peopleId ),
                setTimeout(() => {
                    onClose();
                    navigate('/formConsulta');
                }, 2000);
            } else {
                setMessage(`Error al solicitar: ${result.message}`);
                setMessageType('error');
            }
        } catch (error) {
            setMessage(`Error al solicitar: ${error.message}`);
            setMessageType('error');
        }
    };

    if (!isOpen) return null;

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
                        min={new Date().toISOString().slice(0, 16)} // Ajustado para usar formato ISO directamente
                    />
                    <button
                        className="w-full mt-4 bg-primary text-white py-2 rounded"
                        onClick={handleConfirm}
                        disabled={!selectedDateTime}
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
