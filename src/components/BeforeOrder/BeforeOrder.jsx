import { useState } from "react";

function BeforeOrder() {

    const [open, setOpen] = useState(true);

    if (!open) {
        return null;
    }

    const whatsappNumber = "543758649258";

    const whatsappMessage = encodeURIComponent(
        "Hola! Quería consultar por un pedido 😊"
    );

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


    return (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/30 backdrop-blur-sm">

            <div className="
                w-full
                max-w-2xl
                bg-white
                rounded-t-[2rem]
                shadow-2xl
                px-6
                pt-5
                pb-7
                max-h-[90vh]
                overflow-y-auto
            ">

                {/* Indicador superior */}

                <div className="flex justify-center mb-5">

                    <div className="
                        w-24
                        h-2
                        rounded-full
                        bg-[#E8B8C2]
                    " />

                </div>


                {/* Encabezado */}

                <div className="flex items-center justify-between gap-4">

                    <h2 className="
                        text-3xl
                        font-bold
                        text-[#D08A9B]
                    ">

                        Antes de pedir

                    </h2>


                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="
                            w-11
                            h-11
                            rounded-full
                            border
                            border-gray-200
                            bg-white
                            text-gray-500
                            text-2xl
                            flex
                            items-center
                            justify-center
                            hover:bg-gray-100
                            transition
                        "
                        aria-label="Cerrar"
                    >

                        ×

                    </button>

                </div>


                {/* Avisos */}

                <div className="mt-6 space-y-3">


                    {/* Anticipación */}

                    <div className="
                        bg-[#F7E1E5]
                        rounded-3xl
                        p-5
                        flex
                        gap-4
                        items-start
                    ">

                        <span className="text-2xl">
                            🕐
                        </span>

                        <p className="text-[#315E73] text-base leading-relaxed">

                            <strong>
                                Pedidos con 48 horas de anticipación.
                            </strong>

                            {" "}
                            Si necesitás pedir con menos tiempo,
                            consultá disponibilidad por WhatsApp.

                        </p>

                    </div>


                    {/* Días */}

                    <div className="
                        bg-[#F7E1E5]
                        rounded-3xl
                        p-5
                        flex
                        gap-4
                        items-start
                    ">

                        <span className="text-2xl">
                            📅
                        </span>

                        <p className="text-[#315E73] text-base leading-relaxed">

                            Los pedidos se retiran de
                            <strong> martes a sabado.</strong>

                        </p>

                    </div>


                    {/* Seña */}

                    <div className="
                        bg-[#F7E1E5]
                        rounded-3xl
                        p-5
                        flex
                        gap-4
                        items-start
                    ">

                        <span className="text-2xl">
                            💰
                        </span>

                        <p className="text-[#315E73] text-base leading-relaxed">

                            <strong>
                                No pedimos seña ni adelanto.
                            </strong>

                        </p>

                    </div>


                    {/* Retiro */}

                    <div className="
                        bg-[#F7E1E5]
                        rounded-3xl
                        p-5
                        flex
                        gap-4
                        items-start
                    ">

                        <span className="text-2xl">
                            📍
                        </span>

                        <p className="text-[#315E73] text-base leading-relaxed">

                            <strong>
                                No realizamos entregas a domicilio.
                            </strong>

                            {" "}
                            Los pedidos se retiran en el lugar
                            acordado.

                        </p>

                    </div>


                    {/* WhatsApp */}

                    <div className="
                        bg-[#F7E1E5]
                        rounded-3xl
                        p-5
                        flex
                        gap-4
                        items-start
                    ">

                        <span className="text-2xl">
                            💬
                        </span>

                        <p className="text-[#315E73] text-base leading-relaxed">

                            ¿Necesitás algo para hoy o con poca
                            anticipación?

                            {" "}

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    font-bold
                                    underline
                                "
                            >

                                Consultanos por WhatsApp.

                            </a>

                        </p>

                    </div>

                </div>


                {/* Botón cerrar */}

                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="
                        w-full
                        mt-6
                        rounded-full
                        py-4
                        bg-[#D08A9B]
                        text-white
                        text-lg
                        font-bold
                        hover:bg-[#C77C8F]
                        transition
                    "
                >

                    Entendido

                </button>

            </div>

        </div>

    );

}

export default BeforeOrder;