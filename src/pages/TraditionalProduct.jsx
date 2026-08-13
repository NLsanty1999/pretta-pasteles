import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../Layout/Layout";
import useProducts from "../hooks/useProducts";
import { useCart } from "../context/CartContext";

function TraditionalProduct() {
    const { slug } = useParams();

    const { addToCart } = useCart();

    const { products, loading } = useProducts();

    const product = products.find(
        p => p.slug === slug
    );

    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");

    // Extras seleccionados
    const [extras, setExtras] = useState([]);

    useEffect(() => {
        if (!product) return;

        if (product.type === "mesaDulce") {
            setSize(
                String(product.quantity ?? "")
            );
            return;
        }

        if (product.sizes?.length) {
            setSize(product.sizes[0]);
        }
    }, [product]);

    /*
     * PRECIO BASE
     */
    const basePrice = useMemo(() => {
        if (!product) return 0;

        if (product.type === "mesaDulce") {
            return Number(
                product.prices?.mesaDulce ?? 0
            );
        }

        if (size) {
            return Number(
                product.prices?.[size] ?? 0
            );
        }

        return 0;
    }, [product, size]);

    /*
     * PRECIO DE EXTRAS
     */
    const extrasPrice = useMemo(() => {
        if (!product) return 0;

        return extras.reduce(
            (total, extraName) => {
                const extra = product.extras?.find(
                    e => e.name === extraName
                );

                return (
                    total +
                    (extra
                        ? Number(extra.price ?? 0)
                        : 0)
                );
            },
            0
        );
    }, [product, extras]);

    /*
     * PRECIO TOTAL
     */
    const price = useMemo(() => {
        return basePrice + extrasPrice;
    }, [basePrice, extrasPrice]);

    /*
     * SELECCIONAR / DESELECCIONAR EXTRA
     */
    function toggleExtra(extraName) {
        setExtras(currentExtras => {
            if (currentExtras.includes(extraName)) {
                return currentExtras.filter(
                    name => name !== extraName
                );
            }

            return [
                ...currentExtras,
                extraName
            ];
        });
    }

    if (loading) {
        return (
            <Layout>
                <h2 className="text-center text-2xl mt-10">
                    Cargando producto...
                </h2>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                Producto no encontrado
            </Layout>
        );
    }

    const available =
        product.available !== false;

    const isAlfajor =
        product.type === "alfajor";

    const isMesaDulce =
        product.type === "mesaDulce";

    const isTradicional =
        product.type === "tradicional";

    function handleAdd() {
        if (!available) {
            return;
        }

        addToCart({
            id: product.id,
            name: product.name,
            size,
            quantity,
            note,
            extras,
            price
        });

        alert(
            "Producto agregado al pedido."
        );
    }

    return (
        <Layout>

            <div className="max-w-xl mx-auto">

                {/* IMAGEN / PLACEHOLDER */}

<div
    className={`h-72 rounded-3xl overflow-hidden flex items-center justify-center ${
        available
            ? "bg-[#F8F3F0]"
            : "bg-gray-100"
    }`}
>
    {product.image ? (
        <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
        />
    ) : (
        <span className="text-8xl">🎂</span>
    )}
</div>


                {/* NOMBRE */}

                <div className="flex items-center justify-between gap-4 mt-8">

                    <h1 className="text-4xl font-bold">
                        {product.name}
                    </h1>

                    {!available && (
                        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap">
                            FUERA DE STOCK
                        </span>
                    )}

                </div>


                {/* DESCRIPCIÓN */}

                <p className="text-gray-500 mt-3">
                    {product.description}
                </p>


                {!available ? (

                    <div className="mt-8 bg-red-50 border border-red-200 rounded-3xl p-6 text-center">

                        <p className="text-red-700 font-semibold text-lg">
                            Este producto no está disponible actualmente.
                        </p>

                        <p className="text-red-500 mt-2">
                            Podés volver a consultar más adelante.
                        </p>

                    </div>

                ) : (

                    <>

                        {/* PRESENTACIÓN */}

                        <h2 className="font-bold text-xl mt-8 mb-3">
                            Presentación
                        </h2>


                        <div className="flex gap-3 flex-wrap">

                            {product.type === "mesaDulce" ? (

                                <button
                                    type="button"
                                    className="
                                        px-5
                                        py-3
                                        rounded-full
                                        border
                                        bg-[#D08A9B]
                                        text-white
                                        border-[#D08A9B]
                                    "
                                >
                                    {product.quantity} unidades
                                </button>

                            ) : (

                                (product.sizes || []).map(
                                    s => (

                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() =>
                                                setSize(s)
                                            }
                                            className={`
                                                px-5
                                                py-3
                                                rounded-full
                                                border
                                                transition
                                                ${
                                                    size === s
                                                        ? "bg-[#D08A9B] text-white border-[#D08A9B]"
                                                        : "bg-white"
                                                }
                                            `}
                                        >
                                            {product.type === "alfajor"
                                                ? "1 unidad"
                                                : `${s} cm`
                                            }
                                        </button>

                                    )
                                )

                            )}

                        </div>


                        {isAlfajor && (
                            <p className="text-sm text-gray-500 mt-3">
                                Precio por unidad.
                            </p>
                        )}


                        {isMesaDulce && (
                            <p className="text-sm text-gray-500 mt-3">
                                Elegí la presentación que querés comprar.
                            </p>
                        )}


                        {/* EXTRAS */}

                        {product.extras?.length > 0 && (

                            <div className="mt-8">

                                <h2 className="font-bold text-xl mb-3">
                                    Extras
                                </h2>

                                <p className="text-sm text-gray-500 mb-4">
                                    Podés agregar extras a tu pedido.
                                </p>


                                <div className="grid grid-cols-2 gap-3">

                                    {product.extras.map(
                                        extra => (

                                            <button
                                                key={extra.name}
                                                type="button"
                                                onClick={() =>
                                                    toggleExtra(
                                                        extra.name
                                                    )
                                                }
                                                className={`
                                                    rounded-2xl
                                                    border
                                                    p-4
                                                    text-left
                                                    transition
                                                    ${
                                                        extras.includes(
                                                            extra.name
                                                        )
                                                            ? "bg-[#D08A9B] text-white border-[#D08A9B]"
                                                            : "bg-white hover:bg-pink-50"
                                                    }
                                                `}
                                            >

                                                <div className="font-semibold">
                                                    {extra.name}
                                                </div>

                                                <div className="text-sm mt-1">
                                                    +$
                                                    {Number(
                                                        extra.price ?? 0
                                                    ).toLocaleString(
                                                        "es-AR"
                                                    )}
                                                </div>

                                            </button>

                                        )
                                    )}

                                </div>

                            </div>

                        )}


                        {/* CANTIDAD */}

                        <h2 className="font-bold text-xl mt-8 mb-3">
                            Cantidad
                        </h2>


                        <div className="flex items-center gap-5">

                            <button
                                type="button"
                                onClick={() =>
                                    quantity > 1 &&
                                    setQuantity(
                                        quantity - 1
                                    )
                                }
                                className="w-12 h-12 rounded-full bg-pink-100"
                            >
                                -
                            </button>


                            <span className="text-2xl font-bold">
                                {quantity}
                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    setQuantity(
                                        quantity + 1
                                    )
                                }
                                className="w-12 h-12 rounded-full bg-pink-100"
                            >
                                +
                            </button>

                        </div>


                        {/* OBSERVACIONES */}

                        <h2 className="font-bold text-xl mt-8 mb-3">
                            Observaciones
                        </h2>


                        <textarea
                            value={note}
                            onChange={(e) =>
                                setNote(
                                    e.target.value
                                )
                            }
                            rows={4}
                            className="w-full border rounded-2xl p-4"
                            placeholder="Ej.: Sin nueces, escribir dedicatoria..."
                        />


                        {/* RESUMEN */}

                        <div className="mt-8 bg-white rounded-3xl shadow p-6">

                            <div className="flex justify-between items-center">

                                <span className="font-semibold">
                                    Precio base
                                </span>

                                <span>
                                    $
                                    {basePrice.toLocaleString(
                                        "es-AR"
                                    )}
                                </span>

                            </div>


                            {extrasPrice > 0 && (

                                <div className="flex justify-between items-center mt-2">

                                    <span className="font-semibold">
                                        Extras
                                    </span>

                                    <span>
                                        +$
                                        {extrasPrice.toLocaleString(
                                            "es-AR"
                                        )}
                                    </span>

                                </div>

                            )}


                            <div className="border-t mt-4 pt-4 flex justify-between items-center">

                                <span className="text-xl font-bold">
                                    Total
                                </span>

                                <span className="text-3xl font-bold text-[#D08A9B]">
                                    $
                                    {price.toLocaleString(
                                        "es-AR"
                                    )}
                                </span>

                            </div>

                        </div>


                        {/* BOTÓN */}

                        <button
                            type="button"
                            onClick={handleAdd}
                            className="
                                w-full
                                mt-8
                                rounded-full
                                bg-[#D08A9B]
                                text-white
                                py-4
                                font-bold
                            "
                        >
                            Agregar al pedido
                        </button>

                    </>

                )}

            </div>

        </Layout>
    );
}

export default TraditionalProduct;