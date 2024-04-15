import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const datosBase = [
    { id: 1, carrera: "Ingeniería", edad: 22, semestre: 6 },
    { id: 2, carrera: "Medicina", edad: 24, semestre: 8 },
    { id: 3, carrera: "Derecho", edad: 23, semestre: 7 },
    { id: 4, carrera: "Arquitectura", edad: 21, semestre: 5 },
    { id: 5, carrera: "Psicología", edad: 25, semestre: 9 },
    // Más datos aquí
];

const Datos = () => {
    const [filtro, setFiltro] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState(datosBase);

    const filtrarDatos = () => {
        const datosFiltrados = datosBase.filter(dato =>
            dato.carrera.toLowerCase().includes(filtro.toLowerCase()) ||
            dato.edad.toString().includes(filtro) ||
            dato.semestre.toString().includes(filtro)
        );
        setDatosFiltrados(datosFiltrados);
    };

    const handleChange = (e) => {
        setFiltro(e.target.value);
        filtrarDatos();
    };

    // Configuración de datos para el gráfico de barras
    const dataBar = {
        labels: datosFiltrados.map(dato => dato.carrera),
        datasets: [{
            label: 'Edad promedio por carrera',
            data: datosFiltrados.map(dato => dato.edad),
            backgroundColor: '#3182CE',
            borderColor: '#3182CE',
            borderWidth: 1
        }]
    };

    // Configuración de datos para el gráfico de torta
    const dataPie = {
        labels: datosFiltrados.map(dato => dato.carrera),
        datasets: [{
            data: datosFiltrados.map(dato => dato.semestre),
            backgroundColor: ['#F6AD55', '#68D391', '#4A90E2', '#A779E9', '#ED64A6'],
            hoverOffset: 4
        }]
    };

    return (
        <div className="container mx-auto mt-20">
            <div className="bg-white shadow-xl rounded-lg p-6">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Filtrar por carrera, edad o semestre..."
                        value={filtro}
                        onChange={handleChange}
                        className="border rounded-md p-2 w-full"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Edad promedio por carrera</h2>
                        <Bar data={dataBar} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Distribución por semestre</h2>
                        <Pie data={dataPie} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Datos;
