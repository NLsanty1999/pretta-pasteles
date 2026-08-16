import { useNavigate } from "react-router-dom";
import categories from "../../data/categories";
import { ArrowRight } from "lucide-react";

import tartaIcon from "../../assets/images/tarta.png";
import personalizadaIcon from "../../assets/images/personalizada.png";
import alfajoresIcon from "../../assets/images/alfajores.png";
import tradicionalIcon from "../../assets/images/tradicional.png";
import mesaDulceIcon from "../../assets/images/mesadulce.png";


const icons = {
    torta: tradicionalIcon,
    tartas: tartaIcon,
    alfajor: alfajoresIcon,
    mesa: mesaDulceIcon,
};


function Categories() {

    const navigate = useNavigate();


    return (

        <div className="grid grid-cols-2 gap-3">


            {/* ================================= */}
            {/* TORTA PERSONALIZADA */}
            {/* ================================= */}

            <button
                type="button"
                onClick={() =>
                    navigate("/producto/torta-personalizada")
                }
                className="
                    col-span-2
                    bg-white/45
                    backdrop-blur-md
                    border
                    border-white/60
                    rounded-2xl
                    p-5
                    shadow-sm
                    hover:bg-white/55
                    hover:shadow-md
                    transition
                    relative
                    flex
                    items-center
                    justify-center
                    gap-4
                    min-h-[95px]
                "
            >

                {/* Imagen */}

                <div className="flex-shrink-0">

                    <img
                        src={personalizadaIcon}
                        alt="Torta personalizada"
                        className="
                            w-16
                            h-16
                            object-contain
                        "
                    />

                </div>


                {/* Texto */}

                <div className="text-left">

                    <h3
                        className="
                            font-bold
                            text-[#5A3B31]
                            text-[15px]
                            tracking-wide
                            leading-tight
                        "
                    >

                        TORTA PERSONALIZADA

                    </h3>


                    <p
                        className="
                            text-xs
                            text-[#7A6258]
                            mt-1
                        "
                    >

                        Diseñá tu torta a tu gusto

                    </p>

                </div>


                {/* Flecha */}

                <div
                    className="
                        absolute
                        right-5
                        w-7
                        h-7
                        rounded-full
                        bg-[#E8A0B0]
                        flex
                        items-center
                        justify-center
                    "
                >

                    <ArrowRight
                        size={13}
                        className="text-white"
                    />

                </div>

            </button>


            {/* ================================= */}
            {/* CATEGORÍAS */}
            {/* ================================= */}

            {categories.map((category) => (

                <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                        navigate(
                            `/catalogo/${category.id}`
                        )
                    }
                    className="
                        bg-white/45
                        backdrop-blur-md
                        border
                        border-white/60
                        rounded-2xl
                        p-4
                        shadow-sm
                        hover:bg-white/55
                        hover:shadow-md
                        transition
                        text-left
                        relative
                        flex
                        items-center
                        gap-3
                        pb-9
                    "
                >

                    {/* Imagen */}

                    <div className="flex-shrink-0">

                        {category.icon === "torta" ? (

                            <img
                                src={tradicionalIcon}
                                alt="Tortas"
                                className="
                                    w-14
                                    h-14
                                    object-contain
                                "
                            />

                        ) : category.icon === "tartas" ? (

                            <img
                                src={tartaIcon}
                                alt="Tartas"
                                className="
                                    w-14
                                    h-14
                                    object-contain
                                "
                            />

                        ) : category.icon === "alfajor" ? (

                            <img
                                src={alfajoresIcon}
                                alt="Alfajores"
                                className="
                                    w-14
                                    h-14
                                    object-contain
                                "
                            />

                        ) : category.icon === "mesa" ? (

                            <img
                                src={mesaDulceIcon}
                                alt="Mesa dulce"
                                className="
                                    w-14
                                    h-14
                                    object-contain
                                "
                            />

                        ) : (

                            icons[category.icon]

                        )}

                    </div>


                    {/* Título */}

                    <div className="flex-1 min-w-0">

                        <h3
                            className="
                                font-bold
                                text-[#5A3B31]
                                text-[13px]
                                tracking-wide
                                leading-tight
                            "
                        >

                            {category.name}

                        </h3>

                    </div>


                    {/* Flechita */}

                    <div
                        className="
                            absolute
                            bottom-3
                            left-1/2
                            -translate-x-1/2
                            w-6
                            h-6
                            rounded-full
                            bg-[#E8A0B0]
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <ArrowRight
                            size={12}
                            className="text-white"
                        />

                    </div>

                </button>

            ))}

        </div>

    );

}


export default Categories;