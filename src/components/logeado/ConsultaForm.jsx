import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const ConsultaForm = () => {
  const [formActivo] = useState(false);
  const [carrera, setCarrera] = useState('');
  const [nombre, setNombre] = useState('');
  const [semestre, setSemestre] = useState('');
  const [edad, setEdad] = useState('');
  const [motivo, setMotivo] = useState('');
  const [inforel, setInforel] = useState('');
  const [sexo, setSexo] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState('');

  const carreras = ["Psicologia","Ing. Comercial", "Ing. de sistemas", "Ing. ambiental", "Derecho"];

  const { addConsulta } = 0;

  const validateForm = () => {
    if (!carrera) {
      setError('Seleccione la carrera a la que pertenece.');
      return false;
    }
    if (!nombre) {
      setError('Ingrese su nombre completo.');
      return false;
    }
    if (!semestre && semestre>=0 && semestre<=30) {
      setError('Ingrese su semestre o un semestre valido.');
      return false;
    }
    if (!edad && edad>=0) {
        setError('Ingrese su edad o una edad valida.');
        return false;
      }
    
      if (!sexo) {
        setError('Ingrese el sexo al que pertenece.');
        return false;
      }
      if (!motivo) {
        setError('Ingrese el motivo de consulta completo.');
        return false;
      }
      if (!inforel) {
        setError('Ingrese su informacion clinica relevante si no tiene ingrese "ninguna".');
        return false;
      }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    const formData = {
      nombre,  
      carrera,
      semestre,
      edad,
      sexo,
      motivo,
      inforel,
      status: formActivo,
    };

    try {
      await addConsulta(1, formData); // Asumiendo que 1 es el ID del paciente
      setShowSuccessMessage(true);
      setError(''); // Limpia errores previos
      setTimeout(() => setShowSuccessMessage(false), 3000); // Oculta el mensaje después de 3 segundos
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setError('Ocurrió un error al registrar la solicitud.');
    }
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-24"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto ">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Registro solicitud de reserva</h2>
        {showSuccessMessage && (
          <div className="text-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Solicitud reegistrada con exito.
          </div>
        )}
        {error && (
          <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
                <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

          <div>
            <label htmlFor="carrera" className="block text-sm font-medium text-gray-700">Carrera:</label>
            <select
              id="carrera"
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Seleccione un tipo</option>
              {carreras.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
              {/**/}
          <div>
            <label htmlFor="semestre" className="block text-sm font-medium text-gray-700">Semestre:</label>
            <input
              type="text"
              id="semestre"
              value={semestre}
              onChange={(e) => setSemestre(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="edad" className="block text-sm font-medium text-gray-700">Edad:</label>
            <input
              type="text"
              id="edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">Sexo:</label>
            <input
              type="text"
              id="sexo"
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="motivo" className="block text-sm font-medium text-gray-700">Motivo de la consulta:</label>
            <input
              type="text"
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="mt-1 block w-full rounded-md border-black-300  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="inforel" className="block text-sm font-medium text-gray-700">Información Clinica Relevante:</label>
            <input
              type="text"
              id="inforel"
              value={inforel}
              onChange={(e) => setInforel(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
{/* <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Alergia activa</span>
            <button
              type="button"
              onClick={() => setAlergiaActiva(!alergiaActiva)}
              className={`${alergiaActiva ? 'bg-green-500' : 'bg-red-500'} rounded-full px-3 py-1 text-white`}
            >
              {alergiaActiva ? 'Activa' : 'Inactiva'}
            </button>
          </div>
*/}
         
          <button
            type="submit"
            className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded
            hover:bg-primary transition-all duration-300"
          >
            Registrar
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ConsultaForm;
