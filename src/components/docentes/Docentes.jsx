import { useEffect,  useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants.js';
import useDocenteStore from '../../store/useDocenteStore';
import ov3 from '../../assets/user3.png';

const Docentes = () => {
    const {
        displayedDocentes,
        currentPage,
        totalPages,
        setCurrentPage,
        fetchAllDocentes,
        error,
    } = useDocenteStore();

    useEffect(() => {
        fetchAllDocentes();
    }, [fetchAllDocentes]);

    if (error){
        return <div className='error'>{error}</div>
    }

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    function calculateAge(birthdate) {
        if (!birthdate) {
            return 'Desconocida';
        }
        const birthday = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        const m = today.getMonth() - birthday.getMonth();
    
        if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        return age;
    }
    
    

    return (
        <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto mt-40" id='docentes'>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                <motion.div
                    variants={fadeIn('right', 0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    
                    className="lg:w-1/4">
                    <h3 className="text-3xl text-primary font-bold lg:w-1/2 mb-3">Nuestro Equipo Docente</h3>
                    <p className="text-base text-tartiary">
                        Conoce a nuestro equipo de docentes altamente calificados que están comprometidos con tu formación académica.
                    </p>
                </motion.div>
                <motion.div
                    variants={fadeIn('up', 0.3)}
                    initial='hidden'
                    whileInView={'show'}
                    
                    className="w-full lg:w-3/4">
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>
                    {displayedDocentes.map((docente) => (
                        <FlipCard
                            key={docente.peopleId || docente.userId}  // Asegúrate de tener una clave única
                            image={ov3}
                            frontTitle={`${docente.name} ${docente.firstLastname} ${docente.secondLastname || ''}`}
                            backText={`Especialidad: ${docente.occupationId || 'No especificado'}, 
                                    Edad: ${docente.age ? calculateAge(docente.age) : 'Desconocida'}, 
                                    Correo Electrónico: ${docente.email || 'No disponible'}`}
                        />
                    ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                        {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageClick(i)}
                                className={`mx-1 px-4 py-2 rounded ${currentPage === i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                            >
                                {i + 1}
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

    const flipCard = () => setIsFlipped(!isFlipped);

    const cardContainerStyle = `relative w-full h-96 flex justify-center items-center cursor-pointer`;
    const cardStyle = `absolute w-full h-full rounded-[35px] shadow-3xl flex justify-center items-center p-6`;
    const cardFrontStyle = `${cardStyle} bg-[rgba(255,255,255,0.04)] flex-col p-8`;
    const cardBackStyle = `${cardStyle} text-base text-tartiary`;

    return (
        <div className={cardContainerStyle} onClick={flipCard}>
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={cardFrontStyle}
                style={{ backfaceVisibility: "hidden" }}>
                <img src={image} alt={frontTitle} className="w-40" />
                <h5 className="text-xl md:text-2xl lg:text-2xl text-primary font-semibold mt-4 text-center">{frontTitle}</h5>
            </motion.div>
            <motion.div
                animate={{ rotateY: isFlipped ? 0 : -180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={cardBackStyle}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <p className="text-center text-base md:text-1xl">{backText}</p>
            </motion.div>
        </div>
    );
};


export default Docentes;
