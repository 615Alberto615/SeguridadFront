import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import ov1 from '../assets/user1.png';
import ov2 from '../assets/user2.png';
import ov3 from '../assets/user3.png';

// Lista de docentes
const docentesList = [
    { id: 1, image: ov1, name: "Dr. Juan Pérez", specialty: "Matemáticas", age: 40 },
    { id: 2, image: ov2, name: "Lic. María García", specialty: "Física", age: 38 },
    { id: 3, image: ov3, name: "Mtra. Laura Fernández", specialty: "Arte", age: 41 },
    { id: 4, image: ov3, name: "Dr. Carlos López", specialty: "Historia", age: 39 },
    { id: 5, image: ov1, name: "Lic. Ana Martínez", specialty: "Biología", age: 37 },
    { id: 6, image: ov2, name: "Mtra. José Rodríguez", specialty: "Literatura", age: 42 },
];

const ITEMS_PER_PAGE = 3;

const Docentes = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculamos el rango de docentes a mostrar en la página actual
    const indexOfLastDocente = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstDocente = indexOfLastDocente - ITEMS_PER_PAGE;
    const currentDocentes = docentesList.slice(indexOfFirstDocente, indexOfLastDocente);

    const totalPages = Math.ceil(docentesList.length / ITEMS_PER_PAGE);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto" id='docentes'>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                <motion.div
                    variants={fadeIn('right',0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false,amount:0.7}}
                    className="lg:w-1/4">
                    <h3 className="text-3xl text-primary font-bold lg:w-1/2 mb-3">Nuestro Equipo Docente</h3>
                    <p className="text-base text-tartiary">Conoce a nuestro equipo de docentes altamente calificados que están comprometidos con tu formación académica.</p>
                </motion.div>
                <motion.div
                    variants={fadeIn('up',0.3)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false,amount:0.7}}
                    className="w-full lg:w-3/4">
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>
                        {currentDocentes.map(docente => (
                            <FlipCard
                                key={docente.id}
                                image={docente.image}
                                frontTitle={docente.name}
                                backText={`Especialidad: ${docente.specialty}, Edad: ${docente.age}`}
                            />
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`mx-1 px-4 py-2 rounded ${currentPage === pageNumber ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const FlipCard = ({ image, frontTitle, backText }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    // Estilos de las tarjetas
    const cardContainerStyle = `relative w-full h-96 flex justify-center items-center cursor-pointer`;
    const cardStyle = `absolute w-full h-full rounded-[35px] shadow-3xl flex justify-center items-center p-6`;
    const cardFrontStyle = `${cardStyle} bg-[rgba(255,255,255,0.04)] flex-col p-8`;
    const cardBackStyle = `${cardStyle}  text-base text-tartiary`;
    const imageSizeClass = 'w-40';

    return (
        <div className={cardContainerStyle} onClick={flipCard}>
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={cardFrontStyle}
                style={{ backfaceVisibility: "hidden" }}
            >
                <img src={image} alt={frontTitle} className={imageSizeClass} />
                <h5 className="text-xl md:text-2xl lg:text-2xl text-primary font-semibold mt-4 text-center">{frontTitle}</h5>
            </motion.div>

            <motion.div
                animate={{ rotateY: isFlipped ? 0 : -180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={cardBackStyle}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
                <p className="text-center text-base md:text-1xl">{backText}</p>
            </motion.div>
        </div>
    );
};

export default Docentes;
