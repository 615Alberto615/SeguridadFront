import Banner from "../shared/Banner";

import ban from "../assets/shareff2.png";
const Newsletter = () => {
  return (
    <div className="md:px-14 p-4 max-w-screen-2xl mx-auto my-12">
        <Banner banner={ban} heading="Comparte Salud, Comparte Beneficios" subheading="Tu salud es importante para nosotros y también la de tus seres queridos. Recomienda nuestra clínica a tus amigos y familiares y disfruten juntos de beneficios exclusivos en sus próximas consultas. Porque cuidar de los tuyos nunca fue tan gratificante." bt1={"Tengo un código"} bt2={"Como obtener un código"} />
    </div>
  );
}
export default Newsletter;