import { useState } from 'react';

const pacientes = [
    { id: 1, nombre: "Juan Pérez", edad: 40, diagnostico: "Hipertensión", tratamiento: "Losartán 50mg", fechaUltimaVisita: "01/04/2023", notas: "Paciente en tratamiento desde hace 2 años." },
    { id: 2, nombre: "María García", edad: 38, diagnostico: "Diabetes tipo 2", tratamiento: "Metformina 1000mg", fechaUltimaVisita: "15/03/2023", notas: "Control de azúcar en sangre estable." },
    { id: 3, nombre: "Pedro López", edad: 45, diagnostico: "Asma", tratamiento: "Salbutamol inhalador", fechaUltimaVisita: "20/02/2023", notas: "Mejoría en la función pulmonar." },
    { id: 4, nombre: "Laura Fernández", edad: 41, diagnostico: "Depresión", tratamiento: "Sertralina 50mg", fechaUltimaVisita: "10/04/2023", notas: "Mejoría en el estado de ánimo." },
    { id: 5, nombre: "Elena Ruiz", edad: 44, diagnostico: "Artritis reumatoide", tratamiento: "Metotrexato 15mg/semana", fechaUltimaVisita: "05/03/2023", notas: "Alivio del dolor en las articulaciones." },
    { id: 6, nombre: "Roberto Morales", edad: 40, diagnostico: "Gastritis crónica", tratamiento: "Omeprazol 20mg", fechaUltimaVisita: "18/03/2023", notas: "Recomendado dieta blanda." },
    // Más pacientes aquí
];

const HistorialClinicoDocente = () => {
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const pacientesPorPagina = 5;

    const filtrarPacientes = () => {
        return pacientes.filter(paciente =>
            paciente.nombre.toLowerCase().includes(filtro.toLowerCase())
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

    const abrirModal = (paciente) => {
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
                <div className="flex flex-wrap gap-4">
                    {paginarPacientes().map((paciente) => (
                        <div
                            key={paciente.id}
                            className="bg-gray-100 rounded-lg p-4 w-full cursor-pointer"
                            onClick={() => abrirModal(paciente)}
                        >
                            <h2 className="text-lg font-semibold mb-2">{paciente.nombre}</h2>
                            <p><strong>Edad:</strong> {paciente.edad}</p>
                            <p><strong>Diagnóstico:</strong> {paciente.diagnostico}</p>
                            <p><strong>Tratamiento:</strong> {paciente.tratamiento}</p>
                            <p><strong>Última visita:</strong> {paciente.fechaUltimaVisita}</p>
                            <p><strong>Notas:</strong> {paciente.notas}</p>
                        </div>
                    ))}
                </div>
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

                {/* Modal de información del paciente */}
                {pacienteSeleccionado && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-2xl font-semibold mb-4">{pacienteSeleccionado.nombre}</h2>
                            <p><strong>Edad:</strong> {pacienteSeleccionado.edad}</p>
                            <p><strong>Diagnóstico:</strong> {pacienteSeleccionado.diagnostico}</p>
                            <p><strong>Tratamiento:</strong> {pacienteSeleccionado.tratamiento}</p>
                            <p><strong>Última visita:</strong> {pacienteSeleccionado.fechaUltimaVisita}</p>
                            <p><strong>Notas:</strong> {pacienteSeleccionado.notas}</p>
                            <button
                                className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300 ease-in-out"
                                onClick={cerrarModal}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistorialClinicoDocente;
