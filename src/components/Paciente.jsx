import { useState } from 'react';

const pacientes = [
    { id: 1, nombre: "Juan", apellidoPaterno: "Pérez", apellidoMaterno: "García", tratamiento: true, genero: "Masculino", carrera: "Medicina", edad: 25, celular: "123456789", direccion: "Calle 123", ci: "1234567", correo: "juan.perez@email.com" },
    { id: 2, nombre: "María", apellidoPaterno: "Gómez", apellidoMaterno: "López", tratamiento: false, genero: "Femenino", carrera: "Enfermería", edad: 22, celular: "987654321", direccion: "Avenida 456", ci: "7654321", correo: "" },
    { id: 3, nombre: "Pedro", apellidoPaterno: "Ramírez", apellidoMaterno: "Hernández", tratamiento: true, genero: "Masculino", carrera: "Odontología", edad: 30, celular: "456789123", direccion: "Calle 789", ci: "4567123", correo: "" },
    { id: 4, nombre: "Ana", apellidoPaterno: "Martínez", apellidoMaterno: "Sánchez", tratamiento: false, genero: "Femenino", carrera: "Psicología", edad: 28, celular: "789123456", direccion: "Avenida 123", ci: "7123456", correo: "" },
    { id: 5, nombre: "Luis", apellidoPaterno: "Gutiérrez", apellidoMaterno: "Torres", tratamiento: true, genero: "Masculino", carrera: "Enfermería", edad: 23, celular: "654321987", direccion: "Calle 456", ci: "3456712", correo: "" },
    { id: 6, nombre: "Sofía", apellidoPaterno: "Hernández", apellidoMaterno: "Gómez", tratamiento: false, genero: "Femenino", carrera: "Medicina", edad: 26, celular: "321987654", direccion: "Avenida 789", ci: "5671234", correo: "" },
    { id: 7, nombre: "Carlos", apellidoPaterno: "Torres", apellidoMaterno: "Martínez", tratamiento: true, genero: "Masculino", carrera: "Odontología", edad: 31, celular: "987654321", direccion: "Calle 123", ci: "1234567", correo: "" },
    { id: 8, nombre: "Laura", apellidoPaterno: "Gómez", apellidoMaterno: "Hernández", tratamiento: false, genero: "Femenino", carrera: "Psicología", edad: 29, celular: "456789123", direccion: "Avenida 456", ci: "7654321", correo: "" },
    { id: 9, nombre: "Javier", apellidoPaterno: "Martínez", apellidoMaterno: "Sánchez", tratamiento: true, genero: "Masculino", carrera: "Medicina", edad: 24, celular: "789123456", direccion: "Calle 789", ci: "4567123", correo: "" },
    { id: 10, nombre: "Marina", apellidoPaterno: "Gutiérrez", apellidoMaterno: "Torres", tratamiento: false, genero: "Femenino", carrera: "Enfermería", edad: 27, celular: "654321987", direccion: "Avenida 123", ci: "7123456", correo: "" },
    { id: 11, nombre: "José", apellidoPaterno: "Hernández", apellidoMaterno: "Gómez", tratamiento: true, genero: "Masculino", carrera: "Odontología", edad: 32, celular: "321987654", direccion: "Calle 456", ci: "3456712", correo: "" },
    { id: 12, nombre: "Fernanda", apellidoPaterno: "Torres", apellidoMaterno: "Martínez", tratamiento: false, genero: "Femenino", carrera: "Psicología", edad: 30, celular: "987654321", direccion: "Avenida 789", ci: "5671234", correo: "" },

    // Más pacientes aquí
];

const Pacientes = () => {
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const pacientesPorPagina = 10;

    const filtrarPacientes = () => {
        return pacientes.filter(paciente =>
            paciente.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            paciente.apellidoPaterno.toLowerCase().includes(filtro.toLowerCase()) ||
            paciente.apellidoMaterno.toLowerCase().includes(filtro.toLowerCase())
        );
    };

    const paginarPacientes = () => {
        const indiceUltimoPaciente = paginaActual * pacientesPorPagina;
        const indicePrimerPaciente = indiceUltimoPaciente - pacientesPorPagina;
        return filtrarPacientes().slice(indicePrimerPaciente, indiceUltimoPaciente);
    };

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const mostrarInfoPaciente = (paciente) => {
        setPacienteSeleccionado(paciente);
    };

    const cerrarModal = () => {
        setPacienteSeleccionado(null);
    };

    const numeroPaginas = Math.ceil(filtrarPacientes().length / pacientesPorPagina);

    return (
        <div className="container mx-auto mt-20">
            <div className="bg-white shadow-xl rounded-lg p-6">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar paciente..."
                        value={filtro}
                        onChange={(e) => {
                            setPaginaActual(1); // Reiniciar página al cambiar el filtro
                            setFiltro(e.target.value);
                        }}
                        className="border rounded-md p-2 w-full"
                    />
                </div>
                <table className="min-w-full bg-white border rounded-md">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Apellido Paterno</th>
                        <th className="border px-4 py-2">Apellido Materno</th>
                        <th className="border px-4 py-2">Tratamiento</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginarPacientes().map((paciente) => (
                        <tr key={paciente.id} className="cursor-pointer hover:bg-gray-100" onClick={() => mostrarInfoPaciente(paciente)}>
                            <td className="border px-4 py-2">{paciente.nombre}</td>
                            <td className="border px-4 py-2">{paciente.apellidoPaterno}</td>
                            <td className="border px-4 py-2">{paciente.apellidoMaterno}</td>
                            <td className="border px-4 py-2">{paciente.tratamiento ? 'Sí' : 'No'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300 ease-in-out"
                        onClick={() => cambiarPagina(paginaActual - 1)}
                        disabled={paginaActual === 1}
                    >
                        Anterior
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300 ease-in-out"
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        disabled={paginaActual === numeroPaginas}
                    >
                        Siguiente
                    </button>
                </div>
                <div className="mt-4">
                    <span>Página {paginaActual} de {numeroPaginas}</span>
                </div>
            </div>
            {pacienteSeleccionado && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
                    <div className="bg-white rounded-lg p-8 max-w-xl z-50 overflow-y-auto">
                        <button className="absolute top-2 right-2 text-gray-700" onClick={cerrarModal}>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-semibold mb-4">{pacienteSeleccionado.nombre} {pacienteSeleccionado.apellidoPaterno} {pacienteSeleccionado.apellidoMaterno}</h2>
                        <p><strong>Tratamiento:</strong> {pacienteSeleccionado.tratamiento ? 'Sí' : 'No'}</p>
                        <p><strong>Género:</strong> {pacienteSeleccionado.genero}</p>
                        <p><strong>Carrera:</strong> {pacienteSeleccionado.carrera}</p>
                        <p><strong>Edad:</strong> {pacienteSeleccionado.edad}</p>
                        <p><strong>Celular:</strong> {pacienteSeleccionado.celular}</p>
                        <p><strong>Dirección:</strong> {pacienteSeleccionado.direccion}</p>
                        <p><strong>C.I.:</strong> {pacienteSeleccionado.ci}</p>
                        <p><strong>Correo:</strong> {pacienteSeleccionado.correo}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pacientes;
