import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import therapist1 from '../../assets/profile3.png';
import { useState } from 'react';

const TherapistDetailModal = ({ isOpen, onClose, therapist }) => {
    const [selectedDate, setSelectedDate] = useState('');

    if (!isOpen || !therapist) return null;

    const { user, availabilities } = therapist;
    const { people } = user || {};

    const weekDaysOrder = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    const initialSchedule = weekDaysOrder.reduce((acc, day) => ({ ...acc, [day]: "No disponible" }), {});

    const weeklySchedule = availabilities.reduce((acc, current) => {
        const day = current.weekday.charAt(0).toUpperCase() + current.weekday.slice(1);
        const formattedTime = `${current.startTime.slice(0, 5)} a ${current.endTime.slice(0, 5)}`;
        acc[day] = formattedTime;
        return acc;
    }, initialSchedule);

    const today = new Date().toISOString().split('T')[0];

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleBackgroundClick}>
            <motion.div
                variants={fadeIn('up', 0.2)}
                initial='hidden'
                animate='show'
                exit='hidden'
                className="bg-white rounded-lg p-6 w-3/4 md:max-w-6xl mx-auto relative"
                onClick={e => e.stopPropagation()} // Prevent click from propagating to background
            >
                <button className="absolute top-4 right-4 text-2xl font-bold" onClick={onClose}>&times;</button>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-2">Información del Terapeuta</h3>
                    <img src={people?.photo || therapist1} alt={`${people?.name} ${people?.firstLastname}`} className="w-24 h-24 rounded-full mb-4" />
                    <div className="text-center mb-4">
                        <p>Nombre: {people?.name} {people?.firstLastname} {people?.secondLastname}</p>
                        <p>Email: {people?.email}</p>
                        <label htmlFor="datePicker" className=" mt-6 block text-sm  font-bold text-gray-700">Seleccione una fecha:</label>
                        <input
                            type="date"
                            id="datePicker"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            min={today}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                    <div className="w-full overflow-x-auto mt-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {weekDaysOrder.map((day) => (
                                        <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    {weekDaysOrder.map((day) => (
                                        <td key={day} className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="mb-2">{weeklySchedule[day]}</div>
                                            {weeklySchedule[day] !== "No disponible" && (
                                                <button
                                                    className="w-full px-4 py-2 bg-secondary hover:bg-primary text-white font-bold rounded"
                                                    onClick={() => alert(`Solicitud enviada para el ${day}, ${selectedDate}`)}
                                                >
                                                    Solicitar
                                                </button>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TherapistDetailModal;
{/*ahora ayudame conectando mi backend con mi frontend para la solicitud de las reserva, para ello ten en cuenta que estoy usando el gestor de estados zustand(quiero que me des mi store y mi service), para ello te pasare los endpoint:
Donde lo primero que quiero esque al momento de presionar solicitar mande este este post  al backend y si es satisfacctorio borres todo lo del modal y muestres el formulario el enpoint es el siguiente:*/}