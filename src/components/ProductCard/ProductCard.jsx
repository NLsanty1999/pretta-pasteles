import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {

    const navigate = useNavigate();

    const firstPrice = product.prices
        ? Object.values(product.prices)[0]
        : 0;

    function handleOpen() {

        if (product.type === "personalizada") {

            navigate(`/producto/${product.slug}`);

        } else {

            navigate(`/producto/tradicional/${product.slug}`);

        }

    }

    return (

        <button
            onClick={handleOpen}
            className="
                w-full
                text-left
                overflow-hidden
                shadow-sm
                hover:shadow-md
                transition
                border
                border-[#EDE7E3]
            "
        >

            {/* IMAGEN */}

            <div
                className="
                    aspect-square
                    bg-white
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                "
            >

                {product.image ? (

                    <img
                        src={product.image}
                        alt={product.name}
                        className="
                            w-full
                            h-full
                            object-cover
                            object-center
                        "
                    />

                ) : (

                    <span className="text-6xl opacity-50">
                        🎂
                    </span>

                )}

            </div>

            {/* INFORMACIÓN */}

            <div className="p-4 bg-white/0 backdrop-blur-sm">

                <h2
                    className="
                        text-lg
                        font-normal
                        text-[#5A3B31]
                        line-clamp-2
                        min-h-[3.5rem]
                    "
                >

                    {product.name}

                </h2>

                <p
                    className="
                        text-[#D08A9B]
                        font-normal
                        mt-2
                    "
                >

                    Desde $

                    {Number(firstPrice || 0).toLocaleString(
                        "es-AR"
                    )}

                </p>

            </div>

        </button>

    );

}

export default ProductCard;