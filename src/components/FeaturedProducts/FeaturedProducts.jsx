import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFeatured from "../../hooks/useFeatured";

function FeaturedProducts() {
    const navigate = useNavigate();

    const { featured, loading } = useFeatured();

    const [current, setCurrent] = useState(0);

    /*
    |--------------------------------------------------------------------------
    | Cambiar automáticamente
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
    | Evitar problemas si cambia la cantidad de productos
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

    if (loading) {
        return (
            <section className="mt-14 mb-12">
                <div className="text-center mb-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#D08A9B] font-semibold">
                        Para tentarte un poquito
                    </p>

                    <h2 className="text-3xl font-bold text-[#5A3B31] mt-1">
                        Productos destacados
                    </h2>
                </div>

                <div className="w-full aspect-square rounded-3xl bg-[#F8F3F0] animate-pulse" />
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

        navigate(
            `/producto/${item.type || "tradicional"}/${productId}`
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Anterior
    |--------------------------------------------------------------------------
    */

    function previous() {
        setCurrent((prev) =>
            prev === 0 ? featured.length - 1 : prev - 1
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Siguiente
    |--------------------------------------------------------------------------
    */

    function next() {
        setCurrent((prev) =>
            prev === featured.length - 1 ? 0 : prev + 1
        );
    }

    return (
        <section className="mt-14 mb-12">

            {/* TÍTULO */}

            <div className="text-center mb-6">

                <p className="text-sm uppercase tracking-[0.2em] text-[#D08A9B] font-semibold">
                    Para tentarte un poquito
                </p>

                <h2 className="text-3xl font-bold text-[#5A3B31] mt-1">
                    PRODUCTOS DESTACADOS
                </h2>

            </div>


            {/* IMAGEN */}

            <div className="relative w-full">

                <button
                    type="button"
                    onClick={previous}
                    aria-label="Producto anterior"
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        z-20
                        w-10
                        h-10
                        rounded-full
                        bg-white/90
                        shadow-lg
                        flex
                        items-center
                        justify-center
                        text-[#5A3B31]
                        text-2xl
                        active:scale-90
                        transition
                    "
                >
                    ‹
                </button>


                <button
                    type="button"
                    onClick={handleProductClick}
                    className="
                        relative
                        block
                        w-full
                        aspect-square
                        rounded-3xl
                        overflow-hidden
                        shadow-lg
                        active:scale-[0.99]
                        transition
                        bg-[#F8F3F0]
                    "
                >

                    {/* IMAGEN */}

                    {item.image || item.featuredImage ? (

                        <img
                            src={item.image || item.featuredImage}
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
                                object-contain
                                bg-[#F8F3F0]
                            "
                        />

                    ) : (

                        <div className="absolute inset-0 flex items-center justify-center bg-[#F8F3F0]">

                            <span className="text-8xl">
                                🎂
                            </span>

                        </div>

                    )}


                    {/* DEGRADADO INFERIOR */}

                    <div
                        className="
                            absolute
                            inset-x-0
                            bottom-0
                            h-1/2
                            bg-gradient-to-t
                            from-black/75
                            via-black/30
                            to-transparent
                            pointer-events-none
                        "
                    />


                    {/* INFORMACIÓN + BOTÓN */}

                    <div
                        className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            p-5
                            text-left
                        "
                    >

                        <p className="text-white text-2xl font-bold leading-tight drop-shadow-md">
                            {item.featuredTitle || item.name}
                        </p>


                        {item.featuredSubtitle && (

                            <p className="text-white/90 text-sm mt-1 mb-3 drop-shadow-md">
                                {item.featuredSubtitle}
                            </p>

                        )}


                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                bg-white
                                text-[#5A3B31]
                                font-semibold
                                text-sm
                                px-5
                                py-2.5
                                rounded-full
                                shadow-md
                            "
                        >
                            Ver producto
                            <span className="text-base">
                                →
                            </span>
                        </div>

                    </div>

                </button>


                {/* SIGUIENTE */}

                <button
                    type="button"
                    onClick={next}
                    aria-label="Siguiente producto"
                    className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        z-20
                        w-10
                        h-10
                        rounded-full
                        bg-white/90
                        shadow-lg
                        flex
                        items-center
                        justify-center
                        text-[#5A3B31]
                        text-2xl
                        active:scale-90
                        transition
                    "
                >
                    ›
                </button>

            </div>


            {/* PUNTITOS */}

            {featured.length > 1 && (

                <div className="flex justify-center items-center gap-2 mt-5">

                    {featured.map((_, index) => (

                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrent(index)}
                            aria-label={`Ver producto ${index + 1}`}
                            className={`
                                rounded-full
                                transition-all
                                duration-300
                                ${
                                    current === index
                                        ? "w-3 h-3 bg-[#D08A9B]"
                                        : "w-2.5 h-2.5 bg-[#E5C7CC]"
                                }
                            `}
                        />

                    ))}

                </div>

            )}

        </section>
    );
}

export default FeaturedProducts;