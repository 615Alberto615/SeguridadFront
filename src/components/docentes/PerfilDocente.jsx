import { useState } from 'react';

const PerfilDocente = () => {
    const [docente, ] = useState({
        nombre: "Juan",
        apellidoPaterno: "Pérez",
        apellidoMaterno: "García",
        direccion: "Calle 123, Ciudad",
        telefono: "123456789",
        usuario: "juan.perez",
        genero: "Masculino",
        ocupacion: "Docente",
        edad: 35,
        password: "********"
    });

    return (
        <div className="container mx-auto mt-20">
            <div className="bg-white shadow-lg rounded-xl p-8">
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
                    {/* Imagen de ejemplo de usuario */}
                    <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center text-6xl text-gray-500">
                        JD {/* Iniciales del docente */}
                    </div>
                    <div className="flex flex-col space-y-6">
                        <h2 className="text-4xl font-semibold mb-4">
                            {docente.nombre} {docente.apellidoPaterno} {docente.apellidoMaterno}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center">
                                <strong className="w-32 inline-block text-lg">Dirección:</strong>
                                <span className="text-lg">{docente.direccion}</span>
                            </div>
                            <div className="flex items-center">
                                <strong className="w-32 inline-block text-lg">Teléfono:</strong>
                                <span className="text-lg">{docente.telefono}</span>
                            </div>
                            <div className="flex items-center">
                                <strong className="w-32 inline-block text-lg">Usuario:</strong>
                                <span className="text-lg">{docente.usuario}</span>
                            </div>
                            <div className="flex items-center">
                                <strong className="w-32 inline-block text-lg">Contraseña:</strong>
                                <div className="border rounded-md p-2">
                                    <span className="text-gray-500">{docente.password}</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <strong className="w-32 inline-block text-lg">Género:</strong>
                                <span className="text-lg">{docente.genero}</span>
                            </div>
                            <div className="flex items-center">
                                <strong className="w-32 inline-block text-lg">Ocupación:</strong>
                                <span className="text-lg">{docente.ocupacion}</span>
                            </div>
                            <div className="flex items-center">
                                <strong className="w-32 inline-block text-lg">Edad:</strong>
                                <span className="text-lg">{docente.edad}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilDocente;
