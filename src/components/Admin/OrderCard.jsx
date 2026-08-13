function OrderCard({ order, onOpen }) {

    const statusStyle = {

        "Pendiente": {
            card: "bg-yellow-50 border-yellow-300",
            badge: "bg-yellow-200 text-yellow-800"
        },

        "En preparación": {
            card: "bg-blue-50 border-blue-300",
            badge: "bg-blue-200 text-blue-800"
        },

        "Finalizado": {
            card: "bg-green-50 border-green-300",
            badge: "bg-green-200 text-green-800"
        }

    };


    const style = statusStyle[order.status] || {

        card: "bg-white border-gray-200",
        badge: "bg-gray-200 text-gray-800"

    };


    return (

        <button

            onClick={onOpen}

            className={`
                w-full
                rounded-3xl
                border-2
                p-5
                shadow
                text-left
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-200
                ${style.card}
            `}

        >

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-bold">
                        {order.client?.name || "Sin nombre"}
                    </h2>

                    <p className="text-gray-500 text-sm">
                        {order.client?.phone || "-"}
                    </p>

                </div>


                <span
                    className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-bold
                        ${style.badge}
                    `}
                >
                    {order.status || "Pendiente"}
                </span>

            </div>


            <div className="mt-5 space-y-2">

                <p className="font-bold">
                    🍰 Productos:
                </p>


                {order.items?.map((item, index) => (

                    <p
                        key={index}
                        className="pl-2"
                    >

                        {index + 1}. {item.name || "-"}

                        {item.size
                            ? ` — ${item.size} cm`
                            : ""
                        }

                    </p>

                ))}


                {!order.items?.length && (

                    <p>
                        Sin productos
                    </p>

                )}


                <p className="pt-2">

                    📅{" "}

                    {order.deliveryDate

                        ? new Date(
                            `${order.deliveryDate}T00:00:00`
                        ).toLocaleDateString("es-AR")

                        : "Sin fecha"

                    }

                </p>


                <p>

                    🕒 {order.deliveryHour || "-"}

                </p>

            </div>


            <div className="mt-5 flex justify-between items-center">

                <span className="text-gray-500">
                    Ver detalle →
                </span>


                <span className="text-2xl font-bold text-[#D08A9B]">

                    $

                    {Number(
                        order.total ||
                        order.price ||
                        0
                    ).toLocaleString("es-AR")}

                </span>

            </div>


        </button>

    );

}


export default OrderCard;