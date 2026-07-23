import StatCard from "./StatCard";

function AdminStats({ totalOrders, totalRevenue }) {

    return (

        <div className="grid grid-cols-2 gap-5 mb-8">

            <StatCard
                title="Pedidos"
                value={totalOrders}
                color="#D08A9B"
            />

            <StatCard
                title="Facturación"
                value={`$${totalRevenue.toLocaleString("es-AR")}`}
                color="#CFE0B4"
            />

        </div>

    );

}

export default AdminStats;