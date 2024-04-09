import { useState } from 'react';
import user from '../assets/user2.png';

const docentes = [
    { id: 1, nombre: "Juan Pérez", carnet: "123456", especialidad: "Matemáticas", edad: 40 },
    { id: 2, nombre: "Pérez Juan", carnet: "123456", especialidad: "Historia", edad: 35 },
    { id: 3, nombre: "Pedro Pérez", carnet: "123456", especialidad: "Literatura", edad: 45 },
    { id: 4, nombre: "María García", carnet: "654321", especialidad: "Física", edad: 38 },
    { id: 5, nombre: "Ana López", carnet: "987654", especialidad: "Química", edad: 42 },
    { id: 6, nombre: "Luis Rodríguez", carnet: "456789", especialidad: "Biología", edad: 39 },
    { id: 7, nombre: "Marta Martínez", carnet: "456123", especialidad: "Inglés", edad: 36 },
    // Más docentes aquí
];

const Docentes = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);

    const mostrarModal = (docente) => {
        setDocenteSeleccionado(docente);
    };

    const cerrarModal = () => {
        setDocenteSeleccionado(null);
    };

    const primerDocente = (paginaActual - 1) * 3;
    const ultimoDocente = primerDocente + 2;

    return (
        <div className="container mx-auto mt-20">
            <div className="bg-white shadow-xl rounded-lg p-6">
                <div className="flex overflow-x-auto space-x-4">
                    {docentes.slice(primerDocente, ultimoDocente + 1).map((docente) => (
                        <div key={docente.id} className="w-96 bg-gray-100 p-4 rounded-lg shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            <img src={user} alt="Docente" className="w-20 h-20 rounded-full mx-auto mb-4" />
                            <div>
                                <h2 className="text-lg font-semibold text-center">{docente.nombre}</h2>
                                <p className="text-gray-600 text-center">{docente.especialidad}</p>
                                <p className="text-gray-600 text-center">Edad: {docente.edad}</p>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => mostrarModal(docente)}>
                                    <svg className="w-6 h-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H5a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Más información
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                    <button className="mx-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300 ease-in-out" onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual <= 1}>
                        Anterior
                    </button>
                    <button className="mx-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300 ease-in-out" onClick={() => setPaginaActual(paginaActual + 1)} disabled={ultimoDocente >= docentes.length}>
                        Siguiente
                    </button>
                </div>
            </div>
            {docenteSeleccionado && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
                    <div className="bg-white rounded-lg p-8 max-w-lg z-50">
                        <div className="flex justify-end">
                            <button className="text-red-500 text-2xl font-bold" onClick={cerrarModal}>Cerrar</button>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded shadow-lg">
                            {/* Aquí puedes agregar el icono del usuario */}
                            <div className="mb-4">
                                <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4zm8 9a4 4 0 100-8 4 4 0 000 8zm-4 6a4 4 0 108 0H8z" />
                                </svg>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Nombre:</span>
                                <span className="text-lg">{docenteSeleccionado.nombre}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Especialidad:</span>
                                <span className="text-lg">{docenteSeleccionado.especialidad}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Edad:</span>
                                <span className="text-lg">{docenteSeleccionado.edad}</span>
                            </div>
                            <div className="flex justify-between w-full mb-2">
                                <span className="font-bold text-lg">Carnet:</span>
                                <span className="text-lg">{docenteSeleccionado.carnet}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Docentes;
