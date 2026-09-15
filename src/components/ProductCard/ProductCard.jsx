import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {

    console.log(

        "PRODUCTO QUE LLEGA A PRODUCT CARD:",

        product

    );

    const navigate = useNavigate();

    // =============================

    // OBTENER PRECIO

    // =============================

    let firstPrice = 0;

    // =============================

    // BOMBÓN Y NUECES

    // =============================

    const normalizeProductName = (value) => {

        return String(value || "")

            .normalize("NFD")

            .replace(/[\u0300-\u036f]/g, "")

            .trim()

            .toLowerCase();

    };

    const normalizedProductName =

        normalizeProductName(product.name);

    const isWeightProduct =

        normalizedProductName === "bombon" ||

        normalizedProductName === "nueces";

    if (isWeightProduct) {

        const prices =

            product.weightPrices || {};

        const availablePrices =

            Object.values(prices)

                .map(Number)

                .filter(

                    price => price > 0

                );

        if (availablePrices.length > 0) {

            firstPrice =

                Math.min(...availablePrices);

        }

    }

    // =============================

    // MESA DULCE

    // =============================

    else if (product.type === "mesaDulce") {

        const quantity = product.quantity

            ? String(product.quantity)

            : null;

        if (

            quantity &&

            product.prices?.[quantity] != null

        ) {

            firstPrice =

                Number(product.prices[quantity]);

        }

        else if (

            product.sizes?.length &&

            product.prices

        ) {

            const presentation =

                String(product.sizes[0]);

            firstPrice =

                Number(

                    product.prices[presentation] || 0

                );

        }

    }

    // =============================

    // ALFAJORES

    // =============================

    else if (

        product.type === "alfajor" &&

        product.sizes?.length

    ) {

        const presentation =

            String(product.sizes[0]);

        firstPrice =

            Number(

                product.prices?.[presentation] || 0

            );

    }

    // =============================

    // PRODUCTOS PERSONALIZADOS

    // =============================

    else if (

        product.type === "personalizada"

    ) {

        const activeSizes =

            product.sizes?.map(

                size => String(size)

            ) || [];

        const prices =

            product.prices || {};

        const availablePrices = [];

        activeSizes.forEach(size => {

            Object.entries(prices).forEach(

                ([key, price]) => {

                    const keySize =

                        String(key).split("-")[0];

                    if (

                        keySize === size &&

                        Number(price) > 0

                    ) {

                        availablePrices.push(

                            Number(price)

                        );

                    }

                }

            );

        });

        if (availablePrices.length > 0) {

            firstPrice =

                Math.min(...availablePrices);

        }

    }

    // =============================

    // PRODUCTOS TRADICIONALES

    // =============================

    else if (

        product.type === "tradicional"

    ) {

        const activeSizes =

            product.sizes?.map(

                size => String(size)

            ) || [];

        const prices =

            product.prices || {};

        const availablePrices = [];

        activeSizes.forEach(size => {

            if (

                prices[size] != null &&

                Number(prices[size]) > 0

            ) {

                availablePrices.push(

                    Number(prices[size])

                );

            }

        });

        if (availablePrices.length > 0) {

            firstPrice =

                Math.min(...availablePrices);

        }

    }

    // =============================

    // RESTO DE PRODUCTOS

    // =============================

    else {

        const prices =

            product.prices || {};

        const availablePrices =

            Object.values(prices)

                .map(Number)

                .filter(

                    price => price > 0

                );

        if (availablePrices.length > 0) {

            firstPrice =

                Math.min(...availablePrices);

        }

    }

    // =============================

    // ABRIR PRODUCTO

    // =============================

    function handleOpen() {

        if (product.type === "personalizada") {

            navigate(

                `/producto/${product.slug}`

            );

        } else {

            navigate(

                `/producto/tradicional/${product.slug}`

            );

        }

    }

    // =============================

    // RENDER

    // =============================

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

                    {Number(

                        firstPrice || 0

                    ).toLocaleString(

                        "es-AR"

                    )}

                </p>

            </div>

        </button>

    );

}

export default ProductCard;