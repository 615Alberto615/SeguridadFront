
import fb from '../../assets/fb.png'
import ig from '../../assets/ig.png'
import tw from '../../assets/tw.png'
import lk from '../../assets/lk.png'
import ct from '../../assets/info.png'
import info from '../../assets/info.gif'
import {motion} from 'framer-motion'; 
import {fadeIn } from '../../variants';

const Informacion = () => {
    return (
        <div className="md:px-16 p-4 max-w-screen-2xl mx-auto mt-28" id='home'>
            <motion.div 
             variants={fadeIn('up',0.2)}
             initial='hidden'
             whileInView={'show'}
             
            className="gradientBg rounded-xl rounded-br-[80px] md:p-9 px-4 py-9">
                <div className='flex flex-col md:flex-row-reverse justify-between items-center '>
                    <motion.div
                    variants={fadeIn('down',0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false,amount:0.7}}
                    >
                        {/* Agregar un texto descriptivo en el atributo alt */}
                        <img src={info} alt="Descripción de la imagen" className='lg:h-[286px]' />
                    </motion.div>
                    <motion.div 
                    variants={fadeIn('up',0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false,amount:0.7}}
                    
                    className="md:w-3/5">
                        <h2 className='md:text-7xl text-4xl font-bold text-white mb-6 leading-relaxed'>Información</h2>
                        <p className='text-[#EBEBEB] text-xl mb-8 text-justify'>Nuestra aplicación está diseñada para simplificar la gestión de tus citas psicológicas y terapéuticas, proporcionándote una plataforma ágil y confidencial para conectar con profesionales calificados de la UCB. Si tienes preguntas o necesitas más información, estamos aquí para ayudarte. Sigue nuestras redes sociales o <a href="mailto:info@ucb.com" className="text-blue-300 hover:underline">envíanos un correo</a> para descubrir más sobre cómo podemos apoyarte en tu camino hacia el bienestar.</p>

                        <div className='flex flex-col sm:flex-row gap-8 sm:items-center justify-between mt-20'>
                
                <div className='flex items-center space-x-5'>
                <a href="https://lpz.ucb.edu.bo/contacto/" target="_blank" rel="noopener noreferrer">
                    <img src={ct} alt="Facebook" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                </a>
                <a href="https://www.facebook.com/UCB.BOLIVIA/" target="_blank" rel="noopener noreferrer">
                    <img src={fb} alt="Facebook" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                </a>
                <a href="https://www.instagram.com/ucb.lapaz/" target="_blank" rel="noopener noreferrer">
                    <img src={ig} alt="Insta" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                </a>
                <a href="https://twitter.com/UCBLaPaz" target="_blank" rel="noopener noreferrer">
                    <img src={tw} alt="X" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                </a>
                <a href="https://bo.linkedin.com/company/ucb-lapaz" target="_blank" rel="noopener noreferrer">
                    <img src={lk} alt="link" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                </a>
                </div>
            </div>
    
                        
                    </motion.div>
                </div>
            </motion.div>

            
        </div>
    );
}    
export default Informacion;