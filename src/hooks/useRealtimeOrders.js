import { useEffect, useState } from "react";

import { subscribeOrders } from "../firebase/realtimeOrders";

export default function useRealtimeOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = subscribeOrders(data => {

            const sorted = [...data].sort((a, b) => {

                const itemA = a.items?.[0];
                const itemB = b.items?.[0];

                const dateA = itemA?.deliveryDate || "";
                const dateB = itemB?.deliveryDate || "";

                if (dateA !== dateB) {

                    return dateA.localeCompare(dateB);

                }

                const hourA = itemA?.deliveryHour || "";
                const hourB = itemB?.deliveryHour || "";

                return hourA.localeCompare(hourB);

            });

            setOrders(sorted);

            setLoading(false);

        });

        return unsubscribe;

    }, []);

    return {

        orders,

        loading

    };

}