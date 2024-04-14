import React from 'react';
import { FaRegQuestionCircle, FaPhone, FaRegCommentDots } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import about from "../assets/about.jpg";

const Help = () => {
    return (
        <div className="md:px-14 p-4 max-w-s mx-auto space-y-10" id="help">
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
                    <h2 className="md:text-5xl font-bold text-primary mb-5 leading-normal">Necesita ayuda?</h2>
                    <p className="text-tariary text-lg mb-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="help-options">
                        <FaRegQuestionCircle />
                        <FaPhone />
                        <FaRegCommentDots />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Help;
