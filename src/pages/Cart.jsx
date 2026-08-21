import Layout from "../Layout/Layout";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {

    const navigate = useNavigate();

    const {

        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice

    } = useCart();


    return (

    <Layout>

        <div className="max-w-xl mx-auto px-4">

            <h1
                className="
                    text-center
                    text-3xl
                    font-light
                    text-[#5A3B31]
                    pt-15
                    mb-8
                "
            >
                Mi Pedido
            </h1>

            {/* =========================
                PRODUCTOS
            ========================= */}

            {

                cart.map((item, index) => {

                    /*
                     * Precio base por unidad
                     *
                     * Para productos nuevos
                     * usamos item.basePrice.
                     *
                     * Si algún producto viejo
                     * no lo tiene, hacemos una
                     * aproximación con item.price.
                     */

                    const basePrice =
                        Number(
                            item.basePrice ??
                            item.price ??
                            0
                        );


                    /*
                     * Extras detallados
                     */

                    const extraDetails =
                        item.extraDetails ||
                        [];


                    /*
                     * Precio total de extras
                     * por una unidad
                     */

                    const extrasUnitPrice =
                        extraDetails.reduce(
                            (total, extra) =>
                                total +
                                Number(
                                    extra.price ?? 0
                                ),
                            0
                        );


                    /*
                     * Precio final por unidad
                     */

                    const unitPrice =
                        Number(
                            item.price ?? 0
                        );


                    return (

                        <div

                            key={index}

                            className="
                                bg-white
                                rounded-3xl
                                shadow
                                p-5
                                mb-5
                            "

                        >


                            {/* =========================
                                NOMBRE
                            ========================= */}

                            <div className="
                                flex
                                justify-between
                                items-start
                            ">


                                <div>

                                    <h2 className="
                                        text-2xl
                                        font-bold
                                    ">

                                        {item.name}

                                    </h2>


                                    {/* =========================
                                        PRECIO BASE
                                    ========================= */}

                                    <p className="
                                        text-gray-600
                                        mt-2
                                    ">

                                        <span className="
                                            font-semibold
                                        ">

                                            Precio base:

                                        </span>

                                        {" "}

                                        $

                                        {basePrice.toLocaleString(
                                            "es-AR"
                                        )}

                                    </p>


                                    {/* =========================
                                        EXTRAS
                                    ========================= */}

                                    {

                                        extraDetails.length > 0 && (

                                            <div className="
                                                mt-3
                                            ">

                                                <p className="
                                                    font-semibold
                                                    text-gray-700
                                                ">

                                                    Extras:

                                                </p>


                                                <div className="
                                                    mt-1
                                                    space-y-1
                                                ">

                                                    {

                                                        extraDetails.map(
                                                            (
                                                                extra,
                                                                extraIndex
                                                            ) => (

                                                                <div
                                                                    key={
                                                                        extraIndex
                                                                    }
                                                                    className="
                                                                        flex
                                                                        justify-between
                                                                        items-center
                                                                        text-sm
                                                                        text-gray-600
                                                                    "
                                                                >

                                                                    <span>

                                                                        {extra.name}

                                                                    </span>


                                                                    <span>

                                                                        +$

                                                                        {Number(
                                                                            extra.price ??
                                                                            0
                                                                        ).toLocaleString(
                                                                            "es-AR"
                                                                        )}

                                                                    </span>

                                                                </div>

                                                            )
                                                        )

                                                    }

                                                </div>


                                                {/* TOTAL EXTRAS */}

                                                <div className="
                                                    flex
                                                    justify-between
                                                    mt-2
                                                    pt-2
                                                    border-t
                                                    text-sm
                                                    font-semibold
                                                    text-gray-700
                                                ">

                                                    <span>

                                                        Total extras:

                                                    </span>


                                                    <span>

                                                        +$

                                                        {extrasUnitPrice.toLocaleString(
                                                            "es-AR"
                                                        )}

                                                    </span>

                                                </div>

                                            </div>

                                        )

                                    }

                                </div>


                                {/* ELIMINAR */}

                                <button

                                    onClick={() =>
                                        removeFromCart(index)
                                    }

                                    className="
                                        text-red-500
                                    "

                                >

                                    🗑

                                </button>


                            </div>


                            {/* =========================
                                TAMAÑO
                            ========================= */}

                            {item.size && (

                                <p className="mt-3">

                                    <b>Tamaño:</b>{" "}

                                    {item.size}

                                    {
                                        item.size &&
                                        !isNaN(Number(item.size)) &&
                                        " cm"
                                    }

                                </p>

                            )}


                            {/* =========================
                                BIZCOCHUELO
                            ========================= */}

                           {item.flavorsSelected?.length > 1 ? (
    <div className="mt-2 space-y-1">
        <p>
            <b>Bizcochuelo 1:</b>{" "}
            {item.flavorsSelected[0]}
        </p>

        <p>
            <b>Bizcochuelo 2:</b>{" "}
            {item.flavorsSelected[1]}
        </p>
    </div>
) : (
    item.flavor && (
        <p>
            <b>Bizcochuelo:</b>{" "}
            {item.flavor}
        </p>
    )
)}


                            {/* =========================
                                RELLENO
                            ========================= */}

                            {item.fillingsSelected?.length === 4 ? (

    <div className="mt-2 space-y-1">

        <p>
            <b>Rellenos bizcochuelo 1:</b>{" "}
            {item.fillingsSelected[0]} y{" "}
            {item.fillingsSelected[1]}
        </p>

        <p>
            <b>Rellenos bizcochuelo 2:</b>{" "}
            {item.fillingsSelected[2]} y{" "}
            {item.fillingsSelected[3]}
        </p>

    </div>

) : item.fillingsSelected?.length > 1 ? (

    <div className="mt-2 space-y-1">

        <p>
            <b>Relleno bizcochuelo 1:</b>{" "}
            {item.fillingsSelected[0]}
        </p>

        <p>
            <b>Relleno bizcochuelo 2:</b>{" "}
            {item.fillingsSelected[1]}
        </p>

    </div>

) : (

    item.filling && (
        <p>
            <b>Relleno:</b>{" "}
            {item.filling}
        </p>
    )

)}


                            {/* =========================
                                COBERTURA
                            ========================= */}

                            {item.covering && (

                                <p>

                                    <b>Cobertura:</b>{" "}

                                    {item.covering}

                                </p>

                            )}


                            {/* =========================
                                FECHA
                            ========================= */}

                            {item.deliveryDate && (

                                <p>

                                    <b>Entrega:</b>{" "}

                                    {new Date(
                                        item.deliveryDate
                                    ).toLocaleDateString(
                                        "es-AR"
                                    )}

                                </p>

                            )}


                            {/* =========================
                                HORARIO
                            ========================= */}

                            {item.deliveryHour && (

                                <p>

                                    <b>Horario:</b>{" "}

                                    {item.deliveryHour}

                                </p>

                            )}


                            {/* =========================
                                EXTRAS ANTIGUOS
                            ========================= */}

                            {
                                extraDetails.length === 0 &&
                                item.extras?.length > 0 && (

                                    <div className="mt-3">

                                        <p className="
                                            font-semibold
                                        ">

                                            Extras

                                        </p>


                                        <ul className="
                                            list-disc
                                            ml-5
                                            text-gray-600
                                        ">

                                            {

                                                item.extras.map(
                                                    extra => (

                                                        <li key={extra}>

                                                            {extra}

                                                        </li>

                                                    )
                                                )

                                            }

                                        </ul>

                                    </div>

                                )
                            }


                            {/* =========================
                                CANTIDAD + TOTAL
                            ========================= */}

                            <div className="
                                flex
                                items-center
                                justify-between
                                mt-6
                                pt-4
                                border-t
                            ">


                                {/* CANTIDAD */}

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <button

                                        onClick={() =>
                                            decreaseQuantity(
                                                index
                                            )
                                        }

                                        className="
                                            w-8
                                            h-8
                                            rounded-full
                                            bg-gray-200
                                        "

                                    >

                                        -

                                    </button>


                                    <span className="
                                        text-xl
                                        font-bold
                                    ">

                                        {item.quantity}

                                    </span>


                                    <button

                                        onClick={() =>
                                            increaseQuantity(
                                                index
                                            )
                                        }

                                        className="
                                            w-8
                                            h-8
                                            rounded-full
                                            bg-[#D08A9B]
                                            text-white
                                        "

                                    >

                                        +

                                    </button>

                                </div>


                                {/* TOTAL DEL PRODUCTO */}

<div className="flex-1">

    <h2 className="text-2xl font-bold">
        {item.name}
    </h2>

    {/* PRECIO BASE */}

    {item.basePrice !== undefined ? (

        <div className="mt-2 space-y-1">

            <div className="flex justify-between gap-4 text-gray-600">

                <span>
                    Precio base
                </span>

                <span>
                    $
                    {Number(
                        item.basePrice
                    ).toLocaleString("es-AR")}
                </span>

            </div>


            {/* CAMBIOS DE RELLENO */}

            {item.fillingChanges > 0 && (

                <div className="flex justify-between gap-4 text-gray-600">

                    <span>
                        Cambio de relleno
                        {item.fillingChanges > 1 &&
                            ` × ${item.fillingChanges}`
                        }
                    </span>

                    <span>
                        +$
                        {(
                            Number(
                                item.fillingChangePrice || 0
                            ) *
                            item.fillingChanges
                        ).toLocaleString("es-AR")}
                    </span>

                </div>

            )}


            {/* EXTRAS */}

            {item.extrasDetails?.length > 0 && (

                <div className="mt-2">

                    <p className="font-semibold text-gray-700">
                        Extras
                    </p>

                    <div className="space-y-1 mt-1">

                        {item.extrasDetails.map(
                            extra => (

                                <div
                                    key={extra.name}
                                    className="flex justify-between gap-4 text-gray-600"
                                >

                                    <span>
                                        {extra.name}
                                    </span>

                                    <span>
                                        +$
                                        {Number(
                                            extra.price || 0
                                        ).toLocaleString(
                                            "es-AR"
                                        )}
                                    </span>

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}

        </div>

    ) : (

        <p className="text-gray-500">
            ${item.price.toLocaleString("es-AR")} c/u
        </p>

    )}




                                    <p className="
                                        text-2xl
                                        font-bold
                                    ">

                                        $

                                        {(
                                            unitPrice *
                                            item.quantity
                                        ).toLocaleString(
                                            "es-AR"
                                        )}

                                    </p>

                                </div>


                            </div>


                        </div>

                    );

                })

            }


            {/* =========================
                TOTAL GENERAL
            ========================= */}

            {

                cart.length > 0 && (

                    <>

                        <div className="
                            text-center
                            mt-8
                        ">

                            <p className="
                                text-3xl
                                font-bold
                            ">

                                Total

                            </p>


                            <p className="
                                text-4xl
                                font-bold
                                text-[#D08A9B]
                            ">

                                $

                                {totalPrice.toLocaleString(
                                    "es-AR"
                                )}

                            </p>

                        </div>


                        {/* =========================
                            CONTINUAR
                        ========================= */}

                        <button

                            onClick={() =>
                                navigate("/checkout")
                            }

                            className="
                                w-full
                                rounded-full
                                py-4
                                bg-[#D08A9B]
                                text-white
                                font-bold
                                mt-6
                            "

                        >

                            Continuar Pedido

                        </button>

                    </>

                )

            }
            </div>
        </Layout>

    );

}


export default Cart;