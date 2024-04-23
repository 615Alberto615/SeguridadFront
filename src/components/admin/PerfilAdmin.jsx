import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdPhone, MdLock, MdWc, MdWork } from 'react-icons/md';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
// import { FaRegAddressCard } from 'react-icons/fa';

const PerfilAdmin = () => {
    const [userData, setUserData] = useState(null);
    const [personData, setPersonData] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Asumiendo que el token está almacenado en localStorage

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:8004/api/v1/user/find/1', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.log("Error fetching user data");
                navigate('/login'); // Redirect to login if fetch fails
                return;
            }
            const data = await response.json();
            setUserData(data.data);

            // Fetch person data
            const personResponse = await fetch(`http://localhost:8004/api/v1/user/findPerson/${data.data.peopleId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!personResponse.ok) {
                console.log("Error fetching person data");
                return;
            }
            const personData = await personResponse.json();
            setPersonData(personData.data);
        };

        fetchUserData();
    }, [token, navigate]);

    if (!userData || !personData) {
        return <div>Loading...</div>; // Or some loading spinner
    }

    return (
        <div className="container mx-auto mt-20">
            <div className="bg-white shadow-lg rounded-xl p-8">
                <div className="flex flex-col items-center space-y-6">
                    <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center text-6xl text-gray-500">
                        {personData.name[0]}{personData.firstLastname[0]} {/* Iniciales del docente */}
                    </div>
                    <h2 className="text-4xl font-semibold mb-2">
                        {personData.name} {personData.firstLastname} {personData.secondLastname}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                        <InfoItem icon={<MdLocationOn />} label="Dirección:" value={personData.address} />
                        <InfoItem icon={<MdPhone />} label="Teléfono:" value={personData.cellphone} />
                        <InfoItem icon={<AiOutlineUser />} label="Usuario:" value={userData.userName} />
                        <InfoItem icon={<MdLock />} label="Contraseña:" value="********" />
                        <InfoItem icon={<MdWc />} label="Género:" value={personData.genderId ? 'Masculino' : 'Femenino'} />
                        <InfoItem icon={<MdWork />} label="Ocupación:" value={personData.occupationId || 'No especificado'} />
                        <InfoItem icon={<AiOutlineCalendar />} label="Edad:" value={new Date().getFullYear() - new Date(personData.age).getFullYear()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-center space-x-2 border-b border-gray-200 py-2">
        <span className="text-xl text-gray-500">{icon}</span>
        <div className="flex flex-col items-start">
            <strong className="text-lg">{label}</strong>
            <span className="text-lg border rounded-md p-1">{value}</span>
        </div>
    </div>
);

export default PerfilAdmin;
