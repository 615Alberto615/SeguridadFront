import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import therapist1 from '../../assets/profile.png';
import therapist2 from '../../assets/profile.png';
import therapist3 from '../../assets/profile.png';

const Información = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const therapists = [
        { image: therapist1, name: "Dr. Jane Doe", info: "Especialista en terapia cognitivo-conductual.", schedule: "12:45-15:00", days: "Lunes a Miércoles" },
        { image: therapist2, name: "Dr. John Smith", info: "Experto en psicología clínica y de la salud.", schedule: "10:00-12:00", days: "Martes y Jueves" },
        { image: therapist3, name: "Dr. Alex Johnson", info: "Terapeuta enfocado en terapia de pareja.", schedule: "16:00-18:00", days: "Viernes a Sábado" },
        { image: therapist1, name: "Dr. Pedro Doe", info: "Especialista en terapia cognitivo-conductual.", schedule: "12:45-15:00", days: "Lunes a Miércoles" },
        { image: therapist2, name: "Dr. Juan Smith", info: "Experto en psicología clínica y de la salud.", schedule: "10:00-12:00", days: "Martes y Jueves" },
        { image: therapist3, name: "Dr. Lucas Johnson", info: "Terapeuta enfocado en terapia de pareja.", schedule: "16:00-18:00", days: "Viernes a Sábado" },
        // ... other therapists
    ];
    
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = therapists.slice(firstIndex, lastIndex);

   

  
    const totalPages = Math.ceil(therapists.length / itemsPerPage);

  // Actualiza tu función nextPage para que no avance más allá de la última página
    const nextPage = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

  // Creamos un array de los números de página para renderizarlos
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="my-0 md:px-14 px-4 max-w-screen-2xl mx-auto" id='servicios'>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
                <motion.div 
                variants={fadeIn('up', 0.3)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }}
                className="container mx-auto mt-32"
                >
                <div className="text-center">
                    <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Terapeutas Disponibles</h2>
                    <p className="text-tartiary md:w-1/3 mx-auto px-4">Lista de todos los terapeutas y sus horarios:</p>    
                </div>

                <div className="bg-white shadow-xl rounded-lg p-6">
                    <motion.div 
                                variants={fadeIn('up', 0.3)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{ once: false, amount: 0.7 }}
                                className="w-full lg:w-3/4 mx-auto"
                            >
                                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center md:gap-12 gap-8 justify-items-center'>    
                                    {currentItems.map((therapist, index) => (
                                        <FlipCard 
                                            key={index}
                                            image={therapist.image} 
                                            name={therapist.name}
                                            info={therapist.info}
                                            schedule={therapist.schedule}
                                            days={therapist.days}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                    <div className="flex justify-center mt-8">
                    <div className="flex justify-center mt-8 items-center">
      {/* Renderizamos los números de página */}
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

      {/* Renderizamos el botón de siguiente si no estamos en la última página */}
      {currentPage < totalPages && (
        <button
          onClick={nextPage}
          className="btn2"
        >
          Siguiente
        </button>
      )}
    </div>
                    </div>
                </div>
                </motion.div>
            </div>
        </div>
    );
};

const FlipCard = ({ image, name, info, schedule, days }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const cardContainerStyle = "relative w-full h-96 flex justify-center items-center cursor-pointer";
    const cardStyle = "absolute w-full h-full rounded-[35px] shadow-3xl flex justify-center items-center p-6";
    const cardFrontStyle = `${cardStyle} bg-[rgba(255,255,255,0.04)] flex-col p-8`;
    const cardBackStyle = `${cardStyle} bg-white text-base text-tartiary flex flex-col justify-center items-center`;

    return (
        <div className={cardContainerStyle} onClick={flipCard}>
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={cardFrontStyle}
                style={{ backfaceVisibility: "hidden" }}
            >
                <img src={image} alt={name} className="w-2/5 mb-4" />
                <h5 className="text-xl md:text-2xl lg:text-2xl text-primary font-semibold mt-4 text-center">{name}</h5>
                <p className="text-center mt-2">{info}</p>
            </motion.div>

            <motion.div
                animate={{ rotateY: isFlipped ? 0 : -180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={cardBackStyle}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
                <p className="text-center font-bold mb-2">Horarios Disponibles</p>
                <p className="text-center">{schedule}</p>
                <p className="text-center">{days}</p>
                <button className="mt-4 px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark" href="/formConsulta">Solicita un reserva</button>
            </motion.div>
        </div>
    );
};

export default Información;