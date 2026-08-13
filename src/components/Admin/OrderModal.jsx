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
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-4"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl w-full max-w-xl max-h-[82vh] overflow-y-auto shadow-2xl"
            >

                <div className="sticky top-0 bg-white rounded-t-3xl border-b p-6 flex justify-between items-center">

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
                        className="text-3xl leading-none hover:text-red-500 transition"
                    >
                        ×
                    </button>

                </div>


                <div className="p-6 space-y-5">


                    <div className="bg-pink-50 rounded-2xl p-4">

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


                    <div className="bg-pink-50 rounded-2xl p-4">

                        <p className="font-bold">
                            🕒 Horario
                        </p>

                        <p className="mt-1">
                            {order.deliveryHour || "-"}
                        </p>

                    </div>


                    <hr />


                    <h3 className="text-2xl font-bold">
                        Productos
                    </h3>


                    <div className="space-y-4">

                        {order.items?.map((item, index) => (

                            <div
                                key={index}
                                className="border rounded-2xl p-5 bg-white shadow-sm"
                            >

                                <div className="flex justify-between items-start mb-4">

                                    <div>

                                        <p className="text-xl font-bold">
                                            {index + 1}. {item.name || "Producto"}
                                        </p>

                                        <p className="text-gray-500">
                                            Tamaño: {item.size || "-"}
                                        </p>

                                    </div>

                                    <p className="text-xl font-bold text-[#D08A9B]">

                                        $
                                        {Number(
                                            item.price || 0
                                        ).toLocaleString("es-AR")}

                                    </p>

                                </div>


                                <div className="space-y-2 text-sm">

                                    <p>
                                        <b>Bizcochuelo:</b>{" "}
                                        {item.flavor || "-"}
                                    </p>

                                    <p>
                                        <b>Relleno:</b>{" "}
                                        {item.filling || "-"}
                                    </p>

                                    <p>
                                        <b>Cobertura:</b>{" "}
                                        {item.covering || "-"}
                                    </p>

                                    <p>
                                        <b>Extras:</b>{" "}

                                        {item.extras?.length

                                            ? item.extras.join(", ")

                                            : "Ninguno"

                                        }

                                    </p>

                                </div>


                                <div className="mt-4">

                                    <p className="font-bold">
                                        Observaciones
                                    </p>

                                    <div className="bg-gray-100 rounded-xl p-3 mt-2">

                                        {item.note || "Sin observaciones"}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>


                    <div className="text-center border-t pt-5">

                        <p className="text-gray-500">
                            Total del pedido
                        </p>

                        <h2 className="text-4xl font-bold text-[#D08A9B]">

                            $

                            {Number(
                                order.total ||
                                order.price ||
                                0
                            ).toLocaleString("es-AR")}

                        </h2>

                    </div>


                    <div className="grid grid-cols-2 gap-3">


                        <button
                            onClick={() =>
                                onStatusChange("Pendiente")
                            }
                            className="rounded-xl py-3 bg-yellow-100"
                        >
                            Pendiente
                        </button>


                        <button
                            onClick={() =>
                                onStatusChange("En preparación")
                            }
                            className="rounded-xl py-3 bg-blue-100"
                        >
                            Preparación
                        </button>


                        <button
                            onClick={() =>
                                onStatusChange("Finalizado")
                            }
                            className="rounded-xl py-3 bg-green-100"
                        >
                            Finalizado
                        </button>


                        <button
                            onClick={onDelete}
                            className="rounded-xl py-3 bg-red-100"
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