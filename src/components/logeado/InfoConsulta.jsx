import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const TherapistDetailModal = ({ isOpen, onClose, therapist }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <motion.div
        variants={fadeIn('up', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className="bg-white rounded-lg p-6 w-3/4 md:max-w-2xl mx-auto relative"
      >
        {/* Close button */}
        <button className="absolute top-0 right-0 mt-4 mr-4 text-2xl font-bold" onClick={onClose}>&times;</button>
        
        {/* Therapist's information based on the provided layout */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            {/* Placeholder for icon */}
            
            <img src={therapist.image} alt={therapist.name} className="w-12 h-12 bg-gray-300 flex justify-center items-center rounded-full" />
            
            <div className="text-right">
              <h2 className="text-xl font-semibold mr-16">Fecha:</h2>
              <p className="text-lg mr-4    ">{therapist.date}</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold my-4">Motivo de la consulta:</h3>
          <p className="text-sm mb-4">{therapist.motive}</p>
          
          <div className="flex">
            {/* Schedule information */}
            <div className="flex-1">
              <h4 className="text-lg font-bold">Horario de reserva</h4>
              <p className="text-md">{therapist.schedule}</p>
            </div>
            
            {/* Therapist's details */}
            <div className="flex-1">
              <h4 className="text-lg font-bold">Consulta a cargo de:</h4>
              <p className="text-md">{therapist.therapistName}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-4">
            <div className="flex-1 md:mr-4">
              <h4 className="text-lg font-bold">Observaciones:</h4>
              <p className="text-sm">{therapist.observations}</p>
            </div>
            
            <div className="flex-1 md:ml-4 mt-4 md:mt-0">
              <h4 className="text-lg font-bold">Prescripción terapéutica:</h4>
              <p className="text-sm">{therapist.prescription}</p>
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default TherapistDetailModal;
