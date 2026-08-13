import logo from "../../assets/images/logoPretta.png";

function Navbar() {
    return (
        // Reducimos el py a py-1 para que el contenedor header sea más delgado
        <header className="fixed top-0 left-0 w-full z-50 bg-[#FFF8F3]/80 backdrop-blur-md border-b border-[#EAD7DE]">
            <div className="max-w-md mx-auto flex flex-col items-center justify-center py-1">

                {/* 
                  - h-20 o h-24: Aumenta la altura del logo.
                  - opacity-85: Hace que el logo sea semitransparente.
                  - -mb-2 (opcional): Margen negativo para compensar altura si no quieres que la barra crezca nada.
                */}
                <img 
                    src={logo} 
                    alt="Pretta" 
                    className="h-23 w-auto object-contain opacity-85 -mb-2" 
                />

            </div>
        </header>
    );
}

export default Navbar;