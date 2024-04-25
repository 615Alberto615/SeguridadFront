//import React from 'react';
//import user from '../assets/user.png';

import Banner from "../../shared/Banner.jsx";
import logo from "../../assets/imgbanner_doc.png";

const HomeDocente = () => {
    return (
        <div className="md:px-16 p-4 max-w-screen-2xl mx-auto mt-24" id='home'>
            <Banner banner={logo} heading="Bienvenido Terapeuta!"
                    subheading="Aqui podras ver tus citas, pacientes y horarios de forma rapida y sencilla."
            />
        </div>
    );
}

export default HomeDocente;