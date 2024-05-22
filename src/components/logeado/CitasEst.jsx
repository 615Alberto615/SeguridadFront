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
                        <div className="bg-white mb-5 mt-5 p-6 rounded shadow-lg h-18 w-20">
                            <h2>Datos de la Cita</h2>
                            <div className="flex flex-col">
          <div className="flex justify-between items-start">
            {/* Placeholder for icon */}
            <img src={therapist1} className="w-12 h-12 bg-gray-300 flex justify-center items-center rounded-full" />
            <div className="text-right">
              <h2 className="text-xl font-semibold mr-16">Fecha:</h2>
              <p className="text-lg mr-4">{formatDate(therapist?.appointmentRequest)}</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold my-4">Motivo de la consulta:</h3>
            <div className="flex">
                {/* Schedule information */}
                <div className="flex-1">
                <h4 className="text-lg font-bold">Horario de reserva</h4>
                <p className="text-md">{therapist?.availability?.weekday} a las: {therapist?.availability?.startTime}</p>
                </div>
                
                {/* Therapist's details */}
                <div className="flex-1">
                <h4 className="text-lg font-bold">Consulta a cargo de:</h4>
                <p className="text-md">{therapist?.availability?.user?.people?.name} {therapist?.availability?.user?.people?.firstLastname} {therapist?.availability?.user?.people?.secondLastname}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-4">
                <div className="flex-1">
                <h4 className="text-lg font-bold">Observaciones:</h4>
                <p className="text-sm">{therapist?.typeQuotes}</p>
                </div>
                
                <div className="flex-1 md:mt-4">
                <h4 className="text-lg font-bold">Prescripción terapéutica:</h4>
                <p className="text-sm">{therapist?.typeQuotes}</p>
                </div>
            </div>
            </div>
                            <button onClick={() => setSelectedCita(null)}>Cerrar</button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default CitasEst;
