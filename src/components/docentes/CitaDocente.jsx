import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants.js';
import { fetchQuotesByTherapist } from '../../service/quoteService.js'; // Asegúrate de que la ruta sea correcta

const CitaDocente = () => {
    const [citas, setCitas] = useState([]);
    const [selectedCita, setSelectedCita] = useState(null);

    useEffect(() => {
        const therapistId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        fetchQuotesByTherapist(therapistId, token)
            .then(response => {
                if (response && response.data) {
                    setCitas(response.data);
                } else {
                    setCitas([]); // Asegúrate de que citas siempre sea un arreglo
                }
            })
            .catch(error => {
                console.error("Error fetching quotes:", error);
                setCitas([]); // Asegúrate de que citas siempre sea un arreglo
            });
    }, []);

    const tableStyle = {
        width: '80%',
        borderCollapse: 'collapse',
        marginTop: '50px',
        margin: 'auto',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    };

    const cellStyle = {
        border: '1px solid #dee2e6',
        padding: '15px',
        textAlign: 'center'
    };

    // Crear un objeto que tenga como claves las horas y como valores las citas para esas horas
    const citasPorHora = citas.reduce((acc, cita) => {
        const startTime = new Date(cita.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const day = new Date(cita.startTime).toLocaleDateString('es-ES', { weekday: 'long' });

        if (!acc[startTime]) {
            acc[startTime] = {};
        }
        acc[startTime][day] = cita;
        return acc;
    }, {});

    return (
        <motion.div
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.5 }}
            className="md:px-14 p-4 max-w-s mx-auto py-10"
            id='horarios'
            style={{ marginTop: '150px' }}
        >
            <div className="text-center" id='citas'>
                <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Tus citas</h2>
                <p className="text-tartiary md:w-1/3 mx-auto px-4">Aquí puedes ver tus citas.</p>
            </div>

            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={cellStyle}>Hora</th>
                    <th style={cellStyle}>Lunes</th>
                    <th style={cellStyle}>Martes</th>
                    <th style={cellStyle}>Miércoles</th>
                    <th style={cellStyle}>Jueves</th>
                    <th style={cellStyle}>Viernes</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(citasPorHora).map((hora, index) => (
                    <tr key={index}>
                        <td style={cellStyle}>{hora}</td>
                        {['lunes', 'martes', 'miércoles', 'jueves', 'viernes'].map((day, i) => (
                            <td
                                key={i}
                                style={cellStyle}
                                onClick={() => setSelectedCita(citasPorHora[hora][day])}
                            >
                                {citasPorHora[hora][day] ? 'CITA' : ''}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedCita && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded p-6 w-1/2 h-1/2 overflow-auto">
                        <h2 className="text-center text-2xl font-bold mb-4">Información de la cita</h2>
                        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded shadow-lg">
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Paciente:</span>
                                <span className="text-lg">{selectedCita.user.people.name}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Oficina:</span>
                                <span className="text-lg">{selectedCita.availability.codeAvailability}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Día:</span>
                                <span className="text-lg">{new Date(selectedCita.startTime).toLocaleDateString('es-ES', { weekday: 'long' })}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Hora:</span>
                                <span className="text-lg">{new Date(selectedCita.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(selectedCita.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Motivo:</span>
                                <span className="text-lg">{selectedCita.reason}</span>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => setSelectedCita(null)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default CitaDocente;
