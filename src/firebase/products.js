import {
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    deleteField
} from "firebase/firestore";

import { db } from "./config";


// =============================
// OBTENER TODOS LOS PRODUCTOS
// =============================

export async function getProducts() {

    const snapshot = await getDocs(
        collection(db, "products")
    );

    return snapshot.docs.map(doc => ({
        ...doc.data()
    }));
}


// =============================
// GUARDAR PRODUCTO
// =============================

export async function saveProduct(product) {

    const productData = {
        ...product
    };

    /*
     * =============================
     * LIMPIEZA MESA DULCE
     * =============================
     *
     * Mesa Dulce utiliza:
     *
     * prices["12"]
     * prices["35"]
     *
     * El campo antiguo "mesaDulce"
     * se elimina explícitamente.
     */

    if (product.type === "mesaDulce") {

        productData.prices = {
            ...(product.prices || {}),
            mesaDulce: deleteField()
        };

    }

    await setDoc(
        doc(db, "products", product.slug),
        productData,
        { merge: true }
    );
}


// =============================
// ELIMINAR PRODUCTO
// =============================

export async function deleteProduct(slug) {

    await deleteDoc(
        doc(db, "products", slug)
    );
}


// =============================
// CREAR SLUG
// =============================

export function createSlug(name) {

    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}