import {motion} from 'framer-motion'; 
import {fadeIn } from '../variants';


const Banner = ({ banner, heading, subheading, bt1, bt2 }) => {
    return (
        <div>
            <div className="gradientBg rounded-xl rounded-br-[80px] md:p-9 px-4 py-9">
                <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-10'>
                    <motion.div
                    variants={fadeIn('down',0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false,amount:0.7}}
                    >
                        {/* Agregar un texto descriptivo en el atributo alt */}
                        <img src={banner} alt="Descripción de la imagen" className='lg:h-[386px]' />
                    </motion.div>
                    <motion.div 
                    variants={fadeIn('up',0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false,amount:0.7}}
                    
                    className="md:w-3/5">
                        <h2 className='md:text-7xl text-4xl font-bold text-white mb-6 leading-relaxed'>{heading}</h2>
                        <p className='text-[#EBEBEB] text-2xl mb-8'>{subheading}</p>
                        <div className='space-x-5 space-y-4'> {/* Corregido de 'xpace-y-4' a 'space-y-4' */}
                        {
                            (bt1 && bt1 !== "") && <button className='btnPrimary'>{bt1}</button>
                        }
                        {
                            (bt2 && bt2 !== "") && <button className='btnPrimary'>{bt2}</button>
                        }
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
