import googleIcon from '../assets/google-icon.png';
import ucb from '../assets/ucb.png';
import { motion } from 'framer-motion'; 
import { fadeIn } from '../variants';
const Login = () => {
  const handleSignInWithGoogle = () => {
    console.log("Iniciar sesión con Google");
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1 bg-gradient-to-r from-secondary to-pink text-white p-12 justify-center items-center">
        <motion.div
        variants={fadeIn('down',0.6)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false,amount:0.7}}
        >
          <img src={ucb} alt="" className='flex-auto justify-center h-40'/>
        </motion.div>
      </div>
      <motion.div 
      variants={fadeIn('up',0.6)}
      initial='hidden'
      whileInView={'show'}
      viewport={{once:false,amount:0.7}}
      
      
      className="flex-1 bg-white flex justify-center items-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-primary text-3xl font-bold mb-5 flex justify-center">Inicia Sesión</h2>
          
          <div className="space-y-4">
            <button onClick={handleSignInWithGoogle}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <img src={googleIcon} alt="Google sign-in" className="h-6 w-6 mr-2"/>
              Sign in with Google
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
