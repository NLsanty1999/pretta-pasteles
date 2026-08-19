import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

    const backgroundImage = "https://res.cloudinary.com/upitr3mr/image/upload/WhatsApp_Image_2026-08-14_at_00.29.37.jpg";

    return (
        <section className="relative w-full h-[85vh] min-h-[520px] overflow-hidden">
            
            {/* Foto de fondo */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            {/* Capa oscura */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Título centrado en el medio */}
            <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-6">
                <h1 className="text-white text-2xl sm:text-10xl font-thin tracking-widest leading-snug drop-shadow-md">
                    PEQUEÑOS PLACERES <br />
                    GRANDES MOMENTOS 
                </h1>
            </div>

            {/* Botón abajo */}
            <div className="absolute bottom-24 left-0 right-0 z-14 flex justify-center">
                <button
                    onClick={() => navigate("/catalogo")}
                    className="
                        bg-white
                        text-[#5A3B31]
                        font-medium
                        tracking-widest
                        text-sm
                        px-10
                        py-3.5
                        rounded-none
                        hover:bg-white/90
                        transition
                        shadow-lg
                    "
                >
                    VER CATÁLOGO
                </button>
            </div>
        </section>
    );
}

export default Hero;