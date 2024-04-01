import Banner from '../shared/Banner'; 
import logo from '../assets/lo1.png';

const Home = () => {
    return (
        <div className="md:px-12 p-4 max-w-screen-2xl mx-auto mt-24" id='home'>
            <Banner banner={logo} heading="Clínica Otorrinolaringologica" 
            subheading="En nuestra clínica, nos dedicamos a proporcionar atención médica especializada y personalizada para todas sus necesidades relacionadas con el oído, la nariz y la garganta."
            bt1={'Get Started'} bt2={'Discount'}/>
        
        </div>
    );
}    
export default Home;