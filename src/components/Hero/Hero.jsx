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

            {/* Cartel de retiro */}
<div className="mb-6 mx-1">
    <div className="bg-[#FDF0F0] border border-[#F0C0C8] rounded-2xl px-3.5 py-3 flex items-center gap-3 text-left shadow-sm">
        
        {/* Ícono de camión */}
        <div className="flex-shrink-0 text-[#E88A9A]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 3h15v13H1z"/>
                <path d="M16 8h4l3 3v5h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
        </div>

        <div>
            <p className="text-sm font-semibold text-[#C45C6A] leading-tight">
                Retirá tu pedido en nuestro local
            </p>
            <p className="text-xs text-[#C45C6A]/opacity-80 leading-tight mt-0.5">
                No realizamos entregas a domicilio
            </p>
        </div>
    </div>
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