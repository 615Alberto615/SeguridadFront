import { useState } from 'react';
import ucb from '../assets/ucb.png';
import { motion } from 'framer-motion'; 
import { fadeIn } from '../variants';
import { Link } from 'react-router-dom';

import useAuthStore from '../store/useAuthStore';




const Login = () => {
  const [occupationId, setOccupationId] = useState('');
  const [semesterId, setSemesterId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [motherLastName, setMotherLastName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [ci, setCi] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /\S+@ucb\.edu\.bo$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{8}$/.test(phone);
  };

  const handleRegister = async () => {
    setError('');
    if (!firstName || !lastName || !motherLastName || !age || !phone || !address || !ci) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!email || !validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido de la UCB.");
      return;
    }
    
    if (!validatePhone(phone)) {
      setError("Por favor, ingresa un número de celular válido.");
      return;
    }
    if (!gender) {
      setError("Por favor, selecciona un género.");
      return;
    }
    if(!occupationId){
      setError("Por favor, selecciona una ocupación.");
      return;
    }
    if(!semesterId){
      setError("Por favor, selecciona un semestre.");
      return;
    }
   
    const userData = {
      userDto: {
        userName: username,
        password, // Encripta o haz hash de esto antes de enviarlo
        status: true,
        rolId: 2
      },
      peopleDto: {
        name: firstName,
        firstLastname: lastName,
        secondLastname: motherLastName,
        email,
        age: Number(age),
        cellphone: phone,
        address,
        ci,
        status: true,
        genderId: gender,
        occupationId: occupationId,
        semesterId: semesterId
      }
    };
  
    try {
      const result = await register(userData);
      console.log("Resultado del registro:", result);
      if (result && result.code === 200) {
          window.location.href = `/login`;
      } else {
          throw new Error(result.error || 'Registration was not successful');
      }
    } catch (error) {
      setError("Hubo un problema con el registro. Inténtalo de nuevo.");
      console.error("Error en registro:", error);
    }
  };
  
  const goToRegister = () => {
    window.location.href = `/`;
  };

  const register = useAuthStore((state) => state.register);
  


  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1 bg-gradient-to-r from-secondary to-pink text-white p-12 justify-center items-center">
      <motion.div
          variants={fadeIn('down',0.6)}
          initial='hidden'
          whileInView={'show'}
          
          onClick={() => goToRegister()}  // Navegación al hacer clic
        >
          <img src={ucb} alt="" className='flex-auto justify-center h-30' style={{ cursor: 'pointer' }}/>
        </motion.div>
      </div>
      <motion.div 
        variants={fadeIn('up',0.6)}
        initial='hidden'
        whileInView={'show'}
        
        className="flex-1 bg-white flex justify-center items-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-primary text-3xl font-bold mb-5 flex justify-center">Regístrate</h2>
          
          <div className="space-y-4">
            {error && (
              <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                {error}
              </div>
            )}
            <input 
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            <input 
              type="email"
              placeholder="Correo Electrónico @ucb.edu.bo"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Seleccione un género</option>
              <option value="1">Masculino</option>
              <option value="2">Femenino</option>
              <option value="3">Otro</option>
            </select>
            <input 
              type="text"
              placeholder="Nombre"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Apellido Paterno"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Apellido Materno"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={motherLastName}
              onChange={(e) => setMotherLastName(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Edad"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Celular"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Dirección"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Carnet de Identidad (CI)"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={ci}
              onChange={(e) => setCi(e.target.value)}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={occupationId}
              onChange={(e) => setOccupationId(e.target.value)}
            >
              <option value="">Seleccione una ocupación</option>
              <option value="4">Ninguna ocupación</option>
              <option value="5">Estudiante de Medicina</option>
              <option value="6">Estudiante de Ingeniería</option>
              <option value="7">Estudiante de Derecho</option>
              <option value="8">Estudiante de Administración</option>
            </select>

            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
            >
              <option value="">Seleccione un semestre</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={9 + i}>
                  {i + 1}º Semestre
                </option>
              ))}
            </select>
            <button onClick={handleRegister}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-secondary text-sm font-medium text-white hover:bg-primary">
              Registrarse
            </button>
            <div className="mt-4 text-center">
            <span className="text-gray-700">¿Ya tienes una cuenta?</span>
            {' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Incia Sesion</Link>
          </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
