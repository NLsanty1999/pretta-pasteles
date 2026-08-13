import { useNavigate } from "react-router-dom";
import categories from "../../data/categories";
import { ArrowRight } from "lucide-react";
import tartas from "../../data/products/tartas";

// Íconos personalizados
const icons = {
    torta: (
    <svg width="60" height="60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Corazón rosa */}
        <path 
            d="M24 8.5c-1.2-2.2-4.2-2.2-5.4 0-1.5 2.7 1.2 5.8 5.4 9.5 4.2-3.7 6.9-6.8 5.4-9.5-1.2-2.2-4.2-2.2-5.4 0z" 
            fill="#F5A3B5"
        />
        
        {/* Piso superior de la torta */}
        <rect x="16" y="18" width="16" height="8" rx="2" stroke="#A8C5A0" strokeWidth="2" fill="none"/>
        
        {/* Piso inferior de la torta */}
        <path 
            d="M12 28h24c0 0-1 3-2 4H14c-1-1-2-4-2-4z" 
            stroke="#A8C5A0" 
            strokeWidth="2" 
            fill="none"
            strokeLinejoin="round"
        />
        
        {/* Base / plato */}
        <path 
            d="M10 34h28" 
            stroke="#A8C5A0" 
            strokeWidth="2" 
            strokeLinecap="round"
        />
    </svg>

),
    alfajor: (
        <svg width="60" height="60" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="12" stroke="#A8C5A0" strokeWidth="1.8"/>
            <circle cx="13" cy="14" r="1.6" fill="#A8C5A0"/>
            <circle cx="23" cy="14" r="1.6" fill="#A8C5A0"/>
            <circle cx="18" cy="19" r="1.6" fill="#A8C5A0"/>
            <circle cx="13" cy="23" r="1.6" fill="#A8C5A0"/>
            <circle cx="23" cy="23" r="1.6" fill="#A8C5A0"/>
        </svg>
    ),
    tartas: (
    <svg width="60" height="60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Base de la tarta */}
        <path 
            d="M10 30c0-8 6.5-14 14-14s14 6 14 14c0 2-1 4-3 5H13c-2-1-3-3-3-5z" 
            stroke="#A8C5A0" 
            strokeWidth="2" 
            fill="none"
            strokeLinejoin="round"
        />
        
        {/* Borde superior de la tarta */}
        <path 
            d="M12 28c2-6 6-9 12-9s10 3 12 9" 
            stroke="#A8C5A0" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
        />
        
        {/* Detalle rosa (frutilla / decoración) */}
        <circle cx="24" cy="18" r="3.5" fill="#F5A3B5"/>
        
        {/* Hojita de la frutilla */}
        <path 
            d="M24 14.5c0-1.5 1-2.5 2-2.5" 
            stroke="#A8C5A0" 
            strokeWidth="1.5" 
            strokeLinecap="round"
        />
    </svg>
),
    mesa: (
    <svg width="60" height="60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Elemento central (torta / stand rosa) */}
        <path 
            d="M24 8c-2 0-3.5 1.5-3.5 3.5v2h7v-2c0-2-1.5-3.5-3.5-3.5z" 
            stroke="#F5A3B5" 
            strokeWidth="1.8" 
            fill="none"
        />
        <rect x="20" y="13.5" width="8" height="3" rx="1" stroke="#F5A3B5" strokeWidth="1.8" fill="none"/>
        
        {/* Elementos laterales (círculos rosados) */}
        <circle cx="14" cy="18" r="3.5" stroke="#F5A3B5" strokeWidth="1.8" fill="none"/>
        <circle cx="34" cy="18" r="3.5" stroke="#F5A3B5" strokeWidth="1.8" fill="none"/>
        
        {/* Tabla */}
        <path 
            d="M8 22h32c0 0-1 2-2 3H10c-1-1-2-3-2-3z" 
            stroke="#A8C5A0" 
            strokeWidth="2" 
            fill="none"
            strokeLinejoin="round"
        />
        
        {/* Pata de la mesa */}
        <path 
            d="M24 25v10" 
            stroke="#A8C5A0" 
            strokeWidth="2" 
            strokeLinecap="round"
        />
        
        {/* Base de la pata */}
        <path 
            d="M18 35h12" 
            stroke="#A8C5A0" 
            strokeWidth="2" 
            strokeLinecap="round"
        />
    </svg>
),
};

function Categories() {
    const navigate = useNavigate();

   return (
    <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
            <button
                key={category.id}
                onClick={() => navigate(`/catalogo/${category.id}`)}
                className="
                    bg-[#FDF8F4]
                    border border-[#F0E6DC]
                    rounded-2xl
                    p-4
                    shadow-sm
                    hover:shadow-md
                    transition
                    text-left
                    relative
                    flex
                    items-center
                    gap-3
                    pb-9
                "
            >
                {/* Ícono */}
                <div className="flex-shrink-0">
                    {icons[category.icon]}
                </div>

                {/* Solo el título */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#5A3B31] text-[13px] tracking-wide leading-tight">
                        {category.name}
                    </h3>
                </div>

                {/* Flechita abajo centrada */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E8A0B0] flex items-center justify-center">
                    <ArrowRight size={12} className="text-white" />
                </div>
            </button>
        ))}
    </div>
);
}

export default Categories;