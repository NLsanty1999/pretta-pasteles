
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

    const [bentoForm, setBentoForm] = useState("");

    const [flavor, setFlavor] = useState("");
    const [covering, setCovering] = useState("");

    const [extras, setExtras] = useState([]);

    const [changedFillings, setChangedFillings] = useState([]);

    const [note, setNote] = useState("");


    /*
     * GALERÍA
     */

    const [selectedImage, setSelectedImage] = useState(0);

    const [isImageOpen, setIsImageOpen] = useState(false);


    /*
     * 20 CM / 5 KG
     * DOS BIZCOCHUELOS
     */

    const [secondFlavor, setSecondFlavor] = useState("");

    const [fiveKgFillings, setFiveKgFillings] = useState([
        "",
        ""
    ]);


    /*
     * TIPOS DE PRODUCTO
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
     * GALERÍA DE IMÁGENES
     *
     * Usa:
     *
     * product.image
     *
     * + todas las imágenes de:
     *
     * product.images
     *
     * Se eliminan imágenes repetidas.
     */

    const productImages = useMemo(() => {

        if (!product) {
            return [];
        }

        const images = [];

        if (product.image) {
            images.push(product.image);
        }

        if (Array.isArray(product.images)) {
            images.push(
                ...product.images.filter(Boolean)
            );
        }

        return [...new Set(images)];

    }, [product]);


    /*
     * CAMBIAR IMAGEN PRINCIPAL
     */

    function handleImageChange(index) {

        if (
            index < 0 ||
            index >= productImages.length
        ) {
            return;
        }

        setSelectedImage(index);

    }


    /*
     * SIGUIENTE IMAGEN
     */

    function nextImage() {

        if (productImages.length <= 1) {
            return;
        }

        setSelectedImage(
            current =>
                (current + 1) %
                productImages.length
        );

    }


    /*
     * IMAGEN ANTERIOR
     */

    function previousImage() {

        if (productImages.length <= 1) {
            return;
        }

        setSelectedImage(
            current =>
                (
                    current -
                    1 +
                    productImages.length
                ) %
                productImages.length
        );

    }


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

    const selectedBentoForm =
        bentoForm ||
        product?.bentoForms?.[0] ||
        product?.forms?.[0] ||
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
     * PESO SELECCIONADO
     */

    const selectedWeight =
        weight ||
        availableWeights[0] ||
        "";


    /*
     * 20 CM / 5 KG
     */

    const isFiveKg20cm =
        isPersonalized &&
        String(selectedSize) === "20" &&
        selectedWeight === "5 kg";


    /*
     * RELLENO POR DEFECTO
     */

    const defaultFilling =
        product?.fillings?.[0] ||
        "Dulce de leche";


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
     * CAMBIAR TAMAÑO / PRESENTACIÓN
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
     * CAMBIAR PESO
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
     * ACTIVAR / DESACTIVAR EXTRA
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
     * CAMBIAR RELLENO PARA 5 KG
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
     * CANTIDAD DE RELLENOS CAMBIADOS
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
     * PRECIO BASE
     */

    const priceKey =
        isBento
            ? "10"
            : isPersonalized
                ? `${selectedSize}-${selectedWeight}`
                : String(selectedSize);


    /*
     * PRECIO BASE
     */

    const basePrice =
        Number(
            product?.prices?.[priceKey] || 0
        );


    /*
     * PRECIO TOTAL
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
     * AGREGAR AL PEDIDO
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
         * AGREGAR CAMBIO DE RELLENO
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
         * CONFIGURACIÓN DE BIZCOCHUELOS
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
         * CONFIGURACIÓN DE RELLENOS
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
         * AGREGAR AL CARRITO
         */

        addToCart({

            ...product,

            size:
                isBento
                    ? "10"
                    : selectedSize,

            bentoForm:
                isBento
                    ? selectedBentoForm
                    : "",

            weight:
                isPersonalized
                    ? selectedWeight
                    : "",

            flavor:
                selectedFlavor,

            flavorsSelected:
                selectedFlavors,

            filling:
                isFiveKg20cm
                    ? selectedFillings[0]
                    : (
                        selectedFillings[0] ||
                        ""
                    ),

            fillingsSelected:
                selectedFillings,

            covering:
                selectedCovering,

            extras,

            changedFillings:
                isFiveKg20cm
                    ? selectedFillings
                    : changedFillings,

            fillingChanges:
                changedFillingsCount,

            fillingChangePrice,

            basePrice,

            extraDetails,

            priceKey,

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
                {/* GALERÍA DE IMÁGENES */}
                {/* ================================= */}

                <div className="relative">

                    <div
                        className="
                            w-full
                            overflow-hidden
                            bg-[#F8F3F0]
                            cursor-pointer
                        "
                        onClick={() => {

                            if (
                                productImages.length > 0
                            ) {
                                setIsImageOpen(true);
                            }

                        }}
                    >

                        {productImages.length > 0 ? (

                            <img
                                src={
                                    productImages[
                                        selectedImage
                                    ]
                                }
                                alt={
                                    `${product.name} ${
                                        selectedImage + 1
                                    }`
                                }
                                className="
                                    w-full
                                    h-auto
                                    object-contain
                                    block
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
                    {/* FLECHA ANTERIOR */}
                    {/* ================================= */}

                    {productImages.length > 1 && (

                        <button
                            type="button"
                            aria-label="Imagen anterior"
                            onClick={(e) => {

                                e.stopPropagation();

                                previousImage();

                            }}
                            className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                w-10
                                h-10
                                rounded-full
                                bg-white/85
                                backdrop-blur-sm
                                shadow
                                flex
                                items-center
                                justify-center
                                text-xl
                                text-[#5A3B31]
                                hover:bg-white
                                transition
                            "
                        >

                            ‹

                        </button>

                    )}


                    {/* ================================= */}
                    {/* FLECHA SIGUIENTE */}
                    {/* ================================= */}

                    {productImages.length > 1 && (

                        <button
                            type="button"
                            aria-label="Siguiente imagen"
                            onClick={(e) => {

                                e.stopPropagation();

                                nextImage();

                            }}
                            className="
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2
                                w-10
                                h-10
                                rounded-full
                                bg-white/85
                                backdrop-blur-sm
                                shadow
                                flex
                                items-center
                                justify-center
                                text-xl
                                text-[#5A3B31]
                                hover:bg-white
                                transition
                            "
                        >

                            ›

                        </button>

                    )}

                </div>


                {/* ================================= */}
                {/* PUNTOS DE LA GALERÍA */}
                {/* ================================= */}

                {productImages.length > 1 && (

                    <div className="
                        flex
                        justify-center
                        items-center
                        gap-2
                        mt-4
                    ">

                        {productImages.map(
                            (image, index) => (

                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    aria-label={
                                        `Ver imagen ${
                                            index + 1
                                        }`
                                    }
                                    onClick={() =>
                                        handleImageChange(
                                            index
                                        )
                                    }
                                    className={`
                                        w-2
                                        h-2
                                        rounded-full
                                        transition-all
                                        ${
                                            selectedImage === index
                                                ? "bg-[#D08A9B] scale-125"
                                                : "bg-[#D8C7C0]"
                                        }
                                    `}
                                />

                            )
                        )}

                    </div>

                )}


                {/* ================================= */}
                {/* MINIATURAS */}
                {/* ================================= */}

                {productImages.length > 1 && (

                    <div className="
                        flex
                        gap-3
                        mt-4
                        overflow-x-auto
                        pb-2
                    ">

                        {productImages.map(
                            (image, index) => (

                                <button
                                    key={`thumbnail-${image}-${index}`}
                                    type="button"
                                    onClick={() =>
                                        handleImageChange(
                                            index
                                        )
                                    }
                                    className={`
                                        flex-shrink-0
                                        w-20
                                        h-20
                                        overflow-hidden
                                        border-2
                                        transition
                                        ${
                                            selectedImage === index
                                                ? "border-[#D08A9B]"
                                                : "border-transparent"
                                        }
                                    `}
                                >

                                    <img
                                        src={image}
                                        alt=""
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                    />

                                </button>

                            )
                        )}

                    </div>

                )}


                {/* ================================= */}
                {/* IMAGEN EN GRANDE */}
                {/* ================================= */}

                {isImageOpen &&
                    productImages.length > 0 && (

                    <div
                        className="
                            fixed
                            inset-0
                            z-[100]
                            bg-black/90
                            flex
                            items-center
                            justify-center
                            p-4
                        "
                        onClick={() =>
                            setIsImageOpen(false)
                        }
                    >

                        {/* CERRAR */}

                        <button
                            type="button"
                            aria-label="Cerrar"
                            onClick={() =>
                                setIsImageOpen(false)
                            }
                            className="
                                absolute
                                top-5
                                right-5
                                z-[110]
                                w-10
                                h-10
                                rounded-full
                                bg-white/90
                                text-[#5A3B31]
                                text-2xl
                                flex
                                items-center
                                justify-center
                                shadow-lg
                            "
                        >

                            ×

                        </button>


                        {/* IMAGEN */}

                        <img
                            src={
                                productImages[
                                    selectedImage
                                ]
                            }
                            alt={product.name}
                            className="
                                max-w-full
                                max-h-[90vh]
                                object-contain
                                select-none
                            "
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        />


                        {/* ANTERIOR */}

                        {productImages.length > 1 && (

                            <button
                                type="button"
                                aria-label="Imagen anterior"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    previousImage();

                                }}
                                className="
                                    absolute
                                    left-3
                                    sm:left-6
                                    top-1/2
                                    -translate-y-1/2
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-white/90
                                    text-[#5A3B31]
                                    text-3xl
                                    flex
                                    items-center
                                    justify-center
                                    shadow-lg
                                "
                            >

                                ‹

                            </button>

                        )}


                        {/* SIGUIENTE */}

                        {productImages.length > 1 && (

                            <button
                                type="button"
                                aria-label="Siguiente imagen"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    nextImage();

                                }}
                                className="
                                    absolute
                                    right-3
                                    sm:right-6
                                    top-1/2
                                    -translate-y-1/2
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-white/90
                                    text-[#5A3B31]
                                    text-3xl
                                    flex
                                    items-center
                                    justify-center
                                    shadow-lg
                                "
                            >

                                ›

                            </button>

                        )}


                        {/* CONTADOR */}

                        {productImages.length > 1 && (

                            <div className="
                                absolute
                                bottom-6
                                left-1/2
                                -translate-x-1/2
                                bg-black/60
                                text-white
                                text-sm
                                px-4
                                py-2
                                rounded-full
                            ">

                                {selectedImage + 1}
                                {" / "}
                                {productImages.length}

                            </div>

                        )}

                    </div>

                )}


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

