import Banner from "../shared/Banner";

import ban from "../assets/shareff2.png";
const Newsletter = () => {
  return (
    <div className="md:px-14 p-4 max-w-screen-2xl mx-auto my-12 mb-40">
        <Banner banner={ban} heading="Difunde Bienestar, Expande Apoyo" subheading="Haz saber a tus compañeros de la UCB la facilidad de organizar su bienestar emocional con nuestra aplicación. Compartir el acceso a la salud mental es un regalo invaluable. ¡Hablemos de salud mental!" />
    </div>
  );
}
export default Newsletter;