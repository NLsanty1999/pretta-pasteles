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


    /* =========================
       ESTADOS
    ========================= */

    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");
    const [extras, setExtras] = useState([]);

    // Bento
    const [bentoForm, setBentoForm] = useState("");
    const [bentoFlavor, setBentoFlavor] = useState("");
    const [bentoCovering, setBentoCovering] = useState("");

    // Galería
    const [selectedImage, setSelectedImage] = useState(0);

    // Visor grande
    const [lightboxOpen, setLightboxOpen] = useState(false);


    /* =========================
       TIPOS DE PRODUCTO
    ========================= */

    const isAlfajor =
        product?.type === "alfajor";

    const isMesaDulce =
        product?.type === "mesaDulce";

    const isCookies =
        product?.type === "cookies";

    const isBento =
        product?.type === "bento" ||
        Number(product?.category) === 5;


    /* =========================
       CONFIGURAR TAMAÑO
    ========================= */

    useEffect(() => {

        if (!product) return;


        if (product.type === "mesaDulce") {

            setSize(
                String(product.quantity ?? "")
            );

            return;

        }


        if (product.sizes?.length) {

            setSize(
                String(product.sizes[0])
            );

        }

    }, [product]);


    /* =========================
       CONFIGURAR BENTO
    ========================= */

    useEffect(() => {

        if (!product || !isBento) {
            return;
        }


        /*
         * FORMAS
         *
         * Firebase:
         * bentoFormas
         */

        const forms =
            product.bentoFormas ||
            [];


        /*
         * BIZCOCHUELOS
         *
         * Firebase:
         * bentoBizcochuelos
         */

        const bizcochuelos =
            product.bentoBizcochuelos ||
            [];


        /*
         * COBERTURAS
         *
         * Si en Firebase hay coberturas,
         * usamos esas.
         *
         * Si está vacío, usamos Buttercream.
         */

        const coverings =
            product.coverings?.length
                ? product.coverings
                : ["Buttercream"];


        /*
         * PRIMERA FORMA
         */

        setBentoForm(
            forms[0] || ""
        );


        /*
         * PRIMER BIZCOCHUELO
         */

        setBentoFlavor(
            bizcochuelos[0] || ""
        );


        /*
         * PRIMERA COBERTURA
         */

        setBentoCovering(
            coverings[0] || ""
        );


        /*
         * TAMAÑO
         */

        if (product.sizes?.length) {

            setSize(
                String(product.sizes[0])
            );

        }
        else {

            setSize("10");

        }

    }, [product, isBento]);


    /* =========================
       GALERÍA
    ========================= */

    const galleryImages =
        product?.images?.filter(Boolean) || [];


    /* =========================
       IMAGEN ACTUAL
    ========================= */

    const currentImage =
        galleryImages[selectedImage] ||
        galleryImages[0] ||
        null;


    /* =========================
       CAMBIAR IMAGEN
    ========================= */

    function changeImage(index) {

        if (!galleryImages.length) {
            return;
        }

        setSelectedImage(index);

    }


    /* =========================
       SIGUIENTE IMAGEN
    ========================= */

    function nextImage() {

        if (galleryImages.length <= 1) {
            return;
        }

        setSelectedImage(
            currentIndex =>
                (currentIndex + 1) %
                galleryImages.length
        );

    }


    /* =========================
       IMAGEN ANTERIOR
    ========================= */

    function previousImage() {

        if (galleryImages.length <= 1) {
            return;
        }

        setSelectedImage(
            currentIndex =>
                (
                    currentIndex -
                    1 +
                    galleryImages.length
                ) %
                galleryImages.length
        );

    }


    /* =========================
       PRECIO BASE
    ========================= */

    const basePrice = useMemo(() => {

        if (!product) {
            return 0;
        }


        if (product.type === "mesaDulce") {

            return Number(
                product.prices?.mesaDulce ?? 0
            );

        }


        if (size) {

            const prices =
                product.prices || {};


            /*
             * Primero busca el tamaño exacto.
             */

            if (
                prices[String(size)] !== undefined
            ) {

                return Number(
                    prices[String(size)] || 0
                );

            }


            /*
             * Compatibilidad con el Bento
             * si Firebase tiene la clave "100".
             */

            if (
                isBento &&
                prices["100"] !== undefined
            ) {

                return Number(
                    prices["100"] || 0
                );

            }

        }


        return 0;

    }, [
        product,
        size,
        isBento
    ]);


    /* =========================
       PRECIO EXTRAS
    ========================= */

    const extrasPrice = useMemo(() => {

        if (!product) {
            return 0;
        }


        const singleExtrasPrice =
            extras.reduce(
                (total, extraName) => {

                    const extra =
                        product.extras?.find(
                            e =>
                                e.name === extraName
                        );


                    return (
                        total +
                        (
                            extra
                                ? Number(
                                    extra.price ?? 0
                                )
                                : 0
                        )
                    );

                },
                0
            );


        return (
            singleExtrasPrice *
            quantity
        );

    }, [
        product,
        extras,
        quantity
    ]);


    /* =========================
       PRECIO TOTAL
    ========================= */

    const price = useMemo(() => {

        return (
            basePrice * quantity +
            extrasPrice
        );

    }, [
        basePrice,
        quantity,
        extrasPrice
    ]);


    /* =========================
       SELECCIONAR EXTRA
    ========================= */

    function toggleExtra(extraName) {

        setExtras(currentExtras => {

            if (
                currentExtras.includes(
                    extraName
                )
            ) {

                return currentExtras.filter(
                    name =>
                        name !== extraName
                );

            }


            return [
                ...currentExtras,
                extraName
            ];

        });

    }


    /* =========================
       CARGANDO
    ========================= */

    if (loading) {

        return (

            <Layout>

                <h2 className="
                    text-center
                    text-2xl
                    mt-10
                ">

                    Cargando producto...

                </h2>

            </Layout>

        );

    }


    /* =========================
       PRODUCTO NO ENCONTRADO
    ========================= */

    if (!product) {

        return (

            <Layout>

                <div className="
                    text-center
                    mt-10
                ">

                    Producto no encontrado

                </div>

            </Layout>

        );

    }


    const available =
        product.available !== false;


    /* =========================
       DATOS BENTO
    ========================= */

    const bentoForms =
        product.bentoFormas || [];


    const bentoBizcochuelos =
        product.bentoBizcochuelos || [];


    const bentoCoverings =
        product.coverings?.length
            ? product.coverings
            : ["Buttercream"];


    /* =========================
       AGREGAR AL PEDIDO
    ========================= */

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

            /*
             * Datos Bento
             */

            bentoForm:
                isBento
                    ? bentoForm
                    : "",

            flavor:
                isBento
                    ? bentoFlavor
                    : "",

            covering:
                isBento
                    ? bentoCovering
                    : "",

            price

        });


        alert(
            "Producto agregado al pedido."
        );

    }


    return (

        <Layout>

            <div className="max-w-xl mx-auto">


                {/* =========================
                    GALERÍA
                ========================= */}

                <div className="px-2">


                    {/* IMAGEN PRINCIPAL */}

                    <div
                        className={`
                            rounded-3xl
                            overflow-hidden
                            flex
                            items-center
                            justify-center
                            p-3
                            cursor-pointer
                            ${
                                available
                                    ? "bg-[#F8F3F0]"
                                    : "bg-gray-100"
                            }
                        `}
                        onClick={() => {

                            if (
                                galleryImages.length > 0
                            ) {

                                setLightboxOpen(true);

                            }

                        }}
                    >

                        {currentImage ? (

                            <img
                                src={currentImage}
                                alt={product.name}
                                className="
                                    w-full
                                    h-auto
                                    object-contain
                                    rounded-2xl
                                "
                            />

                        ) : (

                            <span className="
                                text-7xl
                                py-12
                            ">

                                🎂

                            </span>

                        )}

                    </div>


                    {/* MINIATURAS */}

                    {galleryImages.length > 1 && (

                        <div className="
                            flex
                            justify-center
                            gap-2
                            mt-3
                            px-2
                        ">

                            {galleryImages.map(
                                (image, index) => (

                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() =>
                                            changeImage(index)
                                        }
                                        className={`
                                            w-14
                                            h-14
                                            rounded-xl
                                            overflow-hidden
                                            border-2
                                            transition
                                            ${
                                                selectedImage === index
                                                    ? "border-[#D08A9B]"
                                                    : "border-transparent opacity-70"
                                            }
                                        `}
                                    >

                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
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

                </div>


                {/* =========================
                    VISOR GRANDE
                ========================= */}

                {lightboxOpen && currentImage && (

                    <div
                        className="
                            fixed
                            inset-0
                            z-[200]
                            bg-black/90
                            flex
                            items-center
                            justify-center
                            p-4
                        "
                        onClick={() =>
                            setLightboxOpen(false)
                        }
                    >

                        <button
                            type="button"
                            onClick={() =>
                                setLightboxOpen(false)
                            }
                            className="
                                absolute
                                top-5
                                right-5
                                w-10
                                h-10
                                rounded-full
                                bg-white/20
                                text-white
                                text-2xl
                                flex
                                items-center
                                justify-center
                                z-10
                            "
                        >

                            ×

                        </button>


                        {galleryImages.length > 1 && (

                            <button
                                type="button"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    previousImage();

                                }}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-white/20
                                    text-white
                                    text-3xl
                                    flex
                                    items-center
                                    justify-center
                                    z-10
                                "
                            >

                                ‹

                            </button>

                        )}


                        <img
                            src={currentImage}
                            alt={product.name}
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            className="
                                max-w-full
                                max-h-[85vh]
                                object-contain
                                rounded-xl
                                select-none
                            "
                        />


                        {galleryImages.length > 1 && (

                            <button
                                type="button"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    nextImage();

                                }}
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-white/20
                                    text-white
                                    text-3xl
                                    flex
                                    items-center
                                    justify-center
                                    z-10
                                "
                            >

                                ›

                            </button>

                        )}


                        {galleryImages.length > 1 && (

                            <div className="
                                absolute
                                bottom-6
                                left-1/2
                                -translate-x-1/2
                                text-white
                                text-sm
                                bg-black/40
                                px-3
                                py-1
                                rounded-full
                            ">

                                {selectedImage + 1}
                                {" / "}
                                {galleryImages.length}

                            </div>

                        )}

                    </div>

                )}


                {/* =========================
                    NOMBRE
                ========================= */}

                <div className="px-6">

                    <div className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        mt-8
                    ">

                        <h1 className="
                            text-4xl
                            font-bold
                        ">

                            {product.name}

                        </h1>


                        {!available && (

                            <span className="
                                bg-red-100
                                text-red-700
                                px-4
                                py-2
                                rounded-full
                                font-bold
                                text-sm
                                whitespace-nowrap
                            ">

                                FUERA DE STOCK

                            </span>

                        )}

                    </div>


                    <p className="
                        text-gray-500
                        mt-3
                    ">

                        {product.description}

                    </p>

                </div>


                {!available ? (

                    <div className="
                        mx-6
                        mt-8
                        bg-red-50
                        border
                        border-red-200
                        rounded-3xl
                        p-6
                        text-center
                    ">

                        <p className="
                            text-red-700
                            font-semibold
                            text-lg
                        ">

                            Este producto no está
                            disponible actualmente.

                        </p>

                        <p className="
                            text-red-500
                            mt-2
                        ">

                            Podés volver a consultar
                            más adelante.

                        </p>

                    </div>

                ) : (

                    <div className="
                        px-7
                    ">


                        {/* =========================
                            BENTO CAKES
                        ========================= */}

                        {isBento && (

                            <div className="
                                mt-8
                                space-y-6
                            ">


                                {/* FORMA */}

                                <div>

                                    <h2 className="
                                        font-bold
                                        text-xl
                                        mb-3
                                    ">

                                        Forma

                                    </h2>


                                    {bentoForms.length > 0 ? (

                                        <select
                                            value={bentoForm}
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

                                            {bentoForms.map(
                                                (option, index) => (

                                                    <option
                                                        key={`${option}-${index}`}
                                                        value={option}
                                                    >

                                                        {option}

                                                    </option>

                                                )
                                            )}

                                        </select>

                                    ) : (

                                        <div className="
                                            w-full
                                            rounded-xl
                                            border
                                            p-4
                                            bg-gray-50
                                            text-gray-500
                                        ">

                                            No hay formas
                                            configuradas.

                                        </div>

                                    )}

                                </div>


                                {/* BIZCOCHUELO */}

                                <div>

                                    <h2 className="
                                        font-bold
                                        text-xl
                                        mb-3
                                    ">

                                        Bizcochuelo

                                    </h2>


                                    {bentoBizcochuelos.length > 0 ? (

                                        <select
                                            value={bentoFlavor}
                                            onChange={(e) =>
                                                setBentoFlavor(
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

                                            {bentoBizcochuelos.map(
                                                (option, index) => (

                                                    <option
                                                        key={`${option}-${index}`}
                                                        value={option}
                                                    >

                                                        {option}

                                                    </option>

                                                )
                                            )}

                                        </select>

                                    ) : (

                                        <div className="
                                            w-full
                                            rounded-xl
                                            border
                                            p-4
                                            bg-gray-50
                                            text-gray-500
                                        ">

                                            No hay bizcochuelos
                                            configurados.

                                        </div>

                                    )}

                                </div>


                                {/* TAMAÑO */}

                                <div>

                                    <h2 className="
                                        font-bold
                                        text-xl
                                        mb-3
                                    ">

                                        Tamaño

                                    </h2>


                                    <div className="
                                        w-full
                                        rounded-xl
                                        border
                                        p-4
                                        bg-gray-50
                                        text-gray-700
                                    ">

                                        {size || "10"} cm

                                    </div>

                                </div>


                                {/* COBERTURA */}

                                <div>

                                    <h2 className="
                                        font-bold
                                        text-xl
                                        mb-3
                                    ">

                                        Cobertura

                                    </h2>


                                    <select
                                        value={bentoCovering}
                                        onChange={(e) =>
                                            setBentoCovering(
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

                                        {bentoCoverings.map(
                                            (option, index) => (

                                                <option
                                                    key={`${option}-${index}`}
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


                        {/* =========================
                            PRESENTACIÓN
                            SOLO NO BENTO
                        ========================= */}

                        {!isBento && (

                            <>

                                <h2 className="
                                    font-bold
                                    text-xl
                                    mt-8
                                    mb-3
                                ">

                                    Presentación

                                </h2>


                                <div className="
                                    flex
                                    gap-3
                                    flex-wrap
                                ">

                                    {isMesaDulce ? (

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

                                            {product.quantity}
                                            {" "}
                                            unidades

                                        </button>

                                    ) : (

                                        (product.sizes || []).map(
                                            s => (

                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() =>
                                                        setSize(
                                                            String(s)
                                                        )
                                                    }
                                                    className={`
                                                        px-5
                                                        py-3
                                                        rounded-full
                                                        border
                                                        transition
                                                        ${
                                                            size === String(s)
                                                                ? "bg-[#D08A9B] text-white border-[#D08A9B]"
                                                                : "bg-white"
                                                        }
                                                    `}
                                                >

                                                    {isAlfajor ||
                                                     isCookies
                                                        ? `${s} unidades`
                                                        : `${s} cm`
                                                    }

                                                </button>

                                            )
                                        )

                                    )}

                                </div>


                                {isAlfajor && (

                                    <p className="
                                        text-sm
                                        text-gray-500
                                        mt-3
                                    ">

                                        Precio por presentación.

                                    </p>

                                )}


                                {isMesaDulce && (

                                    <p className="
                                        text-sm
                                        text-gray-500
                                        mt-3
                                    ">

                                        Elegí la presentación
                                        que querés comprar.

                                    </p>

                                )}

                            </>

                        )}


                        {/* =========================
                            EXTRAS
                        ========================= */}

                        {product.extras?.length > 0 && (

                            <div className="mt-8">

                                <h2 className="
                                    font-bold
                                    text-xl
                                    mb-3
                                ">

                                    Extras

                                </h2>


                                <p className="
                                    text-sm
                                    text-gray-500
                                    mb-4
                                ">

                                    Podés agregar extras
                                    a tu pedido.

                                </p>


                                <div className="
                                    grid
                                    grid-cols-2
                                    gap-3
                                ">

                                    {product.extras.map(
                                        (extra, index) => (

                                            <button
                                                key={`${extra.name}-${index}`}
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


                        {/* =========================
                            CANTIDAD
                        ========================= */}

                        <h2 className="
                            font-bold
                            text-xl
                            mt-8
                            mb-3
                        ">

                            Cantidad

                        </h2>


                        <div className="
                            flex
                            items-center
                            gap-5
                        ">

                            <button
                                type="button"
                                onClick={() =>
                                    quantity > 1 &&
                                    setQuantity(
                                        quantity - 1
                                    )
                                }
                                className="
                                    w-12
                                    h-12
                                    rounded-full
                                    bg-pink-100
                                "
                            >

                                -

                            </button>


                            <span className="
                                text-2xl
                                font-bold
                            ">

                                {quantity}

                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    setQuantity(
                                        quantity + 1
                                    )
                                }
                                className="
                                    w-12
                                    h-12
                                    rounded-full
                                    bg-pink-100
                                "
                            >

                                +

                            </button>

                        </div>


                        {/* =========================
                            OBSERVACIONES
                        ========================= */}

                        <h2 className="
                            font-bold
                            text-xl
                            mt-8
                            mb-3
                        ">

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
                            className="
                                w-full
                                border
                                rounded-2xl
                                p-4
                                text-left
                                align-top
                            "
                            placeholder="Ej.: Sin nueces, escribir dedicatoria..."
                        />


                        {/* =========================
                            RESUMEN
                        ========================= */}

                        <div className="
                            mt-8
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
                                    font-semibold
                                ">

                                    Precio base
                                    {quantity > 1 &&
                                        ` × ${quantity}`
                                    }

                                </span>


                                <span>

                                    $
                                    {(basePrice * quantity)
                                        .toLocaleString(
                                            "es-AR"
                                        )
                                    }

                                </span>

                            </div>


                            {extrasPrice > 0 && (

                                <div className="
                                    flex
                                    justify-between
                                    items-center
                                    mt-2
                                ">

                                    <span className="
                                        font-semibold
                                    ">

                                        Extras
                                        {quantity > 1 &&
                                            ` × ${quantity}`
                                        }

                                    </span>


                                    <span>

                                        +$
                                        {extrasPrice
                                            .toLocaleString(
                                                "es-AR"
                                            )
                                        }

                                    </span>

                                </div>

                            )}


                            <div className="
                                border-t
                                mt-4
                                pt-4
                                flex
                                justify-between
                                items-center
                            ">

                                <span className="
                                    text-xl
                                    font-bold
                                ">

                                    Total

                                </span>


                                <span className="
                                    text-3xl
                                    font-bold
                                    text-[#D08A9B]
                                ">

                                    $
                                    {price.toLocaleString(
                                        "es-AR"
                                    )}

                                </span>

                            </div>

                        </div>


                        {/* =========================
                            BOTÓN
                        ========================= */}

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

                    </div>

                )}

            </div>

        </Layout>

    );

}


export default TraditionalProduct;