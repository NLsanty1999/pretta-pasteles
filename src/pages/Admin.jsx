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

        const groups = {};

        filteredOrders.forEach(order => {

            const item = order.items?.[0];

            const date = item?.deliveryDate || "Sin fecha";

            if (!groups[date]) {

                groups[date] = [];

            }

            groups[date].push(order);

        });

        return groups;

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

            <AdminHeader />

            <div className="flex gap-4 mb-8">

                <button

                    className="flex-1 rounded-2xl bg-[#D08A9B] text-white py-3 font-semibold"

                >

                    📦 Pedidos

                </button>

                <button

                    onClick={() => navigate("/admin/productos")}

                    className="flex-1 rounded-2xl bg-white border py-3 font-semibold"

                >

                    🍰 Productos

                </button>

            </div>

            <FirebaseBadge />

            <RealtimeStatus />

            <AdminActionBar>

                <AdminStatsCards orders={orders} />

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

                                Object.entries(groupedOrders).map(([date, orders]) => (

                                    <div key={date} className="space-y-4">

                                        <div className="sticky top-0 bg-pink-100 rounded-xl px-4 py-3 shadow">

                                            <h2 className="font-bold text-lg">

                                                📅 {

                                                    date === "Sin fecha"

                                                        ? date

                                                        : new Date(date).toLocaleDateString(

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

                                            orders.map(order => (

                                                <OrderCard

                                                    key={order.id}

                                                    order={order}

                                                    onOpen={() =>

                                                        setSelectedOrder(order)

                                                    }

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

                open={selectedOrder !== null}

                onClose={() =>

                    setSelectedOrder(null)

                }

                onStatusChange={handleStatus}

                onDelete={handleDelete}

            />

        </Layout>

    );

}

export default Admin;