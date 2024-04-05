import about from "../assets/about.jpg";

import {motion} from 'framer-motion'; 
import {fadeIn } from '../variants';
const About = () => {
    return (
        <div className="md:px-14 p-4 max-w-s mx-auto space-y-10" id="informacion">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <motion.div 
                variants={fadeIn('right',0.2)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.7}}

                className="md:w-1/2">
                    <img src={about} alt="" />
                </motion.div>
                <motion.div 
                variants={fadeIn('left',0.3)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.7}}
                className="md:w-2/5">
                    <h2 className="md:text-5xl font-bold text-primary mb-5 leading-normal">Tu Espacio,
                    <span className="text-secondary"> tu Momento.</span></h2>
                    <p className="text-tariary text-lg mb-7">Explora la libertad de elegir tu camino hacia el bienestar. Con solo unos clics, selecciona el especialista y el momento perfecto para ti en la UCB.</p>
                        <button className="btnPrimary">Agenda tu Cita</button>
                </motion.div>
            </div>
           

            
        </div>
    );
};
export default About;