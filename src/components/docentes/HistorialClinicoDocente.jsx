import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchHistorialByTherapist } from '../../service/quoteService.js';
import { AiOutlineClose } from 'react-icons/ai';
import { FaPhoneAlt, FaCalendarAlt, FaNotesMedical, FaUserAlt, FaRegClock, FaEnvelope, FaIdCard } from 'react-icons/fa';

const HistorialClinicoDocente = () => {
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const pacientesPorPagina = 5;

    useEffect(() => {
        const therapistId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        fetchHistorialByTherapist(therapistId, token)
            .then(response => {
                if (response && response.data) {
                    setPacientes(response.data);
                } else {
                    setPacientes([]);
                }
            })
            .catch(error => {
                console.error("Error fetching patient history:", error);
                setPacientes([]);
            });
    }, []);

    const filtrarPacientes = () => {
        return pacientes.filter(paciente =>
            paciente.user.people.name.toLowerCase().includes(filtro.toLowerCase()) ||
            paciente.user.people.firstLastname.toLowerCase().includes(filtro.toLowerCase()) ||
            paciente.user.people.secondLastname.toLowerCase().includes(filtro.toLowerCase())
        );
    };

    const paginarPacientes = () => {
        const indiceUltimoPaciente = paginaActual * pacientesPorPagina;
        const indicePrimerPaciente = indiceUltimoPaciente - pacientesPorPagina;
        return filtrarPacientes().slice(indicePrimerPaciente, indiceUltimoPaciente);
    };

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const abrirModal = (paciente) => {
        setPacienteSeleccionado(paciente);
    };

    const cerrarModal = () => {
        setPacienteSeleccionado(null);
    };

    const numeroPaginas = Math.ceil(filtrarPacientes().length / pacientesPorPagina);

    return (
        <div className="container mx-auto mt-36 mb-10">
            <div className="bg-white shadow-xl rounded-lg p-6">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar paciente..."
                        value={filtro}
                        onChange={(e) => {
                            setPaginaActual(1); // Reiniciar página al cambiar el filtro
                            setFiltro(e.target.value);
                        }}
                        className="border rounded-full p-2 w-full shadow-sm focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="flex flex-wrap gap-4">
                    {paginarPacientes().map((paciente) => (
                        <motion.div
                            key={paciente.quotesId}
                            className="bg-white rounded-lg shadow-md p-4 w-full cursor-pointer hover:bg-blue-50 transition duration-300"
                            onClick={() => abrirModal(paciente)}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h2 className="text-lg font-semibold mb-2 flex items-center">
                                <FaUserAlt className="mr-2 text-blue-500" />
                                {`${paciente.user.people.name} ${paciente.user.people.firstLastname} ${paciente.user.people.secondLastname}`}
                            </h2>
                            <p className="flex items-center">
                                <FaNotesMedical className="mr-2 text-blue-500" />
                                <strong>Motivo:</strong> {paciente.reason}
                            </p>
                            <p className="flex items-center">
                                <FaPhoneAlt className="mr-2 text-blue-500" />
                                <strong>Teléfono:</strong> {paciente.user.people.cellphone}
                            </p>
                            <p className="flex items-center">
                                <FaCalendarAlt className="mr-2 text-blue-500" />
                                <strong>Última visita:</strong> {new Date(paciente.appointmentRequest).toLocaleDateString()}
                            </p>
                            <p className="flex items-center">
                                <FaNotesMedical className="mr-2 text-blue-500" />
                                <strong>Tipo de cita:</strong> {paciente.typeQuotes}
                            </p>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full shadow-sm hover:bg-blue-300 transition duration-300 ease-in-out"
                        onClick={() => cambiarPagina(paginaActual - 1)}
                        disabled={paginaActual === 1}
                    >
                        Anterior
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full shadow-sm hover:bg-blue-300 transition duration-300 ease-in-out"
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        disabled={paginaActual === numeroPaginas}
                    >
                        Siguiente
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <span>Página {paginaActual} de {numeroPaginas}</span>
                </div>

                {pacienteSeleccionado && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                    >
                        <div className="bg-white p-6 rounded-lg w-96 relative shadow-xl">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                                onClick={cerrarModal}
                            >
                                <AiOutlineClose size={24} />
                            </button>
                            <h2 className="text-2xl font-semibold mb-4 text-center border-b pb-4">{`${pacienteSeleccionado.user.people.name} ${pacienteSeleccionado.user.people.firstLastname} ${pacienteSeleccionado.user.people.secondLastname}`}</h2>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center">
                                    <FaNotesMedical className="mr-2 text-blue-500" />
                                    <span><strong>Motivo:</strong> {pacienteSeleccionado.reason}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaNotesMedical className="mr-2 text-blue-500" />
                                    <span><strong>Tipo de cita:</strong> {pacienteSeleccionado.typeQuotes}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-blue-500" />
                                    <span><strong>Última visita:</strong> {new Date(pacienteSeleccionado.appointmentRequest).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaPhoneAlt className="mr-2 text-blue-500" />
                                    <span><strong>Teléfono:</strong> {pacienteSeleccionado.user.people.cellphone}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaIdCard className="mr-2 text-blue-500" />
                                    <span><strong>CI:</strong> {pacienteSeleccionado.user.people.ci}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="mr-2 text-blue-500" />
                                    <span><strong>Email:</strong> {pacienteSeleccionado.user.people.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaRegClock className="mr-2 text-blue-500" />
                                    <span><strong>Hora de inicio:</strong> {pacienteSeleccionado.availability.startTime}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaRegClock className="mr-2 text-blue-500" />
                                    <span><strong>Hora de fin:</strong> {pacienteSeleccionado.availability.endTime}</span>
                                </div>
                            </div>
                            <button
                                className="mt-6 px-4 py-2 bg-blue-200 text-blue-800 rounded-full shadow-sm hover:bg-blue-300 transition duration-300 ease-in-out w-full"
                                onClick={cerrarModal}
                            >
                                Cerrar
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default HistorialClinicoDocente;
