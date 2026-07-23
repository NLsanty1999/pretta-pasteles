import {
    collection,
    onSnapshot,
    query,
    orderBy
} from "firebase/firestore";

import { db } from "./config";

export function subscribeOrders(callback) {

    const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, snapshot => {

        callback(

            snapshot.docs.map(doc => ({

                id: doc.id,

                ...doc.data()

            }))

        );

    });

}