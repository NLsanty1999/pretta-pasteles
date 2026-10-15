import { useMemo, useState } from "react";

import Layout from "../Layout/Layout";

import useRealtimeOrders from "../hooks/useRealtimeOrders";

import {
    updateStatus,
    removeOrder
} from "../firebase/orders";

import { firebaseError } from "../utils/firebaseErrors";

import AdminHeader from "../components/Admin/AdminHeader";
import AdminActionBar from "../components/Admin/AdminActionBar";
import AdminFilters from "../components/Admin/AdminFilters";
import AdminStatsCards from "../components/Admin/AdminStatsCards";
import AdminSummary from "../components/Admin/AdminSummary";
import RecentOrders from "../components/Admin/RecentOrders";
import LoadingOrders from "../components/Admin/LoadingOrders";
import NoOrders from "../components/Admin/NoOrders";
import FirebaseBadge from "../components/Admin/FirebaseBadge";
import RealtimeStatus from "../components/Admin/RealtimeStatus";
import OrderCard from "../components/Admin/OrderCard";
import OrderModal from "../components/Admin/OrderModal";

import OrderSearch from "../utils/OrderSearch";
import OrderFilter from "../utils/OrderFilter";

import { useNavigate } from "react-router-dom";


function Admin() {

    const {
        orders,
        loading
    } = useRealtimeOrders();


    const [selectedOrder, setSelectedOrder] = useState(null);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("Todos");


    const navigate = useNavigate();


    const filteredOrders = useMemo(() => {

        const searched = OrderSearch(
            orders,
            search
        );

        return OrderFilter(
            searched,
            status
        );

    }, [orders, search, status]);


const groupedOrders = useMemo(() => {
    const completedStatuses = [
        "finalizado",
        "finalizada",
        "entregado",
        "entregada"
    ];

    const isCompleted = (order) => {
        const orderStatus = String(order.status || "")
            .trim()
            .toLowerCase();

        return completedStatuses.includes(orderStatus);
    };

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        // Primero, pedidos que todavía no están terminados
        const completedA = isCompleted(a);
        const completedB = isCompleted(b);

        if (completedA !== completedB) {
            return completedA ? 1 : -1;
        }

        // Después, ordenar por fecha de entrega
        const dateA = a.deliveryDate || "Sin fecha";
        const dateB = b.deliveryDate || "Sin fecha";

        if (dateA === "Sin fecha" && dateB !== "Sin fecha") {
            return 1;
        }

        if (dateB === "Sin fecha" && dateA !== "Sin fecha") {
            return -1;
        }

        if (dateA === "Sin fecha" && dateB === "Sin fecha") {
            return 0;
        }

        return (
            new Date(`${dateA}T00:00:00`) -
            new Date(`${dateB}T00:00:00`)
        );
    });

    const groups = new Map();

    sortedOrders.forEach((order) => {
        const date = order.deliveryDate || "Sin fecha";

        if (!groups.has(date)) {
            groups.set(date, []);
        }

        groups.get(date).push(order);
    });

    return Array.from(groups.entries());
}, [filteredOrders]);


    async function handleStatus(newStatus) {

        try {

            await updateStatus(
                selectedOrder.id,
                newStatus
            );

            setSelectedOrder(null);

        }

        catch (error) {

            firebaseError(error);

        }

    }


    async function handleDelete() {

        try {

            await removeOrder(
                selectedOrder.id
            );

            setSelectedOrder(null);

        }

        catch (error) {

            firebaseError(error);

        }

    }


    if (loading)

        return <LoadingOrders />;


    return (

        <Layout>

            <div className="pt-15">

            <AdminHeader />


            <div className="flex gap-4 mb-8">


                <button

                    className="flex-1 rounded-2xl bg-[#D08A9B] text-white py-3 font-semibold"

                >

                    📦 Pedidos

                </button>


                <button

                    onClick={() =>
                        navigate("/admin/productos")
                    }

                    className="flex-1 rounded-2xl bg-white border py-3 font-semibold"

                >

                    🍰 Productos

                </button>

                <button
                    onClick={() => navigate("/admin/disponibilidad")}
                    className="flex-1 rounded-2xl bg-white border py-3 font-semibold"
                >
                    📅 Calendario
                </button>


            </div>


            <FirebaseBadge />

            <RealtimeStatus />


            <AdminActionBar>


                <AdminStatsCards
                    orders={orders}
                />


                <AdminFilters

                    search={search}

                    onSearch={setSearch}

                    status={status}

                    onStatus={setStatus}

                />


            </AdminActionBar>


            <AdminSummary
                orders={filteredOrders.length}
            />


            {


                filteredOrders.length === 0

                    ? (

                        <NoOrders />

                    )

                    : (

                        <RecentOrders>


                            {


                                groupedOrders.map(([date, orders]) => (

                                    <div
                                        key={date}
                                        className="space-y-4"
                                    >


                                        <div className="sticky top-0 bg-pink-100 rounded-xl px-4 py-3 shadow">


                                            <h2 className="font-bold text-lg">


                                                📅 {


                                                    date === "Sin fecha"

                                                        ? date

                                                        : new Date(
                                                            `${date}T00:00:00`
                                                        ).toLocaleDateString(

                                                            "es-AR",

                                                            {

                                                                weekday: "long",

                                                                day: "2-digit",

                                                                month: "2-digit",

                                                                year: "numeric"

                                                            }

                                                        )

                                                }


                                            </h2>


                                        </div>


                                        {


                                            [...orders]
    .sort((a, b) => {
        const completedStatuses = [
            "finalizado",
            "finalizada",
            "entregado",
            "entregada"
        ];

        const statusA = String(a.status || "")
            .trim()
            .toLowerCase();

        const statusB = String(b.status || "")
            .trim()
            .toLowerCase();

        const completedA = completedStatuses.includes(statusA);
        const completedB = completedStatuses.includes(statusB);

        if (completedA && !completedB) return 1;
        if (!completedA && completedB) return -1;

        return 0;
    })
    .map(order => (
        <OrderCard
            key={order.id}
            order={order}
            onOpen={() => setSelectedOrder(order)}
        />
    ))

                                        }


                                    </div>


                                ))

                            }


                        </RecentOrders>

                    )

            }


            <OrderModal

                order={selectedOrder}

                open={
                    selectedOrder !== null
                }

                onClose={() =>
                    setSelectedOrder(null)
                }

                onStatusChange={
                    handleStatus
                }

                onDelete={
                    handleDelete
                }

            />
        </div>

        </Layout>

    );

}


export default Admin;