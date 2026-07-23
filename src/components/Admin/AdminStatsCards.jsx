function AdminStatsCards({ orders }) {

    const pending = orders.filter(
        o => o.status === "Pendiente"
    ).length;

    const preparing = orders.filter(
        o => o.status === "En preparación"
    ).length;

    const finished = orders.filter(
        o => o.status === "Finalizado"
    ).length;

    const revenue = orders.reduce(

        (sum, order) =>

            sum + Number(order.total || 0),

        0

    );

    return (

        <div className="grid grid-cols-2 gap-4">

            <div className="bg-white rounded-2xl shadow p-4">

                <p className="text-gray-500">

                    Pedidos

                </p>

                <h2 className="text-3xl font-bold">

                    {orders.length}

                </h2>

            </div>

            <div className="bg-white rounded-2xl shadow p-4">

                <p className="text-gray-500">

                    Facturación

                </p>

                <h2 className="text-2xl font-bold text-[#D08A9B]">

                    $

                    {revenue.toLocaleString("es-AR")}

                </h2>

            </div>

            <div className="bg-yellow-100 rounded-2xl p-4">

                <p>Pendientes</p>

                <h2 className="text-3xl font-bold">

                    {pending}

                </h2>

            </div>

            <div className="bg-blue-100 rounded-2xl p-4">

                <p>Preparación</p>

                <h2 className="text-3xl font-bold">

                    {preparing}

                </h2>

            </div>

            <div className="bg-green-100 rounded-2xl p-4 col-span-2">

                <p>Finalizados</p>

                <h2 className="text-3xl font-bold">

                    {finished}

                </h2>

            </div>

        </div>

    );

}

export default AdminStatsCards;