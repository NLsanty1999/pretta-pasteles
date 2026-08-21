import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFeatured from "../../hooks/useFeatured";

function FeaturedProducts() {
    const navigate = useNavigate();

    const { featured, loading } = useFeatured();

    const [current, setCurrent] = useState(0);

    const [touchStart, setTouchStart] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Cambio automático
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (featured.length <= 1) return;

        const interval = setInterval(() => {
            setCurrent((prev) =>
                prev === featured.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [featured.length]);


    /*
    |--------------------------------------------------------------------------
    | Evitar errores si cambia la cantidad
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (current >= featured.length) {
            setCurrent(0);
        }
    }, [featured.length, current]);


    /*
    |--------------------------------------------------------------------------
    | Cargando
    |--------------------------------------------------------------------------
    */

    function handleTouchStart(e) {
    setTouchStart(e.touches[0].clientX);
}

function handleTouchEnd(e) {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;

    // Deslizamiento hacia la izquierda
    if (difference > 50) {
        setCurrent(prev =>
            prev === featured.length - 1
                ? 0
                : prev + 1
        );
    }

    // Deslizamiento hacia la derecha
    if (difference < -50) {
        setCurrent(prev =>
            prev === 0
                ? featured.length - 1
                : prev - 1
        );
    }

    setTouchStart(null);
}


    if (loading) {
        return (
            <section className="mt-14 mb-12 relative">

                <div className="text-center mb-6">

                    <p className="text-sm uppercase tracking-[0.2em] text-[#D08A9B] font-medium">
                        Para tentarte un poquito
                    </p>

                    <h2 className="text-3xl font-light text-[#5A3B31] mt-1">
                        Productos destacados
                    </h2>

                </div>

                <div className="w-full aspect-square bg-[#F8F3F0] animate-pulse" />

            </section>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | No hay productos
    |--------------------------------------------------------------------------
    */

    if (!featured.length) {
        return null;
    }


    const item = featured[current];


    /*
    |--------------------------------------------------------------------------
    | Ir al producto
    |--------------------------------------------------------------------------
    */

    function handleProductClick() {

    const productId = item?.slug || item?.id;

    if (!productId) return;

    if (item.type === "personalizada") {

        navigate(`/producto/${productId}`);

    } else {

        navigate(`/producto/tradicional/${productId}`);

    }

}


    return (
        <section className="mt-14 mb-12 relative">


            {/* TÍTULO */}

            <div className="text-center mb-6">

                <p className="text-sm uppercase tracking-[0.2em] text-[#D08A9B] font-medium">
                    Para tentarte un poquito
                </p>

                <h2 className="text-3xl font-light text-[#5A3B31] mt-1">
                    Productos destacados
                </h2>

            </div>


            {/* IMAGEN */}

            <button
    type="button"
    onClick={handleProductClick}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
    className="
        relative
        block
        w-full
        aspect-square
        overflow-hidden
        shadow-md
        active:scale-[0.995]
        transition
        bg-[#F8F3F0]
        touch-pan-y
    "
>


                {/* IMAGEN */}

{item.featuredImage || item.image ? (

    <img
        src={item.featuredImage || item.image}
        alt={
            item.featuredTitle ||
            item.name ||
            "Producto destacado"
        }
        className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
    object-center
"
    />

) : (

                    <div className="absolute inset-0 flex items-center justify-center bg-[#F8F3F0]">

                        <span className="text-8xl">
                            🎂
                        </span>

                    </div>

                )}


                {/* DEGRADADO */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-2/5
                        bg-gradient-to-t
                        from-black/65
                        via-black/20
                        to-transparent
                        pointer-events-none
                    "
                />


{/* INFORMACIÓN */}

<div
    className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[80%]
        text-center
    "
>

    {/* NOMBRE */}

    <div className="h-[80px] flex items-end justify-center">

        <p
            className="
                text-white
                text-3xl
                font-light
                leading-tight
                drop-shadow-md
            "
        >
            {item.featuredTitle || item.name}
        </p>

    </div>


    {/* SUBTÍTULO */}

    {item.featuredSubtitle && (

        <p
            className="
                text-white/85
                text-sm
                font-light
                mt-2
            "
        >
            {item.featuredSubtitle}
        </p>

    )}


    {/* BOTÓN */}

    <div
        className="
            inline-flex
            items-center
            gap-2
            bg-white/90
            text-[#5A3B31]
            font-light
            text-sm
            px-5
            py-2.5
            rounded-none
            shadow-sm
            translate-y-23
        "
    >

        Ver producto

        <span className="font-light">
            →
        </span>

    </div>


    {/* PUNTITOS */}

    {featured.length > 1 && (

        <div
            className="
                flex
                items-center
                justify-center
                gap-1.5
                mt-4
                translate-y-23
            "
        >

            {featured.map((_, index) => (

                <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrent(index);
                    }}
                    aria-label={`Ver producto ${index + 1}`}
                    className={`
                        rounded-full
                        transition-all
                        duration-300
                        ${
                            current === index
                                ? "w-2 h-2 bg-white"
                                : "w-1.5 h-1.5 bg-white/50"
                        }
                    `}
                />

            ))}

        </div>

    )}

</div>

</button>


{/* =========================
    FIRMA
========================= */}

<div className="flex flex-col items-center justify-center mt-8 mb-2">

    <div
        className="
            relative
            text-[#5A3B31]/35
            font-serif
            italic
            text-3xl
            tracking-normal
            leading-none
        "
    >

        <span>
            C
        </span>

        <span>
            Y
        </span>

    </div>


    {/* Corazón de línea */}

    <svg
        width="28"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-1 text-[#D08A9B]/40"
    >

        <path
            d="M20.84 4.61C19.84 3.61 18.48 3 17 3C15.52 3 14.16 3.61 13.16 4.61L12 5.77L10.84 4.61C9.84 3.61 8.48 3 7 3C5.52 3 4.16 3.61 3.16 4.61C1.05 6.72 1.05 10.14 3.16 12.25L12 21L20.84 12.25C22.95 10.14 22.95 6.72 20.84 4.61Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

    </svg>

</div>


</section>
    );
}

export default FeaturedProducts;