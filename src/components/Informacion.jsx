    import { useState } from 'react';
    import { motion } from 'framer-motion'; 
    import { fadeIn } from '../variants';
    import ov1 from '../assets/1.png';
    import ov2 from '../assets/2.jpg';
    import ov3 from '../assets/3.png';


    const Información = () => {
        return (
            <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto" id='servicios'>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                    <motion.div 
                    variants={fadeIn('right',0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false,amount:0.7}}
                    
                    className="lg:w-1/4">
                        <h3 className="text-3xl text-primary font-bold lg:w-1/2 mb-3">Atención Personalizada</h3>
                        <p className="text-base text-tartiary">La salud mental de nuestros estudiantes y personal es prioritaria. Ofrecemos un servicio ágil para agendar citas con profesionales calificados en psicología y terapia.</p>
                    </motion.div>
                    <motion.div 
                    variants={fadeIn('up',0.3)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false,amount:0.7}}
                    className="w-full lg:w-3/4">
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>    
                        <FlipCard 
                            image={ov1} 
                            backImage={ov1}
                            frontTitle="Agenda con Flexibilidad." 
                            backText="Visualiza horarios disponibles y reserva citas con terapeutas certificados según tu conveniencia."
                        />
                        <FlipCard 
                            image={ov2} 
                            backImage={ov2} 
                            frontTitle="Gestión de Citas" 
                            backText="Consulta y maneja tus citas programadas fácilmente, con opciones para cancelar o reprogramar según necesites."
                            className="md:mt-16"
                        />
                        <FlipCard 
                            image={ov3} 
                            backImage={ov3}
                            frontTitle="Información y Seguimiento." 
                            backText="Accede a detalles de cada sesión, observaciones del terapeuta y recomendaciones para tu proceso terapéutico."
                        />
                    </div> 
                </motion.div>
                </div>
            </div>
        );
    }
    const FlipCard = ({ image, backImage, frontTitle, backText, className }) => {
        const [isFlipped, setIsFlipped] = useState(false);
    
        const flipCard = () => {
            setIsFlipped(!isFlipped);
        };
    
        // Clases para las tarjetas.
        const cardContainerStyle = `relative w-full h-96 flex justify-center items-center cursor-pointer ${className}`;
        const cardStyle = `absolute w-full h-full rounded-[35px] shadow-3xl flex justify-center items-center p-6`;
        
    
        
        
        const cardFrontStyle = `${cardStyle} bg-[rgba(255,255,255,0.04)] flex-col p-8`;
        const cardBackStyle = `${cardStyle}  text-base text-tartiary`;
        // Ajustar tamaño de imagen del tercer card con una clase específica
        const imageSizeClass = image === ov3 ? 'w-2/5' : 'w-40';
    
        return (
            <div className={cardContainerStyle} onClick={flipCard}>
                {/* Parte delantera del card */}
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={cardFrontStyle}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img src={image} alt={frontTitle} className={imageSizeClass} />
                    <h5 className="text-xl md:text-2xl lg:text-2xl text-primary font-semibold mt-4 text-center">{frontTitle}</h5>
                </motion.div>
    
                {/* Parte trasera del card */}
                <motion.div
                    animate={{ rotateY: isFlipped ? 0 : -180 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={cardBackStyle}
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    {backImage && <img src={backImage} alt="Back" className="w-1/3 mb-4" />}
                    <p className="text-center text-base md:text-1xl">{backText}</p>
                </motion.div>
            </div>
        );
    };
    
    
    export default Información;