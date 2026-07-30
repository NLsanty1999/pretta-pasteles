import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {

    const navigate = useNavigate();

    const firstPrice =
        product.prices
            ? Object.values(product.prices)[0]
            : 0;

    return (

        <div
            className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition
            "
        >

            <div className="h-56 bg-[#F8F3F0] flex items-center justify-center">

                {
                    product.image
                        ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        )
                        : (
                            <span className="text-7xl">
                                🎂
                            </span>
                        )
                }

            </div>

            <div className="p-6">

                <h2 className="text-2xl font-bold text-[#5A3B31]">

                    {product.name}

                </h2>

                <p className="text-gray-500 mt-2">

                    {product.description}

                </p>

                <p className="text-xl font-bold text-[#D08A9B] mt-5">

                    Desde ${firstPrice.toLocaleString("es-AR")}

                </p>

                <button

                    onClick={() => {

                        if (product.type === "personalizada") {

                            navigate(`/producto/${product.id}`);

                        } else {

                            navigate(`/producto/tradicional/${product.slug}`);

                        }

                    }}

                    className="
                        mt-6
                        w-full
                        bg-[#D08A9B]
                        text-white
                        rounded-full
                        py-3
                        font-semibold
                        hover:opacity-90
                    "

                >

                    Ver producto

                </button>

            </div>

        </div>

    );

}

export default ProductCard;