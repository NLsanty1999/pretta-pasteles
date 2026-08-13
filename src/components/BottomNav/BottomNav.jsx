import { House, Cake } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const active = "text-[#D08A9B]";
    const normal = "text-gray-500";

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-50">
            <div className="max-w-md mx-auto grid grid-cols-2 py-3">

                {/* INICIO */}
                <button
                    onClick={() => navigate("/")}
                    className={`flex flex-col items-center ${
                        location.pathname === "/" ? active : normal
                    }`}
                >
                    <House size={22} />
                    <span className="text-xs mt-1">Inicio</span>
                </button>

                {/* CATÁLOGO */}
                <button
                    onClick={() => navigate("/catalogo")}
                    className={`flex flex-col items-center ${
                        location.pathname.startsWith("/catalogo") ? active : normal
                    }`}
                >
                    <Cake size={22} />
                    <span className="text-xs mt-1">Catálogo</span>
                </button>

            </div>
        </nav>
    );
}

export default BottomNav;