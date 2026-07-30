import { doc, setDoc } from "firebase/firestore";

import { db } from "./config";

import products from "../data/products";

export async function uploadProducts() {

    for (const product of products) {

        await setDoc(

            doc(db, "products", product.slug),

            product

        );

    }

    alert("Todos los productos fueron cargados a Firebase ✅");

}