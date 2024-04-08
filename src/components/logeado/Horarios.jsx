import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import therapist1 from '../../assets/profile.png';
import therapist2 from '../../assets/profile.png';
import therapist3 from '../../assets/profile.png';

const Información = () => {
    // Data for therapists could be fetched from an API or defined here as a list
    const therapists = [
        {
            image: therapist1,
            name: "Dr. Jane Doe",
            info: "Especialista en terapia cognitivo-conductual.",
            schedule: "12:45-15:00",
            days: "Lunes a Miércoles"
        },
        {
            image: therapist2,
            name: "Dr. John Smith",
            info: "Experto en psicología clínica y de la salud.",
            schedule: "10:00-12:00",
            days: "Martes y Jueves"
        },
        {
            image: therapist3,
            name: "Dr. Alex Johnson",
            info: "Terapeuta enfocado en terapia de pareja.",
            schedule: "16:00-18:00",
            days: "Viernes a Sábado"
        },
        // ... other therapists
    ];

    return (
        <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto" id='servicios'>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                {/* Information Section */}
                <motion.div 
                    variants={fadeIn('right', 0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.7 }}
                    className="lg:w-1/4"
                >
                    <h3 className="text-3xl text-primary font-bold lg:w-1/2 mb-3">Atención Psicológica</h3>
                    <p className="text-base text-tartiary">Ofrecemos un servicio de atención psicológica con horarios flexibles y profesionales especializados.</p>
                </motion.div>
                
                {/* Cards Section */}
                <motion.div 
                    variants={fadeIn('up', 0.3)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.7 }}
                    className="w-full lg:w-3/4"
                >
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>    
                        {therapists.map((therapist, index) => (
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
            </div>
        </div>
    );
}

const FlipCard = ({ image, name, info, schedule, days }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const cardContainerStyle = "relative w-full h-96 flex justify-center items-center cursor-pointer";
    const cardStyle = "absolute w-full h-full rounded-[35px] shadow-3xl flex justify-center items-center p-6";
    const cardFrontStyle = `${cardStyle} bg-[rgba(255,255,255,0.04)] flex-col p-8`;
    const cardBackStyle = `${cardStyle} bg-white text-base text-tartiary`;

    return (
        <div className={cardContainerStyle} onClick={flipCard}>
            {/* Front of the card */}
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

            {/* Back of the card */}
            <motion.div
                animate={{ rotateY: isFlipped ? 0 : -180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={cardBackStyle}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
                <p className="text-center font-bold mb-2">Horarios Disponibles</p>
                <p className="text-center">{schedule}</p>
                <p className="text-center">{days}</p>
            </motion.div>
        </div>
    );
};

export default Información;
