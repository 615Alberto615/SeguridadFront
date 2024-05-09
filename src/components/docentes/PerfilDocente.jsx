import { useState, useEffect } from 'react';
import { fetchPeopleById } from '../../service/userService';

const PerfilDocente = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCard, setShowCard] = useState(false);

    // Mapeo de género
    const genderMap = {
        1: 'Masculino',
        2: 'Femenino',
        3: 'Otro género'
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const fetchUserData = async () => {
            try {
                const userData = await fetchPeopleById(userId, token);
                if (userData.code === 200) {
                    setCurrentUser(userData.data);
                } else {
                    setError(new Error(userData.message));
                }
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchUserData();
        setTimeout(() => {
            setShowCard(true);
        }, 100);
    }, []);

    if (!showCard) {
        return null; // Renderizar nada mientras se muestra la animación
    }

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!currentUser) {
        return <div>No se encontró el usuario</div>;
    }

    return (
        <div className="container mx-auto mt-40 px-4 sm:px-8 md:px-16">
            <div className="border-2 border-purple-400 bg-purple-200 shadow-lg rounded-xl p-8 transform transition-transform duration-500 hover:scale-105">
                <div className="flex flex-col items-center justify-center space-y-8">
                    {/* Imagen de ejemplo de usuario con iniciales */}
                    <div className="w-36 h-36 bg-purple-300 rounded-full flex items-center justify-center text-6xl text-purple-600 mb-4">
                        {currentUser.name && currentUser.firstLastname ?
                            `${currentUser.name.charAt(0)}${currentUser.firstLastname.charAt(0)}` : 'JD'}
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        {[
                            { key: 'name', label: 'Nombre' },
                            { key: 'firstLastname', label: 'Primer Apellido' },
                            { key: 'secondLastname', label: 'Segundo Apellido' },
                            { key: 'email', label: 'Email' },
                            { key: 'address', label: 'Dirección' },
                            { key: 'age', label: 'Edad' },
                            { key: 'cellphone', label: 'Celular' },
                            { key: 'ci', label: 'CI' },
                            // { key: 'genderId', label: 'Género', transform: (value) => genderMap[value] }, // Mapea el género
                        ].map(({ key, label, transform }) => (
                            <div className="flex flex-col items-center space-y-2" key={key}>
                                <strong className="text-lg font-semibold">{label}:</strong>
                                <span className="text-lg break-words">{transform ? transform(currentUser[key]) : currentUser[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilDocente;
