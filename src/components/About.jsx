import about from "../assets/about2.png";
import about2 from "../assets/ab3.png";
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
                    <h2 className="md:text-5xl font-bold text-primary mb-5 leading-normal">Cuidado de Excelencia,
                    <span className="text-secondary"> resultados Excepcionales.</span></h2>
                    <p className="text-tariary text-lg mb-7">Aplicamos conocimiento avanzado y equipamiento de punta para ofrecer tratamientos personalizados que marcan la diferencia en su salud.</p>
                        <button className="btnPrimary">Get Started</button>
                </motion.div>
            </div>
           

            {/* segunda*/}
            <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-8">
                <motion.div 
                variants={fadeIn('up',0.2)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.7}}

                className="md:w-1/2">
                    <img src={about2} alt="" />
                </motion.div>
                <motion.div 
                variants={fadeIn('right',0.2)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.7}}
                
                className="md:w-2/5">
                    <h2 className="md:text-5xl font-bold text-primary mb-5 leading-normal">Su Recuperación,
                    <span className="text-secondary"> en Su Tiempo Ideal.</span></h2>
                    <p className="text-tariary text-lg mb-7">Alineamos su tratamiento con su vida, no al revés, proporcionando flexibilidad y comodidad para una recuperación que se adapta a su agenda.</p>
                        <button className="btnPrimary">Get Started</button>
                </motion.div>
            </div>
        </div>
    );
};
export default About;