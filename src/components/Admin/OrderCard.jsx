function OrderCard({ order, onOpen }) {

    const item = order.items?.[0];

    console.log(JSON.stringify(order.items[0], null, 2));

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

            <div className="mt-5 space-y-1">

                <p>

                    🍰 <b>{item?.name || "-"}</b>

                </p>

                <p>

                    📏 {item?.size || "-"}

                </p>

                <p>

                    📅 {

                        item?.deliveryDate

                            ? new Date(item.deliveryDate).toLocaleDateString("es-AR")

                            : "-"

                    }

                </p>

                <p>

                    🕒 {item?.deliveryHour || "-"}

                </p>

            </div>

            <div className="mt-5 flex justify-between items-center">

                <span className="text-gray-500">

                    Ver detalle →

                </span>

                <span className="text-2xl font-bold text-[#D08A9B]">

                    $

                    {Number(order.total || item?.price || 0)

                        .toLocaleString("es-AR")}

                </span>

            </div>

        </button>

    );

}

export default OrderCard;