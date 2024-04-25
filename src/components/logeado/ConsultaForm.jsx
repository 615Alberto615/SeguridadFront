import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useQuoteStore from '../../store/useQuoteStore';  // Importa el store correctamente

const ConsultaForm = () => {
    const [motivo, setMotivo] = useState('');
    const [inforel, setInforel] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [error, setError] = useState('');

    const { addQuote } = useQuoteStore();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const appointmentRequest=localStorage.getItem('appointmentRequest');
    const availabilityId=localStorage.getItem('availabilityId');
    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const formData = {
            quotesId: null,
            reason: motivo,
            typeQuotes: "Initial",
            status: 1,
            appointmentRequest: appointmentRequest,  
            appointmentStatusId: 1,
            availabilityId: availabilityId,  
            userId: userId
        };

        try {
            const result = await addQuote(formData, token);
            if (result && result.code === 200) {
                setShowSuccessMessage(true);
                setError('');
                setTimeout(() => {
                  setShowSuccessMessage(false);
                  setMotivo(''); // Resetea el campo motivo
                  setInforel(''); // Resetea el campo inforel
                  window.location.href = '/consultas';
              }, 3000);
               
            } else {
                setError(`Error al registrar la solicitud: ${result.message}`);
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
            setError('Ocurrió un error al registrar la solicitud.');
        }
    };

    return (
        <motion.div
            variants={fadeIn('up', 0.3)}
            initial='hidden'
            whileInView='show'
            className="container mx-auto mt-48"
        >
            <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto ">
                <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Registro solicitud de reserva</h2>
                {showSuccessMessage && (
                    <div className="text-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                        Solicitud registrada con éxito.
                    </div>
                )}
                {error && (
                    <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="motivo" className="block text-sm font-medium text-gray-700">Motivo de la consulta:</label>
                        <input
                            type="text"
                            id="motivo"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            className="mt-1 block w-full rounded-md border-black-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="inforel" className="block text-sm font-medium text-gray-700">Información Clínica Relevante:</label>
                        <input
                            type="text"
                            id="inforel"
                            value={inforel}
                            onChange={(e) => setInforel(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded hover:bg-primary transition-all duration-300"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default ConsultaForm;
