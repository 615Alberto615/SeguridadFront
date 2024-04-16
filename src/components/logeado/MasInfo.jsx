
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const TherapistDetailModal = ({ isOpen, onClose, therapist }) => {
  if (!isOpen || !therapist) return null;

  // Datos fijos para el horario del terapeuta
  const weeklySchedule = {
    Lunes: '9:00 - 11:00',
    Martes: '10:00 - 12:00',
    Miércoles: '11:00 - 13:00',
    Jueves: '14:00 - 16:00',
    Viernes: '15:00 - 17:00',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        variants={fadeIn('up', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className="bg-white rounded-lg p-6 w-3/4 md:max-w-2xl mx-auto relative"
      >
        <button className="absolute top-4 right-4 text-2xl font-bold" onClick={onClose}>&times;</button>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2">Información del Terapeuta</h3>
          <img src={therapist.image} alt={therapist.name} className="w-24 h-24 mb-4" />
          <div className="text-center">
            <p>Nombre: {therapist.name}</p>
            <p>Información: {therapist.info}</p>
            <p>Horario Disponible: {therapist.schedule}</p>
            <p>Días disponibles: {therapist.days}</p>
          </div>
          {/* Tabla de horario */}
          <div className="w-full overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(weeklySchedule).map((day) => (
                    <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  {Object.values(weeklySchedule).map((schedule, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      {schedule}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TherapistDetailModal;
