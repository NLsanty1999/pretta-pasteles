import { House, Cake, ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/auth";

function BottomNav() {

    const navigate = useNavigate();

    const location = useLocation();

    const { totalItems } = useCart();

    const [logged, setLogged] = useState(false);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {

            setLogged(!!user);

        });

        return unsubscribe;

    }, []);

    const active = "text-[#D08A9B]";

    const normal = "text-gray-500";

    return (

        <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-50">

            <div
                className={`max-w-md mx-auto grid ${
                    logged ? "grid-cols-4" : "grid-cols-3"
                } py-3`}
            >

                <button
                    onClick={() => navigate("/")}
                    className={`flex flex-col items-center ${
                        location.pathname === "/" ? active : normal
                    }`}
                >

                    <House size={22} />

                    <span className="text-xs mt-1">

                        Inicio

                    </span>

                </button>

                <button
                    onClick={() => navigate("/catalogo")}
                    className={`flex flex-col items-center ${
                        location.pathname === "/catalogo"
                            ? active
                            : normal
                    }`}
                >

                    <Cake size={22} />

                    <span className="text-xs mt-1">

                        Catálogo

                    </span>

                </button>

                <button
                    onClick={() => navigate("/carrito")}
                    className={`relative flex flex-col items-center ${
                        location.pathname === "/carrito"
                            ? active
                            : normal
                    }`}
                >

                    <ShoppingCart size={22} />

                    {totalItems > 0 && (

                        <span className="absolute top-0 right-5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">

                            {totalItems}

                        </span>

                    )}

                    <span className="text-xs mt-1">

                        Pedido

                    </span>

                </button>

                {logged && (

                    <button
                        onClick={() => navigate("/admin")}
                        className={`flex flex-col items-center ${
                            location.pathname === "/admin"
                                ? active
                                : normal
                        }`}
                    >

                        <User size={22} />

                        <span className="text-xs mt-1">

                            Admin

                        </span>

                    </button>

                )}

            </div>

        </nav>

    );

}

export default BottomNav;