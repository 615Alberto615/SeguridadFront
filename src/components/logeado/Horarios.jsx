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
    const [groupedAvailabilities, setGroupedAvailabilities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');  // Estado para el término de búsqueda
    const itemsPerPage = 3;

    const { availabilities, fetchAllAvailabilities } = useAvailabilityStore();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchAllAvailabilities();
    }, [fetchAllAvailabilities, token]);

    useEffect(() => {
        
        const grouped = {};
        availabilities.forEach(item => {
            const userId = item.user.userId;
            if (!grouped[userId]) {
                grouped[userId] = { ...item, availabilities: [] };
            }
            grouped[userId].availabilities.push(...item.availabilities);
        });
    
       
    
        let filteredGrouped = Object.values(grouped).filter(user => user.availabilities.length > 0);
        
        if (searchTerm.trim()) {
            filteredGrouped = filteredGrouped.filter(user => {
                const nameMatch = user.user.people.name && user.user.people.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
                const lastNameMatch = user.user.people.firstLastname && user.user.people.firstLastname.toLowerCase().includes(searchTerm.trim().toLowerCase());
                const seclastNameMatch = user.user.people.secondLastname && user.user.people.secondLastname.toLowerCase().includes(searchTerm.trim().toLowerCase());
                return nameMatch || lastNameMatch || seclastNameMatch;
            });
    
            console.log("Filtered results:", filteredGrouped); // Ver los resultados del filtro
        }
        
        setGroupedAvailabilities(filteredGrouped);
    }, [availabilities, searchTerm]);
    
    
    

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = groupedAvailabilities.slice(firstIndex, lastIndex);

    const nextPage = () => {
        setCurrentPage(prev => prev < groupedAvailabilities.length / itemsPerPage ? prev + 1 : prev);
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
        <div className=''>
            <div className="my-0 md:px-14 px-4 max-w-screen-2xl mx-auto " id='servicios'>
                <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
                    <div className="container mx-auto mt-24">
                        <motion.div
                            variants={fadeIn('left', 0.2)}
                            initial='hidden'
                            whileInView='show'
                            className="text-center">
                            <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Terapeutas Disponibles</h2>
                            <p className="text-tartiary md:w-1/3 mx-auto px-4">Lista de todos los terapeutas y sus horarios:</p>
                            <input
                                type="text"
                                placeholder="Buscar por nombre o apellido..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="text-center mt-4 mb-2 px-4 py-2 border rounded w-full md:w-1/3 mx-auto focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                            />
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
                                    {Array.from({ length: Math.ceil(groupedAvailabilities.length / itemsPerPage) }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-4 py-2 rounded-full ${currentPage === (i + 1) ? 'bg-secondary text-white' : 'bg-gray-200'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                {currentPage < groupedAvailabilities.length / itemsPerPage && (
                                    <button onClick={nextPage} className="btn4 px-2">Siguiente</button>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
                <HorarioModal isOpen={modalOpen} onClose={() => setModalOpen(false)} therapist={selectedTherapist} />
                <TherapistDetailModal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)} therapist={selectedTherapist} />
            </div>
        </div>
    );
};

const TherapistCard = ({ therapist,  onOpenDetailModal }) => {
    const { user, availabilities } = therapist;
    const { people } = user || {};

    // Días de la semana en el orden deseado
    const weekDaysOrder = {
        lunes: 1,
        martes: 2,
        miercoles: 3,
        jueves: 4,
        viernes: 5,
        sabado: 6,
        domingo: 7
    };

    // Extraer los días disponibles y ordenarlos
    const daysAvailable = availabilities
        .map(a => a.weekday)
        .filter((v, i, a) => a.indexOf(v) === i)  // Eliminar duplicados
        .sort((a, b) => weekDaysOrder[a] - weekDaysOrder[b]);  // Ordenar según el objeto de orden

    // Unir los días con guiones
    const daysString = daysAvailable.join(' - ');

    return (
        <div className="relative w-full h-full flex flex-col justify-center items-center p-6 bg-white rounded-[35px] shadow-3xl">
            <img src={people?.photo || therapist1} alt={`${people?.name} ${people?.firstLastname}`} className="w-24 h-24 rounded-full mb-4 object-cover" />
            <h5 className="text-xl md:text-2xl text-primary font-semibold">
                {people?.name} {people?.firstLastname} {people?.secondLastname}
            </h5>
            <p className="text-center mt-1">{people?.email}</p>
            <p className="text-center font-bold mt-2 mb-1">Días Disponibles</p>
            <p className="text-center">{daysString}</p>
            
            <button onClick={onOpenDetailModal} className="mt-4 px-4 py-2 text-white bg-secondary rounded hover:bg-primary-dark transition-colors duration-300">
                Solicitar una reserva
            </button>
            <p className="text-center mb-9"></p>
        </div>
    );
};



export default Información;
