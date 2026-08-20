
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
     * ==========================================
     * BUSCAR PRODUCTO
     * ==========================================
     */

    const product = products.find(
        p =>
            String(p.id) === String(id) ||
            String(p.slug) === String(id)
    );


    /*
     * ==========================================
     * ESTADOS
     * ==========================================
     */

    const [size, setSize] = useState("");
    const [weight, setWeight] = useState("");

    const [bentoForm, setBentoForm] = useState("");

    const [flavor, setFlavor] = useState("");
    const [covering, setCovering] = useState("");

    const [extras, setExtras] = useState([]);

    const [changedFillings, setChangedFillings] = useState([]);

    const [note, setNote] = useState("");


    /*
     * ==========================================
     * 20 CM / 5 KG
     * DOS BIZCOCHUELOS
     * ==========================================
     */

    const [secondFlavor, setSecondFlavor] = useState("");

    const [fiveKgFillings, setFiveKgFillings] = useState([
        "",
        ""
    ]);


    /*
     * ==========================================
     * TIPOS DE PRODUCTO
     * ==========================================
     */

    const isPersonalized =
        product?.type === "personalizada";

    const isAlfajor =
        product?.category === 4 ||
        product?.type === "alfajor";

    const isMesaDulce =
        product?.type === "mesaDulce";

    const isBento =
        Number(product?.category) === 5 ||
        product?.type === "bento";

    const isCookies =
        product?.category === 6 ||
        product?.type === "cookies";


    /*
     * ==========================================
     * VALORES POR DEFECTO
     * ==========================================
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

    const selectedBentoForm =
        bentoForm ||
        product?.bentoForms?.[0] ||
        product?.forms?.[0] ||
        "";


    /*
     * ==========================================
     * PESOS DISPONIBLES
     *
     * SOLO PERSONALIZADAS
     * ==========================================
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
                "3 kg",
                "5 kg"
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
     * ==========================================
     * PESO SELECCIONADO
     * ==========================================
     */

    const selectedWeight =
        weight ||
        availableWeights[0] ||
        "";


    /*
     * ==========================================
     * 20 CM / 5 KG
     * ==========================================
     */

    const isFiveKg20cm =
        isPersonalized &&
        String(selectedSize) === "20" &&
        selectedWeight === "5 kg";


    /*
     * ==========================================
     * RELLENO POR DEFECTO
     * ==========================================
     */

    const defaultFilling =
        product?.fillings?.[0] ||
        "Dulce de leche";


    /*
     * ==========================================
     * CANTIDAD DE RELLENOS
     * ==========================================
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
            "20-5 kg": 2,

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
     * ==========================================
     * CAMBIO DE RELLENO ACTIVADO
     * ==========================================
     */

    const fillingChangeActive =
        extras.includes("Cambio de relleno");


    /*
     * ==========================================
     * PRECIO DEL CAMBIO DE RELLENO
     * ==========================================
     */

    const fillingChangePrice =
        Number(
            product?.fillingChangePrice || 0
        );


    /*
     * ==========================================
     * CAMBIAR TAMAÑO
     * ==========================================
     */

    function handleSizeChange(newSize) {

        setSize(newSize);

        if (isPersonalized) {

            const weights = {

                "16": [
                    "1 kg",
                    "2 kg",
                    "3 kg"
                ],

                "20": [
                    "2 kg",
                    "3 kg",
                    "5 kg"
                ],

                "24": [
                    "2 kg"
                ]

            };

            const newWeights =
                weights[String(newSize)] || [];

            const newWeight =
                newWeights[0] || "";

            setWeight(newWeight);

            setChangedFillings([]);

            setSecondFlavor("");

            setFiveKgFillings([
                "",
                ""
            ]);

        }

    }


    /*
     * ==========================================
     * CAMBIAR PESO
     * ==========================================
     */

    function handleWeightChange(newWeight) {

        setWeight(newWeight);

        setChangedFillings([]);

        if (
            String(selectedSize) !== "20" ||
            newWeight !== "5 kg"
        ) {

            setSecondFlavor("");

            setFiveKgFillings([
                "",
                ""
            ]);

        }

    }


    /*
     * ==========================================
     * ACTIVAR / DESACTIVAR EXTRA
     * ==========================================
     */

    function toggleExtra(name) {

        if (extras.includes(name)) {

            setExtras(
                extras.filter(
                    extra => extra !== name
                )
            );

            if (
                name === "Cambio de relleno"
            ) {

                setChangedFillings([]);

                setFiveKgFillings([
                    "",
                    ""
                ]);

            }

        }

        else {

            setExtras([
                ...extras,
                name
            ]);

        }

    }


    /*
     * ==========================================
     * CAMBIAR RELLENO
     * ==========================================
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
     * ==========================================
     * CAMBIAR RELLENO 5 KG
     * ==========================================
     */

    function handleFiveKgFillingChange(
        index,
        value
    ) {

        setFiveKgFillings(
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
     * ==========================================
     * CANTIDAD DE RELLENOS CAMBIADOS
     * ==========================================
     */

    const changedFillingsCount =
        isFiveKg20cm
            ? fiveKgFillings.filter(
                filling =>
                    filling &&
                    filling !== defaultFilling
            ).length
            : changedFillings.filter(
                filling =>
                    filling &&
                    filling !== defaultFilling
            ).length;


    /*
     * ==========================================
     * PRECIO DE EXTRAS
     * ==========================================
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
     * ==========================================
     * CLAVE DEL PRECIO
     * ==========================================
     *
     * PERSONALIZADAS
     *
     * Firebase guarda:
     *
     * 16-1
     * 16-2
     * 16-3
     * 20-2
     * 20-3
     * 20-5
     * 24-2
     *
     * Por eso quitamos " kg" del peso.
     *
     * EJEMPLO:
     *
     * selectedSize = "16"
     * selectedWeight = "2 kg"
     *
     * priceKey = "16-2"
     *
     * ------------------------------------------
     *
     * CLÁSICAS
     *
     * Firebase mantiene:
     *
     * "16"
     * "20"
     * "24"
     *
     * Por eso las clásicas siguen buscando
     * solamente por centímetros.
     * ==========================================
     */

    const numericWeight =
        String(selectedWeight)
            .replace(" kg", "")
            .trim();


    const priceKey =
        isBento
            ? "10"
            : isPersonalized
                ? `${String(selectedSize)}-${numericWeight}`
                : String(selectedSize);


    /*
     * ==========================================
     * PRECIO BASE
     * ==========================================
     */

    const basePrice =
        Number(
            product?.prices?.[priceKey] || 0
        );


    /*
     * ==========================================
     * PRECIO TOTAL
     * ==========================================
     */

    const totalPrice = useMemo(() => {

        if (!product) {
            return 0;
        }

        return (
            basePrice +
            extrasPrice
        );

    }, [
        product,
        basePrice,
        extrasPrice
    ]);


    /*
     * ==========================================
     * AGREGAR AL PEDIDO
     * ==========================================
     */

    function handleAdd() {

        if (!product) {
            return;
        }


        /*
         * DETALLE DE EXTRAS
         */

        const extraDetails = extras
            .filter(
                name =>
                    name !== "Cambio de relleno"
            )
            .map(name => {

                const extra =
                    product.extras?.find(
                        e =>
                            e.name === name
                    );

                return {

                    name,

                    price:
                        Number(
                            extra?.price || 0
                        )

                };

            });


        /*
         * CAMBIO DE RELLENO
         */

        if (
            fillingChangeActive &&
            changedFillingsCount > 0
        ) {

            extraDetails.push({

                name:
                    `Cambio de relleno${
                        changedFillingsCount > 1
                            ? ` × ${changedFillingsCount}`
                            : ""
                    }`,

                price:
                    fillingChangePrice *
                    changedFillingsCount

            });

        }


        /*
         * ==========================================
         * CONFIGURACIÓN DE BIZCOCHUELOS
         * ==========================================
         */

        const selectedFlavors =
            isFiveKg20cm
                ? [
                    selectedFlavor,

                    secondFlavor ||
                    product?.flavors?.[0] ||
                    ""
                ]
                : [
                    selectedFlavor
                ];


        /*
         * ==========================================
         * CONFIGURACIÓN DE RELLENOS
         * ==========================================
         */

        const selectedFillings =
            isFiveKg20cm
                ? [

                    fiveKgFillings[0] ||
                    defaultFilling,

                    fiveKgFillings[1] ||
                    defaultFilling

                ]
                : (
                    changedFillings.length > 0
                        ? changedFillings
                        : []
                );


        /*
         * ==========================================
         * AGREGAR AL CARRITO
         * ==========================================
         */

        addToCart({

            ...product,


            /*
             * TAMAÑO
             */

            size:
                isBento
                    ? "10"
                    : selectedSize,


            /*
             * FORMA BENTO
             */

            bentoForm:
                isBento
                    ? selectedBentoForm
                    : "",


            /*
             * PESO
             */

            weight:
                isPersonalized
                    ? selectedWeight
                    : "",


            /*
             * BIZCOCHUELO PRINCIPAL
             */

            flavor:
                selectedFlavor,


            /*
             * TODOS LOS BIZCOCHUELOS
             */

            flavorsSelected:
                selectedFlavors,


            /*
             * RELLENO PRINCIPAL
             */

            filling:
                isFiveKg20cm
                    ? selectedFillings[0]
                    : (
                        selectedFillings[0] ||
                        ""
                    ),


            /*
             * TODOS LOS RELLENOS
             */

            fillingsSelected:
                selectedFillings,


            /*
             * COBERTURA
             */

            covering:
                selectedCovering,


            /*
             * EXTRAS
             */

            extras,


            /*
             * RELLENOS MODIFICADOS
             */

            changedFillings:
                isFiveKg20cm
                    ? selectedFillings
                    : changedFillings,

            fillingChanges:
                changedFillingsCount,

            fillingChangePrice,


            /*
             * ==========================================
             * DETALLE DE PRECIO
             * ==========================================
             */

            basePrice,

            extraDetails,

            priceKey,


            /*
             * OBSERVACIONES
             */

            note,


            /*
             * PRECIO FINAL
             */

            price:
                totalPrice

        });


        alert(
            "Producto agregado al pedido."
        );

    }


    /*
     * ==========================================
     * CARGANDO
     * ==========================================
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
     * ==========================================
     * PRODUCTO NO ENCONTRADO
     * ==========================================
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
                        {/* PRESENTACIÓN / TAMAÑO */}
                        {/* ================================= */}

                        {!isBento && (

                            <div>

                                <label className="
                                    font-semibold
                                    block
                                    mb-2
                                ">

                                    {
                                        isAlfajor ||
                                        isMesaDulce ||
                                        isCookies
                                            ? "Presentación"
                                            : "Tamaño"
                                    }

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

                                                {
                                                    isAlfajor ||
                                                    isMesaDulce ||
                                                    isCookies
                                                        ? `${option} unidades`
                                                        : `${option} cm`
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        )}


                        {/* ================================= */}
                        {/* BENTO CAKES */}
                        {/* ================================= */}

                        {isBento && (

                            <>

                                <div>

                                    <label className="
                                        font-semibold
                                        block
                                        mb-2
                                    ">

                                        Forma

                                    </label>


                                    <select
                                        value={selectedBentoForm}
                                        onChange={(e) =>
                                            setBentoForm(
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

                                        {(
                                            product.bentoForms ||
                                            product.forms ||
                                            []
                                        ).map(
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


                                <div>

                                    <label className="
                                        font-semibold
                                        block
                                        mb-2
                                    ">

                                        Tamaño

                                    </label>


                                    <div className="
                                        w-full
                                        rounded-xl
                                        border
                                        p-4
                                        bg-gray-50
                                        text-gray-700
                                    ">

                                        10 cm

                                    </div>

                                </div>


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

                            </>

                        )}


                        {/* ================================= */}
                        {/* PESO PERSONALIZADA */}
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
                                    value={selectedWeight}
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
                        {/* BIZCOCHUELO PERSONALIZADA */}
                        {/* ================================= */}

                        {isPersonalized &&
                            !isFiveKg20cm && (

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

                        )}


                        {/* ================================= */}
                        {/* 20 CM / 5 KG */}
                        {/* DOS BIZCOCHUELOS */}
                        {/* ================================= */}

                        {isFiveKg20cm && (

                            <div className="
                                space-y-5
                            ">

                                <div>

                                    <h3 className="
                                        font-semibold
                                        text-lg
                                    ">

                                        Bizcochuelos

                                    </h3>


                                    <p className="
                                        text-sm
                                        text-gray-500
                                        mt-1
                                    ">

                                        Para la torta de 5 kg
                                        podés elegir dos
                                        bizcochuelos diferentes.

                                    </p>

                                </div>


                                {/* BIZCOCHUELO 1 */}

                                <div>

                                    <label className="
                                        font-semibold
                                        block
                                        mb-2
                                    ">

                                        Bizcochuelo 1

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


                                {/* BIZCOCHUELO 2 */}

                                <div>

                                    <label className="
                                        font-semibold
                                        block
                                        mb-2
                                    ">

                                        Bizcochuelo 2

                                    </label>


                                    <select
                                        value={
                                            secondFlavor ||
                                            product?.flavors?.[0] ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            setSecondFlavor(
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

                            </div>

                        )}


                        {/* ================================= */}
                        {/* RELLENO BASE */}
                        {/* ================================= */}

                        {isPersonalized &&
                            !fillingChangeActive && (

                            <div className="mt-6">

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
                                ">

                                    {defaultFilling}

                                </div>

                            </div>

                        )}


                        {/* ================================= */}
                        {/* COBERTURA PERSONALIZADA */}
                        {/* ================================= */}

                        {isPersonalized && (

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

                        )}


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


                                    {/* CAMBIO DE RELLENO */}

                                    {isPersonalized && (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleExtra(
                                                    "Cambio de relleno"
                                                )
                                            }
                                            className={`
                                                col-span-2
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

                                    )}


                                    {/* RESTO DE EXTRAS */}

                                    {product.extras
                                        .filter(
                                            extra =>
                                                extra.name !==
                                                "Cambio de relleno"
                                        )
                                        .map(
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

                                </div>


                                {/* ================================= */}
                                {/* RELLENOS NORMALES */}
                                {/* ================================= */}

                                {isPersonalized &&
                                    fillingChangeActive &&
                                    !isFiveKg20cm && (

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

                                                {
                                                    fillingLimit === 1
                                                        ? "relleno"
                                                        : "rellenos"
                                                }.

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
                                                            defaultFilling
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
                                                            value={
                                                                defaultFilling
                                                            }
                                                        >

                                                            {
                                                                defaultFilling
                                                            }

                                                        </option>


                                                        {product.fillings
                                                            ?.filter(
                                                                filling =>
                                                                    filling !==
                                                                    defaultFilling
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


                                {/* ================================= */}
                                {/* RELLENOS 20 CM / 5 KG */}
                                {/* ================================= */}

                                {isFiveKg20cm &&
                                    fillingChangeActive && (

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

                                                Cada bizcochuelo
                                                puede tener un
                                                solo relleno.

                                            </p>

                                        </div>


                                        {/* RELLENO 1 */}

                                        <div>

                                            <label className="
                                                font-semibold
                                                block
                                                mb-2
                                            ">

                                                Relleno del
                                                bizcochuelo 1

                                            </label>


                                            <select
                                                value={
                                                    fiveKgFillings[0] ||
                                                    defaultFilling
                                                }
                                                onChange={(e) =>
                                                    handleFiveKgFillingChange(
                                                        0,
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
                                                    value={
                                                        defaultFilling
                                                    }
                                                >

                                                    {
                                                        defaultFilling
                                                    }

                                                </option>


                                                {product.fillings
                                                    ?.filter(
                                                        filling =>
                                                            filling !==
                                                            defaultFilling
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


                                        {/* RELLENO 2 */}

                                        <div>

                                            <label className="
                                                font-semibold
                                                block
                                                mb-2
                                            ">

                                                Relleno del
                                                bizcochuelo 2

                                            </label>


                                            <select
                                                value={
                                                    fiveKgFillings[1] ||
                                                    defaultFilling
                                                }
                                                onChange={(e) =>
                                                    handleFiveKgFillingChange(
                                                        1,
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
                                                    value={
                                                        defaultFilling
                                                    }
                                                >

                                                    {
                                                        defaultFilling
                                                    }

                                                </option>


                                                {product.fillings
                                                    ?.filter(
                                                        filling =>
                                                            filling !==
                                                            defaultFilling
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
                                placeholder="Ej.: Sin azúcar, nombre para la torta, colores, etc."
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

