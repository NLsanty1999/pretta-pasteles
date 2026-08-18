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
    const [flavor, setFlavor] = useState("");
    const [filling, setFilling] = useState("");
    const [covering, setCovering] = useState("");
    const [extras, setExtras] = useState([]);
    const [note, setNote] = useState("");

    // Imagen actualmente seleccionada
    const [selectedImage, setSelectedImage] = useState(0);

    // Visor de imagen grande
    const [lightboxOpen, setLightboxOpen] = useState(false);


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

    const selectedFilling =
        filling ||
        product?.fillings?.[0] ||
        "";

    const selectedCovering =
        covering ||
        product?.coverings?.[0] ||
        "";


    /*
     * GALERÍA
     *
     * Si existe "images" en Firebase,
     * usamos esas imágenes.
     *
     * Si no existe, usamos la imagen
     * antigua "image".
     */

    const galleryImages =
        product?.images?.length > 0
            ? product.images.filter(Boolean)
            : product?.image
                ? [product.image]
                : [];


    /*
     * IMAGEN ACTUAL
     */

    const currentImage =
        galleryImages[selectedImage] ||
        galleryImages[0] ||
        null;


    /*
     * CAMBIAR IMAGEN
     */

    function changeImage(index) {

        if (!galleryImages.length) {
            return;
        }

        setSelectedImage(index);

    }


    /*
     * SIGUIENTE IMAGEN
     */

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


    /*
     * IMAGEN ANTERIOR
     */

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


    /*
     * PRECIO DE EXTRAS
     */

    const extrasPrice = useMemo(() => {

        if (!product) {
            return 0;
        }

        return extras.reduce(
            (total, name) => {

                const extra =
                    product.extras?.find(
                        e => e.name === name
                    );

                return total + (
                    extra
                        ? Number(extra.price || 0)
                        : 0
                );

            },
            0
        );

    }, [extras, product]);


    /*
     * PRECIO TOTAL
     */

    const totalPrice = useMemo(() => {

        if (!product) {
            return 0;
        }

        return (
            Number(
                product.prices?.[selectedSize] || 0
            ) +
            extrasPrice
        );

    }, [
        selectedSize,
        extrasPrice,
        product
    ]);


    /*
     * EXTRAS
     */

    function toggleExtra(name) {

        if (extras.includes(name)) {

            setExtras(
                extras.filter(
                    extra => extra !== name
                )
            );

        } else {

            setExtras([
                ...extras,
                name
            ]);

        }

    }


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
            flavor: selectedFlavor,
            filling: selectedFilling,
            covering: selectedCovering,
            extras,
            note,
            price: totalPrice

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


                {/* GALERÍA */}

                <div className="px-2">

                    {/* IMAGEN PRINCIPAL */}

                    <div
                        className="
                            rounded-3xl
                            overflow-hidden
                            bg-[#F8F3F0]
                            cursor-pointer
                        "
                        onClick={() => {

                            if (galleryImages.length > 0) {
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


                {/* VISOR DE IMAGEN GRANDE */}

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

                        {/* CERRAR */}

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


                        {/* ANTERIOR */}

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


                        {/* IMAGEN GRANDE */}

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


                        {/* SIGUIENTE */}

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


                        {/* INDICADOR */}

                        {galleryImages.length > 1 && (

                            <div
                                className="
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
                                "
                            >

                                {selectedImage + 1}
                                {" / "}
                                {galleryImages.length}

                            </div>

                        )}

                    </div>

                )}


                {/* NOMBRE */}

                <h1 className="
                    text-4xl
                    font-bold
                    mt-8
                    px-6
                ">

                    {product.name}

                </h1>


                {/* DESCRIPCIÓN */}

                <p className="
                    text-gray-600
                    mt-3
                    px-6
                ">

                    {product.description}

                </p>


                {/* CONFIGURACIÓN */}

                <div className="mt-10 px-8">

                    <div className="
                        max-w-lg
                        mx-auto
                        space-y-6
                    ">


                        {/* TAMAÑO */}

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
                                    setSize(e.target.value)
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


                        {/* BIZCOCHUELO */}

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
                                    setFlavor(e.target.value)
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


                        {/* RELLENO */}

                        <div>

                            <label className="
                                font-semibold
                                block
                                mb-2
                            ">

                                Relleno

                            </label>

                            <select
                                value={selectedFilling}
                                onChange={(e) =>
                                    setFilling(e.target.value)
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >

                                {product.fillings?.map(
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


                        {/* COBERTURA */}

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
                                    setCovering(e.target.value)
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


                        {/* EXTRAS */}

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
                                                        extra.price || 0
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


                        {/* OBSERVACIONES */}

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
        setNote(e.target.value)
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


                        {/* TOTAL */}

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


                        {/* BOTÓN */}

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