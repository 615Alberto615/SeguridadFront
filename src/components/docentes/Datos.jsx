import { useState, useEffect } from 'react';
import { Radar, PolarArea, Line, Bar, Scatter } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, ArcElement, BarElement, ScatterController } from 'chart.js';

Chart.register(CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, ArcElement, BarElement, ScatterController);

const datosBase = [
    { id: 1, carrera: "Ingeniería", edad: 22, semestre: 6, altura: 175 },
    { id: 2, carrera: "Medicina", edad: 24, semestre: 8, altura: 170 },
    { id: 3, carrera: "Derecho", edad: 23, semestre: 7, altura: 168 },
    { id: 4, carrera: "Arquitectura", edad: 21, semestre: 5, altura: 172 },
    { id: 5, carrera: "Psicología", edad: 25, semestre: 9, altura: 165 }
];

const Datos = () => {
    const [filtroCarrera, setFiltroCarrera] = useState('');
    const [filtroEdad, setFiltroEdad] = useState('');
    const [filtroSemestre, setFiltroSemestre] = useState('');

    const [datosFiltrados, setDatosFiltrados] = useState(datosBase);

    useEffect(() => {
        const datosFiltrados = datosBase.filter(dato =>
            dato.carrera.toLowerCase().includes(filtroCarrera.toLowerCase()) &&
            dato.edad.toString().includes(filtroEdad) &&
            dato.semestre.toString().includes(filtroSemestre)
        );
        setDatosFiltrados(datosFiltrados);
    }, [filtroCarrera, filtroEdad, filtroSemestre]);

    const handleChange = (e, setFiltro) => {
        setFiltro(e.target.value);
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value + '°';
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
        }
    };

    const dataRadar = {
        labels: datosFiltrados.map(dato => dato.carrera),
        datasets: [{
            label: 'Edad por carrera',
            data: datosFiltrados.map(dato => dato.edad),
            backgroundColor: 'rgba(128, 0, 128, 0.6)',
            borderColor: 'rgba(128, 0, 128, 1)',
            borderWidth: 2
        }]
    };

    const dataPolarArea = {
        labels: datosFiltrados.map(dato => dato.carrera),
        datasets: [{
            data: datosFiltrados.map(dato => dato.semestre),
            backgroundColor: 'rgba(186, 85, 211, 0.6)',
            hoverOffset: 4
        }]
    };

    const dataLine = {
        labels: datosFiltrados.map(dato => dato.carrera),
        datasets: [{
            label: 'Semestre por carrera',
            data: datosFiltrados.map(dato => dato.semestre),
            fill: false,
            borderColor: 'rgba(74, 144, 226, 1)',
            pointBackgroundColor: 'rgba(74, 144, 226, 1)',
            pointBorderColor: '#ffffff',
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: 'rgba(74, 144, 226, 1)'
        }]
    };

    const dataBar = {
        labels: datosFiltrados.map(dato => dato.carrera),
        datasets: [{
            label: 'Altura por carrera',
            data: datosFiltrados.map(dato => dato.altura),
            backgroundColor: 'rgba(128, 0, 128, 0.6)',
            borderColor: 'rgba(128, 0, 128, 1)',
            borderWidth: 2
        }]
    };

    const dataScatter = {
        datasets: [{
            label: 'Edad vs Altura',
            data: datosFiltrados.map(dato => ({ x: dato.edad, y: dato.altura })),
            backgroundColor: 'rgba(186, 85, 211, 0.6)',
            borderColor: 'rgba(186, 85, 211, 1)',
            borderWidth: 2,
            pointRadius: 5
        }]
    };

    return (
        <div className="container mx-auto mt-20 bg-black p-6 rounded-lg shadow-xl">
            <div className="bg-white p-6 rounded-lg">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Filtrar por carrera..."
                        value={filtroCarrera}
                        onChange={(e) => handleChange(e, setFiltroCarrera)}
                        className="border rounded-md p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Filtrar por edad..."
                        value={filtroEdad}
                        onChange={(e) => handleChange(e, setFiltroEdad)}
                        className="border rounded-md p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Filtrar por semestre..."
                        value={filtroSemestre}
                        onChange={(e) => handleChange(e, setFiltroSemestre)}
                        className="border rounded-md p-2 w-full"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Edad por carrera (Radar Chart)</h2>
                        <Radar data={dataRadar} options={chartOptions} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Distribución por semestre (Polar Area Chart)</h2>
                        <PolarArea data={dataPolarArea} options={chartOptions} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Semestre por carrera (Line Chart)</h2>
                        <Line data={dataLine} options={chartOptions} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Altura por carrera (Bar Chart)</h2>
                        <Bar data={dataBar} options={chartOptions} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Edad vs Altura (Scatter Chart)</h2>
                        <Scatter data={dataScatter} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Datos;
