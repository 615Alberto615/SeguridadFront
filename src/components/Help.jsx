import fb from '../assets/fb.png'
import ig from '../assets/ig.png'
import tw from '../assets/tw.png'
import lk from '../assets/lk.png'
import ct from '../assets/info.png'

import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import about from "../assets/about.jpg";

const Help = () => {
    return (
        <div className="md:px-14 p-4 max-w-s mx-auto space-y-10 mt-28" id="help">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <motion.div
                    variants={fadeIn('right', 0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.7 }}
                    className="md:w-1/2"
                >
                    <img src={about} alt="" className="w-full h-auto object-cover" />
                </motion.div>
                <motion.div
                    variants={fadeIn('left', 0.3)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.7 }}
                    className="md:w-2/5"
                >
                    <h2 className="md:text-5xl font-bold text-primary mb-5 leading-normal">¿Necesita ayuda?</h2>
                    <p className='text-tariary text-lg mb-7 text-justify'>
                        Nuestra aplicación está diseñada para simplificar la gestión de citas psicológicas y terapéuticas, proporcionando una plataforma ágil y confidencial para conectar con profesionales calificados de la UCB. Si eres un usuario que necesita agendar citas o un profesional que brinda consultas, estamos aquí para asistirte. 
                        Para cualquier duda o información adicional, sigue nuestras redes sociales o 
                        <a href="mailto:info@ucb.com" className="text-blue-300 hover:underline"> envíanos un correo</a>.
                        Nuestro equipo está listo para apoyarte en tu camino hacia el bienestar.
                    </p>
                    
                    <div className='flex flex-col sm:flex-row gap-8 sm:items-center justify-between mt-20 bg-[#d6c5ee] h-10 rounded-xl'>
                        <div className='flex items-center space-x-5 ml-40'>
                            <a href="https://lpz.ucb.edu.bo/contacto/" target="_blank" rel="noopener noreferrer">
                                <img src={ct} alt="Contacto" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                            </a>
                            <a href="https://www.facebook.com/UCB.BOLIVIA/" target="_blank" rel="noopener noreferrer">
                                <img src={fb} alt="Facebook" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                            </a>
                            <a href="https://www.instagram.com/ucb.lapaz/" target="_blank" rel="noopener noreferrer">
                                <img src={ig} alt="Instagram" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                            </a>
                            <a href="https://twitter.com/UCBLaPaz" target="_blank" rel="noopener noreferrer">
                                <img src={tw} alt="Twitter" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                            </a>
                            <a href="https://bo.linkedin.com/company/ucb-lapaz" target="_blank" rel="noopener noreferrer">
                                <img src={lk} alt="LinkedIn" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Help;
