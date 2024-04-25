// import user from '../assets/user2.png';
import {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants.js';
import useAvailabilityStore from "../../store/useAvailabilityStore.js";
import {updateAvailability} from "../../service/availabilityService.js";


const HorarioDocente = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const { availabilities, fetchAvailabilitiesByUserId, createAvailability } = useAvailabilityStore();
    const toggleAvailability = async (availability) => {
        const updatedAvailability = {
            ...availability,
            isActive: !availability.isActive
        };

        try {
            await updateAvailability(availability.availabilityId, updatedAvailability);
            fetchAvailabilitiesByUserId(localStorage.getItem('userId'));
        } catch (error) {
            console.error("Error toggling availability:", error);
        }
    };





    useEffect(() => {
        // Aquí obtienes los horarios del docente por su ID al montar el componente
        const userId = localStorage.getItem('userId');
        fetchAvailabilitiesByUserId(userId);
    }, [fetchAvailabilitiesByUserId]);

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

    const headerCellStyle = {
        ...cellStyle,
        backgroundColor: '#04182c',
        color: 'white' //
    };
    const timeSlots = Array.from({ length: 11 }, (_, i) => `${String(i + 9).padStart(2, '0')}:00 - ${String(i + 10).padStart(2, '0')}:00`);



    return (
        <motion.div
            variants={fadeIn('up',0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false,amount:0.5}}
            className="md:px-14 p-4 max-w-s mx-auto py-10"
            id='horarios'
            style={{ marginTop: '150px' }}
        >
            <div className="text-center" id='horariodocente'>
                <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Edita tus horarios</h2>
                <p className="text-tartiary md:w-1/3 mx-auto px-4">Aquí puedes editar tus horarios de atención.</p>
            </div>

            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={headerCellStyle}>Fecha</th>
                    <th style={headerCellStyle}>Hora inicio</th>
                    <th style={headerCellStyle}>Hora fin</th>
                    <th style={headerCellStyle}>Estado</th>
                    <th style={headerCellStyle}>Operaciones</th>
                </tr>
                </thead>
                <tbody>
                {availabilities.map((availability, index) => (
                    <tr key={index}>
                        <td style={cellStyle}>{new Date(availability.weekday).toLocaleDateString()}</td>
                        <td style={cellStyle}>{availability.startTime}</td>
                        <td style={cellStyle}>{availability.endTime}</td>
                        <td style={cellStyle}>
                            {availability.isActive ? 'Activo' : 'Inactivo'}
                        </td>
                        <td style={cellStyle}>
                            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600 mr-2">Editar</button>
                            <button
                                className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600"
                                onClick={() => toggleAvailability(availability)}
                            >
                                {availability.isActive ? 'Desactivar' : 'Activar'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
            <div className="flex justify-center mt-6">
                <button
                    className="mx-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onClick={() => setIsYearly(true)}
                >
                    Agregar horario
                </button>
            </div>

            {isYearly && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded p-6 w-3/4 h-3/4 overflow-auto">
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
                            {timeSlots.map((timeSlot, index) => (
                                <tr key={index}>
                                    <td style={cellStyle}>{timeSlot}</td>
                                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day, i) => {
                                        const isOccupied = availabilities.some(availability => availability.day === day && availability.startTime === timeSlot.split(' - ')[0]);
                                        return (
                                            <td
                                                key={i}
                                                style={{
                                                    ...cellStyle,
                                                    cursor: 'pointer',
                                                    backgroundColor: selectedTimeSlot === `${day}-${timeSlot}` ? '#add8e6' : (isOccupied ? '#FFC0CB' : 'transparent')
                                                }}
                                                onClick={() => setSelectedTimeSlot(`${day}-${timeSlot}`)}
                                            />
                                        );
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600 mr-2"
                                onClick={() => {
                                    const [day, time] = selectedTimeSlot.split('-');

                                    let startTime = '';
                                    let endTime = '';

                                    // Verificar si el tiempo contiene un formato válido
                                    if (time.includes(' - ')) {
                                        [startTime, endTime] = time.split(' - ');
                                    } else {
                                        // Si solo se selecciona una hora, establecer startTime y endTime
                                        startTime = time.trim();

                                        // Calcular endTime como una hora después de startTime
                                        const [startHour, startMinute] = startTime.split(':').map(Number);
                                        let endHour = startHour + 1; // Aumentar una hora

                                        // Asegurar que no supere las 24 horas
                                        if (endHour >= 24) {
                                            endHour -= 24;
                                        }

                                        endTime = `${String(endHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`;
                                    }

                                    // Obtener el día de la semana y formatearlo como "dd/mm/yyyy"
                                    const currentDate = new Date();
                                    const dayOfMonth = String(currentDate.getDate()).padStart(2, '0');
                                    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
                                    const year = currentDate.getFullYear();

                                    const weekday = `${year}-${month}-${dayOfMonth}`;

                                    const userId = localStorage.getItem('userId');

                                    createAvailability({
                                        userId,
                                        weekday: weekday,  // Usamos weekday en lugar de day
                                        startTime: `${startTime}:00`,
                                        endTime: endTime,
                                        isActive: true
                                    });
                                    setIsYearly(false);
                                    setIsYearly(false);
                                }}
                            >
                                Confirmar
                            </button>
                            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => setIsYearly(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}



        </motion.div>
    );
};

export default HorarioDocente;