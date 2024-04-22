import { useState } from 'react';
import { MdPerson, MdLocationOn, MdPhone, MdAccountCircle, MdLock, MdWc, MdWork } from 'react-icons/md';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
import { FaRegAddressCard } from 'react-icons/fa';

const PerfilAdmin = () => {
    const [docente] = useState({
        nombre: "Juan",
        apellidoPaterno: "Pérez",
        apellidoMaterno: "García",
        direccion: "Calle 123, Ciudad",
        telefono: "123456789",
        usuario: "juan.perez",
        genero: "Masculino",
        ocupacion: "Docente",
        edad: 35,
        password: "********"
    });

    return (
        <div className="container mx-auto mt-20">
            <div className="bg-white shadow-lg rounded-xl p-8">
                <div className="flex flex-col items-center space-y-6">
                    {/* Imagen de ejemplo de usuario */}
                    <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center text-6xl text-gray-500">
                        JD {/* Iniciales del docente */}
                    </div>
                    <h2 className="text-4xl font-semibold mb-2">
                        {docente.nombre} {docente.apellidoPaterno} {docente.apellidoMaterno}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                        <InfoItem icon={<MdLocationOn />} label="Dirección:" value={docente.direccion} />
                        <InfoItem icon={<MdPhone />} label="Teléfono:" value={docente.telefono} />
                        <InfoItem icon={<AiOutlineUser />} label="Usuario:" value={docente.usuario} />
                        <InfoItem icon={<MdLock />} label="Contraseña:" value={docente.password} />
                        <InfoItem icon={<MdWc />} label="Género:" value={docente.genero} />
                        <InfoItem icon={<MdWork />} label="Ocupación:" value={docente.ocupacion} />
                        <InfoItem icon={<AiOutlineCalendar />} label="Edad:" value={docente.edad} />
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
