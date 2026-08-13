function AdminStatsCards({ orders }) {

    const now = new Date();
    const currentMonth = now.getMonth();       // 0-11
    const currentYear = now.getFullYear();

    // Filtra pedidos del mes actual (usa deliveryDate o createdAt)
    const ordersThisMonth = orders.filter((order) => {
        const dateStr = order.deliveryDate || order.createdAt || order.date;
        if (!dateStr) return false;

        const orderDate = new Date(dateStr);
        return (
            orderDate.getMonth() === currentMonth &&
            orderDate.getFullYear() === currentYear
        );
    });

    const pendingOrders = orders.filter(o => o.status === "Pendiente");
    const preparingOrders = orders.filter(o => o.status === "En preparación");
    const finishedOrders = orders.filter(o => o.status === "Finalizado");

    // Facturación de finalizados (histórico)
    const revenueFinished = finishedOrders.reduce(
        (sum, order) => sum + Number(order.total || order.price || 0),
        0
    );

    // Facturación pendiente (Pendiente + En preparación)
    const revenuePending = [...pendingOrders, ...preparingOrders].reduce(
        (sum, order) => sum + Number(order.total || order.price || 0),
        0
    );

    // Facturación total del mes actual
    const revenueThisMonth = ordersThisMonth.reduce(
        (sum, order) => sum + Number(order.total || order.price || 0),
        0
    );

    return (
        <div className="grid grid-cols-2 gap-4">

            {/* Pedidos */}
            <div className="bg-white rounded-2xl shadow p-4">
                <p className="text-gray-500">Pedidos</p>
                <h2 className="text-3xl font-bold">{orders.length}</h2>
            </div>

            {/* Facturación (Finalizados) */}
            <div className="bg-white rounded-2xl shadow p-4">
                <p className="text-gray-500">Facturación</p>
                <h2 className="text-2xl font-bold text-[#D08A9B]">
                    ${revenueFinished.toLocaleString("es-AR")}
                </h2>
            </div>

            {/* Pendientes */}
            <div className="bg-yellow-100 rounded-2xl p-4">
                <p>Pendientes</p>
                <h2 className="text-3xl font-bold">{pendingOrders.length}</h2>
            </div>

            {/* Preparación */}
            <div className="bg-blue-100 rounded-2xl p-4">
                <p>Preparación</p>
                <h2 className="text-3xl font-bold">{preparingOrders.length}</h2>
            </div>

            {/* Facturación pendiente */}
            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                <p className="text-gray-600 text-sm">Facturación pendiente</p>
                <h2 className="text-2xl font-bold text-orange-600">
                    ${revenuePending.toLocaleString("es-AR")}
                </h2>
            </div>

            {/* Finalizados */}
            <div className="bg-green-100 rounded-2xl p-4">
                <p>Finalizados</p>
                <h2 className="text-3xl font-bold">{finishedOrders.length}</h2>
            </div>

            {/* Facturación total del mes */}
            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 col-span-2">
                <p className="text-gray-600 text-sm">Facturación total del mes</p>
                <h2 className="text-2xl font-bold text-purple-600">
                    ${revenueThisMonth.toLocaleString("es-AR")}
                </h2>
            </div>

        </div>
    );
}

export default AdminStatsCards;