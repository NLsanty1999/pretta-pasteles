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

function Admin() {

    const {

        orders,

        loading

    } = useRealtimeOrders();

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("Todos");

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

                                filteredOrders.map(order => (

                                    <OrderCard

                                        key={order.id}

                                        order={order}

                                        onOpen={() =>

                                            setSelectedOrder(order)

                                        }

                                    />

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