import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/tortaPreta.png";
import PrimaryButton from "../ui/PrimaryButton";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="text-center">

            <img
                src={logo}
                alt="Pretta Pasteles"
                className="w-500 mx-auto mb-2"
            />

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