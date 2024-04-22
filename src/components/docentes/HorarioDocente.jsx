// import user from '../assets/user2.png';
import  { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants.js';

const HorarioDocente = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

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
    const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 9}:00 - ${i + 10}:00`);

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
                {/* DATOS ESTATICOS */}
                {['Lunes', 'Martes', 'Miércoles'].map((dia, index) => (
                    <tr key={index}>
                        <td style={cellStyle}>{dia}</td>
                        <td style={cellStyle}>7:00</td>
                        <td style={cellStyle}>8:00</td>
                        <td style={cellStyle}>true</td>
                        <td style={cellStyle}>
                            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600 mr-2">Editar</button>
                            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600">Eliminar</button>
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
                                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day, i) => (
                                        <td
                                            key={i}
                                            style={{
                                                ...cellStyle,
                                                cursor: 'pointer',
                                                backgroundColor: selectedTimeSlot === `${day}-${timeSlot}` ? '#add8e6' : 'transparent'
                                            }}
                                            onClick={() => setSelectedTimeSlot(`${day}-${timeSlot}`)}
                                        />
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-6">
                            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600 mr-2" onClick={() => { /* Aquí va tu función para confirmar el horario */ }}>Confirmar</button>
                            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => setIsYearly(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}


        </motion.div>
    );
};

export default HorarioDocente;