import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants.js';
import useAvailabilityStore from "../../store/useAvailabilityStore.js";
import { deleteAvailability, updateAvailability, updateAvailabilityStatus } from "../../service/availabilityService.js";

const HorarioDocente = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedAvailability, setSelectedAvailability] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { availabilities, fetchAvailabilitiesByUserId, createAvailability } = useAvailabilityStore();

    const openEditModal = (availability) => {
        setSelectedAvailability(availability);
        setIsEditing(true);
    };

    const handleDelete = async (availabilityId) => {
        try {
            const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este horario?");
            if (confirmDelete) {
                await deleteAvailability(availabilityId, localStorage.getItem('token'));
                fetchAvailabilitiesByUserId(localStorage.getItem('userId'));
            }
        } catch (error) {
            alert("Error al eliminar el horario")
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
            fetchAvailabilitiesByUserId(localStorage.getItem('userId'));
            alert("Editado correctamente");
            setIsEditing(false);
        } catch (error) {
            alert("Error al editar el horario")
        }
    };

    useEffect(() => {
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
        color: 'white'
    };

    const timeSlots = Array.from({ length: 11 }, (_, i) => `${String(i + 9).padStart(2, '0')}:00 - ${String(i + 10).padStart(2, '0')}:00`);

    const activeAvailabilities = availabilities.filter(availability => availability.status);
    const inactiveAvailabilities = availabilities.filter(availability => !availability.status);

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
                                onClick={() => openEditModal(availability)}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600"
                                onClick={() => handleDelete(availability.availabilityId, localStorage.getItem('token'))}
                            >
                                Eliminar
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

            {/* Tabla de horarios inactivos */}
            <div className="text-left" id='horariodocente'>
                <h2 className="md:text-3xl text-3xl font-extrabold text-primary mb-2">Horarios Inactivos</h2>
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
                {inactiveAvailabilities.map((availability, index) => (
                    <tr key={index}>
                        <td style={cellStyle}>{availability.weekday}</td>
                        <td style={cellStyle}>{availability.startTime}</td>
                        <td style={cellStyle}>{availability.endTime}</td>
                        <td style={cellStyle}>Inactivo</td>
                        <td style={cellStyle}>
                            <button
                                className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600 mr-2"
                                onClick={() => openEditModal(availability)}
                            >
                                Editar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


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
                                        const isOccupied = availabilities.some(availability => availability.weekday === day && availability.startTime === timeSlot.split(' - ')[0]);
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

                                    if (time.includes(' - ')) {
                                        [startTime, endTime] = time.split(' - ');
                                    } else {

                                        startTime = time.trim();

                                        const [startHour, startMinute] = startTime.split(':').map(Number);
                                        let endHour = startHour + 1;

                                        // Asegurar que no supere las 24 horas
                                        if (endHour >= 24) {
                                            endHour -= 24;
                                        }

                                        endTime = `${String(endHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`;
                                    }

                                    const userId = localStorage.getItem('userId');
                                    //Crear codigo disponibilidad aleatorio
                                    const codeAvailability = Math.floor(Math.random() * 1000000);

                                    createAvailability({
                                        user:{
                                            userId: userId,
                                        },
                                        codeAvailability: codeAvailability,
                                        weekday: day,  // Usamos weekday en lugar de day
                                        startTime: `${startTime}:00`,
                                        endTime: endTime,
                                        status: true
                                    });
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


            {/* Modal de edición */}
            {isEditing && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded p-6 w-3/4 h-3/4 overflow-auto">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold mb-4">Editar Disponibilidad</h2>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="weekday" className="text-sm font-semibold">Día de la Semana:</label>
                                <select
                                    id="weekday"
                                    name="weekday"
                                    value={selectedAvailability.weekday}
                                    onChange={(e) => setSelectedAvailability({ ...selectedAvailability, weekday: e.target.value })}
                                    className="border border-gray-300 rounded px-3 py-2"
                                >
                                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
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
                                <select
                                    id="status"
                                    name="status"
                                    value={selectedAvailability.status}
                                    onChange={(e) => setSelectedAvailability({ ...selectedAvailability, status: e.target.value })}
                                    className="border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={() => handleEditConfirmation(selectedAvailability)} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Guardar Cambios</button>
                                <button onClick={() => setIsEditing(false)} className="border border-gray-300 px-4 py-2 rounded ml-2">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </motion.div>
    );
};

export default HorarioDocente;