import {
    doc,
    setDoc
} from "firebase/firestore";

import { db } from "./config";

export async function saveProduct(product) {

    await setDoc(

        doc(db, "products", product.slug),

        product,

        { merge: true }

    );

}

export function createSlug(name) {

    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-");

}