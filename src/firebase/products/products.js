import {
    collection,
    doc,
    getDocs,
    setDoc
} from "firebase/firestore";

import { db } from "../config";

const PRODUCTS = "products";

export async function getProducts() {

    const snapshot = await getDocs(

        collection(db, PRODUCTS)

    );

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

export async function saveProduct(

    slug,

    data

) {

    await setDoc(

        doc(db, PRODUCTS, slug),

        data,

        {

            merge: true

        }

    );

}