import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useQuoteStore from '../../store/useQuoteStore1';
import { format, parseISO, addDays } from 'date-fns';
import therapist1 from '../../assets/profile3.png';

const CitasEst = () => {
    const [selectedCita, setSelectedCita] = useState(null);
    const { quotes, fetchQuoteById } = useQuoteStore();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        const newDate = addDays(date, 1);
        return format(newDate, 'dd/MM/yyyy');
    };

    const handleBackdropClick = () => {
        setSelectedCita(null);
    };

    const onClose = () => {
        setSelectedCita(null);
    };

    useEffect(() => {
        if (userId && token) {
            fetchQuoteById(userId, token);
        }
    }, [fetchQuoteById, userId, token]);

    const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

    const dayMap = {
        'lunes': 'Lunes',
        'martes': 'Martes',
        'miercoles': 'Miercoles',
        'jueves': 'Jueves',
        'viernes': 'Viernes',
        'sabado': 'Sabado',
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

                <div className="overflow-x-auto">
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
                </div>

                {selectedCita && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleBackdropClick}>
                        <motion.div
                            variants={fadeIn('up', 0.2)}
                            initial='hidden'
                            animate='show'
                            exit='hidden'
                            className="bg-white rounded-lg p-6 w-3/4 md:max-w-2xl mx-auto relative"
                            onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido propague al fondo
                        >
                            <button className="absolute top-0 right-0 mt-4 mr-4 text-2xl font-bold" onClick={onClose}>&times;</button>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-start">
                                    <img src={therapist1} className="w-12 h-12 bg-gray-300 flex justify-center items-center rounded-full" />
                                    <div className="text-right">
                                        <h2 className="text-xl font-semibold mr-16">Fecha:</h2>
                                        <p className="text-lg mr-4">{formatDate(selectedCita?.startTime)}</p>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold my-4">Motivo de la consulta:</h3>
                                <p className="text-sm mb-4">{selectedCita?.reason}</p>
                                <div className="flex">
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold">Horario de reserva</h4>
                                        <p className="text-md">{selectedCita?.availability?.weekday} a las: {selectedCita?.availability?.startTime}</p>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold">Consulta a cargo de:</h4>
                                        <p className="text-md">{selectedCita?.availability?.user?.people?.name} {selectedCita?.availability?.user?.people?.firstLastname} {selectedCita?.availability?.user?.people?.secondLastname}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between mt-4">
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold">Observaciones:</h4>
                                        <p className="text-sm">{selectedCita?.typeQuotes}</p>
                                    </div>
                                    <div className="flex-1 md:mt-4">
                                        <h4 className="text-lg font-bold">Prescripción terapéutica:</h4>
                                        <p className="text-sm">{selectedCita?.typeQuotes}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default CitasEst;
