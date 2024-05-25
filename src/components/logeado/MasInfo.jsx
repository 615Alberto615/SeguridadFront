import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import therapist1 from '../../assets/profile3.png';
import { useState } from 'react';
import useQuoteStore from '../../store/useQuoteStore1';
import ConsultaForm from './ConsultaForm';  // Importa el componente del formulario

const TherapistDetailModal = ({ isOpen, onClose, therapist }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('red');
    const [isRequesting, setIsRequesting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const { checkAvailability } = useQuoteStore();

    if (!isOpen || !therapist) return null;

    const { user, availabilities } = therapist;
    const { people } = user || {};

    const weekDaysOrder = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const initialSchedule = weekDaysOrder.reduce((acc, day) => ({ ...acc, [day]: "No disponible" }), {});

    const validAvailabilities = availabilities.filter(a => a.status === true);

    const weeklySchedule = validAvailabilities.reduce((acc, current) => {
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

    const getWeekDay = (dateString) => {
        const date = new Date(dateString);
        return weekDaysOrder[date.getDay()];  // Correctly get the day name
    };

    const handleRequest = async (day) => {
        if (!selectedDate) {
            setAlertMessage('Por favor, ingrese una fecha.');
            setAlertColor('red');
            return;
        }

        const selectedWeekDay = getWeekDay(selectedDate);
        if (selectedWeekDay !== day) {
            setAlertMessage('La fecha seleccionada no cuadra con el día.');
            setAlertColor('red');
            return;
        }

        const availability = validAvailabilities.find(a => a.weekday.toLowerCase() === day.toLowerCase());
        if (!availability) {
            setAlertMessage('No se encontró disponibilidad para el día seleccionado.');
            setAlertColor('red');
            return;
        }

        // Validar que la hora actual esté dentro del horario disponible del terapeuta si la fecha seleccionada es hoy
        const currentDate = new Date();
        const selectedDateTime = new Date(selectedDate);
        if (currentDate.toDateString() === selectedDateTime.toDateString()) {
            const currentTime = new Date();
            const [startHour, startMinute] = availability.startTime.split(':');
            const [endHour, endMinute] = availability.endTime.split(':');

            const startDateTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), startHour, startMinute);
            const endDateTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), endHour, endMinute);

            if (currentTime < startDateTime || currentTime > endDateTime) {
                setAlertMessage('El horario de solicitud debe estar dentro del horario disponible del terapeuta.');
                setAlertColor('red');
                return;
            }
        }

        setAlertMessage('');
        setIsRequesting(true);
        const token = localStorage.getItem('token');

        try {
            const formattedDate = selectedDate; // No need to change since it's already in YYYY-MM-DD format
            console.log('Sending request to check availability:', { availabilityId: availability.availabilityId, startTime: formattedDate });
            const response = await checkAvailability({ availabilityId: availability.availabilityId, startTime: formattedDate }, token);
            console.log('Response from availability check:', response);
            if (response.data) {
                setAlertMessage('Horario disponible.');
                setAlertColor('green');
                localStorage.setItem('appointmentRequest', formattedDate);
                localStorage.setItem('availabilityId', availability.availabilityId);
                setShowForm(true);
            } else {
                setAlertMessage('El horario solicitado ya no tiene cupos o no se encuentra disponible. Solicite en otra fecha u horario.');
                setAlertColor('red');
            }
        } catch (error) {
            console.error('Error checking availability:', error);
            setAlertMessage('Error al verificar disponibilidad. Solicite en otra fecha u horario.');
            setAlertColor('red');
        } finally {
            setIsRequesting(false);
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
                    {!showForm ? (
                        <>
                            <h3 className="text-xl font-bold mb-2">Información del Terapeuta</h3>
                            <img src={people?.photo || therapist1} alt={`${people?.name} ${people?.firstLastname}`} className="w-24 h-24 rounded-full mb-4" />
                            <div className="text-center mb-4">
                                <p>Nombre: {people?.name} {people?.firstLastname} {people?.secondLastname}</p>
                                <p>Email: {people?.email}</p>
                                <p>Género: {people?.genderId?.name}</p>
                                <p>Semestre: {people?.semesterId?.name}</p>
                                <label htmlFor="datePicker" className="mt-6 block text-sm font-bold text-gray-700">Seleccione una fecha:</label>
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
                                                            onClick={() => handleRequest(day)}
                                                            disabled={isRequesting}
                                                        >
                                                            {isRequesting ? 'Solicitando...' : 'Solicitar'}
                                                        </button>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {alertMessage && (
                                <div className={`mt-4 text-center p-4 mb-4 text-sm text-${alertColor}-700 bg-${alertColor}-100 rounded-lg`} role="alert">
                                    {alertMessage}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <button className="absolute top-4 left-4 text-xl font-bold" onClick={() => setShowForm(false)}>
                                &#8592; Atrás
                            </button>
                            <ConsultaForm availabilityId={localStorage.getItem('availabilityId')} appointmentRequest={localStorage.getItem('appointmentRequest')} />
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default TherapistDetailModal;
