import { useEffect } from 'react';
import { Radar, PolarArea, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, ArcElement, BarElement } from 'chart.js';
import useQuoteStore from '../../store/useQuoteStore1'; 
import moment from 'moment'; // Ensure moment is installed

Chart.register(CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, ArcElement, BarElement);

const Datos = () => {
    const { quotes, fetchAllQuotes, error } = useQuoteStore((state) => ({
        quotes: state.quotes,
        fetchAllQuotes: state.fetchAllQuotes,
        error: state.error
    }));

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        fetchAllQuotes(token);
    }, [fetchAllQuotes]);

    const calculateAge = (birthday) => {
        return moment().diff(moment(birthday, "YYYY-MM-DD"), 'years');
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 12, // Smaller font for a more compact look
                        weight: 'bold'
                    }
                }
            }
        },
        aspectRatio: 1.5 // Improved aspect ratio for a better visual fit
    };

    const dataRadar = {
        labels: quotes.map(q => q.user.people.name),
        datasets: [{
            label: 'Age of Patients',
            data: quotes.map(q => calculateAge(q.user.people.age)),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const genderCounts = quotes.reduce((acc, q) => {
        const gender = q.user.people.genderId ? q.user.people.genderId.name : 'Unknown';
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
    }, {});

    const dataPie = {
        labels: Object.keys(genderCounts),
        datasets: [{
            data: Object.values(genderCounts),
            backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    };

    const semesterCounts = quotes.reduce((acc, q) => {
        const semester = q.user.people.semesterId ? q.user.people.semesterId.name : 'Unknown';
        acc[semester] = (acc[semester] || 0) + 1;
        return acc;
    }, {});

    const dataPolarArea = {
        labels: Object.keys(semesterCounts),
        datasets: [{
            label: 'Semester Distribution',
            data: Object.values(semesterCounts),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div className="container mx-auto mt-20 bg-black p-6 rounded-lg shadow-xl">
            <div className="bg-white p-6 rounded-lg">
                {error && <p className="text-red-500">Error: {error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Datos por Edad</h2>
                        <Radar data={dataRadar} options={chartOptions} />
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Datos por Genero</h2>
                        <Pie data={dataPie} options={chartOptions} />
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Datos por Semestre</h2>
                        <PolarArea data={dataPolarArea} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Datos;
