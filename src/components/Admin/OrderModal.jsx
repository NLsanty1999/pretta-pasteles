
import { useEffect } from "react";

function OrderModal({
    order,
    open,
    onClose,
    onStatusChange,
    onDelete
}) {

    useEffect(() => {

        function handleKey(e) {

            if (e.key === "Escape") {
                onClose();
            }

        }

        if (open) {

            document.addEventListener(
                "keydown",
                handleKey
            );

        }

        return () => {

            document.removeEventListener(
                "keydown",
                handleKey
            );

        };

    }, [open, onClose]);


    if (!open || !order) return null;


    return (

        <div
            onClick={onClose}
            className="
                fixed
                inset-0
                bg-black/40
                flex
                items-center
                justify-center
                z-[100]
                p-4
            "
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    bg-white
                    rounded-3xl
                    w-full
                    max-w-xl
                    max-h-[82vh]
                    overflow-y-auto
                    shadow-2xl
                "
            >

                {/* ================================= */}
                {/* ENCABEZADO */}
                {/* ================================= */}

                <div className="
                    sticky
                    top-0
                    bg-white
                    rounded-t-3xl
                    border-b
                    p-6
                    flex
                    justify-between
                    items-center
                    z-10
                ">

                    <div>

                        <h2 className="text-3xl font-bold">

                            {order.client?.name || "Cliente"}

                        </h2>

                        <p className="text-gray-500">

                            {order.client?.phone || "-"}

                        </p>

                    </div>


                    <button
                        onClick={onClose}
                        className="
                            text-3xl
                            leading-none
                            hover:text-red-500
                            transition
                        "
                    >

                        ×

                    </button>

                </div>


                <div className="p-6 space-y-5">


                    {/* ================================= */}
                    {/* FECHA */}
                    {/* ================================= */}

                    <div className="
                        bg-pink-50
                        rounded-2xl
                        p-4
                    ">

                        <p className="font-bold">

                            📅 Fecha de entrega

                        </p>

                        <p className="mt-1">

                            {order.deliveryDate

                                ? new Date(
                                    `${order.deliveryDate}T00:00:00`
                                ).toLocaleDateString("es-AR")

                                : "Sin fecha"

                            }

                        </p>

                    </div>


                    {/* ================================= */}
                    {/* HORARIO */}
                    {/* ================================= */}

                    <div className="
                        bg-pink-50
                        rounded-2xl
                        p-4
                    ">

                        <p className="font-bold">

                            🕒 Horario

                        </p>

                        <p className="mt-1">

                            {order.deliveryHour || "-"}

                        </p>

                    </div>


                    <hr />


                    {/* ================================= */}
                    {/* PRODUCTOS */}
                    {/* ================================= */}

                    <h3 className="text-2xl font-bold">

                        Productos

                    </h3>


                    <div className="space-y-4">


                        {order.items?.map((item, index) => {


                            /*
                             * ==================================
                             * BIZCOCHUELOS
                             * ==================================
                             *
                             * Si existe flavorsSelected y tiene
                             * más de un elemento, mostramos todos.
                             *
                             * Para productos normales mostramos
                             * solamente item.flavor.
                             */

                            const selectedFlavors =
                                Array.isArray(
                                    item.flavorsSelected
                                )
                                    ? item.flavorsSelected.filter(
                                        flavor =>
                                            flavor &&
                                            String(flavor).trim() !== ""
                                    )
                                    : [];


                            /*
                             * ==================================
                             * RELLENOS
                             * ==================================
                             *
                             * Para 20 cm / 5 kg:
                             *
                             * [
                             *   relleno 1 bizcochuelo 1,
                             *   relleno 2 bizcochuelo 1,
                             *   relleno 1 bizcochuelo 2,
                             *   relleno 2 bizcochuelo 2
                             * ]
                             *
                             * Mostramos los cuatro.
                             */

                            const selectedFillings =
                                Array.isArray(
                                    item.fillingsSelected
                                )
                                    ? item.fillingsSelected.filter(
                                        filling =>
                                            filling &&
                                            String(filling).trim() !== ""
                                    )
                                    : [];


                            /*
                             * Detectar si es una torta de
                             * 20 cm / 5 kg.
                             */

                            const isFiveKg20cm =
                                String(item.size) === "20" &&
                                (
                                    item.weight === "5 kg" ||
                                    selectedFillings.length >= 4 ||
                                    selectedFlavors.length >= 2
                                );


                            return (

                                <div
                                    key={index}
                                    className="
                                        border
                                        rounded-2xl
                                        p-5
                                        bg-white
                                        shadow-sm
                                    "
                                >


                                    {/* ================================= */}
                                    {/* NOMBRE Y PRECIO */}
                                    {/* ================================= */}

                                    <div className="
                                        flex
                                        justify-between
                                        items-start
                                        mb-4
                                        gap-4
                                    ">

                                        <div>

                                            <p className="
                                                text-xl
                                                font-bold
                                            ">

                                                {index + 1}.{" "}

                                                {item.name || "Producto"}

                                            </p>


                                            <p className="text-gray-500">

                                                Tamaño:{" "}

                                                {item.size || "-"}

                                                {item.weight
                                                    ? ` · ${item.weight}`
                                                    : ""
                                                }

                                            </p>

                                        </div>


                                        <p className="
                                            text-xl
                                            font-bold
                                            text-[#D08A9B]
                                            whitespace-nowrap
                                        ">

                                            $

                                            {Number(
                                                item.price || 0
                                            ).toLocaleString("es-AR")}

                                        </p>

                                    </div>


                                    <div className="
                                        space-y-3
                                        text-sm
                                    ">


                                        {/* ================================= */}
                                        {/* BIZCOCHUELOS */}
                                        {/* ================================= */}

                                        {selectedFlavors.length > 1 ? (

                                            <div className="
                                                bg-gray-50
                                                rounded-xl
                                                p-3
                                            ">

                                                <p className="
                                                    font-bold
                                                    mb-2
                                                ">

                                                    Bizcochuelos

                                                </p>


                                                {selectedFlavors.map(
                                                    (flavor, flavorIndex) => (

                                                        <p
                                                            key={flavorIndex}
                                                            className="mt-1"
                                                        >

                                                            <b>
                                                                Bizcochuelo{" "}
                                                                {flavorIndex + 1}:
                                                            </b>{" "}

                                                            {flavor}

                                                        </p>

                                                    )
                                                )}

                                            </div>

                                        ) : (

                                            <p>

                                                <b>
                                                    Bizcochuelo:
                                                </b>{" "}

                                                {item.flavor || "-"}

                                            </p>

                                        )}


                                        {/* ================================= */}
                                        {/* RELLENOS */}
                                        {/* ================================= */}

                                        {selectedFillings.length > 1 ? (

                                            <div className="
                                                bg-gray-50
                                                rounded-xl
                                                p-3
                                            ">

                                                <p className="
                                                    font-bold
                                                    mb-2
                                                ">

                                                    Rellenos

                                                </p>


                                                {isFiveKg20cm ? (

                                                    <>

                                                        <p>

                                                            <b>
                                                                Bizcochuelo 1
                                                                — Relleno 1:
                                                            </b>{" "}

                                                            {
                                                                selectedFillings[0] ||
                                                                "-"
                                                            }

                                                        </p>


                                                        <p className="mt-1">

                                                            <b>
                                                                Bizcochuelo 1
                                                                — Relleno 2:
                                                            </b>{" "}

                                                            {
                                                                selectedFillings[1] ||
                                                                "-"
                                                            }

                                                        </p>


                                                        <p className="mt-1">

                                                            <b>
                                                                Bizcochuelo 2
                                                                — Relleno 1:
                                                            </b>{" "}

                                                            {
                                                                selectedFillings[2] ||
                                                                "-"
                                                            }

                                                        </p>


                                                        <p className="mt-1">

                                                            <b>
                                                                Bizcochuelo 2
                                                                — Relleno 2:
                                                            </b>{" "}

                                                            {
                                                                selectedFillings[3] ||
                                                                "-"
                                                            }

                                                        </p>

                                                    </>

                                                ) : (

                                                    selectedFillings.map(
                                                        (
                                                            filling,
                                                            fillingIndex
                                                        ) => (

                                                            <p
                                                                key={
                                                                    fillingIndex
                                                                }
                                                                className="mt-1"
                                                            >

                                                                <b>
                                                                    Relleno{" "}
                                                                    {fillingIndex + 1}:
                                                                </b>{" "}

                                                                {filling}

                                                            </p>

                                                        )
                                                    )

                                                )}

                                            </div>

                                        ) : (

                                            <p>

                                                <b>
                                                    Relleno:
                                                </b>{" "}

                                                {item.filling || "-"}

                                            </p>

                                        )}

                                        {/* ================================= */}
                                        {/* forma */}
                                        {/* ================================= */}



                                        {item.bentoForm && (
    <p>
        <b>Forma:</b>{" "}
        {item.bentoForm}
    </p>
)}

                                        {/* ================================= */}
                                        {/* COBERTURA */}
                                        {/* ================================= */}

                                        <p>

                                            <b>
                                                Cobertura:
                                            </b>{" "}

                                            {item.covering || "-"}

                                        </p>


                                        {/* ================================= */}
                                        {/* EXTRAS */}
                                        {/* ================================= */}

                                        <p>

                                            <b>
                                                Extras:
                                            </b>{" "}

                                            {item.extras?.length

                                                ? item.extras.join(", ")

                                                : "Ninguno"

                                            }

                                        </p>


                                        {/* ================================= */}
                                        {/* DETALLE DE CAMBIO DE RELLENO */}
                                        {/* ================================= */}

                                        {item.fillingChanges > 0 && (

                                            <p className="
                                                text-gray-600
                                            ">

                                                <b>
                                                    Cambios de relleno:
                                                </b>{" "}

                                                {item.fillingChanges}

                                            </p>

                                        )}

                                    </div>


                                    {/* ================================= */}
                                    {/* OBSERVACIONES */}
                                    {/* ================================= */}

                                    <div className="mt-4">

                                        <p className="font-bold">

                                            Observaciones

                                        </p>


                                        <div className="
                                            bg-gray-100
                                            rounded-xl
                                            p-3
                                            mt-2
                                        ">

                                            {item.note ||
                                                "Sin observaciones"
                                            }

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>


                    {/* ================================= */}
                    {/* TOTAL */}
                    {/* ================================= */}

                    <div className="
                        text-center
                        border-t
                        pt-5
                    ">

                        <p className="text-gray-500">

                            Total del pedido

                        </p>


                        <h2 className="
                            text-4xl
                            font-bold
                            text-[#D08A9B]
                        ">

                            $

                            {Number(
                                order.total ||
                                order.price ||
                                0
                            ).toLocaleString("es-AR")}

                        </h2>

                    </div>


                    {/* ================================= */}
                    {/* BOTONES DE ESTADO */}
                    {/* ================================= */}

                    <div className="
                        grid
                        grid-cols-2
                        gap-3
                    ">


                        {/* PEDIDO ACEPTADO + WHATSAPP */}

                        <button
                            onClick={() => {

                                const phone =
                                    (
                                        order.client?.phone ||
                                        ""
                                    ).replace(
                                        /\D/g,
                                        ""
                                    );


                                const name =
                                    order.client?.name ||
                                    "";


                                const text =
                                    `Hola ${name}! 👋\n\n` +
                                    `Tu pedido fue *aceptado* ✅\n` +
                                    `Te vamos a avisar cuando esté listo para retirar.\n\n` +
                                    `Gracias por elegir Pretta Pasteles 💕`;


                                if (phone) {

                                    const fullPhone =
                                        phone.startsWith("54")
                                            ? phone
                                            : `54${phone}`;


                                    const url =
                                        `https://wa.me/${fullPhone}?text=${encodeURIComponent(
                                            text
                                        )}`;


                                    window.open(
                                        url,
                                        "_blank"
                                    );

                                }


                                onStatusChange(
                                    "En preparación"
                                );

                            }}
                            className="
                                rounded-xl
                                py-3
                                bg-emerald-100
                                font-medium
                                col-span-2
                            "
                        >

                            Pedido aceptado + WhatsApp

                        </button>


                        {/* PENDIENTE */}

                        <button
                            onClick={() =>
                                onStatusChange(
                                    "Pendiente"
                                )
                            }
                            className="
                                rounded-xl
                                py-3
                                bg-yellow-100
                            "
                        >

                            Pendiente

                        </button>


                        {/* PREPARACIÓN */}

                        <button
                            onClick={() =>
                                onStatusChange(
                                    "En preparación"
                                )
                            }
                            className="
                                rounded-xl
                                py-3
                                bg-blue-100
                            "
                        >

                            Preparación

                        </button>


                        {/* FINALIZADO */}

                        <button
                            onClick={() =>
                                onStatusChange(
                                    "Finalizado"
                                )
                            }
                            className="
                                rounded-xl
                                py-3
                                bg-green-100
                            "
                        >

                            Finalizado

                        </button>


                        {/* ELIMINAR */}

                        <button
                            onClick={onDelete}
                            className="
                                rounded-xl
                                py-3
                                bg-red-100
                            "
                        >

                            Eliminar

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default OrderModal;

