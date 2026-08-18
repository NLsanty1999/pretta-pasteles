import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../Layout/Layout";
import useProducts from "../hooks/useProducts";
import { useCart } from "../context/CartContext";

function Product() {

    const { id } = useParams();

    const { addToCart } = useCart();

    const {
        products,
        loading
    } = useProducts();


    /*
     * BUSCAR PRODUCTO
     */

    const product = products.find(
        p =>
            String(p.id) === String(id) ||
            String(p.slug) === String(id)
    );


    /*
     * ESTADOS
     */

    const [size, setSize] = useState("");
    const [weight, setWeight] = useState("");

    const [flavor, setFlavor] = useState("");
    const [covering, setCovering] = useState("");

    const [extras, setExtras] = useState([]);

    const [changedFillings, setChangedFillings] = useState([]);

    const [note, setNote] = useState("");


    /*
     * SABER SI ES PERSONALIZADA
     */

    const isPersonalized =
        product?.type === "personalizada";


    /*
     * VALORES POR DEFECTO
     */

    const selectedSize =
        size ||
        product?.sizes?.[0] ||
        "";

    const selectedFlavor =
        flavor ||
        product?.flavors?.[0] ||
        "";

    const selectedCovering =
        covering ||
        product?.coverings?.[0] ||
        "";


    /*
     * PESOS DISPONIBLES
     */

    const availableWeights = useMemo(() => {

        if (!isPersonalized) {
            return [];
        }

        const weights = {

            "16": [
                "1 kg",
                "2 kg",
                "3 kg"
            ],

            "20": [
                "2 kg",
                "3 kg"
            ],

            "24": [
                "2 kg"
            ]

        };

        return (
            weights[String(selectedSize)] ||
            []
        );

    }, [
        selectedSize,
        isPersonalized
    ]);


    /*
     * PESO SELECCIONADO
     */

    const selectedWeight =
        weight ||
        availableWeights[0] ||
        "";


    /*
     * CANTIDAD DE RELLENOS
     */

    const fillingLimit = useMemo(() => {

        if (!isPersonalized) {
            return 0;
        }

        const limits = {

            "16-1 kg": 1,
            "16-2 kg": 2,
            "16-3 kg": 3,

            "20-2 kg": 1,
            "20-3 kg": 2,

            "24-2 kg": 1

        };

        return (
            limits[
                `${selectedSize}-${selectedWeight}`
            ] || 0
        );

    }, [
        selectedSize,
        selectedWeight,
        isPersonalized
    ]);


    /*
     * CAMBIO DE RELLENO ACTIVADO
     */

    const fillingChangeActive =
        extras.includes("Cambio de relleno");


    /*
     * PRECIO DEL CAMBIO DE RELLENO
     */

    const fillingChangePrice =
        Number(
            product?.fillingChangePrice || 0
        );


    /*
     * CAMBIAR TAMAÑO
     */

    function handleSizeChange(newSize) {

        setSize(newSize);

        const weights = {

            "16": [
                "1 kg",
                "2 kg",
                "3 kg"
            ],

            "20": [
                "2 kg",
                "3 kg"
            ],

            "24": [
                "2 kg"
            ]

        };

        const newWeights =
            weights[String(newSize)] || [];

        setWeight(
            newWeights[0] || ""
        );

        /*
         * Reiniciar rellenos
         */

        setChangedFillings([]);

    }


    /*
     * CAMBIAR PESO
     */

    function handleWeightChange(newWeight) {

        setWeight(newWeight);

        setChangedFillings([]);

    }


    /*
     * ACTIVAR / DESACTIVAR EXTRA
     */

    function toggleExtra(name) {

        if (extras.includes(name)) {

            setExtras(
                extras.filter(
                    extra => extra !== name
                )
            );

            /*
             * Si se desactiva el cambio
             * de relleno, limpiamos
             * las selecciones.
             */

            if (
                name === "Cambio de relleno"
            ) {

                setChangedFillings([]);

            }

        } else {

            setExtras([
                ...extras,
                name
            ]);

        }

    }


    /*
     * CAMBIAR UN RELLENO
     */

    function handleFillingChange(
        index,
        value
    ) {

        setChangedFillings(
            current => {

                const updated = [
                    ...current
                ];

                updated[index] = value;

                return updated;

            }
        );

    }


    /*
     * CANTIDAD DE RELLENOS CAMBIADOS
     */

    const changedFillingsCount =
        changedFillings.filter(
            filling =>
                filling &&
                filling !== "Dulce de leche"
        ).length;


    /*
     * PRECIO DE EXTRAS
     */

    const extrasPrice = useMemo(() => {

        if (!product) {
            return 0;
        }

        const normalExtrasPrice =
            extras.reduce(
                (total, name) => {

                    if (
                        name ===
                        "Cambio de relleno"
                    ) {
                        return total;
                    }

                    const extra =
                        product.extras?.find(
                            e =>
                                e.name === name
                        );

                    return (
                        total +
                        (
                            extra
                                ? Number(
                                    extra.price || 0
                                )
                                : 0
                        )
                    );

                },
                0
            );


        const fillingPrice =
            changedFillingsCount *
            fillingChangePrice;


        return (
            normalExtrasPrice +
            fillingPrice
        );

    }, [
        extras,
        product,
        changedFillingsCount,
        fillingChangePrice
    ]);


    /*
     * PRECIO TOTAL
     */

    const totalPrice = useMemo(() => {

        if (!product) {
            return 0;
        }

        return (
            Number(
                product.prices?.[
                    selectedSize
                ] || 0
            ) +
            extrasPrice
        );

    }, [
        selectedSize,
        extrasPrice,
        product
    ]);


    /*
     * AGREGAR AL PEDIDO
     */

    function handleAdd() {

        if (!product) {
            return;
        }

        addToCart({

            ...product,

            size: selectedSize,

            weight:
                isPersonalized
                    ? selectedWeight
                    : "",

            flavor:
                selectedFlavor,

            filling:
                "Dulce de leche",

            covering:
                selectedCovering,

            extras,

            changedFillings,

            fillingChanges:
                changedFillingsCount,

            fillingChangePrice,

            note,

            price:
                totalPrice

        });


        alert(
            "Producto agregado al pedido."
        );

    }


    /*
     * CARGANDO
     */

    if (loading) {

        return (

            <Layout>

                <div className="text-center py-20">

                    <h2 className="text-2xl font-bold">

                        Cargando producto...

                    </h2>

                </div>

            </Layout>

        );

    }


    /*
     * PRODUCTO NO ENCONTRADO
     */

    if (!product) {

        return (

            <Layout>

                <div className="text-center py-20">

                    <h2 className="text-3xl font-bold">

                        Producto no encontrado

                    </h2>

                </div>

            </Layout>

        );

    }


    return (

        <Layout>

            <div className="max-w-xl mx-auto">


                {/* ================================= */}
                {/* IMAGEN */}
                {/* ================================= */}

                <div className="
                    rounded-3xl
                    overflow-hidden
                    bg-[#F8F3F0]
                ">

                    {product.image ? (

                        <img
                            src={product.image}
                            alt={product.name}
                            className="
                                w-full
                                h-auto
                                object-contain
                            "
                        />

                    ) : (

                        <div className="
                            h-56
                            flex
                            items-center
                            justify-center
                        ">

                            <span className="text-8xl">
                                🎂
                            </span>

                        </div>

                    )}

                </div>


                {/* ================================= */}
                {/* NOMBRE */}
                {/* ================================= */}

                <h1 className="
                    text-4xl
                    font-bold
                    mt-8
                    px-6
                ">

                    {product.name}

                </h1>


                {/* ================================= */}
                {/* DESCRIPCIÓN */}
                {/* ================================= */}

                <p className="
                    text-gray-600
                    mt-3
                    px-6
                ">

                    {product.description}

                </p>


                {/* ================================= */}
                {/* CONFIGURACIÓN */}
                {/* ================================= */}

                <div className="
                    mt-10
                    px-8
                ">

                    <div className="
                        max-w-lg
                        mx-auto
                        space-y-6
                    ">


                        {/* ================================= */}
                        {/* TAMAÑO */}
                        {/* ================================= */}

                        <div>

                            <label className="
                                font-semibold
                                block
                                mb-2
                            ">

                                Tamaño

                            </label>


                            <select
                                value={selectedSize}
                                onChange={(e) =>
                                    handleSizeChange(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >

                                {product.sizes?.map(
                                    option => (

                                        <option
                                            key={option}
                                            value={option}
                                        >

                                            {option} cm

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* ================================= */}
                        {/* PESO */}
                        {/* ================================= */}

                        {isPersonalized && (

                            <div>

                                <label className="
                                    font-semibold
                                    block
                                    mb-2
                                ">

                                    Peso

                                </label>


                                <select
                                    value={
                                        selectedWeight
                                    }
                                    onChange={(e) =>
                                        handleWeightChange(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        p-4
                                    "
                                >

                                    {availableWeights.map(
                                        option => (

                                            <option
                                                key={option}
                                                value={option}
                                            >

                                                {option}

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        )}


                        {/* ================================= */}
                        {/* BIZCOCHUELO */}
                        {/* ================================= */}

                        <div>

                            <label className="
                                font-semibold
                                block
                                mb-2
                            ">

                                Bizcochuelo

                            </label>


                            <select
                                value={selectedFlavor}
                                onChange={(e) =>
                                    setFlavor(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >

                                {product.flavors?.map(
                                    option => (

                                        <option
                                            key={option}
                                            value={option}
                                        >

                                            {option}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* ================================= */}
                        {/* RELLENO */}
                        {/* ================================= */}

                        <div>

                            <label className="
                                font-semibold
                                block
                                mb-2
                            ">

                                Relleno

                            </label>


                            <div className="
                                w-full
                                rounded-xl
                                border
                                p-4
                                bg-gray-50
                                text-gray-700
                            ">

                                Dulce de leche

                            </div>

                        </div>


                        {/* ================================= */}
                        {/* COBERTURA */}
                        {/* ================================= */}

                        <div>

                            <label className="
                                font-semibold
                                block
                                mb-2
                            ">

                                Cobertura

                            </label>


                            <select
                                value={selectedCovering}
                                onChange={(e) =>
                                    setCovering(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >

                                {product.coverings?.map(
                                    option => (

                                        <option
                                            key={option}
                                            value={option}
                                        >

                                            {option}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* ================================= */}
                        {/* EXTRAS */}
                        {/* ================================= */}

                        {product.extras?.length > 0 && (

                            <div>

                                <label className="
                                    font-semibold
                                    block
                                    mb-4
                                ">

                                    Extras

                                </label>


                                <div className="
                                    grid
                                    grid-cols-2
                                    gap-3
                                ">

                                    {product.extras
                                        .filter(
                                            extra =>
                                                extra.name !==
                                                "Cambio de relleno"
                                        )
                                        .map(
                                            extra => (

                                                <button
                                                    key={
                                                        extra.name
                                                    }
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

                                                    <div className="
                                                        font-semibold
                                                    ">

                                                        {extra.name}

                                                    </div>


                                                    <div className="
                                                        text-sm
                                                        mt-1
                                                    ">

                                                        +$

                                                        {Number(
                                                            extra.price ||
                                                            0
                                                        ).toLocaleString(
                                                            "es-AR"
                                                        )}

                                                    </div>

                                                </button>

                                            )
                                        )
                                    }


                                    {/* CAMBIO DE RELLENO */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleExtra(
                                                "Cambio de relleno"
                                            )
                                        }
                                        className={`
                                            rounded-2xl
                                            border
                                            p-4
                                            transition

                                            ${
                                                fillingChangeActive
                                                    ? "bg-[#D08A9B] text-white border-[#D08A9B]"
                                                    : "bg-white hover:bg-pink-50"
                                            }
                                        `}
                                    >

                                        <div className="
                                            font-semibold
                                        ">

                                            Cambio de relleno

                                        </div>


                                        <div className="
                                            text-sm
                                            mt-1
                                        ">

                                            +$

                                            {fillingChangePrice.toLocaleString(
                                                "es-AR"
                                            )}

                                            {" "}c/u

                                        </div>

                                    </button>

                                </div>


                                {/* ================================= */}
                                {/* RELLENOS */}
                                {/* ================================= */}

                                {fillingChangeActive && (

                                    <div className="
                                        mt-6
                                        space-y-4
                                    ">

                                        <div>

                                            <h3 className="
                                                font-semibold
                                                text-lg
                                            ">

                                                Elegí tus rellenos

                                            </h3>


                                            <p className="
                                                text-sm
                                                text-gray-500
                                                mt-1
                                            ">

                                                Podés cambiar hasta{" "}

                                                {fillingLimit}

                                                {" "}

                                                {fillingLimit === 1
                                                    ? "relleno"
                                                    : "rellenos"
                                                }

                                                .

                                            </p>

                                        </div>


                                        {Array.from({
                                            length:
                                                fillingLimit
                                        }).map(
                                            (_, index) => (

                                                <div
                                                    key={index}
                                                >

                                                    <label className="
                                                        font-semibold
                                                        block
                                                        mb-2
                                                    ">

                                                        Relleno{" "}

                                                        {index + 1}

                                                    </label>


                                                    <select
                                                        value={
                                                            changedFillings[
                                                                index
                                                            ] ||
                                                            "Dulce de leche"
                                                        }
                                                        onChange={(e) =>
                                                            handleFillingChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="
                                                            w-full
                                                            rounded-xl
                                                            border
                                                            p-4
                                                        "
                                                    >

                                                        <option
                                                            value="Dulce de leche"
                                                        >

                                                            Dulce de leche

                                                        </option>


                                                        {product.fillings
                                                            ?.filter(
                                                                filling =>
                                                                    filling !==
                                                                    "Dulce de leche"
                                                            )
                                                            .map(
                                                                filling => (

                                                                    <option
                                                                        key={
                                                                            filling
                                                                        }
                                                                        value={
                                                                            filling
                                                                        }
                                                                    >

                                                                        {filling}

                                                                    </option>

                                                                )
                                                            )
                                                        }

                                                    </select>

                                                </div>

                                            )
                                        )}

                                    </div>

                                )}

                            </div>

                        )}


                        {/* ================================= */}
                        {/* OBSERVACIONES */}
                        {/* ================================= */}

                        <div>

                            <label className="
                                font-semibold
                                block
                                mb-2
                            ">

                                Observaciones

                            </label>


                            <textarea
                                value={note}
                                onChange={(e) =>
                                    setNote(
                                        e.target.value
                                    )
                                }
                                placeholder="
                                    Ej.: Sin azúcar, nombre para la torta,
                                    colores, etc.
                                "
                                className="
                                    w-full
                                    h-32
                                    rounded-2xl
                                    border
                                    p-4
                                    resize-none
                                    text-left
                                    align-top
                                "
                            />

                        </div>


                        {/* ================================= */}
                        {/* TOTAL */}
                        {/* ================================= */}

                        <div className="
                            bg-white
                            rounded-3xl
                            shadow
                            p-6
                        ">

                            <div className="
                                flex
                                justify-between
                                items-center
                            ">

                                <span className="
                                    text-xl
                                    font-semibold
                                ">

                                    Total

                                </span>


                                <span className="
                                    text-3xl
                                    font-bold
                                    text-[#D08A9B]
                                ">

                                    $

                                    {totalPrice.toLocaleString(
                                        "es-AR"
                                    )}

                                </span>

                            </div>

                        </div>


                        {/* ================================= */}
                        {/* BOTÓN */}
                        {/* ================================= */}

                        <button
                            type="button"
                            onClick={handleAdd}
                            className="
                                w-full
                                rounded-full
                                py-4
                                bg-[#D08A9B]
                                text-white
                                text-lg
                                font-bold
                                hover:bg-[#c77c8f]
                                transition
                            "
                        >

                            Agregar al pedido

                        </button>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Product;