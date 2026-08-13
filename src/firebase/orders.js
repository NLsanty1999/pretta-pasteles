import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "./config";


const ordersRef = collection(db, "orders");


export async function saveOrder(order) {

    await addDoc(ordersRef, {

        client: order.client,

        items: order.items,

        price: order.price,

        deliveryDate: order.deliveryDate || "",

        deliveryHour: order.deliveryHour || "",

        status: "Pendiente",

        createdAt: serverTimestamp()

    });

}


export async function getOrders() {

    const snapshot = await getDocs(ordersRef);

    return snapshot.docs.map(docItem => ({

        id: docItem.id,

        ...docItem.data()

    }));

}


export async function updateStatus(id, status) {

    await updateDoc(

        doc(db, "orders", id),

        {

            status

        }

    );

}


export async function removeOrder(id) {

    await deleteDoc(

        doc(db, "orders", id)

    );

}