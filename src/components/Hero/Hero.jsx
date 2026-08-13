import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/tortaPreta.png";
import PrimaryButton from "../ui/PrimaryButton";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="text-center">

            {/* Imagen de borde a borde */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8 mb-6">
                <img
                    src={logo}
                    alt="Pretta Pasteles"
                    className="w-full h-auto object-cover block"
                />
            </div>

            {/* Contenido con su espaciado normal */}
            <h1 className="text-3xl font-bold text-[#5A3B31] leading-tight">
                Amamos ser parte de tus momentos especiales
            </h1>

            <p className="mt-5 text-gray-600 leading-tight">
                Tortas clásicas, personalizadas y mucho más
            </p>

            <div className="mt-8">
                <PrimaryButton onClick={() => navigate("/catalogo")}>
                    Ver Catálogo
                </PrimaryButton>
            </div>

        </section>
    );
}

export default Hero;