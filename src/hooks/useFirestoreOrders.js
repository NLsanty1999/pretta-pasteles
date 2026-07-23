import { useEffect, useState } from "react";

import { getOrders } from "../firebase/orders";

export default function useFirestoreOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    async function refresh() {

        const data = await getOrders();

        setOrders(data);

        setLoading(false);

    }

    useEffect(() => {

        refresh();

    }, []);

    return {

        orders,

        loading,

        refresh

    };

}