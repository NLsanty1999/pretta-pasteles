import { useEffect, useState } from "react";

import {
    collection,
    onSnapshot
} from "firebase/firestore";

import { db } from "../firebase/config";

function useProducts() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onSnapshot(

            collection(db, "products"),

            (snapshot) => {

                const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
}));

console.log(
    "BALCARCE:",
    data.filter(p =>
        p.name?.toLowerCase().includes("balcarce")
    )
);

setProducts(data);
setLoading(false);
            }

        );

        return unsubscribe;

    }, []);

    return {

        products,

        loading

    };

}

export default useProducts;