import { useState, useEffect } from 'react';
import { Radar, PolarArea, Line, Bar, Scatter } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, ArcElement, BarElement, ScatterController } from 'chart.js';
import {fadeIn} from "../../variants.js";
import {motion} from "framer-motion";

Chart.register(CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, ArcElement, BarElement, ScatterController);

const datosBase = [
    { id: 1, nombre: "Ana López", edad: 22, rol: "docente", especializacion: "Matemáticas" },
    { id: 2, nombre: "Carlos Sánchez", edad: 24, rol: "estudiante", carrera: "Ingeniería", estado: "activo" },
    { id: 3, nombre: "Laura Fernández", edad: 23, rol: "estudiante", carrera: "Medicina", estado: "inactivo" },
    { id: 4, nombre: "Pedro Ramírez", edad: 21, rol: "docente", especializacion: "Física" },
    { id: 5, nombre: "María Gómez", edad: 25, rol: "estudiante", carrera: "Derecho", estado: "activo" },
    { id: 6, nombre: "José Torres", edad: 26, rol: "estudiante", carrera: "Arquitectura", estado: "inactivo" },
    { id: 7, nombre: "Sofía Martínez", edad: 27, rol: "docente", especializacion: "Historia" },
    { id: 8, nombre: "Luis Hernández", edad: 28, rol: "estudiante", carrera: "Psicología", estado: "activo" },
    { id: 9, nombre: "Fernanda Gutiérrez", edad: 29, rol: "estudiante", carrera: "Ingeniería", estado: "inactivo" },
    { id: 10, nombre: "Javier Ramírez", edad: 30, rol: "docente", especializacion: "Arte" },
    { id: 11, nombre: "Marina Gómez", edad: 31, rol: "estudiante", carrera: "Medicina", estado: "activo" },
    { id: 12, nombre: "Carlos López", edad: 32, rol: "estudiante", carrera: "Derecho", estado: "inactivo" },
    { id: 13, nombre: "Laura Martínez", edad: 33, rol: "docente", especializacion: "Biología" },
    { id: 14, nombre: "Juan Torres", edad: 34, rol: "estudiante", carrera: "Arquitectura", estado: "activo" },
    { id: 15, nombre: "Ana Martínez", edad: 35, rol: "estudiante", carrera: "Psicología", estado: "inactivo" },
    { id: 16, nombre: "Carlos Gómez", edad: 36, rol: "docente", especializacion: "Literatura" },
    { id: 17, nombre: "María Ramírez", edad: 37, rol: "estudiante", carrera: "Ingeniería", estado: "activo" },
    { id: 18, nombre: "José López", edad: 38, rol: "estudiante", carrera: "Medicina", estado: "inactivo" },
    { id: 19, nombre: "Laura Gómez", edad: 39, rol: "docente", especializacion: "Historia" },
    { id: 20, nombre: "Pedro Torres", edad: 40, rol: "estudiante", carrera: "Derecho", estado: "activo" },
    // Puedes agregar más datos aquí...
];

const Datos = () => {
    const [filtroRol, setFiltroRol] = useState('');
    const [filtroCarrera, setFiltroCarrera] = useState('');
    const [filtroEdad, setFiltroEdad] = useState('');

    const [datosFiltrados, setDatosFiltrados] = useState(datosBase);

    useEffect(() => {
        const datosFiltrados = datosBase.filter(dato =>
            dato.rol.toLowerCase().includes(filtroRol.toLowerCase()) &&
            (dato.carrera ? dato.carrera.toLowerCase().includes(filtroCarrera.toLowerCase()) : true) &&
            dato.edad.toString().includes(filtroEdad)
        );
        setDatosFiltrados(datosFiltrados);
    }, [filtroRol, filtroCarrera, filtroEdad]);


    const chartOptionsNeon = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value + ' personas';
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        elements: {
            line: {
                borderColor: '#a64ba6',
                borderWidth: 2
            },
            point: {
                backgroundColor: '#FF00FF'
            }
        }
    };

    const chartStyles = {
        borderWidth: 2,
        borderColor: '#bb5abb',
        borderStyle: 'solid',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20
    };

    // Datos para gráficos
    const labels = ['Docentes', 'Estudiantes'];
    const cantidadUsuarios = [datosFiltrados.filter(dato => dato.rol === 'docente').length, datosFiltrados.filter(dato => dato.rol === 'estudiante').length];
    const especializaciones = datosFiltrados.map(dato => dato.especializacion ? dato.especializacion.length : 0);

    const dataRadar = {
        labels: labels,
        datasets: [{
            label: 'Cantidad por rol',
            data: cantidadUsuarios,
            backgroundColor: 'rgba(128, 0, 128, 0.6)',
            borderColor: 'rgba(128, 0, 128, 1)',
            borderWidth: 2
        }]
    };

    const dataPolarArea = {
        labels: labels,
        datasets: [{
            data: cantidadUsuarios,
            backgroundColor: 'rgba(186, 85, 211, 0.6)',
            hoverOffset: 4
        }]
    };

    const dataLine = {
        labels: labels,
        datasets: [{
            label: 'Cantidad por rol',
            data: cantidadUsuarios,
            fill: false,
            borderColor: 'rgba(74, 144, 226, 1)',
            pointBackgroundColor: 'rgba(74, 144, 226, 1)',
            pointBorderColor: '#ffffff',
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: 'rgba(74, 144, 226, 1)'
        }]
    };

    const dataBar = {
        labels: labels,
        datasets: [{
            label: 'Cantidad por rol',
            data: cantidadUsuarios,
            backgroundColor: 'rgba(128, 0, 128, 0.6)',
            borderColor: 'rgba(128, 0, 128, 1)',
            borderWidth: 2
        }]
    };

    const dataScatter = {
        datasets: [{
            label: 'Edad vs Especialización',
            data: especializaciones.map((esp, index) => ({ x: esp, y: cantidadUsuarios[index] })),
            backgroundColor: 'rgba(186, 85, 211, 0.6)',
            borderColor: 'rgba(186, 85, 211, 1)',
            borderWidth: 2,
            pointRadius: 5
        }]
    };
    const renderFiltroSecundario = () => {
        if (filtroRol === 'estudiante') {
            return (
                <select className="border rounded-md p-2 mb-2" onChange={(e) => setFiltroCarrera(e.target.value)}>
                    <option value="">Filtrar por carrera...</option>
                    <option value="Ingeniería">Ingeniería</option>
                    <option value="Medicina">Medicina</option>
                    {/* Puedes agregar más opciones aquí... */}
                </select>
            );
        }
        return null;
    };

    return (
        <div className="container mx-auto mt-20 bg-black p-6 rounded-lg shadow-xl">
            <div className="bg-white p-6 rounded-lg">
                <motion.div
                    variants={fadeIn('right', 0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.7 }}
                    className="mb-8"
                >
                    <h3 className="text-4xl text-primary font-bold mb-4">📊 Graficos</h3>
                    <p className="text-lg text-tartiary mb-6">Visualiza de forma gráfica y dinámica la información de todos los usuarios registrados en Psique.</p>
                    <p className="text-base text-gray-600 mb-4">Utiliza los filtros para explorar tendencias, comparar datos y obtener insights valiosos sobre nuestra comunidad.</p>
                    <p className="text-sm text-gray-500">*Nota: Los gráficos se actualizan en tiempo real con los datos filtrados.</p>
                </motion.div>
                <div className="mb-4">
                    <select className="border rounded-md p-2 mb-2" onChange={(e) => setFiltroRol(e.target.value)}>
                        <option value="">Filtrar por rol...</option>
                        <option value="docente">Docente</option>
                        <option value="estudiante">Estudiante</option>
                    </select>
                    {filtroRol === 'estudiante' && (
                        <select className="border rounded-md p-2 mb-2" onChange={(e) => setFiltroCarrera(e.target.value)}>
                            <option value="">Filtrar por carrera...</option>
                            <option value="Ingeniería">Ingeniería</option>
                            <option value="Medicina">Medicina</option>
                        </select>
                    )}
                    <input
                        type="text"
                        placeholder="Filtrar por edad..."
                        value={filtroEdad}
                        onChange={(e) => setFiltroEdad(e.target.value)}
                        className="border rounded-md p-2 w-full"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Cantidad por rol (Radar Chart)</h2>
                        {renderFiltroSecundario()}
                        <Radar data={dataRadar} options={chartOptionsNeon} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Edad por carrera (Polar Area Chart)</h2>
                        <PolarArea data={dataPolarArea} options={chartOptionsNeon} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Especializaciones (Line Chart)</h2>
                        <Line data={dataLine} options={chartOptionsNeon} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Estado por carrera (Bar Chart)</h2>
                        <Bar data={dataBar} options={chartOptionsNeon} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Edad vs Especialización (Scatter Chart)</h2>
                        <Scatter data={dataScatter} options={chartOptionsNeon} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Datos;
