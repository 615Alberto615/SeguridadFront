import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import therapist1 from '../../assets/profile3.png';
import { format, parseISO, addDays } from 'date-fns';

const TherapistDetailModal = ({ isOpen, onClose, therapist }) => {
  if (!isOpen) return null;

  // Función para formatear la fecha añadiendo un día
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    const newDate = addDays(date, 1);
    return format(newDate, 'dd/MM/yyyy');
  };

  // Función para manejar el clic fuera del modal
  const handleBackdropClick = (event) => {
    // Si se hace clic en el contenedor directamente, se cierra el modal
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleBackdropClick}>
      <motion.div
        variants={fadeIn('up', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className="bg-white rounded-lg p-6 w-3/4 md:max-w-2xl mx-auto relative"
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido propague al fondo
      >
        <button className="absolute top-0 right-0 mt-4 mr-4 text-2xl font-bold" onClick={onClose}>&times;</button>
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <img src={therapist1} className="w-12 h-12 bg-gray-300 flex justify-center items-center rounded-full" />
            <div className="text-right">
              <h2 className="text-xl font-semibold mr-16">Fecha:</h2>
              <p className="text-lg mr-4">{formatDate(therapist?.startTime)}</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold my-4">Motivo de la consulta:</h3>
          <p className="text-sm mb-4">{therapist?.reason}</p>
          
          <div className="flex">
            <div className="flex-1">
              <h4 className="text-lg font-bold">Horario de reserva</h4>
              <p className="text-md">{therapist?.availability?.weekday} a las: {therapist?.availability?.startTime}</p>
            </div>
            
            <div className="flex-1">
              <h4 className="text-lg font-bold">Consulta a cargo de:</h4>
              <p className="text-md">{therapist?.availability?.user?.people?.name} {therapist?.availability?.user?.people?.firstLastname} {therapist?.availability?.user?.people?.secondLastname}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-4">
            <div className="flex-1">
              <h4 className="text-lg font-bold">Observaciones:</h4>
              <p className="text-sm">{therapist?.typeQuotes}</p>
            </div>
            
            <div className="flex-1 md:mt-4">
              <h4 className="text-lg font-bold">Prescripción terapéutica:</h4>
              <p className="text-sm">{therapist?.typeQuotes}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TherapistDetailModal;
