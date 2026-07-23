import { useEffect, useState } from "react";

import { subscribeOrders } from "../firebase/realtimeOrders";

export default function useRealtimeOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = subscribeOrders(data => {

            setOrders(data);

            setLoading(false);

        });

        return unsubscribe;

    }, []);

    return {

        orders,

        loading

    };

}