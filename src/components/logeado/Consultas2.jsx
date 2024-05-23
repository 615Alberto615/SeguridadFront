import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import TherapistDetailModal from '../../components/logeado/InfoConsulta';
import useQuoteStore from '../../store/useQuoteStore1';
import therapist1 from '../../assets/profile3.png';

const ConsultasEst = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [optionsModalOpen, setOptionsModalOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [confirmationText, setConfirmationText] = useState('');
    const [localError, setLocalError] = useState('');
    const itemsPerPage = 3;

    const { quotes, fetchQuoteById, deleteQuoteById,  } = useQuoteStore();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId && token) {
            fetchQuoteById(userId, token);
        }
    }, [fetchQuoteById, userId, token]);

    useEffect(() => {
        if (selectedTreatment) {
            console.log("Opening modal with:", selectedTreatment);
            setDetailModalOpen(true);
        }
    }, [selectedTreatment]);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentAppointments = quotes.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(quotes.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const openDetailModal = (appointment) => {
        console.log("Attempting to open modal with appointment:", appointment);
        if (appointment && appointment.availability) {
            setSelectedTreatment(appointment);
            console.log("Selected Treatment set:", appointment);
            setDetailModalOpen(true);
        } else {
            console.error("Incomplete appointment data", appointment);
        }
    };

    const handleConfirmCancellation = async (appointment) => {
        setLocalError('');
        if (confirmationText.toLowerCase() === 'confirmar') {
            try {
                await deleteQuoteById(appointment.quotesId, token);
                setOptionsModalOpen(false);
                setConfirmationText('');
            } catch (err) {
                console.error("Error deleting appointment:", err);
                setLocalError(err.message || "Error desconocido");
            }
        } else {
            setLocalError('Por favor, ingresa la palabra "confirmar" para eliminar la cita.');
        }
    };

    const openOptionsModal = (appointment) => {
        setCurrentAppointment(appointment);
        setOptionsModalOpen(true);
    };

    return (
        <motion.div variants={fadeIn('left', 0.2)} initial='hidden' whileInView={'show'}
            className="my-0 md:px-14 px-4 max-w-screen-2xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
                <div className="container mx-auto mt-10">
                    <div className="text-center">
                        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Tus consultas</h2>
                        <p className="text-tartiary md:w-1/3 mx-auto px-4">Aquí puedes ver todas tus citas programadas.</p>
                    </div>

                    <div className="bg-white rounded-lg p-6">
                        {quotes.length > 0 ? (
                            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center md:gap-12 gap-8 justify-items-center'>    
                                {currentAppointments.map((appointment, index) => (
                                    <AppointmentCard 
                                    key={index}
                                    appointment={appointment}
                                    onOpenDetailModal={openDetailModal}
                                    onOpenOptionsModal={openOptionsModal} 
                                />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-lg text-gray-500">No tienes citas agendadas.</p>
                            </div>
                        )}
                        {quotes.length > 0 && (
                            <div className="flex justify-center mt-8">
                                <div className="flex space-x-2">
                                    {pageNumbers.map((number) => (
                                        <button
                                            key={number}
                                            onClick={() => setCurrentPage(number)}
                                            className={`px-4 py-2 rounded-full ${currentPage === number ? 'bg-secondary text-white' : 'bg-gray-200'}`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                                {currentPage < totalPages && (
                                    <button onClick={nextPage} className="btn4 px-2">Siguiente</button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <TherapistDetailModal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)} therapist={selectedTreatment} />
            {optionsModalOpen && (
                <AppointmentOptionsModal
                    isOpen={optionsModalOpen}
                    onClose={() => setOptionsModalOpen(false)}
                    onConfirmCancellation={handleConfirmCancellation}
                    appointment={currentAppointment}
                    confirmationText={confirmationText}
                    setConfirmationText={setConfirmationText}
                    localError={localError}
                />
            )}
        </motion.div>
    );
};

const AppointmentCard = ({ appointment, onOpenDetailModal, onOpenOptionsModal }) => {
    const [optionsOpen, setOptionsOpen] = useState(false);

    return (
        <div className="bg-white shadow rounded-lg p-4 flex flex-col mb-4 relative">
            <img src={appointment.photo || therapist1} alt={appointment.name} className="w-10 h-10 self-start" />
            <div className="text-left ml-12">
                <h3>{appointment.availability?.weekday}: {appointment.availability?.startTime}</h3>
                <p>{appointment.name}</p>
                <p>xd{appointment.quotesId}</p>
                <p className="text-sm">
                    Consulta a cargo de: {appointment.availability?.user?.people?.name} {appointment.availability?.user?.people?.firstLastname}
                </p>
                <p className="text-sm font-semibold">Estado: {appointment.availability?.status ? 'Activo' : 'Inactivo'}</p>
            </div>
            <button 
                className="absolute top-0 right-0 text-xl p-2" 
                onClick={() => setOptionsOpen(!optionsOpen)}
            >
                &#8942;
            </button>
            {optionsOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-md rounded-lg py-2 w-48">
                    <button 
                        className="block px-4 py-2 text-sm text-left w-full hover:bg-gray-100"
                        onClick={() => onOpenDetailModal(appointment)}
                    >
                        Más información
                    </button>
                    <button 
                        className="block px-4 py-2 text-sm text-left w-full hover:bg-gray-100"
                        onClick={() => onOpenOptionsModal(appointment)}
                    >
                        Cancelar cita
                    </button>
                </div>
            )}
        </div>
    );
};

const AppointmentOptionsModal = ({ isOpen, onClose, onConfirmCancellation, appointment, confirmationText, setConfirmationText, localError }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-1/3 mx-auto relative text-center">
                <h3 className="text-lg font-bold mb-4">¿Estás seguro de que quieres cancelar esta consulta?</h3>
                <p>Si cancelas la cita tendrás que programar una completamente nueva.</p>
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
                    <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300">
                        No, mantener
                    </button>
                    <button onClick={() => onConfirmCancellation(appointment)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
                        Sí, cancelar
                    </button>
                </div>
                <button className="absolute top-2 right-2 text-2xl font-bold" onClick={onClose}>&times;</button>
            </div>
        </div>
    );
};

export default ConsultasEst;
