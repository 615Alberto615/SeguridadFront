import  { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const CitaDocente = () => {
    const [selectedCita, setSelectedCita] = useState(null);

    const tableStyle = {
        width: '80%',
        borderCollapse: 'collapse',
        marginTop: '50px',
        margin: 'auto',
        backgroundColor: '#f8f9fa', // Color de fondo de la tabla
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' // Sombra alrededor de la tabla
    };

    const cellStyle = {
        border: '1px solid #dee2e6', // Color del borde de las celdas
        padding: '15px',
        textAlign: 'center'
    };

    const citas = [
        // Aquí van tus citas...
        { fecha: 'Lunes', horaInicio: '9:00', horaFin: '10:00', paciente: 'Juan', oficina: 'Oficina 1', motivo: 'Consulta' },
        { fecha: 'Martes', horaInicio: '11:00', horaFin: '12:00', paciente: 'Ana', oficina: 'Oficina 2', motivo: 'Revisión' },
        { fecha: 'Miércoles', horaInicio: '14:00', horaFin: '15:00', paciente: 'Pedro', oficina: 'Oficina 3', motivo: 'Consulta' },
        { fecha: 'Jueves', horaInicio: '9:00', horaFin: '10:00', paciente: 'Luis', oficina: 'Oficina 5', motivo: 'Consulta' },
        // Agrega más citas de ejemplo aquí...
    ];

    // Crear un objeto que tenga como claves las horas y como valores las citas para esas horas
    const citasPorHora = citas.reduce((acc, cita) => {
        acc[cita.horaInicio] = cita;
        return acc;
    }, {});

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
            <div className="text-center" id={'citas'}>
                <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Tus citas</h2>
                <p className="text-tartiary md:w-1/3 mx-auto px-4">Aquí puedes ver tus citas.</p>
            </div>

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
                {Object.keys(citasPorHora).map((hora, index) => (
                    <tr key={index}>
                        <td style={cellStyle}>{hora}</td>
                        <td style={cellStyle} onClick={() => setSelectedCita(citasPorHora[hora].fecha === 'Lunes' ? citasPorHora[hora] : null)}>{citasPorHora[hora].fecha === 'Lunes' ? 'CITA' : ''}</td>
                        <td style={cellStyle} onClick={() => setSelectedCita(citasPorHora[hora].fecha === 'Martes' ? citasPorHora[hora] : null)}>{citasPorHora[hora].fecha === 'Martes' ? 'CITA' : ''}</td>
                        <td style={cellStyle} onClick={() => setSelectedCita(citasPorHora[hora].fecha === 'Miércoles' ? citasPorHora[hora] : null)}>{citasPorHora[hora].fecha === 'Miércoles' ? 'CITA' : ''}</td>
                        <td style={cellStyle} onClick={() => setSelectedCita(citasPorHora[hora].fecha === 'Jueves' ? citasPorHora[hora] : null)}>{citasPorHora[hora].fecha === 'Jueves' ? 'CITA' : ''}</td>
                        <td style={cellStyle} onClick={() => setSelectedCita(citasPorHora[hora].fecha === 'Viernes' ? citasPorHora[hora] : null)}>{citasPorHora[hora].fecha === 'Viernes' ? 'CITA' : ''}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedCita && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded p-6 w-1/2 h-1/2 overflow-auto">
                        <h2 className="text-center text-2xl font-bold mb-4">Información de la cita</h2>
                        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded shadow-lg">
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Paciente:</span>
                                <span className="text-lg">{selectedCita.paciente}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Oficina:</span>
                                <span className="text-lg">{selectedCita.oficina}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Día:</span>
                                <span className="text-lg">{selectedCita.fecha}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Hora:</span>
                                <span className="text-lg">{selectedCita.horaInicio} - {selectedCita.horaFin}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Motivo:</span>
                                <span className="text-lg">{selectedCita.motivo}</span>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => setSelectedCita(null)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default CitaDocente;
