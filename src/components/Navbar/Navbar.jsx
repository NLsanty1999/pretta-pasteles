import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import logo from "../../assets/images/logoPretta.png";
import { useCart } from "../../context/CartContext";
import { getProducts } from "../../firebase/products/products";

function Navbar() {
    const navigate = useNavigate();
    const { totalItems } = useCart();

    const [scrolled, setScrolled] = useState(false);
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    // Detectar scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        getProducts().then(setProducts).catch(console.error);
    }, []);

    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }
        const filtered = products.filter((p) =>
            p.name?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 6));
        setShowResults(true);
    }, [query, products]);

    const handleSelect = (product) => {
        setQuery("");
        setShowResults(false);
        navigate(`/producto/tradicional/${product.id}`);
    };

    return (
        <header
            className={`
                fixed top-0 left-0 w-full z-50 transition-all duration-300
                ${scrolled 
                    ? "bg-white/95 backdrop-blur-md border-b border-[#EAD7DE] shadow-sm" 
                    : "bg-transparent"
                }
            `}
        >
            <div className="max-w-md mx-auto flex items-center px-4 h-16 gap-3">

                {/* Logo */}
                <button onClick={() => navigate("/")} className="flex-shrink-0">
                    <img
                        src={logo}
                        alt="Pretta Pasteles"
                        className={`h-11 w-auto object-contain transition ${
                            scrolled ? "opacity-100" : "brightness-0 invert"
                        }`}
                    />
                </button>

                {/* Buscador */}
                <div className="flex-1 relative">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar torta..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className={`
                                w-full rounded-full py-2 pl-9 pr-4 text-sm
                                focus:outline-none focus:ring-2 focus:ring-[#E8A0B0]/40
                                transition
                                ${scrolled 
                                    ? "bg-white border border-[#EAD7DE] text-[#5A3B31]" 
                                    : "bg-white/20 border border-white/30 text-white placeholder:text-white/70"
                                }
                            `}
                        />
                        <Search
                            size={16}
                            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                                scrolled ? "text-gray-400" : "text-white/80"
                            }`}
                        />
                    </div>

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
                    className={`relative transition flex-shrink-0 ${
                        scrolled ? "text-[#5A3B31]" : "text-white"
                    }`}
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