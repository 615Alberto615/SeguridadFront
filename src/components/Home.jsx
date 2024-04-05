import Banner from '../shared/Banner'; 
import logo from '../assets/img4.gif';

const Home = () => {
    return (
        <div className="md:px-16 p-4 max-w-screen-2xl mx-auto mt-24" id='home'>
            <Banner banner={logo} heading="Apoyo Psicológico UCB" 
            subheading="Con nuestra plataforma, facilitamos el acceso a atención psicoterapéutica y 
            apoyo psicológico para estudiantes y personal de la UCB, garantizando privacidad y atención profesional."
            bt1={'Agenda tu Cita'}/>
        
        </div>
    );
}    
export default Home;