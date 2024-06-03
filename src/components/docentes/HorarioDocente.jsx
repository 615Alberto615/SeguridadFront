import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants.js';
import useAvailabilityStore from "../../store/useAvailabilityStore.js";
import {
    deleteAvailability,
    getAvailabilitiesByUserId,
    updateAvailability,
    getActiveAvailabilities
} from "../../service/availabilityService.js";
import ConfirmationDialog from './confirm.jsx';
import { ClipLoader } from 'react-spinners';

const HorarioDocente = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedAvailability, setSelectedAvailability] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userAvailabilities, setUserAvailabilities] = useState([]);
    const { availabilities, fetchAvailabilitiesByUserId, createAvailability } = useAvailabilityStore();
    const [occupiedAvailabilities, setOccupiedAvailabilities] = useState([]);
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [availabilityToDelete, setAvailabilityToDelete] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

    const openEditModal = (availability) => {
        setSelectedAvailability(availability);
        setIsEditing(true);
    };

    const handleDelete = async () => {
        try {
            await deleteAvailability(availabilityToDelete, localStorage.getItem('token'));
            await fetchAvailabilitiesByUserId(localStorage.getItem('userId'));
            await loadOccupiedAvailabilities();
            setSuccessMessage("Horario eliminado correctamente");
            setShowConfirmation(false);
        } catch (error) {
            setLocalError("Error al eliminar el horario");
        }
    };

    const handleEditConfirmation = async (availabilityData) => {
        try {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const today = `${year}-${month}-${day}`;

            const startTime = new Date(`${today} ${availabilityData.startTime}`).getTime();
            const endTime = new Date(`${today} ${availabilityData.endTime}`).getTime();

            const updatedAvailabilityData = {
                ...availabilityData,
                startTime: startTime,
                endTime: endTime
            };

            await updateAvailability(availabilityData.availabilityId, updatedAvailabilityData, localStorage.getItem('token'));
            await fetchAvailabilitiesByUserId(localStorage.getItem('userId'));
            setSuccessMessage("Horario editado correctamente");
            setIsEditing(false);
            await loadOccupiedAvailabilities();
        } catch (error) {
            setLocalError("Error al editar el horario");
        }
    };

    const loadOccupiedAvailabilities = async () => {
        try {
            const availabilities = await getActiveAvailabilities(localStorage.getItem('token'));
            setOccupiedAvailabilities(availabilities);
        } catch (error) {
            console.error("Error al obtener las disponibilidades activas", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('userId');
            await fetchAvailabilitiesByUserId(userId);

            getAvailabilitiesByUserId(userId, localStorage.getItem('token'))
                .then(availabilities => setUserAvailabilities(availabilities))
                .catch(error => {
                    console.error("Error al obtener los horarios del docente", error);
                    setLocalError("Error al obtener los horarios del docente");
                });

            await loadOccupiedAvailabilities();
            setLoading(false); // Ocultar spinner después de cargar los datos
        };

        fetchData();
    }, [fetchAvailabilitiesByUserId]);

    useEffect(() => {
        if (successMessage || localError) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                setLocalError('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, localError]);

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
        color: 'white'
    };

    const timeSlots = Array.from({ length: 11 }, (_, i) => `${String(i + 9).padStart(2, '0')}:00 - ${String(i + 10).padStart(2, '0')}:00`);

    const activeAvailabilities = availabilities.filter(availability => availability.status);
    const inactiveAvailabilities = availabilities.filter(availability => !availability.status);

    const isOccupied = (day, timeSlot) => {
        const [startTime, endTime] = timeSlot.split(' - ');
        return occupiedAvailabilities.some(availability =>
            availability.weekday === day &&
            availability.startTime.substring(0, 5) === startTime &&
            availability.endTime.substring(0, 5) === endTime &&
            availability.status
        );
    };

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
            <div className="text-center" id='horariodocente'>
                <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Edita tus horarios</h2>
                <p className="text-tartiary md:w-1/3 mx-auto px-4">Aquí puedes editar tus horarios de atención.</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <ClipLoader size={50} color={"#4A90E2"} />
                </div>
            ) : (
                <>
                    {/* Mostrar alerta de error si existe */}
                    {localError && (
                        <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            {localError}
                        </div>
                    )}

                    {/* Mostrar mensaje de éxito si existe */}
                    {successMessage && (
                        <div className="text-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                            {successMessage}
                        </div>
                    )}

                    {/* Tabla de horarios activos */}
                    <div className="text-left" id='horariodocente'>
                        <h2 className="md:text-3xl text-3xl font-extrabold text-primary mb-2">Horarios Activos</h2>
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
                            {activeAvailabilities.map((availability, index) => (
                                <tr key={index}>
                                    <td style={cellStyle}>{availability.weekday}</td>
                                    <td style={cellStyle}>{availability.startTime}</td>
                                    <td style={cellStyle}>{availability.endTime}</td>
                                    <td style={cellStyle}>Activo</td>
                                    <td style={cellStyle}>
                                        <button
                                            className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600 mr-2"
                                            onClick={() => {
                                                setAvailabilityToDelete(availability.availabilityId);
                                                setShowConfirmation(true);
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600"
                                            onClick={() => openEditModal(availability)}
                                        >
                                            Editar
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
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg p-8 w-full max-w-6xl mx-4 md:mx-auto mt-20 md:mt-32 flex flex-col space-y-6">
                                <div className="flex flex-col md:flex-row">
                                    <table style={tableStyle} className="mb-6">
                                        <thead>
                                            <tr>
                                                <th style={headerCellStyle}>Hora</th>
                                                <th style={headerCellStyle}>Lunes</th>
                                                <th style={headerCellStyle}>Martes</th>
                                                <th style={headerCellStyle}>Miercoles</th>
                                                <th style={headerCellStyle}>Jueves</th>
                                                <th style={headerCellStyle}>Viernes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {timeSlots.map((timeSlot, index) => (
                                                <tr key={index}>
                                                    <td style={cellStyle}>{timeSlot}</td>
                                                    {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'].map((day, i) => {
                                                        const isSlotOccupied = isOccupied(day, timeSlot);
                                                        const isSelected = selectedTimeSlot === `${day}-${timeSlot}`;
                                                        return (
                                                            <td
                                                                key={i}
                                                                style={{
                                                                    ...cellStyle,
                                                                    cursor: 'pointer',
                                                                    backgroundColor: isSelected ? 'lightblue' : isSlotOccupied ? 'red' : 'inherit',
                                                                    color: isSlotOccupied ? 'white' : 'inherit'
                                                                }}
                                                                onClick={() => !isSlotOccupied && setSelectedTimeSlot(isSelected ? null : `${day}-${timeSlot}`)}
                                                            >
                                                                {isSlotOccupied ? "Ocupado" : ""}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="flex flex-col justify-center space-y-4 ml-4">
                                        <button
                                            className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600 h-12"
                                            onClick={async () => {
                                                const [day, time] = selectedTimeSlot.split('-');

                                                let startTime = '';
                                                let endTime = '';

                                                if (time.includes(' - ')) {
                                                    [startTime, endTime] = time.split(' - ');
                                                } else {
                                                    startTime = time.trim();
                                                    const [startHour, startMinute] = startTime.split(':').map(Number);
                                                    let endHour = startHour + 1;

                                                    if (endHour >= 24) {
                                                        endHour -= 24;
                                                    }

                                                    endTime = `${String(endHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`;
                                                }

                                                const userId = localStorage.getItem('userId');
                                                const codeAvailability = Math.floor(Math.random() * 1000000);

                                                await createAvailability({
                                                    user: {
                                                        userId: userId,
                                                    },
                                                    codeAvailability: codeAvailability,
                                                    weekday: day,
                                                    startTime: `${startTime}:00`,
                                                    endTime: endTime,
                                                    status: true
                                                });
                                                setIsYearly(false);
                                                await loadOccupiedAvailabilities();
                                            }}
                                        >
                                            Confirmar
                                        </button>
                                        <button
                                            className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600 h-12"
                                            onClick={() => setIsYearly(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isEditing && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded p-6 w-3/4 h-3/4 overflow-auto">
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-semibold mb-4">Editar Disponibilidad</h2>
                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="weekday" className="text-sm font-semibold">Día de la Semana:</label>
                                        <div className="flex space-x-2">
                                            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(day => (
                                                <button
                                                    key={day}
                                                    className={`px-4 py-2 rounded ${selectedAvailability.weekday === day ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                                    onClick={() => setSelectedAvailability({ ...selectedAvailability, weekday: day })}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="startTime" className="text-sm font-semibold">Hora de Inicio:</label>
                                        <input
                                            type="time"
                                            id="startTime"
                                            name="startTime"
                                            value={selectedAvailability.startTime}
                                            onChange={(e) => setSelectedAvailability({ ...selectedAvailability, startTime: e.target.value })}
                                            className="border border-gray-300 rounded px-3 py-2"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="endTime" className="text-sm font-semibold">Hora de Fin:</label>
                                        <input
                                            type="time"
                                            id="endTime"
                                            name="endTime"
                                            value={selectedAvailability.endTime}
                                            onChange={(e) => setSelectedAvailability({ ...selectedAvailability, endTime: e.target.value })}
                                            className="border border-gray-300 rounded px-3 py-2"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="status" className="text-sm font-semibold">Estado:</label>
                                        <div className="flex space-x-2">
                                            <button
                                                className={`px-4 py-2 rounded ${selectedAvailability.status ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                                onClick={() => setSelectedAvailability({ ...selectedAvailability, status: true })}
                                            >
                                                Activo
                                            </button>
                                            <button
                                                className={`px-4 py-2 rounded ${!selectedAvailability.status ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                                onClick={() => setSelectedAvailability({ ...selectedAvailability, status: false })}
                                            >
                                                Inactivo
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={() => handleEditConfirmation(selectedAvailability)} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Guardar Cambios</button>
                                        <button onClick={() => setIsEditing(false)} className="border border-gray-300 px-4 py-2 rounded ml-2">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {showConfirmation && (
                        <ConfirmationDialog
                            message="¿Estás seguro de que quieres eliminar este horario?"
                            onConfirm={handleDelete}
                            onCancel={() => setShowConfirmation(false)}
                        />
                    )}
                </>
            )}
        </motion.div>
    );
};

export default HorarioDocente;
