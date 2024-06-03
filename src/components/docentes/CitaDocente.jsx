import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants.js';
import { fetchQuotesByTherapist } from '../../service/quoteService.js';
import { AiOutlineClose } from 'react-icons/ai';
import useQuoteStore from '../../store/useQuoteStore1';
import { FaUserAlt, FaRegClock, FaMapMarkerAlt, FaInfoCircle, FaClipboardList, FaBan } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const CitaDocente = () => {
    const [citas, setCitas] = useState([]);
    const [selectedCita, setSelectedCita] = useState(null);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const [localError, setLocalError] = useState('');
    const [loading, setLoading] = useState(true); // Estado de carga

    const { deleteQuoteById } = useQuoteStore();

    useEffect(() => {
        const therapistId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        fetchQuotesByTherapist(therapistId, token)
            .then(response => {
                if (response && response.data) {
                    setCitas(response.data);
                } else {
                    setCitas([]);
                }
                setLoading(false); // Ocultar spinner después de cargar los datos
            })
            .catch(error => {
                console.error("Error fetching quotes:", error);
                setCitas([]);
                setLoading(false); // Ocultar spinner en caso de error
            });
    }, []);

    const handleConfirmCancellation = async () => {
        if (confirmationText.toLowerCase() === 'confirmar') {
            const token = localStorage.getItem('token');  // Obtener el token
            try {
                await deleteQuoteById(selectedCita.quotesId, token);  // Pasar el token como segundo argumento
                setIsCancelModalOpen(false);
                setCitas(citas.filter(cita => cita.quotesId !== selectedCita.quotesId));
                setSelectedCita(null);
                window.location.reload();
            } catch (err) {
                console.error("Error cancelling appointment:", err);
                setLocalError(err.message || "Error desconocido");
            }
        } else {
            setLocalError('Por favor, ingresa la palabra "confirmar" para eliminar la cita.');
        }
    };

    const openCancelModal = () => {
        setIsCancelModalOpen(true);
    };

    const closeCancelModal = () => {
        setIsCancelModalOpen(false);
        setConfirmationText('');
        setLocalError('');
    };

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
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#333'
    };

    const headerStyle = {
        ...cellStyle,
        backgroundColor: '#04182c', // Primary color
        color: '#fff',
        fontWeight: 'bold'
    };

    const citasPendientes = citas.filter(cita => cita.status);

    const citasPorHora = citasPendientes.reduce((acc, cita) => {
        const startTime = cita.availability.startTime;
        const endTime = cita.availability.endTime;
        const hour = `${startTime} - ${endTime}`;
        const day = cita.availability.weekday.toLowerCase();

        if (!acc[hour]) {
            acc[hour] = {};
        }
        acc[hour][day] = cita;
        return acc;
    }, {});

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
            <div className="text-center" id='citas'>
                <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Tus citas</h2>
                <p className="text-secondary md:w-1/3 mx-auto px-4">Aquí puedes ver tus citas.</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <ClipLoader size={50} color={"#4A90E2"} />
                </div>
            ) : (
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={headerStyle}>Hora</th>
                        <th style={headerStyle}>Lunes</th>
                        <th style={headerStyle}>Martes</th>
                        <th style={headerStyle}>Miércoles</th>
                        <th style={headerStyle}>Jueves</th>
                        <th style={headerStyle}>Viernes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(citasPorHora).map((hora, index) => (
                        <tr key={index}>
                            <td style={cellStyle}>{hora}</td>
                            {['lunes', 'martes', 'miércoles', 'jueves', 'viernes'].map((day, i) => (
                                <td
                                    key={i}
                                    style={{
                                        ...cellStyle,
                                        backgroundColor: citasPorHora[hora][day] ? '#e09be0' : '#fff', // Secondary color
                                        cursor: citasPorHora[hora][day] ? 'pointer' : 'default'
                                    }}
                                    onClick={() => setSelectedCita(citasPorHora[hora][day])}
                                    className={citasPorHora[hora][day] ? "hover:bg-blue-200 transition-colors" : ""}
                                >
                                    {citasPorHora[hora][day] ? 'CITA' : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {selectedCita && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="bg-white rounded p-6 w-1/2 h-auto overflow-auto shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => setSelectedCita(null)}
                        >
                            <AiOutlineClose size={24} />
                        </button>
                        <h2 className="text-center text-2xl font-bold mb-4">Información de la cita</h2>
                        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded shadow-lg">
                            <div className="flex items-center w-full mb-2">
                                <FaUserAlt className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Paciente:</span>
                                <span className="text-lg ml-2">{`${selectedCita.user.people.name} ${selectedCita.user.people.firstLastname} ${selectedCita.user.people.secondLastname}`}</span>
                            </div>
                            <div className="flex items-center w-full mb-2">
                                <FaMapMarkerAlt className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Oficina:</span>
                                <span className="text-lg ml-2">{selectedCita.availability.codeAvailability}</span>
                            </div>
                            <div className="flex items-center w-full mb-2">
                                <FaClipboardList className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Día:</span>
                                <span className="text-lg ml-2">{selectedCita.availability.weekday}</span>
                            </div>
                            <div className="flex items-center w-full mb-2">
                                <FaRegClock className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Hora:</span>
                                <span className="text-lg ml-2">{selectedCita.availability.startTime} - {selectedCita.availability.endTime}</span>
                            </div>
                            <div className="flex items-center w-full mb-2">
                                <FaInfoCircle className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Motivo:</span>
                                <span className="text-lg ml-2">{selectedCita.reason}</span>
                            </div>
                            <div className="flex items-center w-full mb-2">
                                <FaClipboardList className="mr-2 text-secondary" />
                                <span className="font-bold text-lg">Tipo de cita:</span>
                                <span className="text-lg ml-2">{selectedCita.typeQuotes}</span>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600"
                                onClick={() => setSelectedCita(null)}
                            >
                                Cerrar
                            </button>
                            <button
                                className="bg-red-500 ml-4 py-2 px-4 text-white rounded hover:bg-red-700 transition-all duration-300"
                                onClick={openCancelModal}
                            >
                                <FaBan className="inline mr-2" />Cancelar Cita
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {isCancelModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-1/3 mx-auto relative text-center">
                        <h3 className="text-lg font-bold mb-4">¿Estás seguro de que quieres cancelar esta consulta?</h3>
                        <p>Si cancelas la cita el usuario que solicitó la cita tendrá que programar una completamente nueva.</p>
                        <p>Por favor, ingresa la palabra <strong>confirmar</strong> para proceder:</p>
                        <input 
                            type="text"
                            value={confirmationText}
                            onChange={(e) => setConfirmationText(e.target.value)}
                            className="mt-2 border border-gray-300 rounded px-4 py-2"
                        />
                        {localError && (
                            <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg mt-6" role="alert">
                                {localError}
                            </div>
                        )}
                        <div className="mt-4 flex justify-around">
                            <button onClick={closeCancelModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300">
                                No, mantener
                            </button>
                            <button onClick={handleConfirmCancellation} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
                                Sí, cancelar
                            </button>
                        </div>
                        <button className="absolute top-2 right-2 text-2xl font-bold" onClick={closeCancelModal}>&times;</button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default CitaDocente;
