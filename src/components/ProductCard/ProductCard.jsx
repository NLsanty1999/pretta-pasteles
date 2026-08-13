import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {

    const navigate = useNavigate();

    const firstPrice = product.prices
        ? Object.values(product.prices)[0]
        : 0;

    function handleOpen() {
    if (product.type === "personalizada") {
        navigate(`/producto/tradicional/${product.slug || product.id}`);
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
                bg-white
                rounded-3xl
                overflow-hidden
                shadow
                hover:shadow-lg
                transition
                border
            "

        >

<div className="aspect-square bg-[#F8F3F0] overflow-hidden flex items-center justify-center p-3">
    {product.image ? (
        <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center rounded-xl"
        />
    ) : (
        <span className="text-6xl">🎂</span>
    )}
</div>

            <div className="p-4">

                <h2 className="
                    text-lg
                    font-bold
                    text-[#5A3B31]
                    line-clamp-2
                    min-h-[3.5rem]
                ">

                    {product.name}

                </h2>


                <p className="
                    text-[#D08A9B]
                    font-bold
                    mt-2
                ">

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