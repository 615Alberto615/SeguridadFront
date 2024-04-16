import { useState } from 'react';
import therapist1 from '../../assets/profile3.png';
import therapist2 from '../../assets/profile3.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

import TherapistDetailModal from '../../components/logeado/InfoConsulta';


const ConsultasEst = () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const [optionsModalOpen, setOptionsModalOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const itemsPerPage = 3;
    const appointments = [
        {
            image: therapist1,
            date: "10/06/2024",
            motive: "Problemas de ansiedad y estrés debido al trabajo",
            therapistName: "Dr. Jane Doe",
            schedule: "13:00-14:00",
            observations: "El paciente reporta dificultades para conciliar el sueño debido a la ansiedad laboral.",
            prescription: "Se recomienda terapia cognitivo-conductual y técnicas de relajación para manejar el estrés.",
        },
        {
            image: therapist2,
            date: "13/06/2024",
            motive: "Dificultades de relación interpersonal",
            therapistName: "Dr. John Smith",
            schedule: "15:30-16:30",
            observations: "El paciente expresa dificultades para establecer relaciones saludables con colegas en el trabajo.",
            prescription: "Se sugiere terapia de pareja y técnicas de comunicación para mejorar las habilidades sociales.",
        },
        {
            image: therapist1,
            date: "15/06/2024",
            motive: "Depresión y baja autoestima",
            therapistName: "Dr. Jane Doe",
            schedule: "13:00-14:00",
            observations: "El paciente muestra signos de aislamiento social y falta de interés en actividades previamente disfrutadas.",
            prescription: "Se propone terapia de apoyo emocional y evaluación para posible tratamiento farmacológico.",
        },
        {
            image: therapist1,
            date: "22/06/2024",
            motive: "Estrés postraumático debido a un accidente automovilístico",
            therapistName: "Dr. Jane Doe",
            schedule: "13:00-14:00",
            observations: "El paciente presenta síntomas de ansiedad y flashbacks relacionados con el incidente.",
            prescription: "Se recomienda terapia de exposición y técnicas de manejo del trauma para abordar los síntomas.",
        },
        {
            image: therapist2,
            date: "27/06/2024",
            motive: "Problemas de ira y manejo de emociones",
            therapistName: "Dr. John Smith",
            schedule: "15:30-16:30",
            observations: "El paciente informa dificultades para controlar la ira en situaciones estresantes.",
            prescription: "Se sugiere terapia cognitivo-conductual y entrenamiento en habilidades de regulación emocional.",
        },
        {
            image: therapist1,
            date: "2/07/2024",
            motive: "Trastorno de ansiedad generalizada",
            therapistName: "Dr. Jane Doe",
            schedule: "13:00-14:00",
            observations: "El paciente presenta preocupaciones excesivas y síntomas físicos relacionados con la ansiedad.",
            prescription: "Se propone terapia individualizada y técnicas de mindfulness para reducir la ansiedad.",
        },
    ];
    
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentAppointments = appointments.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(appointments.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const openDetailModal = (therapist) => {
        setSelectedTherapist(therapist);
        setDetailModalOpen(true);
    };
    
    
      const handleConfirmCancelation = (appointment) => {
        // Aquí iría la lógica para cancelar la cita
        console.log('Cita cancelada:', appointment);
        setOptionsModalOpen(false); // Cierra el modal de opciones
      };
      const openOptionsModal = (appointment) => {
        setCurrentAppointment(appointment);
        setOptionsModalOpen(true);
    };
    return (
        <div 
        className="my-0 md:px-14 px-4 max-w-screen-2xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
                <div className="container mx-auto mt-32">
                    <motion.div 
                    variants={fadeIn('down',0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    
                    className="text-center">
                        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Historial de Consultas</h2>
                        <p className="text-tartiary md:w-1/3 mx-auto px-4">Registro de todas las consultas terapueticas que realizo el estudiante.</p>    
                    </motion.div>

                    <motion.div 
                    variants={fadeIn('up',0.3)}
                    initial='hidden'
                    whileInView={'show'}
                    
                    className="bg-white rounded-lg p-6">
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
                        <motion.div 
                        variants={fadeIn('up',0.2)}
                        initial='hidden'
                        whileInView={'show'}
                        
                        className="flex justify-center mt-8">
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
                        </motion.div>
                    </motion.div>
                </div>
            </div>
         
            <TherapistDetailModal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)} therapist={selectedTherapist} />
            {optionsModalOpen && (
        <AppointmentOptionsModal 
          isOpen={optionsModalOpen}
          onClose={() => setOptionsModalOpen(false)}
          onConfirmCancelation={handleConfirmCancelation}
          appointment={currentAppointment}
        />
      )}
        
        </div>
    );
};

const AppointmentCard = ({ appointment,onOpenDetailModal  }) => {
    const [optionsOpen, setOptionsOpen] = useState(false);
    return (
      <div className="bg-white shadow rounded-lg p-4 flex flex-col mb-4 relative">
        <img src={appointment.image} alt="Icon Name" className="w-10 h-10 self-start" />
        <div className="text-left ml-12">
          <h3 className="text-lg font-semibold">{appointment.date}</h3>
          <p>{appointment.motive}</p>
          <p className="text-sm">Consulta a cargo de: {appointment.therapistName}</p>
          <p className="text-sm font-semibold">Horario de reserva: {appointment.schedule}</p>
          <p className="text-sm">Completada</p>
        </div>
        <div className="mt-4 flex justify-center">
          
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
                
            </div>
        )}
      </div>
    );
  };
  const AppointmentOptionsModal = ({ isOpen, onClose, onConfirmCancelation, appointment }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-1/3 mx-auto relative text-center">
          <h3 className="text-lg font-bold mb-4">¿Estás seguro de que quieres cancelar esta consulta?</h3>
          <p>Si cancelas la cita tendrás que programar una completamente nueva.</p>
          <div className="mt-4 flex justify-around">
            <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300">
              No, mantener
            </button>
            <button onClick={() => onConfirmCancelation(appointment)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
              Sí, cancelar
            </button>
          </div>
          <button className="absolute top-2 right-2 text-2xl font-bold" onClick={onClose}>&times;</button>
        </div>
      </div>
    );
  };
  

export default ConsultasEst;
