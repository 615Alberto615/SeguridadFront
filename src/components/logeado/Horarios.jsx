import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAvailabilityStore from '../../store/useAvailabilityStore';
import HorarioModal from '../../components/logeado/SeleccionarHor';
import TherapistDetailModal from '../../components/logeado/MasInfo';

import therapist1 from '../../assets/profile3.png';

import { fadeIn } from '../../variants';
const Información = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const itemsPerPage = 3;

    const { availabilities, fetchAllAvailabilities } = useAvailabilityStore();

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchAllAvailabilities();
    }, [fetchAllAvailabilities, token]);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = availabilities.slice(firstIndex, lastIndex);

    const nextPage = () => {
        setCurrentPage(prev => prev < availabilities.length / itemsPerPage ? prev + 1 : prev);
    };

    const openDetailModal = (therapist) => {
        setSelectedTherapist(therapist);
        setDetailModalOpen(true);
    };

    const openScheduleModal = (therapist) => {
        setSelectedTherapist(therapist);
        setModalOpen(true);
    };

    return (
        <div className="my-0 md:px-14 px-4 max-w-screen-2xl mx-auto" id='servicios'>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
                <div className="container mx-auto mt-24">
                    <motion.div
                        variants={fadeIn('left', 0.2)}
                        initial='hidden'
                        whileInView='show'
                        className="text-center">
                        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Terapeutas Disponibles</h2>
                        <p className="text-tartiary md:w-1/3 mx-auto px-4">Lista de todos los terapeutas y sus horarios:</p>
                    </motion.div>

                    <div className="bg-white rounded-lg p-6">
                        <motion.div
                            variants={fadeIn('up', 0.3)}
                            initial='hidden'
                            whileInView='show'
                            className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center md:gap-12 gap-8 justify-items-center'>
                            {currentItems.map((therapist, index) => (
                                <TherapistCard
                                    key={index}
                                    therapist={therapist}
                                    onOpenModal={() => openScheduleModal(therapist)} 
                                    onOpenDetailModal={() => openDetailModal(therapist)}
                                />
                            ))}
                        </motion.div>

                        <motion.div
                            variants={fadeIn('right', 0.2)}
                            initial='hidden'
                            whileInView='show'
                            className="flex justify-center mt-8">
                            <div className="flex space-x-2">
                                {Array.from({ length: Math.ceil(availabilities.length / itemsPerPage) }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-4 py-2 rounded-full ${currentPage === (i + 1) ? 'bg-secondary text-white' : 'bg-gray-200'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            {currentPage < availabilities.length / itemsPerPage && (
                                <button onClick={nextPage} className="btn4 px-2">Siguiente</button>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
            <HorarioModal isOpen={modalOpen} onClose={() => setModalOpen(false)} therapist={selectedTherapist} />
            <TherapistDetailModal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)} therapist={selectedTherapist} />
        </div>
    );
};

const TherapistCard = ({ therapist, onOpenModal, onOpenDetailModal }) => {
    const { user } = therapist; // Accedemos al objeto "user" dentro de "therapist"
    const { people } = user || {}; // Accedemos al objeto "people" dentro de "user"

    return (
        <div className="relative w-full h-1px flex flex-col justify-center items-center p-6 bg-white rounded-[35px] shadow-3xl">
            <img src={people?.photo || therapist1} alt={people?.name} className="w-2/6 mb-4" />
            <h5 className="text-xl md:text-2xl lg:text-2xl text-primary font-semibold mt-4 text-center">
                {people?.name} {people?.firstLastname} {people?.secondLastname}
            </h5>
            <p className="text-center mt-2">{people?.email}</p>
            <p className="text-center font-bold mb-2">Horarios Disponibles</p>
            <p className="text-center">{therapist.startTime} - {therapist.endTime}</p>
            <p className="text-center">{therapist.weekday}</p>

            <button onClick={onOpenModal} className="mt-4 px-4 py-2 text-white bg-secondary rounded hover:bg-primary-dark transition-colors duration-300">
                Solicita una reserva
            </button>
            <button onClick={onOpenDetailModal} className="mt-2 mb-2 px-4 py-2 text-primary bg-gray-200 rounded hover:bg-secondary-dark transition-colors duration-300">
                Más información
            </button>
        </div>
    );
};

export default Información;
