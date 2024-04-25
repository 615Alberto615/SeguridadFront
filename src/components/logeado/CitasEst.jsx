import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useTreatmentStore from '../../store/useTreatmentStore';

const CitasEst = () => {
    const [selectedCita, setSelectedCita] = useState(null);
    const { treatments, fetchTreatments } = useTreatmentStore();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchTreatments(userId, token);
    }, [fetchTreatments, userId, token]);

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

    // Transform treatments into a format suitable for the weekly calendar
    const scheduleByDayAndHour = treatments.reduce((acc, treatment) => {
        const dayOfWeek = new Date(treatment.startDate).toLocaleString('en-us', { weekday: 'long' });
        const startTime = new Date(treatment.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (!acc[startTime]) {
            acc[startTime] = {};
        }
        acc[startTime][dayOfWeek] = treatment;
        return acc;
    }, {});

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    return (
        <div className="my-0 md:px-14 px-4 max-w-screen-2xl mx-auto">
            <motion.div
                variants={fadeIn('right', 0.2)}
                initial='hidden'
                whileInView='show'
                className="md:px-14 p-4 max-w-s mx-auto py-10"
                id='horarios'
                style={{ marginTop: '80px' }}
            >
                <div className="text-center" id={'citas'}>
                    <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Mis Consultas Programadas</h2>
                    <p className="text-tartiary md:w-1/3 mx-auto px-4">Consultas terapéuticas activas/próximas. Las consultas ya concluidas se ven en el historial de consultas en información del usuario.</p>
                </div>

                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Hora</th>
                            {daysOfWeek.map(day => (
                                <th key={day} style={cellStyle}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(scheduleByDayAndHour).map((hour, index) => (
                            <tr key={index}>
                                <td style={cellStyle}>{hour}</td>
                                {daysOfWeek.map(day => (
                                    <td key={day} style={cellStyle} onClick={() => setSelectedCita(scheduleByDayAndHour[hour][day])}>
                                        {scheduleByDayAndHour[hour][day] ? 'CITA' : ''}
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
                                <p className="text-lg">{selectedCita.description}</p>  {/* Ajusta para mostrar detalles de la cita */}
                            </div>
                            <div className="flex justify-center mt-6">
                                <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => setSelectedCita(null)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default CitasEst;
