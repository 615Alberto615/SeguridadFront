import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants.js';
import { fetchQuotesByTherapist } from '../../service/quoteService.js';
import { AiOutlineClose } from 'react-icons/ai';
import { FaUserAlt, FaRegClock, FaMapMarkerAlt, FaInfoCircle, FaClipboardList } from 'react-icons/fa';

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
                    setCitas([]);
                }
            })
            .catch(error => {
                console.error("Error fetching quotes:", error);
                setCitas([]);
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
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#333'
    };

    const headerStyle = {
        ...cellStyle,
        backgroundColor: '#04182c', // Primary color
        color: '#fff',
        fontWeight: 'bold'
    };

    const citasPendientes = citas.filter(cita => cita.status);

    const citasPorHora = citasPendientes.reduce((acc, cita) => {
        const startTime = cita.availability.startTime;
        const endTime = cita.availability.endTime;
        const hour = `${startTime} - ${endTime}`;
        const day = cita.availability.weekday.toLowerCase();

        if (!acc[hour]) {
            acc[hour] = {};
        }
        acc[hour][day] = cita;
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
                <p className="text-secondary md:w-1/3 mx-auto px-4">Aquí puedes ver tus citas.</p>
            </div>

            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={headerStyle}>Hora</th>
                    <th style={headerStyle}>Lunes</th>
                    <th style={headerStyle}>Martes</th>
                    <th style={headerStyle}>Miércoles</th>
                    <th style={headerStyle}>Jueves</th>
                    <th style={headerStyle}>Viernes</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(citasPorHora).map((hora, index) => (
                    <tr key={index}>
                        <td style={cellStyle}>{hora}</td>
                        {['lunes', 'martes', 'miércoles', 'jueves', 'viernes'].map((day, i) => (
                            <td
                                key={i}
                                style={{
                                    ...cellStyle,
                                    backgroundColor: citasPorHora[hora][day] ? '#e09be0' : '#fff', // Secondary color
                                    cursor: citasPorHora[hora][day] ? 'pointer' : 'default'
                                }}
                                onClick={() => setSelectedCita(citasPorHora[hora][day])}
                                className={citasPorHora[hora][day] ? "hover:bg-blue-200 transition-colors" : ""}
                            >
                                {citasPorHora[hora][day] ? 'CITA' : ''}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedCita && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="bg-white rounded p-6 w-1/2 h-1/2 overflow-auto shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => setSelectedCita(null)}
                        >
                            <AiOutlineClose size={24} />
                        </button>
                        <h2 className="text-center text-2xl font-bold mb-4">Información de la cita</h2>
                        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded shadow-lg">
                            <div className="flex items-center w-full mb-2">
                                <FaUserAlt className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Paciente:</span>
                                <span className="text-lg ml-2">{`${selectedCita.user.people.name} ${selectedCita.user.people.firstLastname} ${selectedCita.user.people.secondLastname}`}</span>
                            </div>
                            <div className="flex items-center w-full mb-2">
                                <FaMapMarkerAlt className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Oficina:</span>
                                <span className="text-lg ml-2">{selectedCita.availability.codeAvailability}</span>
                            </div>
                            <div className="flex items-center w-full mb-2">
                                <FaClipboardList className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Día:</span>
                                <span className="text-lg ml-2">{selectedCita.availability.weekday}</span>
                            </div>
                            <div className="flex items-center w-full mb-2">
                                <FaRegClock className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Hora:</span>
                                <span className="text-lg ml-2">{selectedCita.availability.startTime} - {selectedCita.availability.endTime}</span>
                            </div>
                            <div className="flex items-center w-full mb-2">
                                <FaInfoCircle className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Motivo:</span>
                                <span className="text-lg ml-2">{selectedCita.reason}</span>
                            </div>
                            <div className="flex items-center w-full mb-2">
                                <FaClipboardList className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Tipo de cita:</span>
                                <span className="text-lg ml-2">{selectedCita.typeQuotes}</span>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600"
                                onClick={() => setSelectedCita(null)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default CitaDocente;
