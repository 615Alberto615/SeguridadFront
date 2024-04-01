import { useState } from 'react';
import user from '../assets/user.png';
// Supongamos que tienes una lista de pacientes así, esto debería venir de tu backend o context
const pacientes = [
  { id: 1, nombre: "Juan Pérez", carnet: "123456" },
  { id: 2, nombre: "Pérez Juan", carnet: "123456" },
  { id: 3, nombre: "Pedro Pérez", carnet: "123456" },
  // Más pacientes aquí
];

const Pacientes = () => {
  // Estado para la paginación, suponiendo que cargas los pacientes de forma paginada desde tu backend
  const [paginaActual, setPaginaActual] = useState(1);
  
  // Aquí iría la lógica para obtener los pacientes según la página actual
  
  return (
    
    <div className="container mx-auto mt-20">
        <hr/><hr/><hr/><hr/>
      <div className="bg-white shadow-xl rounded-lg p-6">
        {/* Aquí podrías tener tu cabecera de la card */}
        {/* Usa flex flex-col para organizar los pacientes en una columna y items-center para centrarlos */}
        <div className="flex flex-col items-center -mx-3 mb-6">
          {/* Iterar sobre la lista de pacientes y mostrarlos */}
          {pacientes.map((paciente) => (
            <div key={paciente.id} className="w-full flex flex-col items-center mb-4">
              {/* Cada paciente en su propia card */}
              <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full max-w-sm">
                <img src={user} alt="Paciente" className="w-20 rounded-full" />
                <div>
                  <h2 className="text-lg font-semibold">{paciente.nombre}</h2>
                  <p className="text-gray-600">{paciente.carnet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Aquí podrías agregar la paginación */}
        <div className="flex justify-center mt-6">
          <button 
            className="mx-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300" 
            onClick={() => setPaginaActual(paginaActual - 1)}
            disabled={paginaActual <= 1}
          >
            Anterior
          </button>
          <button 
            className="btnPrimary"
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pacientes;
