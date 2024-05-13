import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useQuoteStore from '../../store/useQuoteStore1';

const CitasEst = () => {
    const [selectedCita, setSelectedCita] = useState(null);
    const { quotes, fetchQuoteById } = useQuoteStore();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (userId && token) {
            fetchQuoteById(userId, token);
        }
    }, [fetchQuoteById, userId, token]);

    // Spanish days of the week including weekends
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    // Use a standardized map for days to avoid localization issues
    const dayMap = {
        'lunes': 'Lunes',
        'martes': 'Martes',
        'miércoles': 'Miércoles',
        'jueves': 'Jueves',
        'viernes': 'Viernes',
        'sábado': 'Sábado',
        'domingo': 'Domingo'
    };

    const scheduleByDayAndHour = {};
    quotes.forEach(quote => {
        const weekday = dayMap[quote.availability.weekday.toLowerCase()];
        const startTime = quote.availability.startTime;

        if (!scheduleByDayAndHour[startTime]) {
            scheduleByDayAndHour[startTime] = {};
            daysOfWeek.forEach(day => {
                scheduleByDayAndHour[startTime][day] = [];
            });
        }

        if (weekday && scheduleByDayAndHour[startTime][weekday]) {
            scheduleByDayAndHour[startTime][weekday].push(quote);
        } else {
            console.error(`Mismatch in day names: ${weekday}`);
        }
    });

    console.log("Schedule by day and hour:", scheduleByDayAndHour);

    return (
        <div className="my-0 md:px-14 px-4 max-w-screen-2xl mx-auto">
            <motion.div
                variants={fadeIn('right', 0.2)}
                initial='hidden'
                whileInView='show'
                className="md:px-14 p-4 max-w-s mx-auto py-10"
                style={{ marginTop: '80px' }}
            >
                <div className="text-center">
                    <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Mis Consultas Programadas</h2>
                    <p className="text-tartiary md:w-1/3 mx-auto px-4">Consultas terapéuticas activas/próximas.</p>
                </div>

                <table className="w-full mx-auto border-collapse bg-white shadow-lg mt-5">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Hora</th>
                            {daysOfWeek.map(day => (
                                <th key={day} className="border px-4 py-2">{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(scheduleByDayAndHour).map(([time, days]) => (
                            <tr key={time}>
                                <td className="border px-4 py-2">{time}</td>
                                {daysOfWeek.map(day => (
                                    <td key={day} className="border px-4 py-2 cursor-pointer" onClick={() => setSelectedCita(days[day][0])}>
                                        {days[day].length > 0 ? 'CITA' : ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedCita && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h2>Datos de la Cita</h2>
                            <p>{selectedCita.reason}</p>
                            <button onClick={() => setSelectedCita(null)}>Cerrar</button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default CitasEst;
