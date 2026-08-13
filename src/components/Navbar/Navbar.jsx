import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import logo from "../../assets/images/logoPretta.png";
import { useCart } from "../../context/CartContext";
import { getProducts } from "../../firebase/products/products"; // ajustá la ruta si es diferente

function Navbar() {
    const navigate = useNavigate();
    const { totalItems } = useCart();

    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    // Cargar productos una sola vez
    useEffect(() => {
        getProducts().then(setProducts).catch(console.error);
    }, []);

    // Filtrar mientras escribe
    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        const filtered = products.filter((p) =>
            p.name?.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered.slice(0, 6)); // máximo 6 resultados
        setShowResults(true);
    }, [query, products]);

    // Cerrar resultados al hacer clic afuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (product) => {
        setQuery("");
        setShowResults(false);
        // Ajustá esta ruta si es necesario
        navigate(`/producto/tradicional/${product.slug || product.id}`);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#FFF8F3]/90 backdrop-blur-md border-b border-[#EAD7DE]">
            <div className="max-w-md mx-auto flex items-center px-4 h-16 gap-3">

                {/* Logo */}
                <button onClick={() => navigate("/")} className="flex-shrink-0">
                    <img
                        src={logo}
                        alt="Pretta Pasteles"
                        className="h-11 w-auto object-contain"
                    />
                </button>

                {/* Buscador */}
                <div className="flex-1 relative" ref={searchRef}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => query.length >= 2 && setShowResults(true)}
                            className="
                                w-full
                                bg-white
                                border border-[#EAD7DE]
                                rounded-full
                                py-2
                                pl-9
                                pr-4
                                text-sm
                                text-[#5A3B31]
                                placeholder:text-gray-400
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#E8A0B0]/40
                            "
                        />
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            strokeWidth={2}
                        />
                    </div>

                    {/* Resultados */}
                    {showResults && results.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-lg border border-[#EAD7DE] overflow-hidden z-50">
                            {results.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => handleSelect(product)}
                                    className="w-full text-left px-4 py-3 hover:bg-[#FDF0F0] transition text-sm text-[#5A3B31] border-b border-[#F5EDE8] last:border-b-0"
                                >
                                    {product.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Carrito */}
                <button
                    onClick={() => navigate("/carrito")}
                    className="relative text-[#5A3B31] hover:opacity-70 transition flex-shrink-0"
                >
                    <ShoppingCart size={22} strokeWidth={1.8} />

                    {totalItems > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-[#E8A0B0] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
}

export default Navbar;