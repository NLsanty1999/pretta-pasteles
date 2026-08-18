import { useNavigate } from "react-router-dom";
import categories from "../../data/categories";

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

        <div className="grid grid-cols-2 gap-3 px-3">


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
                    px-5
                    py-4
                    shadow-sm
                    hover:bg-white/55
                    hover:shadow-md
                    transition
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
                        px-3
                        py-5
                        shadow-sm
                        hover:bg-white/55
                        hover:shadow-md
                        transition
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                        gap-2
                        min-h-[135px]
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

                    <div className="min-w-0">

                        <h3
                            className="
                                font-semibold
                                text-[#5A3B31]
                                text-[13px]
                                tracking-wide
                                leading-tight
                            "
                        >
                            {category.name}
                        </h3>

                    </div>

                </button>

            ))}

        </div>

    );

}


export default Categories;