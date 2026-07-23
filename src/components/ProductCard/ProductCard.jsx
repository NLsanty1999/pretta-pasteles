import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">

            <div className="h-48 bg-pink-100 flex items-center justify-center">

                <span className="text-7xl">
                    🎂
                </span>

            </div>

            <div className="p-6">

                <h2 className="text-2xl font-bold text-[#5A3B31]">

                    {product.name}

                </h2>

                <p className="mt-3 text-gray-600">

                    {product.description}

                </p>

                <button
                    onClick={() => navigate(`/producto/${product.id}`)}
                    className="
                        w-full
                        mt-6
                        py-3
                        rounded-full
                        bg-[#D08A9B]
                        text-white
                        font-bold
                        hover:bg-[#c97b8e]
                        transition
                    "
                >
                    Personalizar
                </button>

            </div>

        </div>
    );
}

export default ProductCard;