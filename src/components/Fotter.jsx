import logo from '../assets/logo.png'
import fb from '../assets/fb.png'
import ig from '../assets/ig.png'
import tw from '../assets/tw.png'
import lk from '../assets/lk.png'
const Fotter = () => {
    return (
        <div className="bg-[#010851] md:px-14 p-4 max-w-screen-2xl mx-auto text-white">
            <div className="my-12 flex flex-col md:flex-row  gap-10">
                <div className="md:w-1/2 space-y-8">
                    <a href="/" className="text-2xl font-semibold flex items-center space-x-3 text-primary">
                        <img src={logo} alt="" className="w-10 inline-block items-center"/>
                        <span className="text-white">UCB</span>
                    </a>
                    <p className="md:w-1/2">Comprometidos con tu bienestar integral. En la UCB, apoyamos activamente la salud mental y emocional de nuestra comunidad universitaria.</p>
                    
                </div>
                {/* nav fot */}
                <div className="md:w-1/2 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-start">
                    <div className="space-y-4 mt-5">
                    </div>
                    <div className="space-y-4 mt-5">
                    <h4 className="text-xl">Aplicación</h4>
                        <ul className="space-y-3">
                            <a href="/" className="block hover:text-gray-300">Home</a>
                            <a href="/" className="block hover:text-gray-300">Servicios</a>
                            <a href="/" className="block hover:text-gray-300">Informacion</a>
                        </ul>
                    </div>
                    <div className="space-y-4 mt-5">
                        <h4 className="text-xl">Contacto</h4>
                        <ul className="space-y-3 ">
                            <p className=" hover:text-gray-300">(012) 1234-567-890</p>
                            <p className=" hover:text-gray-300"></p>
                            <a href="https://lpz.ucb.edu.bo/contacto/" target="_blank" rel="noopener noreferrer">
                                <p className=" hover:text-gray-300">Pagina de Contacto</p>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
            <hr/>

            <div className='flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-8'>
                <p className="text-center py-4">© 2024 UCB. All rights reserved.</p>
                <div className='flex items-center space-x-5'>
                <a href="https://www.facebook.com/UCB.BOLIVIA/" target="_blank" rel="noopener noreferrer">
                    <img src={fb} alt="Facebook" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                </a>
                <a href="https://www.instagram.com/ucb.lapaz/" target="_blank" rel="noopener noreferrer">
                    <img src={ig} alt="Insta" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                </a>
                <a href="https://twitter.com/UCBLaPaz" target="_blank" rel="noopener noreferrer">
                    <img src={tw} alt="X" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                </a>
                <a href="https://bo.linkedin.com/company/ucb-lapaz" target="_blank" rel="noopener noreferrer">
                    <img src={lk} alt="link" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                </a>
                </div>
            </div>
        </div>
    );
}
export default Fotter;