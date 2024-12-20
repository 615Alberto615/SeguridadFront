import { useState, useEffect } from 'react';
import { Bar, Pie, Line, Scatter, PolarArea, Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, ArcElement, BarElement, LineElement, PointElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import { fetchPatientsByRole2 } from '../../service/userService';
import { fadeIn } from '../../variants';

Chart.register(CategoryScale, LinearScale, ArcElement, BarElement, LineElement, PointElement, RadialLinearScale, Tooltip, Legend);

const Datos = () => {
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtroRol, setFiltroRol] = useState('estudiante'); // Por defecto, rol "estudiante"
    const [, setFiltroCarrera] = useState('');
    const [filtroEdad, setFiltroEdad] = useState('');

    const fetchPatientsData = async (role) => {
        const token = localStorage.getItem('token');
        try {
            const roleId = role === 'docente' ? '3' : '2'; // Cambia el ID de rol según el filtro
            const response = await fetchPatientsByRole2(roleId, token);
            const patientsData = response.data;
            console.log('Fetched Patients Data:', patientsData); // Comprobación de consola
            setPatients(patientsData || []); // Asegurar que se establece un arreglo vacío si no hay datos
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching patients:', err); // Mensaje de error detallado
            setError(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPatientsData(filtroRol);
    }, [filtroRol]);

    if (isLoading) {
        return <div className="text-center text-primary">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center text-primary">Error: {error.message}</div>;
    }

    // Verificar si patients es un arreglo válido antes de procesar
    if (!Array.isArray(patients)) {
        console.error('Invalid patients data:', patients);
        return <div className="text-center text-primary">Datos inválidos recibidos.</div>;
    }

    // Filtrar pacientes por edad si se proporciona un filtro de edad
    const filteredPatients = filtroEdad ? patients.filter(patient => {
        const birthYear = new Date(patient.age).getFullYear();
        const age = new Date().getFullYear() - birthYear;
        return age.toString().includes(filtroEdad);
    }) : patients;

    // Procesar los datos para los gráficos
    const genderCounts = filteredPatients.reduce((acc, curr) => {
        const gender = curr.genderId?.name || 'Desconocido';
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
    }, {});

    const occupationCounts = filteredPatients.reduce((acc, curr) => {
        const occupation = curr.occupationId?.name || 'Desconocido';
        acc[occupation] = (acc[occupation] || 0) + 1;
        return acc;
    }, {});

    const semesterCounts = filteredPatients.reduce((acc, curr) => {
        const semester = curr.semesterId?.description || 'Desconocido';
        acc[semester] = (acc[semester] || 0) + 1;
        return acc;
    }, {});

    const ageGroups = {
        '18-25': 0,
        '26-35': 0,
        '36-45': 0,
        '46-55': 0,
        '56+': 0
    };

    filteredPatients.forEach(patient => {
        const birthYear = new Date(patient.age).getFullYear();
        const age = new Date().getFullYear() - birthYear;
        if (age >= 18 && age <= 25) ageGroups['18-25']++;
        else if (age >= 26 && age <= 35) ageGroups['26-35']++;
        else if (age >= 36 && age <= 45) ageGroups['36-45']++;
        else if (age >= 46 && age <= 55) ageGroups['46-55']++;
        else if (age >= 56) ageGroups['56+']++;
    });

    console.log('Gender Counts:', genderCounts); // Comprobación de consola
    console.log('Age Groups:', ageGroups); // Comprobación de consola

    const genderLabels = Object.keys(genderCounts);
    const genderData = Object.values(genderCounts);
    const ageLabels = Object.keys(ageGroups);
    const ageData = Object.values(ageGroups);
    const occupationLabels = Object.keys(occupationCounts);
    const occupationData = Object.values(occupationCounts);
    const semesterLabels = Object.keys(semesterCounts);
    const semesterData = Object.values(semesterCounts);

    // Datos para los gráficos adicionales
    const dataLineAge = {
        labels: ageLabels,
        datasets: [{
            label: 'Distribución por Grupo de Edad',
            data: ageData,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.1
        }]
    };

    const dataScatterGenderAge = {
        datasets: [{
            label: 'Género vs Edad',
            data: filteredPatients.map(patient => ({
                x: patient.genderId?.name || 'Desconocido',
                y: new Date().getFullYear() - new Date(patient.age).getFullYear()
            })),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointRadius: 5
        }]
    };

    const dataPolarOccupation = {
        labels: occupationLabels,
        datasets: [{
            data: occupationData,
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1
        }]
    };

    const dataDoughnutSemester = {
        labels: semesterLabels,
        datasets: [{
            data: semesterData,
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
        }]
    };

    const dataBarGender = {
        labels: genderLabels,
        datasets: [{
            label: 'Distribución por Género',
            data: genderData,
            backgroundColor: ['rgba(128, 0, 128, 0.6)', 'rgba(186, 85, 211, 0.6)', 'rgba(74, 144, 226, 0.6)'],
            borderColor: ['rgba(128, 0, 128, 1)', 'rgba(186, 85, 211, 1)', 'rgba(74, 144, 226, 1)'],
            borderWidth: 2
        }]
    };

    const dataPieAge = {
        labels: ageLabels,
        datasets: [{
            data: ageData,
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(153, 102, 255, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1
        }]
    };

    const dataBarOccupation = {
        labels: occupationLabels,
        datasets: [{
            label: 'Distribución por Ocupación',
            data: occupationData,
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 2
        }]
    };

    // Nuevo gráfico de Polar Area para la distribución de género
    const dataPolarGender = {
        labels: genderLabels,
        datasets: [{
            data: genderData,
            backgroundColor: ['rgba(128, 0, 128, 0.6)', 'rgba(186, 85, 211, 0.6)', 'rgba(74, 144, 226, 0.6)'],
            borderColor: ['rgba(128, 0, 128, 1)', 'rgba(186, 85, 211, 1)', 'rgba(74, 144, 226, 1)'],
            borderWidth: 1
        }]
    };

    const chartOptions = {
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

    const chartStyles = {
        borderWidth: 2,
        borderColor: '#bb5abb',
        borderStyle: 'solid',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20
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
                    <h3 className="text-4xl text-primary font-bold mb-4">📊 Gráficos</h3>
                    <p className="text-lg text-tartiary mb-6">Visualiza de forma gráfica y dinámica la información de todos los usuarios registrados.</p>
                    <p className="text-lg font-bold">Total de {filtroRol}: {filteredPatients.length}</p>
                </motion.div>
                <div className="mb-4">
                    <select className="border rounded-md p-2 mb-2" onChange={(e) => setFiltroRol(e.target.value)}>
                        <option value="estudiante">Filtrar por rol...</option>
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
                        <h2 className="text-lg font-semibold mb-4">Distribución por Género</h2>
                        <Bar data={dataBarGender} options={chartOptions} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Distribución por Grupo de Edad</h2>
                        <Pie data={dataPieAge} options={chartOptions} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Distribución por Grupo de Edad (Línea)</h2>
                        <Line data={dataLineAge} options={chartOptions} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Género vs Edad (Dispersión)</h2>
                        <Scatter data={dataScatterGenderAge} options={chartOptions} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Distribución por Ocupación (Polar)</h2>
                        <PolarArea data={dataPolarOccupation} options={chartOptions} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Distribución por Semestre (Doughnut)</h2>
                        <Doughnut data={dataDoughnutSemester} options={chartOptions} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Distribución por Ocupación</h2>
                        <Bar data={dataBarOccupation} options={chartOptions} />
                    </div>
                    <div style={chartStyles}>
                        <h2 className="text-lg font-semibold mb-4">Distribución por Género (Polar)</h2>
                        <PolarArea data={dataPolarGender} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Datos;
