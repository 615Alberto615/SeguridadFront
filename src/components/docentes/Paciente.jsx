import { useState, useEffect } from 'react';
import { fetchPatientsByRole } from "../../service/userService.js";

const Pacientes = () => {
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [numeroPaginas, setNumeroPaginas] = useState(1);

    const paginarPacientes = () => {
        const inicio = (paginaActual - 1) * 10;
        const fin = inicio + 10;
        return patients.filter(paciente => {
            const nombreCompleto = `${paciente.name} ${paciente.firstLastname} ${paciente.secondLastname}`;
            return nombreCompleto.toLowerCase().includes(filtro.toLowerCase());
        }).slice(inicio, fin);
    };

    const cambiarPagina = (pagina) => {
        setPaginaActual(pagina);
    };

    const mostrarInfoPaciente = (paciente) => {
        setSelectedPatient(paciente);
    };

    const cerrarModal = () => {
        setSelectedPatient(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchPatientsData = async () => {
            try {
                const patientsData = await fetchPatientsByRole('2', token);
                setPatients(patientsData);
                setNumeroPaginas(Math.ceil(patientsData.length / 10));
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchPatientsData();
    }, []);

    if (isLoading) {
        return <div className="text-center text-primary">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center text-primary">Error: {error.message}</div>;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white shadow-xl rounded-lg p-6 w-70 sm:w-auto md:w-3/4 lg:w-3/4 xl:w-3/4 space-y-8">
                {/* Filtro */}
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
                {/* Tabla de pacientes */}
                <table className="min-w-full bg-white border rounded-md">
                    {/* Cabecera de la tabla */}
                    <thead className="bg-primary text-white">
                    <tr>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Apellido Paterno</th>
                        <th className="border px-4 py-2">Apellido Materno</th>
                        <th className="border px-4 py-2">Tratamiento</th>
                    </tr>
                    </thead>
                    {/* Cuerpo de la tabla */}
                    <tbody>
                    {paginarPacientes().map((paciente) => (
                        <tr key={paciente.peopleId} className="cursor-pointer hover:bg-gray-100 transition duration-300" onClick={() => mostrarInfoPaciente(paciente)}>
                            <td className="border px-4 py-2">{paciente.name}</td>
                            <td className="border px-4 py-2">{paciente.firstLastname}</td>
                            <td className="border px-4 py-2">{paciente.secondLastname}</td>
                            <td className="border px-4 py-2">{paciente.treatment ? 'Sí' : 'No'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/* Paginación */}
                <div className="flex justify-between">
                    <button
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                        onClick={() => cambiarPagina(paginaActual - 1)}
                        disabled={paginaActual === 1}
                    >
                        Anterior
                    </button>
                    <button
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        disabled={paginaActual === numeroPaginas}
                    >
                        Siguiente
                    </button>
                </div>
                {/* Información de la página */}
                <div className="text-center text-primary">
                    <span>Página {paginaActual} de {numeroPaginas}</span>
                </div>
            </div>
            {/* Modal */}
            {selectedPatient && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 max-w-xl overflow-y-auto z-50 relative">
                        <button className="absolute top-2 right-2 text-gray-700" onClick={cerrarModal}>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <h2 className="text-3xl font-semibold mb-4 text-primary">Información del Paciente</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { key: 'name', label: 'Nombre' },
                                { key: 'firstLastname', label: 'Primer Apellido' },
                                { key: 'secondLastname', label: 'Segundo Apellido' },
                                { key: 'email', label: 'Email' },
                                { key: 'address', label: 'Dirección' },
                                { key: 'age', label: 'Edad' },
                                { key: 'cellphone', label: 'Celular' },
                                { key: 'ci', label: 'CI' },
                                
                            ].map(({ key, label }) => (
                                <div className="flex flex-col items-center space-y-2" key={key}>
                                    <strong className="text-lg font-semibold text-primary">{label}:</strong>
                                    <span className="text-lg break-words">{selectedPatient[key]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pacientes;
